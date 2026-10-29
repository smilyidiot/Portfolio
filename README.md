# Vinayak Rachha — Portfolio

A simple, responsive portfolio site. Content is driven entirely from
`frontend/src/data/resume.js`.

**Stack:** React 18 + Vite + Tailwind CSS · Python serverless function for the
contact form (Flask locally, a Vercel function in production). Deploys as a
single project on Vercel.

```
portfolio/
├── frontend/   # React + Vite single-page app
│   └── src/data/resume.js   ← all my details are here
└── backend/    # Flask API for the contact form
```

## Run locally

Open two terminals.

### 1. Frontend (React + Vite)

```bash
cd frontend
npm install
npm run dev
```

Opens at http://localhost:5173

### 2. Backend (Flask) — for the contact form

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python app.py
```

Runs at http://localhost:5001. The Vite dev server proxies `/api/*` to it,
so the contact form just works while both are running. Submitted messages
are appended to `backend/messages.log`.

> The site works fully without the backend running — only the contact form
> needs it. Everything else is static.

## Build for production

```bash
cd frontend
npm run build      # outputs to frontend/dist
npm run preview    # preview the production build locally
```

## Project layout

```
portfolio/
├── frontend/      # React + Vite app (built to frontend/dist)
├── api/
│   └── contact.py # Python serverless function → /api/contact (production)
├── backend/       # Flask app — same endpoint, for LOCAL dev only
└── vercel.json    # single-project build + routing config
```
