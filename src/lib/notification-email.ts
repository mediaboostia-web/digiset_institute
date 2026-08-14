import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && !url.includes("example.supabase.co");
}

/**
 * Adresse de notification active — lit `site_settings.notification_email`
 * quand Supabase est configuré, sinon retombe sur les variables d'env.
 * Isolé dans son propre module (plutôt que dans api/admin/settings/route.ts)
 * car un fichier route.ts ne doit exporter que les handlers HTTP reconnus
 * (GET/POST/...) — un export supplémentaire y fait échouer la validation de
 * types générée par Next.js.
 */
export async function getActiveNotificationEmail(): Promise<string> {
  if (isSupabaseConfigured()) {
    try {
      const admin = createAdminClient();
      const { data } = await admin.from("site_settings").select("notification_email").eq("id", 1).single();
      if (data?.notification_email) return data.notification_email as string;
    } catch {
      // Repli ci-dessous
    }
  }
  return process.env.NOTIFICATION_EMAIL_TO || "mediaboostia@gmail.com";
}
