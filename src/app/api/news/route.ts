import { NextResponse, type NextRequest } from "next/server";
import { getGlobalNews, getNewsBySlug, addNewsItem, updateNewsItem, deleteNewsItem, slugify } from "@/lib/news-store";
import type { NewsItem, ContentStatus } from "@/lib/admin-data";

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
      // Ignorer
    }
  }
  return { body: rawBody };
}

/**
 * GET /api/news
 * ?status=published -> public visitors
 * ?status=all -> admin back-office
 * ?slug=... -> single article query
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status") || "published";
    const slugParam = searchParams.get("slug");

    if (slugParam) {
      const singleItem = getNewsBySlug(slugParam);
      if (singleItem) {
        return NextResponse.json({ ok: true, data: [singleItem] });
      }
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createAdminClient } = await import("@/lib/supabase/admin");
      const admin = createAdminClient();
      let query = admin.from("news").select("*");

      if (slugParam) {
        query = query.eq("slug", slugParam);
      } else if (statusParam !== "all") {
        query = query.eq("status", "published");
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        const formatted: NewsItem[] = data.map((row) => {
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
        return NextResponse.json({ ok: true, data: formatted });
      }
    }

    // Fallback unifié depuis news-store
    const allStoreNews = getGlobalNews(statusParam === "all" ? "all" : "published");
    let result = allStoreNews;

    if (slugParam) {
      const match = getNewsBySlug(slugParam);
      result = match ? [match] : [];
    }

    return NextResponse.json({ ok: true, data: result });
  } catch (error) {
    console.error("[api/news GET]", error);
    return NextResponse.json({ ok: true, data: getGlobalNews("published") });
  }
}

/**
 * POST /api/news
 * Création d'un nouvel article depuis le backoffice
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, category, excerpt, body: articleBody, cover_image_url, status, tags, cta_text, cta_url } = body;

    if (!title || !articleBody) {
      return NextResponse.json({ ok: false, error: "Titre et contenu obligatoires" }, { status: 400 });
    }

    const finalSlug = slug ? slugify(slug) : slugify(title);

    const newArticle: NewsItem = {
      id: `news-${Date.now()}`,
      slug: finalSlug,
      title,
      category: category || "Institutionnel",
      excerpt: excerpt || "",
      body: articleBody,
      cover_image_url: cover_image_url || "/images/img/Image_3.jpg",
      status: status || "published",
      published_at: status === "published" ? new Date().toISOString() : new Date().toISOString(),
      created_at: new Date().toISOString(),
      tags: tags || [],
      cta_text: cta_text || "Déposer un dossier",
      cta_url: cta_url || "/inscription/candidature",
    };

    addNewsItem(newArticle);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createAdminClient } = await import("@/lib/supabase/admin");
      const admin = createAdminClient();
      const fullEncodedBody = encodeArticleBody(articleBody, {
        category: category || "Institutionnel",
        tags: tags || [],
        cta_text,
        cta_url,
      });

      await admin.from("news").insert({
        title,
        slug: finalSlug,
        excerpt: excerpt || "",
        body: fullEncodedBody,
        cover_image_url: cover_image_url || null,
        status: status || "published",
        published_at: status === "published" ? new Date().toISOString() : null,
      });
    }

    return NextResponse.json({ ok: true, data: newArticle });
  } catch (error) {
    console.error("[api/news POST]", error);
    return NextResponse.json({ ok: false, error: "Erreur lors de la création de l'article" }, { status: 500 });
  }
}

/**
 * PATCH /api/news
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, slug, category, excerpt, body: articleBody, cover_image_url, status, tags, cta_text, cta_url } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID manquant" }, { status: 400 });
    }

    updateNewsItem(id, {
      title,
      slug,
      category,
      excerpt,
      body: articleBody,
      cover_image_url,
      status,
      tags,
      cta_text,
      cta_url,
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createAdminClient } = await import("@/lib/supabase/admin");
      const admin = createAdminClient();
      const updatePayload: Record<string, unknown> = {
        updated_at: new Date().toISOString(),
      };
      if (title) updatePayload.title = title;
      if (slug) updatePayload.slug = slugify(slug);
      if (excerpt !== undefined) updatePayload.excerpt = excerpt;
      if (cover_image_url !== undefined) updatePayload.cover_image_url = cover_image_url;
      if (status) {
        updatePayload.status = status;
        if (status === "published") updatePayload.published_at = new Date().toISOString();
      }

      await admin.from("news").update(updatePayload).eq("id", id);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/news PATCH]", error);
    return NextResponse.json({ ok: false, error: "Erreur modification article" }, { status: 500 });
  }
}

/**
 * DELETE /api/news?id=...
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID manquant" }, { status: 400 });
    }

    deleteNewsItem(id);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createAdminClient } = await import("@/lib/supabase/admin");
      const admin = createAdminClient();
      await admin.from("news").delete().eq("id", id);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/news DELETE]", error);
    return NextResponse.json({ ok: false, error: "Erreur suppression article" }, { status: 500 });
  }
}
