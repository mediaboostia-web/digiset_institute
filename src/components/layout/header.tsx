"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, X, GraduationCap, Briefcase, Award, Monitor, FlaskConical, Building2, ShieldCheck, ArrowRight } from "lucide-react";

const SEARCH_CATALOG = [
  { title: "Classe Préparatoire MP2I", category: "Formation Initiale", url: "/programmes/classe-preparatoire", desc: "Cycle préparatoire scientifique (Maths, Physique, Informatique)" },
  { title: "Licence Pro — IA & Data Science", category: "Licence Pro", url: "/programmes/licence-professionnelle/ia-data-science", desc: "Machine Learning, Deep Learning & Big Data" },
  { title: "Licence Pro — Cybersécurité", category: "Licence Pro", url: "/programmes/licence-professionnelle/cybersecurite", desc: "Sécurité des SI, Pentest, SOC & Audit" },
  { title: "Licence Pro — Systèmes de Paiement Électronique", category: "Licence Pro", url: "/programmes/licence-professionnelle/systemes-paiement", desc: "Monétique, PCI-DSS, Mobile Money & Switch" },
  { title: "Formations Continues Entreprises", category: "Executive", url: "/programmes/formation-continue", desc: "Modules courts pour professionnels & cadres DSI" },
  { title: "Certifications Pro (Cisco, AWS, Linux, Microsoft)", category: "Certifications", url: "/programmes/certifications", desc: "Examens mondiaux certifiants en visioconférence ou présentiel" },
  { title: "Location de Laboratoires TP", category: "Services", url: "/services/location-laboratoires", desc: "Mise à disposition des labos TP pour lycées et prépas" },
  { title: "Consulting IT & Audits", category: "Services", url: "/services/consulting-it", desc: "Accompagnement, SOC & projets de transformation digitale" },
  { title: "Institution & Mot du Fondateur", category: "À Propos", url: "/institution", desc: "Gouvernance 3 rangs, Conseil académique & vision" },
  { title: "Candidature Rentrée Septembre 2026", category: "Inscription", url: "/inscription/candidature", desc: "Formulaire d'inscription en ligne étudiants" },
];

