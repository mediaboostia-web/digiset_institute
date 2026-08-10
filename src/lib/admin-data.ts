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

// Actualité officielle initiale du lancement avec maillage interne SEO
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
];

// Organigramme officiel initial de l'établissement
export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "team-1",
    full_name: "Dr ABAGA ABESSOLO Michel Audrey",
    role_title: "Fondateur & Directeur Général",
    pole: "Direction Générale",
    photo_url: "/brand/fondateur.png",
    bio: "Docteur en Ingénierie & Enseignement Supérieur du Numérique. Fondateur de DigiSET Institute et porteur de la vision académique et technologique de l'établissement à Akanda, Gabon.",
    email: "direction@digiset-gabon.com",
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
];

export function calculateKPIs(submissions: AnySubmission[]) {
  const totalSubmissions = submissions.length;
  const pendingSubmissions = submissions.filter((s) => s.status === "nouveau").length;
  const registrationsCount = submissions.filter((s) => s.type === "registration").length;
  const trainingCount = submissions.filter((s) => s.type === "training").length;
  const labCount = submissions.filter((s) => s.type === "lab").length;
  const contactCount = submissions.filter((s) => s.type === "contact").length;

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const registrations7d = submissions.filter(
    (s) => s.type === "registration" && s.created_at >= sevenDaysAgo
  ).length;
  const training7d = submissions.filter(
    (s) => s.type === "training" && s.created_at >= sevenDaysAgo
  ).length;
  const lab7d = submissions.filter(
    (s) => s.type === "lab" && s.created_at >= sevenDaysAgo
  ).length;

  return {
    totalSubmissions,
    pendingSubmissions,
    registrationsCount,
    trainingCount,
    labCount,
    contactCount,
    registrations7d,
    training7d,
    lab7d,
  };
}
