import { PageStub } from "@/components/page-stub";

export default function InstitutionPage() {
  return (
    <PageStub
      title="Institution"
      route="/institution"
      sections={[
        "Hero institutionnel",
        "À propos, organigramme, missions (représentation visuelle de la structure)",
        "Stratégie (orientation stratégique de l'institut)",
        "Partenaires (grille de logos)",
      ]}
    />
  );
}
