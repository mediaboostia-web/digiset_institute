import { PageStub } from "@/components/page-stub";

export default function AdminEquipePage() {
  return (
    <PageStub
      title="Gestion de l'organigramme / équipe"
      route="/admin/equipe"
      sections={[
        "Liste des membres (photo, nom, fonction, pôle) avec ordre de tri",
        "Formulaire de création/édition (nom, fonction, pôle, photo)",
      ]}
    />
  );
}