export function Header() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Verrouillage strict du scroll de l'écran principal quand la recherche mobile est ouverte
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
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-white text-slate-900 shadow-md border-b border-slate-200"
          : "bg-brand-blue-dark text-white border-b border-white/10"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20 gap-3">
        
        {/* Logo Officiel Digi-SET avec Arrière-plan Transparent */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative h-11 w-36 sm:h-14 sm:w-44 bg-transparent p-1 flex items-center justify-center transition-opacity hover:opacity-90">
            <Image
              src="/brand/Digiset Logo officiel.png"
              alt="Logo Officiel Digi-SET Institute"
              width={185}
              height={60}
              className="max-h-full w-auto object-contain drop-shadow-sm"
              priority
            />
          </div>
        </Link>

        {/* Navigation Desktop — Couleur dynamique au défilement (Scroll) */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
          
          {/* Accueil */}
          <Link
            href="/"
            className={`py-2 transition-colors ${
              isScrolled ? "text-brand-orange hover:text-brand-orange-dark font-extrabold" : "text-white hover:text-brand-orange"
            }`}
          >
            Accueil
          </Link>

          {/* Mega Dropdown : Programmes */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("programmes")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/programmes"
              className={`flex items-center gap-1 py-2 transition-colors ${
                isScrolled ? "text-slate-800 hover:text-brand-orange" : "text-white hover:text-brand-orange"
              }`}
            >
              <span>Programmes</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            {activeDropdown === "programmes" && (
              <div className="absolute top-full left-0 w-80 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/programmes/classe-preparatoire"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <GraduationCap className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Classe Préparatoire MP2I</div>
                    <div className="text-[10px] text-slate-500 font-normal">Cycle 2 ans (120 ECTS)</div>
                  </div>
                </Link>

                <Link
                  href="/programmes/licence-professionnelle"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Award className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Licence Professionnelle</div>
                    <div className="text-[10px] text-slate-500 font-normal">IA, Cybersécurité, Monétique</div>
                  </div>
                </Link>

                <Link
                  href="/programmes/formation-continue"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Briefcase className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Formations Continues</div>
                    <div className="text-[10px] text-slate-500 font-normal">Entreprises & Administrations</div>
                  </div>
                </Link>

                <Link
                  href="/programmes/certifications"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Certifications Pro</div>
                    <div className="text-[10px] text-slate-500 font-normal">Cisco, AWS, Microsoft, Linux</div>
                  </div>
                </Link>

                <Link
                  href="/programmes/digiset-online"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Monitor className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">DigiSET Online</div>
                    <div className="text-[10px] text-slate-500 font-normal">Formations 100% à distance</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Mega Dropdown : Services */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("services")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/services"
              className={`flex items-center gap-1 py-2 transition-colors ${
                isScrolled ? "text-slate-800 hover:text-brand-orange" : "text-white hover:text-brand-orange"
              }`}
            >
              <span>Services</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            {activeDropdown === "services" && (
              <div className="absolute top-full left-0 w-72 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/services/location-laboratoires"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <FlaskConical className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Location de Laboratoires TP</div>
                    <div className="text-[10px] text-slate-500 font-normal">Forfaits TP pour lycées & prépas</div>
                  </div>
                </Link>

                <Link
                  href="/services/consulting-it"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Briefcase className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Consulting IT</div>
                    <div className="text-[10px] text-slate-500 font-normal">Audit, SOC & Projets digitaux</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Mega Dropdown : Stratégie et Institution */}
          <div
            className="relative py-2"
            onMouseEnter={() => setActiveDropdown("institution")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/institution"
              className={`flex items-center gap-1 py-2 transition-colors ${
                isScrolled ? "text-slate-800 hover:text-brand-orange" : "text-white hover:text-brand-orange"
              }`}
            >
              <span>Stratégie & Institution</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </Link>

            {activeDropdown === "institution" && (
              <div className="absolute top-full left-0 w-72 rounded-2xl bg-white text-slate-900 shadow-2xl border border-slate-200/90 p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <Link
                  href="/institution"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <Building2 className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Institution & Organigramme</div>
                    <div className="text-[10px] text-slate-500 font-normal">À propos, Gouvernance 3 rangs, Mot DG</div>
                  </div>
                </Link>

                <Link
                  href="/institution#strategie"
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <ShieldCheck className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">Stratégie & Partenaires</div>
                    <div className="text-[10px] text-slate-500 font-normal">Alliances technologiques & Vision</div>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Contact */}
          <Link
            href="/contact"
            className={`py-2 transition-colors ${
              isScrolled ? "text-slate-800 hover:text-brand-orange" : "text-white hover:text-brand-orange"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Barre de Recherche Interactive sur Mobile (Remplace le menu burger) */}
        <div className="lg:hidden flex-1 max-w-[210px] sm:max-w-xs">
          <button
            onClick={() => setSearchOpen(true)}
            className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-medium transition-all shadow-2xs border ${
              isScrolled
                ? "bg-slate-100/90 text-slate-600 border-slate-300 hover:bg-slate-200/90"
                : "bg-white/15 text-slate-200 border-white/20 hover:bg-white/25"
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <Search className="h-3.5 w-3.5 text-brand-orange shrink-0" />
              <span className="truncate">Rechercher...</span>
            </div>
            <span className="text-[9px] uppercase tracking-widest font-bold text-brand-orange bg-brand-orange/10 px-1.5 py-0.5 rounded-md shrink-0">
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

      {/* Modal de Recherche Mobile Ultra-Interactive avec Verrouillage Strict du Scroll */}
      {searchOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-200">
          <div className="p-4 bg-slate-900 border-b border-white/15 flex items-center justify-between gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-orange" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher une formation (ex: IA, Cybersécurité, Prépa...)"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/10 text-white text-xs placeholder:text-slate-400 border border-white/20 focus:outline-hidden focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
              />
            </div>
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 shrink-0 text-xs font-bold"
            >
              Fermer
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              {searchQuery ? `Résultats de recherche (${filteredSearch.length})` : "Formations & Services Populaires"}
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
                    className="block p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-brand-orange/50 transition-all space-y-1"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold text-white">{item.title}</span>
                      <span className="text-[10px] font-bold text-brand-orange bg-brand-orange/10 px-2 py-0.5 rounded-full border border-brand-orange/20">
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
                <p className="text-xs">Aucune formation ne correspond à &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-slate-950 border-t border-white/10">
            <Link
              href="/inscription/candidature"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-orange py-3 text-xs font-bold text-white shadow-md hover:bg-brand-orange-dark transition-colors"
            >
              Accéder au formulaire de candidature
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
