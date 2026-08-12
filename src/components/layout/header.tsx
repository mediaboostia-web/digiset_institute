"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, GraduationCap, Briefcase, Award, Monitor, FlaskConical, Building2, ShieldCheck, ArrowRight, X } from "lucide-react";
import { AnnouncementBanner } from "@/components/layout/announcement-banner";

const SEARCH_CATALOG = [
  { title: "Classe Préparatoire MP2I", category: "Formation Initiale", url: "/programmes/classe-preparatoire", desc: "Cycle préparatoire scientifique (Maths, Physique, Informatique)" },
  { title: "Licence Pro — IA & Data Science", category: "Licence Pro", url: "/programmes/licence-professionnelle/ia-data-science", desc: "Machine Learning, Deep Learning & Big Data" },
  { title: "Licence Pro — Cybersécurité", category: "Licence Pro", url: "/programmes/licence-professionnelle/cybersecurite", desc: "Sécurité des SI, Pentest, SOC & Audit" },
  { title: "Licence Pro — Systèmes de Paiement Électronique", category: "Licence Pro", url: "/programmes/licence-professionnelle/systemes-paiement", desc: "Monétique, PCI-DSS, Mobile Money & Switch" },
  { title: "Formations Inter & Intra-Entreprises", category: "Formation Continue", url: "/programmes/formation-continue", desc: "Formations sur-mesure inter et intra-entreprises pour professionnels & cadres DSI" },
  { title: "Certifications Pro (Cisco, AWS, Linux, Microsoft)", category: "Certifications", url: "/programmes/certifications", desc: "Examens mondiaux certifiants en visioconférence ou présentiel" },
  { title: "Consulting IT & Audits", category: "Services", url: "/services/consulting-it", desc: "Accompagnement, SOC & projets de transformation digitale" },
  { title: "Location de Laboratoires TP", category: "Services", url: "/services/location-laboratoires", desc: "Mise à disposition des labos TP pour lycées et prépas" },
  { title: "Institution & Mot du Fondateur", category: "À Propos", url: "/institution", desc: "Gouvernance 3 rangs, Conseil académique & vision" },
  { title: "Actualités & Articles", category: "Presse", url: "/actualites", desc: "Toute l'actualité institutionnelle et académique de DigiSET Institute" },
  { title: "Candidature Rentrée Septembre 2026", category: "Inscription", url: "/inscription/candidature", desc: "Formulaire d'inscription en ligne étudiants" },
];

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY <= 20) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Verrouillage du scroll quand le panneau de recherche est ouvert
  useEffect(() => {
    if (searchOpen) {
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
  }, [searchOpen]);

  const filteredSearch = SEARCH_CATALOG.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full bg-white text-slate-900 border-b border-slate-200/80 shadow-xs transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <AnnouncementBanner />
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-6 lg:px-8 h-16 sm:h-20 gap-2 sm:gap-3">
        
        {/* Logo Officiel DigiSET */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="relative h-10 w-32 sm:h-14 sm:w-44 bg-transparent p-0.5 flex items-center justify-center transition-opacity hover:opacity-90">
            <Image
              src="/brand/Digiset Logo officiel.png"
              alt="Logo Officiel DigiSET Institute"
              width={185}
              height={60}
              className="max-h-full w-auto object-contain drop-shadow-xs"
              priority
            />
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
          <Link href="/" className="py-2 text-slate-800 hover:text-brand-orange transition-colors font-extrabold">
            Accueil
          </Link>

          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("programmes")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link href="/programmes" className="flex items-center gap-1 py-2 text-slate-800 hover:text-brand-orange transition-colors">
              <span>Programmes</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            {activeDropdown === "programmes" && (
              <div className="absolute top-full left-0 w-80 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link href="/programmes/classe-preparatoire" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <GraduationCap className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Classe Préparatoire MP2I</div>
                    <div className="text-[10px] text-slate-500 font-normal">Formation Initiale (2 ans)</div>
                  </div>
                </Link>

                <Link href="/programmes/licence-professionnelle" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <Award className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Licences Professionnelles</div>
                    <div className="text-[10px] text-slate-500 font-normal">IA, Cybersécurité, Monétique</div>
                  </div>
                </Link>

                <Link href="/programmes/formation-continue" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <Briefcase className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Formations Inter & Intra-Entreprises</div>
                    <div className="text-[10px] text-slate-500 font-normal">Entreprises & Administrations</div>
                  </div>
                </Link>

                <Link href="/programmes/certifications" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Certifications Pro</div>
                    <div className="text-[10px] text-slate-500 font-normal">Cisco, AWS, Microsoft, Linux</div>
                  </div>
                </Link>

                <Link href="/programmes/digiset-online" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <Monitor className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">DigiSET Online</div>
                    <div className="text-[10px] text-slate-500 font-normal">Formations 100% à distance</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link href="/services/consulting-it" className="flex items-center gap-1 py-2 text-slate-800 hover:text-brand-orange transition-colors">
              <span>Services</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            {activeDropdown === "services" && (
              <div className="absolute top-full left-0 w-80 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link href="/services/consulting-it" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <Briefcase className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Consulting IT & Transformation</div>
                    <div className="text-[10px] text-slate-500 font-normal">Audit SI, SOC & Accompagnement</div>
                  </div>
                </Link>

                <Link href="/programmes/formation-continue" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <Building2 className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Formations Inter et Intra-Entreprises</div>
                    <div className="text-[10px] text-slate-500 font-normal">Formations professionnelles sur-mesure</div>
                  </div>
                </Link>

                <Link href="/services/location-laboratoires" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors opacity-80">
                  <FlaskConical className="h-5 w-5 text-slate-500 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">Location de Laboratoires TP</div>
                    <div className="text-[10px] text-slate-500 font-normal">Forfaits TP pour lycées & prépas</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("institution")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link href="/institution" className="flex items-center gap-1 py-2 text-slate-800 hover:text-brand-orange transition-colors">
              <span>Stratégie & Institution</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            {activeDropdown === "institution" && (
              <div className="absolute top-full left-0 w-72 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link href="/institution" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <Building2 className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Institution & Organigramme</div>
                    <div className="text-[10px] text-slate-500 font-normal">À propos, Gouvernance, Mot du Fondateur</div>
                  </div>
                </Link>

                <Link href="/institution#strategie" className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors">
                  <ShieldCheck className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Stratégie & Partenaires</div>
                    <div className="text-[10px] text-slate-500 font-normal">Alliances technologiques & Vision</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <Link href="/actualites" className="py-2 text-slate-800 hover:text-brand-orange transition-colors">
            Actualités
          </Link>

          <Link href="/contact" className="py-2 text-slate-800 hover:text-brand-orange transition-colors">
            Contact
          </Link>
        </nav>

        {/* BARRE DE RECHERCHE INTERACTIVE VISIBLE SUR MOBILE */}
        <div className="lg:hidden flex items-center gap-2 flex-1 justify-end max-w-[190px] sm:max-w-xs">
          <button
            onClick={() => setSearchOpen(true)}
            type="button"
            className="w-full flex items-center justify-between gap-1.5 px-3 py-1.5 sm:py-2 rounded-xl text-xs font-semibold transition-all shadow-2xs border bg-slate-100/90 text-slate-700 border-slate-300 hover:bg-slate-200 cursor-pointer active:scale-95"
            title="Rechercher sur tout le site"
          >
            <div className="flex items-center gap-1.5 truncate">
              <Search className="h-4 w-4 text-brand-orange shrink-0" />
              <span className="truncate text-[11px] font-bold text-slate-800">Rechercher...</span>
            </div>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-white bg-brand-orange px-1.5 py-0.5 rounded shrink-0 shadow-2xs">
              Go
            </span>
          </button>
        </div>

        {/* CTA Inscription Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/inscription/candidature"
            className="rounded-[15px] bg-brand-orange px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-brand-orange-dark hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98"
          >
            Candidater 2026
          </Link>
        </div>

      </div>

      {/* OVERLAY PLEIN ÉCRAN FLUIDE SANS DÉBORDEMENT SUR MOBILE */}
      {searchOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] w-screen h-[100dvh] flex flex-col bg-slate-950 text-white animate-in fade-in duration-200">
          <div className="p-3.5 bg-slate-900 border-b border-white/15 flex items-center justify-between gap-2 shrink-0">
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-orange" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher (ex: IA, Cybersécurité...)..."
                className="w-full pl-9 pr-8 py-2 rounded-xl bg-white/10 text-white text-xs placeholder:text-slate-400 border border-white/20 focus:outline-none focus:border-brand-orange font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              className="px-3 py-2 rounded-xl bg-white/15 text-white hover:bg-white/25 shrink-0 text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              <span>Fermer</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-[10px] font-bold uppercase tracking-wider text-brand-orange">
              {searchQuery ? `Résultats (${filteredSearch.length})` : "Formations & Services Populaires"}
            </div>

            {filteredSearch.length > 0 ? (
              <div className="space-y-2">
                {filteredSearch.map((item, i) => (
                  <Link
                    key={i}
                    href={item.url}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="block p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-orange/50 transition-all space-y-1 cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-white">{item.title}</span>
                      <span className="text-[9px] font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full border border-brand-orange/20">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-body">{item.desc}</p>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 space-y-2 text-slate-400">
                <Search className="h-8 w-8 mx-auto opacity-40 text-brand-orange" />
                <p className="text-xs">Aucun résultat ne correspond à &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>

          <div className="p-3 bg-slate-950 border-t border-white/10 shrink-0">
            <Link
              href="/inscription/candidature"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-orange py-2.5 text-xs font-bold text-white shadow-md hover:bg-brand-orange-dark transition-colors"
            >
              <span>Accéder à l&apos;inscription en ligne</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
