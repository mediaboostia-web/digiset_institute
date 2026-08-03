import { PageStub } from "@/components/page-stub";

export default function FormationContinuePage() {
  return (
    <PageStub
      title="Formations Continues"
      route="/programmes/formation-continue"
      sections={[
        "Bandeau de titre (H1 + chapô \"objectif\")",
        "Format (présentiel intra/inter-entreprise, 3-10 jours)",
        "4 axes de formation en cartes détaillées (Cybersécurité / IA & Data Science / Systèmes de paiements / Management & stratégie)",
        "Sous-bloc dédié administration/régulation (politiques publiques numériques)",
        "CTA \"Faire une demande de formation continue\"",
      ]}
    />
  );
}
