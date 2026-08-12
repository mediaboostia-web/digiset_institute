# 📘 Guide d'Architecture Technique & Manuel de Maintenance
## Plateforme Web & Back-Office DigiSET Institute (Gabon)

> **Document de Référence Technique — Version 1.2 (Août 2026)**  
> Ce document est le guide d'architecture complet de la plateforme DigiSET Institute. Il contient l'arborescence, le schéma de la base de données, la configuration des API, les règles de sécurité RBAC et la procédure étape par étape pour effectuer les futures mises à jour en toute sérénité.

---

## 📍 1. Vue d'Ensemble de la Stack Technique

| Composant | Technologie Utilisée | Rôle & Usage |
|---|---|---|
| **Framework Web** | **Next.js 16** (App Router & Turbopack) | Moteur d'application fullstack, rendu hybride SSR/SSG & Route Handlers. |
| **Langage** | **TypeScript 5** / React 19 | Typage strict et développement sécurisé. |
| **Base de Données** | **Supabase Postgres** | Stockage persistant des actualités, membres de l'équipe, médias et soumissions. |
| **Authentification** | **SupaAuth** (`@supabase/ssr`) + Fallback Admin | Gestion des sessions d'administration et protection du dossier `/admin`. |
| **Styling & UI** | **Tailwind CSS v4** + **shadcn/ui** (Base UI Nova) | Design system sur-mesure aux couleurs de DigiSET (`--brand-blue`, `--brand-orange`). |
| **Email Transactionnel** | **Resend API** | Notifications de candidatures reçues et accusés de réception aux étudiants. |
| **Hébergement App** | **Vercel** (Production Cloud & Edge CDN) | Déploiement automatique depuis le dépôt GitHub `main`. |
| **Gestion DNS** | **Hostinger** | Gestionnaire de zone DNS pour le domaine officiel `digiset-gabon.com`. |
| **Code Source** | **GitHub** | `https://github.com/mediaboostia-web/digiset_institute` |

---

## 🌐 2. Liens Officiels & Identifiants de Production

