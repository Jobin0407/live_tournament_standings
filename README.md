# Live Tournament Standings

This repository contains a full-stack mini tournament standings application.

- `backend/` — Node.js + Express + PostgreSQL API
- `frontend/` — Next.js app for standings display and admin match entry

## Setup

1. Install dependencies:
   - `cd backend && npm install`
   - `cd ../frontend && npm install`

2. Configure the backend environment by copying  `backend/.env` and setting values.

3. Create the PostgreSQL schema and seed data:
   - `psql "$DATABASE_URL" -f backend/scripts/init-db.sql`

4. Run the backend and frontend locally:
   - `cd backend && npm run dev`
   - `cd ../frontend && npm run dev`

The frontend expects the backend at `http://localhost:4000` by default.

## Admin login

Use the credentials from `backend/.env.example`:

- username: `admin`
- password: `password123`

## Architecture notes

- The backend enforces authorization on `POST /matches` using JWT and an admin-only guard.
- Standings ranking is computed fully in SQL to satisfy the task requirement.
- The frontend fetches standings and conditionally renders the admin match form when the user is logged in.

## Write-up answers

1. **Scaling to many tournaments with shared user accounts**

   If this system grew to support many tournaments with shared users, I would separate the concerns clearly. One shared auth layer would handle user accounts, roles, and permissions, while each tournament would have its own data store for matches and standings. The application would then look up the user’s role from the shared system and use the correct tournament database for the actual standings work.

2. **Adding a new tie-break rule in the ranking logic**

   I would keep the ranking rules in one place, ideally in a SQL view or a single query, so the logic stays easy to manage. If a new tie-break rule was introduced, I would update that central logic rather than spreading rules across the backend and UI. That makes the change safer, easier to test, and simpler to maintain over time.

3. **Supporting live updates during an event**

   For a live event, I would add real-time updates using WebSockets or server-sent events so viewers could see standings change immediately after each result is saved. If that was too much for the first version, a short polling interval would still work well for a small live dashboard.

## Tradeoffs

If I had more time, I would improve the system by adding stronger input validation, a more complete authentication flow with refresh tokens, database migrations instead of raw SQL setup scripts, and end-to-end tests for the most important flows.
