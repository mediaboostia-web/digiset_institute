import { Metadata } from "next";
import { getNewsBySlug } from "@/lib/news-store";
import { ArticleClientView } from "@/components/public/article-client-view";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digiset-gabon.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  let article = getNewsBySlug(slug);

  if (!article) {
    try {
      const res = await fetch(`${siteUrl}/api/news?slug=${slug}&status=published`, {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
          article = json.data[0];
        }
      }
    } catch {}
  }

  if (!article) {
    return {
      title: "Actualité | DigiSET Institute",
      description: "Découvrez les dernières actualités et communiqués officiels de DigiSET Institute à Akanda, Gabon.",
    };
  }

  const coverImage = article.cover_image_url
    ? article.cover_image_url.startsWith("http")
      ? article.cover_image_url
      : `${siteUrl}${article.cover_image_url.startsWith("/") ? "" : "/"}${article.cover_image_url}`
    : `${siteUrl}/images/img/Hero_image1.jpg`;

  const titleText = `${article.title} | DigiSET Institute`;
  const descriptionText = article.excerpt || article.title;

  return {
    title: titleText,
    description: descriptionText,
    keywords: [
      "DigiSET Institute",
      "Actualité DigiSET Gabon",
      article.category || "Actualité Numérique",
      ...(article.tags || []),
    ],
    openGraph: {
      title: article.title,
      description: descriptionText,
      url: `${siteUrl}/actualites/${article.slug}`,
      siteName: "DigiSET Institute",
      locale: "fr_GA",
      type: "article",
      publishedTime: article.published_at || article.created_at,
      images: [
        {
          url: coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: descriptionText,
      images: [coverImage],
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let article = getNewsBySlug(slug);

  if (!article) {
    try {
      const res = await fetch(`${siteUrl}/api/news?slug=${slug}&status=published`, {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
          article = json.data[0];
        }
      }
    } catch {}
  }

  return <ArticleClientView rawSlug={slug} initialArticle={article} />;
}
