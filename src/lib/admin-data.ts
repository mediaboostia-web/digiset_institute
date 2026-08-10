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

// Actualité officielle initiale du lancement
export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "news-1",
    slug: "lancement-officiel-activites-septembre-2026",
    title: "Ouverture des Inscriptions à DigiSET Institute pour la Rentrée Académique 2026",
    cover_image_url: "/brand/fondateur.png",
    excerpt:
      "DigiSET Institute ouvre officiellement les candidatures pour ses filières scientifiques d'excellence (Prépa MP2I, Licences Pro IA, Cybersécurité, Monétique).",
    body: "L'établissement Supérieur Privé DigiSET Institute annonce le démarrage des inscriptions pour l'année académique 2026-2027 sur son campus d'Akanda. Les diplômés du secondaire et professionnels sont invités à déposer leur dossier en ligne.",
    status: "published",
    category: "Institutionnel",
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
