import { INITIAL_NEWS, NewsItem } from "./admin-data";
import fs from "fs";
import path from "path";

const TMP_FILE_PATH = path.join(process.cwd(), ".next", "digiset_news_cache.json");
const ALT_TMP_PATH = "/tmp/digiset_news_cache.json";

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
 * Normalise un texte en retirant accents, consonnes/voyelles altérées pour correspondance tolérante.
 */
function normalizeStem(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

/**
 * Recherche d'article par slug avec résolvance maximale (accents, slugs tronqués "cyberscurit").
 * Empêche rigoureusement toute erreur 404 sur les articles valides.
 */
export function getNewsBySlug(slug: string): NewsItem | null {
  if (!slug) return null;

  newsStoreMemory = loadStore();
  const targetSlug = slug.toLowerCase().trim();
  const targetNormalized = slugify(slug);
  const targetStem = normalizeStem(slug);

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

  // 3. Recherche tolérante aux accents tronqués (ex: "cyberscurit" <-> "cybersecurite")
  match = newsStoreMemory.find((item) => {
    const itemSlugStem = normalizeStem(item.slug);
    const itemTitleStem = normalizeStem(item.title);

    if (itemSlugStem === targetStem || itemTitleStem === targetStem) return true;

    // Correspondance partielle si > 10 caractères
    if (targetStem.length > 10) {
      const targetPrefix = targetStem.substring(0, 15);
      if (itemSlugStem.startsWith(targetPrefix) || itemTitleStem.startsWith(targetPrefix)) {
        return true;
      }
    }

    return false;
  });
  if (match) return match;

  return null;
}

export function addNewsItem(item: NewsItem): NewsItem {
  newsStoreMemory = loadStore();
  const baseSlug = item.slug ? slugify(item.slug) : slugify(item.title);
  
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