* **Site Public** : [https://www.digiset-gabon.com](https://www.digiset-gabon.com)
* **Back-Office Admin** : [https://www.digiset-gabon.com/admin](https://www.digiset-gabon.com/admin)
* **Identifiant Super-Admin** : `contact@digiset-gabon.com`
* **Mot de passe par défaut** : `DigiSET2026@`

---

## 🗄️ 3. Schéma de la Base de Données (Supabase Postgres)

Les données de la plateforme sont stockées de façon permanente dans la base de données Supabase (`ntrqhelicjvaolghuqii.supabase.co`). Voici la structure des principales tables :

### A. Table `team_members` (Organigramme & Équipe)
```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  pole TEXT DEFAULT 'Direction Générale',
  photo_url TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

### B. Table `news` (Actualités & Articles)
```sql
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  cover_image_url TEXT,
  excerpt TEXT,
  body TEXT NOT NULL,
  status TEXT DEFAULT 'published', -- 'published' ou 'draft'
  published_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

### C. Table `media_library` (Banque de Médias)
```sql
CREATE TABLE media_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  caption TEXT,
  uploaded_at TIMESTAMPTZ DEFAULT now()
);
```

### D. Tables de Soumissions & Formulaires
* **`submissions_registration`** : Candidatures en Licence Pro & Prépa MP2I.
* **`submissions_training_request`** : Demandes de devis de Formations Continues d'Entreprise.
* **`submissions_lab_request`** : Demandes de location de Laboratoires TP par les lycées.
* **`contact_messages`** : Messages du formulaire de contact.

---

## 🔐 4. Variables d'Environnement (`.env.local` & Vercel)

Toutes les clés d'accès sont configurées dans `.env.local` pour le développement local et injectées sur **Vercel** pour la production :

```env
# --- Supabase Database & Auth ---
NEXT_PUBLIC_SUPABASE_URL=https://ntrqhelicjvaolghuqii.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci... (Clé publique Supabase)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci... (Clé Service Role Supabase)

# --- Emailing Resend ---
RESEND_API_KEY=re_your_resend_api_key_here (Clé API Resend)
NOTIFICATION_EMAIL_TO=contact@digiset-gabon.com

# --- Configuration URL ---
NEXT_PUBLIC_SITE_URL=https://www.digiset-gabon.com
```

> ⚠️ **Sécurité** : Ne divulguez jamais la clé `SUPABASE_SERVICE_ROLE_KEY` ni la clé `RESEND_API_KEY` sur un dépôt public.

---

## 📁 5. Arborescence du Code Source (`src/`)

```
src/
├── app/
│   ├── (public)/                 # Pages publiques du site (Header + Footer partagés)
│   │   ├── page.tsx              # Page d'Accueil
│   │   ├── institution/          # Présentation & Organigramme Public
│   │   ├── programmes/           # Cursus (Prépa MP2I, Licences Pro, Formation Continue)
│   │   ├── actualites/           # Blog & Actualités
│   │   ├── inscription/          # Formulaire de Candidature en ligne
│   │   └── contact/              # Page Contact & Localisation
│   ├── admin/
│   │   ├── login/page.tsx        # Page de Connexion Administrateur
│   │   └── (dashboard)/          # Back-Office protégé (Sidebar unifiée)
│   │       ├── page.tsx          # Tableau de bord & KPIs
│   │       ├── equipe/           # Gestion de l'Organigramme
│   │       ├── actualites/       # Gestion des Articles
│   │       ├── galerie/          # Gestion de la Médiathèque & Tags
│   │       ├── soumissions/      # Suivi des Candidatures & Demandes
│   │       ├── utilisateurs/     # Gestion des Accès RBAC
│   │       └── parametres/       # Configuration Système
│   ├── api/
│   │   ├── team/route.ts         # Endpoint API Organigramme (GET, POST, PATCH, DELETE)
│   │   ├── news/route.ts         # Endpoint API Actualités (GET, POST, PATCH, DELETE)
│   │   ├── media/route.ts        # Endpoint API Médiathèque (GET, POST, PATCH, DELETE)
│   │   └── submissions/          # Endpoints de réception des formulaires
│   ├── globals.css               # Design Tokens & Palette Logo (`--brand-blue`, `--brand-orange`)
│   └── proxy.ts                  # Contrôle d'accès middleware Next.js 16 (/admin/*)
├── components/
│   ├── layout/                   # Header, Footer, AdminSidebar, AdminHeader
│   └── ui/                       # Composants UI shadcn/ui (Button, Dialog, Badge, Table...)
└── lib/
    ├── supabase/                 # Clients Supabase (server.ts, client.ts, admin.ts)
    ├── admin-data.ts             # Typer et données initiales
    ├── team-store.ts             # Gestionnaire de mémoire de secours Organigramme
    ├── news-store.ts             # Gestionnaire de mémoire de secours Actualités
    └── media-store.ts            # Gestionnaire de mémoire de secours Médiathèque
```

---

## 🛠️ 6. Procédure Pas-à-Pas pour Déployer une Mise à Jour

Lorsque vous devez apporter des modifications au code ou ajouter de nouvelles fonctionnalités, suivez cette méthode simple en 4 étapes :

### Étape 1 : Tester en local
Ouvrez le terminal dans le dossier du projet et vérifiez la compilation :
```bash
npx next build
```
*Si la commande affiche `✓ Compiled successfully`, votre code est sans erreur.*

### Étape 2 : Enregistrer les modifications sur Git
```bash
git add .
git commit -m "feat: description de votre mise à jour"
```

### Étape 3 : Pousser sur GitHub
```bash
git push origin main
```

### Étape 4 : Déployer en Production sur Vercel
```bash
npx vercel --prod --yes
```
*Votre mise à jour est immédiatement déployée sur **[www.digiset-gabon.com](https://www.digiset-gabon.com)** !*

---

## 🛡️ 7. Gestion des Rôles & Sécurité (RBAC)

Le système gère deux niveaux de privilèges dans le Back-Office :

1. **Super-Administrateur (`super_admin`)** :
   - Accès total à tous les onglets.
   - Gestion de l'Organigramme, des Actualités, de la Médiathèque, des Soumissions.
   - Accès exclusif aux **Paramètres Système** et à la **Gestion des Comptes Administrateurs**.

2. **Éditeur de Contenu (`editor`)** :
   - Accès autorisé à la rédaction d'actualités, gestion de la médiathèque et mise à jour de l'équipe.
   - **Accès restreint** : Les onglets *Paramètres* et *Comptes Utilisateurs* affichent une alerte de sécurité et désactivent la modification.

---

## 📞 8. Assistance & Support Technique

Ce document doit être conservé dans le dépôt de code principal (`DOCUMENTATION_ARCHITECTURE_DIGISET.md`). Tout développeur ou ingénieur reprenant le projet dispose ici de l'intégralité du contexte métier et technique de **DigiSET Institute**.
