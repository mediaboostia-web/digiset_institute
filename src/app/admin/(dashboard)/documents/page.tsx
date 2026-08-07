import { FolderDown } from "lucide-react";
import { FutureModuleTeaser } from "@/components/shared/future-module-teaser";

export default function AdminDocumentsPage() {
  return (
    <FutureModuleTeaser
      title="Gestion des Documents Téléchargeables & Tarifs PDF"
      category="Ressources Publics"
      version="Version 3.0"
      icon={FolderDown}
      marketingHeadline="Mettez à disposition de vos futurs étudiants et lycées partenaires les dossiers officiels et grilles tarifaires au format PDF."
      description="Hébergez dans Supabase Storage et distribuez la plaquette générale 2026, la grille tarifaire des laboratoires de TP et les fiches d'inscription."
      benefits={[
        "Publication de documents PDF téléchargeables en un clic",
        "Comptage des téléchargements par document",
        "Gestion des grilles tarifaires (Forfaits TP 5 et 10 manipulations)",
      ]}
    />
  );
}
