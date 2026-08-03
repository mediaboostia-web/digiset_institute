import { PageStub } from "@/components/page-stub";

export default function LicenceIaDataSciencePage() {
  return (
    <PageStub
      title="Licence Professionnelle — Intelligence Artificielle & Data Science"
      route="/programmes/licence-professionnelle/ia-data-science"
      sections={[
        "Bandeau de titre (H1 + badges sigle/durée/crédits)",
        "Fiche descriptive (tableau clé/valeur)",
        "Objectif",
        "Profils d'admission (liste)",
        "Compétences en sortie (liste ou grille d'icônes)",
        "Débouchés (pills de métiers)",
        "Modalités d'admission (checklist pièces du dossier)",
        "CTA \"S'inscrire à cette option\" (sticky mobile)",
      ]}
    />
  );
}
