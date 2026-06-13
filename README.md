# David's Portfolio

A modern, animated portfolio with a **private admin dashboard** where you (and only you) can manage everything that appears on the site — projects, skills, social links, profile, and image uploads — without touching code.

Built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, **Framer Motion**, **Prisma**, and **Auth.js**.

---

## ✨ Features

- **Animated public site** — hero, about, filterable projects, skills bars, contact, dark glassy UI.
- **Private admin** (`/admin`) — email + password login, only you can access it.
- **Edit everything live**: profile/bio/photo, projects (with status: completed / in‑progress / planned), skills, and social links.
- **Image uploads** — drag a file in the admin; stored in cloud (Vercel Blob) in production, or locally during development.
- **No code edits needed** to update your portfolio — just log in.

---

## 🚀 Run it locally

```bash
npm install
npm run db:push      # create the local SQLite database
npm run db:seed      # create your admin account + sample content
npm run dev
```

Open **http://localhost:3000**. Admin is at **http://localhost:3000/admin**.

**Your login** (from `.env`):
- Email: `boluwatifeadeleye383@gmail.com`
- Password: `ChangeMe!2026`  ← **change this** in `.env` then re-run `npm run db:seed`.

> The `.env` file is created for you and git-ignored. Use `.env.example` as the reference.

---

## ☁️ Deploy to Vercel + GitHub

The local setup uses SQLite. Vercel's servers are stateless, so for production you need a hosted **Postgres** database (free) and a **Blob** store for uploads. Steps:

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/David33222/portfolio.git
git push -u origin main
```

(Create the empty `portfolio` repo first at https://github.com/new.)

### 2. Switch the database to Postgres

In [`prisma/schema.prisma`](prisma/schema.prisma), change the datasource provider:

```prisma
datasource db {
  provider = "postgresql"   // was "sqlite"
  url      = env("DATABASE_URL")
}
```

Commit and push that change.

### 3. Import the project on Vercel

1. Go to **https://vercel.com/new** and import your `portfolio` GitHub repo.
2. Before deploying, add a **Postgres** database: in the Vercel project → **Storage → Create → Neon/Postgres**. Vercel auto-adds `DATABASE_URL`.
3. Add a **Blob** store: **Storage → Create → Blob**. Vercel auto-adds `BLOB_READ_WRITE_TOKEN`.
4. Add the remaining **Environment Variables** (Project → Settings → Environment Variables):

   | Name | Value |
   |------|-------|
   | `AUTH_SECRET` | run `npx auth secret` (or any long random string) |
   | `ADMIN_EMAIL` | `boluwatifeadeleye383@gmail.com` |
   | `ADMIN_PASSWORD` | your strong password |
   | `ADMIN_NAME` | `David` |

5. **Deploy.**

### 4. Initialize the production database (one time)

After the first deploy, create the tables and your admin account against the production DB. Easiest way — locally, pointing at the production URL:

```bash
# paste your Vercel Postgres URL + the same admin vars into a temp shell
DATABASE_URL="postgres://..." npx prisma db push
DATABASE_URL="postgres://..." ADMIN_EMAIL="boluwatifeadeleye383@gmail.com" ADMIN_PASSWORD="your-pass" ADMIN_NAME="David" npm run db:seed
```

That's it — your portfolio is live, and `/admin` lets you manage it from anywhere.

> Every future `git push` to `main` auto-deploys.

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
    site/                # public UI (Hero, Projects, Skills, Contact…)
    admin/               # dashboard UI (managers, forms, image upload)
    ui/                  # shared bits (Reveal, SocialIcon)
  lib/
    auth.ts / auth.config.ts  # Auth.js config
    prisma.ts            # database client
    storage.ts           # upload (Vercel Blob + local fallback)
    data.ts              # data fetch helpers
prisma/
  schema.prisma          # database models
  seed.ts                # admin account + sample data
```

## 🔧 Handy commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run db:push` | Sync schema to the database |
| `npm run db:seed` | Create admin + sample content |
| `npm run db:studio` | Visual database browser |

---

## 🔐 Changing your password

Update `ADMIN_PASSWORD` in `.env` (local) or Vercel env vars (prod), then re-run the seed (`npm run db:seed`) — it updates the existing account's password.
