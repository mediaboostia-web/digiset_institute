"use client";

import { useState, useMemo, useEffect } from "react";
import { HeroSection } from "@/components/shared/hero-section";
import { FilterBar } from "@/components/shared/filter-bar";
import { ProgramCard, type ProgramCardProps } from "@/components/shared/program-card";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";
import { mergeContentValues } from "@/lib/content-defaults";
import type { ContentBlock } from "@/app/api/content-blocks/route";

const ALL_PROGRAMS: (ProgramCardProps & { publicKey: string; domainKey: string; formatKey: string })[] = [
  {
    title: "Classe Préparatoire MP2I",
    category: "Initiale",
    description: "Cycle préparatoire scientifique (Maths, Physique, Informatique & Ingénierie) ouvrant l'accès aux grandes écoles et licences spécialisées.",
    duration: "2 ans (4 semestres)",
    ects: "120",
    targetPublic: "Bacheliers scientifiques (Bac C, D, S, E)",
    highlights: ["Tronc commun scientifique d'excellence", "Pratique intensive en laboratoire", "Accès direct Licence Pro DigiSET"],
    href: "/programmes/classe-preparatoire",
    publicKey: "étudiant",
    domainKey: "ia-data",
    formatKey: "présentiel",
  },
  {
    title: "Licence Pro — IA & Data Science",
    category: "Licence Pro",
    description: "Spécialisation dans le développement de modèles d'IA, apprentissage automatique (Machine Learning) et traitement de données massives.",
    duration: "1 an (Bac+3)",
    ects: "60",
    targetPublic: "Bac+2 scientifique ou informatique (Prépa, BTS, DUT)",
    highlights: ["Algorithmique avancée & Python", "Deep Learning & Computer Vision", "Projet tutoré d'IA industrielle"],
    href: "/programmes/licence-professionnelle/ia-data-science",
    publicKey: "étudiant",
    domainKey: "ia-data",
    formatKey: "présentiel",
  },
  {
    title: "Licence Pro — Cybersécurité",
    category: "Licence Pro",
    description: "Formation d'experts en protection des infrastructures, tests d'intrusion (Pentest), audit et réponse aux incidents de sécurité.",
    duration: "1 an (Bac+3)",
    ects: "60",
    targetPublic: "Bac+2 réseaux, télécoms ou informatique",
    highlights: ["Pentesting & Sécurité Systèmes", "SOC & Analyse de logs", "Certifications CompTIA & Cisco"],
    href: "/programmes/licence-professionnelle/cybersecurite",
    publicKey: "étudiant",
    domainKey: "cybersecurite",
    formatKey: "présentiel",
  },
  {
    title: "Licence Pro — Systèmes de Paiement Électronique",
    category: "Licence Pro",
    description: "Cursus hautement spécialisé en technologies monétiques, sécurité des paiements, norme PCI-DSS et architectures Mobile Money.",
    duration: "1 an (Bac+3)",
    ects: "60",
    targetPublic: "Bac+2 informatique, monétique ou finance numérique",
    highlights: ["Architecture Monétique & PCI-DSS", "Switch bancaire & Mobile Money", "Paiements électroniques sécurisés"],
    href: "/programmes/licence-professionnelle/systemes-paiement",
    publicKey: "étudiant",
    domainKey: "paiement",
    formatKey: "présentiel",
  },
  {
    title: "Formations Inter & Intra — Cybersécurité",
    category: "Continue",
    description: "Modules sur-mesure inter et intra-entreprises d'audit, de pentest et de gestion de crise cyber pour professionnels IT.",
    duration: "3 à 10 jours",
    targetPublic: "Administrateurs réseaux, DSI, RSSI",
    highlights: ["Mise en situation réelle (Red/Blue Team)", "Norme ISO 27001", "Certificat de réussite DigiSET"],
    href: "/programmes/formation-continue",
    publicKey: "professionnel",
    domainKey: "cybersecurite",
    formatKey: "présentiel",
  },
  {
    title: "Formations Inter & Intra — IA & Data Science",
    category: "Continue",
    description: "Maîtrisez la data et l'IA générative en sessions inter ou intra-entreprises pour booster les processus métier de votre entreprise.",
    duration: "3 à 10 jours",
    targetPublic: "Analystes de données, chefs de projet, développeurs",
    highlights: ["Python pour la Data", "Tableaux de bord BI", "IA générative appliquée"],
    href: "/programmes/formation-continue",
    publicKey: "professionnel",
    domainKey: "ia-data",
    formatKey: "présentiel",
  },
  {
    title: "Formations Inter & Intra — Systèmes de Paiement",
    category: "Continue",
    description: "Perfectionnement sur-mesure aux normes monétiques et à la conformité PCI-DSS pour les cadres du secteur bancaire.",
    duration: "3 à 5 jours",
    targetPublic: "Chefs de projet monétique, auditeurs bancaires",
    highlights: ["Conformité PCI-DSS v4.0", "Sécurisation des terminaux POS/EMV", "Interopérabilité mobile money"],
    href: "/programmes/formation-continue",
    publicKey: "professionnel",
    domainKey: "paiement",
    formatKey: "présentiel",
  },
  {
    title: "Formations Inter & Intra — Management & Stratégie",
    category: "Continue",
    description: "Gouvernance de la transformation numérique et pilotage des systèmes d'information en format inter et intra-entreprises pour décideurs.",
    duration: "3 à 5 jours",
    targetPublic: "Directeurs d'administration, DSI, dirigeants",
    highlights: ["Gouvernance ITIL & COBIT", "Pilotage du changement numérique", "Stratégie de souveraineté des données"],
    href: "/programmes/formation-continue",
    publicKey: "professionnel",
    domainKey: "management",
    formatKey: "présentiel",
  },
  {
    title: "Certifications Professionnelles Internationales",
    category: "Certification",
    description: "Préparation intensive et passages d'examens mondiaux Cisco (CCNA), Microsoft Azure, AWS Academy et CompTIA Security+.",
    duration: "Variable selon certification",
    targetPublic: "Professionnels & Étudiants en fin de cycle",
    highlights: ["Centre d'examen agréé", "Supports officiels des éditeurs", "Taux de réussite élevé"],
    href: "/programmes/certifications",
    publicKey: "professionnel",
    domainKey: "cybersecurite",
    formatKey: "présentiel",
  },
  {
    title: "DigiSET Online — Formations à Distance",
    category: "Online",
    description: "Accédez à nos cursus depuis chez vous avec un suivi pédagogique rigoureux et des cours interactifs.",
    duration: "Flexibilité totale",
    targetPublic: "Professionnels en emploi & étudiants régionaux",
    highlights: ["Plateforme d'apprentissage dédiée", "Tutorat individuel hebdomadaire", "Diplômes et certificats identiques"],
    href: "/programmes/digiset-online",
    publicKey: "étudiant",
    domainKey: "ia-data",
    formatKey: "online",
  },
];

