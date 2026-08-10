import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { NewsItem, ContentStatus } from "@/lib/admin-data";

/**
 * Encodage/Décodage de métadonnées additionnelles dans le corps de l'article
 * pour garantir la compatibilité sans modifier le schéma de base Supabase.
 */
function encodeArticleBody(body: string, meta: { category?: string; tags?: string[]; cta_text?: string; cta_url?: string }): string {
  const metaJSON = JSON.stringify(meta);
  return `<!--META:${metaJSON}-->\n${body}`;
}

function decodeArticleBody(rawBody: string): { body: string; category?: string; tags?: string[]; cta_text?: string; cta_url?: string } {
  const metaMatch = rawBody.match(/^<!--META:(.*?)-->\n?/);
  if (metaMatch) {
    try {
      const meta = JSON.parse(metaMatch[1]);
      const cleanBody = rawBody.replace(/^<!--META:.*?-->\n?/, "");
      return { body: cleanBody, ...meta };
    } catch {
      // Ignorer l'erreur de parse
    }
  }
  return { body: rawBody };
}

/**
 * GET /api/news
 * ?status=published -> pour les visiteurs publics (exclut les brouillons)
 * ?status=all -> pour le back-office admin
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status") || "published";
    const slugParam = searchParams.get("slug");

    const admin = createAdminClient();
    let query = admin.from("news").select("*");

    if (slugParam) {
      query = query.eq("slug", slugParam);
    } else if (statusParam !== "all") {
      query = query.eq("status", "published");
    }

    const { data, error } = await query.order("created_at", { ascending: false });

    if (error) throw error;

    const formattedArticles: NewsItem[] = (data || []).map((row) => {
      const { body, category, tags, cta_text, cta_url } = decodeArticleBody(row.body);
      return {
        id: row.id,
        slug: row.slug,
        title: row.title,
        cover_image_url: row.cover_image_url || "/brand/fondateur.png",
        excerpt: row.excerpt || "",
        body,
        category: category || row.category || "Institutionnel",
        tags: tags || [],
        cta_text: cta_text || "Déposer un dossier",
        cta_url: cta_url || "/inscription/candidature",
        status: row.status as ContentStatus,
        published_at: row.published_at || row.created_at,
        created_at: row.created_at,
      };
    });

    return NextResponse.json({ ok: true, data: formattedArticles });
  } catch (error) {
    console.error("[api/news GET]", error);
    return NextResponse.json({ ok: false, error: "Erreur serveur" }, { status: 500 });
  }
}

/**
 * POST /api/news
 * Création d'une nouvelle actualité depuis le back-office.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, category, excerpt, body: articleBody, cover_image_url, status, tags, cta_text, cta_url } = body;

    if (!title || !articleBody) {
      return NextResponse.json({ ok: false, error: "Titre et contenu obligatoires" }, { status: 400 });
    }

    const finalSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const fullEncodedBody = encodeArticleBody(articleBody, {
      category: category || "Institutionnel",
      tags: tags || [],
      cta_text,
      cta_url,
    });

    const admin = createAdminClient();
    const { data, error } = await admin
      .from("news")
      .insert({
        title,
        slug: finalSlug,
        excerpt: excerpt || "",
        body: fullEncodedBody,
        cover_image_url: cover_image_url || null,
        status: status || "published",
        published_at: status === "published" ? new Date().toISOString() : null,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({ ok: true, data });
  } catch (error) {
    console.error("[api/news POST]", error);
    return NextResponse.json({ ok: false, error: "Erreur lors de la création" }, { status: 500 });
  }
}

/**
 * PATCH /api/news
 * Modification ou bascule de statut (Brouillon <-> Publié)
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, slug, category, excerpt, body: articleBody, cover_image_url, status, tags, cta_text, cta_url } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID de l'article manquant" }, { status: 400 });
    }

    const admin = createAdminClient();

    // Si c'est juste un basculement de statut rapide
    if (status && !title && !articleBody) {
      const { error } = await admin
        .from("news")
        .update({
          status,
          published_at: status === "published" ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", id);

      if (error) throw error;
      return NextResponse.json({ ok: true });
    }

    const fullEncodedBody = encodeArticleBody(articleBody || "", {
      category: category || "Institutionnel",
      tags: tags || [],
      cta_text,
      cta_url,
    });

    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (title) updatePayload.title = title;
    if (slug) updatePayload.slug = slug;
    if (excerpt !== undefined) updatePayload.excerpt = excerpt;
    if (articleBody !== undefined) updatePayload.body = fullEncodedBody;
    if (cover_image_url !== undefined) updatePayload.cover_image_url = cover_image_url;
    if (status) {
      updatePayload.status = status;
      if (status === "published") updatePayload.published_at = new Date().toISOString();
    }

    const { error } = await admin.from("news").update(updatePayload).eq("id", id);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/news PATCH]", error);
    return NextResponse.json({ ok: false, error: "Erreur lors de la mise à jour" }, { status: 500 });
  }
}

/**
 * DELETE /api/news?id=...
 * Suppression d'un article
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID manquant" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error } = await admin.from("news").delete().eq("id", id);

    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/news DELETE]", error);
    return NextResponse.json({ ok: false, error: "Erreur lors de la suppression" }, { status: 500 });
  }
}
