import { PageStub } from "@/components/page-stub";

export default function ActualitesPage() {
  return (
    <PageStub
      title="Actualités"
      route="/actualites"
      sections={["Bandeau de titre", "Grille de cartes actualité paginée"]}
    />
  );
}
