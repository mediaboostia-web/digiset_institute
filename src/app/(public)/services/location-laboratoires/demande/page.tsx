import { PageStub } from "@/components/page-stub";

export default function DemandeLocationLaboratoiresPage() {
  return (
    <PageStub
      title="Demande de location de laboratoire"
      route="/services/location-laboratoires/demande"
      sections={[
        "Rappel de la grille tarifaire",
        "Formulaire : établissement, contact, type de labo (physique/informatique), créneaux souhaités, effectif (POST /api/submissions/lab-request)",
        "Écran de confirmation",
      ]}
    />
  );
}
