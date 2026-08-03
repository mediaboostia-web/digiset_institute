import { PageStub } from "@/components/page-stub";

export default function AdminTemoignagesPage() {
  return (
    <PageStub
      title="Gestion des témoignages"
      route="/admin/temoignages"
      sections={[
        "Liste des témoignages (nom, fonction, aperçu de citation)",
        "Formulaire de création/édition (nom, fonction/organisation, citation, photo)",
      ]}
    />
  );
}
