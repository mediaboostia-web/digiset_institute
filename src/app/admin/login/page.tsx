import { PageStub } from "@/components/page-stub";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-full flex-1 items-center justify-center bg-secondary/40">
      <PageStub
        title="Connexion admin"
        route="/admin/login"
        sections={[
          "Formulaire email + mot de passe (SupaAuth)",
          "Lien \"Mot de passe oublié\" → réinitialisation par email",
          "Fond épuré (logo + carte de connexion centrée, pas de sidebar)",
        ]}
      />
    </div>
  );
}
