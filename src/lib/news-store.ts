import { INITIAL_NEWS, NewsItem } from "./admin-data";
import fs from "fs";
import path from "path";

const TMP_FILE_PATH = path.join(process.cwd(), ".next", "digiset_news_cache.json");
const ALT_TMP_PATH = "/tmp/digiset_news_cache.json";

/**
 * Charge la mémoire d'articles depuis le disque (si disponible) ou depuis INITIAL_NEWS
 */
function loadStore(): NewsItem[] {
  try {
    if (fs.existsSync(TMP_FILE_PATH)) {
      const data = fs.readFileSync(TMP_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Ignorer
  }

  try {
    if (fs.existsSync(ALT_TMP_PATH)) {
      const data = fs.readFileSync(ALT_TMP_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Ignorer
  }

  return [...INITIAL_NEWS];
}

/**
 * Sauvegarde la mémoire d'articles sur disque pour persistance Vercel/SSR
 */
function saveStore(items: NewsItem[]) {
  try {
    const json = JSON.stringify(items, null, 2);
    try {
      fs.writeFileSync(TMP_FILE_PATH, json, "utf-8");
    } catch {
      // Ignorer
    }
    try {
      fs.writeFileSync(ALT_TMP_PATH, json, "utf-8");
    } catch {
      // Ignorer
    }
  } catch {
    // Ignorer
  }
}

let newsStoreMemory: NewsItem[] = loadStore();

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
  newsStoreMemory = loadStore();
  if (status === "all") return newsStoreMemory;
  return newsStoreMemory.filter((item) => item.status === "published");
}

/**
 * Recherche d'article par slug avec tolérance élevée (accents, voyelles tronquées).
 * Évite rigoureusement la redirection vers de mauvais articles.
 */
export function getNewsBySlug(slug: string): NewsItem | null {
  if (!slug) return null;

  newsStoreMemory = loadStore();
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

  // 3. Recherche tolérante aux accents tronqués (ex: "lintelligence-artificielle-et-la-cyberscurit-les-mtiers-en-or-de-2026")
  const cleanTarget = targetNormalized.replace(/[^a-z0-9]/g, "");
  match = newsStoreMemory.find((item) => {
    const itemSlugClean = slugify(item.slug).replace(/[^a-z0-9]/g, "");
    const itemTitleClean = slugify(item.title).replace(/[^a-z0-9]/g, "");

    return (
      itemSlugClean === cleanTarget ||
      itemTitleClean === cleanTarget ||
      (cleanTarget.length > 15 && (itemSlugClean.includes(cleanTarget) || cleanTarget.includes(itemSlugClean))) ||
      (cleanTarget.length > 15 && (itemTitleClean.includes(cleanTarget) || cleanTarget.includes(itemTitleClean)))
    );
  });
  if (match) return match;

  return null;
}

export function addNewsItem(item: NewsItem): NewsItem {
  newsStoreMemory = loadStore();
  const baseSlug = item.slug ? slugify(item.slug) : slugify(item.title);
  
  // Garantir un slug unique pour éviter toute collision avec un autre article
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
  saveStore(newsStoreMemory);
  return newItem;
}

export function updateNewsItem(id: string, updates: Partial<NewsItem>): NewsItem | null {
  newsStoreMemory = loadStore();
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
  saveStore(newsStoreMemory);
  return updatedItem;
}

export function deleteNewsItem(id: string): boolean {
  newsStoreMemory = loadStore();
  const initialLength = newsStoreMemory.length;
  newsStoreMemory = newsStoreMemory.filter((item) => item.id !== id);
  saveStore(newsStoreMemory);
  return newsStoreMemory.length < initialLength;
}
