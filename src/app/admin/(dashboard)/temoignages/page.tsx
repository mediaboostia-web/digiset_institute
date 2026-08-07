import { FutureModuleTeaser } from "@/components/shared/future-module-teaser";

export default function AdminTestimonialsPage() {
  return (
    <FutureModuleTeaser
      title="Gestion des Témoignages & Retours d'Expérience"
      category="Contenu & Réputation"
      version="Version 2.0"
      iconName="MessageSquareQuote"
      marketingHeadline="Boostez la crédibilité de Digi-SET Institute en mettant en avant les succès de vos étudiants et la confiance de vos entreprises partenaires."
      description="Ce module permettra de publier et modérer les citations, avis vidéo et parcours de réussite des diplômés pour renforcer la preuve sociale sur les pages de candidature."
      benefits={[
        "Mise en valeur des parcours d'anciens élèves (Alumni)",
        "Affichage des témoignages certifiés d'entreprises partenaires",
        "Modération et contrôle des avis affichés sur l'accueil et les filières",
        "Statistiques d'impact sur la conversion des futurs étudiants",
      ]}
    />
  );
}
