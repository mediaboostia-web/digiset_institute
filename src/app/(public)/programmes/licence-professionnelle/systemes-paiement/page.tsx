import { PageStub } from "@/components/page-stub";

export default function LicenceSystemesPaiementPage() {
  return (
    <PageStub
      title="Licence Professionnelle — Systèmes de Paiement Électronique"
      route="/programmes/licence-professionnelle/systemes-paiement"
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
