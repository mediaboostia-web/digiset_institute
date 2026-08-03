import { PageStub } from "@/components/page-stub";

export default function AdminDashboardPage() {
  return (
    <PageStub
      title="Dashboard"
      route="/admin"
      sections={[
        "En-tête (nom utilisateur connecté + rôle)",
        "Rangée de compteurs (nouvelles soumissions 7 jours, par type de formulaire)",
        "Liste des dernières actualités + statut (brouillon/publié)",
        "Raccourcis d'action (Publier une actualité / Voir les soumissions en attente)",
      ]}
    />
  );
}
