import { NextResponse, type NextRequest } from "next/server";
import { INITIAL_TEAM, TeamMember } from "@/lib/admin-data";

// Stockage en mémoire vive serveur + synchronisation Supabase si disponible
let globalTeamStore: TeamMember[] = [...INITIAL_TEAM];

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      const { data, error } = await supabase
        .from("team_members")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && data && data.length > 0) {
        return NextResponse.json({ ok: true, data });
      }
    }

    return NextResponse.json({ ok: true, data: globalTeamStore });
  } catch (error) {
    console.error("[api/team GET]", error);
    return NextResponse.json({ ok: true, data: globalTeamStore });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const newMember: TeamMember = {
      id: body.id || `team-${Date.now()}`,
      full_name: body.full_name,
      role_title: body.role_title,
      pole: body.pole || "Direction Générale",
      photo_url: body.photo_url || "/brand/fondateur.png",
      bio: body.bio || "",
      email: body.email || "",
      facebook_url: body.facebook_url || "",
      linkedin_url: body.linkedin_url || "",
      sort_order: body.sort_order || globalTeamStore.length + 1,
      created_at: new Date().toISOString(),
    };

    globalTeamStore.push(newMember);
    globalTeamStore.sort((a, b) => a.sort_order - b.sort_order);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.from("team_members").insert([newMember]);
    }

    return NextResponse.json({ ok: true, data: newMember });
  } catch (error) {
    console.error("[api/team POST]", error);
    return NextResponse.json({ ok: false, error: "Erreur enregistrement membre" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    globalTeamStore = globalTeamStore.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    globalTeamStore.sort((a, b) => a.sort_order - b.sort_order);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.from("team_members").update(updates).eq("id", id);
    }

    return NextResponse.json({ ok: true, data: updates });
  } catch (error) {
    console.error("[api/team PATCH]", error);
    return NextResponse.json({ ok: false, error: "Erreur modification membre" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID manquant" }, { status: 400 });
    }

    globalTeamStore = globalTeamStore.filter((item) => item.id !== id);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.from("team_members").delete().eq("id", id);
    }

    return NextResponse.json({ ok: true, id });
  } catch (error) {
    console.error("[api/team DELETE]", error);
    return NextResponse.json({ ok: false, error: "Erreur suppression membre" }, { status: 500 });
  }
}
