import { INITIAL_NEWS, NewsItem } from "./admin-data";

/**
 * Service de gestion unifié pour les actualités.
 * Partagé entre l'API Route (/api/news) et le Rendu Côté Serveur (SSR /actualites/[slug]).
 */
let newsStoreMemory: NewsItem[] = [...INITIAL_NEWS];

export function slugify(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Extraire les mots significatifs (> 2 caractères) pour la recherche floue / tolérante aux fautes
 */
function extractKeywords(str: string): string[] {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2);
}

export function getGlobalNews(status: "published" | "all" = "published"): NewsItem[] {
  if (status === "all") return newsStoreMemory;
  return newsStoreMemory.filter((item) => item.status === "published");
}

export function getNewsBySlug(slug: string): NewsItem | null {
  if (!slug) return null;

  const targetSlug = slug.toLowerCase().trim();
  const targetNormalized = slugify(slug);

  // 1. Recherche exacte sur le slug ou slug normalisé
  let match = newsStoreMemory.find(
    (item) => item.slug === targetSlug || slugify(item.slug) === targetNormalized
  );
  if (match) return match;

  // 2. Recherche tolérante : cas de "cyberscurit" vs "cybersecurite" (accents tronqués)
  match = newsStoreMemory.find((item) => {
    const itemSlugNorm = slugify(item.slug);
    const itemTitleNorm = slugify(item.title);
    return (
      itemSlugNorm.includes(targetNormalized) ||
      targetNormalized.includes(itemSlugNorm) ||
      itemTitleNorm.includes(targetNormalized) ||
      targetNormalized.includes(itemTitleNorm)
    );
  });
  if (match) return match;

  // 3. Recherche floue basée sur la pertinence des mots-clés
  const targetKeywords = extractKeywords(targetSlug);
  if (targetKeywords.length > 0) {
    let bestMatch: NewsItem | null = null;
    let maxScore = 0;

    for (const item of newsStoreMemory) {
      const itemText = `${item.title} ${item.slug} ${item.excerpt || ""}`.toLowerCase();
      let score = 0;

      for (const kw of targetKeywords) {
        // Recherche partielle des mots (ex. "cyberscurit" sous-chaîne de "cybersécurité" ou vice versa)
        const cleanKw = slugify(kw);
        if (cleanKw.length > 3) {
          const stem = cleanKw.substring(0, 5); // les 5 premières lettres
          if (itemText.includes(cleanKw) || itemText.includes(stem)) {
            score += 1;
          }
        }
      }

      if (score > maxScore && score >= 2) {
        maxScore = score;
        bestMatch = item;
      }
    }

    if (bestMatch) return bestMatch;
  }

  // 4. Dernier recours : retourner le premier article s'il n'y en a qu'un ou si c'est la catégorie cybersécurité
  if (targetSlug.includes("cyber") || targetSlug.includes("bouclier")) {
    const cyberArticle = newsStoreMemory.find(
      (item) =>
        item.title.toLowerCase().includes("cyber") ||
        item.slug.toLowerCase().includes("cyber") ||
        item.category?.toLowerCase().includes("cyber")
    );
    if (cyberArticle) return cyberArticle;
  }

  return null;
}

export function addNewsItem(item: NewsItem): NewsItem {
  const finalSlug = item.slug ? slugify(item.slug) : slugify(item.title);
  const newItem: NewsItem = {
    ...item,
    slug: finalSlug,
    published_at: item.published_at || new Date().toISOString(),
    created_at: item.created_at || new Date().toISOString(),
  };

  // Supprimer s'il existe déjà et insérer au début
  newsStoreMemory = [newItem, ...newsStoreMemory.filter((n) => n.id !== newItem.id && n.slug !== newItem.slug)];
  return newItem;
}

export function updateNewsItem(id: string, updates: Partial<NewsItem>): NewsItem | null {
  let updatedItem: NewsItem | null = null;
  newsStoreMemory = newsStoreMemory.map((item) => {
    if (item.id === id) {
      updatedItem = {
        ...item,
        ...updates,
        ...(updates.slug && { slug: slugify(updates.slug) }),
        ...(updates.title && !updates.slug && { slug: slugify(updates.title) }),
      };
      return updatedItem;
    }
    return item;
  });
  return updatedItem;
}

export function deleteNewsItem(id: string): boolean {
  const initialLength = newsStoreMemory.length;
  newsStoreMemory = newsStoreMemory.filter((item) => item.id !== id);
  return newsStoreMemory.length < initialLength;
}
