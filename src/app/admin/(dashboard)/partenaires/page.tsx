import { PageStub } from "@/components/page-stub";

export default function AdminPartenairesPage() {
  return (
    <PageStub
      title="Gestion des partenaires"
      route="/admin/partenaires"
      sections={[
        "Liste des partenaires (logo, nom)",
        "Formulaire de création/édition (nom, logo, site web)",
      ]}
    />
  );
}
