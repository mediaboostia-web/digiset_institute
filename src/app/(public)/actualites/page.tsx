"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/shared/hero-section";
import { Calendar, ArrowRight, Eye, Share2, Sparkles, Filter, Search, X } from "lucide-react";
import { INITIAL_NEWS, NewsItem } from "@/lib/admin-data";
import { Input } from "@/components/ui/input";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [articles, setArticles] = useState<NewsItem[]>(INITIAL_NEWS);
  const [isLoading, setIsLoading] = useState(true);

  const LOCAL_STORAGE_NEWS_KEY = "digiset_news_local_cache_v2";

  useEffect(() => {
    async function loadPublishedNews() {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(LOCAL_STORAGE_NEWS_KEY);
        if (cached) {
          try {
            const parsed = JSON.parse(cached);
            if (Array.isArray(parsed) && parsed.length > 0) {
              const publishedOnly = parsed.filter((a: NewsItem) => a.status === "published");
              if (publishedOnly.length > 0) {
                setArticles(publishedOnly);
                setIsLoading(false);
              }
            }
          } catch {
            // Ignorer
          }
        }
      }

      try {
        const res = await fetch("/api/news?status=published");
        const json = await res.json();
        if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
          setArticles(json.data);
          if (typeof window !== "undefined") {
            localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(json.data));
          }
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
    return articles.filter((a) => {
      const matchesCategory = selectedCategory === "Tous" || a.category === selectedCategory;
      if (!matchesCategory) return false;

      if (searchQuery.trim() === "") return true;
      const q = searchQuery.toLowerCase().trim();
      return (
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        (a.tags && a.tags.some((t) => t.toLowerCase().includes(q)))
      );
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div>
      <HeroSection
        badge="Presse & Événements"
        title="Actualités & Blog de DigiSET Institute"
        subtitle="Suivez toute l'actualité institutionnelle, académique et événementielle de notre établissement."
        breadcrumbs={[{ label: "Actualités" }]}
      />

      <section className="py-10 sm:py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          
          {/* BARRE DE RECHERCHE MOBILE & DESKTOP VISIBLE ET 100% FONCTIONNELLE */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5 shadow-2xs space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-brand-orange" />
              <Input
                type="text"
                placeholder="Rechercher un article, un sujet (ex: Cybersécurité, IA, Concours 2026...)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 h-11 rounded-xl text-xs sm:text-sm bg-white border-slate-200 shadow-2xs focus:border-brand-blue font-medium text-slate-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* BARRE DE FILTRES PAR CATÉGORIES — DEFILEMENT FLUIDE ET RESPONSIVE */}
            <div className="space-y-2 pt-1 border-t border-slate-200/80">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Filter className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                <span>Catégories d'articles :</span>
              </div>

              <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar sm:flex-wrap -mx-2 px-2 sm:mx-0 sm:px-0">
                {CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`shrink-0 whitespace-nowrap rounded-xl px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer shadow-2xs ${
                        isSelected
                          ? "bg-brand-blue text-white shadow-md ring-2 ring-brand-blue/30"
                          : "bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200"
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4 animate-pulse">
                  <div className="h-48 w-full bg-slate-200 rounded-xl" />
                  <div className="h-4 w-1/3 bg-slate-200 rounded" />
                  <div className="h-6 w-5/6 bg-slate-200 rounded" />
                  <div className="h-12 w-full bg-slate-200 rounded" />
                </div>
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="py-16 text-center border rounded-2xl bg-slate-50 space-y-3">
              <Sparkles className="h-8 w-8 text-brand-orange mx-auto" />
              <h3 className="font-heading text-base font-bold text-slate-900">
                Aucun article ne correspond à votre recherche
              </h3>
              <p className="text-xs text-slate-500">
                Essayez d'autres mots-clés ou modifiez la catégorie sélectionnée.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("Tous");
                  setSearchQuery("");
                }}
                className="mt-2 text-xs font-bold text-brand-blue hover:underline"
              >
                Réinitialiser la recherche →
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article, idx) => (
                <article
                  key={article.id || idx}
                  className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-brand-blue hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
                >
                  <Link href={`/actualites/${article.slug}`} className="block flex-1">
                    {/* Cover Image */}
                    <div className="relative h-52 w-full bg-slate-100 overflow-hidden border-b border-slate-100">
                      <img
                        src={article.cover_image_url || "/brand/fondateur.png"}
                        alt={article.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {article.category && (
                        <div className="absolute top-3 left-3 bg-brand-orange text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                          {article.category}
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                        <Calendar className="h-3.5 w-3.5 text-brand-orange shrink-0" />
                        <span>
                          {article.published_at
                            ? new Date(article.published_at).toLocaleDateString("fr-FR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              })
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
                  </Link>

                  {/* Card Action Link (100% Clickable) */}
                  <div className="p-6 pt-0 border-t border-slate-100 mt-2 flex items-center justify-between">
                    <Link
                      href={`/actualites/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:text-brand-orange-dark hover:gap-2 transition-all"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      Lire l&apos;article complet
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>

                    <Link
                      href={`/actualites/${article.slug}`}
                      className="text-xs font-semibold text-slate-400 hover:text-brand-blue flex items-center gap-1"
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
