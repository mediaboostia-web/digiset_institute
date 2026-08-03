import { PageStub } from "@/components/page-stub";

export default function CertificationsPage() {
  return (
    <PageStub
      title="Certifications professionnelles"
      route="/programmes/certifications"
      sections={[
        "Bandeau de titre (H1 + objectif)",
        "Détail par axe en cartes/accordéon (Cybersécurité, IA & Data Science, Paiements électroniques, Management & stratégie, Infrastructure & Cloud transverse)",
        "Bandeau logos des certifications visées (Cisco/CompTIA/ISC²/Microsoft/AWS/ISO/COBIT/ITIL/Linux-RedHat)",
        "CTA \"Faire une demande\" (renvoie au formulaire formation continue)",
      ]}
    />
  );
}
