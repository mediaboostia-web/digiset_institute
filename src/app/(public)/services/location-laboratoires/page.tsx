import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { LabPricingTable } from "@/components/shared/lab-pricing-table";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";

export default function LocationLaboratoiresPage() {
  return (
    <div>
      <HeroSection
        badge="Offre Partenariat Établissements"
        title="Location de Laboratoires de TP Scientifiques"
        subtitle="Mettez à disposition de vos élèves de classe préparatoire des équipements de travaux pratiques modernes de physique, optique, électricité et mécanique."
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Location de Laboratoires" },
        ]}
        primaryCtaText="Réserver un forfait TP"
        primaryCtaHref="/services/location-laboratoires/demande"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900">
              Des Plateaux Techniques de Référence à Libreville
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              Pour permettre à l&apos;ensemble des établissements scolaires de dispenser des travaux pratiques conformes aux exigences des concours préparatoires internationaux, Digi-SET Institute ouvre ses laboratoires équipés aux lycées et écoles partenaires.
            </p>
          </div>

          {/* Grille Tarifaire Officielle */}
          <div className="space-y-6">
            <h3 className="font-heading text-xl font-extrabold text-slate-900">
              Grille Tarifaire des Forfaits TP
            </h3>
            <LabPricingTable />
          </div>

          {/* Catalogue des Manipulations */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
            <div className="flex items-center gap-2 font-heading text-base font-bold text-slate-900">
              <ShieldCheck className="h-5 w-5 text-brand-blue" />
              <span>Domaines de Manipulations Disponibles (+30 TP)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs text-slate-700">
              <div className="space-y-1.5 p-3 bg-white rounded-lg border border-slate-200">
                <strong className="block text-brand-blue font-bold">Physique Générale & Optique</strong>
                <div>• Goniométrie & prisme</div>
                <div>• Interféromètre de Michelson</div>
                <div>• Lentilles & systèmes optiques</div>
              </div>
              <div className="space-y-1.5 p-3 bg-white rounded-lg border border-slate-200">
                <strong className="block text-brand-blue font-bold">Électrocinétique & Électronique</strong>
                <div>• Filtres actifs & passifs</div>
                <div>• Oscilloscopes & générateurs</div>
                <div>• Montages à Amplificateurs (ALI)</div>
              </div>
              <div className="space-y-1.5 p-3 bg-white rounded-lg border border-slate-200">
                <strong className="block text-brand-blue font-bold">Mécanique & Thermodynamique</strong>
                <div>• Pendules & oscillations</div>
                <div>• Mesure de viscosité</div>
                <div>• Échanges thermiques & calorimétrie</div>
              </div>
              <div className="space-y-1.5 p-3 bg-white rounded-lg border border-slate-200">
                <strong className="block text-brand-blue font-bold">Informatique & Réseaux</strong>
                <div>• TP Linux & Administration</div>
                <div>• Maquettes réseaux Cisco</div>
                <div>• Salles informatiques sécurisées</div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-brand-blue-dark text-white p-8 text-center space-y-4">
            <h3 className="font-heading text-xl font-bold">Formuler une demande de convention d&apos;occupation</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Transmettez-nous l&apos;effectif de vos élèves et vos contraintes de calendrier.
            </p>
            <div className="pt-2">
              <Link
                href="/services/location-laboratoires/demande"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-brand-orange-dark transition-colors"
              >
                Remplir la demande de réservation TP
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
