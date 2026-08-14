import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import type { ContentBlock } from "@/app/api/content-blocks/route";

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && !url.includes("example.supabase.co");
}

/**
 * Lecture directe des blocs de contenu, sans passer par un aller-retour HTTP
 * vers /api/content-blocks — utilisée par les Server Components (ex: page
 * d'accueil) pour éviter de dépendre de NEXT_PUBLIC_SITE_URL, qui pointe
 * vers le domaine de production même en développement local et rendrait un
 * auto-fetch HTTP lent ou bloquant. La route /api/content-blocks (consommée
 * côté client par les pages "use client") réutilise cette même fonction.
 */
export async function getContentBlocks(pageKey: string): Promise<ContentBlock[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("content_blocks")
      .select("page_key, block_key, content_type, value")
      .eq("page_key", pageKey);

    if (error || !data) return [];
    return data as ContentBlock[];
  } catch (error) {
    console.error("[content-blocks]", error);
    return [];
  }
}
