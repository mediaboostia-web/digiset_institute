import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { BrainCircuit, CheckCircle2, ArrowRight, FileText } from "lucide-react";

export default function LicenceIaDataSciencePage() {
  return (
    <div>
      <HeroSection
        badge="Licence Professionnelle • Option 1"
        title="Intelligence Artificielle & Data Science"
        subtitle="Devenez un spécialiste du développement de modèles d'IA, de l'apprentissage automatique et du traitement intelligent des données massives."
        breadcrumbs={[
          { label: "Programmes", href: "/programmes" },
          { label: "Licence Pro", href: "/programmes/licence-professionnelle" },
          { label: "IA & Data Science" },
        ]}
        primaryCtaText="S'inscrire à cette option"
        primaryCtaHref="/inscription/candidature?program=licence-ia-data"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Fiche descriptive tableau */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-heading text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-indigo-600" />
              Fiche Synthétique — Option IA & Data Science
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Sigle Option</span>
                <span className="font-extrabold text-slate-900 text-sm">LP-IADS</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Durée & Crédits</span>
                <span className="font-extrabold text-slate-900 text-sm">1 An — 60 ECTS</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Niveau d&apos;Admission</span>
                <span className="font-extrabold text-slate-900 text-sm">Bac+2 Scientifique / Info</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Stage en Entreprise</span>
                <span className="font-extrabold text-slate-900 text-sm">12 Semaines Obligatoires</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6">
              <h3 className="font-heading text-xl font-bold text-slate-900">
                Objectif de la Formation
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                L&apos;option Intelligence Artificielle & Data Science prépare des professionnels capables de concevoir, d&apos;entraîner et de déployer des modèles décisionnels et prédictifs au sein des entreprises et administrations. Les apprenants apprennent à manipuler des jeux de données complexes et à utiliser les bibliothèques d&apos;IA de référence (TensorFlow, PyTorch, Scikit-learn).
              </p>

              <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
                Compétences visées en sortie
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Maîtrise du langage Python pour la Data Science et le Machine Learning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Conception et entraînement de réseaux de neurones (Deep Learning).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Création de tableaux de bord décisionnels et Business Intelligence.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
                  <span>Déploiement et intégration des modèles en production (MLOps).</span>
                </li>
              </ul>

              <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
                Débouchés Métiers
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-900">
                  Développeur IA Junior
                </span>
                <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-900">
                  Data Scientist Junior
                </span>
                <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-900">
                  Data Analyst / BI Specialist
                </span>
                <span className="rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-bold text-indigo-900">
                  Ingénieur MLOps Junior
                </span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  <FileText className="h-5 w-5" />
                  <span>Modalités d&apos;admission</span>
                </div>
                <p className="text-xs text-slate-600">
                  Admission sur étude de dossier et entretien de motivation.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li>• Bac+2 validé (Prépa, BTS, DUT, L2)</li>
                  <li>• Copie diplôme / attestation de réussite</li>
                  <li>• Relevés de notes des 2 dernières années</li>
                  <li>• CV & Lettre de motivation</li>
                </ul>

                <div className="pt-4">
                  <Link
                    href="/inscription/candidature?program=licence-ia-data"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-3 text-xs font-bold text-white hover:bg-brand-orange-dark transition-colors"
                  >
                    Postuler à cette option
                    <ArrowRight className="h-4 w-4" />
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
