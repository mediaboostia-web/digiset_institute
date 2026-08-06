import Link from "next/link";
import { Clock, GraduationCap, Award, ArrowRight, CheckCircle2 } from "lucide-react";

export interface ProgramCardProps {
  id?: string;
  title: string;
  category: "Initiale" | "Licence Pro" | "Continue" | "Certification" | "Online";
  description: string;
  duration: string;
  badge?: string;
  ects?: string;
  targetPublic: string;
  highlights?: string[];
  href: string;
  ctaText?: string;
  isCatalogCard?: boolean;
}

export function ProgramCard({
  title,
  category,
  description,
  duration,
  badge,
  ects,
  targetPublic,
  highlights = [],
  href,
  ctaText = "Découvrir le programme",
  isCatalogCard = true,
}: ProgramCardProps) {
  const getCategoryBadgeStyle = () => {
    switch (category) {
      case "Initiale":
        return "bg-blue-50 text-brand-blue border-blue-200";
      case "Licence Pro":
        return "bg-indigo-50 text-indigo-700 border-indigo-200";
      case "Continue":
        return "bg-orange-50 text-brand-orange-dark border-orange-200";
      case "Certification":
        return "bg-emerald-50 text-emerald-800 border-emerald-200";
      case "Online":
        return "bg-sky-50 text-sky-800 border-sky-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const hoverStyle = isCatalogCard
    ? "hover:border-2 hover:border-brand-blue hover:ring-4 hover:ring-brand-blue/20 hover:-translate-y-2 hover:shadow-2xl hover:z-20"
    : "hover:border-slate-300 hover:shadow-md";

  return (
    <div className={`group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-xs transition-all duration-300 ${hoverStyle}`}>
      <div>
        {/* Header de la carte : Badges & Catégorie */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${getCategoryBadgeStyle()}`}>
            {category}
          </span>
          {ects && (
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-700">
              <Award className="h-3 w-3 text-brand-blue" />
              {ects} ECTS
            </span>
          )}
          {badge && !ects && (
            <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
              {badge}
            </span>
          )}
        </div>

        {/* Titre */}
        <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-brand-blue transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Description */}
        <p className="mt-2.5 text-sm text-muted-foreground line-clamp-3 leading-relaxed">
          {description}
        </p>

        {/* Meta info : Durée & Public */}
        <div className="mt-4 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <Clock className="h-3.5 w-3.5 text-brand-blue shrink-0" />
            <span><strong>Durée :</strong> {duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-3.5 w-3.5 text-brand-blue shrink-0" />
            <span><strong>Public :</strong> {targetPublic}</span>
          </div>
        </div>

        {/* Points clés */}
        {highlights.length > 0 && (
          <ul className="mt-4 space-y-1.5 text-xs text-slate-700">
            {highlights.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-start gap-1.5">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA Footer */}
      <div className="mt-6 pt-4 border-t border-slate-100">
        <Link
          href={href}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-50 border border-slate-200 px-4 py-2.5 text-xs font-bold text-brand-blue-dark group-hover:bg-brand-blue group-hover:border-brand-blue group-hover:text-white transition-all duration-200"
        >
          {ctaText}
          <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
