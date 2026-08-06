import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { CreditCard, CheckCircle2, ArrowRight, FileText } from "lucide-react";

export default function LicenceSystemesPaiementPage() {
  return (
    <div>
      <HeroSection
        badge="Licence Professionnelle • Option 3"
        title="Systèmes de Paiement Électronique"
        subtitle="Formez-vous aux technologies monétiques, à la conformité PCI-DSS, aux switches bancaires et aux architectures de Mobile Money."
        breadcrumbs={[
          { label: "Programmes", href: "/programmes" },
          { label: "Licence Pro", href: "/programmes/licence-professionnelle" },
          { label: "Systèmes de Paiement" },
        ]}
        primaryCtaText="S'inscrire à cette option"
        primaryCtaHref="/inscription/candidature?program=licence-systemes-paiement"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Fiche synthétique */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-heading text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-brand-orange" />
              Fiche Synthétique — Option Systèmes de Paiement Électronique
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Sigle Option</span>
                <span className="font-extrabold text-slate-900 text-sm">LP-PAY</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Durée & Crédits</span>
                <span className="font-extrabold text-slate-900 text-sm">1 An — 60 ECTS</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Niveau d&apos;Admission</span>
                <span className="font-extrabold text-slate-900 text-sm">Bac+2 Info / Monétique</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Normes Maîtrisées</span>
                <span className="font-extrabold text-slate-900 text-sm">PCI-DSS / EMV / ISO 8583</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6">
              <h3 className="font-heading text-xl font-bold text-slate-900">
                Objectif de la Formation
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Unique en Afrique centrale, cette option répond à la forte demande des banques, des établissements de paiement et des opérateurs de Mobile Money. Les diplômés maîtrisent le fonctionnement des terminaux de paiement (POS/TPE), des switches bancaires, du chiffrement des cartes (EMV) et des protocoles de paiement en ligne.
              </p>

              <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
                Compétences visées en sortie
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>Architecture des cartes à puce (EMV) et protocoles de communication ISO 8583.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>Sécurisation des transactions financières et conformité aux standards PCI-DSS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>Développement et intégration d&apos;API de paiement Mobile Money (Airtel Money, Moov Money).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                  <span>Administration des serveurs monétiques et switches bancaires.</span>
                </li>
              </ul>

              <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
                Débouchés Métiers
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="rounded-full bg-orange-50 border border-orange-200 px-3 py-1 text-xs font-bold text-brand-orange-dark">
                  Ingénieur Monétique Junior
                </span>
                <span className="rounded-full bg-orange-50 border border-orange-200 px-3 py-1 text-xs font-bold text-brand-orange-dark">
                  Chef de Projet Mobile Money / FinTech
                </span>
                <span className="rounded-full bg-orange-50 border border-orange-200 px-3 py-1 text-xs font-bold text-brand-orange-dark">
                  Auditeur Sécurité PCI-DSS Junior
                </span>
                <span className="rounded-full bg-orange-50 border border-orange-200 px-3 py-1 text-xs font-bold text-brand-orange-dark">
                  Administrateur Switch Bancaire
                </span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                <div className="flex items-center gap-2 text-brand-orange font-bold text-sm">
                  <FileText className="h-5 w-5" />
                  <span>Modalités d&apos;admission</span>
                </div>
                <p className="text-xs text-slate-600">
                  Admission sur dossier et entretien.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li>• Bac+2 info, finance numérique ou gestion</li>
                  <li>• Relevés de notes universitaires</li>
                  <li>• CV & Lettre de motivation</li>
                </ul>

                <div className="pt-4">
                  <Link
                    href="/inscription/candidature?program=licence-systemes-paiement"
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
