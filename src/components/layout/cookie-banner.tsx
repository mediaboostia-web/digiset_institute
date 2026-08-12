"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check, ShieldCheck } from "lucide-react";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("digiset_cookie_consent");
      if (!consent) {
        // Petit délai d'apparition pour un effet fluide
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("digiset_cookie_consent", "all");
    }
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("digiset_cookie_consent", "essential");
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Consentement aux cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 animate-in slide-in-from-bottom-5 fade-in duration-300"
    >
      <div className="rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-2xl backdrop-blur-md text-slate-800">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-blue/10 text-brand-blue shrink-0">
              <Cookie className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold text-slate-900 leading-tight">
                Respect de votre vie privée
              </h3>
              <p className="text-[11px] font-medium text-slate-500 flex items-center gap-1 mt-0.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Cookies & Expérience Utile
              </p>
            </div>
          </div>
          <button
            onClick={handleAcceptEssential}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            title="Fermer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          DigiSET Institute utilise des cookies essentiels pour assurer le bon fonctionnement du site, la sécurité des candidatures et mesurer notre audience.
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAcceptAll}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-xl bg-brand-orange px-3 py-2 text-xs font-bold text-white shadow-xs hover:bg-brand-orange-dark transition-all cursor-pointer"
          >
            <Check className="h-4 w-4" />
            Accepter tout
          </button>
          <button
            onClick={handleAcceptEssential}
            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-all cursor-pointer"
          >
            Essentiels uniquement
          </button>
        </div>

        <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500 font-medium">
          <Link
            href="/politique-de-confidentialite"
            className="underline hover:text-brand-blue transition-colors"
          >
            Politique de confidentialité
          </Link>
          <Link
            href="/mentions-legales"
            className="underline hover:text-brand-blue transition-colors"
          >
            Mentions légales
          </Link>
        </div>
      </div>
    </aside>
  );
}
