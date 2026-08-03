import { PageStub } from "@/components/page-stub";

export default function AdminSoumissionsPage() {
  return (
    <PageStub
      title="Boîte de réception des soumissions"
      route="/admin/soumissions"
      sections={[
        "Filtres (type de formulaire, statut, période) + bouton d'export CSV/Excel",
        "Tableau de données (colonnes triables, badge de statut coloré, pagination)",
        "Drawer de détail au clic sur une ligne (données complètes + pièces jointes téléchargeables + changement de statut)",
      ]}
    />
  );
}
