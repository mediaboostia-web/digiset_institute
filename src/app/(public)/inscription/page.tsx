import { PageStub } from "@/components/page-stub";

export default function InscriptionPage() {
  return (
    <PageStub
      title="Inscription"
      route="/inscription"
      sections={[
        "Hero \"Rejoindre Digi-SET Institute\"",
        "Pourquoi nous rejoindre (3-4 points clés)",
        "Conditions d'admission par programme (accordéon)",
        "Procédure d'inscription (stepper horizontal desktop / vertical mobile)",
        "Pièces à fournir (checklist)",
        "Calendrier (frise ou tableau de dates)",
        "Frais de scolarité (tableau)",
        "Lien vers le formulaire de candidature en ligne (/inscription/candidature)",
        "Téléchargements (liste de fichiers)",
      ]}
    />
  );
}
