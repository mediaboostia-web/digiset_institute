import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Client Supabase pour Server Components, Server Actions et Route Handlers.
 * `cookies()` est asynchrone depuis Next.js 15+ (obligatoire en 16) — cf.
 * node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md.
 * Utilise la clé anonyme publique — soumis aux policies RLS. Ne jamais
 * utiliser la clé service_role dans ce client.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // `setAll` peut être appelé depuis un Server Component : sans
            // effet si un proxy rafraîchit déjà la session en parallèle.
          }
        },
      },
    },
  );
}
