import { FutureModuleTeaser } from "@/components/shared/future-module-teaser";

export default function AdminProgramsPage() {
  return (
    <FutureModuleTeaser
      title="Gestion des Programmes & Maquettes Pédagogiques"
      category="Catalogue Académique"
      version="Version 2.0"
      iconName="GraduationCap"
      marketingHeadline="Structurez et actualisez en toute autonomie l'offre de formation de la Prépa MP2I, des Licences Pro et des Formations Continues."
      description="Gérez les objectifs pédagogiques, les profils d'admission, la durée des cursus et les débouchés professionnels directement depuis votre espace d'administration."
      benefits={[
        "Mise à jour en temps réel des fiches filières (IA, Cybersécurité, Monétique)",
        "Gestion des options et parcours de la Licence Professionnelle",
        "Association directe des plaquettes de formation au format PDF",
        "Optimisation du référencement naturel (SEO) des pages de cours",
      ]}
    />
  );
}
