import { FutureModuleTeaser } from "@/components/shared/future-module-teaser";

export default function AdminPagesContentPage() {
  return (
    <FutureModuleTeaser
      title="Édition des Pages de Contenu Libre & Légal"
      category="Éditeur Institutionnel"
      version="Version 3.0"
      iconName="FileText"
      marketingHeadline="Gardez un contrôle total sur vos mentions légales, politique de confidentialité et textes de presentation institutionnelle."
      description="Modifiez sans intervention technique la politique de protection des données, l'historique du fondateur et les pages d'information générale."
      benefits={[
        "Éditeur de texte riche sécurisé et conforme RGPD / lois Gabonaises",
        "Historique des versions et prévisualisation avant publication",
        "Mise à jour directe du mot du président et des valeurs institutionnelles",
      ]}
    />
  );
}
