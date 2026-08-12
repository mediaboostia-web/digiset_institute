const { createClient } = require("@supabase/supabase-js");

const url = "https://ntrqhelicjvaolghuqii.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cnFoZWxpY2p2YW9sZ2h1cWlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM0OTc3MiwiZXhwIjoyMTAxOTI1NzcyfQ.3Crp5KYPjanOMG_dldTVFm3lfA0qgyzhbSVGH-GVZAk";

const supabase = createClient(url, key);

async function fixSchema() {
  // Test if we can execute SQL via rpc
  const { data, error } = await supabase.rpc("exec_sql", {
    sql_query: `
      ALTER TABLE IF EXISTS team_members ADD COLUMN IF NOT EXISTS bio text;
      ALTER TABLE IF EXISTS team_members ADD COLUMN IF NOT EXISTS email text;
      ALTER TABLE IF EXISTS team_members ADD COLUMN IF NOT EXISTS facebook_url text;
      ALTER TABLE IF EXISTS team_members ADD COLUMN IF NOT EXISTS linkedin_url text;
    `
  });
  console.log("RPC exec_sql result:", error, data);
}

fixSchema();
