# gemini.md — Contexte complet du projet Digi-SET Institute

> Ce fichier est destiné à toute IA (Gemini, Claude, ou autre) qui reprend ce projet. Il donne le contexte métier, les décisions déjà prises, l'état actuel du code et les prochaines étapes — pour comprendre le projet sans avoir à relire tout l'historique de conversation. Les documents de référence complets sont cités à chaque section ; ce fichier en est le résumé de navigation, pas un remplacement.

---

## 1. Le projet en une phrase

Un site web institutionnel + back-office autonome pour **Digi-SET Institute** (Libreville, Gabon), un établissement supérieur privé qui forme aux métiers du numérique (IA & Data Science, Cybersécurité, Systèmes de Paiement) — construit en **Next.js 16 + Supabase (SupaAuth)**, déployé via **GitHub → Vercel**, avec **Hostinger conservé uniquement pour le DNS** du domaine `digiset-gabon.com`.

Le propriétaire (non technique) doit pouvoir gérer tout le contenu du site (textes, images, actualités, candidatures reçues) **sans jamais toucher au code**, via un espace `/admin` protégé.

---

## 2. Qui est le client — contexte métier indispensable

**Digi-SET Institute** (Digital Science, Engineering and Technology Institute) — lancement officiel des activités en **septembre 2026**. Trois publics distincts à servir sur le site :

1. **Futurs étudiants / familles** — classe préparatoire MP2I (Bac à Bac+2), puis Licence Professionnelle en Technologies du Numérique et Cybersécurité (Bac+3, 3 options : *IA & Data Science*, *Cybersécurité*, *Systèmes de Paiement Électronique*).
2. **Entreprises / administrations** — formations continues (4 axes : Cybersécurité, IA & Data Science, Systèmes de paiements électroniques, Management & stratégie du numérique) et certifications professionnelles (Cisco, Microsoft, AWS, Linux, CompTIA...).
3. **Établissements scolaires** (classes prépa scientifiques) — location des laboratoires de TP de l'institut (physique, électricité, optique...), avec une grille tarifaire précise (forfait 5 manipulations = 500 000 FCFA, forfait 10 = 800 000 FCFA).

Il existe aussi **DigiSET Online** (formation à distance) et un service de **Consulting IT**.

Le site doit capter des **leads qualifiés** via 3 formulaires dédiés (candidature, demande de formation continue, demande de location de labo) — **pas de paiement en ligne en V1** (décision produit confirmée), le suivi des paiements/inscriptions reste manuel côté équipe Digi-SET après réception d'une soumission.

Le client s'est explicitement inspiré de **forhom.com** (organisme de formation professionnelle) pour la structure (navigation par familles de formation, moteur de filtrage, cartes de programme, bandeau de certifications, carrousel de témoignages) — mais à l'échelle d'un institut en lancement, pas d'un acteur avec 40 ans d'historique.

---

## 3. Documents de référence — à lire selon le besoin

Tous dans `contenu local/00-Reference-projet/` (dossier **volontairement exclu de Git**, cf. §7) :

| Document | Contenu | Quand le lire |
|---|---|---|
| `PRD-digiset-institute.md` | Le document produit complet : vision, personas, les **18 pages publiques** et **13 écrans admin** détaillés, fonctionnalités MVP, user stories, modèle de données Supabase, architecture de déploiement, hors-scope, risques, métriques | Avant toute décision fonctionnelle — c'est la source de vérité du "quoi" |
| `design-system-digiset-institute.md` | Identité de marque, palette de couleurs, typographie, tokens, spécification de chaque composant UI (header, cartes, formulaires, back-office), gabarits de page section par section, règles d'accessibilité/motion | Avant toute décision visuelle — c'est la source de vérité du "à quoi ça ressemble" |
| `cahier-des-charges-digiset.docx`, `digiset website_21072026.docx`, `Resume_fonctionnel_Site_Web_DigiSET-1.docx` | Documents source **fournis par le client** (contenu brut des programmes, tarifs, textes du fondateur, arborescence originale) | Pour retrouver un texte ou un chiffre exact non encore repris dans le PRD |

Au niveau racine du projet (ceux-là **sont** dans Git, ce sont des outils de travail pour la phase de conception) :

