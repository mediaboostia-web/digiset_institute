import { NextResponse, type NextRequest } from "next/server";
import { INITIAL_NEWS, type NewsItem, type ContentStatus } from "@/lib/admin-data";

// Fallback / Store dynamique d'articles en mémoire vive serveur
let globalNewsStore: NewsItem[] = [...INITIAL_NEWS];

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
 * ?slug=... -> single article page
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get("status") || "published";
    const slugParam = searchParams.get("slug");

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

    // Fallback store mémoire
    let filtered = [...globalNewsStore];
    if (slugParam) {
      filtered = filtered.filter((n) => n.slug === slugParam);
    } else if (statusParam !== "all") {
      filtered = filtered.filter((n) => n.status === "published");
    }

    return NextResponse.json({ ok: true, data: filtered });
  } catch (error) {
    console.error("[api/news GET]", error);
    return NextResponse.json({ ok: true, data: globalNewsStore });
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

    const finalSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const newArticle: NewsItem = {
      id: `news-${Date.now()}`,
      slug: finalSlug,
      title,
      category: category || "Institutionnel",
      excerpt: excerpt || "",
      body: articleBody,
      cover_image_url: cover_image_url || "/brand/fondateur.png",
      status: status || "published",
      published_at: status === "published" ? new Date().toISOString() : undefined,
      created_at: new Date().toISOString(),
      tags: tags || [],
      cta_text: cta_text || "Déposer un dossier",
      cta_url: cta_url || "/inscription/candidature",
    };

    globalNewsStore.unshift(newArticle);

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
 * Modification ou changement de statut
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, title, slug, category, excerpt, body: articleBody, cover_image_url, status, tags, cta_text, cta_url } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID manquant" }, { status: 400 });
    }

    globalNewsStore = globalNewsStore.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          ...(title && { title }),
          ...(slug && { slug }),
          ...(category && { category }),
          ...(excerpt !== undefined && { excerpt }),
          ...(articleBody !== undefined && { body: articleBody }),
          ...(cover_image_url !== undefined && { cover_image_url }),
          ...(status && { status, published_at: status === "published" ? new Date().toISOString() : item.published_at }),
          ...(tags && { tags }),
          ...(cta_text && { cta_text }),
          ...(cta_url && { cta_url }),
        };
      }
      return item;
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
      if (slug) updatePayload.slug = slug;
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

    globalNewsStore = globalNewsStore.filter((item) => item.id !== id);

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
