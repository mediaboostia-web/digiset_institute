import { PageStub } from "@/components/page-stub";

export default function DemandeFormationContinuePage() {
  return (
    <PageStub
      title="Demande de formation continue"
      route="/programmes/formation-continue/demande"
      sections={[
        "Rappel bref de l'offre (4 axes)",
        "Formulaire : société, contact, domaine, nombre de participants, dates souhaitées, message (POST /api/submissions/training-request)",
        "Écran de confirmation",
      ]}
    />
  );
}
