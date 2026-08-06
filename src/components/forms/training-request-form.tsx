"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trainingRequestSchema, type TrainingRequestInput } from "@/lib/validations/training-request";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

export function TrainingRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(trainingRequestSchema),
    defaultValues: {
      companyName: "",
      contactName: "",
      phone: "",
      email: "",
      domain: "cybersecurite" as const,
      participantsCount: 5,
      desiredDates: "",
      message: "",
    },
  });

  const onSubmit = async (data: TrainingRequestInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/submissions/training-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue lors de la demande.");
      }

      setSubmitSuccess(true);
      reset();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl border border-border bg-white p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-bold text-slate-900">
          Demande de Formation Continue / Pro
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Formulaire dédié aux entreprises, administrations et professionnels souhaitant monter en compétences.
        </p>
      </div>

      {submitSuccess ? (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
          <h3 className="font-heading text-lg font-bold text-emerald-900">
            Demande transmise avec succès !
          </h3>
          <p className="text-sm text-emerald-800 max-w-md mx-auto">
            Notre responsable des formations continues traitera votre besoin et vous recontactera sous 24h ouvrées.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition-colors mt-2 cursor-pointer"
          >
            Faire une autre demande
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit((data) => onSubmit(data as TrainingRequestInput))} className="space-y-4">
          {submitError && (
            <div className="flex items-center gap-2.5 rounded-lg bg-red-50 border border-red-200 p-4 text-xs font-medium text-red-800">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nom de l&apos;Entreprise / Organisme *
              </label>
              <input
                type="text"
                placeholder="Ex: SEEG, BGFI Bank, ANINF..."
                {...register("companyName")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
              />
              {errors.companyName && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.companyName.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nom et Prénom du Contact *
              </label>
              <input
                type="text"
                placeholder="Ex: Marc ONDO"
                {...register("contactName")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
              />
              {errors.contactName && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.contactName.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Adresse Email Professionnelle *
              </label>
              <input
                type="email"
                placeholder="m.ondo@entreprise.ga"
                {...register("email")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
              />
              {errors.email && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Téléphone Direct *
              </label>
              <input
                type="tel"
                placeholder="+241 01 00 00 00"
                {...register("phone")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
              />
              {errors.phone && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.phone.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Axe ou Domaine Visé *
              </label>
              <select
                {...register("domain")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
              >
                <option value="cybersecurite">Cybersécurité & Résilience</option>
                <option value="ia_data_science">IA & Data Science</option>
                <option value="systemes_paiement">Systèmes de Paiement Électronique</option>
                <option value="management_strategie">Management & Stratégie du Numérique</option>
              </select>
              {errors.domain && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.domain.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nombre de Participants Estimé
              </label>
              <input
                type="number"
                min={1}
                max={100}
                {...register("participantsCount", { valueAsNumber: true })}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Dates souhaitées ou contraintes particulières
            </label>
            <input
              type="text"
              placeholder="Ex: Courant Octobre 2026, format 5 jours en présentiel..."
              {...register("desiredDates")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Description précise de votre besoin
            </label>
            <textarea
              rows={3}
              placeholder="Précisez les objectifs attendus, le profil des apprenants, ou s'il s'agit d'une formation sur-mesure..."
              {...register("message")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none resize-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-orange-dark disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Transmissions de la demande...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Envoyer ma demande de formation
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