export default function ProgrammesPage() {
  const [selectedPublic, setSelectedPublic] = useState("all");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedFormat, setSelectedFormat] = useState("all");
  const [content, setContent] = useState<Record<string, string>>(() => mergeContentValues("programmes", []));

  useEffect(() => {
    fetch("/api/content-blocks?page_key=programmes")
      .then((res) => res.json())
      .then((json) => {
        const blocks: ContentBlock[] = json.ok && Array.isArray(json.data) ? json.data : [];
        setContent(mergeContentValues("programmes", blocks));
      })
      .catch(() => {
        // Repli silencieux sur les valeurs par défaut déjà en state.
      });
  }, []);

  const filteredPrograms = useMemo(() => {
    return ALL_PROGRAMS.filter((p) => {
      if (selectedPublic !== "all" && p.publicKey !== selectedPublic) return false;
      if (selectedDomain !== "all" && p.domainKey !== selectedDomain) return false;
      if (selectedFormat !== "all" && p.formatKey !== selectedFormat) return false;
      return true;
    });
  }, [selectedPublic, selectedDomain, selectedFormat]);

  const handleReset = () => {
    setSelectedPublic("all");
    setSelectedDomain("all");
    setSelectedFormat("all");
  };

  return (
    <div>
      {/* Hero Section */}
      <HeroSection
        badge={content.hero_badge}
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        backgroundImageUrl={content.hero_image_url}
        breadcrumbs={[{ label: "Programmes" }]}
        primaryCtaText="Poser une candidature"
        primaryCtaHref="/inscription/candidature"
      />

      <section className="py-12 bg-slate-50 min-h-[600px]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Barre de filtres */}
          <FilterBar
            selectedPublic={selectedPublic}
            setSelectedPublic={setSelectedPublic}
            selectedDomain={selectedDomain}
            setSelectedDomain={setSelectedDomain}
            selectedFormat={selectedFormat}
            setSelectedFormat={setSelectedFormat}
            onReset={handleReset}
            totalResults={filteredPrograms.length}
          />

          {/* Grille des résultats */}
          {filteredPrograms.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPrograms.map((program, idx) => (
                <ProgramCard key={idx} {...program} />
              ))}
            </div>
          ) : (
            /* État vide */
            <div className="rounded-xl border border-slate-200 bg-white p-12 text-center max-w-xl mx-auto space-y-4">
              <HelpCircle className="h-12 w-12 text-brand-orange mx-auto" />
              <h3 className="font-heading text-lg font-bold text-slate-900">
                Aucun programme ne correspond à votre sélection
              </h3>
              <p className="text-xs text-muted-foreground">
                Essayez de modifier ou de réinitialiser vos critères de recherche pour afficher les offres de formation.
              </p>
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-blue-dark transition-colors cursor-pointer"
              >
                Réinitialiser tous les filtres
              </button>
            </div>
          )}

          {/* Bandeau d'aide au choix */}
          <div className="mt-16 rounded-2xl bg-brand-blue-dark text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="font-heading text-xl font-bold">
                {content.cta_banner_title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                {content.cta_banner_text}
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-brand-orange-dark shrink-0 transition-colors"
            >
              Prendre rendez-vous avec un conseiller
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
