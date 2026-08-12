const { createClient } = require("@supabase/supabase-js");

const url = "https://ntrqhelicjvaolghuqii.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cnFoZWxpY2p2YW9sZ2h1cWlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM0OTc3MiwiZXhwIjoyMTAxOTI1NzcyfQ.3Crp5KYPjanOMG_dldTVFm3lfA0qgyzhbSVGH-GVZAk";

const supabase = createClient(url, key);

async function test() {
  const { data, error } = await supabase.from("team_members").select("*");
  console.log("SELECT error:", error);
  console.log("SELECT data:", data);
}

test();
