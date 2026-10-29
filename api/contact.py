"""Vercel Python serverless function for the contact form.

Deployed automatically by Vercel at the path /api/contact (the file name maps
to the route). Uses only the Python standard library, so it needs no
dependencies and starts fast — no persistent server, no cold-start wait.

Serverless filesystems are ephemeral and read-only, so messages are written to
the function logs (stdout) rather than a file. To actually deliver mail, call
an email API here (e.g. Resend / SendGrid) using an env var for the key.

For local development the Flask app in backend/app.py serves the same endpoint
(the Vite dev server proxies /api there); this function is what runs in
production on Vercel.
"""
from http.server import BaseHTTPRequestHandler
import json


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

        # Shows up in the Vercel function logs. Swap for an email API to deliver.
        print(f"Contact message from {name} <{email}>: {message}")
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
