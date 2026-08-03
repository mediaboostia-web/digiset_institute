import { PageStub } from "@/components/page-stub";

export default function ServicesPage() {
  return (
    <PageStub
      title="Services"
      route="/services"
      sections={[
        "Bandeau de titre",
        "2 cartes service (Location de laboratoires de TP / Consulting IT)",
      ]}
    />
  );
}
