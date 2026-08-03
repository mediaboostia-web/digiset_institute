import "server-only";
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase "admin" — utilise la clé service_role qui **contourne
 * toutes les policies RLS**. Ne jamais importer ce module depuis un
 * Client Component ni depuis un fichier accessible au bundle navigateur
 * (le paquet `server-only` fait échouer le build si c'est le cas).
 *
 * Usage réservé : upload vers le bucket privé `candidate-documents` et
 * toute opération serveur qui doit explicitement ignorer la RLS (ex :
 * traitement d'une soumission de formulaire public dans app/api/**).
 */
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    },
  );
}
