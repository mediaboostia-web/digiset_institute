"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/shared/hero-section";
import { Calendar, ArrowRight, Eye, Share2, Loader2 } from "lucide-react";
import { INITIAL_NEWS, NewsItem } from "@/lib/admin-data";

const STATIC_FALLBACK_ARTICLES: NewsItem[] = [
  INITIAL_NEWS[0],
  {
    id: "static-2",
    slug: "lancement-inscriptions-rentree-2026",
    title: "Lancement Officiel des Inscriptions pour la Rentrée de Septembre 2026",
    cover_image_url: "/images/img/Image_3.jpg",
    category: "Admissions & Concours",
    excerpt: "DigiSET Institute ouvre officiellement ses portes à Akanda. Les candidatures pour la Classe Préparatoire MP2I et les 3 options de Licence Pro sont désormais ouvertes en ligne.",
    body: "",
    status: "published",
    published_at: "2026-07-15T00:00:00.000Z",
    created_at: "2026-07-15T00:00:00.000Z",
  },
  {
    id: "static-3",
    slug: "partenariat-certifications-internationales",
    title: "Partenariat Stratégique avec les Acteurs Internationaux de la Certification",
    cover_image_url: "/images/img/Image_4.jpg",
    category: "Partenariats & Entreprises",
    excerpt: "Nos cursus intègrent dès la première année la préparation aux examens professionnels Cisco, AWS, Microsoft et Linux pour garantir une employabilité immédiate.",
    body: "",
    status: "published",
    published_at: "2026-07-02T00:00:00.000Z",
    created_at: "2026-07-02T00:00:00.000Z",
  },
  {
    id: "static-4",
    slug: "mise-en-service-laboratoires-akanda",
    title: "Mise en Service des Laboratoires de TP Scientifiques à Akanda",
    cover_image_url: "/images/img/Img_2.jpg",
    category: "Laboratoires & TP Scientifiques",
    excerpt: "Découvrez nos nouveaux équipements de travaux pratiques destinés aux étudiants et aux établissements de classe préparatoire partenaires.",
    body: "",
    status: "published",
    published_at: "2026-06-20T00:00:00.000Z",
    created_at: "2026-06-20T00:00:00.000Z",
  },
];

const CATEGORIES = [
  "Tous",
  "Institutionnel",
  "Admissions & Concours",
  "Formations & Certifications",
  "Vie Étudiante & Événements",
  "Partenariats & Entreprises",
  "Laboratoires & TP Scientifiques",
];

export default function ActualitesPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [articles, setArticles] = useState<NewsItem[]>(STATIC_FALLBACK_ARTICLES);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPublishedNews() {
      try {
        const res = await fetch("/api/news?status=published");
        const json = await res.json();
        if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
          setArticles(json.data);
        }
      } catch (err) {
        console.error("Erreur chargement actualités publiques:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadPublishedNews();
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === "Tous") return articles;
    return articles.filter((a) => a.category === selectedCategory);
  }, [articles, selectedCategory]);

  return (
    <div>
      <HeroSection
        badge="Presse & Événements"
        title="Actualités & Blog de DigiSET Institute"
        subtitle="Suivez toute l'actualité institutionnelle, académique et événementielle de notre établissement."
        breadcrumbs={[{ label: "Actualités" }]}
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Filtres par Catégories */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="text-xs font-bold text-slate-700">
              Filtrer par catégorie :
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
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

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 animate-pulse">
                  <div className="h-48 w-full bg-slate-200 rounded-lg" />
                  <div className="h-4 w-1/3 bg-slate-200 rounded" />
                  <div className="h-6 w-5/6 bg-slate-200 rounded" />
                  <div className="h-12 w-full bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredArticles.map((article, idx) => (
                <article
                  key={article.id || idx}
                  className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-2 hover:border-brand-blue hover:ring-4 hover:ring-brand-blue/20 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                      <Image
                        src={article.cover_image_url || "/brand/fondateur.png"}
                        alt={article.title}
                        fill
                        unoptimized
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {article.category && (
                        <div className="absolute top-3 left-3 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                          {article.category}
                        </div>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <Calendar className="h-3.5 w-3.5 text-brand-orange" />
                        <span>
                          {article.published_at
                            ? new Date(article.published_at).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })
                            : "Récemment publié"}
                        </span>
                      </div>

                      <h3 className="font-heading text-base font-bold text-slate-900 leading-snug group-hover:text-brand-blue transition-colors line-clamp-2">
                        {article.title}
                      </h3>

                      <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <Link
                      href={`/actualites/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:underline"
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
          )}

        </div>
      </section>
    </div>
  );
}
