"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X, GraduationCap, Briefcase, Award, Monitor, FlaskConical, Building2, ShieldCheck } from "lucide-react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-blue-dark text-white shadow-md border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-20">
        
        {/* Logo Officiel Digi-SET avec Arrière-plan Transparent */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="relative h-11 w-36 sm:h-14 sm:w-44 bg-transparent p-1 flex items-center justify-center transition-opacity hover:opacity-90">
            <Image
              src="/brand/logo-digiset.png"
              alt="Logo Digi-SET Institute"
              width={170}
              height={55}
              className="max-h-full w-auto object-contain drop-shadow-sm"
              priority
            />
          </div>
        </Link>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-6 text-xs font-bold uppercase tracking-wider">
          
          {/* Accueil */}
          <Link href="/" className="hover:text-brand-orange transition-colors py-2">
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
              className="flex items-center gap-1 hover:text-brand-orange transition-colors py-2"
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
              className="flex items-center gap-1 hover:text-brand-orange transition-colors py-2"
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
              className="flex items-center gap-1 hover:text-brand-orange transition-colors py-2"
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

          {/* Contact (Sans icône) */}
          <Link href="/contact" className="hover:text-brand-orange transition-colors py-2">
            Contact
          </Link>
        </nav>

        {/* CTA Inscription Desktop avec Effet de Changement de Couleur au Survol */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/inscription/candidature"
            className="rounded-[15px] bg-brand-orange px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-brand-orange-dark hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98"
          >
            Candidater 2026
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-white hover:text-brand-orange focus:outline-hidden"
          aria-label="Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 backdrop-blur-md border-t border-white/10 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs font-bold uppercase text-white hover:text-brand-orange"
          >
            Accueil
          </Link>
          
          <div className="space-y-1">
            <Link
              href="/programmes"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-xs font-bold uppercase text-brand-orange"
            >
              Tous les Programmes
            </Link>
            <Link
              href="/programmes/classe-preparatoire"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-3 py-1 text-xs text-slate-300 hover:text-white"
            >
              • Classe Préparatoire MP2I
            </Link>
            <Link
              href="/programmes/licence-professionnelle"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-3 py-1 text-xs text-slate-300 hover:text-white"
            >
              • Licence Professionnelle (3 options)
            </Link>
            <Link
              href="/programmes/formation-continue"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-3 py-1 text-xs text-slate-300 hover:text-white"
            >
              • Formations Continues Entreprises
            </Link>
            <Link
              href="/programmes/certifications"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-3 py-1 text-xs text-slate-300 hover:text-white"
            >
              • Certifications (Cisco, AWS, Microsoft...)
            </Link>
            <Link
              href="/programmes/digiset-online"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-3 py-1 text-xs text-slate-300 hover:text-white"
            >
              • DigiSET Online
            </Link>
          </div>

          <div className="space-y-1 pt-1 border-t border-white/10">
            <Link
              href="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-1.5 text-xs font-bold uppercase text-brand-orange"
            >
              Services & Labos
            </Link>
            <Link
              href="/services/location-laboratoires"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-3 py-1 text-xs text-slate-300 hover:text-white"
            >
              • Location de Laboratoires TP
            </Link>
            <Link
              href="/services/consulting-it"
              onClick={() => setMobileMenuOpen(false)}
              className="block pl-3 py-1 text-xs text-slate-300 hover:text-white"
            >
              • Consulting IT
            </Link>
          </div>

          <Link
            href="/institution"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs font-bold uppercase text-white hover:text-brand-orange border-t border-white/10 pt-2"
          >
            Stratégie & Institution (Organigramme)
          </Link>
          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-xs font-bold uppercase text-white hover:text-brand-orange"
          >
            Contact
          </Link>

          <div className="pt-3">
            <Link
              href="/inscription/candidature"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center rounded-[15px] bg-brand-orange py-3 text-xs font-bold uppercase tracking-wider text-white shadow-md active:scale-98 transition-transform"
            >
              Candidater Rentrée 2026
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
