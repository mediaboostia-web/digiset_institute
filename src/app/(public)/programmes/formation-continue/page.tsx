import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { Shield, BrainCircuit, CreditCard, Users, ArrowRight, Building, CheckCircle2 } from "lucide-react";

export default function FormationContinuePage() {
  return (
    <div>
      <HeroSection
        badge="Offre Entreprises & Administrations"
        title="Formations Continues Professionnelles"
        subtitle="Élevez la maturité numérique de vos cadres et équipes techniques grâce à nos 4 axes de formations intensives de 3 à 10 jours."
        breadcrumbs={[
          { label: "Programmes", href: "/programmes" },
          { label: "Formation Continue" },
        ]}
        primaryCtaText="Faire une demande de devis"
        primaryCtaHref="/programmes/formation-continue/demande"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Format & Modalités */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <Building className="h-8 w-8 text-brand-orange shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Formats</div>
                <div className="text-sm font-extrabold text-slate-900">Intra & Inter-Entreprises</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-brand-orange shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Durée des sessions</div>
                <div className="text-sm font-extrabold text-slate-900">3 à 10 Jours Intensifs</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-8 w-8 text-brand-blue shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Reconnaissance</div>
                <div className="text-sm font-extrabold text-slate-900">Attestation Digi-SET & Certifs</div>
              </div>
            </div>
          </div>

          {/* Les 4 Axes */}
          <div className="space-y-6">
            <div className="text-center max-w-xl mx-auto">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
                Thématiques d&apos;Expertise
              </span>
              <h2 className="font-heading text-2xl font-extrabold text-slate-900 mt-1">
                Les 4 Axes de Formation Continue
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Axe 1 */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs hover:shadow-md transition-all border-l-4 border-l-brand-blue">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-xs uppercase tracking-wider">
                  <Shield className="h-4 w-4" />
                  Axe 1
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Cybersécurité & Résilience Réseau
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Audit des systèmes d&apos;information, détection d&apos;intrusions, réponse aux incidents (SOC/CSIRT), conformité ISO 27001 et sensibilisation au phishing.
                </p>
              </div>

              {/* Axe 2 */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs hover:shadow-md transition-all border-l-4 border-l-indigo-600">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-wider">
                  <BrainCircuit className="h-4 w-4" />
                  Axe 2
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  IA, Data Science & Business Intelligence
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Traitement de données massives, modélisation prédictive, tableaux de bord de pilotage (Power BI / Python) et intégration de l&apos;IA générative.
                </p>
              </div>

              {/* Axe 3 */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs hover:shadow-md transition-all border-l-4 border-l-brand-orange">
                <div className="flex items-center gap-2 text-brand-orange font-bold text-xs uppercase tracking-wider">
                  <CreditCard className="h-4 w-4" />
                  Axe 3
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Systèmes de Paiements Électroniques
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Technologies monétiques, norme de sécurité bancaire PCI-DSS, interopérabilité Mobile Money et sécurisation des API de paiement.
                </p>
              </div>

              {/* Axe 4 */}
              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs hover:shadow-md transition-all border-l-4 border-l-emerald-600">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                  <Building className="h-4 w-4" />
                  Axe 4
                </div>
                <h3 className="font-heading text-lg font-bold text-slate-900">
                  Management & Stratégie du Numérique
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pilotage de la transformation digitale des administrations et entreprises, gouvernance des SI (ITIL, COBIT) et souveraineté des données.
                </p>
              </div>

            </div>
          </div>

          {/* CTA Formulaire */}
          <div className="rounded-2xl bg-brand-blue-dark text-white p-8 text-center space-y-4">
            <h3 className="font-heading text-xl font-bold">Besoin d&apos;une formation sur-mesure pour votre entreprise ?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
              Nos experts conçoivent des modules adaptés à vos contraintes de calendrier et à vos objectifs métiers.
            </p>
            <div className="pt-2">
              <Link
                href="/programmes/formation-continue/demande"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-brand-orange-dark transition-colors"
              >
                Accéder au formulaire de demande
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
