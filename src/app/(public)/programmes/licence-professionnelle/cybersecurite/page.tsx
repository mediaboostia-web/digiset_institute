import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { ShieldAlert, CheckCircle2, ArrowRight, FileText } from "lucide-react";

export default function LicenceCybersecuritePage() {
  return (
    <div>
      <HeroSection
        badge="Licence Professionnelle • Option 2"
        title="Cybersécurité"
        subtitle="Devenez un expert de la protection des systèmes d'information, du pentest, de la réponse aux incidents et de la gestion de SOC."
        breadcrumbs={[
          { label: "Programmes", href: "/programmes" },
          { label: "Licence Pro", href: "/programmes/licence-professionnelle" },
          { label: "Cybersécurité" },
        ]}
        primaryCtaText="S'inscrire à cette option"
        primaryCtaHref="/inscription/candidature?program=licence-cybersecurite"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Fiche synthétique */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h2 className="font-heading text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-brand-blue" />
              Fiche Synthétique — Option Cybersécurité
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-500 font-medium block">Sigle Option</span>
                <span className="font-extrabold text-slate-900 text-sm">LP-CYBER</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Durée & Crédits</span>
                <span className="font-extrabold text-slate-900 text-sm">1 An — 60 ECTS</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Niveau d&apos;Admission</span>
                <span className="font-extrabold text-slate-900 text-sm">Bac+2 Réseaux / Info</span>
              </div>
              <div>
                <span className="text-slate-500 font-medium block">Certifications Clés</span>
                <span className="font-extrabold text-slate-900 text-sm">CompTIA Security+ / Cisco</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-8 space-y-6">
              <h3 className="font-heading text-xl font-bold text-slate-900">
                Objectif de la Formation
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                Face à la multiplication des cyberattaques en Afrique et dans le monde, l&apos;option Cybersécurité forme des spécialistes opérationnels capables de sécuriser un réseau informatique, de réaliser des tests d&apos;intrusion éthiques (Pentest), d&apos;analyser les vulnérabilités et de gérer les incidents au sein d&apos;un Security Operations Center (SOC).
              </p>

              <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
                Compétences visées en sortie
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                  <span>Audit et détection des vulnérabilités d&apos;un réseau (Nmap, Wireshark, Burp Suite).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                  <span>Mise en place et administration de pare-feu (Firewall), VPN et sondes IDS/IPS.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                  <span>Analyse de logs de sécurité et surveillance d&apos;incidents dans un environnement SOC.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-brand-blue shrink-0 mt-0.5" />
                  <span>Préparation aux examens de certification CompTIA Security+ et Cisco CyberOps.</span>
                </li>
              </ul>

              <h3 className="font-heading text-xl font-bold text-slate-900 pt-4">
                Débouchés Métiers
              </h3>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-brand-blue-dark">
                  Analyste SOC Junior
                </span>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-brand-blue-dark">
                  Pentester / Auditeur de sécurité
                </span>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-brand-blue-dark">
                  Administrateur Sécurité Réseaux
                </span>
                <span className="rounded-full bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-bold text-brand-blue-dark">
                  Consultant Cybersécurité Junior
                </span>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                  <FileText className="h-5 w-5" />
                  <span>Modalités d&apos;admission</span>
                </div>
                <p className="text-xs text-slate-600">
                  Admission sur dossier et entretien.
                </p>
                <ul className="space-y-2 text-xs text-slate-700">
                  <li>• Bac+2 réseaux, télécoms ou info</li>
                  <li>• Relevés de notes universitaires</li>
                  <li>• CV & Lettre de motivation</li>
                </ul>

                <div className="pt-4">
                  <Link
                    href="/inscription/candidature?program=licence-cybersecurite"
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
