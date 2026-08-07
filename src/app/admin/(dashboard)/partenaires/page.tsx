import { Building2 } from "lucide-react";
import { FutureModuleTeaser } from "@/components/shared/future-module-teaser";

export default function AdminPartnersPage() {
  return (
    <FutureModuleTeaser
      title="Gestion des Partenaires Académiques & Industriels"
      category="Réseau Institutionnel"
      version="Version 2.0"
      icon={Building2}
      marketingHeadline="Affichez avec prestige le réseau d'entreprises, de banques et d'universités partenaires de Digi-SET Institute."
      description="Gérez les logos, liens officiels et niveaux de partenariat (Certifications Cisco/AWS, Banques Monétiques, TotalEnergies) affichés sur le site public."
      benefits={[
        "Gestion des logos partenaires haute définition",
        "Lien vers les sites institutionnels des sponsors et certificateurs",
        "Organisation par catégories (Académique, Monétique, Cybersécurité)",
        "Valorisation de l'employabilité des diplômés auprès des candidats",
      ]}
    />
  );
}
