"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, type RegistrationInput } from "@/lib/validations/registration";
import { Loader2, CheckCircle2, AlertCircle, Send, Upload, FileCheck } from "lucide-react";

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      lastDiploma: "",
      desiredProgramId: "",
    },
  });

  const onSubmit = async (data: RegistrationInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/submissions/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue lors de la soumission de la candidature.");
      }

      setSubmitSuccess(true);
      reset();
      setSelectedFileName(null);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="font-heading text-xl font-extrabold text-slate-900">
          Formulaire de Candidature Étudiant — Rentrée Septembre 2026
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Déposez votre dossier d&apos;inscription en ligne. Notre secrétariat académique étudiera votre profil sous 48h.
        </p>
      </div>

      {submitSuccess ? (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
          <h3 className="font-heading text-lg font-bold text-emerald-900">
            Candidature enregistrée avec succès !
          </h3>
          <p className="text-sm text-emerald-800 max-w-md mx-auto">
            Merci pour votre confiance. Votre dossier a été transmis à la commission d&apos;admission de Digi-SET Institute. Un accusé de réception a été envoyé sur votre email.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition-colors mt-2 cursor-pointer"
          >
            Soumettre une autre candidature
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {submitError && (
            <div className="flex items-center gap-2.5 rounded-lg bg-red-50 border border-red-200 p-4 text-xs font-medium text-red-800">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nom et Prénom Complet *
            </label>
            <input
              type="text"
              placeholder="Ex: Jean MBOUMBA"
              {...register("fullName")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
            />
            {errors.fullName && (
              <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.fullName.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Adresse Email *
              </label>
              <input
                type="email"
                placeholder="jean.mboumba@gmail.com"
                {...register("email")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
              />
              {errors.email && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Numéro de Téléphone (WhatsApp de préférence) *
              </label>
              <input
                type="tel"
                placeholder="+241 07 00 00 00"
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
                Dernier Diplôme Obtenu ou Préparé *
              </label>
              <input
                type="text"
                placeholder="Ex: Bac C, Bac D, Bac S, BTS Info, DUT..."
                {...register("lastDiploma")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
              />
              {errors.lastDiploma && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.lastDiploma.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Filière / Option Souhaitée *
              </label>
              <select
                {...register("desiredProgramId")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-1 focus:ring-brand-orange outline-none"
              >
                <option value="">Sélectionnez la filière visée</option>
                <option value="prepa-mp2i">Classe Préparatoire MP2I (Bac+2)</option>
                <option value="licence-ia">Licence Pro — IA & Data Science (Bac+3)</option>
                <option value="licence-cyber">Licence Pro — Cybersécurité (Bac+3)</option>
                <option value="licence-monetique">Licence Pro — Systèmes de Paiement (Monétique)</option>
                <option value="digiset-online">DigiSET Online (Formation à distance)</option>
              </select>
            </div>
          </div>

          {/* Upload de pièces jointes (Bulletins / Diplômes) */}
          <div className="pt-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pièce Jointe (Relevé de notes, Bac ou Bulletin - PDF/PNG/JPG)
            </label>
            <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-brand-orange transition-colors bg-slate-50/50">
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setSelectedFileName(e.target.files[0].name);
                  }
                }}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center space-y-1">
                {selectedFileName ? (
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-600">
                    <FileCheck className="h-5 w-5" />
                    <span>Fichier sélectionné : {selectedFileName}</span>
                  </div>
                ) : (
                  <>
                    <Upload className="h-6 w-6 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-700">
                      Glissez votre fichier ici ou cliquez pour parcourir
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Taille maximale : 5 Mo (PDF, PNG ou JPG)
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-orange-dark disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Transmission du dossier en cours...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Soumettre ma Candidature Étudiant
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
