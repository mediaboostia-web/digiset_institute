import { z } from "zod";

/** Formulaire Demande formation continue (PRD §3.15 / §6 US-03). */
export const TRAINING_DOMAINS = [
  "cybersecurite",
  "ia_data_science",
  "systemes_paiement",
  "management_strategie",
] as const;

export const trainingRequestSchema = z.object({
  companyName: z.string().trim().min(2, "Le nom de la société est requis."),
  contactName: z.string().trim().min(2, "Le nom du contact est requis."),
  phone: z.string().trim().min(6, "Le numéro de téléphone est requis."),
  email: z.email("Adresse email invalide."),
  domain: z.enum(TRAINING_DOMAINS, "Sélectionnez un domaine."),
  participantsCount: z.coerce.number().int().positive().optional(),
  desiredDates: z.string().trim().optional(),
  message: z.string().trim().max(2000).optional(),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type TrainingRequestInput = z.infer<typeof trainingRequestSchema>;
