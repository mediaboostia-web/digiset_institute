# Liste exhaustive des pages & sections à concevoir — Maquettes Stitch

> Checklist de référence pour la conception des maquettes (Google Stitch + MCP). Chaque page/écran est listé avec ses sections **dans l'ordre d'affichage attendu**. Coche chaque section au fur et à mesure de sa conception. Pour les tokens (couleurs, typo, composants), se référer systématiquement à `design-system-digiset-institute.md`.

---

## 0. Mode d'emploi rapide avec Stitch/MCP

- [ ] Charger en amont dans le contexte de conception : `design-system-digiset-institute.md` (tokens + composants) et `checklist-contenus-avant-maquettes.md` (statut des contenus réels vs temporaires).
- [ ] **Un prompt Stitch = une page** de cette liste. Donner à Stitch, pour chaque page : le nom de la page, la liste de ses sections dans l'ordre ci-dessous, et les composants clés associés (renvoyés entre parenthèses).
- [ ] Respecter l'ordre des sections indiqué ci-dessous dans le prompt — c'est l'ordre d'empilement vertical attendu sur la page.
- [ ] Concevoir en **mobile d'abord**, puis décliner tablette/desktop (cohérent avec le design system §3 et §8).
- [ ] Pour toute donnée encore marquée "à demander au client" dans la checklist de contenus, utiliser un texte/visuel de substitution clairement temporaire plutôt que de bloquer la maquette.
- [ ] Une fois une page conçue, cocher la case correspondante ci-dessous pour suivre l'avancement global.

---

## 1. Site public — Pages & sections

