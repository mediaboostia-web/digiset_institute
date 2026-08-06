"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { labRequestSchema, type LabRequestInput } from "@/lib/validations/lab-request";
import { Loader2, CheckCircle2, AlertCircle, Send, ChevronDown } from "lucide-react";

export function LabRequestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(labRequestSchema),
    defaultValues: {
      institutionName: "",
      contactName: "",
      phone: "",
      email: "",
      labType: "physique" as const,
      desiredSlots: "",
      headcount: 20,
    },
  });

  const onSubmit = async (data: LabRequestInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/submissions/lab-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue lors de la demande de réservation.");
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="font-heading text-lg sm:text-xl font-extrabold text-slate-900">
          Demande de Réservation de Laboratoires de TP
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Réservé aux lycées et établissements de classe préparatoire scientifique.
        </p>
      </div>

      {submitSuccess ? (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
          <h3 className="font-heading text-lg font-bold text-emerald-900">
            Demande de convention reçue !
          </h3>
          <p className="text-sm text-emerald-800 max-w-md mx-auto">
            Notre responsable des plateaux techniques examinera votre calendrier et vous contactera pour établir la convention de mise à disposition.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 transition-colors mt-2 cursor-pointer"
          >
            Faire une autre demande
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit((data) => onSubmit(data as LabRequestInput))} className="space-y-4">
          {submitError && (
            <div className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-medium text-red-800">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nom de l&apos;Établissement Scolaire *
              </label>
              <input
                type="text"
                placeholder="Ex: Lycée National Léon Mba"
                {...register("institutionName")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
              {errors.institutionName && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.institutionName.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Nom et Fonction du Responsable *
              </label>
              <input
                type="text"
                placeholder="Ex: Sylvie NGUEMA (Chef de travaux)"
                {...register("contactName")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
              {errors.contactName && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.contactName.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Adresse Email *
              </label>
              <input
                type="email"
                placeholder="sylvie.nguema@ecole.ga"
                {...register("email")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
              {errors.email && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Téléphone Direct *
              </label>
              <input
                type="tel"
                placeholder="+241 07 00 00 00"
                {...register("phone")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
              {errors.phone && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.phone.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Type de Laboratoire *
              </label>
              <div className="relative">
                <select
                  {...register("labType")}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-900 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all cursor-pointer pr-10 shadow-xs"
                >
                  <option value="physique" className="py-2 font-medium">Laboratoire de Physique & Optique</option>
                  <option value="informatique" className="py-2 font-medium">Laboratoire Informatique & Réseaux</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
              {errors.labType && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.labType.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Effectif par Session (Max 20)
              </label>
              <input
                type="number"
                min={1}
                max={20}
                {...register("headcount", { valueAsNumber: true })}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
              />
              {errors.headcount && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.headcount.message}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Créneaux ou Périodes Souhaitées
            </label>
            <input
              type="text"
              placeholder="Ex: Les mercredis après-midi du premier trimestre..."
              {...register("desiredSlots")}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-brand-blue-dark disabled:opacity-50 active:scale-98 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Transmission de la réservation...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Envoyer la demande de réservation TP
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
