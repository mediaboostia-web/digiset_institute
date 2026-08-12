const { createClient } = require("@supabase/supabase-js");

const url = "https://ntrqhelicjvaolghuqii.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cnFoZWxpY2p2YW9sZ2h1cWlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM0OTc3MiwiZXhwIjoyMTAxOTI1NzcyfQ.3Crp5KYPjanOMG_dldTVFm3lfA0qgyzhbSVGH-GVZAk";

const supabase = createClient(url, key);

async function testExactSchema() {
  // Test insert with UUID and actual column names
  const testObj = {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    name: "Dr ABAGA ABESSOLO Michel Audrey",
    role: "Fondateur & Directeur Général",
    pole: "Direction Générale",
    photo_url: "/brand/fondateur.png",
  };

  const { data, error } = await supabase.from("team_members").insert([testObj]);
  console.log("INSERT error:", error);
  console.log("INSERT data:", data);

  const { data: rows, error: selectErr } = await supabase.from("team_members").select("*");
  console.log("SELECT error:", selectErr);
  console.log("SELECT rows:", rows);
}

testExactSchema();
