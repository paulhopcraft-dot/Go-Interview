# GoInterview — AI Interview Platform (Full Scaffold)

Full‑stack TypeScript app implementing the **GoInterview** spec:
- **AI interviews** with avatar (Synthesia) + voice (ElevenLabs) — adapter stubs ready.
- **Scheduling via Gmail/Calendar** (provider interface with Google/Zoom stubs).
- **CAB0/CAB1/CAB2** flows: tagging, sessions, and reporting included.
- **Knowledge uploads** to prep interviews (RAG-ready hooks).
- **Sentiment & posture** analysis stubs.
- **React dashboard** for Sessions, Scheduler, Knowledge, CAB cohorts and Settings.

This scaffold is safe to deploy without secrets (no external calls unless you set env).

## Quick Start
1. Copy `.env.example` → `.env` and fill values (or leave blanks for local demo).
2. Install with PNPM (recommended) or NPM:
   ```bash
   pnpm install
   ```
3. Dev (runs API + client):
   ```bash
   pnpm dev
   ```
4. Production build & start:
   ```bash
   pnpm build && pnpm start
   ```

- API on `PORT` (default **8080**).
- Client on **5173** and proxies `/api` → server.

## Replit
Set **Run** command to:
```bash
pnpm install --frozen-lockfile=false && pnpm build && pnpm start
```
Add secrets via the 🔑 **Secrets** tab.

## Structure
```
server/
  src/
    index.ts
    lib/env.ts
    lib/logger.ts
    lib/store.ts
    lib/sentiment.ts
    adapters/
      providers.ts
      gmail_calendar.ts
      zoom.ts
      synthesia.ts
      elevenlabs.ts
    routes/
      health.ts
      interviews.ts
      schedule.ts
      knowledge.ts
      cab.ts
      webhooks.ts
    types/
      interview.ts
      schedule.ts
      cab.ts
client/
  index.html
  vite.config.ts
  tsconfig.json
  src/
    main.tsx
    App.tsx
    api.ts
    components/
      Nav.tsx
      SessionCard.tsx
    pages/
      Sessions.tsx
      Scheduler.tsx
      Knowledge.tsx
      CAB.tsx
      Settings.tsx
```

## Env Vars
Copy `.env.example` to `.env`.

```env
# Core
PORT=8080
CORS_ORIGIN=http://localhost:5173

# Google (optional: for Gmail/Calendar scheduling)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REDIRECT_URI=
GOOGLE_REFRESH_TOKEN=
SENDER_EMAIL=

# Zoom (optional: alternative to Google Meet)
ZOOM_ACCOUNT_ID=
ZOOM_CLIENT_ID=
ZOOM_CLIENT_SECRET=
ZOOM_USER_EMAIL=

# Synthesia (optional)
SYNTHESIA_API_KEY=

# ElevenLabs (optional)
ELEVENLABS_API_KEY=

# Storage (for real DB later; in-memory by default)
DATABASE_URL=
```

## What works out-of-the-box
- Create/list **interview sessions** (in-memory) and simulate an AI run.
- Post **messages** to a session; server returns a placeholder AI reply + sentiment score.
- **Schedule** meetings using mock Google/Zoom providers (no external calls until env set).
- Upload **knowledge** (stored in-memory) — RAG hooks ready.
- Manage **CAB** cohorts and generate a simple report.

## Next Implementations (ask me and I’ll ship a new ZIP)
- Real DB with Drizzle + Postgres.
- Real Google Calendar OAuth w/ Meet links or Zoom Meetings API.
- Real Synthesia/ElevenLabs calls + webhook validation.
- PDF exports (interview transcripts, CAB reports).
- Pinecone vector store for knowledge.
