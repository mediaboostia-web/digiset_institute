const url = "https://ntrqhelicjvaolghuqii.supabase.co/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im50cnFoZWxpY2p2YW9sZ2h1cWlpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NjM0OTc3MiwiZXhwIjoyMTAxOTI1NzcyfQ.3Crp5KYPjanOMG_dldTVFm3lfA0qgyzhbSVGH-GVZAk";

async function getOpenAPI() {
  const res = await fetch(url);
  const json = await res.json();
  console.log("TABLE DEFINITIONS IN SUPABASE DB:");
  if (json.definitions) {
    for (const tableName of Object.keys(json.definitions)) {
      console.log(`\nTable '${tableName}':`);
      const props = json.definitions[tableName].properties;
      if (props) {
        for (const col of Object.keys(props)) {
          console.log(`  - ${col} (${props[col].type || props[col].format})`);
        }
      }
    }
  } else {
    console.log("No definitions found in OpenAPI spec");
  }
}

getOpenAPI();
