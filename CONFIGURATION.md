# Configuration — Digi-SET Institute

Ce document couvre tout ce qu'il faut pour faire tourner ce projet en local, puis le mettre en ligne : sécurité, endpoints API, et surtout le **tutoriel pas-à-pas** pour chaque compte/service qui ne peut pas être créé automatiquement (aucun outil ne peut ouvrir un navigateur ou saisir un mot de passe à votre place). Suivre les sections dans l'ordre — chacune dépend souvent de la précédente.

---

## 1. Vue d'ensemble de l'architecture

```
GitHub (code)  →  Vercel (build + hébergement)  →  Supabase (base de données, auth, fichiers)
                                                          ↑
                                              Hostinger (DNS uniquement — digiset-gabon.com)
```

- **GitHub** héberge le code source et l'historique des versions.
- **Vercel** construit et exécute l'application Next.js à chaque push (aucune installation serveur manuelle).
- **Supabase** héberge la base de données Postgres, l'authentification des comptes admin (SupaAuth) et le stockage des fichiers (photos, documents, pièces jointes).
- **Hostinger** ne sert plus qu'à pointer le nom de domaine `digiset-gabon.com` vers Vercel — il n'héberge aucun code (décision confirmée, cf. PRD §9).

Aucun paiement en ligne, aucune fonctionnalité tierce complexe : la liste des comptes à créer ci-dessous est volontairement courte.

---

## 2. Checklist de configuration (vue d'ensemble)

- [ ] Compte GitHub + dépôt créé pour ce projet
- [ ] Compte Supabase + projet créé
- [ ] Migration SQL exécutée (`supabase/migrations/0001_init_schema.sql`)
- [ ] 3 buckets Storage créés (automatique via la migration — à vérifier)
- [ ] Premier compte admin créé (Super-admin)
- [ ] Compte Vercel + projet connecté au dépôt GitHub
- [ ] Variables d'environnement saisies dans Vercel (voir `.env.example`)
- [ ] Compte Resend + domaine d'envoi vérifié + clé API
- [ ] URL d'intégration Google Maps récupérée
- [ ] DNS Hostinger pointé vers Vercel
- [ ] Premier déploiement de production vérifié sur `digiset-gabon.com`

---

## 3. Tutoriel — Créer le dépôt GitHub

