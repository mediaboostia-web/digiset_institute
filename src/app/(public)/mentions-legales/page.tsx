import { HeroSection } from "@/components/shared/hero-section";

export default function MentionsLegalesPage() {
  return (
    <div>
      <HeroSection
        badge="Informations Légales"
        title="Mentions Légales"
        subtitle="Mentions obligatoires et éditeur du site officiel de Digi-SET Institute."
        breadcrumbs={[{ label: "Mentions Légales" }]}
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
          <h2 className="font-heading text-lg font-bold text-slate-900">1. Éditeur du Site</h2>
          <p>
            Le site internet <strong>digiset-gabon.com</strong> est édité par l&apos;établissement supérieur privé <strong>Digi-SET Institute</strong> (Digital Science, Engineering and Technology Institute), situé à Angondje, Carrefour Moussavou, Akanda — Libreville, Gabon.
          </p>

          <h2 className="font-heading text-lg font-bold text-slate-900 pt-4">2. Directeur de la Publication</h2>
          <p>
            Dr ABAGA ABESSOLO Michel Audrey, Fondateur et Directeur Général de Digi-SET Institute.
          </p>

          <h2 className="font-heading text-lg font-bold text-slate-900 pt-4">3. Hébergement du Domaine & du Site</h2>
          <p>
            Le nom de domaine est géré via Hostinger (DNS). L&apos;application web est hébergée sur les serveurs sécurisés Vercel Inc. et Supabase Postgres.
          </p>

          <h2 className="font-heading text-lg font-bold text-slate-900 pt-4">4. Propriété Intellectuelle</h2>
          <p>
            L&apos;ensemble des contenus (textes, logos, marques, visuels et éléments graphiques) présents sur ce site est la propriété exclusive de Digi-SET Institute. Toute reproduction sans autorisation préalable est interdite.
          </p>
        </div>
      </section>
    </div>
  );
}
