import { z } from "zod";

/** Formulaire Contact générique (PRD §3.16). */
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Le nom est requis."),
  email: z.email("Adresse email invalide."),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(2, "Le sujet est requis."),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caractères.").max(3000),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
