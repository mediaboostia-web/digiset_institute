"use client";

import { useState } from "react";
import { RegistrationForm } from "@/components/forms/registration-form";
import { TrainingRequestForm } from "@/components/forms/training-request-form";
import { LabRequestForm } from "@/components/forms/lab-request-form";
import { GraduationCap, Briefcase, Building2 } from "lucide-react";

export function HomeFormsSection() {
  const [activeTab, setActiveTab] = useState<"student" | "company" | "lab">("student");

  return (
    <section className="py-12 sm:py-16 bg-slate-50 border-b border-border overflow-x-hidden w-full">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Header section */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
            Formulaires en Ligne
          </span>
          <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900">
            Déposez votre Demande en Ligne
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Sélectionnez votre profil ci-dessous pour accéder au formulaire dédié. Notre secrétariat traite chaque demande sous 24h.
          </p>
        </div>

        {/* Sélecteur d'onglets responsive à 3 choix distincts */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2 sm:gap-3 max-w-3xl mx-auto w-full">
          <button
            onClick={() => setActiveTab("student")}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer w-full sm:w-auto ${
              activeTab === "student"
                ? "bg-brand-orange text-white shadow-md sm:scale-105"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <GraduationCap className="h-4 w-4 shrink-0" />
            <span>1. Candidature Étudiant</span>
          </button>

          <button
            onClick={() => setActiveTab("company")}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer w-full sm:w-auto ${
              activeTab === "company"
                ? "bg-brand-orange text-white shadow-md sm:scale-105"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Briefcase className="h-4 w-4 shrink-0" />
            <span>2. Demande Devis Entreprise</span>
          </button>

          <button
            onClick={() => setActiveTab("lab")}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer w-full sm:w-auto ${
              activeTab === "lab"
                ? "bg-brand-orange text-white shadow-md sm:scale-105"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
            }`}
          >
            <Building2 className="h-4 w-4 shrink-0" />
            <span>3. Réservation TP Établissement</span>
          </button>
        </div>

        {/* Contenu du formulaire actif */}
        <div className="max-w-4xl mx-auto animate-in fade-in duration-200 w-full">
          {activeTab === "student" && <RegistrationForm />}
          {activeTab === "company" && <TrainingRequestForm />}
          {activeTab === "lab" && <LabRequestForm />}
        </div>

      </div>
    </section>
  );
}
