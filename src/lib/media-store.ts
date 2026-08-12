import fs from "fs";
import path from "path";

export interface MediaItem {
  id: string;
  title: string;
  url: string;
  category: string;
  size?: string;
  dimensions?: string;
  created_at: string;
}

const TMP_MEDIA_PATH = path.join(process.cwd(), ".next", "digiset_media_cache.json");
const ALT_MEDIA_PATH = "/tmp/digiset_media_cache.json";

export const INITIAL_MEDIA: MediaItem[] = [
  {
    id: "media-1",
    title: "Dr ABAGA ABESSOLO - Fondateur & DG",
    url: "/brand/fondateur.png",
    category: "Équipe & Direction",
    size: "420 KB",
    dimensions: "800 x 800",
    created_at: new Date().toISOString(),
  },
  {
    id: "media-2",
    title: "Bâtiment Principal DigiSET Akanda",
    url: "/images/img/Image_3.jpg",
    category: "Campus & Bâtiments",
    size: "680 KB",
    dimensions: "1200 x 800",
    created_at: new Date().toISOString(),
  },
  {
    id: "media-3",
    title: "Étudiants & Campus Akanda",
    url: "/images/img/Image_4.jpg",
    category: "Campus & Étudiants",
    size: "750 KB",
    dimensions: "1200 x 800",
    created_at: new Date().toISOString(),
  },
  {
    id: "media-4",
    title: "Laboratoires TP Scientifiques & Optique",
    url: "/images/img/Img_2.jpg",
    category: "Laboratoires & TP",
    size: "590 KB",
    dimensions: "1200 x 800",
    created_at: new Date().toISOString(),
  },
  {
    id: "media-5",
    title: "Prof. Jean-Marc ONDO - Directeur des Études",
    url: "/images/img/Image6.jpg",
    category: "Équipe & Direction",
    size: "480 KB",
    dimensions: "800 x 800",
    created_at: new Date().toISOString(),
  },
  {
    id: "media-6",
    title: "Dr. Sylvie NGUEMA - Conseil Scientifique",
    url: "/images/img/Image7.jpg",
    category: "Équipe & Direction",
    size: "510 KB",
    dimensions: "800 x 800",
    created_at: new Date().toISOString(),
  },
];

function loadMediaStore(): MediaItem[] {
  try {
    if (fs.existsSync(TMP_MEDIA_PATH)) {
      const data = fs.readFileSync(TMP_MEDIA_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Fallback
  }

  try {
    if (fs.existsSync(ALT_MEDIA_PATH)) {
      const data = fs.readFileSync(ALT_MEDIA_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // Fallback
  }

  return [...INITIAL_MEDIA];
}

function saveMediaStore(items: MediaItem[]) {
  try {
    const json = JSON.stringify(items, null, 2);
    try {
      fs.writeFileSync(TMP_MEDIA_PATH, json, "utf-8");
    } catch {
      // Ignorer
    }
    try {
      fs.writeFileSync(ALT_MEDIA_PATH, json, "utf-8");
    } catch {
      // Ignorer
    }
  } catch {
    // Ignorer
  }
}

let mediaMemory: MediaItem[] = loadMediaStore();

export function getGlobalMedia(): MediaItem[] {
  mediaMemory = loadMediaStore();
  return mediaMemory;
}

export function addMediaItem(item: Omit<MediaItem, "id" | "created_at"> & { id?: string }): MediaItem {
  mediaMemory = loadMediaStore();
  const newItem: MediaItem = {
    id: item.id || `media-${Date.now()}`,
    title: item.title,
    url: item.url,
    category: item.category || "Autre",
    size: item.size || "Local File",
    dimensions: item.dimensions || "Variable",
    created_at: new Date().toISOString(),
  };

  mediaMemory = [newItem, ...mediaMemory.filter((m) => m.id !== newItem.id)];
  saveMediaStore(mediaMemory);
  return newItem;
}

export function deleteMediaItem(id: string): boolean {
  mediaMemory = loadMediaStore();
  const initialLen = mediaMemory.length;
  mediaMemory = mediaMemory.filter((m) => m.id !== id);
  saveMediaStore(mediaMemory);
  return mediaMemory.length < initialLen;
}