1. Sur [github.com](https://github.com), cliquer sur **New repository**.
2. Nom suggéré : `digiset-institute-website`. Visibilité : **Private** (le code contient de la logique métier et, à terme, des données sensibles côté client — pas de raison de le rendre public).
3. Ne pas cocher "Add a README" (le projet en a déjà un) ni ".gitignore" (déjà généré par `create-next-app`).
4. Une fois le dépôt créé, GitHub affiche une URL du type `https://github.com/<votre-compte>/digiset-institute-website.git`.
5. Depuis la racine du projet en local (un dépôt Git y est déjà initialisé avec un premier commit) :

   ```bash
   git remote add origin https://github.com/<votre-compte>/digiset-institute-website.git
   git branch -M main
   git push -u origin main
   ```

> **Avant de pousser** : le dossier `contenu local/` (assets, documents source du client) vit maintenant à l'intérieur de ce même dossier de projet, mais il est exclu via `.gitignore`. Lancer `git status` avant tout `git add` et vérifier qu'aucun fichier de `contenu local/` n'apparaît en `?? ` prêt à être ajouté — ce dossier ne doit jamais atterrir dans l'historique Git.
>
> **Ne pas exécuter cette étape sans confirmation si un assistant IA gère ce dépôt pour vous** — un push publie le code sur un service externe visible par d'autres personnes.

---

## 4. Tutoriel — Créer le projet Supabase

1. Sur [supabase.com](https://supabase.com), créer un compte puis un nouveau projet (**New project**).
2. Choisir une région proche du public cible (ex. `eu-west` — Europe, la latence vers le Gabon y est raisonnable ; Supabase ne propose pas encore de région Afrique).
3. Noter le mot de passe de base de données généré (utile pour un accès direct `psql`, pas indispensable pour le fonctionnement du site).
4. Une fois le projet créé, aller dans **Project Settings > API** :
   - Copier **Project URL** → variable `NEXT_PUBLIC_SUPABASE_URL`
   - Copier **anon public key** → variable `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copier **service_role key** → variable `SUPABASE_SERVICE_ROLE_KEY` (⚠️ secrète, jamais dans le code ni dans un dépôt public — voir section Sécurité)

### 4.1 Exécuter le schéma de base de données

1. Dans le dashboard Supabase, ouvrir **SQL Editor**.
2. Ouvrir le fichier `supabase/migrations/0001_init_schema.sql` de ce projet, copier tout son contenu.
3. Coller dans l'éditeur SQL Supabase et cliquer **Run**.
4. Vérifier dans **Table Editor** que les tables suivantes existent : `programs`, `program_options`, `news`, `team_members`, `testimonials`, `partners`, `media_library`, `documents`, `submissions_registration`, `submissions_training_request`, `submissions_lab_request`, `contact_messages`, `site_settings`, `admin_users`.
5. Vérifier dans **Storage** que 3 buckets existent : `site-media` (public), `site-documents` (public), `candidate-documents` (privé). Ils sont créés automatiquement par le script SQL de l'étape précédente.

### 4.2 Créer le premier compte admin (Super-admin)

Le premier compte admin ne peut pas s'auto-inviter (il n'existe personne pour l'inviter) — il se crée en deux étapes :

1. Dans le dashboard Supabase, aller dans **Authentication > Users** puis **Add user** → **Create new user**. Renseigner l'email et un mot de passe temporaire (à changer à la première connexion).
2. Copier l'**UID** de l'utilisateur créé (visible dans la liste).
3. Retourner dans **SQL Editor** et exécuter :

   ```sql
   insert into admin_users (id, full_name, role)
   values ('<UID copié>', 'Nom Prénom', 'super_admin');
   ```

4. Ce compte peut désormais se connecter sur `/admin/login` et, une fois le back-office développé (section "Utilisateurs admin"), inviter d'autres comptes sans repasser par le SQL Editor.

---

## 5. Tutoriel — Créer le projet Vercel

1. Sur [vercel.com](https://vercel.com), créer un compte (connexion via GitHub recommandée — simplifie l'étape suivante).
2. **Add New... > Project**, puis sélectionner le dépôt GitHub créé à l'étape 3.
3. Vercel détecte automatiquement Next.js — aucune configuration de build à modifier (le projet Next.js est à la racine du dépôt, laisser le champ "Root Directory" vide dans Vercel).
4. Avant de cliquer sur **Deploy**, ouvrir la section **Environment Variables** et saisir toutes les variables listées dans `.env.example` avec leurs vraies valeurs (Supabase, Resend, etc. — voir sections précédentes et suivantes).
5. Cliquer **Deploy**. Vercel fournit une URL de prévisualisation du type `digiset-institute-website.vercel.app` — c'est déjà un site fonctionnel, avant même de connecter le nom de domaine.
6. Pour chaque Pull Request ouverte sur GitHub par la suite, Vercel génère automatiquement une URL de preview distincte — pratique pour valider un changement avant de le mettre en ligne.

---

## 6. Tutoriel — Connecter le domaine Hostinger à Vercel

1. Dans le projet Vercel, aller dans **Settings > Domains**, ajouter `digiset-gabon.com` (et `www.digiset-gabon.com` si souhaité).
2. Vercel affiche les enregistrements DNS à créer (généralement un enregistrement `A` pointant vers une IP Vercel, ou un `CNAME` pour le sous-domaine `www`).
3. Se connecter à l'espace client Hostinger (compte déjà actif, cf. cahier des charges) → **Domaines > digiset-gabon.com > DNS / Nameservers**.
4. Ajouter les enregistrements exactement comme indiqué par Vercel (ne pas improviser les valeurs — elles sont spécifiques à chaque projet Vercel).
5. La propagation DNS peut prendre de quelques minutes à 24h. Vercel affiche un statut "Valid Configuration" une fois la propagation terminée et le certificat SSL généré automatiquement.

> **Action à confirmer explicitement avant de l'exécuter** : modifier les DNS d'un domaine en production peut couper temporairement l'accès à un site existant. À faire en dehors des heures de forte affluence si un ancien site est encore actif sur ce domaine.

---

## 7. Tutoriel — Créer un compte Resend (notifications email)

1. Sur [resend.com](https://resend.com), créer un compte.
2. **Domains > Add Domain**, saisir `digiset-gabon.com`, puis ajouter les enregistrements DNS (SPF/DKIM) fournis par Resend dans l'espace client Hostinger (même écran DNS qu'à l'étape 6) — nécessaire pour que les emails ne finissent pas en spam.
3. Une fois le domaine vérifié (statut "Verified"), aller dans **API Keys > Create API Key** → copier la clé dans la variable `RESEND_API_KEY`.
4. Définir `NOTIFICATION_EMAIL_TO` sur l'adresse qui doit recevoir les notifications de candidature/demande (ex. `contact@digiset-gabon.com` ou une adresse dédiée à la scolarité).

---

## 8. Tutoriel — Récupérer l'URL Google Maps

1. Aller sur [Google Maps](https://maps.google.com), rechercher l'adresse : *Angondje, Carrefour Moussavou (bvd de la 5e République), Akanda, Gabon*.
2. Cliquer **Partager > Intégrer une carte**, copier l'URL du champ `src="..."` de l'iframe proposée.
3. Coller cette URL dans la variable `NEXT_PUBLIC_GOOGLE_MAPS_EMBED_URL`.

Aucune clé d'API Google Cloud n'est nécessaire pour ce niveau d'intégration (simple iframe, pas d'appel à l'API JavaScript Maps).

---

## 9. Anti-spam avancé (optionnel)

Le honeypot (champ caché `website`, cf. section Sécurité) suffit contre la majorité des robots de spam basiques. Si un volume de spam anormal est constaté après le lancement, activer reCAPTCHA v3 :

1. Sur [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin), créer un site reCAPTCHA v3 pour `digiset-gabon.com`.
2. Renseigner `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` et `RECAPTCHA_SECRET_KEY`.
3. L'intégration côté formulaire n'est pas encore câblée dans ce scaffold (les variables sont réservées) — à implémenter uniquement si le besoin se confirme, pour ne pas ajouter de complexité inutile en V1.

---

## 10. Sécurité

### Clés et secrets

| Clé | Où elle peut apparaître | Ne JAMAIS faire |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Code client (navigateur) — c'est son rôle | — |
| `SUPABASE_SERVICE_ROLE_KEY` | Uniquement `src/lib/supabase/admin.ts`, exécuté côté serveur | Ne jamais l'utiliser dans un fichier `"use client"`, ne jamais la commiter dans Git, ne jamais la mettre dans une variable `NEXT_PUBLIC_*` |
| `RESEND_API_KEY` | Uniquement `src/lib/email.ts`, côté serveur | Idem |
| `.env.local` | Local uniquement | Ne jamais commiter ce fichier (déjà exclu par `.gitignore` généré par `create-next-app`) |

Le paquet `server-only` est importé en tête de `admin.ts` et `email.ts` : si l'un de ces fichiers est accidentellement importé depuis un composant client, **le build échoue immédiatement** plutôt que d'exposer la clé au navigateur.

### Row Level Security (RLS)

Toutes les tables ont RLS activée (cf. `supabase/migrations/0001_init_schema.sql`). Principe appliqué partout :

- **Contenu éditorial** (`programs`, `news`, `team_members`, `testimonials`, `partners`, `media_library`, `documents`) : lecture publique (contenu publié uniquement pour `programs`/`news`/`program_options`), écriture réservée aux comptes présents dans `admin_users`.
- **Formulaires** (`submissions_*`, `contact_messages`) : **insertion publique** (n'importe qui peut soumettre le formulaire, c'est le but), **lecture/modification réservée aux admins** — un visiteur ne peut jamais lire les soumissions des autres.
- **`admin_users`** : lecture réservée aux admins, écriture réservée au rôle `super_admin` uniquement (un `editor` ne peut pas se promouvoir lui-même).
- **`site_settings`** : lecture publique (nécessaire pour afficher coordonnées/réseaux sociaux dans le header/footer), modification réservée au `super_admin`.

Ne jamais désactiver RLS sur une table pour "aller plus vite" — c'est la seule barrière entre un visiteur public et les données des autres.

### Anti-spam

Chaque route API (`app/api/**/route.ts`) vérifie un champ honeypot nommé `website`, absent visuellement du formulaire (à masquer en CSS, pas en `display:none` trop détectable — un simple positionnement hors écran suffit) mais présent dans le DOM. Un bot qui remplit tous les champs remplira aussi celui-ci ; la requête est alors silencieusement acceptée sans être enregistrée (ne jamais renvoyer une erreur au bot, cela l'aiderait à s'adapter).

### Validation des fichiers uploadés

Le formulaire de candidature (`app/api/submissions/registration/route.ts`) limite chaque pièce jointe à 5 Mo et aux types `application/pdf`, `image/jpeg`, `image/png` (cf. `lib/validations/registration.ts`). Ne jamais retirer cette validation : un upload non contrôlé est un vecteur d'attaque classique (déni de service par fichiers volumineux, exécution de fichiers malveillants déguisés).

### Rate limiting

Ce scaffold ne met pas encore en place de limitation de débit (rate limiting) sur les routes API — Vercel absorbe une partie du trafic abusif au niveau plateforme, mais un formulaire public reste exposé à du spam applicatif. Si le volume de soumissions frauduleuses devient un problème après lancement, ajouter un rate limiting basé sur l'IP (ex. Upstash Redis + `@upstash/ratelimit`, compatible Vercel) plutôt que d'implémenter un compteur en mémoire — la mémoire d'une fonction serverless ne persiste pas entre les invocations.

---

## 11. Liste complète des endpoints API

| Méthode | Route | Rôle | Payload |
|---|---|---|---|
| `POST` | `/api/submissions/registration` | Formulaire Inscription (formation initiale) | `multipart/form-data` : `fullName`, `phone`, `email`, `lastDiploma`, `desiredProgramId?`, `website` (honeypot), fichiers `bulletin`/`diplome`/`cv`/`photo` (optionnels) |
| `POST` | `/api/submissions/training-request` | Formulaire Demande formation continue | JSON : `companyName`, `contactName`, `phone`, `email`, `domain`, `participantsCount?`, `desiredDates?`, `message?`, `website` |
| `POST` | `/api/submissions/lab-request` | Formulaire Demande location de labo | JSON : `institutionName`, `contactName`, `phone`, `email`, `labType`, `desiredSlots?`, `headcount?`, `website` |
| `POST` | `/api/contact` | Formulaire de contact générique | JSON : `name`, `email`, `phone?`, `subject`, `message`, `website` |

Toutes les routes renvoient `{ ok: true }` en cas de succès, ou `{ ok: false, errors: { <champ>: "message" } }` (HTTP 400 pour une erreur de validation, 500 pour une erreur serveur). Le corps d'erreur est structuré pour être affiché directement sous le champ concerné dans le formulaire.

---

## 12. Déploiement continu

Une fois les sections 3 à 6 complétées, le flux de travail au quotidien est :

1. Développer en local (`npm run dev`), commiter, pousser sur une branche.
2. Ouvrir une Pull Request sur GitHub → Vercel génère automatiquement une URL de preview.
3. Relire la preview, fusionner la Pull Request sur `main`.
4. Vercel déploie automatiquement en production sur `digiset-gabon.com`.

Aucune étape manuelle de déploiement (pas de FTP, pas de SSH) — c'est tout l'intérêt de la chaîne GitHub → Vercel choisie dans le PRD.

---

## 13. Checklist finale avant mise en ligne publique

- [ ] Toutes les variables de `.env.example` sont renseignées dans Vercel (Production **et** Preview)
- [ ] Le premier compte Super-admin peut se connecter sur `/admin/login`
- [ ] Un envoi de test sur chacun des 4 formulaires arrive bien dans `/admin/soumissions` **et** déclenche un email
- [ ] `digiset-gabon.com` affiche le site avec certificat SSL valide (cadenas vert)
- [ ] Les pages `/mentions-legales` et `/politique-de-confidentialite` contiennent un contenu réel (pas le stub) avant tout trafic public
- [ ] Les vraies informations de contact (téléphone, notamment) remplacent les placeholders — cf. `checklist-contenus-avant-maquettes.md` §3
