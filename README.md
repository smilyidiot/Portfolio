# Vinayak Rachha — Portfolio

A simple, responsive portfolio site. Content is driven entirely from
`frontend/src/data/resume.js`, so you can edit copy without touching components.

**Stack:** React 18 + Vite + Tailwind CSS · Python serverless function for the
contact form (Flask locally, a Vercel function in production). Deploys as a
single project on Vercel.

```
portfolio/
├── frontend/   # React + Vite single-page app
│   └── src/data/resume.js   ← edit all your content here
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

### 2. Backend (Flask) — optional, for the contact form
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

## Editing content

- **Text, skills, jobs, projects:** `frontend/src/data/resume.js`
- **LinkedIn URL:** update `profile.linkedin` in that file (currently a placeholder).
- **Project live-demo links:** set each project's `demo` to a real URL; a link
  only appears when `demo` is not `'#'`.
- **Colors / theme:** `frontend/tailwind.config.js` (the `brand` color).

## Build for production
```bash
cd frontend
npm run build      # outputs to frontend/dist
npm run preview    # preview the production build locally
```

## Deploy (free) — single project on Vercel

The whole thing deploys as **one Vercel project** — no separate backend host:

- The React app builds to static files (served from `frontend/dist`).
- `api/contact.py` is a Python **serverless function**, auto-served at
  `/api/contact`. It uses only the standard library, so it has no cold-start
  wait and needs no dependencies.
- `vercel.json` wires up the build command, the output directory, and an SPA
  rewrite so client-side routes (`/projects`, `/education`, …) resolve.

### Steps
1. Push this repo to GitHub (see commands below).
2. Go to **vercel.com → New Project → Import** your GitHub repo.
3. Leave the defaults — Vercel reads `vercel.json`. Click **Deploy**.
4. You get one URL, e.g. `https://vinayak-portfolio.vercel.app`, with the
   contact form working through the Python function on the same domain.

> The contact function logs messages to the Vercel function logs. To deliver
> real email, call an email API (Resend / SendGrid) inside `api/contact.py`
> using an environment variable for the key.

## Project layout
```
portfolio/
├── frontend/      # React + Vite app (built to frontend/dist)
├── api/
│   └── contact.py # Python serverless function → /api/contact (production)
├── backend/       # Flask app — same endpoint, for LOCAL dev only
└── vercel.json    # single-project build + routing config
```
