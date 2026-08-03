import { PageStub } from "@/components/page-stub";

export default function VieEtudiantePage() {
  return (
    <PageStub
      title="Vie étudiante"
      route="/vie-etudiante"
      sections={[
        "Hero (photo de campus/événement)",
        "Présentation courte",
        "Grille de sous-rubriques en cartes (Associations étudiantes, Activités et événements, Stages et insertion professionnelle, Accompagnement des étudiants, Vie sur le campus)",
        "Galerie photos et vidéos (grille + lightbox)",
        "Actualités étudiantes (liste courte)",
        "Documents utiles (liste téléchargeable avec icône type/poids)",
        "FAQ Étudiants (accordéon)",
      ]}
    />
  );
}
