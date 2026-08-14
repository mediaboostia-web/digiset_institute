"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  type RegistrationInput,
  ATTACHMENT_FIELDS,
  MAX_ATTACHMENT_SIZE_BYTES,
  ALLOWED_ATTACHMENT_TYPES,
} from "@/lib/validations/registration";
import { Loader2, CheckCircle2, AlertCircle, Send, Upload, FileCheck, ChevronDown, X } from "lucide-react";
import { SubmissionSuccessModal } from "./submission-success-modal";

type AttachmentField = (typeof ATTACHMENT_FIELDS)[number];

const ATTACHMENT_LABELS: Record<AttachmentField, string> = {
  bulletin: "Bulletin / Relevé de notes",
  diplome: "Diplôme obtenu (Bac, BTS, DUT...)",
  cv: "CV",
  photo: "Photo d'identité",
};

const EMPTY_ATTACHMENTS: Record<AttachmentField, File[]> = {
  bulletin: [],
  diplome: [],
  cv: [],
  photo: [],
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} o`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} Mo`;
}

export function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [attachments, setAttachments] = useState<Record<AttachmentField, File[]>>(EMPTY_ATTACHMENTS);
  const [attachmentErrors, setAttachmentErrors] = useState<Record<AttachmentField, string | null>>({
    bulletin: null,
    diplome: null,
    cv: null,
    photo: null,
  });
  const [lastSubmitted, setLastSubmitted] = useState<{ email: string; phone: string } | null>(null);

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

  const handleFilesSelected = (field: AttachmentField, fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const accepted: File[] = [];
    let rejectionMessage: string | null = null;

    for (const file of Array.from(fileList)) {
      if (file.size > MAX_ATTACHMENT_SIZE_BYTES) {
        rejectionMessage = `"${file.name}" dépasse 5 Mo et a été ignoré.`;
        continue;
      }
      if (!ALLOWED_ATTACHMENT_TYPES.includes(file.type)) {
        rejectionMessage = `"${file.name}" n'est pas un PDF/PNG/JPG et a été ignoré.`;
        continue;
      }
      accepted.push(file);
    }

    setAttachments((prev) => ({ ...prev, [field]: [...prev[field], ...accepted] }));
    setAttachmentErrors((prev) => ({ ...prev, [field]: rejectionMessage }));
  };

  const removeFile = (field: AttachmentField, index: number) => {
    setAttachments((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const onSubmit = async (data: RegistrationInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const formData = new FormData();
      formData.append("fullName", data.fullName);
      formData.append("phone", data.phone);
      formData.append("email", data.email);
      formData.append("lastDiploma", data.lastDiploma);
      formData.append("desiredProgramId", data.desiredProgramId ?? "");
      formData.append("website", data.website ?? "");

      for (const field of ATTACHMENT_FIELDS) {
        for (const file of attachments[field]) {
          formData.append(field, file);
        }
      }

      const response = await fetch("/api/submissions/registration", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Une erreur est survenue lors de la soumission de la candidature.");
      }

      setLastSubmitted({ email: data.email, phone: data.phone });
      setSubmitSuccess(true);
      reset();
      setAttachments(EMPTY_ATTACHMENTS);
      setAttachmentErrors({ bulletin: null, diplome: null, cv: null, photo: null });
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
          Formulaire de Candidature Étudiant — Rentrée Octobre 2026
        </h2>
        <p className="text-xs text-slate-600 mt-1">
          Déposez votre dossier d&apos;inscription en ligne. Notre secrétariat académique étudiera votre profil sous 48h.
        </p>
      </div>

      {submitSuccess ? (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-6 text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-emerald-600 mx-auto" />
          <h3 className="font-heading text-lg font-bold text-emerald-900">
            Candidature enregistrée avec succès !
          </h3>
          <p className="text-sm text-emerald-800 max-w-md mx-auto">
            Merci pour votre confiance. Votre dossier a été transmis à la commission d&apos;admission de DigiSET Institute. Un accusé de réception a été envoyé sur votre email.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="inline-flex items-center gap-2 rounded-xl bg-emerald-700 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-800 transition-colors mt-2 cursor-pointer"
          >
            Soumettre une autre candidature
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {submitError && (
            <div className="flex items-center gap-2.5 rounded-xl bg-red-50 border border-red-200 p-4 text-xs font-medium text-red-800">
              <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
              <span>{submitError}</span>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Nom et Prénom Complet *
            </label>
            <input
              type="text"
              placeholder="Ex: Jean MBOUMBA"
              {...register("fullName")}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
            />
            {errors.fullName && (
              <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.fullName.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Adresse Email *
              </label>
              <input
                type="email"
                placeholder="jean.mboumba@gmail.com"
                {...register("email")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
              />
              {errors.email && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Numéro de Téléphone (WhatsApp de préférence) *
              </label>
              <input
                type="tel"
                placeholder="+241 07 00 00 00"
                {...register("phone")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
              />
              {errors.phone && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.phone.message}</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Dernier Diplôme Obtenu ou Préparé *
              </label>
              <input
                type="text"
                placeholder="Ex: Bac C, Bac D, Bac S, BTS Info, DUT..."
                {...register("lastDiploma")}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-medium text-slate-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all"
              />
              {errors.lastDiploma && (
                <span className="text-[11px] font-medium text-red-600 mt-1 block">{errors.lastDiploma.message}</span>
              )}
            </div>

            {/* Selecteur Pro Stylé avec Arrondis Légers */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Filière / Option Souhaitée *
              </label>
              <div className="relative">
                <select
                  {...register("desiredProgramId")}
                  className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-900 focus:border-brand-orange focus:ring-2 focus:ring-brand-orange/20 outline-none transition-all cursor-pointer pr-10 shadow-xs"
                >
                  <option value="" className="py-2 text-slate-500 font-medium">Sélectionnez la filière visée</option>
                  <option value="prepa-mp2i" className="py-2 font-medium">Classe Préparatoire MP2I (Bac+2)</option>
                  <option value="licence-ia" className="py-2 font-medium">Licence Pro — IA & Data Science (Bac+3)</option>
                  <option value="licence-cyber" className="py-2 font-medium">Licence Pro — Cybersécurité (Bac+3)</option>
                  <option value="licence-monetique" className="py-2 font-medium">Licence Pro — Systèmes de Paiement (Monétique)</option>
                  <option value="digiset-online" className="py-2 font-medium">DigiSET Online (Formation à distance)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-slate-500">
                  <ChevronDown className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Upload de pièces jointes — 4 catégories, multi-fichiers */}
          <div className="pt-2 space-y-4">
            <label className="block text-xs font-bold text-slate-700">
              Pièces Jointes (PDF, PNG ou JPG — 5 Mo max par fichier, plusieurs fichiers autorisés par catégorie)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {ATTACHMENT_FIELDS.map((field) => (
                <div key={field} className="space-y-2">
                  <span className="block text-[11px] font-bold text-slate-600">{ATTACHMENT_LABELS[field]}</span>

                  <div className="relative border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-brand-orange transition-colors bg-slate-50/50">
                    <input
                      type="file"
                      multiple
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={(e) => {
                        handleFilesSelected(field, e.target.files);
                        e.target.value = "";
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <Upload className="h-5 w-5 text-slate-400" />
                      <span className="text-[11px] font-semibold text-slate-700">
                        Cliquez ou glissez vos fichiers ici
                      </span>
                    </div>
                  </div>

                  {attachmentErrors[field] && (
                    <p className="text-[10px] font-medium text-red-600">{attachmentErrors[field]}</p>
                  )}

                  {attachments[field].length > 0 && (
                    <ul className="space-y-1">
                      {attachments[field].map((file, index) => (
                        <li
                          key={`${field}-${file.name}-${file.size}-${index}`}
                          className="flex items-center justify-between gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1.5"
                        >
                          <span className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-700 truncate">
                            <FileCheck className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{file.name}</span>
                            <span className="text-emerald-500 font-medium shrink-0">({formatFileSize(file.size)})</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(field, index)}
                            className="text-emerald-600 hover:text-red-600 transition-colors shrink-0 cursor-pointer"
                            aria-label={`Retirer ${file.name}`}
                          >
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-brand-orange-dark disabled:opacity-50 active:scale-98 transition-all cursor-pointer"
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

      <SubmissionSuccessModal
        isOpen={submitSuccess}
        onClose={() => setSubmitSuccess(false)}
        title="Votre Candidature a bien été Transmise !"
        userEmail={lastSubmitted?.email}
        userPhone={lastSubmitted?.phone}
      />
    </div>
  );
}
