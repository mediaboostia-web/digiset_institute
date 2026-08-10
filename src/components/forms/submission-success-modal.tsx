"use client";

import { CheckCircle2, MessageSquare, Mail, Clock, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubmissionSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  userEmail?: string;
  userPhone?: string;
}

export function SubmissionSuccessModal({
  isOpen,
  onClose,
  title = "Votre demande a été transmise avec succès !",
  userEmail,
  userPhone,
}: SubmissionSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-100 space-y-6">
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 rounded-full p-1 transition-colors"
          title="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* En-tête avec Icône */}
        <div className="text-center space-y-3">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <h3 className="font-heading text-xl font-extrabold text-slate-900">
            {title}
          </h3>

          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-blue/10 px-3 py-1 text-xs font-bold text-brand-blue">
            <Clock className="h-3.5 w-3.5" />
            <span>Traitement sous 72h maximum</span>
          </div>
        </div>

        {/* Encadré d'Avertissement Email & WhatsApp */}
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-4 space-y-3 text-xs text-emerald-950">
          <p className="font-semibold leading-relaxed">
            Merci pour votre confiance. Votre dossier a été transmis aux équipes de <strong>DigiSET Institute</strong>.
          </p>

          <div className="space-y-2 pt-1 border-t border-emerald-200/60">
            <div className="flex items-start gap-2.5">
              <Mail className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Email :</strong> Un accusé de réception a été envoyé à{" "}
                <span className="font-bold underline">{userEmail || "votre adresse email"}</span>.
              </span>
            </div>

            <div className="flex items-start gap-2.5">
              <MessageSquare className="h-4 w-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>WhatsApp :</strong> Un conseiller académique vous contactera par message au{" "}
                <span className="font-bold">{userPhone || "numéro WhatsApp fourni"}</span>.
              </span>
            </div>
          </div>
        </div>

        {/* Action */}
        <div className="text-center pt-2">
          <Button
            onClick={onClose}
            className="w-full bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs py-3 rounded-xl shadow-md cursor-pointer"
          >
            Fermer et retourner au site
          </Button>
        </div>
      </div>
    </div>
  );
}
