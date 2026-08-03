import { z } from "zod";

/**
 * Formulaire Inscription — formation initiale (PRD §3.15 / §6 US-02).
 * Les pièces jointes (bulletin, diplôme, CV, photo) sont validées
 * séparément dans la route (fichiers issus de `FormData`, pas de JSON).
 */
export const registrationSchema = z.object({
  fullName: z.string().trim().min(2, "Le nom complet est requis."),
  phone: z.string().trim().min(6, "Le numéro de téléphone est requis."),
  email: z.email("Adresse email invalide."),
  lastDiploma: z.string().trim().min(1, "Le dernier diplôme obtenu est requis."),
  desiredProgramId: z.uuid().optional().or(z.literal("")),
  // Honeypot anti-spam : doit rester vide (cf. CONFIGURATION.md §Sécurité).
  website: z.string().max(0).optional().or(z.literal("")),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const MAX_ATTACHMENT_SIZE_BYTES = 5 * 1024 * 1024; // 5 Mo par fichier
export const ALLOWED_ATTACHMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];
export const ATTACHMENT_FIELDS = ["bulletin", "diplome", "cv", "photo"] as const;
