const { createClient } = require("@supabase/supabase-js");

const url = "https://ntrqhelicjvaolghuqii.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cnFoZWxpY2p2YW9sZ2h1cWlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM0OTc3MiwiZXhwIjoyMTAxOTI1NzcyfQ.3Crp5KYPjanOMG_dldTVFm3lfA0qgyzhbSVGH-GVZAk";

const supabase = createClient(url, key);

async function testUUIDInsert() {
  const memberObj = {
    id: "2f6a1361-e552-4d46-b523-83ddc15dceff",
    full_name: "Dr ABAGA ABESSOLO Michel Audrey",
    role_title: "Fondateur & Directeur Général",
    pole: "Direction Générale",
    photo_url: "/brand/fondateur.png",
    sort_order: 1,
    created_at: new Date().toISOString(),
  };

  const { data, error } = await supabase.from("team_members").upsert([memberObj]);
  console.log("UUID UPSERT error:", error);

  const { data: rows } = await supabase.from("team_members").select("*");
  console.log("SELECT count from Supabase DB:", rows ? rows.length : 0);
  console.log("Rows in DB:", rows);
}

testUUIDInsert();
