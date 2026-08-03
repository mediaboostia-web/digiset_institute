import { PageStub } from "@/components/page-stub";

export default function AdminProgrammesPage() {
  return (
    <PageStub
      title="Gestion des programmes"
      route="/admin/programmes"
      sections={[
        "Tableau/liste des fiches programme (filtrable par famille, statut publié/brouillon)",
        "Formulaire de création/édition (titre, sigle, durée, crédits, public visé, objectifs, profils d'admission, compétences, débouchés, pièces du dossier)",
        "Aperçu en temps réel (colonne droite desktop)",
        "Barre d'action persistante (Enregistrer en brouillon / Publier)",
      ]}
    />
  );
}
