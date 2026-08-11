import { INITIAL_NEWS, NewsItem } from "./admin-data";

/**
 * Service de gestion unifié pour les actualités.
 * Partagé entre l'API Route (/api/news) et le Rendu Côté Serveur (SSR /actualites/[slug]).
 */
let newsStoreMemory: NewsItem[] = [...INITIAL_NEWS];

export function slugify(text: string): string {
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

export function getNewsBySlug(slug: string): NewsItem | null {
  const normalizedTarget = slugify(slug);
  
  // 1. Recherche exacte par slug
  let match = newsStoreMemory.find((item) => item.slug === slug || slugify(item.slug) === normalizedTarget);
  if (match) return match;

  // 2. Recherche partielle ou par titre slugifié
  match = newsStoreMemory.find((item) => slugify(item.title) === normalizedTarget || normalizedTarget.includes(item.slug));
  return match || null;
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
