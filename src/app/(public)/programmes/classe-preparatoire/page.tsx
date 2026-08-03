import { PageStub } from "@/components/page-stub";

export default function ClassePreparatoirePage() {
  return (
    <PageStub
      title="Classe préparatoire MP2I"
      route="/programmes/classe-preparatoire"
      sections={[
        "Bandeau de titre (H1 + badges durée/crédits)",
        "Présentation",
        "Objectifs pédagogiques (liste à puces)",
        "Organisation des formations (4 semestres — frise ou tableau)",
        "Dossier de candidature (checklist des pièces requises)",
        "Profil en sortie (120 ECTS + liste de compétences)",
        "Poursuite des études (liste des débouchés/passerelles)",
        "CTA \"S'inscrire\" (sticky mobile)",
      ]}
    />
  );
}
