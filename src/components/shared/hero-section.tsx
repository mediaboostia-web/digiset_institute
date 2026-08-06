import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export interface HeroSectionProps {
  badge?: string;
  title: string;
  subtitle: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  breadcrumbs?: { label: string; href?: string }[];
  accentTheme?: "blue" | "navy" | "orange";
  backgroundImageUrl?: string;
}

export function HeroSection({
  badge,
  title,
  subtitle,
  primaryCtaText,
  primaryCtaHref,
  secondaryCtaText,
  secondaryCtaHref,
  breadcrumbs,
  backgroundImageUrl = "/images/img/Background-image.jpg",
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 lg:py-24 bg-brand-blue-dark text-white border-b border-white/10">
      {/* Background Image légèrement plus visible avec flou léger et overlay dégradé optimisé */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 scale-105 transform blur-[1px] pointer-events-none transition-opacity duration-700"
        style={{ backgroundImage: `url('${backgroundImageUrl}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/95 via-brand-blue-dark/80 to-brand-blue-dark/95" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Fil d'Ariane (Breadcrumbs) */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="mb-6 flex items-center gap-1.5 text-xs text-slate-300">
            <Link href="/" className="hover:text-white transition-colors">
              Accueil
            </Link>
            {breadcrumbs.map((crumb, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-white transition-colors">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-semibold text-white">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <div className="max-w-3xl space-y-5">
          {/* Badge */}
          {badge && (
            <div className="inline-flex items-center rounded-full bg-white/15 border border-white/25 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-orange shadow-xs">
              {badge}
            </div>
          )}

          {/* Titre */}
          <h1 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl leading-tight text-white drop-shadow-sm">
            {title}
          </h1>

          {/* Sous-titre */}
          <p className="text-base sm:text-lg text-slate-100 leading-relaxed font-body max-w-2xl drop-shadow-xs font-medium">
            {subtitle}
          </p>

          {/* CTAs */}
          {(primaryCtaText || secondaryCtaText) && (
            <div className="pt-4 flex flex-wrap items-center gap-4">
              {primaryCtaText && primaryCtaHref && (
                <Link
                  href={primaryCtaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3.5 text-sm font-bold text-white shadow-md hover:bg-brand-orange-dark transition-all transform hover:-translate-y-0.5"
                >
                  {primaryCtaText}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              {secondaryCtaText && secondaryCtaHref && (
                <Link
                  href={secondaryCtaHref}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white hover:bg-white/20 transition-colors"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
