import { NextResponse } from "next/server";
import type { z } from "zod";

/**
 * Honeypot anti-spam (PRD §5 "Protection anti-spam") : un champ caché nommé
 * `website` que seuls les bots remplissent. S'il contient une valeur, on
 * répond succès sans rien enregistrer (ne pas informer le bot de l'échec).
 */
export function isHoneypotTriggered(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function honeypotOkResponse() {
  return NextResponse.json({ ok: true });
}

/** Formate les erreurs Zod en `{ field: message }` exploitable côté formulaire. */
export function zodErrorResponse(error: z.ZodError) {
  const fieldErrors: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path.join(".") || "_root";
    if (!fieldErrors[key]) fieldErrors[key] = issue.message;
  }
  return NextResponse.json({ ok: false, errors: fieldErrors }, { status: 400 });
}

export function serverErrorResponse(message = "Une erreur est survenue. Merci de réessayer.") {
  return NextResponse.json({ ok: false, errors: { _root: message } }, { status: 500 });
}
