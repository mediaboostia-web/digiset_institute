# Digi-SET Institute — site web

Site institutionnel et back-office autonome pour Digi-SET Institute (Libreville, Gabon). Next.js 16 (App Router) + Supabase (base de données, SupaAuth, Storage) + Tailwind CSS v4 + shadcn/ui.

Documents de référence :

- `contenu local/00-Reference-projet/PRD-digiset-institute.md` — exigences produit complètes.
- `contenu local/00-Reference-projet/design-system-digiset-institute.md` — identité visuelle, tokens, composants.
- `liste-pages-sections-maquettes.md` — checklist des 35 écrans à concevoir (chaque écran a un fichier stub correspondant dans `src/app/`).
- `checklist-contenus-avant-maquettes.md` — contenus/assets à réunir.
- **`CONFIGURATION.md`** — sécurité, endpoints API, et tutoriel pas-à-pas pour créer les comptes/projets nécessaires (Supabase, Vercel, GitHub, Resend, Google Maps, Hostinger DNS).

> Le dossier `contenu local/` (assets, docx source, logo) n'est **pas versionné** avec le code (cf. `.gitignore`) — il reste un espace de travail local, à part du dépôt Git qui ne doit contenir que le code.

## Démarrage rapide

```bash
npm install
cp .env.example .env.local   # puis renseigner les valeurs — voir CONFIGURATION.md
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). Le back-office est sur `/admin` (redirige vers `/admin/login` tant qu'aucun compte admin n'existe — voir CONFIGURATION.md pour créer le premier compte).

## Scripts

| Commande | Effet |
|---|---|
| `npm run dev` | Serveur de développement (Turbopack, par défaut en Next.js 16). |
| `npm run build` | Build de production. |
| `npm run start` | Démarre le build de production en local. |
| `npm run lint` | ESLint (flat config). |

## Structure du projet

```
sitewebdigisetinstitute/        # racine du dépôt Git
├── src/
│   ├── app/
│   │   ├── (public)/         # Toutes les pages publiques (Header + Footer partagés)
│   │   ├── admin/
│   │   │   ├── login/        # Connexion (sans sidebar)
│   │   │   └── (dashboard)/  # Écrans du back-office (avec sidebar), protégés par proxy.ts
│   │   └── api/               # Route Handlers (formulaires publics)
│   ├── components/
│   │   ├── ui/                # Composants shadcn/ui
│   │   ├── layout/             # Header, Footer, AdminSidebar
│   │   └── page-stub.tsx       # Placeholder utilisé par tous les écrans en attendant Stitch
│   ├── lib/
│   │   ├── supabase/           # Clients navigateur / serveur / admin (service role)
│   │   ├── validations/        # Schémas Zod des 4 formulaires
│   │   ├── email.ts             # Notifications via Resend
│   │   └── api-helpers.ts       # Honeypot anti-spam, formatage d'erreurs
│   └── proxy.ts                 # Protection de /admin/* (équivalent middleware en Next 16)
└── supabase/
    └── migrations/
        └── 0001_init_schema.sql # Schéma complet (tables + RLS), cf. PRD §7
```

## Pourquoi chaque page est un "stub"

Chaque route publique et chaque écran admin affiche pour l'instant un composant `PageStub` qui liste les sections attendues (issues de `liste-pages-sections-maquettes.md`). C'est volontaire : l'objectif de cette étape est de préparer un environnement de développement complet (routing, backend, sécurité, design tokens) prêt à recevoir, fichier par fichier, l'UI générée dans Google Stitch — sans avoir à improviser une arborescence ou une logique backend en cours de route.

## Note Next.js 16

Ce projet utilise Next.js 16, qui introduit des changements par rapport aux versions précédentes (`middleware.ts` renommé en `proxy.ts`, `params`/`searchParams`/`cookies()`/`headers()` toujours asynchrones, Turbopack par défaut). Avant de modifier des fichiers de convention (`proxy.ts`, `route.ts`, `layout.tsx`), consulter `node_modules/next/dist/docs/01-app/` qui contient la documentation exacte de la version installée.
