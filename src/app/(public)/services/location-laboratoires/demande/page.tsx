import { HeroSection } from "@/components/shared/hero-section";
import { LabRequestForm } from "@/components/forms/lab-request-form";

export default function DemandeLocationLaboratoiresPage() {
  return (
    <div>
      <HeroSection
        badge="Espace Établissements Scolaires"
        title="Demande de Réservation de Laboratoires TP"
        subtitle="Remplissez ce formulaire pour nous transmettre les besoins de votre établissement. Notre responsable des plateaux techniques prendra contact avec vous."
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Location de Laboratoires", href: "/services/location-laboratoires" },
          { label: "Demande" },
        ]}
      />

      <section className="py-12 bg-slate-50 border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <LabRequestForm />
        </div>
      </section>
    </div>
  );
}
