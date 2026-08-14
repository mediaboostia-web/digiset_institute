import { NextResponse, type NextRequest } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdmin } from "@/lib/admin-auth";

const UUID_FOLDER_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\//i;

function isValidAttachmentPath(path: string): boolean {
  // Défense en profondeur contre la traversée de chemin : le fichier doit se
  // trouver directement dans le dossier UUID généré à la soumission (cf.
  // submissionFolder dans api/submissions/registration/route.ts).
  if (path.includes("..") || path.startsWith("/")) return false;
  return UUID_FOLDER_PATTERN.test(path);
}

/**
 * GET /api/admin/submissions/attachment-url?path=<uuid>/<field>-<index>-<filename>
 * Génère une URL signée (5 min) vers un fichier privé du bucket `candidate-documents`,
 * dont la policy de lecture n'autorise que le client service-role (cf. migration 0002).
 */
export async function GET(request: NextRequest) {
  const { response: authError } = await requireAdmin();
  if (authError) return authError;

  const path = request.nextUrl.searchParams.get("path");

  if (!path || !isValidAttachmentPath(path)) {
    return NextResponse.json({ ok: false, error: "Chemin de fichier invalide." }, { status: 400 });
  }

  try {
    const admin = createAdminClient();
    const { data, error } = await admin.storage
      .from("candidate-documents")
      // `download: true` force un Content-Disposition: attachment — sans ça,
      // Supabase sert les images en "inline" et le navigateur les affiche au
      // lieu de les télécharger (contrairement aux PDF, souvent interceptés
      // par le lecteur PDF du navigateur qui masque le problème).
      .createSignedUrl(path, 300, { download: true });

    if (error || !data) {
      throw error || new Error("URL signée introuvable.");
    }

    return NextResponse.json({ ok: true, url: data.signedUrl });
  } catch (error) {
    console.error("[api/admin/submissions/attachment-url]", error);
    return NextResponse.json({ ok: false, error: "Impossible de générer le lien de téléchargement." }, { status: 500 });
  }
}
