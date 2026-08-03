import { PageStub } from "@/components/page-stub";

/**
 * `params` est une Promise depuis Next.js 15+ (obligatoire en 16) — cf.
 * node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md.
 */
export default async function ActualiteDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <PageStub
      title={`Actualité — ${slug}`}
      route="/actualites/[slug]"
      sections={[
        "Image de couverture",
        "Titre + date",
        "Corps de texte riche",
        "Bandeau de partage réseaux sociaux",
        "Articles liés (3 cartes)",
      ]}
    />
  );
}