| Document | Contenu |
|---|---|
| `checklist-contenus-avant-maquettes.md` | Checklist de tous les assets/contenus à réunir ou demander au client avant/pendant la conception UI (logo, photos, textes définitifs, docs légaux...), avec leur statut (✓ disponible / à demander / à produire) |
| `liste-pages-sections-maquettes.md` | Checklist exhaustive des **35 écrans** (18 pages publiques + variantes + 13 écrans admin), chacun avec ses sections dans l'ordre d'affichage — c'est la checklist utilisée pour générer les stubs de page (voir §5) et pour la conception dans Google Stitch |
| `CONFIGURATION.md` | Sécurité (RLS, gestion des clés), liste complète des endpoints API, et **tutoriel pas-à-pas** pour créer les comptes/projets externes (GitHub, Supabase, Vercel, Resend, Hostinger DNS, Google Maps) — nécessaire car un agent IA ne peut pas créer de compte lui-même |
| `README.md` | Démarrage rapide du projet (scripts npm, structure de dossiers) |

---

## 4. Stack technique et pourquoi

| Choix | Techno | Pourquoi |
|---|---|---|
| Framework | **Next.js 16** (App Router, Turbopack) | Imposé par le client. **⚠️ Next.js 16 a des breaking changes par rapport aux connaissances par défaut d'un LLM** — voir §8, c'est critique. |
| Backend / DB | **Supabase** (Postgres + Storage) | Imposé par le client, permet un back-office maison sans CMS tiers |
| Auth | **SupaAuth** (= Supabase Auth via `@supabase/ssr`) | Réservé aux comptes back-office uniquement — pas de compte visiteur public en V1 |
| Styling | **Tailwind CSS v4** (config CSS-native via `@theme`, pas de `tailwind.config.ts`) | Version installée par défaut avec `create-next-app` à la date du scaffold |
| Composants UI | **shadcn/ui**, preset *Base UI / Nova* (`components.json` → `"style": "base-nova"`) | Composants accessibles, stylisables avec les tokens de marque |
| Validation | **Zod v4** (API `z.email()`, `z.uuid()` top-level, pas `.string().email()`) | Version installée — vérifier la version avant d'utiliser une syntaxe Zod v3 |
| Email transactionnel | **Resend** | Notifications de soumission de formulaire + confirmation au demandeur |
| Hébergement app | **Vercel** (déploiement automatique depuis GitHub) | — |
| Hébergement domaine | **Hostinger** — **DNS uniquement**, aucun code n'y est hébergé | Décision explicitement confirmée avec l'utilisateur (le domaine `digiset-gabon.com` y était déjà réservé) |
| Dépôt de code | GitHub — **https://github.com/mediaboostia-web/digiset_institute** (branche `main`) | Déjà poussé, voir §7 |
| Design des maquettes | **Google Stitch** (outil IA de génération d'UI), intégré via un serveur **MCP** | Projet Stitch nommé **"DigiSET Institute Digital Platform"** — étape en cours, voir §9 |

---

## 5. État actuel du code — ce qui existe déjà

Le projet est un **scaffold complet et fonctionnel**, mais dont les pages sont volontairement des **stubs en attente des maquettes Stitch** — pas encore l'UI finale.

```
/  (racine du repo Git = racine du projet Next.js)
├── src/
│   ├── app/
│   │   ├── (public)/          # Toutes les pages publiques, layout partagé Header+Footer
│   │   │   ├── page.tsx                              # Accueil
│   │   │   ├── programmes/                            # + classe-preparatoire, licence-professionnelle
│   │   │   │   └── licence-professionnelle/            #   (+ 3 options : ia-data-science, cybersecurite, systemes-paiement)
│   │   │   │   └── formation-continue/ (+ /demande)
│   │   │   │   └── certifications/, digiset-online/
│   │   │   ├── services/ (+ location-laboratoires (+/demande), consulting-it)
│   │   │   ├── vie-etudiante/, institution/, actualites/ (+ [slug])
│   │   │   ├── inscription/ (+ /candidature)
│   │   │   ├── contact/, mentions-legales/, politique-de-confidentialite/, maintenance/
│   │   │   └── layout.tsx      # Header + Footer
│   │   ├── admin/
│   │   │   ├── login/page.tsx           # Connexion (SANS sidebar)
│   │   │   └── (dashboard)/             # Sidebar partagée, protégée par proxy.ts
│   │   │       ├── page.tsx              # Dashboard (/admin)
│   │   │       ├── soumissions/, programmes/, actualites/, galerie/,
│   │   │       │   temoignages/, partenaires/, equipe/, pages/,
│   │   │       │   documents/, utilisateurs/, parametres/
│   │   ├── api/
│   │   │   ├── submissions/{registration,training-request,lab-request}/route.ts
│   │   │   └── contact/route.ts
│   │   ├── layout.tsx           # Root layout : fonts (Sora/Inter), <Toaster/>
│   │   ├── globals.css          # Design tokens Tailwind v4 (@theme), palette réelle du logo
│   │   └── not-found.tsx        # 404
│   ├── components/
│   │   ├── ui/                  # shadcn/ui (button, card, table, dialog, tabs, accordion...)
│   │   ├── layout/               # Header, Footer, AdminSidebar (squelettes fonctionnels)
│   │   └── page-stub.tsx         # ⚠️ Voir explication ci-dessous
│   ├── lib/
│   │   ├── supabase/{client,server,admin}.ts   # Client navigateur / SSR / service_role
│   │   ├── validations/*.ts                     # Schémas Zod des 4 formulaires
│   │   ├── email.ts                              # Wrapper Resend
│   │   └── api-helpers.ts                        # Honeypot anti-spam, formatage d'erreurs
│   └── proxy.ts                  # ⚠️ PAS middleware.ts — voir §8. Protège /admin/*
├── supabase/migrations/0001_init_schema.sql   # Schéma complet : 14 tables + RLS + 3 buckets Storage
├── public/brand/logo-digiset.png              # Logo officiel (déjà intégré)
└── .env.example                                # Toutes les variables d'environnement nécessaires
```

### Le composant `PageStub`

**Chaque page publique et chaque écran admin affiche actuellement un `<PageStub title="..." route="..." sections={[...]} />`** au lieu d'une UI finale. C'est intentionnel : ce composant liste les sections attendues (issues de `liste-pages-sections-maquettes.md`) pour que rien ne soit oublié quand on remplace le contenu par les maquettes générées dans Stitch. **Le travail actuel/à venir consiste à remplacer, fichier par fichier, chaque `PageStub` par la vraie UI**, en respectant l'ordre des sections déjà documenté et les tokens du design system.

### Le modèle de données Supabase

`supabase/migrations/0001_init_schema.sql` (485 lignes) contient déjà tout : tables `programs`, `program_options`, `news`, `team_members`, `testimonials`, `partners`, `media_library`, `documents`, `submissions_registration`, `submissions_training_request`, `submissions_lab_request`, `contact_messages`, `site_settings`, `admin_users` — avec RLS complète (lecture publique du contenu publié, écriture réservée aux comptes `admin_users`, insertion publique uniquement sur les tables de soumission) et 3 buckets Storage (`site-media`, `site-documents` publics ; `candidate-documents` privé). **Ce script n'a pas encore été exécuté sur un vrai projet Supabase** — aucun projet Supabase n'existe encore (voir CONFIGURATION.md §4).

### Ce qui n'est PAS encore fait

- Aucun compte/projet externe créé (Supabase, Vercel, Resend) — tout est documenté en tutoriel dans `CONFIGURATION.md` mais rien n'est exécuté, ces créations nécessitent une action humaine (navigateur + identifiants).
- Le site n'est donc pas déployé, et le back-office n'est pas utilisable (pas de session Supabase possible sans projet réel).
- **L'UI finale des 35 écrans n'existe pas encore** — c'est l'étape en cours (voir §9).
- La connexion `/admin` telle qu'écrite dans `proxy.ts` redirige vers `/admin/login` dès que les variables Supabase sont absentes (comportement voulu, cf. commentaire dans le fichier) plutôt que de faire planter tout le site.

---

## 6. Palette de couleurs réelle (importante — ne pas réinventer)

La palette du design system a été **corrigée par échantillonnage de pixels sur le vrai logo** (`contenu local/01-Identite-de-marque/logoDigiSET.png`), pas devinée :

| Token CSS (`globals.css`) | Valeur | Usage |
|---|---|---|
| `--brand-blue` | `#0057B7` | Bleu vif — liens, éléments interactifs secondaires |
| `--brand-blue-dark` | `#002F6E` | Bleu marine foncé — header/footer/sidebar admin, blocs d'autorité |
| `--brand-orange` | `#F2690A` | Orange — **couleur des CTA primaires** (boutons "S'inscrire", "Faire une demande") |
| `--brand-orange-dark` | `#D94D06` | Orange foncé — état hover/actif |

Règle du design system : le bleu domine (structure/autorité), l'orange n'apparaît que sur 1-2 éléments d'action par écran — jamais en fond de section large. Polices : **Sora** (titres, via `next/font`, variable `--font-heading`) + **Inter** (corps, variable `--font-body`).

---

## 7. État Git / GitHub

- Dépôt : **https://github.com/mediaboostia-web/digiset_institute** (branche `main`, actuellement **public** en lecture — à repasser en privé si ce n'est pas voulu).
- `contenu local/` (assets bruts, docx client, PRD/design-system en `.md`) est **volontairement exclu du dépôt** via `.gitignore` — ce dossier ne doit **jamais** être commité (contient des documents internes/personnels : docx du client, éventuellement des infos de contact).
- `.claude/` (état local du harness Claude Code) est également exclu.
- `.env.example` est **intentionnellement suivi** (c'est un template sans secret) ; tout `.env.local`/`.env` réel est ignoré.
- Vérification déjà faite (via l'API GitHub, comparaison de SHA) : aucun fichier sensible n'est présent sur le dépôt distant.

---

## 8. Pièges spécifiques à Next.js 16 — à vérifier avant d'écrire du code

Ce projet utilise **Next.js 16**, sorti après la plupart des données d'entraînement des modèles de langage courants. Un fichier `AGENTS.md` (et `CLAUDE.md` qui l'importe) à la racine le rappelle explicitement : **avant d'écrire du code touchant au routing, aux Route Handlers, ou aux conventions de fichiers, consulter `node_modules/next/dist/docs/01-app/`** (documentation exacte de la version installée, embarquée dans le paquet npm).

Changements déjà rencontrés et déjà appliqués dans ce codebase :

- **`middleware.ts` → `proxy.ts`** : le fichier s'appelle `src/proxy.ts` et exporte une fonction `proxy()`, pas `middleware()`. Toute doc/tutoriel qui parle de "middleware Next.js" est probablement obsolète pour ce projet.
- **`params`, `searchParams`, `cookies()`, `headers()` sont TOUJOURS des Promises** — plus de mode de compatibilité synchrone (ex. `const { slug } = await params` dans `actualites/[slug]/page.tsx`).
- **Turbopack est le bundler par défaut** (`next dev` / `next build`), plus besoin du flag `--turbopack`.
- **ESLint en flat config** par défaut (`eslint.config.mjs`), `next lint` a été supprimé — on utilise `eslint` directement (`npm run lint`).
- Zod installé en **v4** : utiliser `z.email()`, `z.uuid()`, `z.enum([...], "message")` (API top-level), pas la syntaxe `.string().email()` de Zod v3 (qui fonctionne encore mais n'est plus la forme recommandée).
- Tailwind v4 : pas de `tailwind.config.ts`, les tokens sont déclarés en CSS natif via `@theme` dans `src/app/globals.css`.

**Réflexe à avoir** : avant d'utiliser une API Next.js, Zod ou Tailwind "de mémoire", vérifier la version réellement installée (`package.json`) et, en cas de doute sur Next.js, lire le dossier de doc embarqué plutôt que de faire confiance à des connaissances génériques potentiellement datées.

---

## 9. Où on en est / prochaine étape

**Étape en cours** : connexion à un serveur MCP **Google Stitch** pour inspecter un projet de maquettes déjà créé par l'utilisateur, nommé **"DigiSET Institute Digital Platform"**, et en compter les écrans.

**Étapes suivantes annoncées par l'utilisateur, dans cet ordre** :
1. Inspecter le projet Stitch (nombre d'écrans, contenu).
2. **Intégrer chaque maquette Stitch avec le design system** — remplacer les `PageStub` par la vraie UI, en respectant les tokens (`--brand-blue`, `--brand-orange`, etc.) et les composants déjà installés (`src/components/ui/`).
3. **Câbler la logique et les fonctionnalités** de chaque page (filtres de la page Programmes, formulaires connectés aux routes API déjà existantes en `src/app/api/`, etc.) — le back-end (routes API, schémas Zod, migration SQL) existe déjà et est prêt à être branché.
4. **Connecter le backend réel** : ce n'est qu'à cette étape que les comptes Supabase/Vercel/Resend seront effectivement créés en suivant `CONFIGURATION.md`, et que le site sera déployé.

Toute IA reprenant ce projet devrait donc **chercher en premier si un projet Stitch a été inspecté et ce qu'il contient**, avant de proposer de re-générer des maquettes ou de re-décider de l'architecture — ces décisions sont déjà prises et documentées ci-dessus.
