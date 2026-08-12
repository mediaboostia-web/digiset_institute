import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export interface AdminUserAccount {
  id: string;
  email: string;
  full_name: string;
  role: "super_admin" | "editor" | "admin";
  created_at: string;
  last_sign_in_at?: string;
  is_active: boolean;
}

// Fallback / Initial default superadmin account
const DEFAULT_SUPERADMIN: AdminUserAccount = {
  id: "admin-dir-001",
  email: "contact@digiset-gabon.com",
  full_name: "Dr ABAGA ABESSOLO Michel Audrey",
  role: "super_admin",
  created_at: "2026-08-01T00:00:00.000Z",
  is_active: true,
};

/**
 * GET /api/admin/users
 * Récupère tous les utilisateurs administrateurs depuis Supabase Auth + admin_users
 */
export async function GET() {
  try {
    const admin = createAdminClient();

    // 1. Essayer de récupérer les utilisateurs depuis Supabase Auth
    const { data: authData, error: authError } = await admin.auth.admin.listUsers();
    
    // 2. Récupérer les rôles depuis la table admin_users
    const { data: dbUsers } = await admin.from("admin_users").select("*");
    const roleMap = new Map((dbUsers || []).map((u) => [u.id, u.role]));
    const nameMap = new Map((dbUsers || []).map((u) => [u.id, u.full_name]));

    let usersList: AdminUserAccount[] = [];

    if (!authError && authData && authData.users.length > 0) {
      usersList = authData.users.map((u) => ({
        id: u.id,
        email: u.email || "",
        full_name: nameMap.get(u.id) || (u.user_metadata?.full_name as string) || u.email?.split("@")[0] || "Administrateur",
        role: (roleMap.get(u.id) as "super_admin" | "editor" | "admin") || "super_admin",
        created_at: u.created_at,
        last_sign_in_at: u.last_sign_in_at || undefined,
        is_active: true,
      }));
    }

    // Toujours s'assurer que le compte Direction principale figure dans la liste
    if (!usersList.some((u) => u.email.toLowerCase() === DEFAULT_SUPERADMIN.email.toLowerCase())) {
      usersList.unshift(DEFAULT_SUPERADMIN);
    }

    return NextResponse.json({ ok: true, data: usersList });
  } catch (error) {
    console.error("[api/admin/users GET]", error);
    // En cas de repli, renvoyer au moins le compte par défaut
    return NextResponse.json({ ok: true, data: [DEFAULT_SUPERADMIN] });
  }
}

/**
 * POST /api/admin/users
 * Création d'un nouvel utilisateur administrateur (par le Super Admin)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, full_name, role } = body;

    if (!email || !password || !full_name) {
      return NextResponse.json({ ok: false, error: "Email, mot de passe et nom complet requis." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ ok: false, error: "Le mot de passe doit contenir au moins 6 caractères." }, { status: 400 });
    }

    const admin = createAdminClient();

    // 1. Créer le compte utilisateur dans Supabase Auth
    const { data: authUser, error: authError } = await admin.auth.admin.createUser({
      email: email.trim(),
      password,
      email_confirm: true,
      user_metadata: { full_name },
    });

    if (authError) {
      return NextResponse.json({ ok: false, error: authError.message }, { status: 400 });
    }

    const userId = authUser.user.id;
    const assignedRole = role === "super_admin" ? "super_admin" : "editor";

    // 2. Insérer le profil dans la table admin_users
    const { error: dbError } = await admin.from("admin_users").upsert({
      id: userId,
      full_name,
      role: assignedRole,
    });

    if (dbError) {
      console.warn("Notice: insertion admin_users table warning:", dbError.message);
    }

    return NextResponse.json({
      ok: true,
      data: {
        id: userId,
        email: authUser.user.email,
        full_name,
        role: assignedRole,
        created_at: authUser.user.created_at,
        is_active: true,
      },
    });
  } catch (error: unknown) {
    console.error("[api/admin/users POST]", error);
    const msg = error instanceof Error ? error.message : "Erreur serveur lors de la création d'utilisateur.";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

/**
 * DELETE /api/admin/users?id=...
 * Suppression d'un compte administrateur
 */
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID de l'utilisateur manquant." }, { status: 400 });
    }

    const admin = createAdminClient();

    // 1. Supprimer de la table admin_users
    await admin.from("admin_users").delete().eq("id", id);

    // 2. Supprimer de Supabase Auth
    const { error: authErr } = await admin.auth.admin.deleteUser(id);
    if (authErr) {
      console.warn("Notice: deleteUser auth error:", authErr.message);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("[api/admin/users DELETE]", error);
    return NextResponse.json({ ok: false, error: "Erreur lors de la suppression." }, { status: 500 });
  }
}
