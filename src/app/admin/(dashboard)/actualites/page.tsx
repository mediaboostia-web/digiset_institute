import { PageStub } from "@/components/page-stub";

export default function AdminActualitesPage() {
  return (
    <PageStub
      title="Gestion des actualités"
      route="/admin/actualites"
      sections={[
        "Tableau/liste des articles (statut, date de publication)",
        "Éditeur de création/édition (titre, image de couverture, éditeur de texte riche, statut)",
        "Aperçu en temps réel",
        "Barre d'action (Brouillon / Publier)",
      ]}
    />
  );
}
