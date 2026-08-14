import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { FlaskConical, Briefcase, Building2, ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";
import { mergeContentValues } from "@/lib/content-defaults";
import { getContentBlocks } from "@/lib/content-blocks";

export default async function ServicesPage() {
  const blocks = await getContentBlocks("services");
  const content = mergeContentValues("services", blocks);

  return (
    <div>
      <HeroSection
        badge={content.hero_badge}
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        breadcrumbs={[{ label: "Services" }]}
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Service Phare 1 : Consulting & Conseil IT */}
            <div className="flex flex-col justify-between rounded-2xl border-2 border-brand-orange/40 bg-white p-8 shadow-md hover:border-brand-orange hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-brand-orange/10 text-brand-orange text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-brand-orange/20">
                Pôle Phare B2B
              </div>

              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center">
                  <Briefcase className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">Service Expertise 1</span>
                <h3 className="font-heading text-xl font-extrabold text-slate-900">
                  {content.card1_title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {content.card1_text}
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-orange shrink-0" />
                    <span>Audits de sécurité des SI & Pentesting</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-orange shrink-0" />
                    <span>Mise en conformité PCI-DSS & Monétique</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-orange shrink-0" />
                    <span>Stratégie d&apos;intégration IA & Big Data</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  href="/services/consulting-it"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3 text-xs font-bold text-white hover:bg-brand-orange-dark transition-all duration-300 shadow-sm"
                >
                  Découvrir le Consulting IT
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Service Phare 2 : Formations Inter et Intra-Entreprises */}
            <div className="flex flex-col justify-between rounded-2xl border-2 border-brand-blue/40 bg-white p-8 shadow-md hover:border-brand-blue hover:shadow-xl transition-all relative overflow-hidden">
              <div className="absolute top-3 right-3 bg-brand-blue/10 text-brand-blue text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border border-brand-blue/20">
                Pôle Phare B2B
              </div>

              <div className="space-y-4">
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center">
                  <Building2 className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">Service Expertise 2</span>
                <h3 className="font-heading text-xl font-extrabold text-slate-900">
                  {content.card2_title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {content.card2_text}
                </p>
                <div className="space-y-2 pt-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-blue shrink-0" />
                    <span>Sessions sur-mesure selon les besoins métier</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-blue shrink-0" />
                    <span>Certifications professionnelles (Cisco, AWS, Linux, Microsoft)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-brand-blue shrink-0" />
                    <span>Formateurs experts praticiens et certifiés</span>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100">
                <Link
                  href="/programmes/formation-continue"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-blue px-4 py-3 text-xs font-bold text-white hover:bg-brand-blue-dark transition-all duration-300 shadow-sm"
                >
                  Découvrir les Formations Inter & Intra
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

          </div>

          {/* Service complémentaire : Location de Laboratoires (Présentation discrète en 2nd plan) */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 text-xs font-bold text-slate-600 uppercase tracking-wider">
                <FlaskConical className="h-4 w-4 text-slate-500" />
                <span>Service Partenaire Établissements</span>
              </div>
              <h4 className="font-heading text-lg font-bold text-slate-900">
                {content.card3_title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {content.card3_text}
              </p>
            </div>
            <Link
              href="/services/location-laboratoires"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white hover:bg-slate-800 transition-all shrink-0"
            >
              Consulter les forfaits TP labos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
