import { PageStub } from "@/components/page-stub";

export default function AdminParametresPage() {
  return (
    <PageStub
      title="Paramètres du site"
      route="/admin/parametres"
      sections={[
        "Réservé au rôle Super-admin",
        "Formulaire coordonnées (téléphone, email, adresse)",
        "Formulaire réseaux sociaux (liens)",
        "Formulaire SEO global (titre/description par défaut)",
        "Champ bandeau d'actualité (ex. message de lancement)",
      ]}
    />
  );
}
