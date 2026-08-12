/**
 * Types & Initial Data Provider pour le Back-Office DigiSET Institute.
 * Structure conforme aux tables Supabase (cf. 0001_init_schema.sql)
 */

export type SubmissionStatus = "nouveau" | "en_cours" | "traite" | "archive";
export type LabType = "physique" | "informatique";
export type ContentStatus = "draft" | "published";

export interface SubmissionRegistration {
  id: string;
  type: "registration";
  full_name: string;
  phone: string;
  email: string;
  last_diploma: string;
  program_title: string;
  attachments: { name: string; url: string; size: string }[];
  status: SubmissionStatus;
  created_at: string;
}

export interface SubmissionTrainingRequest {
  id: string;
  type: "training";
  company_name: string;
  contact_name: string;
  phone: string;
  email: string;
  domain: string;
  participants_count: number;
  desired_dates: string;
  message: string;
  status: SubmissionStatus;
  created_at: string;
}

export interface SubmissionLabRequest {
  id: string;
  type: "lab";
  institution_name: string;
  contact_name: string;
  phone: string;
  email: string;
  lab_type: LabType;
  desired_slots: string;
  headcount: number;
  status: SubmissionStatus;
  created_at: string;
}

export interface SubmissionContactMessage {
  id: string;
  type: "contact";
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: SubmissionStatus;
  created_at: string;
}

export type AnySubmission =
  | SubmissionRegistration
  | SubmissionTrainingRequest
  | SubmissionLabRequest
  | SubmissionContactMessage;

export interface NewsItem {
  id: string;
  slug: string;
  title: string;
  cover_image_url?: string;
  excerpt: string;
  body: string;
  status: ContentStatus;
  published_at: string;
  category?: string;
  tags?: string[];
  cta_text?: string;
  cta_url?: string;
  created_at: string;
}

export interface TeamMember {
  id: string;
  full_name: string;
  role_title: string;
  pole: string;
  photo_url?: string;
  bio?: string;
  email?: string;
  facebook_url?: string;
  linkedin_url?: string;
  sort_order: number;
  created_at: string;
}

// -----------------------------------------------------------------------------
// Données Réelles Initiales pour DigiSET Institute (V1 Réelle)
// -----------------------------------------------------------------------------

// Réception des soumissions : démarre vide pour enregistrer les vrais prospects et étudiants
export const INITIAL_SUBMISSIONS: AnySubmission[] = [];

