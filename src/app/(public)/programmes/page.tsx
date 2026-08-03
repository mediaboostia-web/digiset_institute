import { PageStub } from "@/components/page-stub";

export default function ProgrammesPage() {
  return (
    <PageStub
      title="Programmes"
      route="/programmes"
      sections={[
        "Bandeau de titre (H1 + chapô)",
        "Barre de filtres (pills : public / domaine / format)",
        "Grille de cartes programme (résultats filtrés, responsive 1/2/3 colonnes)",
        "État vide (aucun résultat + CTA contact)",
        "Bandeau CTA \"Vous ne savez pas quel programme choisir ?\"",
      ]}
    />
  );
}
