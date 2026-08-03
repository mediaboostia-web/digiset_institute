import { PageStub } from "@/components/page-stub";

export default function CandidaturePage() {
  return (
    <PageStub
      title="Formulaire de candidature"
      route="/inscription/candidature"
      sections={[
        "Rappel des pièces à fournir",
        "Formulaire : identité, coordonnées, dernier diplôme, filière présélectionnée, upload pièces (bulletin/diplôme/CV/photo) (POST /api/submissions/registration)",
        "Écran de confirmation",
      ]}
    />
  );
}
