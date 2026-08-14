import "server-only";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export type AdminRole = "super_admin" | "editor";

export interface AuthenticatedAdmin {
  id: string;
  email: string;
  role: AdminRole;
}

function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  return !!url && !url.includes("example.supabase.co");
}

/**
 * Résout l'admin actuellement connecté à partir des cookies de la requête
 * courante. Retourne `null` si aucune session valide, ou si la session ne
 * correspond à aucune ligne `admin_users` (ex : compte Supabase Auth créé
 * mais jamais promu admin).
 *
 * Repli mode sans Supabase : même logique que `src/proxy.ts` — le cookie
 * `admin_dev_mode=true` fait foi, avec un rôle super_admin fictif, pour ne
 * pas bloquer les tests locaux sans projet Supabase configuré.
 */
export async function getAuthenticatedAdmin(): Promise<AuthenticatedAdmin | null> {
  const cookieStore = await cookies();

  if (!isSupabaseConfigured()) {
    const hasDevCookie = cookieStore.get("admin_dev_mode")?.value === "true";
    if (!hasDevCookie) return null;
    return { id: "dev-mode", email: "dev@localhost", role: "super_admin" };
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // Lecture seule ici : les routes API ne rafraîchissent pas la session.
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const admin = createAdminClient();
  const { data } = await admin
    .from("admin_users")
    .select("role")
    .eq("id", user.id)
    .single();

  if (!data) return null;

  return { id: user.id, email: user.email ?? "", role: data.role as AdminRole };
}

/**
 * Garde-fou pour les routes API `/api/admin/**` : n'importe quel compte
 * admin authentifié (super_admin ou editor). Retourne soit l'admin résolu,
 * soit une réponse 401 prête à `return`-er directement depuis le handler.
 */
export async function requireAdmin(): Promise<
  { admin: AuthenticatedAdmin; response: null } | { admin: null; response: NextResponse }
> {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return {
      admin: null,
      response: NextResponse.json({ ok: false, error: "Authentification requise" }, { status: 401 }),
    };
  }
  return { admin, response: null };
}

/**
 * Garde-fou strict réservé aux actions super_admin (ex : édition du CMS
 * multi-pages, gestion des comptes admin).
 */
export async function requireSuperAdmin(): Promise<
  { admin: AuthenticatedAdmin; response: null } | { admin: null; response: NextResponse }
> {
  const admin = await getAuthenticatedAdmin();
  if (!admin) {
    return {
      admin: null,
      response: NextResponse.json({ ok: false, error: "Authentification requise" }, { status: 401 }),
    };
  }
  if (admin.role !== "super_admin") {
    return {
      admin: null,
      response: NextResponse.json({ ok: false, error: "Réservé aux super-administrateurs" }, { status: 403 }),
    };
  }
  return { admin, response: null };
}
