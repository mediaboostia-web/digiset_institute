"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, GraduationCap, Phone, Plus, X, Briefcase, FlaskConical, Award, Monitor, Newspaper, ChevronRight } from "lucide-react";

export function BottomNav() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  // Verrouillage du scroll sur mobile lorsque le tiroir "Plus" est ouvert
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.touchAction = "auto";
    };
  }, [drawerOpen]);

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg px-2 py-1.5 flex items-center justify-around">
        {/* Item 1 : Accueil */}
        <Link
          href="/"
          onClick={() => setDrawerOpen(false)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
            isActive("/") && !drawerOpen
              ? "text-brand-blue font-bold"
              : "text-slate-500 hover:text-brand-blue font-medium"
          }`}
        >
          <Home className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Accueil</span>
        </Link>

        {/* Item 2 : Programmes */}
        <Link
          href="/programmes"
          onClick={() => setDrawerOpen(false)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
            isActive("/programmes") && !drawerOpen
              ? "text-brand-blue font-bold"
              : "text-slate-500 hover:text-brand-blue font-medium"
          }`}
        >
          <BookOpen className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Programmes</span>
        </Link>

        {/* Item 3 : Candidature (CTA Highlighted) */}
        <Link
          href="/inscription/candidature"
          onClick={() => setDrawerOpen(false)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
            isActive("/inscription") && !drawerOpen
              ? "text-brand-orange font-bold"
              : "text-brand-orange hover:text-brand-orange-dark font-medium"
          }`}
        >
          <div className="h-7 w-7 rounded-full bg-brand-orange text-white flex items-center justify-center shadow-xs">
            <GraduationCap className="h-4 w-4" />
          </div>
          <span className="text-[10px] mt-0.5 font-bold">Candidater</span>
        </Link>

        {/* Item 4 : Contact */}
        <Link
          href="/contact"
          onClick={() => setDrawerOpen(false)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
            isActive("/contact") && !drawerOpen
              ? "text-brand-blue font-bold"
              : "text-slate-500 hover:text-brand-blue font-medium"
          }`}
        >
          <Phone className="h-5 w-5" />
          <span className="text-[10px] mt-0.5">Contact</span>
        </Link>

        {/* Item 5 : Bouton Plus (+) */}
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition-colors ${
            drawerOpen ? "text-brand-orange font-bold" : "text-slate-700 hover:text-brand-blue font-medium"
          }`}
          aria-label="Plus d'options"
        >
          <div className={`h-6 w-6 rounded-full flex items-center justify-center transition-transform duration-200 ${drawerOpen ? "rotate-45 bg-slate-100 text-brand-orange" : "bg-slate-100 text-slate-700"}`}>
            <Plus className="h-4 w-4" />
          </div>
          <span className="text-[10px] mt-0.5">Plus</span>
        </button>
      </nav>

      {/* Modal / Drawer Mobile "Plus d'options" avec Verrouillage de Défilement (Body Scroll Lock) */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div
            className="w-full bg-white rounded-t-2xl max-h-[80vh] overflow-y-auto p-5 space-y-5 shadow-2xl border-t border-slate-200 animate-in slide-in-from-bottom duration-300 pb-20"
          >
            {/* Header Drawer */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="font-heading text-base font-extrabold text-slate-900">
                Menu & Navigation — DigiSET
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1.5 rounded-full text-slate-500 hover:bg-slate-100"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Grille des raccourcis rapides */}
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/services/location-laboratoires"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-blue-50/60 border border-blue-100 hover:bg-blue-100/60 transition-colors"
              >
                <FlaskConical className="h-5 w-5 text-brand-blue shrink-0" />
                <div className="text-xs font-bold text-slate-900">Location Labos TP</div>
              </Link>

              <Link
                href="/services/consulting-it"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-orange-50/60 border border-orange-100 hover:bg-orange-100/60 transition-colors"
              >
                <Briefcase className="h-5 w-5 text-brand-orange shrink-0" />
                <div className="text-xs font-bold text-slate-900">Consulting IT</div>
              </Link>

              <Link
                href="/programmes/certifications"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/60 border border-emerald-100 hover:bg-emerald-100/60 transition-colors"
              >
                <Award className="h-5 w-5 text-emerald-700 shrink-0" />
                <div className="text-xs font-bold text-slate-900">Certifications Pro</div>
              </Link>

              <Link
                href="/programmes/digiset-online"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center gap-2.5 p-3 rounded-xl bg-sky-50/60 border border-sky-100 hover:bg-sky-100/60 transition-colors"
              >
                <Monitor className="h-5 w-5 text-sky-700 shrink-0" />
                <div className="text-xs font-bold text-slate-900">DigiSET Online</div>
              </Link>
            </div>

            {/* Navigation complète */}
            <div className="space-y-1 pt-2">
              <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground px-1 pb-1">
                Toutes les rubriques
              </div>

              <Link
                href="/programmes/classe-preparatoire"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <span>Classe Préparatoire MP2I</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>

              <Link
                href="/programmes/licence-professionnelle"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <span>Licence Professionnelle (3 options)</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>

              <Link
                href="/programmes/formation-continue"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <span>Formations Inter & Intra-Entreprises</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>

              <Link
                href="/vie-etudiante"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <span>Vie Étudiante & Campus</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>

              <Link
                href="/institution"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <span>Institution & Mot du Fondateur</span>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>

              <Link
                href="/actualites"
                onClick={() => setDrawerOpen(false)}
                className="flex items-center justify-between p-2.5 text-xs font-semibold text-slate-800 hover:bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Newspaper className="h-4 w-4 text-slate-500" />
                  <span>Actualités & Presse</span>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-400" />
              </Link>
            </div>

            {/* Inscription CTA Mobile */}
            <div className="pt-2">
              <Link
                href="/inscription/candidature"
                onClick={() => setDrawerOpen(false)}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-orange p-3.5 text-xs font-bold text-white shadow-md hover:bg-brand-orange-dark transition-colors"
              >
                Déposer ma candidature 2026-2027
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
