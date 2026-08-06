import { HeroSection } from "@/components/shared/hero-section";
import { RegistrationForm } from "@/components/forms/registration-form";

export default function CandidaturePage() {
  return (
    <div>
      <HeroSection
        badge="Espace Candidat • Inscription en Ligne"
        title="Dépôt de Candidature — Rentrée 2026-2027"
        subtitle="Remplissez les informations ci-dessous pour candidater en Classe Préparatoire MP2I, Licence Professionnelle ou DigiSET Online."
        breadcrumbs={[
          { label: "Inscription", href: "/inscription" },
          { label: "Candidature en ligne" },
        ]}
      />

      <section className="py-12 bg-slate-50 border-b border-border">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <RegistrationForm />
        </div>
      </section>
    </div>
  );
}
