"use client";

import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  Rocket,
  CheckCircle2,
  GraduationCap,
  MessageSquareQuote,
  Image as ImageIcon,
  Building2,
  FileText,
  FolderDown,
  UserCheck,
  Settings,
} from "lucide-react";

export type ModuleIconName =
  | "GraduationCap"
  | "MessageSquareQuote"
  | "ImageIcon"
  | "Building2"
  | "FileText"
  | "FolderDown"
  | "UserCheck"
  | "Settings";

interface FutureModuleTeaserProps {
  title: string;
  category: string;
  version: "Version 2.0" | "Version 3.0";
  iconName: ModuleIconName;
  marketingHeadline: string;
  description: string;
  benefits: string[];
}

export function FutureModuleTeaser({
  title,
  category,
  version,
  iconName,
  marketingHeadline,
  description,
  benefits,
}: FutureModuleTeaserProps) {
  const getIcon = () => {
    switch (iconName) {
      case "GraduationCap":
        return <GraduationCap className="h-6 w-6" />;
      case "MessageSquareQuote":
        return <MessageSquareQuote className="h-6 w-6" />;
      case "ImageIcon":
        return <ImageIcon className="h-6 w-6" />;
      case "Building2":
        return <Building2 className="h-6 w-6" />;
      case "FileText":
        return <FileText className="h-6 w-6" />;
      case "FolderDown":
        return <FolderDown className="h-6 w-6" />;
      case "UserCheck":
        return <UserCheck className="h-6 w-6" />;
      case "Settings":
        return <Settings className="h-6 w-6" />;
      default:
        return <Sparkles className="h-6 w-6" />;
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Bannière de notification */}
      <div className="flex flex-col gap-4 rounded-2xl border border-brand-blue/20 bg-gradient-to-r from-brand-blue-dark via-[#00428C] to-brand-blue p-6 text-white shadow-md sm:p-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-brand-orange backdrop-blur-xs">
              {getIcon()}
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
          Ce que ce module permettra à DigiSET Institute :
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
            <Link
              href="/admin/soumissions"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-lg border border-brand-blue px-4 py-2 text-xs font-bold text-brand-blue hover:bg-brand-blue hover:text-white transition-colors"
            >
              Gérer les soumissions V1 <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
