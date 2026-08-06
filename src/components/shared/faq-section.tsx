"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, X, ArrowRight, MessageSquare } from "lucide-react";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqSectionProps {
  title?: string;
  subtitle?: string;
  items?: FaqItem[];
}

const SIMPLE_5_FAQS: FaqItem[] = [
  {
    question: "1. Quelles sont les conditions d'admission pour la rentrée 2026 ?",
    answer:
      "Pour la Classe Préparatoire MP2I (Bac+2), l'admission est ouverte aux bacheliers scientifiques (Bac C, D, S, E) sur étude de dossier. Pour la Licence Professionnelle (Bac+3), l'admission est accessible aux titulaires d'un Bac+2 scientifique ou technique (Prépa MP2I, BTS, DUT Informatique).",
  },
  {
    question: "2. Les diplômes et certifications de Digi-SET sont-ils reconnus ?",
    answer:
      "Oui. Les diplômes délivrent 60 crédits ECTS par an (transférables en Europe et en Afrique). De plus, nos cursus intègrent la préparation directe aux examens certifiants mondiaux Cisco CCNA, AWS Academy, Microsoft Azure, Linux LPIC et CompTIA Security+.",
  },
  {
    question: "3. Où se situe exactement le campus Digi-SET Institute ?",
    answer:
      "Le campus moderne de Digi-SET Institute est situé à Akanda, au Carrefour Moussavou (Angondje) — Libreville, Gabon. Il héberge des salles informatiques haut débit et des laboratoires de TP scientifiques complets.",
  },
  {
    question: "4. Peut-on suivre la formation à distance avec DigiSET Online ?",
    answer:
      "Oui. DigiSET Online permet de suivre l'intégralité des cours à distance via une plateforme interactive LMS avec visioconférences, cours vidéo enregistrés, travaux dirigés en ligne et suivi par un tuteur dédié.",
  },
  {
    question: "5. Comment les entreprises et lycées peuvent-ils faire une demande ?",
    answer:
      "Des formulaires en ligne distincts sont à disposition : 'Demande de Formation Continue' pour les entreprises et 'Demande de Réservation TP' pour les lycées. Notre secrétariat répond et établit les devis sous 24h ouvrées.",
  },
];

export function FaqSection({
  title = "Foire Aux Questions",
  subtitle = "Les 5 questions essentielles à connaître sur Digi-SET Institute, nos admissions et notre campus.",
  items = SIMPLE_5_FAQS,
}: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-slate-50 border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* Colonne Gauche : Titre + Carte Secrétariat / Orientation (avec photo dédiée Image7.jpg) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100 mb-3">
                <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
                FAQs & orientation
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Carte Secrétariat / Orientation avec photo dédiée Dr Sylvie Nguema / Image7.jpg */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="relative h-14 w-14 rounded-full overflow-hidden border-2 border-brand-orange bg-slate-100 shrink-0">
                  <Image
                    src="/images/img/Image7.jpg"
                    alt="Secrétariat Académique Digi-SET"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <div className="font-heading text-sm font-bold text-slate-900">
                    Secrétariat & Admissions
                  </div>
                  <div className="text-[11px] text-slate-500 font-medium">
                    Orientation & Conseil Académique
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Une question sur la constitution de votre dossier ou les frais de scolarité ? Notre secrétariat académique vous accueille et vous guide.
              </p>

              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-5 py-3 text-xs font-bold text-white shadow-sm hover:bg-brand-orange-dark transition-all transform hover:-translate-y-0.5"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Contacter le Secrétariat</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Colonne Droite : Les 5 questions simples */}
          <div className="lg:col-span-7 space-y-3">
            {items.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "border-brand-blue/30 bg-white shadow-md"
                      : "border-slate-200 bg-white hover:border-slate-300 shadow-2xs"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 text-left gap-4 cursor-pointer"
                  >
                    <span className="font-heading text-sm font-bold text-slate-900">
                      {faq.question}
                    </span>
                    <div
                      className={`h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? "bg-brand-blue text-white" : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {isOpen ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
