import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { Award, GraduationCap, Clock, ArrowRight, BrainCircuit, ShieldAlert, CreditCard } from "lucide-react";

export const metadata: Metadata = {
  title: "Licence Professionnelle (Bac+3 - 60 ECTS) — 3 Options",
  description:
    "Licence Professionnelle en Technologies du Numérique à Digi-SET Institute (Akanda, Gabon). 3 options d'avenir : IA & Data Science, Cybersécurité, Systèmes de Paiement Électronique (Monétique).",
  openGraph: {
    title: "Licence Professionnelle du Numérique (Bac+3) | Digi-SET Institute",
    description:
      "Formation opérationnelle de 1 an avec 12 semaines de stage en entreprise et certifications professionnelles intégrées.",
  },
};

export default function LicenceProfessionnellePage() {
  return (
    <div>
      <HeroSection
        badge="Diplôme d'État Bac+3 • 60 ECTS"
        title="Licence Professionnelle en Technologies du Numérique"
        subtitle="Une année de haute spécialisation pratique destinée à former des cadres techniques opérationnels au Gabon et en Afrique Centrale."
        breadcrumbs={[
          { label: "Programmes", href: "/programmes" },
          { label: "Licence Professionnelle" },
        ]}
        primaryCtaText="Choisir une option"
        primaryCtaHref="#options"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Synthèse Commune */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-brand-blue shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Durée du Cursus</div>
                <div className="text-sm font-extrabold text-slate-900">1 An (2 Semestres)</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-brand-blue shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Crédits Diplôme</div>
                <div className="text-sm font-extrabold text-slate-900">60 ECTS Valides</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-brand-orange shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Conditions d&apos;accès</div>
                <div className="text-sm font-extrabold text-slate-900">Bac+2 Validé (Prépa, BTS, DUT)</div>
              </div>
            </div>
          </div>

          {/* Présentation */}
          <div className="max-w-3xl space-y-4">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900">
              Un Diplôme Aligné sur le Marché de l&apos;Emploi
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              La Licence Professionnelle de Digi-SET Institute s&apos;adresse aux étudiants titulaires d&apos;un Bac+2 scientifique ou technologique (Classe Préparatoire MP2I, BTS Informatique, DUT, L2 Sciences). Elle garantit une insertion professionnelle rapide grâce à un enseignement axé sur la pratique et un stage obligatoire de 12 semaines en entreprise.
            </p>
          </div>

          {/* Présentation des 3 Options */}
          <div id="options" className="space-y-6 pt-4">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Spécialisations
              </span>
              <h2 className="font-heading text-2xl font-extrabold text-slate-900 mt-1">
                Choisissez votre Option de Licence Pro
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Option 1 : IA & Data Science */}
              <div className="flex flex-col justify-between rounded-xl bg-white p-6 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                    <BrainCircuit className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Option 1</span>
                  <h3 className="font-heading text-lg font-bold text-slate-900 mt-1">
                    IA & Data Science
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Développez des modèles d&apos;apprentissage automatique, de vision par ordinateur et traitez les grands volumes de données décisionnelles.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <div>• Développeur / Ingénieur IA Junior</div>
                    <div>• Data Analyst / Data Scientist</div>
                    <div>• Ingénieur MLOps</div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/programmes/licence-professionnelle/ia-data-science"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-indigo-700 transition-colors"
                  >
                    Fiche d&apos;option IA & Data
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Option 2 : Cybersécurité */}
              <div className="flex flex-col justify-between rounded-xl bg-white p-6 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-4">
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Option 2</span>
                  <h3 className="font-heading text-lg font-bold text-slate-900 mt-1">
                    Cybersécurité
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Protégez les réseaux informatiques, effectuez des audits de sécurité (Pentest) et gérez la réponse aux incidents au sein d&apos;un SOC.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <div>• Analyste SOC & Sécurité Réseau</div>
                    <div>• Auditeur de vulnérabilités (Pentester)</div>
                    <div>• Consultant Cybersécurité</div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/programmes/licence-professionnelle/cybersecurite"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-blue-dark transition-colors"
                  >
                    Fiche d&apos;option Cybersécurité
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Option 3 : Systèmes de Paiement */}
              <div className="flex flex-col justify-between rounded-xl bg-white p-6 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-4">
                    <CreditCard className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Option 3</span>
                  <h3 className="font-heading text-lg font-bold text-slate-900 mt-1">
                    Systèmes de Paiement
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    Devenez expert des flux monétiques, des switches bancaires, du Mobile Money et des normes internationales PCI-DSS.
                  </p>
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-700">
                    <div>• Ingénieur Monétique & Switch</div>
                    <div>• Chef de projet Mobile Money / FinTech</div>
                    <div>• Auditeur Conformité PCI-DSS</div>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Link
                    href="/programmes/licence-professionnelle/systemes-paiement"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-orange-dark transition-colors"
                  >
                    Fiche d&apos;option Monétique
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
