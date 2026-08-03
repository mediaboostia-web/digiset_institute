import { PageStub } from "@/components/page-stub";

export default function LocationLaboratoiresPage() {
  return (
    <PageStub
      title="Location de laboratoires de TP"
      route="/services/location-laboratoires"
      sections={[
        "Hero de service (photo réelle du labo)",
        "Présentation + principe",
        "Catalogue des domaines couverts (mécanique, électricité, optique, électromagnétisme, électrocinétique, physique générale)",
        "Contrainte de capacité (groupes de 20 étudiants max)",
        "Grille tarifaire (Forfait 5 manipulations : 500 000 FCFA / Forfait 10 manipulations : 800 000 FCFA — mise en avant du forfait 10)",
        "Formulaire de demande de location de labo (intégré en bas de page)",
      ]}
    />
  );
}
