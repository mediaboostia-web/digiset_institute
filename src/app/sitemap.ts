import { MetadataRoute } from "next";
import { INITIAL_NEWS } from "@/lib/admin-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digiset-gabon.com";

  // 1. Pages publiques statiques principales
  const staticRoutes = [
    "",
    "/institution",
    "/programmes",
    "/programmes/classe-preparatoire",
    "/programmes/licence-professionnelle",
    "/programmes/licence-professionnelle/ia-data-science",
    "/programmes/licence-professionnelle/cybersecurite",
    "/programmes/licence-professionnelle/systemes-paiement",
    "/programmes/formation-continue",
    "/programmes/certifications",
    "/programmes/digiset-online",
    "/services",
    "/services/location-laboratoires",
    "/services/consulting-it",
    "/vie-etudiante",
    "/actualites",
    "/inscription",
    "/inscription/candidature",
    "/contact",
    "/mentions-legales",
    "/politique-de-confidentialite",
  ];

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/actualites" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : route.startsWith("/programmes") ? 0.9 : 0.8,
  }));

  // 2. Articles d'actualités dynamiques pour le référencement Google News / Blog
  const newsPages: MetadataRoute.Sitemap = INITIAL_NEWS.map((article) => ({
    url: `${baseUrl}/actualites/${article.slug}`,
    lastModified: new Date(article.published_at || article.created_at || Date.now()),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...newsPages];
}
