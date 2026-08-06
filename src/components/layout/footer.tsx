import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-blue-dark text-white pt-16 pb-8 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Colonne 1 : Présentation Institut */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-lg bg-white p-1">
                <Image
                  src="/brand/logo-digiset.png"
                  alt="Digi-SET Institute Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="font-heading text-xl font-bold text-white tracking-tight">
                Digi-SET <span className="text-brand-orange">Institute</span>
              </span>
            </Link>

            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              Établissement Supérieur Privé de Référence au Gabon. Formation aux métiers du Numérique, de l&apos;Intelligence Artificielle, de la Cybersécurité et des Systèmes de Paiement Électronique.
            </p>

            <div className="space-y-2 pt-2 text-sm text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-brand-orange shrink-0 mt-1" />
                <span>Angondje, Carrefour Moussavou, Akanda — Libreville, Gabon</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-brand-orange shrink-0" />
                <span>+241 (0) 74 00 00 00 / +241 (0) 66 00 00 00</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-brand-orange shrink-0" />
                <span>contact@digiset-gabon.com</span>
              </div>
            </div>

            {/* Réseaux sociaux - SVGs propres */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-brand-orange hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-brand-orange hover:text-white transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne 2 : Programmes Académiques */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-orange">
              Programmes
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/programmes/classe-preparatoire" className="text-slate-300 hover:text-white transition-colors">
                  Classe Préparatoire MP2I
                </Link>
              </li>
              <li>
                <Link href="/programmes/licence-professionnelle" className="text-slate-300 hover:text-white transition-colors">
                  Licence Professionnelle (Bac+3)
                </Link>
              </li>
              <li className="pl-3 text-xs space-y-1.5 text-slate-400">
                <Link href="/programmes/licence-professionnelle/ia-data-science" className="block hover:text-brand-orange transition-colors">
                  • IA & Data Science
                </Link>
                <Link href="/programmes/licence-professionnelle/cybersecurite" className="block hover:text-brand-orange transition-colors">
                  • Cybersécurité
                </Link>
                <Link href="/programmes/licence-professionnelle/systemes-paiement" className="block hover:text-brand-orange transition-colors">
                  • Systèmes de Paiement
                </Link>
              </li>
              <li>
                <Link href="/programmes/formation-continue" className="text-slate-300 hover:text-white transition-colors">
                  Formations Continues (Pro)
                </Link>
              </li>
              <li>
                <Link href="/programmes/certifications" className="text-slate-300 hover:text-white transition-colors">
                  Certifications Internationales
                </Link>
              </li>
              <li>
                <Link href="/programmes/digiset-online" className="text-slate-300 hover:text-white transition-colors">
                  DigiSET Online (À distance)
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Services & Vie Étudiante */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-orange">
              Services & Campus
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/services/location-laboratoires" className="text-slate-300 hover:text-white transition-colors">
                  Location de Laboratoires TP
                </Link>
              </li>
              <li>
                <Link href="/services/consulting-it" className="text-slate-300 hover:text-white transition-colors">
                  Consulting & Conseil IT
                </Link>
              </li>
              <li>
                <Link href="/vie-etudiante" className="text-slate-300 hover:text-white transition-colors">
                  Vie étudiante & Clubs
                </Link>
              </li>
              <li>
                <Link href="/institution" className="text-slate-300 hover:text-white transition-colors">
                  Mot du Fondateur
                </Link>
              </li>
              <li>
                <Link href="/institution" className="text-slate-300 hover:text-white transition-colors">
                  Organigramme & Direction
                </Link>
              </li>
              <li>
                <Link href="/actualites" className="text-slate-300 hover:text-white transition-colors">
                  Actualités & Événements
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4 : Admissions & Liens Utiles */}
          <div>
            <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-brand-orange">
              Admissions
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/inscription" className="text-slate-300 hover:text-white transition-colors">
                  Procédure de candidature
                </Link>
              </li>
              <li>
                <Link href="/inscription/candidature" className="inline-flex items-center gap-1 font-semibold text-brand-orange hover:underline">
                  Déposer un dossier en ligne <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
              <li>
                <Link href="/programmes/formation-continue/demande" className="text-slate-300 hover:text-white transition-colors">
                  Demande de formation pro
                </Link>
              </li>
              <li>
                <Link href="/services/location-laboratoires/demande" className="text-slate-300 hover:text-white transition-colors">
                  Demande de réservation labo
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-xs text-slate-400 hover:text-slate-200 transition-colors pt-2 block">
                  Espace Administration (Accès restreint)
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} Digi-SET Institute. Tous droits réservés. Lancement officiel Septembre 2026.</p>
          <div className="flex items-center gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions Légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">
              Politique de Confidentialité
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
