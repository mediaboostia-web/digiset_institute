import { PageStub } from "@/components/page-stub";

export default function LicenceProfessionnellePage() {
  return (
    <PageStub
      title="Licence Professionnelle en Technologies du Numérique et Cybersécurité"
      route="/programmes/licence-professionnelle"
      sections={[
        "Bandeau de titre + fiche descriptive commune (durée 1 an, 60 ECTS, public Bac+2)",
        "Présentation des 3 options en cartes (IA & Data Science / Cybersécurité / Systèmes de Paiement Électronique)",
        "Bandeau CTA comparatif",
      ]}
    />
  );
}
