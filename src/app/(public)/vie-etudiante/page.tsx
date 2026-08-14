"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/shared/hero-section";
import { FaqSection } from "@/components/shared/faq-section";
import { Users, Award, BookOpen, Download, Calendar, Share2, Eye } from "lucide-react";

const ARTICLES = [
  {
    slug: "lancement-inscriptions-rentree-2026",
    title: "Lancement Officiel des Inscriptions pour la Rentrée d'Octobre 2026",
    date: "15 Juillet 2026",
    category: "Scolarité",
    image: "/images/img/Image_3.jpg",
    excerpt: "DigiSET Institute ouvre officiellement ses portes à Akanda. Les candidatures pour la Classe Préparatoire MP2I et les 3 options de Licence Pro sont désormais ouvertes en ligne.",
  },
  {
    slug: "partenariat-certifications-internationales",
    title: "Partenariat Stratégique avec les Acteurs Internationaux de la Certification",
    date: "02 Juillet 2026",
    category: "Partenariats",
    image: "/images/img/Image_4.jpg",
    excerpt: "Nos cursus intègrent dès la première année la préparation aux examens professionnels Cisco, AWS, Microsoft et Linux pour garantir une employabilité immédiate.",
  },
  {
    slug: "mise-en-service-laboratoires-akanda",
    title: "Mise en Service des Laboratoires de TP Scientifiques à Akanda",
    date: "20 Juin 2026",
    category: "Campus & Vie Étudiante",
    image: "/images/img/Img_2.jpg",
    excerpt: "Découvrez nos nouveaux équipements de travaux pratiques destinés aux étudiants et aux établissements de classe préparatoire partenaires.",
  },
  {
    slug: "securite-monetique-et-pci-dss-conference",
    title: "Conférence sur la Monétique et la Sécurité des Paiements au Gabon",
    date: "05 Juin 2026",
    category: "Ateliers & Conférences",
    image: "/images/img/Image6.jpg",
    excerpt: "Retour sur le séminaire dédié aux experts bancaires et acteurs du Mobile Money à Libreville.",
  },
  {
    slug: "atelier-data-science-et-ia-generative",
    title: "Atelier Pratique sur la Data Science et l'IA Générative sur le Campus",
    date: "18 Mai 2026",
    category: "Campus & Vie Étudiante",
    image: "/images/img/Image7.jpg",
    excerpt: "Une journée d'immersion technique pour les étudiants et passionnés d'apprentissage automatique.",
  },
];

const CATEGORIES = ["Tous", "Campus & Vie Étudiante", "Scolarité", "Partenariats", "Ateliers & Conférences"];

const STUDENT_FAQS = [
  {
    question: "Comment se déroulent les inscriptions à DigiSET Institute ?",
    answer: "Les inscriptions s'effectuent en ligne via le formulaire de candidature ou directement sur le campus d'Akanda. Une étude de dossier est réalisée sous 48h.",
  },
  {
    question: "Quels sont les équipements mis à disposition des étudiants ?",
    answer: "Les étudiants disposent d'un accès libre aux salles informatiques (Linux/Windows), aux laboratoires de physique et de cybersécurité, au Wi-Fi haut débit et à la bibliothèque numérique.",
  },
  {
    question: "Les stages en entreprise sont-ils obligatoires ?",
    answer: "Oui, un stage pratique obligatoire de 8 semaines en Classe Prépa MP2I et de 12 semaines en Licence Professionnelle est requis pour la validation du diplôme.",
  },
  {
    question: "Quels sont les clubs et associations du campus ?",
    answer: "Le campus héberge le Club CyberSec, le Club IA & Robotique, le Club de Développement Web/Mobile et l'Association des Étudiants de DigiSET.",
  },
];

