"use client";

import { useState } from "react";
import Link from "next/link";
import { Megaphone, ArrowRight, X } from "lucide-react";
import { useSiteSettings } from "@/lib/site-settings";

export function AnnouncementBanner() {
  const [settings] = useSiteSettings();
  const [isDismissed, setIsDismissed] = useState(false);

  if (!settings.isAnnouncementEnabled || isDismissed) {
    return null;
  }

  return (
    <div className="relative z-50 bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-blue-dark text-white py-2.5 px-4 shadow-sm border-b border-white/10 animate-in fade-in slide-in-from-top duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 text-xs font-medium">
        <div className="flex flex-1 items-center justify-center gap-3 text-center sm:justify-start">
          <span className="inline-flex items-center gap-1 rounded-full bg-brand-orange px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider text-white shadow-xs shrink-0">
            <Megaphone className="h-3 w-3" />
            Annonce
          </span>
          <p className="line-clamp-1 font-semibold text-white/95">
            {settings.announcementText}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {settings.announcementCtaText && (
            <Link
              href={settings.announcementCtaHref || "/inscription/candidature"}
              className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-3 py-1 text-xs font-bold text-white hover:bg-white hover:text-brand-blue-dark transition-all shadow-xs"
            >
              <span>{settings.announcementCtaText}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}

          <button
            onClick={() => setIsDismissed(true)}
            className="rounded-md p-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors focus:outline-none"
            title="Fermer la bannière"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
