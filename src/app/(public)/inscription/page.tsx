import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { CheckCircle2, FileText, Calendar, GraduationCap, ArrowRight, Download } from "lucide-react";

export default function InscriptionHubPage() {
  return (
    <div>
      <HeroSection
        badge="Scolarité & Admission 2026-2027"
        title="Rejoignez DigiSET Institute"
        subtitle="Découvrez la procédure de candidature, les critères d'admissibilité et préparez votre dossier pour la rentrée de Septembre 2026."
        breadcrumbs={[{ label: "Inscription" }]}
        primaryCtaText="Remplir le formulaire en ligne"
        primaryCtaHref="/inscription/candidature"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Les 4 étapes d'admission */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900 text-center">
              Les 4 Étapes de la Procédure d&apos;Admission
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 border-t-4 border-t-brand-blue">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Étape 1</span>
                <h3 className="font-heading text-base font-bold text-slate-900">Soumission du dossier</h3>
                <p className="text-xs text-slate-600">Remplissez le formulaire en ligne avec vos notes et votre lettre de motivation.</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 border-t-4 border-t-brand-blue">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Étape 2</span>
                <h3 className="font-heading text-base font-bold text-slate-900">Étude du dossier</h3>
                <p className="text-xs text-slate-600">La commission pédagogique évalue votre éligibilité sous 48 heures ouvrées.</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 border-t-4 border-t-brand-orange">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Étape 3</span>
                <h3 className="font-heading text-base font-bold text-slate-900">Entretien individuel</h3>
                <p className="text-xs text-slate-600">Entretien de motivation sur campus ou par visioconférence pour valider votre projet.</p>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 border-t-4 border-t-emerald-600">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Étape 4</span>
                <h3 className="font-heading text-base font-bold text-slate-900">Inscription définitive</h3>
                <p className="text-xs text-slate-600">Réception de la lettre d&apos;admission et finalisation du dossier administratif.</p>
              </div>
            </div>
          </div>

          {/* Documents & Pièces requises */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h2 className="font-heading text-2xl font-extrabold text-slate-900">
                Pièces Justificatives à Préparer
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Afin de garantir un traitement rapide de votre demande, assurez-vous d&apos;avoir numérisé les pièces suivantes avant de débuter votre candidature.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0" />
                  <span>Lettre de motivation argumentée exposant votre projet professionnel</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0" />
                  <span>Attestation légalisée du diplôme du Baccalauréat (ou relevé de notes officiel)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0" />
                  <span>Bulletins de notes des années de Première, Terminale ou cursus Bac+2</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0" />
                  <span>Copie légalisée de la pièce d&apos;identité ou de l&apos;acte de naissance</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0" />
                  <span>2 photos d&apos;identité récentes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0" />
                  <span>Curriculum Vitae à jour (obligatoire pour les candidatures en Licence Pro)</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-brand-blue-dark text-white p-8 space-y-4">
                <h3 className="font-heading text-xl font-bold">Prêt à poser votre candidature ?</h3>
                <p className="text-xs text-slate-300">
                  Remplissez directement notre formulaire en ligne sécurisé en moins de 5 minutes.
                </p>
                <div className="pt-2">
                  <Link
                    href="/inscription/candidature"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-5 py-3.5 text-xs font-bold text-white hover:bg-brand-orange-dark transition-colors"
                  >
                    Accéder au formulaire de candidature
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
