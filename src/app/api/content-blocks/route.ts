import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getContentBlocks } from "@/lib/content-blocks";
import { requireSuperAdmin } from "@/lib/admin-auth";

export interface ContentBlock {
  page_key: string;
  block_key: string;
  content_type: "text" | "image_url";
  value: string;
}

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && !url.includes("example.supabase.co");
}

/**
 * GET /api/content-blocks?page_key=home
 * Lecture publique (RLS : `for select using (true)`, cf. migration 0002).
 * Un tableau vide signifie "aucun override enregistré" — les pages publiques
 * doivent retomber sur leur contenu codé en dur par défaut, jamais afficher
 * de vide. Consommée par les pages "use client" (institution, programmes) ;
 * les Server Components (accueil) appellent getContentBlocks() directement
 * pour éviter un aller-retour HTTP vers NEXT_PUBLIC_SITE_URL.
 */
export async function GET(request: NextRequest) {
  const pageKey = request.nextUrl.searchParams.get("page_key");

  if (!pageKey) {
    return NextResponse.json({ ok: false, error: "page_key manquant" }, { status: 400 });
  }

  const data = await getContentBlocks(pageKey);

  return NextResponse.json(
    { ok: true, data },
    { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=120" } },
  );
}

/**
 * PATCH /api/content-blocks
 * Body : { page_key: string, blocks: { block_key, content_type, value }[] }
 * Écrase (upsert) l'ensemble des blocs fournis pour cette page.
 */
export async function PATCH(request: NextRequest) {
  const { response: authError } = await requireSuperAdmin();
  if (authError) return authError;

  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Supabase non configuré — le mini-CMS nécessite une base de données." },
      { status: 503 },
    );
  }

  try {
    const body = (await request.json()) as {
      page_key?: string;
      blocks?: { block_key: string; content_type: "text" | "image_url"; value: string }[];
    };

    if (!body.page_key || !Array.isArray(body.blocks)) {
      return NextResponse.json({ ok: false, error: "page_key ou blocks manquant" }, { status: 400 });
    }

    const rows = body.blocks.map((block) => ({
      page_key: body.page_key,
      block_key: block.block_key,
      content_type: block.content_type,
      value: block.value,
    }));

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("content_blocks")
      .upsert(rows, { onConflict: "page_key,block_key" })
      .select("page_key, block_key, content_type, value");

    if (error) throw error;

    return NextResponse.json({ ok: true, data: data as ContentBlock[] });
  } catch (error) {
    console.error("[api/content-blocks PATCH]", error);
    return NextResponse.json({ ok: false, error: "Erreur enregistrement du contenu" }, { status: 500 });
  }
}
