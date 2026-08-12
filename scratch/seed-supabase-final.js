const { createClient } = require("@supabase/supabase-js");

const url = "https://ntrqhelicjvaolghuqii.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cnFoZWxpY2p2YW9sZ2h1cWlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM0OTc3MiwiZXhwIjoyMTAxOTI1NzcyfQ.3Crp5KYPjanOMG_dldTVFm3lfA0qgyzhbSVGH-GVZAk";

const supabase = createClient(url, key);

const INITIAL_TEAM_UUIDS = [
  {
    id: "2f6a1361-e552-4d46-b523-83ddc15dceff",
    full_name: "Dr ABAGA ABESSOLO Michel Audrey",
    role_title: "Fondateur & Directeur Général",
    pole: "Direction Générale",
    photo_url: "/brand/fondateur.png",
    sort_order: 1,
    created_at: new Date().toISOString(),
  },
  {
    id: "01d227e2-c725-4c17-8141-57f9cf73bac3",
    full_name: "Prof. Jean-Marc ONDO",
    role_title: "Directeur des Études & Maquettes ECTS",
    pole: "Direction Académique",
    photo_url: "/images/img/Hero_image1.jpg",
    sort_order: 2,
    created_at: new Date().toISOString(),
  },
  {
    id: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    full_name: "Dr. Sylvie NGUEMA",
    role_title: "Présidente du Conseil Scientifique",
    pole: "Direction Académique",
    photo_url: "/images/img/Hero_image2.jpg",
    sort_order: 3,
    created_at: new Date().toISOString(),
  },
  {
    id: "e4e7c10b-8a82-4f36-a123-9c8d7e6f5a4b",
    full_name: "Ing. Patrick ELLA",
    role_title: "Chef du Pôle Cybersécurité & Labos SOC",
    pole: "Corps Professoral",
    photo_url: "/images/img/Hero_image3.jpg",
    sort_order: 4,
    created_at: new Date().toISOString(),
  },
];

async function seedSupabaseDB() {
  const { data, error } = await supabase.from("team_members").upsert(INITIAL_TEAM_UUIDS);
  console.log("Upsert error:", error);

  const { data: rows } = await supabase.from("team_members").select("*").order("sort_order", { ascending: true });
  console.log("\n--- SUPABASE REAL DATABASE CONTENT (team_members) ---");
  console.log(`Total Rows: ${rows ? rows.length : 0}`);
  console.dir(rows, { depth: null });
}

seedSupabaseDB();
