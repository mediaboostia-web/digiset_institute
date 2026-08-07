import { Settings } from "lucide-react";
import { FutureModuleTeaser } from "@/components/shared/future-module-teaser";

export default function AdminSettingsPage() {
  return (
    <FutureModuleTeaser
      title="Paramètres Globaux du Site & Configuration"
      category="Configuration Système"
      version="Version 3.0"
      icon={Settings}
      marketingHeadline="Modifiez à tout moment les coordonnées officielles de Digi-SET Institute, les comptes sociaux et l'interrupteur du mode maintenance."
      description="Une interface centralisée pour ajuster les numéros de téléphone, les adresses de réception des alertes emails et le bandeau d'annonce public."
      benefits={[
        "Mise à jour immédiate du téléphone, email et adresse physique du campus",
        "Activation/Désactivation du Mode Maintenance d'un simple clic",
        "Configuration des emails de notification automatique (Resend)",
      ]}
    />
  );
}
