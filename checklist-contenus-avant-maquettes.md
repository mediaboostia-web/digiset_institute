# Checklist — Contenus & assets à réunir avant la conception des maquettes

> Objectif : réunir et ranger **tout** ce dont la conception UI (Google Stitch + MCP) aura besoin, avant de lancer le premier écran. Chaque ligne indique **qui fournit quoi** (Client Digi-SET / À produire en interne) et **où le ranger**. Une fois ce classeur complet, la conception peut démarrer sans interruption ni aller-retour.
>
> Légende de statut : `✓ Disponible` (déjà en main) · `À demander au client` · `À produire` (texte/visuel à créer en interne en attendant le définitif).

---

## 0. Structure de dossier recommandée

À créer en local (ou sur un Drive partagé avec le client) **avant** d'ouvrir Stitch, pour que chaque asset ait une adresse unique et que rien ne se perde entre la collecte et la maquette.

> **Mis en place sous le nom `contenu local/`**, à la racine du projet, à côté du code (`src/`, `supabase/`, etc.). Ce dossier est exclu du dépôt Git (cf. `.gitignore`) — il ne doit jamais être commité ni poussé sur GitHub, seul le code l'est.

```
contenu local/
│
├── 00-Reference-projet/
│   ├── PRD-digiset-institute.md
│   ├── design-system-digiset-institute.md
│   └── cahier-des-charges-digiset.docx (+ autres docs source client)
│
├── 01-Identite-de-marque/
│   ├── logo/                 → logo officiel (SVG/PNG/PDF, fond clair + fond foncé + favicon)
│   ├── charte-graphique/     → charte couleurs/typo fournie par le client (PowerPoint, PDF)
│   └── typographies/         → licences/fichiers de police si non-Google Fonts
│
├── 02-Photos-et-medias/
│   ├── labos-tp/             → Salle de TP.png, Labo TP.jpg (déjà en main)
│   ├── certifications/       → image certification.png (déjà en main)
│   ├── fondateur/            → photo du Dr ABAGA ABESSOLO Michel Audrey (à demander)
│   ├── campus/                → façade, salles, accueil (à demander)
│   ├── equipe-organigramme/   → photos individuelles des membres (à demander)
│   ├── evenements/            → conférences, hackathons, cérémonies (à demander/à produire au fil de l'eau)
│   └── temporaires/           → visuels de substitution utilisés en attendant le définitif
│
├── 03-Textes-valides/
│   ├── accueil/
│   ├── programmes/            → un sous-dossier par programme/option
│   ├── services/
│   ├── vie-etudiante/
│   ├── institution/
│   └── inscription/
│
├── 04-Documents-telechargeables/
│   ├── fiche-inscription.pdf
│   ├── reglement-interieur.pdf
│   ├── brochures/
│   └── calendrier-academique.pdf
│
├── 05-Legal-et-conformite/
│   ├── mentions-legales.md
│   └── politique-confidentialite.md
│
├── 06-Reseaux-sociaux/
│   └── liens-et-identifiants.md
│
└── 07-Acces-techniques/  (dossier privé, jamais partagé publiquement)
    ├── hostinger-dns.md
    ├── supabase-projet.md
    ├── vercel-projet.md
    └── github-org.md
```

---

## 1. Identité de marque — À valider avant tout écran

- [ ] **Logo officiel** en vecteur (SVG/AI/EPS) — pas seulement un PNG basse résolution. *(cahier des charges : ✓ disponible côté client, à récupérer en HD/vecteur)*
- [ ] Logo — variante **fond clair** (bleu marine sur blanc)
- [ ] Logo — variante **fond foncé** (blanc sur bleu marine, pour le footer/header sombre)
- [ ] **Favicon** / icône carrée simplifiée (symbole seul, sans le wordmark)
- [ ] **Charte graphique source** (le document PowerPoint mentionné dans le cahier des charges) — codes couleurs exacts (HEX/RGB), pas seulement "bleu et orange"
- [ ] Confirmation des **polices officielles** si l'institut en impose (sinon, Sora/Manrope/Inter proposés dans le design system s'appliquent par défaut)

