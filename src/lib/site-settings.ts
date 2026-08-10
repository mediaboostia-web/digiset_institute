"use client";

import { useState, useEffect } from "react";

export interface SiteSettings {
  isAnnouncementEnabled: boolean;
  announcementText: string;
  announcementCtaText: string;
  announcementCtaHref: string;
  notificationEmail: string;
  institutionEmail: string;
  institutionPhone1: string;
  institutionPhone2: string;
  institutionAddress: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  isAnnouncementEnabled: true,
  announcementText: "🎓 Inscriptions Ouvertes — Rentrée Académique de Septembre 2026 à DigiSET Akanda !",
  announcementCtaText: "S'inscrire maintenant",
  announcementCtaHref: "/inscription/candidature",
  notificationEmail: "contact@digiset-gabon.com",
  institutionEmail: "contact@digiset-gabon.com",
  institutionPhone1: "+241 07 40 00 00",
  institutionPhone2: "+241 06 60 00 00",
  institutionAddress: "Angondje, Carrefour Moussavou, Akanda — Libreville, Gabon",
};

const STORAGE_KEY = "digiset_site_settings";

export function getSiteSettings(): SiteSettings {
  if (typeof window === "undefined") return DEFAULT_SITE_SETTINGS;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...DEFAULT_SITE_SETTINGS, ...JSON.parse(saved) };
    }
  } catch {
    // Fallback aux valeurs par défaut
  }
  return DEFAULT_SITE_SETTINGS;
}

export function saveSiteSettings(settings: Partial<SiteSettings>): SiteSettings {
  const current = getSiteSettings();
  const updated = { ...current, ...settings };
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("digiset_settings_updated"));
    } catch {
      // Ignore
    }
  }
  return updated;
}

export function useSiteSettings(): [SiteSettings, (newSettings: Partial<SiteSettings>) => void] {
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    setSettings(getSiteSettings());

    const handleUpdate = () => {
      setSettings(getSiteSettings());
    };

    window.addEventListener("digiset_settings_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("digiset_settings_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    const updated = saveSiteSettings(newSettings);
    setSettings(updated);
  };

  return [settings, updateSettings];
}
