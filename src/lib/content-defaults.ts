/**
 * Définition finie des blocs de contenu éditables du mini-CMS (Feature 4,
 * étendue). Partagée entre l'éditeur admin (`/admin/pages`) et les pages
 * publiques correspondantes, pour que la valeur par défaut affichée avant
 * toute édition soit strictement identique des deux côtés (pas de copie
 * dupliquée qui pourrait diverger).
 *
 * Périmètre volontairement limité aux textes et images (titres, sous-titres,
 * descriptions) — les icônes restent codées en dur, et les listes pilotant
 * une logique applicative (filtres du catalogue programmes, checklists de
 * pièces jointes) ne sont pas éditables pour ne pas casser leur comportement.
 */

export type ContentBlockType = "text" | "textarea" | "image_url";

export interface ContentBlockDef {
  key: string;
  label: string;
  type: ContentBlockType;
  defaultValue: string;
  /** Regroupement visuel dans l'éditeur admin (accordéon par section). */
  section: string;
}

export interface PageContentDef {
  pageKey: string;
  label: string;
  blocks: ContentBlockDef[];
}

export const PAGE_CONTENT_DEFS: PageContentDef[] = [
  {
    pageKey: "home",
    label: "Accueil",
    blocks: [
      {
        key: "hero_badge",
        label: "Badge du Hero",
        type: "text",
        section: "Hero Principal",
        defaultValue: "Bienvenue à DigiSET Institute — Akanda, Gabon",
      },
      {
        key: "hero_subtitle",
        label: "Sous-titre du Hero",
        type: "textarea",
        section: "Hero Principal",
        defaultValue:
          "DigiSET Institute forme les futurs experts en Intelligence Artificielle, Cybersécurité et Systèmes de Paiement Électronique (Monétique).",
      },
      {
        key: "hero_image_url",
        label: "Image du Hero (grand format)",
        type: "image_url",
        section: "Hero Principal",
        defaultValue: "/images/img/Hero_image1.jpg",
      },
      {
        key: "mission_axis_1_title",
        label: "Axe 1 — Titre",
        type: "text",
        section: "Mission & Engagements",
        defaultValue: "Exigence Académique ECTS",
      },
      {
        key: "mission_axis_1_text",
        label: "Axe 1 — Texte",
        type: "textarea",
        section: "Mission & Engagements",
        defaultValue:
          "Des cursus rigoureux alignés sur les standards européens avec 60 ECTS par an, garantissant la transférabilité internationale du diplôme et les poursuites d'études en cycle ingénieur.",
      },
      {
        key: "mission_axis_2_title",
        label: "Axe 2 — Titre",
        type: "text",
        section: "Mission & Engagements",
        defaultValue: "Laboratoires TP Haute Technologie",
      },
      {
        key: "mission_axis_2_text",
        label: "Axe 2 — Texte",
        type: "textarea",
        section: "Mission & Engagements",
        defaultValue:
          "Des plateaux scientifiques de pointe équipés en optique, électricité, serveurs sous Linux/Python et bancs de cybersécurité SOC accessibles dès la 1ère année d'études.",
      },
      {
        key: "mission_axis_3_title",
        label: "Axe 3 — Titre",
        type: "text",
        section: "Mission & Engagements",
        defaultValue: "Partenariats Certifiants",
      },
      {
        key: "mission_axis_3_text",
        label: "Axe 3 — Texte",
        type: "textarea",
        section: "Mission & Engagements",
        defaultValue:
          "Intégration directe des examens de certification mondiaux Cisco, Microsoft, AWS, Linux LPIC et CompTIA Security+ dans le cursus académique.",
      },
      {
        key: "situation_1_title",
        label: "Carte 1 (Bacheliers) — Titre",
        type: "text",
        section: "Accès par Profil",
        defaultValue: "Formation Initiale (Bac à Bac+3)",
      },
      {
        key: "situation_1_text",
        label: "Carte 1 (Bacheliers) — Description",
        type: "textarea",
        section: "Accès par Profil",
        defaultValue:
          "Intégrez notre Classe Préparatoire MP2I (2 ans) ou notre Licence Professionnelle (1 an) avec nos 3 options d'avenir en IA, Cybersécurité et Monétique.",
      },
      {
        key: "situation_2_title",
        label: "Carte 2 (Entreprises) — Titre",
        type: "text",
        section: "Accès par Profil",
        defaultValue: "Formations Continues pour Entreprises",
      },
      {
        key: "situation_2_text",
        label: "Carte 2 (Entreprises) — Description",
        type: "textarea",
        section: "Accès par Profil",
        defaultValue:
          "Accélérez la montée en compétences de vos équipes avec nos programmes certifiants : en groupe dans nos salles DigiSET ou sur-mesure directement dans vos locaux d'entreprise.",
      },
      {
        key: "situation_3_title",
        label: "Carte 3 (Organisations) — Titre",
        type: "text",
        section: "Accès par Profil",
        defaultValue: "Consulting IT & Transformations",
      },
      {
        key: "situation_3_text",
        label: "Carte 3 (Organisations) — Description",
        type: "textarea",
        section: "Accès par Profil",
        defaultValue:
          "Accompagnement stratégique, audit de sécurité des SI, mise en place de SOC et conseil en transformation numérique à haute valeur ajoutée.",
      },
      {
        key: "catalog_1_title",
        label: "Bloc Catalogue 1 — Titre",
        type: "text",
        section: "Catalogue (3 Pôles)",
        defaultValue: "Formation Initiale Diplômante",
      },
      {
        key: "catalog_1_text",
        label: "Bloc Catalogue 1 — Description",
        type: "textarea",
        section: "Catalogue (3 Pôles)",
        defaultValue:
          "Regroupe l'ensemble de nos formations académiques initiales : la Classe Préparatoire MP2I (2 ans) et notre Licence Professionnelle (1 an) déclinée en 3 options spécialisées.",
      },
      {
        key: "catalog_2_title",
        label: "Bloc Catalogue 2 — Titre",
        type: "text",
        section: "Catalogue (3 Pôles)",
        defaultValue: "Formations Continues & Sur-Mesure",
      },
      {
        key: "catalog_2_text",
        label: "Bloc Catalogue 2 — Description",
        type: "textarea",
        section: "Catalogue (3 Pôles)",
        defaultValue:
          "Formations professionnelles courtes et certifiantes pour accélérer la montée en compétences de vos équipes. Dispensées dans nos centres DigiSET ou directement dans vos locaux d'entreprise.",
      },
      {
        key: "catalog_3_title",
        label: "Bloc Catalogue 3 — Titre",
        type: "text",
        section: "Catalogue (3 Pôles)",
        defaultValue: "Formations Online (DigiSET Online)",
      },
      {
        key: "catalog_3_text",
        label: "Bloc Catalogue 3 — Description",
        type: "textarea",
        section: "Catalogue (3 Pôles)",
        defaultValue:
          "Déclinaison en ligne de nos programmes diplômants et certifiants avec plateforme LMS interactive, classes virtuelles et suivi personnalisé par tuteur dédié.",
      },
      {
        key: "pole_1_title",
        label: "Pôle Organigramme 1 — Titre",
        type: "text",
        section: "Pôles de l'Organigramme",
        defaultValue: "Direction Générale & Présidence",
      },
      {
        key: "pole_1_text",
        label: "Pôle Organigramme 1 — Description",
        type: "textarea",
        section: "Pôles de l'Organigramme",
        defaultValue:
          "Supervisée par le Dr ABAGA ABESSOLO Michel Audrey. Pilotage stratégique, alliances institutionnelles et gouvernance globale de l'Institut.",
      },
      {
        key: "pole_2_title",
        label: "Pôle Organigramme 2 — Titre",
        type: "text",
        section: "Pôles de l'Organigramme",
        defaultValue: "Pôle Formations & Conseil Scientifique",
      },
      {
        key: "pole_2_text",
        label: "Pôle Organigramme 2 — Description",
        type: "textarea",
        section: "Pôles de l'Organigramme",
        defaultValue:
          "Dirigé par la Direction des Études et le Conseil Académique. Conception des maquettes ECTS, accreditations et suivi pédagogique.",
      },
      {
        key: "pole_3_title",
        label: "Pôle Organigramme 3 — Titre",
        type: "text",
        section: "Pôles de l'Organigramme",
        defaultValue: "Pôle Services & Plateaux TP",
      },
      {
        key: "pole_3_text",
        label: "Pôle Organigramme 3 — Description",
        type: "textarea",
        section: "Pôles de l'Organigramme",
        defaultValue:
          "Chefs de projets Cybersécurité (SOC), IA, Monétique PCI-DSS et responsable de la mise à disposition des laboratoires pour les lycées.",
      },
      {
        key: "location_address",
        label: "Adresse du Campus",
        type: "text",
        section: "Localisation & Accès",
        defaultValue: "Angondje, Carrefour Moussavou, Akanda — Libreville, Gabon",
      },
      {
        key: "location_phone",
        label: "Téléphone & WhatsApp",
        type: "text",
        section: "Localisation & Accès",
        defaultValue: "+241 (0) 74 00 00 00 / +241 (0) 66 00 00 00",
      },
      {
        key: "location_email",
        label: "Email de Contact",
        type: "text",
        section: "Localisation & Accès",
        defaultValue: "contact@digiset-gabon.com",
      },
    ],
  },
  {
    pageKey: "institution",
    label: "Institution",
    blocks: [
      { key: "hero_badge", label: "Badge du Hero", type: "text", section: "Hero Principal", defaultValue: "Stratégie & Institution" },
      {
        key: "hero_title",
        label: "Titre du Hero",
        type: "text",
        section: "Hero Principal",
        defaultValue: "Institution, Gouvernance & Partenaires",
      },
      {
        key: "hero_subtitle",
        label: "Sous-titre du Hero",
        type: "textarea",
        section: "Hero Principal",
        defaultValue:
          "Découvrez la structure organisationnelle de DigiSET Institute, son équipe dirigeante en 3 rangs hiérarchiques et ses alliances technologiques internationales.",
      },
      {
        key: "hero_image_url",
        label: "Image de fond du Hero",
        type: "image_url",
        section: "Hero Principal",
        defaultValue: "/images/img/Background-image.jpg",
      },
      {
        key: "org_badge",
        label: "Section Organigramme — Badge",
        type: "text",
        section: "Section Organigramme",
        defaultValue: "Gouvernance & Équipe Dirigeante",
      },
      {
        key: "org_title",
        label: "Section Organigramme — Titre",
        type: "text",
        section: "Section Organigramme",
        defaultValue: "Organigramme Structuré en 3 Rangs Hiérarchiques",
      },
      {
        key: "org_subtitle",
        label: "Section Organigramme — Sous-titre",
        type: "textarea",
        section: "Section Organigramme",
        defaultValue:
          "Présentation en temps réel de l'équipe dirigeante, des responsables de pôles de formation et des plateaux techniques.",
      },
      {
        key: "partners_badge",
        label: "Section Partenaires — Badge",
        type: "text",
        section: "Section Partenaires",
        defaultValue: "Certifications & Partenariats",
      },
      {
        key: "partners_title",
        label: "Section Partenaires — Titre",
        type: "text",
        section: "Section Partenaires",
        defaultValue: "Partenaires Technologiques Officiels",
      },
      {
        key: "partners_subtitle",
        label: "Section Partenaires — Sous-titre",
        type: "textarea",
        section: "Section Partenaires",
        defaultValue:
          "Nos cursus académiques préparent directement aux diplômes certifiants reconnus par les géants mondiaux du secteur.",
      },
    ],
  },
  {
    pageKey: "programmes",
    label: "Programmes",
    blocks: [
      { key: "hero_badge", label: "Badge du Hero", type: "text", section: "Hero Principal", defaultValue: "Catalogue des Formations" },
      {
        key: "hero_title",
        label: "Titre du Hero",
        type: "text",
        section: "Hero Principal",
        defaultValue: "Explorez nos Cursus Académiques et Certifiants",
      },
      {
        key: "hero_subtitle",
        label: "Sous-titre du Hero",
        type: "textarea",
        section: "Hero Principal",
        defaultValue:
          "De la Classe Préparatoire MP2I à nos Licences Professionnelles et Formations Continues, découvrez l'offre d'excellence de DigiSET Institute.",
      },
      {
        key: "hero_image_url",
        label: "Image de fond du Hero",
        type: "image_url",
        section: "Hero Principal",
        defaultValue: "/images/img/Background-image.jpg",
      },
      {
        key: "cta_banner_title",
        label: "Bandeau d'aide au choix — Titre",
        type: "text",
        section: "Bandeau d'Aide au Choix",
        defaultValue: "Vous hésitez sur le choix de votre programme ?",
      },
      {
        key: "cta_banner_text",
        label: "Bandeau d'aide au choix — Texte",
        type: "textarea",
        section: "Bandeau d'Aide au Choix",
        defaultValue:
          "Nos conseillers d'orientation académique sont disponibles pour vous guider selon votre profil et votre projet professionnel.",
      },
    ],
  },
  {
    pageKey: "services",
    label: "Services",
    blocks: [
      { key: "hero_badge", label: "Badge du Hero", type: "text", section: "Hero Principal", defaultValue: "Offre B2B & Organisations" },
      {
        key: "hero_title",
        label: "Titre du Hero",
        type: "text",
        section: "Hero Principal",
        defaultValue: "Nos Services aux Entreprises & Administrations",
      },
      {
        key: "hero_subtitle",
        label: "Sous-titre du Hero",
        type: "textarea",
        section: "Hero Principal",
        defaultValue:
          "DigiSET accompagne les entreprises et institutions à travers nos deux piliers stratégiques : le Consulting IT à haute valeur ajoutée et nos Formations professionnelles Inter et Intra-Entreprises.",
      },
      {
        key: "card1_title",
        label: "Service Phare 1 — Titre",
        type: "text",
        section: "Service Phare 1 (Consulting)",
        defaultValue: "Consulting IT & Transformations Digitales",
      },
      {
        key: "card1_text",
        label: "Service Phare 1 — Description",
        type: "textarea",
        section: "Service Phare 1 (Consulting)",
        defaultValue:
          "Accompagnement stratégique et opérationnel des entreprises et institutions publiques dans leurs projets de transformation numérique, d'audit de cybersécurité, de gouvernance SI et d'ingénierie monétique.",
      },
      {
        key: "card2_title",
        label: "Service Phare 2 — Titre",
        type: "text",
        section: "Service Phare 2 (Formations)",
        defaultValue: "Formations Inter et Intra-Entreprises",
      },
      {
        key: "card2_text",
        label: "Service Phare 2 — Description",
        type: "textarea",
        section: "Service Phare 2 (Formations)",
        defaultValue:
          "Programmes de renforcement de compétences sur-mesure pour vos collaborateurs. Sessions organisées en format Inter-entreprises (dans nos centres de formation) ou Intra-entreprise (directement dans vos locaux).",
      },
      {
        key: "card3_title",
        label: "Service Secondaire — Titre",
        type: "text",
        section: "Service Secondaire (Laboratoires)",
        defaultValue: "Mise à disposition de nos Laboratoires de TP",
      },
      {
        key: "card3_text",
        label: "Service Secondaire — Description",
        type: "textarea",
        section: "Service Secondaire (Laboratoires)",
        defaultValue:
          "Mise à disposition de nos plateaux techniques de physique, d'optique et d'électronique pour les classes préparatoires et lycées partenaires de Libreville.",
      },
    ],
  },
  {
    pageKey: "contact",
    label: "Contact",
    blocks: [
      { key: "hero_badge", label: "Badge du Hero", type: "text", section: "Hero Principal", defaultValue: "Accès & Secrétariat Académique" },
      {
        key: "hero_title",
        label: "Titre du Hero",
        type: "text",
        section: "Hero Principal",
        defaultValue: "Contactez DigiSET Institute",
      },
      {
        key: "hero_subtitle",
        label: "Sous-titre du Hero",
        type: "textarea",
        section: "Hero Principal",
        defaultValue:
          "Nos conseillers académiques et responsables d'admission sont à votre disposition pour vous orienter et répondre à vos questions.",
      },
      {
        key: "coord_address",
        label: "Adresse Géographique",
        type: "text",
        section: "Coordonnées du Campus",
        defaultValue: "Angondje, Carrefour Moussavou, Akanda — Libreville, Gabon",
      },
      {
        key: "coord_phone",
        label: "Téléphone & WhatsApp Scolarité",
        type: "text",
        section: "Coordonnées du Campus",
        defaultValue: "+241 (0) 74 00 00 00 / +241 (0) 66 00 00 00",
      },
      {
        key: "coord_email",
        label: "Email de Contact",
        type: "text",
        section: "Coordonnées du Campus",
        defaultValue: "contact@digiset-gabon.com",
      },
      {
        key: "coord_hours",
        label: "Horaires d'Ouverture Secrétariat",
        type: "textarea",
        section: "Coordonnées du Campus",
        defaultValue: "Du Lundi au Vendredi : 08h00 – 17h00\nSamedi : 08h30 – 12h30",
      },
      {
        key: "faq_title",
        label: "Titre de la section FAQ",
        type: "text",
        section: "FAQ",
        defaultValue: "Foire Aux Questions — Admissions & Campus",
      },
      {
        key: "faq_subtitle",
        label: "Sous-titre de la section FAQ",
        type: "textarea",
        section: "FAQ",
        defaultValue: "Retrouvez les 5 questions essentielles posées fréquemment par les candidats et les établissements.",
      },
    ],
  },
  {
    pageKey: "founder",
    label: "Mot du Fondateur",
    blocks: [
      {
        key: "photo_url",
        label: "Photo du Fondateur",
        type: "image_url",
        section: "Portrait & Signature",
        defaultValue: "/brand/fondateur.png",
      },
      {
        key: "full_name",
        label: "Nom Complet",
        type: "text",
        section: "Portrait & Signature",
        defaultValue: "Dr ABAGA ABESSOLO Michel Audrey",
      },
      {
        key: "role_title",
        label: "Titre / Fonction",
        type: "text",
        section: "Portrait & Signature",
        defaultValue: "Fondateur de DigiSET Institute",
      },
      {
        key: "quote_paragraph_1",
        label: "Mot du Fondateur — Paragraphe 1",
        type: "textarea",
        section: "Texte du Mot",
        defaultValue:
          "La transformation numérique redéfinit profondément les économies, les administrations et les modes de vie. Au Gabon, comme dans l'ensemble de l'Afrique, elle constitue une priorité stratégique pour renforcer la compétitivité, stimuler l'innovation et accélérer le développement durable. Dans cette dynamique, DigiSET Institute a été créé avec une ambition claire : contribuer au développement d'un capital humain d'excellence capable de relever les défis du numérique. Notre institut s'inscrit pleinement dans les politiques nationales de transformation numérique du Gabon ainsi que dans les grandes orientations continentales en faveur d'une Afrique plus connectée, plus innovante et davantage tournée vers l'économie de la connaissance. À travers nos formations initiales, nous préparons une nouvelle génération de professionnels, d'ingénieurs et de spécialistes dotés des compétences techniques, scientifiques et humaines nécessaires pour bâtir le numérique de demain.",
      },
      {
        key: "quote_paragraph_2",
        label: "Mot du Fondateur — Paragraphe 2",
        type: "textarea",
        section: "Texte du Mot",
        defaultValue:
          "La réussite de cette transformation repose également sur la montée en compétences des femmes et des hommes déjà engagés dans les entreprises et les administrations. C'est pourquoi la formation professionnelle constitue le second pilier de notre stratégie de développement. DigiSET Institute accompagne les organisations publiques et privées à travers des formations continues, des certifications professionnelles et des prestations de consulting adaptées à leurs enjeux de modernisation, de cybersécurité, d'intelligence artificielle, de gestion des données et de transformation digitale. Notre ambition est de faire de DigiSET Institute un partenaire de référence pour le développement des compétences numériques en Afrique, en créant des passerelles durables entre le monde académique, les entreprises et les institutions publiques afin d'accélérer la transformation numérique du continent.",
      },
    ],
  },
  {
    pageKey: "inscription",
    label: "Inscription",
    blocks: [
      { key: "hero_badge", label: "Badge du Hero", type: "text", section: "Hero Principal", defaultValue: "Scolarité & Admission 2026-2027" },
      {
        key: "hero_title",
        label: "Titre du Hero",
        type: "text",
        section: "Hero Principal",
        defaultValue: "Rejoignez DigiSET Institute",
      },
      {
        key: "hero_subtitle",
        label: "Sous-titre du Hero",
        type: "textarea",
        section: "Hero Principal",
        defaultValue:
          "Découvrez la procédure de candidature, les critères d'admissibilité et préparez votre dossier pour la rentrée d'Octobre 2026.",
      },
      {
        key: "process_title",
        label: "Titre de la section Procédure",
        type: "text",
        section: "Procédure d'Admission",
        defaultValue: "Les 4 Étapes de la Procédure d'Admission",
      },
      {
        key: "docs_title",
        label: "Titre de la section Documents",
        type: "text",
        section: "Documents Requis",
        defaultValue: "Pièces Justificatives à Préparer",
      },
      {
        key: "docs_text",
        label: "Texte de la section Documents",
        type: "textarea",
        section: "Documents Requis",
        defaultValue:
          "Afin de garantir un traitement rapide de votre demande, assurez-vous d'avoir numérisé les pièces suivantes avant de débuter votre candidature.",
      },
      {
        key: "cta_title",
        label: "Bloc d'appel à l'action — Titre",
        type: "text",
        section: "Appel à l'Action",
        defaultValue: "Prêt à poser votre candidature ?",
      },
      {
        key: "cta_text",
        label: "Bloc d'appel à l'action — Texte",
        type: "textarea",
        section: "Appel à l'Action",
        defaultValue: "Remplissez directement notre formulaire en ligne sécurisé en moins de 5 minutes.",
      },
    ],
  },
];

export function getPageContentDef(pageKey: string): PageContentDef | undefined {
  return PAGE_CONTENT_DEFS.find((def) => def.pageKey === pageKey);
}

/**
 * Fusionne les blocs récupérés depuis /api/content-blocks avec les valeurs
 * par défaut codées en dur de la page — un bloc absent ou vide retombe
 * toujours sur son défaut, jamais sur une chaîne vide.
 */
export function mergeContentValues(
  pageKey: string,
  fetchedBlocks: { block_key: string; value: string | null }[],
): Record<string, string> {
  const def = getPageContentDef(pageKey);
  const values: Record<string, string> = {};
  if (!def) return values;

  for (const block of def.blocks) values[block.key] = block.defaultValue;
  for (const block of fetchedBlocks) {
    if (block.value) values[block.block_key] = block.value;
  }
  return values;
}
