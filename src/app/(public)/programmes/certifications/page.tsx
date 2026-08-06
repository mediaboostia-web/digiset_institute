import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { CertificationBanner } from "@/components/shared/certification-banner";
import { ArrowRight, ShieldCheck, Award, Server, Cloud, Cpu, Lock } from "lucide-react";

export default function CertificationsPage() {
  return (
    <div>
      <HeroSection
        badge="Accompagnement Certifiant International"
        title="Certifications Professionnelles"
        subtitle="Valorisez vos compétences sur le marché mondial grâce à nos programmes d'entraînement préparant aux examens officiels des leaders technologiques."
        breadcrumbs={[
          { label: "Programmes", href: "/programmes" },
          { label: "Certifications" },
        ]}
        primaryCtaText="S'inscrire à une session certifiante"
        primaryCtaHref="/programmes/formation-continue/demande"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <CertificationBanner />

          {/* Présentation par Domaine */}
          <div className="space-y-6">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900">
              Catalogue des Certifications Préparées
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              
              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
                <div className="h-10 w-10 rounded-lg bg-blue-50 text-brand-blue flex items-center justify-center">
                  <Lock className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900">Axe Cybersécurité</h3>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li>• <strong>CompTIA Security+</strong> : Socle mondial de sécurité</li>
                  <li>• <strong>Cisco CyberOps Associate</strong> : Analyse SOC</li>
                  <li>• <strong>ISC² CC</strong> : Certified in Cybersecurity</li>
                  <li>• <strong>ISO 27001 Lead Implementer</strong> : Normes & Audit</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
                <div className="h-10 w-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <Cpu className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900">Axe IA & Data</h3>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li>• <strong>Microsoft Azure AI Fundamentals</strong> (AI-900)</li>
                  <li>• <strong>AWS Certified Machine Learning</strong></li>
                  <li>• <strong>TensorFlow Developer Certificate</strong></li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
                <div className="h-10 w-10 rounded-lg bg-orange-50 text-brand-orange flex items-center justify-center">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900">Axe Paiements & Monétique</h3>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li>• <strong>PCI-DSS Certified Professional</strong></li>
                  <li>• <strong>EMVCo Architecture Foundations</strong></li>
                  <li>• <strong>ISO 8583 Messaging Standard</strong></li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Server className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900">Axe Réseaux & Linux</h3>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li>• <strong>Cisco CCNA 200-301</strong> : Réseaux IP</li>
                  <li>• <strong>Linux LPI (LPIC-1 / LPIC-2)</strong></li>
                  <li>• <strong>RedHat Certified System Admin (RHCSA)</strong></li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
                <div className="h-10 w-10 rounded-lg bg-sky-50 text-sky-700 flex items-center justify-center">
                  <Cloud className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900">Axe Cloud Transverse</h3>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li>• <strong>AWS Certified Cloud Practitioner</strong></li>
                  <li>• <strong>Microsoft Certified Azure Administrator</strong></li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
                <div className="h-10 w-10 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900">Axe Gouvernance & IT</h3>
                <ul className="text-xs text-slate-700 space-y-2">
                  <li>• <strong>ITIL v4 Foundation</strong></li>
                  <li>• <strong>COBIT 2019 Foundation</strong></li>
                </ul>
              </div>

            </div>
          </div>

          <div className="rounded-2xl bg-brand-blue-dark text-white p-8 text-center space-y-4">
            <h3 className="font-heading text-xl font-bold">Prêt à valider votre certification internationale ?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Inscrivez-vous à nos bootcamp de préparation ou réservez votre passage d&apos;examen.
            </p>
            <div className="pt-2">
              <Link
                href="/programmes/formation-continue/demande"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-brand-orange-dark transition-colors"
              >
                Faire une demande de session certifiante
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
