import { Image as ImageIcon } from "lucide-react";
import { FutureModuleTeaser } from "@/components/shared/future-module-teaser";

export default function AdminGalleryPage() {
  return (
    <FutureModuleTeaser
      title="Médiathèque Centrale & Galerie Photos/Vidéos"
      category="Gestion des Médias"
      version="Version 2.0"
      icon={ImageIcon}
      marketingHeadline="Un réservoir centralisé de photographies haute résolution pour alimenter vos actualités, fiches d'équipe et bannières."
      description="Stockez et catégorisez les photos des laboratoires de TP, du campus, des sessions d'examen et des cérémonies officielles dans Supabase Storage."
      benefits={[
        "Téléversement glisser-déposer de multiples fichiers d'un coup",
        "Bibliothèque partagée réutilisable dans la rédaction des actualités",
        "Catégorisation par thèmes (Campus, Labos Physique/IT, Événements)",
        "Compression automatique et génération d'URL sécurisées CDN",
      ]}
    />
  );
}