// Actualités officielles initiales du lancement avec maillage interne SEO
export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "news-1",
    slug: "lancement-officiel-activites-septembre-2026",
    title: "Ouverture des Inscriptions à DigiSET Institute pour la Rentrée Académique 2026",
    cover_image_url: "/brand/fondateur.png",
    excerpt:
      "DigiSET Institute ouvre officiellement les candidatures pour ses filières scientifiques d'excellence à Akanda (Prépa MP2I, Licences Pro IA, Cybersécurité, Monétique).",
    body: `L'Établissement d'Enseignement Supérieur Privé **DigiSET Institute** annonce l'ouverture officielle des candidatures pour la rentrée académique 2026-2027 sur son campus d'Akanda.

## Des Filières Scientifiques d'Avenir à Libreville

Pour répondre aux défis de la transformation numérique au Gabon et en Afrique Centrale, l'institut propose des parcours universitaires spécialisés :

- **[Classe Préparatoire MP2I](/programmes/classe-preparatoire)** : Formation intensive de 2 ans préparant aux grandes écoles et licences scientifiques.
- **[Licence Pro IA & Data Science](/programmes/licence-professionnelle/ia-data-science)** : Spécialisation en intelligence artificielle, apprentissage automatique et traitement des données.
- **[Licence Pro Cybersécurité](/programmes/licence-professionnelle/cybersecurite)** : Expertise en sécurité opérationnelle, audit de code et protection des infrastructures SI.
- **[Licence Pro Monétique & Systèmes de Paiement](/programmes/licence-professionnelle/systemes-paiement)** : Formation unique dédiée à la sécurité des transactions électroniques et au Mobile Money.

## Des Infrastructures de Dernier Cri

Nos étudiants bénéficient de **laboratoires de travaux pratiques de pointe** équipés pour la physique, l'électricité et l'informatique. Ces laboratoires sont également ouverts à la **[location pour les lycées et prépas de la région](/services/location-laboratoires)**.

De plus, nous proposons des **[formations continues certifiantes pour les entreprises](/programmes/formation-continue)** souhaitant monter en compétences sur la cybersécurité et la Data.

> "Notre objectif est de former des ingénieurs et techniciens d'excellence capables de concevoir les solutions technologiques de demain depuis Libreville." — Dr ABAGA ABESSOLO Michel Audrey, Directeur Fondateur.

Les futurs bacheliers et professionnels sont invités à **[déposer leur dossier de candidature en ligne](/inscription/candidature)** dès aujourd'hui ou à nous **[contacter pour toute information](/contact)**.`,
    status: "published",
    category: "Institutionnel",
    tags: ["Inscriptions 2026", "Licence Pro IA", "Cybersécurité", "Prépa MP2I", "Gabon Tech"],
    cta_text: "Déposer mon dossier de candidature",
    cta_url: "/inscription/candidature",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "news-2",
    slug: "partenariat-certifications-internationales",
    title: "Partenariat Stratégique avec les Acteurs Internationaux de la Certification",
    cover_image_url: "/images/img/Image_4.jpg",
    excerpt:
      "Nos cursus intègrent dès la première année la préparation aux examens professionnels Cisco, AWS, Microsoft et Linux pour garantir une employabilité immédiate.",
    body: `DigiSET Institute renforce son engagement pour l'insertion professionnelle de ses étudiants en intégrant les plus grandes **[certifications internationales](/programmes/certifications)** au cœur de son modèle pédagogique.

## Des Certifications Reconnues Mondialement

Dès la 1ère année de cursus, nos étudiants préparent les examens officiels :
- **Cisco CCNA & CyberOps** pour la gouvernance réseau et la sécurité des infrastructures.
- **AWS Certified Solutions Architect & Data Analytics** pour l'architecture Cloud et la Big Data.
- **Microsoft Certified Azure Developer & Security Engineer**.
- **CompTIA Security+ & Linux Professional Institute (LPI)**.

## Un Avantage Compétitif Unique sur le Marché du Travail

Ces certifications garantissent aux recruteurs et aux entreprises partenaires que nos diplômés possèdent des compétences immédiatement opérationnelles.

Pour en savoir plus sur nos programmes certifiants ou inscrire vos collaborateurs, découvrez nos **[formations continues pour entreprises](/programmes/formation-continue)** ou posez vos questions au **[Secrétariat Académique](/contact)**.`,
    status: "published",
    category: "Partenariats & Entreprises",
    tags: ["Certifications", "Cisco", "AWS", "Microsoft", "Employabilité"],
    cta_text: "Découvrir nos formations certifiantes",
    cta_url: "/programmes/certifications",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "news-3",
    slug: "mise-en-service-laboratoires-akanda",
    title: "Mise en Service des Laboratoires de TP Scientifiques à Akanda",
    cover_image_url: "/images/img/Img_2.jpg",
    excerpt:
      "Découvrez nos nouveaux équipements de travaux pratiques destinés aux étudiants et aux établissements de classe préparatoire partenaires.",
    body: `Les nouveaux laboratoires de travaux pratiques (TP) de DigiSET Institute sur le campus d'Akanda sont officiellement prêts pour la rentrée 2026.

## Des Équipements Pédagogiques de Haute Précision

Nos salles spécialisées comprennent :
- **Laboratoire de Physique & Électricité** (optique ondulatoire, oscilloscopes numériques, bancs d'essais).
- **Laboratoire d'Informatique & Cybersécurité** (serveurs d'émulation de réseaux et environnements de pentest isolés).

## Ouverture à la Location pour les Établissements Partenaires

Afin de soutenir l'enseignement scientifique dans la sous-région, nos laboratoires sont ouverts à la **[location pour les lycées et classes préparatoires scientifiques](/services/location-laboratoires)**.

Consultez nos grilles tarifaires et **[effectuez votre réservation en ligne](/services/location-laboratoires/demande)**.`,
    status: "published",
    category: "Laboratoires & TP Scientifiques",
    tags: ["Laboratoires TP", "Physique", "Optique", "Akanda", "Science Gabon"],
    cta_text: "Réserver un créneau de laboratoire",
    cta_url: "/services/location-laboratoires/demande",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "news-4",
    slug: "cybersecurite-le-bouclier-indispensable-pour-booster-la-performance-de-votre-entreprise-au-gabon",
    title: "Cybersécurité : Le bouclier indispensable pour booster la performance de votre entreprise au Gabon !",
    cover_image_url: "/images/img/Image_3.jpg",
    excerpt:
      "À Libreville comme à Akanda, protéger les données et les systèmes de son entreprise est devenu le levier stratégique n°1 pour sécuriser sa croissance.",
    body: `À Libreville comme à Akanda, protéger les données et les systèmes de son entreprise est devenu le levier stratégique n°1 pour sécuriser sa croissance.

## Pourquoi la Cybersécurité est une Priorité au Gabon

Dans un contexte de digitalisation accélérée des entreprises et des administrations gabonaises, les menaces informatiques (phishing, attaques de logiciels malveillants, vols de données financières) représentent un risque majeur pour la pérennité des organisations.

## La Réponse de DigiSET Institute

**DigiSET Institute** propose des programmes de formation certifiants et des services de conseil haut niveau :
- **[Licence Pro Cybersécurité](/programmes/licence-professionnelle/cybersecurite)** : Formation d'experts en défense réseau et audit SI.
- **[Formations Continues pour Entreprises](/programmes/formation-continue)** : Sensibilisation des équipes et formation technique sur mesure.
- **[Consulting IT & Audits de Sécurité](/services/consulting-it)** : Diagnostic de vulnérabilité et accompagnement à la conformité.

Se préparer aujourd'hui, c'est garantir la continuité et la performance de votre entreprise demain.`,
    status: "published",
    category: "Formations & Certifications",
    tags: ["Cybersécurité", "Gabon Tech", "Protection des Données", "Entreprises", "Akanda"],
    cta_text: "Découvrir la Licence Cybersécurité",
    cta_url: "/programmes/licence-professionnelle/cybersecurite",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: "news-5",
    slug: "lintelligence-artificielle-et-la-cyberscurit-les-mtiers-en-or-de-2026",
    title: "L'Intelligence Artificielle et la Cybersécurité : Les métiers en or de 2026 !",
    cover_image_url: "/images/img/Image_4.jpg",
    excerpt:
      "Tu veux un job d'avenir qui paye bien et recrute partout ? Au Gabon et en Afrique, la tech explose. Découvrez nos formations d'excellence en IA et Cybersécurité pour la rentrée 2026.",
    body: `Tu veux un job d'avenir qui paye bien et recrute partout ? Au Gabon et en Afrique, la tech explose. 

## Pourquoi l'IA et la Cybersécurité sont les Secteurs N°1 en 2026

Les entreprises privées comme les services publics connaissent une transformation digitale rapide. Les besoins en experts qualifiés capables de déployer des modèles d'intelligence artificielle et de sécuriser les infrastructures réseaux n'ont jamais été aussi élevés à Libreville et dans toute la sous-région.

## Les Parcours d'Excellence chez DigiSET Institute

- **[Licence Pro IA & Data Science](/programmes/licence-professionnelle/ia-data-science)** : Apprenez à concevoir des algorithmes prédictifs et traiter la Big Data.
- **[Licence Pro Cybersécurité](/programmes/licence-professionnelle/cybersecurite)** : Devenez un spécialiste de la sécurité opérationnelle et de l'audit de systèmes.
- **[Classe Préparatoire MP2I](/programmes/classe-preparatoire)** : Le tremplin idéal pour viser les grandes écoles d'ingénieurs.

Rejoignez les pionniers du numérique et préparez dès aujourd'hui votre intégration professionnelle pour septembre 2026.`,
    status: "published",
    category: "Formations & Certifications",
    tags: ["IA", "Cybersécurité", "Métiers d'avenir", "Licence Pro", "Gabon"],
    cta_text: "Déposer ma candidature",
    cta_url: "/inscription/candidature",
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
];

