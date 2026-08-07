/**
 * Types & Initial Data Provider pour le Back-Office Digi-SET Institute.
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
  sort_order: number;
  created_at: string;
}

// Données initiales réalistes pour la V1 (Digi-SET Institute)
export const INITIAL_SUBMISSIONS: AnySubmission[] = [
  {
    id: "sub-1",
    type: "registration",
    full_name: "Marc Ondo",
    email: "marc.ondo@gmail.com",
    phone: "+241 07 12 34 56",
    last_diploma: "Baccalauréat C (Mention Bien)",
    program_title: "Classe Préparatoire MP2I",
    attachments: [
      { name: "CV_Marc_Ondo.pdf", url: "#", size: "1.2 MB" },
      { name: "Releve_Bac_2024.pdf", url: "#", size: "850 KB" },
    ],
    status: "nouveau",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // Il y a 5h
  },
  {
    id: "sub-2",
    type: "registration",
    full_name: "Sylvie Mboumba",
    email: "sylvie.mboumba@yahoo.fr",
    phone: "+241 06 45 89 12",
    last_diploma: "BTS Informatique de Gestion",
    program_title: "Licence Pro Option IA & Data Science",
    attachments: [
      { name: "Dossier_Candidature_Sylvie.pdf", url: "#", size: "2.4 MB" },
    ],
    status: "nouveau",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // Il y a 2 jours
  },
  {
    id: "sub-3",
    type: "training",
    company_name: "BGFI Bank Gabon",
    contact_name: "Alain Nguema",
    phone: "+241 01 76 00 12",
    email: "a.nguema@bgfi.ga",
    domain: "Cybersécurité & Audit SI",
    participants_count: 12,
    desired_dates: "Octobre 2026",
    message:
      "Demande de formation sur-mesure pour 12 ingénieurs réseau et analystes sécurité SOC.",
    status: "en_cours",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(), // Il y a 3 jours
  },
  {
    id: "sub-4",
    type: "lab",
    institution_name: "Lycée National Léon Mba",
    contact_name: "M. Koumba - Proviseur",
    phone: "+241 07 88 99 00",
    email: "contact@lycee-leonmba.ga",
    lab_type: "physique",
    desired_slots: "Forfait 10 manipulations (Semestre 1)",
    headcount: 45,
    status: "nouveau",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 1).toISOString(), // Il y a 1 jour
  },
  {
    id: "sub-5",
    type: "contact",
    full_name: "Jeanne Ebang",
    email: "j.ebang@gmail.com",
    phone: "+241 06 11 22 33",
    subject: "Demande de rendez-vous d'orientation",
    message: "Bonjour, je souhaiterais visiter le laboratoire IA de l'institut le samedi matin.",
    status: "traite",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
  },
  {
    id: "sub-6",
    type: "registration",
    full_name: "Cédric Obame",
    email: "c.obame@hotmail.com",
    phone: "+241 07 44 55 66",
    last_diploma: "Baccalauréat D",
    program_title: "Licence Pro Option Systèmes de Paiement Électronique",
    attachments: [{ name: "CV_Cedric.pdf", url: "#", size: "1.1 MB" }],
    status: "nouveau",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: "news-1",
    slug: "lancement-officiel-activites-septembre-2026",
    title: "Lancement officiel des activités académiques de Digi-SET Institute",
    cover_image_url:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60",
    excerpt:
      "Digi-SET Institute ouvre ses portes en septembre 2026 à Libreville pour former les leaders des technologies du numérique en Afrique Centrale.",
    body: "L'Institut Supérieur Digi-SET annonce le démarrage officiel de ses programmes académiques et de recherche pour l'année universitaire 2026-2027. Équipé de laboratoires de pointe en Physique, Cybersécurité et Intelligence Artificielle...",
    status: "published",
    category: "Institutionnel",
    published_at: "2026-08-01T10:00:00Z",
    created_at: "2026-08-01T09:00:00Z",
  },
  {
    id: "news-2",
    slug: "partenariat-entreprises-systemes-paiement-monetique",
    title: "Partenariat stratégique avec les acteurs majeurs du paiement électronique",
    cover_image_url:
      "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=60",
    excerpt:
      "Un accord cadre a été signé pour faciliter les stages et l'insertion des diplômés de la Licence Pro Monétique & Paiements.",
    body: "Digi-SET Institute renforce son ancrage professionnel en signant une convention stratégique pour l'accès direct aux plateformes de test bancaire et monétique...",
    status: "published",
    category: "Partenariat",
    published_at: "2026-08-04T14:30:00Z",
    created_at: "2026-08-04T12:00:00Z",
  },
  {
    id: "news-3",
    slug: "ouverture-laboratoires-tp-classes-preparatoires",
    title: "Mise à disposition des laboratoires de TP pour les établissements partenaires",
    cover_image_url:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop&q=60",
    excerpt:
      "Forfaits de 5 et 10 manipulations dédiés aux classes préparatoires scientifiques des lycées de Libreville.",
    body: "Afin de soutenir l'excellence des filières scientifiques au Gabon, Digi-SET ouvre ses laboratoires de physique générale, d'électricité et d'optique avancée...",
    status: "draft",
    category: "Services & Labos",
    published_at: "2026-08-06T09:00:00Z",
    created_at: "2026-08-05T16:00:00Z",
  },
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: "team-1",
    full_name: "Dr. ABAGA ABESSOLO Michel Audrey",
    role_title: "Fondateur & Directeur Général",
    pole: "Direction Générale",
    photo_url: "/brand/Dr-ABAGA-ABESSOLO-Michel-Audrey.jpg",
    bio: "Docteur en Sciences & Génie Logiciel, expert en systèmes d'information et visionnaire de l'enseignement supérieur numérique au Gabon.",
    email: "m.abaga@digiset-gabon.com",
    sort_order: 1,
    created_at: "2026-08-01T10:00:00Z",
  },
  {
    id: "team-2",
    full_name: "Prof. Jean-Baptiste ELLA",
    role_title: "Directeur des Études & de la Recherche",
    pole: "Direction Académique",
    photo_url:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    bio: "Responsable des maquettes pédagogiques MP2I et du suivi de la recherche appliquée en IA et Monétique.",
    email: "jb.ella@digiset-gabon.com",
    sort_order: 2,
    created_at: "2026-08-01T10:00:00Z",
  },
  {
    id: "team-3",
    full_name: "Ing. Marie-Thérèse NZANG",
    role_title: "Responsable du Pôle Cybersécurité & Certification",
    pole: "Corps Professoral",
    photo_url:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    bio: "Certifiée CISSP & CEH, encadrante des travaux pratiques de sécurité offensive et d'architecture SOC.",
    email: "mt.nzang@digiset-gabon.com",
    sort_order: 3,
    created_at: "2026-08-01T10:00:00Z",
  },
  {
    id: "team-4",
    full_name: "M. Christian MBOUMBA",
    role_title: "Responsable des Relations Entreprises & Stage",
    pole: "Administration & Partenariats",
    photo_url:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80",
    bio: "Gestionnaire des partenariats industriels, des formations continues entreprise et du suivi de carrière.",
    email: "c.mboumba@digiset-gabon.com",
    sort_order: 4,
    created_at: "2026-08-01T10:00:00Z",
  },
];

// Helper pour calculer les KPIs dynamiques à partir de la liste des soumissions
export function calculateKPIs(submissions: AnySubmission[]) {
  const now = new Date().getTime();
  const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;

  const last7DaysSubmissions = submissions.filter(
    (s) => now - new Date(s.created_at).getTime() <= sevenDaysMs
  );

  const regLast7 = last7DaysSubmissions.filter((s) => s.type === "registration").length;
  const trainingLast7 = last7DaysSubmissions.filter((s) => s.type === "training").length;
  const labLast7 = last7DaysSubmissions.filter((s) => s.type === "lab").length;

  const totalCount = submissions.length;
  const pendingCount = submissions.filter((s) => s.status === "nouveau").length;

  return {
    registrations7d: regLast7,
    training7d: trainingLast7,
    lab7d: labLast7,
    totalSubmissions: totalCount,
    pendingSubmissions: pendingCount,
  };
}
