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

export function getGlobalNews(status: "published" | "all" = "published"): NewsItem[] {
  if (status === "all") return newsStoreMemory;
  return newsStoreMemory.filter((item) => item.status === "published");
}

/**
 * Recherche stricte d'article par slug.
 * Évite rigoureusement tout chevauchement ou duplication d'anciens articles.
 */
export function getNewsBySlug(slug: string): NewsItem | null {
  if (!slug) return null;

  const targetSlug = slug.toLowerCase().trim();
  const targetNormalized = slugify(slug);

  // 1. Recherche exacte par slug direct ou slug normalisé
  let match = newsStoreMemory.find(
    (item) => item.slug === targetSlug || slugify(item.slug) === targetNormalized
  );
  if (match) return match;

  // 2. Recherche exacte par titre normalisé
  match = newsStoreMemory.find(
    (item) => slugify(item.title) === targetNormalized
  );
  if (match) return match;

  // 3. Cas spécifique des accents tronqués (ex: "cyberscurit" -> "cybersecurite")
  match = newsStoreMemory.find((item) => {
    const itemSlugNorm = slugify(item.slug);
    return (
      itemSlugNorm.replace(/e/g, "") === targetNormalized.replace(/e/g, "")
    );
  });
  if (match) return match;

  // Si aucun résultat strict ne correspond, retourner null (pas de redirection erronée vers un ancien article)
  return null;
}

export function addNewsItem(item: NewsItem): NewsItem {
  const baseSlug = item.slug ? slugify(item.slug) : slugify(item.title);
  
  // Garantir un slug unique pour éviter toute collision avec un ancien article
  let finalSlug = baseSlug;
  let counter = 1;
  while (newsStoreMemory.some((n) => n.slug === finalSlug && n.id !== item.id)) {
    finalSlug = `${baseSlug}-${counter}`;
    counter++;
  }

  const newItem: NewsItem = {
    ...item,
    slug: finalSlug,
    published_at: item.published_at || new Date().toISOString(),
    created_at: item.created_at || new Date().toISOString(),
  };

  // Remplacer s'il existe déjà par ID ou insérer en tête de liste
  newsStoreMemory = [newItem, ...newsStoreMemory.filter((n) => n.id !== newItem.id)];
  return newItem;
}

export function updateNewsItem(id: string, updates: Partial<NewsItem>): NewsItem | null {
  let updatedItem: NewsItem | null = null;
  newsStoreMemory = newsStoreMemory.map((item) => {
    if (item.id === id) {
      const newSlug = updates.slug
        ? slugify(updates.slug)
        : updates.title
        ? slugify(updates.title)
        : item.slug;

      updatedItem = {
        ...item,
        ...updates,
        slug: newSlug,
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
