import { PageStub } from "@/components/page-stub";

export default function AdminDocumentsPage() {
  return (
    <PageStub
      title="Gestion des documents téléchargeables"
      route="/admin/documents"
      sections={[
        "Liste des documents (nom, catégorie, date de mise à jour)",
        "Uploader de remplacement/ajout de fichier",
      ]}
    />
  );
}
