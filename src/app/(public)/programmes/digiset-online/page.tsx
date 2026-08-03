import { PageStub } from "@/components/page-stub";

export default function DigisetOnlinePage() {
  return (
    <PageStub
      title="DigiSET Online"
      route="/programmes/digiset-online"
      sections={[
        "Hero dédié (présentation)",
        "Nos grands principes (5 blocs : Flexibilité, Exigence pédagogique, Interactivité, Accessibilité élargie, Suivi et certification)",
        "CTA double (S'inscrire côté étudiant / Faire une demande côté professionnel)",
      ]}
    />
  );
}