**À demander au client :** fichier vecteur du logo + document PowerPoint de charte graphique.
**Statut actuel :** logo disponible en usage mais résolution/format à confirmer ; codes couleurs exacts à extraire du PowerPoint fourni.

---

## 2. Photos & médias

| Élément | Statut | Action |
|---|---|---|
| Photos labo de TP (mécanique, électricité, optique) | ✓ Disponible (`Salle de TP.png`, `Labo TP.jpg`) | Ranger dans `02-Photos-et-medias/labos-tp/` |
| Bandeau certifications (Cisco/Microsoft/CompTIA/ICDL) | ✓ Disponible (`image certification.png`) | Ranger dans `02-Photos-et-medias/certifications/` |
| Photo du Fondateur (Dr ABAGA ABESSOLO Michel Audrey) | À demander | Mentionné explicitement dans le contenu source ("Demander la photo du Dr.") |
| Photos du campus (façade, accueil, salles) | À demander | Nécessaire pour hero de la page Institution / Vie étudiante |
| Photos individuelles de l'équipe/organigramme | À demander | Une fois l'organigramme nominatif validé (voir section 3) |
| Photos d'événements (conférences, hackathons) | À demander/à produire au fil des premiers événements | Alimentera la galerie et les actualités après lancement |
| Icônes des services | À produire | Mentionné "à prévoir" dans le résumé fonctionnel — une seule famille d'icônes (cf. design system §7) |
| Logos des partenaires | À demander | Dès qu'un partenariat est formalisé |

**Règle de conception en attendant le définitif :** utiliser en priorité les photos réelles déjà disponibles (labo, certification) sur les écrans hero/services ; pour les visuels manquants, préparer un jeu de photos de substitution au style documentaire cohérent (voir design system §7) et les ranger dans `02-Photos-et-medias/temporaires/` pour un remplacement propre plus tard.

---

## 3. Textes définitifs (contenu éditorial)

| Contenu | Statut | Où le récupérer |
|---|---|---|
| Mot du Fondateur | ✓ Disponible (texte complet fourni) | `digiset website_21072026.docx` |
| Qui sommes-nous | ✓ Disponible | idem |
| Présentation des 5 pôles + 2 services | ✓ Disponible (contenu détaillé par programme) | idem + annexes |
| Fiches programmes (Classe prépa, Licence pro x3 options, Formation continue, Certifications, DigiSET Online) | ✓ Disponible en quasi-totalité | Annexes du document `digiset website_21072026.docx` |
| Grille tarifaire location de labo | ✓ Disponible (forfaits 5 et 10 manipulations) | idem |
| **Organigramme nominatif** (noms, fonctions, photos) | À demander | Le cahier des charges précise : "à fournir par le client après validation du design" |
| **Frais de scolarité** (montants par programme) | À demander | Non communiqués dans les documents fournis à ce jour |
| **Calendrier d'admission** (dates de dépôt, rentrée) | À demander | Non communiqué |
| **Coordonnées téléphoniques** | À demander | Actuellement placeholder `Tel : XXXX XXXXX` dans le contenu source |
| Liste des partenaires + description | À demander | Section "Stratégie / Partenaires" mentionnée mais non détaillée |
| Contenu détaillé de la page Consulting IT | À demander | Non détaillé dans les documents source fournis |
| FAQ Étudiants (questions/réponses) | À produire avec le client | Mentionnée dans l'arborescence, contenu à rédiger |
| Mentions légales / politique de confidentialité | À produire | Voir section 5 |

**Astuce d'organisation :** classer chaque texte validé dans `03-Textes-valides/[rubrique]/` sous forme d'un fichier `.md` ou `.docx` par page, nommé exactement comme la page correspondante dans la liste de pages (document `liste-pages-sections-maquettes.md`) — évite tout aller-retour de recherche pendant la conception.

---

## 4. Documents téléchargeables

