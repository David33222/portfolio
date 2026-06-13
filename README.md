# David's Portfolio

A modern, editorial portfolio with a **private admin dashboard** where you (and only you) manage everything on the site — projects, skills, social links, profile, and image uploads — without touching code.

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **Prisma**, **Auth.js**, and **PostgreSQL (Supabase)**.

---

## ✨ Features

- **Editorial, fully responsive UI** — serif display type, monospace labels, a single warm accent, mobile menu, reduced-motion support.
- **Private admin** (`/admin`) — email + password login; only you can access it.
- **Edit everything live**: profile/bio/photo, projects (status: completed / in‑progress / planned), skills, social links.
- **Image uploads** — to Vercel Blob in production, or to `/public/uploads` locally.
- No code edits needed to update your portfolio — just log in.

---

## 🚀 Run locally

Requires a PostgreSQL database (e.g. a free Supabase project). Then:

```bash
npm install
# .env must contain DATABASE_URL (Supabase Session pooler), AUTH_SECRET, ADMIN_*
npm run db:push     # create the tables
npm run db:seed     # create your admin account + content
npm run dev
```

Open **http://localhost:3000** (it auto-picks 3001/3002… if 3000 is busy — watch the terminal).
Admin is at **/admin**.

**Login** comes from your `.env` (`ADMIN_EMAIL` / `ADMIN_PASSWORD`). Change `ADMIN_PASSWORD` and re-run `npm run db:seed` to update it.

> See `.env.example` for all required variables. Real secrets go only in `.env` (git-ignored) — never in `.env.example`.

---

## ☁️ Deploy to Vercel

The same Postgres database is used locally and in production, so there's nothing to migrate.

1. **Push to GitHub** (this repo is already wired to `github.com/David33222/portfolio`):
   ```bash
   git push -u origin main
   ```
2. **Import on Vercel** — https://vercel.com/new → pick the `portfolio` repo.
3. **Create a PUBLIC Blob store** — Vercel project → **Storage → Create → Blob**. It adds `BLOB_READ_WRITE_TOKEN` automatically. (Public so visitors can see uploaded images.)
4. **Add Environment Variables** (Project → Settings → Environment Variables):

   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | your Supabase **Session pooler** string (port 5432, `?sslmode=require`) |
   | `AUTH_SECRET` | run `npx auth secret` |
   | `ADMIN_EMAIL` | your email |
   | `ADMIN_PASSWORD` | your password |
   | `ADMIN_NAME` | your name |

5. **Deploy.** The build runs `prisma generate` automatically. The database tables already exist (created via `db:push`), so the site comes up populated.

Every future `git push` to `main` auto-deploys.

> **Uploads:** images uploaded before you set up the public Blob store were saved locally and won't appear in production — just re-upload them from `/admin` once deployed.

---

## 🗂 Project structure

```
src/
  app/
    page.tsx              # public portfolio
    login/               # admin sign-in
    admin/               # private dashboard + server actions
    api/
      auth/[...nextauth]/  # Auth.js routes
      upload/              # image upload endpoint (auth-protected)
  components/
    site/                # public UI (Hero, Projects, Skills, About, Contact…)
    admin/               # dashboard UI (managers, forms, image upload)
    ui/                  # shared bits (Reveal, SocialIcon)
  lib/
    auth.ts / auth.config.ts  # Auth.js config
    prisma.ts            # database client
    storage.ts           # upload (Vercel Blob + local fallback)
    data.ts              # data fetch helpers
prisma/
  schema.prisma          # database models (PostgreSQL)
  seed.ts                # admin account + content
```

## 🔧 Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run db:push` | Sync schema to the database |
| `npm run db:seed` | Create admin + content |
| `npm run db:studio` | Visual database browser |
