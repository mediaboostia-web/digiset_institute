import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Proxy (anciennement "middleware", renommé en Next.js 16 — cf.
 * node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/proxy.md).
 *
 * Rôle : rafraîchir la session SupaAuth à chaque requête et protéger tout
 * l'espace `/admin/*` (sauf `/admin/login`) en redirigeant vers la page de
 * connexion si aucune session valide n'est présente.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    // Pas encore configuré (cf. CONFIGURATION.md) : on laisse passer les
    // pages publiques plutôt que de faire planter tout le site, mais
    // /admin reste bloqué puisqu'aucune session ne peut être vérifiée.
    console.warn(
      "[proxy] NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY manquants — voir CONFIGURATION.md.",
    );
    if (request.nextUrl.pathname.startsWith("/admin/login") === false && request.nextUrl.pathname.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    return response;
  }

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

  // IMPORTANT : getUser() revalide le token auprès du serveur Supabase Auth
  // (contrairement à getSession(), qui ne fait que lire le cookie local) —
  // c'est la vérification requise pour protéger une route côté proxy.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginRoute = request.nextUrl.pathname.startsWith("/admin/login");

  if (isAdminRoute && !isLoginRoute && !user) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * S'applique à toutes les routes sauf les fichiers statiques et
     * l'optimisation d'images, pour que la session soit rafraîchie
     * partout — la redirection ne s'active que sur /admin/* (voir logique
     * ci-dessus).
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
