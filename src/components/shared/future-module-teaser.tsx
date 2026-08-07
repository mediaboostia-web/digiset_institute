"use client";

import Link from "next/link";
import { Sparkles, ArrowRight, ShieldAlert, Rocket, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FutureModuleTeaserProps {
  title: string;
  category: string;
  version: "Version 2.0" | "Version 3.0";
  icon: React.ElementType;
  marketingHeadline: string;
  description: string;
  benefits: string[];
}

export function FutureModuleTeaser({
  title,
  category,
  version,
  icon: Icon,
  marketingHeadline,
  description,
  benefits,
}: FutureModuleTeaserProps) {
  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Bannière de notification élégante */}
      <div className="flex flex-col gap-4 rounded-2xl border border-brand-blue/20 bg-gradient-to-r from-brand-blue-dark via-[#00428C] to-brand-blue p-6 text-white shadow-md sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-brand-orange backdrop-blur-xs">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <span className="inline-block rounded-full bg-brand-orange/20 px-3 py-0.5 text-[11px] font-extrabold text-brand-orange border border-brand-orange/30">
                {category} • {version}
              </span>
              <h1 className="font-heading text-xl font-bold text-white sm:text-2xl mt-1">
                {title}
              </h1>
            </div>
          </div>
          <span className="hidden sm:flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90 backdrop-blur-xs">
            <Sparkles className="h-4 w-4 text-amber-300" /> Module en développement
          </span>
        </div>

        <div className="mt-2 space-y-2 border-t border-white/10 pt-4">
          <h2 className="font-heading text-base font-bold text-amber-300">
            {marketingHeadline}
          </h2>
          <p className="text-xs text-white/80 leading-relaxed max-w-2xl">
            {description}
          </p>
        </div>
      </div>

      {/* Carte des Bénéfices & Roadmap */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs sm:p-8 space-y-6">
        <h3 className="font-heading text-sm font-bold text-gray-900 uppercase tracking-wider text-brand-blue-dark">
          Ce que ce module permettra à Digi-SET Institute :
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 border border-gray-100">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
              <span className="text-xs font-medium text-gray-800 leading-relaxed">
                {benefit}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Rocket className="h-4 w-4 text-brand-orange" />
            <span>Déploiement prévu lors de la prochaine mise à jour du portail.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button asChild variant="outline" className="w-full sm:w-auto text-xs font-bold border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
              <Link href="/admin/soumissions">
                Gérer les soumissions V1 <ArrowRight className="ml-2 h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
