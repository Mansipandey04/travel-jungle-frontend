# Travel Jungle — Frontend

India-only travel experience & community UI for **Travel Jungle** (“Find the Hidden. Feel the Story.”).

This repository is the **Next.js App Router** frontend (standalone). The browser talks only to Next.js; Next.js proxies `/api/backend/[...path]` to FastAPI via `BACKEND_INTERNAL_URL` (Phase 5+).

## Stack

- Next.js (App Router) + React + TypeScript
- Tailwind CSS v4
- Lucide icons
- React Hook Form + Zod
- Node.js LTS (`engines`: `>=20 <23`)

## Brand

| Token | Hex |
|-------|-----|
| Jungle Green | `#183D2B` |
| Warm Sand | `#F5F0E5` |
| Earth Coral | `#E97848` |
| Golden Yellow | `#D5B46A` |
| Leaf Sage | `#DCE5D5` |

Fonts: **Playfair Display** (headings), **DM Sans** (body / nav / buttons).

## Quick start

```bash
cp .env.example .env.local
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Phase 2 serves **typed stubs** under `src/lib/stubs/`. Demo rows are labelled; there are no invented prices, ratings, or testimonials presented as real.

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local dev (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

## Routes

`/`, `/explore-india`, `/explore-india/[slug]`, `/trips`, `/trips/[slug]`, `/events`, `/stories`, `/community`, `/community/submit`, `/hidden-india/[slug]`, `/about`, `/contact`

## Backend proxy

Browser calls go to `/api/backend/...` only. The route handler forwards to `${BACKEND_INTERNAL_URL}/...` on the server. Do not put Docker hostnames in client code.

## Docker

Multi-stage **standalone** Alpine image, non-root user, port **3000**:

```bash
docker build -t travel-jungle-frontend .
docker run --rm -p 3000:3000 -e BACKEND_INTERNAL_URL=http://backend:8000 travel-jungle-frontend
```

Intended Compose network: `travel-jungle-network` (owned by the platform/backend repo).

## Scope

- India-only content
- No payments in MVP
- No FastAPI / Postgres in this repo
- Never commit real secrets — only `.env.example` placeholders
