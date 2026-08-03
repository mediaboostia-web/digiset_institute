import { z } from "zod";

/** Formulaire Demande location de laboratoire de TP (PRD §3.15 / §6 US-04). */
export const labRequestSchema = z.object({
  institutionName: z.string().trim().min(2, "Le nom de l'établissement est requis."),
  contactName: z.string().trim().min(2, "Le nom du contact est requis."),
  phone: z.string().trim().min(6, "Le numéro de téléphone est requis."),
  email: z.email("Adresse email invalide."),
  labType: z.enum(["physique", "informatique"], "Sélectionnez un type de laboratoire."),
  desiredSlots: z.string().trim().optional(),
  headcount: z.coerce.number().int().positive().max(20, "20 étudiants maximum par session.").optional(),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type LabRequestInput = z.infer<typeof labRequestSchema>;
