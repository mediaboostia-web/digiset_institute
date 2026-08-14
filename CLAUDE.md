# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

Digi-SET Institute (Libreville/Akanda, Gabon) — a Next.js 16 (App Router) + Supabase institutional site with an
admin back-office, styled with Tailwind CSS v4 + shadcn/ui.

**Do not trust the "every page is a `PageStub` placeholder" narrative in `README.md` / `gemini.md`.** That was
true at scaffold time but is now stale — `PageStub` (`src/components/page-stub.tsx`) has zero remaining usages
in `src/`. Pages are fully implemented (e.g. `src/app/(public)/page.tsx` is 581 lines, the admin `équipe` screen
is 591 lines).

## Commands

- `npm run dev` — dev server. Note: explicitly forced to Webpack (`next dev --webpack`), *not* Turbopack, despite
  Turbopack being the Next.js 16 default.
- `npm run build` — production build.
- `npm run start` — run a production build locally.
- `npm run lint` — ESLint (flat config, `eslint-config-next`).

No test runner is configured.

## This is not the Next.js you know

Next.js 16 has breaking changes vs. training data. Before touching any convention file (`proxy.ts`, `route.ts`,
`layout.tsx`), read `node_modules/next/dist/docs/01-app/`. Concrete deltas already confirmed in this repo:

- Middleware is `src/proxy.ts` (function `proxy`), **not** `middleware.ts`.
- `cookies()`, `headers()`, `params`, `searchParams` are all async.

Zod is v4 — use top-level validators (`z.email()`, `z.uuid()`), not the v3 `.string().email()` style. See
`src/lib/validations/*.ts`.

## Architecture

**Routing** — `src/app/`:
- `(public)/` — public pages, shared `Header`/`Footer` via its `layout.tsx`.
- `admin/login/` — login screen, no sidebar.
- `admin/(dashboard)/` — back-office screens, shared sidebar, protected by `src/proxy.ts`.
- `api/**` — Route Handlers for the public forms and admin CRUD.

`src/proxy.ts` guards `/admin/*` via Supabase session (`supabase.auth.getUser()`). If
`NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset, it falls back to an `admin_dev_mode` cookie
so the admin area is reachable without Supabase configured.

**Supabase clients** — `src/lib/supabase/`:
- `client.ts` — browser (`"use client"`), anon key, subject to RLS.
- `server.ts` — Server Components/Route Handlers, anon key, subject to RLS, async `cookies()`.
- `admin.ts` — `server-only`, `service_role` key, **bypasses RLS**. Only for privileged server-side writes and
  the private `candidate-documents` storage bucket. Never import from client code.

**Dual-write content stores (important, easy to misread)** — `src/lib/team-store.ts`, `news-store.ts`,
`media-store.ts` are *not* thin Supabase wrappers. Each keeps its own copy of the data in `globalThis` plus a
JSON file cache (`.next/digiset_<name>_cache.json`, with a `/tmp/digiset_<name>_cache.json` fallback for
read-only filesystems), seeded from constants in `src/lib/admin-data.ts` if no cache exists. API routes such as
`src/app/api/team/route.ts` layer Supabase on top of this:
- **GET**: prefer Supabase (`admin` client) when `NEXT_PUBLIC_SUPABASE_URL` is set and returns rows; otherwise
  (or on any Supabase error) silently fall back to the memory/file store.
- **POST/PATCH/DELETE**: always write to the local store, *and* best-effort mirror the write to Supabase.

This exists so admin content survives across requests/redeploys even before Supabase is fully wired up. Don't
"simplify" it to a pure Supabase client without understanding this fallback is load-bearing.

`src/lib/site-settings.ts` is a third, unrelated pattern: pure client-side `localStorage`
(`digiset_site_settings`), synced across tabs/components via a custom `digiset_settings_updated` event plus the
native `storage` event. It has no server or Supabase counterpart.

**Database** — single migration `supabase/migrations/0001_init_schema.sql`, written to be idempotent
(`create table if not exists`, `drop policy if exists` before every `create policy`). Every table has RLS
enabled; admin-only writes are gated through `is_admin()` / `is_super_admin()` SQL functions keyed off
`admin_users` (linked to `auth.users`). Three storage buckets: `site-media` and `site-documents` (public read),
`candidate-documents` (admin-only, for the registration form's file uploads).

**Forms** — `src/lib/validations/*.ts` (Zod schemas) back the 4 public forms (`contact`, `registration`,
`training-request`, `lab-request`), submitted through matching routes under `src/app/api/submissions/` and
`src/app/api/contact/`. All of them use the honeypot pattern in `src/lib/api-helpers.ts` (hidden `website`
field — if filled, respond with success and record nothing) and send notifications via `src/lib/email.ts`
(Resend).

**UI** — shadcn/ui, `base-nova` style (`components.json`). Tailwind v4 CSS-native theme (`@theme` block in
`src/app/globals.css`) — there is no `tailwind.config.ts`.

## Reference docs

- `contenu local/00-Reference-projet/PRD-digiset-institute.md` and `design-system-digiset-institute.md` are the
  product/design sources of truth, but that folder is gitignored (client-provided, local-only) — not available
  in a fresh clone.
- `liste-pages-sections-maquettes.md` and `checklist-contenus-avant-maquettes.md` (repo root) are versioned
  planning checklists.
- `gemini.md` (repo root) has useful business/domain context but its "current state of the code" section is
  stale — see the `PageStub` note above.
- `README.md` references a `CONFIGURATION.md` for security/env setup — that file has been deleted from the repo;
  treat any pointer to it as dangling.
