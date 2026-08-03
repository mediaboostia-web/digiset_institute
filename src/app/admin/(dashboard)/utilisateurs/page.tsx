import { PageStub } from "@/components/page-stub";

export default function AdminUtilisateursPage() {
  return (
    <PageStub
      title="Gestion des utilisateurs admin"
      route="/admin/utilisateurs"
      sections={[
        "Réservé au rôle Super-admin",
        "Liste des comptes admin (nom, email, rôle, statut)",
        "Formulaire d'invitation (email + attribution de rôle Super-admin/Éditeur)",
        "Modale de confirmation de révocation d'accès",
      ]}
    />
  );
}
