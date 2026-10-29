"""Minimal Flask backend for the portfolio contact form.

Pure-Python (Flask), so it installs cleanly without compiled dependencies.
In local dev the Vite server proxies /api/* here (see vite.config.js).

Messages are appended to backend/messages.log for now. To actually email
them, plug an SMTP or a service like Resend/SendGrid into `handle_message`.
"""
from __future__ import annotations

import json
import logging
import os
from datetime import datetime, timezone

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # allow the frontend origin to call the API in production

LOG_PATH = os.path.join(os.path.dirname(__file__), "messages.log")


def handle_message(name: str, email: str, message: str) -> None:
    """Persist an incoming contact message.

    Swap this out for real email delivery when you're ready to go live.
    """
    entry = {
        "at": datetime.now(timezone.utc).isoformat(),
        "name": name,
        "email": email,
        "message": message,
    }
    with open(LOG_PATH, "a", encoding="utf-8") as fh:
        fh.write(json.dumps(entry) + "\n")
    logging.info("Contact message from %s <%s>", name, email)


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
        handle_message(name, email, message)
    except Exception:  # noqa: BLE001 - don't leak internals to the client
        logging.exception("Failed to store contact message")
        return jsonify(error="Could not send message, please try again later."), 500

    return jsonify(ok=True), 201


if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    port = int(os.environ.get("PORT", "5001"))
    app.run(host="0.0.0.0", port=port, debug=True)
