"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/validations/contact";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      subject: "Information générale",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue lors de l'envoi de votre message.");
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
          Envoyer un message à l&apos;Institut
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          Une question sur nos formations, nos tarifs ou l&apos;accès au campus ? Laissez-nous un message.
        </p>
      </div>

      {submitSuccess ? (
        <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
          <h3 className="font-heading text-lg font-bold text-emerald-900">
            Message envoyé avec succès !
          </h3>
          <p className="text-sm text-emerald-800 max-w-md mx-auto">
            Merci pour votre prise de contact. Notre secrétariat académique vous répondra par email dans les meilleurs délais.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-700 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-800 transition-colors mt-2 cursor-pointer"
          >
            Envoyer un autre message
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

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Nom complet *
              </label>
              <input
                type="text"
                placeholder="Ex: Jean MBOUMBA"
                {...register("name")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
              />
              {errors.name && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.name.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Adresse Email *
              </label>
              <input
                type="email"
                placeholder="votre.email@exemple.ga"
                {...register("email")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
              />
              {errors.email && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.email.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                placeholder="+241 07 00 00 00"
                {...register("phone")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Objet de la demande *
              </label>
              <input
                type="text"
                placeholder="Ex: Renseignements Inscription"
                {...register("subject")}
                className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
              />
              {errors.subject && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.subject.message}</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Votre Message *
            </label>
            <textarea
              rows={4}
              placeholder="Rédigez votre message ici..."
              {...register("message")}
              className="w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate-900 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none resize-none"
            />
            {errors.message && (
              <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.message.message}</span>
            )}
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-blue-dark disabled:opacity-50 transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Envoi du message...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Envoyer le message
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
