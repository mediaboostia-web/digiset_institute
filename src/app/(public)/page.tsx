import { PageStub } from "@/components/page-stub";

export default function AccueilPage() {
  return (
    <PageStub
      title="Accueil"
      route="/"
      sections={[
        "Hero (titre + sous-titre + 2 CTA + photo réelle labo/certification)",
        "Bloc Mot du Fondateur (fond bleu marine, portrait circulaire)",
        "Qui sommes-nous (texte court)",
        "Choisir une formation (3 cartes : Étudiant / Professionnel / Établissement)",
        "Nos offres (grille de 7 cartes : 5 pôles formation + 2 services)",
        "Bandeau certifications (Cisco / Microsoft / AWS / Linux / CompTIA / ICDL)",
        "Actualités (3 dernières cartes)",
        "Localisation (carte Google Maps + adresse)",
        "Bandeau CTA contact rapide",
      ]}
    />
  );
}
