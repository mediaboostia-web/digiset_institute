import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getGlobalTeam, addTeamMember, updateTeamMember, deleteTeamMember } from "@/lib/team-store";
import { TeamMember } from "@/lib/admin-data";
import { randomUUID } from "crypto";

function isUUID(str: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
}

export async function GET() {
  const cacheHeaders = {
    "Cache-Control": "no-cache, no-store, must-revalidate",
  };

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    if (supabaseUrl && !supabaseUrl.includes("example.supabase.co")) {
      const admin = createAdminClient();
      const { data, error } = await admin
        .from("team_members")
        .select("*")
        .order("sort_order", { ascending: true });

      if (!error && Array.isArray(data) && data.length > 0) {
        return NextResponse.json({ ok: true, data, source: "supabase" }, { headers: cacheHeaders });
      }
    }

    const team = getGlobalTeam();
    return NextResponse.json({ ok: true, data: team, source: "memory" }, { headers: cacheHeaders });
  } catch (error) {
    console.error("[api/team GET]", error);
    const team = getGlobalTeam();
    return NextResponse.json({ ok: true, data: team, source: "memory" }, { headers: cacheHeaders });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const rawId = body.id;
    const memberId = rawId && isUUID(rawId) ? rawId : randomUUID();

    const newMember: TeamMember = {
      id: memberId,
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

    // 1. Sauvegarde mémoire locale
    addTeamMember(newMember);

    // 2. Écriture directe et pérenne dans Supabase DB avec payload assaini (colonnes réelles SQL)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes("example.supabase.co")) {
      const admin = createAdminClient();
      const dbPayload = {
        id: memberId,
        full_name: newMember.full_name,
        role_title: newMember.role_title,
        pole: newMember.pole,
        photo_url: newMember.photo_url,
        sort_order: newMember.sort_order,
        created_at: newMember.created_at,
      };

      const { error: dbErr } = await admin.from("team_members").upsert([dbPayload]);
      if (dbErr) {
        console.error("[api/team POST Supabase error]", dbErr);
      }
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

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID manquant" }, { status: 400 });
    }

    // 1. Mise à jour mémoire locale
    const updated = updateTeamMember(id, updates);

    // 2. Mise à jour directe Supabase DB avec filtrage des colonnes SQL valides
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes("example.supabase.co") && isUUID(id)) {
      const admin = createAdminClient();
      const dbUpdates: Record<string, any> = {};
      if (updates.full_name !== undefined) dbUpdates.full_name = updates.full_name;
      if (updates.role_title !== undefined) dbUpdates.role_title = updates.role_title;
      if (updates.pole !== undefined) dbUpdates.pole = updates.pole;
      if (updates.photo_url !== undefined) dbUpdates.photo_url = updates.photo_url;
      if (updates.sort_order !== undefined) dbUpdates.sort_order = updates.sort_order;

      if (Object.keys(dbUpdates).length > 0) {
        const { error: dbErr } = await admin.from("team_members").update(dbUpdates).eq("id", id);
        if (dbErr) {
          console.error("[api/team PATCH Supabase error]", dbErr);
        }
      }
    }

    return NextResponse.json({ ok: true, data: updated || updates });
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

    // 1. Suppression mémoire locale
    const deleted = deleteTeamMember(id);

    // 2. Suppression définitive dans Supabase DB
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl && !supabaseUrl.includes("example.supabase.co") && isUUID(id)) {
      const admin = createAdminClient();
      const { error: dbErr } = await admin.from("team_members").delete().eq("id", id);
      if (dbErr) {
        console.error("[api/team DELETE Supabase error]", dbErr);
      }
    }

    return NextResponse.json({ ok: true, id, deleted: true });
  } catch (error) {
    console.error("[api/team DELETE]", error);
    return NextResponse.json({ ok: false, error: "Erreur suppression membre" }, { status: 500 });
  }
}
