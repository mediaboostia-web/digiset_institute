import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { FlaskConical, Briefcase, ArrowRight } from "lucide-react";

export default function ServicesPage() {
  return (
    <div>
      <HeroSection
        badge="Offre B2B & Partenariats"
        title="Nos Services aux Entreprises & Établissements"
        subtitle="Découvrez nos deux services phares : la location de nos laboratoires de travaux pratiques pour les lycées et le conseil IT spécialisé."
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Service 1 : Location de Labos */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:border-brand-blue hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
                  <FlaskConical className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Service B2B 1</span>
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  Location de Laboratoires de TP
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Mise à disposition de nos plateaux techniques de physique, d&apos;optique, d&apos;électronique et d&apos;informatique pour les classes préparatoires et lycées de Libreville et du Gabon.
                </p>
                <div className="pt-2 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-lg">
                  Grille tarifaire : Forfait 5 TP (500 000 FCFA) & Forfait 10 TP (800 000 FCFA)
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  href="/services/location-laboratoires"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-blue px-4 py-3 text-xs font-bold text-white hover:bg-brand-blue-dark transition-colors"
                >
                  Découvrir les forfaits labos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Service 2 : Consulting IT */}
            <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-8 shadow-sm hover:border-brand-orange hover:shadow-md transition-all">
              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center">
                  <Briefcase className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Service B2B 2</span>
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  Consulting & Conseil IT
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Accompagnement stratégique et opérationnel des entreprises et institutions publiques dans leurs projets de transformation numérique, d&apos;audit cyber et de monétique.
                </p>
                <div className="pt-2 text-xs font-semibold text-slate-700 bg-slate-100 p-3 rounded-lg">
                  Audits de sécurité, conformité PCI-DSS & stratégie d&apos;IA
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  href="/services/consulting-it"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-3 text-xs font-bold text-white hover:bg-brand-orange-dark transition-colors"
                >
                  Découvrir le service Consulting IT
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
    </div>
  );
}
