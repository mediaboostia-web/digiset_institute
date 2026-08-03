import { PageStub } from "@/components/page-stub";

export default function AdminGaleriePage() {
  return (
    <PageStub
      title="Gestion de la galerie médias"
      route="/admin/galerie"
      sections={[
        "Grille de la médiathèque existante (par catégorie : campus, labos, événements)",
        "Zone de drop / uploader avec barre de progression",
        "Modale de sélection réutilisable (pour associer un média existant à une autre page)",
      ]}
    />
  );
}
