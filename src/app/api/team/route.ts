import { NextResponse, type NextRequest } from "next/server";
import { getGlobalTeam, addTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/team-store";
import { TeamMember } from "@/lib/admin-data";

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

      if (!error && data && Array.isArray(data) && data.length > 0) {
        return NextResponse.json({ ok: true, data });
      }
    }

    const team = getGlobalTeam();
    return NextResponse.json({ ok: true, data: team });
  } catch (error) {
    console.error("[api/team GET]", error);
    const team = getGlobalTeam();
    return NextResponse.json({ ok: true, data: team });
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
      sort_order: body.sort_order || 1,
      created_at: new Date().toISOString(),
    };

    const saved = addTeamMember(newMember);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.from("team_members").insert([saved]);
    }

    return NextResponse.json({ ok: true, data: saved });
  } catch (error) {
    console.error("[api/team POST]", error);
    return NextResponse.json({ ok: false, error: "Erreur enregistrement membre" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    const updated = updateTeamMember(id, updates);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.from("team_members").update(updates).eq("id", id);
    }

    return NextResponse.json({ ok: true, data: updated });
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

    const deleted = deleteTeamMember(id);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();
      await supabase.from("team_members").delete().eq("id", id);
    }

    return NextResponse.json({ ok: true, id, deleted });
  } catch (error) {
    console.error("[api/team DELETE]", error);
    return NextResponse.json({ ok: false, error: "Erreur suppression membre" }, { status: 500 });
  }
}
