import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getGlobalMedia, addMediaItem, updateMediaItem, deleteMediaItem, MediaItem } from "@/lib/media-store";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (supabaseUrl) {
      const supabase = await createClient();
      const { data, error } = await supabase
        .from("media_library")
        .select("*")
        .order("uploaded_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        const formatted: MediaItem[] = data.map((d) => ({
          id: d.id,
          title: d.caption || d.title || "Image Sans Titre",
          url: d.url,
          category: d.category || "General",
          created_at: d.uploaded_at || d.created_at || new Date().toISOString(),
        }));
        return NextResponse.json({ ok: true, data: formatted });
      }
    }

    const media = getGlobalMedia();
    return NextResponse.json({ ok: true, data: media });
  } catch (error) {
    console.error("[api/media GET]", error);
    const media = getGlobalMedia();
    return NextResponse.json({ ok: true, data: media });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.url || !body.title) {
      return NextResponse.json({ ok: false, error: "Titre et URL obligatoires" }, { status: 400 });
    }

    const newItem = addMediaItem({
      id: body.id,
      title: body.title,
      url: body.url,
      category: body.category || "Campus & Équipements",
      size: body.size || "Local File",
      dimensions: body.dimensions || "Variable",
    });

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (supabaseUrl) {
      const supabase = await createClient();
      const payload = {
        url: newItem.url,
        category: newItem.category,
        caption: newItem.title,
        uploaded_at: newItem.created_at,
      };

      const { error: rlsError } = await supabase.from("media_library").insert([payload]);

      if (rlsError && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const admin = createAdminClient();
        await admin.from("media_library").insert([payload]);
      }
    }

    return NextResponse.json({ ok: true, data: newItem });
  } catch (error) {
    console.error("[api/media POST]", error);
    return NextResponse.json({ ok: false, error: "Erreur création média" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID manquant" }, { status: 400 });
    }

    const updated = updateMediaItem(id, updates);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (supabaseUrl) {
      const supabase = await createClient();
      const dbUpdates: Record<string, unknown> = {};
      if (updates.title) dbUpdates.caption = updates.title;
      if (updates.category) dbUpdates.category = updates.category;
      if (updates.url) dbUpdates.url = updates.url;

      const { error: rlsError } = await supabase.from("media_library").update(dbUpdates).eq("id", id);

      if (rlsError && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const admin = createAdminClient();
        await admin.from("media_library").update(dbUpdates).eq("id", id);
      }
    }

    return NextResponse.json({ ok: true, data: updated });
  } catch (error) {
    console.error("[api/media PATCH]", error);
    return NextResponse.json({ ok: false, error: "Erreur modification média" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ ok: false, error: "ID manquant" }, { status: 400 });
    }

    const success = deleteMediaItem(id);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (supabaseUrl) {
      const supabase = await createClient();
      const { error: rlsError } = await supabase.from("media_library").delete().eq("id", id);

      if (rlsError && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const admin = createAdminClient();
        await admin.from("media_library").delete().eq("id", id);
      }
    }

    return NextResponse.json({ ok: true, success });
  } catch (error) {
    console.error("[api/media DELETE]", error);
    return NextResponse.json({ ok: false, error: "Erreur suppression média" }, { status: 500 });
  }
}