export default function VieEtudiantePage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "Tous") return ARTICLES;
    return ARTICLES.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div>
      <HeroSection
        badge="Campus & Communauté"
        title="Vie Étudiante & Actualités du Campus"
        subtitle="Un cadre d'apprentissage moderne, dynamique et épanouissant au cœur de la commune d'Akanda."
        breadcrumbs={[{ label: "Vie Étudiante" }]}
        primaryCtaText="Déposer un dossier d'inscription"
        primaryCtaHref="/inscription/candidature"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Les 3 Piliers de la Vie Étudiante */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <Users className="h-8 w-8 text-brand-blue" />
              <h3 className="font-heading text-base font-bold text-slate-900">Clubs & Associations</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Participez aux hackathons, aux journées scientifiques et aux projets collaboratifs des clubs Cyber, IA et Robotique.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <Award className="h-8 w-8 text-brand-orange" />
              <h3 className="font-heading text-base font-bold text-slate-900">Accompagnement & Tutorat</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Un suivi pédagogique personnalisé et des séances de mentorat avec des professionnels du secteur numérique.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3 shadow-xs">
              <BookOpen className="h-8 w-8 text-emerald-600" />
              <h3 className="font-heading text-base font-bold text-slate-900">Insertion & Stages</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Service dédié au placement en entreprise, préparation aux entretiens et réseau de partenaires industriels au Gabon.
              </p>
            </div>
          </div>

          {/* SECTION BLOG & ACTUALITÉS INTÉGRÉE AVEC FILTRES ET CATÉGORIES */}
          <div className="space-y-6 pt-4 border-t border-slate-100">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
                  Blog & Événements
                </span>
                <h2 className="font-heading text-2xl font-extrabold text-slate-900 mt-2">
                  Actualités & Vie du Campus
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  Découvrez les derniers articles, retours d&apos;expérience et annonces du campus.
                </p>
              </div>

              {/* Filtres par Catégorie */}
              <div className="flex flex-wrap items-center gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                      selectedCategory === cat
                        ? "bg-brand-blue text-white shadow-xs"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Grille des Articles de Blog */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles.map((article, idx) => (
                <article
                  key={idx}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-slate-300 hover:shadow-md transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                        {article.category}
                      </div>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <Calendar className="h-3.5 w-3.5 text-brand-orange" />
                        <span>{article.date}</span>
                      </div>
                      <h3 className="font-heading text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <Link
                      href={`/actualites/${article.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-orange hover:underline"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Consulter l&apos;article
                    </Link>

                    <Link
                      href={`/actualites/${article.slug}`}
                      className="text-xs font-semibold text-slate-500 hover:text-brand-blue flex items-center gap-1"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      Partager
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Documents Téléchargeables */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4">
            <div className="flex items-center gap-2 font-heading text-base font-bold text-slate-900">
              <Download className="h-5 w-5 text-brand-blue" />
              <span>Documents Utiles à Télécharger</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-bold">Brochure Institutionnelle 2026</strong>
                  <span className="text-[10px] text-slate-500">PDF — 2.4 Mo</span>
                </div>
                <button className="text-brand-blue font-bold hover:underline cursor-pointer">Télécharger</button>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-bold">Règlement Intérieur du Campus</strong>
                  <span className="text-[10px] text-slate-500">PDF — 1.1 Mo</span>
                </div>
                <button className="text-brand-blue font-bold hover:underline cursor-pointer">Télécharger</button>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 flex items-center justify-between">
                <div>
                  <strong className="block text-slate-900 font-bold">Guide de la Rentrée Octobre 2026</strong>
                  <span className="text-[10px] text-slate-500">PDF — 1.8 Mo</span>
                </div>
                <button className="text-brand-blue font-bold hover:underline cursor-pointer">Télécharger</button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* FaqSection dédiée inspirée de Capture 4 */}
      <FaqSection
        title="FAQ — Vie Étudiante & Campus"
        subtitle="Des questions sur votre quotidien à DigiSET Institute ? Consulez les questions d'étudiants."
        items={STUDENT_FAQS}
      />
    </div>
  );
}
