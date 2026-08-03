import { PageStub } from "@/components/page-stub";

export default function ContactPage() {
  return (
    <PageStub
      title="Contact"
      route="/contact"
      sections={[
        "Bandeau de titre",
        "Formulaire de contact (nom, email, téléphone, sujet, message — POST /api/contact)",
        "Coordonnées + carte Google Maps (colonne latérale desktop / empilé mobile)",
      ]}
    />
  );
}
