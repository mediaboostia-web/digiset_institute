import { HeroSection } from "@/components/shared/hero-section";

export default function PolitiqueConfidentialitePage() {
  return (
    <div>
      <HeroSection
        badge="Données Personnelles"
        title="Politique de Confidentialité"
        subtitle="Protection des données personnelles et droits des utilisateurs."
        breadcrumbs={[{ label: "Politique de Confidentialité" }]}
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-heading text-lg font-bold text-slate-900">1. Collecte des Données Personnelles</h2>
          <p>
            Digi-SET Institute s&apos;engage à protéger la vie privée de ses utilisateurs. Les données personnelles collectées via nos formulaires en ligne (nom, prénom, email, téléphone, diplômes) sont strictement réservées au traitement de vos candidatures et demandes d&apos;information.
          </p>

          <h2 className="font-heading text-lg font-bold text-slate-900 pt-4">2. Destinataires et Conservation</h2>
          <p>
            Les données ne sont jamais vendues ni cédées à des tiers. Elles sont uniquement destinées aux services de la scolarité et de l&apos;administration de l&apos;institut.
          </p>

          <h2 className="font-heading text-lg font-bold text-slate-900 pt-4">3. Droit d&apos;Accès et de Rectification</h2>
          <p>
            Conformément à la réglementation sur la protection des données personnelles, vous disposez d&apos;un droit d&apos;accès, de modification et de suppression de vos données en contactant notre secrétariat à : <strong>contact@digiset-gabon.com</strong>.
          </p>
        </div>
      </section>
    </div>
  );
}
