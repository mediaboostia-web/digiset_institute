import { PageStub } from "@/components/page-stub";

export default function AdminPagesPage() {
  return (
    <PageStub
      title="Gestion des pages de contenu libre"
      route="/admin/pages"
      sections={[
        "Liste des blocs éditables (Mot du Fondateur, Qui sommes-nous, Stratégie, Pourquoi rejoindre Digi-SET, FAQ)",
        "Éditeur de texte riche par bloc + upload d'image associée si applicable",
      ]}
    />
  );
}
