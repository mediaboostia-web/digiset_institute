import { PageStub } from "@/components/page-stub";

export default function MaintenancePage() {
  return (
    <PageStub
      title="Site en maintenance"
      route="/maintenance"
      sections={[
        "Message de maintenance",
        "Coordonnées de contact alternatif (téléphone / email)",
      ]}
    />
  );
}
