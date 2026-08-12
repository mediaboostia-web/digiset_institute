const { createClient } = require("@supabase/supabase-js");

const url = "https://ntrqhelicjvaolghuqii.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cnFoZWxpY2p2YW9sZ2h1cWlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM0OTc3MiwiZXhwIjoyMTAxOTI1NzcyfQ.3Crp5KYPjanOMG_dldTVFm3lfA0qgyzhbSVGH-GVZAk";

const supabase = createClient(url, key);

async function testInsertFields() {
  const fields = ["id", "full_name", "role_title", "pole", "photo_url", "email", "bio", "facebook_url", "linkedin_url", "sort_order", "created_at"];
  
  for (const field of fields) {
    const testObj = { id: `test-${Date.now()}` };
    testObj[field] = "test";
    const { error } = await supabase.from("team_members").insert([testObj]);
    console.log(`Field '${field}':`, error ? error.message : "OK");
    await supabase.from("team_members").delete().eq("id", testObj.id);
  }
}

testInsertFields();
