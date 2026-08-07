import { UserCheck } from "lucide-react";
import { FutureModuleTeaser } from "@/components/shared/future-module-teaser";

export default function AdminUsersPage() {
  return (
    <FutureModuleTeaser
      title="Gestion des Comptes Administrateurs & Droits d'Accès"
      category="Sécurité & Administration"
      version="Version 3.0"
      icon={UserCheck}
      marketingHeadline="Sécurisez l'accès à votre plateforme et déléguez la gestion des contenus avec un contrôle fin des rôles et autorisations."
      description="Créez des accès pour la direction, les secrétariats et les chargés de communication avec des rôles différenciés (Super Admin, Éditeur)."
      benefits={[
        "Gestion des utilisateurs de l'espace administration (`admin_users`)",
        "Attribution de rôles (Super Administrateur vs Éditeur de contenu)",
        "Audit des dernières connexions et traçabilité des modifications",
      ]}
    />
  );
}
