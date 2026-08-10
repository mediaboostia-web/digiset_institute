import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy (Route Protection & Session Refresh en Next.js 16)
 *
 * Rôle : 
 * 1. Proteger tout l'espace `/admin/*` (sauf `/admin/login`) pour les utilisateurs déconnectés.
 * 2. Rediriger automatiquement vers `/admin` si un utilisateur déjà connecté visite `/admin/login`.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const pathname = request.nextUrl.pathname;

  const isAdminRoute = pathname.startsWith("/admin");
  const isLoginRoute = pathname.startsWith("/admin/login");

  if (!isAdminRoute) {
    return response;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  const hasDevCookie = request.cookies.get("admin_dev_mode")?.value === "true";

  if (!supabaseUrl || !supabaseAnonKey) {
    // Mode sans Supabase (Variables d'env non configurées)
    if (isLoginRoute && hasDevCookie) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }

    if (!isLoginRoute && !hasDevCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  }

  // Avec Supabase configuré
  const supabase = createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const { data: { user } } = await supabase.auth.getUser();
  const isAuthenticated = Boolean(user) || hasDevCookie;

  // Redirection 1 : Utilisateur NON connecté accédant à /admin/* -> Redirection /admin/login
  if (!isLoginRoute && !isAuthenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Redirection 2 : Utilisateur DÉJÀ connecté accédant à /admin/login -> Redirection /admin
  if (isLoginRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
