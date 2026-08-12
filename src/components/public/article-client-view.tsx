"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { ShareButtons } from "@/components/shared/share-buttons";
import { FormattedArticleBody } from "@/components/shared/formatted-article-body";
import { NewsItem, INITIAL_NEWS } from "@/lib/admin-data";
import { Calendar, ArrowLeft, Tag, Sparkles, ArrowRight, Newspaper } from "lucide-react";

function slugify(text: string): string {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeStem(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function findArticleBySlug(items: NewsItem[], slugStr: string): NewsItem | null {
  if (!items || !slugStr) return null;
  const target = slugStr.toLowerCase().trim();
  const targetSlugified = slugify(slugStr);
  const targetStem = normalizeStem(slugStr);

  // 1. Match exact slug ou slug normalisé
  let match = items.find(
    (item) => item.slug === target || slugify(item.slug) === targetSlugified
  );
  if (match) return match;

  // 2. Match par titre slugifié
  match = items.find((item) => slugify(item.title) === targetSlugified);
  if (match) return match;

  // 3. Match tolérant stem (ex: "desordre-au-gabon")
  match = items.find((item) => {
    const itemSlugStem = normalizeStem(item.slug);
    const itemTitleStem = normalizeStem(item.title);

    if (itemSlugStem === targetStem || itemTitleStem === targetStem) return true;
    if (targetStem.length > 6) {
      const prefix = targetStem.substring(0, 8);
      if (itemSlugStem.includes(prefix) || itemTitleStem.includes(prefix)) return true;
    }
    return false;
  });

  return match || null;
}

interface ArticleClientViewProps {
  rawSlug: string;
  initialArticle?: NewsItem | null;
}

export function ArticleClientView({ rawSlug, initialArticle }: ArticleClientViewProps) {
  const [article, setArticle] = useState<NewsItem | null>(initialArticle || null);
  const [isLoading, setIsLoading] = useState(!initialArticle);

  useEffect(() => {
    if (initialArticle) {
      setArticle(initialArticle);
      setIsLoading(false);
      return;
    }

    async function loadArticle() {
      setIsLoading(true);

      // 1. Cache local browser (localStorage v2 & v1)
      if (typeof window !== "undefined") {
        const cachedV2 = localStorage.getItem("digiset_news_local_cache_v2");
        const cachedV1 = localStorage.getItem("digiset_news_local_cache_v1");

        let localItems: NewsItem[] = [];
        if (cachedV2) {
          try {
            localItems = JSON.parse(cachedV2);
          } catch {}
        }
        if (localItems.length === 0 && cachedV1) {
          try {
            localItems = JSON.parse(cachedV1);
          } catch {}
        }

        if (localItems.length > 0) {
          const foundLocal = findArticleBySlug(localItems, rawSlug);
          if (foundLocal) {
            setArticle(foundLocal);
            setIsLoading(false);
            return;
          }
        }
      }

      // 2. Données initiales
      const foundInitial = findArticleBySlug(INITIAL_NEWS, rawSlug);
      if (foundInitial) {
        setArticle(foundInitial);
        setIsLoading(false);
        return;
      }

      // 3. API distante
      try {
        const res = await fetch("/api/news?status=all");
        const json = await res.json();
        if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
          const foundRemote = findArticleBySlug(json.data, rawSlug);
          if (foundRemote) {
            setArticle(foundRemote);
            if (typeof window !== "undefined") {
              localStorage.setItem("digiset_news_local_cache_v2", JSON.stringify(json.data));
            }
          }
        }
      } catch (err) {
        console.error("Erreur chargement article:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadArticle();
  }, [rawSlug, initialArticle]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-md bg-white p-8 rounded-2xl border border-slate-200 shadow-md">
          <div className="h-10 w-10 border-4 border-brand-orange border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-bold text-slate-700">Chargement de l&apos;article en cours...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 py-16 px-4 flex items-center justify-center">
        <div className="max-w-md w-full text-center space-y-5 bg-white p-8 rounded-2xl border border-slate-200 shadow-xl">
          <div className="h-16 w-16 bg-orange-50 text-brand-orange rounded-full flex items-center justify-center mx-auto">
            <Newspaper className="h-8 w-8" />
          </div>
          <div>
            <h1 className="font-heading text-xl font-bold text-slate-900">Article Non Trouvé</h1>
            <p className="text-xs text-slate-500 mt-1">
              L&apos;article recherché (&quot;{rawSlug}&quot;) n&apos;est pas disponible ou a été déplacé.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/actualites"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-blue px-5 py-2.5 text-xs font-extrabold text-white shadow-md hover:bg-brand-blue-dark transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Retour au catalogue des actualités
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <HeroSection
        badge={article.category || "Actualité Institutionnelle"}
        title={article.title}
        subtitle={article.excerpt}
        breadcrumbs={[
          { label: "Actualités", href: "/actualites" },
          { label: article.title },
        ]}
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-8">
          
          {/* Métadonnées & retour */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 text-xs text-slate-500 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 font-medium text-slate-700">
                <Calendar className="h-4 w-4 text-brand-orange" />
                <span>
                  Publié le{" "}
                  {new Date(article.published_at || article.created_at || Date.now()).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              {article.category && (
                <span className="bg-brand-blue/10 text-brand-blue font-bold px-2.5 py-0.5 rounded-full text-[11px]">
                  {article.category}
                </span>
              )}
            </div>

            <Link href="/actualites" className="inline-flex items-center gap-1 font-bold text-brand-blue hover:underline">
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour aux actualités
            </Link>
          </div>

          {/* Boutons de Partage Réseaux (Haut d'article) */}
          <ShareButtons title={article.title} />

          {/* Image de couverture */}
          {article.cover_image_url && (
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-md bg-slate-100">
              <img
                src={article.cover_image_url}
                alt={article.title}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          {/* Extrait d'introduction (Chapeau) */}
          {article.excerpt && (
            <div className="p-4 rounded-xl bg-slate-50 border-l-4 border-brand-blue text-slate-800 text-base font-semibold leading-relaxed shadow-xs">
              {article.excerpt}
            </div>
          )}

          {/* Corps de l'article avec rendu automatique des liens hypertextes SEO */}
          <div className="pt-2">
            <FormattedArticleBody content={article.body} />
          </div>

          {/* Mots-clés SEO (Tags) */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-6 border-t border-slate-100 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                <Tag className="h-3.5 w-3.5 text-brand-blue" /> Mots-clés associés :
              </div>
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 rounded-lg bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Boutons de Partage Réseaux (Bas d'article) */}
          <div className="pt-4 border-t border-slate-100">
            <ShareButtons title={article.title} />
          </div>

          {/* Bannière d'Appel à l'Action (CTA) SEO et Incitation au Clic */}
          <div className="rounded-2xl bg-gradient-to-r from-brand-blue-dark to-brand-blue p-6 sm:p-8 text-white shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-brand-orange text-xs font-extrabold uppercase tracking-wider">
              <Sparkles className="h-4 w-4" /> Formation d&apos;Excellence à Libreville
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold leading-snug">
              Prêt à intégrer les métiers du numérique avec DigiSET Institute ?
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl leading-relaxed">
              Consultez nos programmes de formation scientifique (Prépa MP2I, Licences Pro IA, Cybersécurité, Monétique) ou déposez votre candidature en ligne pour la rentrée 2026.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={article.cta_url || "/inscription/candidature"}
                className="inline-flex items-center gap-2 rounded-xl bg-brand-orange px-6 py-3 text-xs font-extrabold text-white shadow-lg hover:bg-brand-orange-dark hover:scale-105 transition-all"
              >
                {article.cta_text || "Déposer mon dossier de candidature"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/programmes/licence-professionnelle"
                className="inline-flex items-center gap-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 px-5 py-3 text-xs font-bold text-white hover:bg-white/20 transition-all"
              >
                Découvrir les Licences Pro
              </Link>
            </div>
          </div>

          {/* Liens de retour */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100 text-xs">
            <Link href="/actualites" className="font-bold text-slate-600 hover:text-brand-blue transition-colors flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Voir tous les articles
            </Link>
            <Link href="/contact" className="font-bold text-brand-blue hover:underline">
              Besoin d&apos;une information ? Contactez-nous →
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
