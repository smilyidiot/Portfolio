"""Vercel Python serverless function for the contact form.

Deployed automatically by Vercel at the path /api/contact (the file name maps
to the route). Uses only the Python standard library, so it needs no
dependencies and starts fast — no persistent server, no cold-start wait.

Email delivery uses Resend (https://resend.com) via a plain HTTPS call. Set
these environment variables in the Vercel project settings:

  RESEND_API_KEY   (required to actually send)  e.g. re_xxx
  CONTACT_TO       (optional) the address that receives messages
  CONTACT_FROM     (optional) the "from" address; defaults to Resend's shared
                   sender, which can only deliver to your own Resend account
                   email until you verify a domain.

If RESEND_API_KEY is not set, the message is just logged (visible in the Vercel
function logs) and the form still reports success.
"""
from http.server import BaseHTTPRequestHandler
import json
import os
import urllib.error
import urllib.request

CONTACT_TO = os.environ.get("CONTACT_TO", "vinayakrachha@gmail.com")
CONTACT_FROM = os.environ.get("CONTACT_FROM", "Portfolio Contact <onboarding@resend.dev>")


def send_email(name, email, message):
    """Send the contact message via Resend. Returns True on success.

    When no API key is configured, logs and returns True so the form keeps
    working while email is being set up.
    """
    api_key = os.environ.get("RESEND_API_KEY")
    if not api_key:
        print(f"[contact] (no RESEND_API_KEY set) {name} <{email}>: {message}")
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
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as resp:
            resp.read()
        return True
    except urllib.error.HTTPError as exc:
        detail = exc.read().decode("utf-8", "replace")
        print(f"[contact] Resend HTTP {exc.code}: {detail}")
        return False
    except Exception as exc:  # noqa: BLE001 - don't leak internals to the client
        print(f"[contact] Resend request failed: {exc}")
        return False


class handler(BaseHTTPRequestHandler):
    def do_POST(self):  # noqa: N802 - name required by BaseHTTPRequestHandler
        length = int(self.headers.get("content-length") or 0)
        raw = self.rfile.read(length) if length else b""
        try:
            data = json.loads(raw or b"{}")
        except json.JSONDecodeError:
            data = {}

        name = (data.get("name") or "").strip()
        email = (data.get("email") or "").strip()
        message = (data.get("message") or "").strip()

        if not name or not email or not message:
            return self._json(400, {"error": "name, email and message are all required."})
        if "@" not in email or "." not in email:
            return self._json(400, {"error": "Please provide a valid email address."})
        if len(message) > 5000:
            return self._json(400, {"error": "Message is too long (5000 char max)."})

        if not send_email(name, email, message):
            return self._json(502, {"error": "Could not send message, please try again later."})
        return self._json(201, {"ok": True})

    def do_GET(self):  # noqa: N802 - simple health check
        return self._json(200, {"status": "ok"})

    def _json(self, code, payload):
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)
