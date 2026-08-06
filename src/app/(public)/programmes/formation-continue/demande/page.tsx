import { HeroSection } from "@/components/shared/hero-section";
import { TrainingRequestForm } from "@/components/forms/training-request-form";

export default function DemandeFormationContinuePage() {
  return (
    <div>
      <HeroSection
        badge="Espace Entreprises & Administrations"
        title="Demande de Formation Continue"
        subtitle="Remplissez ce formulaire pour nous faire part de vos besoins de formation professionnelle. Notre équipe vous transmettra une proposition technique et financière sous 24h."
        breadcrumbs={[
          { label: "Programmes", href: "/programmes" },
          { label: "Formation Continue", href: "/programmes/formation-continue" },
          { label: "Demande" },
        ]}
      />

      <section className="py-12 bg-slate-50 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <TrainingRequestForm />
        </div>
      </section>
    </div>
  );
}
