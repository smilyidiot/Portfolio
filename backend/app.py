"""Minimal Flask backend for the portfolio contact form.

Pure-Python (Flask), so it installs cleanly without compiled dependencies.
In local dev the Vite server proxies /api/* here (see vite.config.js).

Every message is appended to backend/messages.log. If RESEND_API_KEY is set in
the environment, it is also emailed via Resend — the same behaviour as the
production Vercel function (api/contact.py), so local testing matches live.
"""
from __future__ import annotations

import json
import logging
import os
import urllib.error
import urllib.request
from datetime import datetime, timezone

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow the frontend origin to call the API in production

LOG_PATH = os.path.join(os.path.dirname(__file__), "messages.log")
CONTACT_TO = os.environ.get("CONTACT_TO", "vinayakrachha@gmail.com")
CONTACT_FROM = os.environ.get("CONTACT_FROM", "Portfolio Contact <onboarding@resend.dev>")


def send_email(name: str, email: str, message: str) -> bool:
    """Email the message via Resend if an API key is configured.

    Returns True when there is nothing to send (no key) or the send succeeds,
    False only when a configured send fails.
    """
    api_key = os.environ.get("RESEND_API_KEY")
    if not api_key:
        return True

    payload = {
        "from": CONTACT_FROM,
        "to": [CONTACT_TO],
        "reply_to": email,
        "subject": f"Portfolio contact from {name}",
        "text": f"From: {name} <{email}>\n\n{message}",
    }
    req = urllib.request.Request(
        "https://api.resend.com/emails",
        data=json.dumps(payload).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            # Identify this client. urllib's default "Python-urllib" UA is
            # rejected by Resend's Cloudflare layer; a descriptive app UA is
            # the normal, honest fix.
            "User-Agent": "VinayakPortfolioContactForm/1.0",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp.read()
        return True
    except urllib.error.HTTPError as exc:
        logging.error("Resend HTTP %s: %s", exc.code, exc.read().decode("utf-8", "replace"))
        return False
    except Exception:  # noqa: BLE001
        logging.exception("Resend request failed")
        return False


def handle_message(name: str, email: str, message: str) -> bool:
    """Record an incoming contact message, then email it if configured."""
    entry = {
        "at": datetime.now(timezone.utc).isoformat(),
        "name": name,
        "email": email,
        "message": message,
    }
    with open(LOG_PATH, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(entry) + "\n")
    logging.info("Contact message from %s <%s>", name, email)
    return send_email(name, email, message)


@app.get("/api/health")
def health():
    return jsonify(status="ok")


@app.post("/api/contact")
def contact():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    if not name or not email or not message:
        return jsonify(error="name, email and message are all required."), 400
    if "@" not in email or "." not in email:
        return jsonify(error="Please provide a valid email address."), 400
    if len(message) > 5000:
        return jsonify(error="Message is too long (5000 char max)."), 400

    try:
        sent = handle_message(name, email, message)
    except Exception:  # noqa: BLE001 - don't leak internals to the client
        logging.exception("Failed to store contact message")
        return jsonify(error="Could not send message, please try again later."), 500

    if not sent:
        return jsonify(error="Could not send message, please try again later."), 502

    return jsonify(ok=True), 201


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    port = int(os.environ.get("PORT", "5001"))
    app.run(host="0.0.0.0", port=port, debug=True)