### 1.1 Accueil (`/`)
- [ ] Header sticky (nav + méga-menu Programmes + CTA "S'inscrire")
- [ ] Hero (titre + sous-titre + 2 CTA + photo réelle labo/certification)
- [ ] Bloc Mot du Fondateur (fond bleu marine, portrait circulaire)
- [ ] Qui sommes-nous (texte court)
- [ ] Choisir une formation (3 cartes d'accès rapide : Étudiant / Professionnel / Établissement)
- [ ] Nos offres (grille de 7 cartes : 5 pôles formation + 2 services)
- [ ] Bandeau certifications (logos Cisco/Microsoft/AWS/Linux/CompTIA/ICDL)
- [ ] Actualités (3 dernières cartes actualité)
- [ ] Localisation (carte Google Maps + adresse)
- [ ] Bandeau CTA contact rapide (avant footer)
- [ ] Footer (4 colonnes + réseaux sociaux)

### 1.2 Programmes — page famille (`/programmes`)
- [ ] Header
- [ ] Bandeau de titre (H1 + chapô)
- [ ] Barre de filtres (pills : public / domaine / format)
- [ ] Grille de cartes programme (résultats filtrés, responsive 1/2/3 colonnes)
- [ ] État vide (aucun résultat + CTA contact)
- [ ] Bandeau CTA "Vous ne savez pas quel programme choisir ?"
- [ ] Footer

### 1.3 Classe préparatoire MP2I (`/programmes/classe-preparatoire`)
- [ ] Header
- [ ] Bandeau de titre (H1 + badges durée/crédits)
- [ ] Présentation (texte)
- [ ] Objectifs pédagogiques (liste à puces)
- [ ] Organisation des formations (4 semestres — frise ou tableau)
- [ ] Dossier de candidature (checklist des pièces requises)
- [ ] Profil en sortie (120 ECTS + liste de compétences)
- [ ] Poursuite des études (liste des débouchés/passerelles)
- [ ] CTA "S'inscrire" (sticky mobile)
- [ ] Footer

### 1.4 Licence Professionnelle — page famille (`/programmes/licence-professionnelle`)
- [ ] Header
- [ ] Bandeau de titre + fiche descriptive commune (sigle générique, durée 1 an, 60 ECTS, public Bac+2)
- [ ] Présentation des 3 options en cartes (IA & Data Science / Cybersécurité / Systèmes de Paiement Électronique)
- [ ] Bandeau CTA comparatif
- [ ] Footer

#### 1.4.1 Fiche option — IA & Data Science (`/programmes/licence-professionnelle/ia-data-science`)
- [ ] Header
- [ ] Bandeau de titre (H1 + badges sigle/durée/crédits)
- [ ] Fiche descriptive (tableau clé/valeur)
- [ ] Objectif (Body large)
- [ ] Profils d'admission (liste)
- [ ] Compétences en sortie (liste ou grille d'icônes)
- [ ] Débouchés (pills de métiers)
- [ ] Modalités d'admission (checklist pièces du dossier)
- [ ] CTA "S'inscrire à cette option" (sticky mobile)
- [ ] Footer

#### 1.4.2 Fiche option — Cybersécurité (`/programmes/licence-professionnelle/cybersecurite`)
- [ ] Header
- [ ] Bandeau de titre
- [ ] Fiche descriptive
- [ ] Objectif
- [ ] Profils d'admission
- [ ] Compétences en sortie
- [ ] Débouchés
- [ ] Modalités d'admission
- [ ] CTA "S'inscrire à cette option"
- [ ] Footer

#### 1.4.3 Fiche option — Systèmes de Paiement Électronique (`/programmes/licence-professionnelle/systemes-paiement`)
- [ ] Header
- [ ] Bandeau de titre
- [ ] Fiche descriptive
- [ ] Objectif
- [ ] Profils d'admission
- [ ] Compétences en sortie
- [ ] Débouchés
- [ ] Modalités d'admission
- [ ] CTA "S'inscrire à cette option"
- [ ] Footer

### 1.5 Formations Continues (`/programmes/formation-continue`)
- [ ] Header
- [ ] Bandeau de titre (H1 + chapô "objectif")
- [ ] Format (présentiel intra/inter-entreprise, 3-10 jours)
- [ ] 4 axes de formation en cartes détaillées (Cybersécurité / IA & Data Science / Systèmes de paiements / Management & stratégie)
- [ ] Sous-bloc dédié administration/régulation (politiques publiques numériques)
- [ ] CTA "Faire une demande de formation continue"
- [ ] Footer

### 1.6 Certifications professionnelles (`/programmes/certifications`)
- [ ] Header
- [ ] Bandeau de titre (H1 + objectif)
- [ ] Détail par axe en cartes/accordéon (Cybersécurité, IA & Data Science, Paiements électroniques, Management & stratégie, Infrastructure & Cloud transverse)
- [ ] Bandeau logos des certifications visées (Cisco/CompTIA/ISC²/Microsoft/AWS/ISO/COBIT/ITIL/Linux-RedHat)
- [ ] CTA "Faire une demande" (renvoie au formulaire formation continue)
- [ ] Footer

### 1.7 DigiSET Online (`/programmes/digiset-online`)
- [ ] Header
- [ ] Hero dédié (présentation)
- [ ] Nos grands principes (5 blocs : Flexibilité, Exigence pédagogique, Interactivité, Accessibilité élargie, Suivi et certification)
- [ ] CTA double (S'inscrire côté étudiant / Faire une demande côté professionnel)
- [ ] Footer

### 1.8 Services — page famille (`/services`)
- [ ] Header
- [ ] Bandeau de titre
- [ ] 2 cartes service (Location de laboratoires de TP / Consulting IT)
- [ ] Footer

### 1.9 Location de laboratoires de TP (`/services/location-laboratoires`)
- [ ] Header
- [ ] Hero de service (photo réelle du labo)
- [ ] Présentation + principe (texte)
- [ ] Catalogue des domaines couverts (grille d'icônes/labels : mécanique, électricité, optique, électromagnétisme, électrocinétique, physique générale)
- [ ] Contrainte de capacité (groupes de 20 étudiants max — encart mis en avant)
- [ ] Grille tarifaire (tableau 2 lignes : forfait 5 / forfait 10, mise en avant du forfait 10)
- [ ] Formulaire de demande de location de labo (intégré en bas de page)
- [ ] Footer

### 1.10 Consulting IT (`/services/consulting-it`)
- [ ] Header
- [ ] Bandeau de titre + présentation (contenu à enrichir avec le client)
- [ ] CTA contact avec motif présélectionné "Consulting IT"
- [ ] Footer

### 1.11 Vie étudiante — page famille (`/vie-etudiante`)
- [ ] Header
- [ ] Hero (photo de campus/événement)
- [ ] Présentation courte
- [ ] Grille de sous-rubriques en cartes :
  - [ ] Associations étudiantes
  - [ ] Activités et événements
  - [ ] Stages et insertion professionnelle
  - [ ] Accompagnement des étudiants
  - [ ] Vie sur le campus
- [ ] Galerie photos et vidéos (grille + lightbox)
- [ ] Actualités étudiantes (liste courte)
- [ ] Documents utiles (liste téléchargeable avec icône type/poids)
- [ ] FAQ Étudiants (accordéon)
- [ ] Footer

### 1.12 Inscription (`/inscription`)
- [ ] Header
- [ ] Hero "Rejoindre Digi-SET Institute"
- [ ] Pourquoi nous rejoindre (3-4 points clés)
- [ ] Conditions d'admission par programme (accordéon)
- [ ] Procédure d'inscription (stepper horizontal desktop / vertical mobile)
- [ ] Pièces à fournir (checklist)
- [ ] Calendrier (frise ou tableau de dates)
- [ ] Frais de scolarité (tableau)
- [ ] Formulaire de candidature en ligne (voir détail §1.16)
- [ ] Téléchargements (liste de fichiers)
- [ ] Footer

### 1.13 Institution — page famille (`/institution`)
- [ ] Header
- [ ] Hero institutionnel
- [ ] À propos, organigramme, missions (représentation visuelle de la structure)
- [ ] Stratégie (orientation stratégique de l'institut)
- [ ] Partenaires (grille de logos)
- [ ] Footer

### 1.14 Actualités
- [ ] **Liste** (`/actualites`) : Header → Bandeau de titre → Grille de cartes actualité paginée → Footer
- [ ] **Détail** (`/actualites/[slug]`) : Header → Image de couverture → Titre + date → Corps de texte riche → Bandeau de partage réseaux sociaux → Articles liés (3 cartes) → Footer

### 1.15 Contact (`/contact`)
- [ ] Header
- [ ] Bandeau de titre
- [ ] Formulaire de contact (nom, email, téléphone, sujet, message)
- [ ] Coordonnées + carte Google Maps (colonne latérale desktop / empilé mobile)
- [ ] Footer

### 1.16 Formulaires dédiés (intégrés dans leur page contextuelle, cf. ci-dessus)
- [ ] Formulaire Inscription formation initiale (`/inscription/candidature`) : identité, coordonnées, dernier diplôme, filière présélectionnée, upload pièces (bulletin/diplôme/CV/photo), écran de confirmation
- [ ] Formulaire Demande formation continue (`/programmes/formation-continue/demande`) : société, contact, domaine (liste des 4 axes), nombre de participants, dates souhaitées, message, écran de confirmation
- [ ] Formulaire Demande location de labo (`/services/location-laboratoires/demande`) : établissement, contact, type de labo, créneaux souhaités, effectif, écran de confirmation

### 1.17 Pages légales
- [ ] Mentions légales (`/mentions-legales`) : Header → titre → contenu texte structuré (éditeur, hébergeur, RCCM) → Footer
- [ ] Politique de confidentialité (`/politique-de-confidentialite`) : Header → titre → contenu texte structuré (données collectées, finalité, durée, droits) → Footer

### 1.18 Pages système
- [ ] Page 404 (illustration sobre + message + CTA retour accueil)
- [ ] Page de maintenance (message + coordonnées de contact alternatif)

---

## 2. Back-office admin — Écrans & sections

### 2.1 Connexion admin (`/admin/login`)
- [ ] Formulaire email + mot de passe
- [ ] Lien "Mot de passe oublié" → écran de réinitialisation par email
- [ ] Fond épuré (logo + carte de connexion centrée), pas de sidebar (utilisateur non authentifié)

### 2.2 Dashboard (`/admin`)
- [ ] Sidebar (navigation complète, cf. Design System §5)
- [ ] En-tête (nom utilisateur connecté + rôle)
- [ ] Rangée de compteurs (nouvelles soumissions 7 jours, par type de formulaire)
- [ ] Liste des dernières actualités + statut (brouillon/publié)
- [ ] Raccourcis d'action (Publier une actualité / Voir les soumissions en attente)

### 2.3 Boîte de réception des soumissions (`/admin/soumissions`)
- [ ] Sidebar
- [ ] Filtres (type de formulaire, statut, période) + bouton d'export CSV/Excel
- [ ] Tableau de données (colonnes triables, badge de statut coloré, pagination)
- [ ] Drawer de détail au clic sur une ligne (données complètes + pièces jointes téléchargeables + changement de statut)

### 2.4 Gestion des programmes (`/admin/programmes`)
- [ ] Sidebar
- [ ] Tableau/liste des fiches programme (filtrable par famille, statut publié/brouillon)
- [ ] Formulaire de création/édition (champs structurés : titre, sigle, durée, crédits, public visé, objectifs, profils d'admission, compétences, débouchés, pièces du dossier)
- [ ] Aperçu en temps réel (colonne droite desktop)
- [ ] Barre d'action persistante (Enregistrer en brouillon / Publier)

### 2.5 Gestion des actualités (`/admin/actualites`)
- [ ] Sidebar
- [ ] Tableau/liste des articles (statut, date de publication)
- [ ] Éditeur de création/édition (titre, image de couverture, éditeur de texte riche, statut)
- [ ] Aperçu en temps réel
- [ ] Barre d'action (Brouillon / Publier)

### 2.6 Gestion de la galerie médias (`/admin/galerie`)
- [ ] Sidebar
- [ ] Grille de la médiathèque existante (par catégorie : campus, labos, événements)
- [ ] Zone de drop / uploader avec barre de progression
- [ ] Modale de sélection réutilisable (pour associer un média existant à une autre page)

### 2.7 Gestion des témoignages (`/admin/temoignages`)
- [ ] Sidebar
- [ ] Liste des témoignages (nom, fonction, aperçu de citation)
- [ ] Formulaire de création/édition (nom, fonction/organisation, citation, photo)

### 2.8 Gestion des partenaires (`/admin/partenaires`)
- [ ] Sidebar
- [ ] Liste des partenaires (logo, nom)
- [ ] Formulaire de création/édition (nom, logo, site web)

### 2.9 Gestion de l'organigramme / équipe (`/admin/equipe`)
- [ ] Sidebar
- [ ] Liste des membres (photo, nom, fonction, pôle) avec ordre de tri
- [ ] Formulaire de création/édition (nom, fonction, pôle, photo)

### 2.10 Gestion des pages de contenu libre (`/admin/pages`)
- [ ] Sidebar
- [ ] Liste des blocs éditables (Mot du Fondateur, Qui sommes-nous, Stratégie, Pourquoi rejoindre Digi-SET, FAQ)
- [ ] Éditeur de texte riche par bloc + upload d'image associée si applicable

### 2.11 Gestion des documents téléchargeables (`/admin/documents`)
- [ ] Sidebar
- [ ] Liste des documents (nom, catégorie, date de mise à jour)
- [ ] Uploader de remplacement/ajout de fichier

### 2.12 Gestion des utilisateurs admin (`/admin/utilisateurs`) — Super-admin uniquement
- [ ] Sidebar
- [ ] Liste des comptes admin (nom, email, rôle, statut)
- [ ] Formulaire d'invitation (email + attribution de rôle Super-admin/Éditeur)
- [ ] Modale de confirmation de révocation d'accès

### 2.13 Paramètres du site (`/admin/parametres`) — Super-admin uniquement
- [ ] Sidebar
- [ ] Formulaire coordonnées (téléphone, email, adresse)
- [ ] Formulaire réseaux sociaux (liens)
- [ ] Formulaire SEO global (titre/description par défaut)
- [ ] Champ bandeau d'actualité (ex. message de lancement)

---

## 3. Récapitulatif chiffré

| Périmètre | Total |
|---|---|
| Pages publiques (familles + sous-pages, hors formulaires intégrés) | 18 |
| Dont fiches programme individuelles (classe prépa + 3 options licence pro + formation continue + certifications + DigiSET Online) | 7 |
| Formulaires dédiés intégrés | 3 |
| Pages système (404, maintenance, légales) | 4 |
| Écrans back-office admin | 13 |
| **Total écrans à concevoir** | **35** |

---

## 4. Ordre de conception suggéré dans Stitch

1. **Fondations** — tokens (couleurs/typo/espacement) + composants de base : Bouton, Champ de formulaire, Carte, Badge (cf. Design System §3-4).
2. **Header + Footer** — réutilisés sur toutes les pages publiques, à figer avant le reste.
3. **Accueil** — première impression, doit être solide avant de décliner les autres pages.
4. **Programmes (page famille + filtres) + une fiche programme complète** (ex. Licence Pro — Cybersécurité) — sert de gabarit pour dupliquer les 6 autres fiches.
5. **Les 3 formulaires publics** (inscription, formation continue, location labo) + écran de confirmation.
6. **Services (page famille) + Location de laboratoires** — contenu déjà 100% disponible, aucune dépendance client.
7. **Back-office : Dashboard + Boîte de réception des soumissions** — valeur métier immédiate pour l'autonomie du client, à prioriser avant les écrans CRUD de contenu.
8. **Back-office : CRUD Programmes / Actualités / Galerie / Équipe / Pages de contenu libre**.
9. **Pages restantes** — Vie étudiante, Institution, Inscription (page complète), Contact, Actualités (liste/détail), pages légales, 404/maintenance.
10. **Back-office restant** — Témoignages, Partenaires, Documents, Utilisateurs, Paramètres, Connexion admin.
