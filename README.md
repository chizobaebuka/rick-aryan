# Rick Aryan Services Ltd

Industrial chemical ERP (Express + TypeORM + PostgreSQL) and public marketing site (Next.js).

## Structure

- `backend/` — REST API, JWT auth, Swagger at `/api/docs`
- `frontend/` — App Router UI (public site + `/admin` console)

## Quick start

### Database

Run PostgreSQL locally and create a database (e.g. `rick_aryan`).

### Backend

```bash
cd backend
cp .env.example .env
# edit DATABASE_URL if needed
npm run dev
```

Seeded dev admin (when `NODE_ENV=development` and tables are empty):

- Email: `admin@rickaryan.com`
- Password: `ChangeMe!Strong1` (or `SEED_ADMIN_PASSWORD` from `.env`)

### Frontend

```bash
cd frontend
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and [http://localhost:3000/admin/login](http://localhost:3000/admin/login).

## Deployment

- API: Render (`backend/render.yaml`)
- Web: Vercel (`frontend/vercel.json`)

Set `NEXT_PUBLIC_API_URL` to your production API base including `/api`, and `FRONTEND_URL` on the API for CORS.

### Notes

- **RFQ emails:** When someone submits “Request a quote”, the API saves the RFQ and (if SMTP is configured) emails `RFQ_NOTIFICATION_EMAIL` (or `ADMIN_NOTIFICATION_EMAIL`, else `SMTP_USER`). Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` in `backend/.env`. If SMTP is omitted, RFQs still save — only the email step is skipped.
- **Admin login:** Seeded master admin is `admin@rickaryan.com` with password from `SEED_ADMIN_PASSWORD` (default `ChangeMe!Strong1`). **Sign up** at `/signup` creates a **viewer** account (no ERP shell until a master admin changes your role in the database or via Users API).
- **Superadmin-only “Admin console”** link on the public navbar appears when you’re signed in as `master_admin` (same browser session / persisted auth).
- Admin **RFQs** view uses three status columns; wire `@dnd-kit` again if you want drag-and-drop between columns (see build guide §12.6).
- **Valhalla** ETA: `GET /api/dispatch/:id/eta` calls the public Valhalla instance; set `VALHALLA_URL` for self-hosted routing.
