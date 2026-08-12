const { createClient } = require("@supabase/supabase-js");

const url = "https://ntrqhelicjvaolghuqii.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cnFoZWxpY2p2YW9sZ2h1cWlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM0OTc3MiwiZXhwIjoyMTAxOTI1NzcyfQ.3Crp5KYPjanOMG_dldTVFm3lfA0qgyzhbSVGH-GVZAk";

const supabase = createClient(url, key);

const INITIAL_TEAM = [
  {
    id: "team-1",
    full_name: "Dr ABAGA ABESSOLO Michel Audrey",
    role_title: "Fondateur & Directeur Général",
    pole: "Direction Générale",
    photo_url: "/brand/fondateur.png",
    bio: "Docteur en informatique, expert en systèmes de paiement et gouvernance du numérique.",
    email: "direction@digiset-gabon.com",
    facebook_url: "",
    linkedin_url: "https://linkedin.com",
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "team-2",
    full_name: "Prof. Jean-Marc ONDO",
    role_title: "Directeur des Études & Maquettes ECTS",
    pole: "Direction Académique",
    photo_url: "/images/img/Hero_image1.jpg",
    bio: "Enseignant-chercheur, responsable de l'accréditation et des programmes académiques.",
    email: "etudes@digiset-gabon.com",
    facebook_url: "",
    linkedin_url: "https://linkedin.com",
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "team-3",
    full_name: "Dr. Sylvie NGUEMA",
    role_title: "Présidente du Conseil Scientifique",
    pole: "Direction Académique",
    photo_url: "/images/img/Hero_image2.jpg",
    bio: "Docteur en Mathématiques Appliquées, conseillère en recherche et partenariats.",
    email: "conseil@digiset-gabon.com",
    facebook_url: "",
    linkedin_url: "https://linkedin.com",
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "team-4",
    full_name: "Ing. Patrick ELLA",
    role_title: "Chef du Pôle Cybersécurité & Labos SOC",
    pole: "Corps Professoral",
    photo_url: "/images/img/Hero_image3.jpg",
    bio: "Ingénieur certifié CISSP, responsable des travaux pratiques en sécurité réseau.",
    email: "cyber@digiset-gabon.com",
    facebook_url: "",
    linkedin_url: "https://linkedin.com",
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
];

async function seed() {
  const { data, error } = await supabase.from("team_members").upsert(INITIAL_TEAM);
  console.log("UPSERT error:", error);
  console.log("UPSERT data:", data);

  const { data: selectData } = await supabase.from("team_members").select("*");
  console.log("CURRENT ROW COUNT:", selectData?.length);
}

seed();
