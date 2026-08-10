import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HeroSection } from "@/components/shared/hero-section";
import { ShareButtons } from "@/components/shared/share-buttons";
import { FormattedArticleBody } from "@/components/shared/formatted-article-body";
import { INITIAL_NEWS, NewsItem } from "@/lib/admin-data";
import { Calendar, ArrowLeft, Tag, Sparkles, ArrowRight } from "lucide-react";

async function getArticleBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/news?slug=${slug}&status=published`, {
      cache: "no-store",
    });
    if (res.ok) {
      const json = await res.json();
      if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
        return json.data[0];
      }
    }
  } catch (err) {
    console.error("Erreur récupération article par slug:", err);
  }

  // Fallback sur la liste statique
  const fallbackMatch = INITIAL_NEWS.find((n) => n.slug === slug);
  return fallbackMatch || INITIAL_NEWS[0];
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
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
              <Image
                src={article.cover_image_url}
                alt={article.title}
                fill
                className="object-cover"
                priority
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
