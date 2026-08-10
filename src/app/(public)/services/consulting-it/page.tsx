import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { Briefcase, ArrowRight, ShieldCheck, Cpu, CreditCard } from "lucide-react";

export default function ConsultingItPage() {
  return (
    <div>
      <HeroSection
        badge="Conseil & Stratégie Numérique"
        title="Consulting IT & Accompagnement Métier"
        subtitle="Mettez l'expertise de nos enseignants-chercheurs et ingénieurs au service de la transformation digitale et de la sécurisation de votre organisation."
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Consulting IT" },
        ]}
        primaryCtaText="Contacter le pôle Consulting"
        primaryCtaHref="/contact?subject=consulting-it"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900">
              Une Expertise de Niveau International au Service du Gabon
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Le pôle Consulting IT de DigiSET Institute accompagne les banques, les opérateurs télécoms, les PME et les institutions publiques dans leurs projets informatiques critiques.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <ShieldCheck className="h-8 w-8 text-brand-blue" />
              <h3 className="font-heading text-base font-bold text-slate-900">Audits de Cybersécurité</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tests d&apos;intrusion (Pentest), audits d&apos;architecture réseau et mise en conformité ISO 27001.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <CreditCard className="h-8 w-8 text-brand-orange" />
              <h3 className="font-heading text-base font-bold text-slate-900">Expertise Monétique & PCI-DSS</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Accompagnement à l&apos;homologation bancaire, audit des transactions et sécurisation des API Mobile Money.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <Cpu className="h-8 w-8 text-indigo-600" />
              <h3 className="font-heading text-base font-bold text-slate-900">Stratégie & Intégration IA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Étude de faisabilité, développement de solutions d&apos;IA sur-mesure et gouvernance de la donnée.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-brand-blue-dark text-white p-8 text-center space-y-4">
            <h3 className="font-heading text-xl font-bold">Échangez avec nos experts du pôle Consulting</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Exposez-nous vos enjeux techniques et obtenez une proposition d&apos;intervention adaptée.
            </p>
            <div className="pt-2">
              <Link
                href="/contact?subject=consulting-it"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-brand-orange-dark transition-colors"
              >
                Prendre contact pour une mission de conseil
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
