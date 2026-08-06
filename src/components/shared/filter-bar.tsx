"use client";

import { Filter, RotateCcw } from "lucide-react";

export interface FilterBarProps {
  selectedPublic: string;
  setSelectedPublic: (val: string) => void;
  selectedDomain: string;
  setSelectedDomain: (val: string) => void;
  selectedFormat: string;
  setSelectedFormat: (val: string) => void;
  onReset: () => void;
  totalResults: number;
}

export function FilterBar({
  selectedPublic,
  setSelectedPublic,
  selectedDomain,
  setSelectedDomain,
  selectedFormat,
  setSelectedFormat,
  onReset,
  totalResults,
}: FilterBarProps) {
  const PUBLICS = [
    { id: "all", label: "Tous les publics" },
    { id: "étudiant", label: "Bacheliers & Étudiants" },
    { id: "professionnel", label: "Professionnels & Entreprises" },
    { id: "établissement", label: "Établissements scolaires" },
  ];

  const DOMAINS = [
    { id: "all", label: "Tous les domaines" },
    { id: "ia-data", label: "IA & Data Science" },
    { id: "cybersecurite", label: "Cybersécurité" },
    { id: "paiement", label: "Systèmes de Paiement" },
    { id: "management", label: "Management & Stratégie" },
  ];

  const FORMATS = [
    { id: "all", label: "Tous formats" },
    { id: "présentiel", label: "Présentiel" },
    { id: "online", label: "À distance (DigiSET Online)" },
  ];

  const isFiltered = selectedPublic !== "all" || selectedDomain !== "all" || selectedFormat !== "all";

  return (
    <div className="rounded-xl border border-border bg-white p-5 shadow-xs mb-8">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 font-heading text-sm font-bold text-brand-blue-dark">
          <Filter className="h-4 w-4 text-brand-orange" />
          <span>Filtrer les programmes de formation ({totalResults})</span>
        </div>

        {isFiltered && (
          <button
            onClick={onReset}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-orange hover:text-brand-orange-dark transition-colors"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Réinitialiser les filtres
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
        {/* Filtre Public */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Public Cible
          </label>
          <select
            value={selectedPublic}
            onChange={(e) => setSelectedPublic(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
          >
            {PUBLICS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre Domaine */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Domaine d&apos;Expertise
          </label>
          <select
            value={selectedDomain}
            onChange={(e) => setSelectedDomain(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
          >
            {DOMAINS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Filtre Format */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5 uppercase tracking-wider">
            Format de cours
          </label>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-800 focus:border-brand-blue focus:ring-1 focus:ring-brand-blue outline-none"
          >
            {FORMATS.map((f) => (
              <option key={f.id} value={f.id}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