export function calculateKPIs(submissions: AnySubmission[]) {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const registrations7d = submissions.filter(
    (s) => s.type === "registration" && new Date(s.created_at) >= sevenDaysAgo
  ).length;

  const training7d = submissions.filter(
    (s) => s.type === "training" && new Date(s.created_at) >= sevenDaysAgo
  ).length;

  const lab7d = submissions.filter(
    (s) => s.type === "lab" && new Date(s.created_at) >= sevenDaysAgo
  ).length;

  const pendingSubmissions = submissions.filter(
    (s) => s.status === "nouveau" || s.status === "en_cours"
  ).length;

  return {
    registrations7d,
    training7d,
    lab7d,
    totalSubmissions: submissions.length,
    pendingSubmissions,
  };
}

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "2f6a1361-e552-4d46-b523-83ddc15dceff",
    full_name: "Dr ABAGA ABESSOLO Michel Audrey",
    role_title: "Fondateur & Directeur Général",
    pole: "Direction Générale",
    photo_url: "/brand/fondateur.png",
    bio: "Docteur en informatique, expert en systèmes de paiement et gouvernance du numérique.",
    email: "direction@digiset-gabon.com",
    linkedin_url: "https://linkedin.com",
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "01d227e2-c725-4c17-8141-57f9cf73bac3",
    full_name: "Prof. Jean-Marc ONDO",
    role_title: "Directeur des Études & Maquettes ECTS",
    pole: "Direction Académique",
    photo_url: "/images/img/Image6.jpg",
    bio: "Enseignant-chercheur, responsable de l'accréditation et des programmes académiques.",
    email: "etudes@digiset-gabon.com",
    linkedin_url: "https://linkedin.com",
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    full_name: "Dr. Sylvie NGUEMA",
    role_title: "Présidente du Conseil Scientifique",
    pole: "Direction Académique",
    photo_url: "/images/img/Image7.jpg",
    bio: "Docteur en Mathématiques Appliquées, conseillère en recherche et partenariats.",
    email: "conseil@digiset-gabon.com",
    linkedin_url: "https://linkedin.com",
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "e4e7c10b-8a82-4f36-a123-9c8d7e6f5a4b",
    full_name: "Ing. Patrick ELLA",
    role_title: "Chef du Pôle Cybersécurité & Labos SOC",
    pole: "Corps Professoral",
    photo_url: "/images/img/Image_4.jpg",
    bio: "Ingénieur réseaux et expert certifié Cisco CCNA CyberOps & CompTIA Security+.",
    email: "cyber@digiset-gabon.com",
    linkedin_url: "https://linkedin.com",
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
];