- [ ] Fiche d'inscription (PDF) — mentionnée dans l'arborescence "Inscription > Téléchargements"
- [ ] Règlement intérieur (PDF)
- [ ] Brochure institutionnelle (PDF, éventuellement dérivée du PowerPoint de référence)
- [ ] Calendrier académique (PDF ou image)

**À demander au client :** ces documents n'existent probablement pas encore sous forme numérique finalisée — à produire conjointement une fois les informations de la section 3 validées (frais, calendrier, organigramme).

---

## 5. Informations légales & conformité

- [ ] Raison sociale exacte de l'éditeur du site (Digi-SET Institute — forme juridique, numéro RCCM si applicable)
- [ ] Adresse complète du siège (déjà connue : Angondje, Carrefour Moussavou, bvd de la 5e République, Akanda, Gabon)
- [ ] Nom de l'hébergeur technique à mentionner (Vercel + Supabase, cf. PRD §9) et du registrar de domaine (Hostinger)
- [ ] Politique de confidentialité — traitement des données collectées via les 3 formulaires (candidature, formation continue, location labo) : durée de conservation, finalité, droits d'accès
- [ ] Directeur de la publication (nom/fonction à confirmer, probablement le Fondateur ou le Directeur Général)

**À demander au client :** confirmation de la forme juridique exacte et du responsable légal de la publication.

---

## 6. Réseaux sociaux & présence externe

- [ ] Liens vers les pages/réseaux sociaux officiels de l'institut (Facebook, LinkedIn, Instagram... — mentionnés "à intégrer" dans le résumé fonctionnel, aucun lien fourni à ce jour)
- [ ] Compte Google Business / fiche Google Maps existante ou à créer (nécessaire pour l'intégration carte de localisation, cf. PRD §3.1 et §8)
- [ ] Adresse email de contact confirmée : `contact@digiset-gabon.com` ✓ disponible

**À demander au client :** liste des réseaux sociaux actifs avec leurs URLs exactes.

---

## 7. Accès techniques (à réunir en parallèle, hors périmètre design mais bloquant pour la mise en ligne)

> À ranger dans `07-Acces-techniques/`, dossier **privé**, jamais partagé en dehors de l'équipe technique.

- [ ] Accès à l'espace client Hostinger (identifiants) pour la configuration DNS du domaine `digiset-gabon.com`
- [ ] Confirmation de qui crée le projet Supabase (organisation, facturation) et qui en garde la propriété (recommandé : compte appartenant à Digi-SET, accès partagé à l'équipe technique)
- [ ] Confirmation de qui crée le projet Vercel et l'organisation GitHub (mêmes recommandations de propriété que ci-dessus, pour garantir l'autonomie du client sur le long terme)
- [ ] Adresse email destinataire des notifications de formulaire (`NOTIFICATION_EMAIL_TO`, cf. PRD §9) — à confirmer avec l'équipe scolarité/direction

**À demander au client :** décision sur la propriété des comptes Supabase/Vercel/GitHub (au nom de Digi-SET plutôt qu'au nom du prestataire), pour sécuriser l'autonomie à long terme.

---

## 8. Ce qui peut démarrer immédiatement (rien à attendre)

Éléments déjà réunis et suffisants pour lancer la conception des écrans correspondants sans attendre le client :

- Structure et contenu des fiches programmes (Classe prépa, Licence pro et ses 3 options, Formation continue, Certifications, DigiSET Online)
- Grille tarifaire de location de laboratoires
- Photos réelles des labos et du bandeau certifications
- Mot du Fondateur (texte complet)
- Texte "Qui sommes-nous"
- Palette de couleurs et typographies proposées dans le design system (à ajuster seulement si la charte PowerPoint donne des codes différents)

**Recommandation de séquencement :** démarrer la conception Stitch par l'Accueil, la page Programmes et une fiche programme complète — ces écrans ne dépendent d'aucun contenu manquant. Basculer sur l'Inscription, l'Institution (organigramme) et Vie étudiante dès que la section 3 (textes) et la photothèque (section 2) sont complétées par le client.
