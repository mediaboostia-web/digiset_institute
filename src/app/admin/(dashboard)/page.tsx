"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UserPlus,
  BookOpen,
  FlaskConical,
  FileText,
  TrendingUp,
  Minus,
  Clock,
  ArrowRight,
  PlusCircle,
  Eye,
  GraduationCap,
  Inbox,
  Loader2,
} from "lucide-react";
import {
  INITIAL_SUBMISSIONS,
  INITIAL_NEWS,
  calculateKPIs,
  AnySubmission,
  NewsItem,
} from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminDashboardPage() {
  const [submissions, setSubmissions] = useState<AnySubmission[]>([]);
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      // 1. Restauration instantanée 0ms depuis le cache local (particulièrement efficace sur mobile)
      if (typeof window !== "undefined") {
        const cachedNews = localStorage.getItem("digiset_news_local_cache_v5");
        const cachedSubmissions = localStorage.getItem("digiset_submissions_local_cache");
        if (cachedNews) {
          try {
            const parsed = JSON.parse(cachedNews);
            if (Array.isArray(parsed)) setNewsList(parsed);
          } catch {}
        }
        if (cachedSubmissions) {
          try {
            const parsed = JSON.parse(cachedSubmissions);
            if (Array.isArray(parsed)) setSubmissions(parsed);
          } catch {}
        }
      }

      // 2. Chargement parallèle ultra-rapide des requêtes API (News + Submissions)
      try {
        const [newsRes, subsRes] = await Promise.all([
          fetch("/api/news?status=all"),
          fetch("/api/admin/submissions"),
        ]);

        const [newsJson, subsJson] = await Promise.all([
          newsRes.json(),
          subsRes.json(),
        ]);

        if (newsJson.ok && Array.isArray(newsJson.data)) {
          setNewsList(newsJson.data);
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("digiset_news_local_cache_v5", JSON.stringify(newsJson.data));
            } catch {}
          }
        }

        if (subsJson.ok && Array.isArray(subsJson.data)) {
          setSubmissions(subsJson.data);
          if (typeof window !== "undefined") {
            try {
              localStorage.setItem("digiset_submissions_local_cache", JSON.stringify(subsJson.data));
            } catch {}
          }
        }
      } catch (err) {
        console.error("Erreur chargement tableau de bord:", err);
      } finally {
        setIsLoading(false);
      }
    }

    // Chargement initial, puis rafraîchissement automatique des cartes KPI
    // pour refléter les nouvelles soumissions sans que l'admin ait à recharger
    // la page (même intervalle que le badge de notifications de admin-header.tsx).
    loadData();
    const interval = setInterval(loadData, 15000);
    return () => clearInterval(interval);
  }, []);

  const kpis = calculateKPIs(submissions);

  // Séparation des dernières actualités et soumissions récents
  const recentSubmissions = submissions.slice(0, 5);
  const recentNews = newsList.slice(0, 4);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "nouveau":
        return <Badge className="bg-amber-500 text-white font-bold text-[10px]">Nouveau</Badge>;
      case "en_cours":
        return <Badge className="bg-blue-600 text-white font-bold text-[10px]">En cours</Badge>;
      case "traite":
        return <Badge className="bg-emerald-600 text-white font-bold text-[10px]">Traité</Badge>;
      case "archive":
        return <Badge variant="outline" className="text-gray-500 text-[10px]">Archivé</Badge>;
      default:
        return <Badge variant="secondary" className="text-[10px]">{status}</Badge>;
    }
  };

  const getSubmissionTypeLabel = (type: string) => {
    switch (type) {
      case "registration":
        return "Inscription Initiale";
      case "training":
        return "Formation Continue";
      case "lab":
        return "Location Labo";
      case "contact":
        return "Message Contact";
      default:
        return type;
    }
  };

  return (
    <div className="space-y-8">
      {/* En-tête de bienvenue */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900 md:text-3xl">
          Tableau de Bord Administrateur
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Bienvenue sur le portail de gestion de DigiSET Institute. Voici le résumé des activités et soumissions récentes.
        </p>
      </div>

      {/* Cartes KPI Dynamiques — BORDURE DE 2PX & EFFET DE SURVOL DE COULEUR */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Carte 1 : Nouvelles Inscriptions (7j) */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:bg-blue-50/60 hover:border-brand-blue hover:shadow-md hover:-translate-y-0.5 cursor-pointer group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-brand-blue transition-colors">
              Inscriptions Initiales (7j)
            </span>
            <div className="rounded-xl bg-brand-blue/10 p-2.5 text-brand-blue group-hover:bg-brand-blue group-hover:text-white transition-all shadow-xs">
              <UserPlus className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-heading text-3xl font-extrabold text-brand-blue-dark">
              {kpis.registrations7d}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>+3 cette semaine</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-gray-500 font-medium">Candidatures reçues pour la rentrée 2026</p>
        </div>

        {/* Carte 2 : Formations Continues (7j) */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:bg-orange-50/60 hover:border-brand-orange hover:shadow-md hover:-translate-y-0.5 cursor-pointer group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-brand-orange transition-colors">
              Formations Continues (7j)
            </span>
            <div className="rounded-xl bg-brand-orange/10 p-2.5 text-brand-orange group-hover:bg-brand-orange group-hover:text-white transition-all shadow-xs">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-heading text-3xl font-extrabold text-brand-blue-dark">
              {kpis.training7d}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-gray-500">
              <Minus className="h-3.5 w-3.5" />
              <span>Stable</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-gray-500 font-medium">Demandes de devis d'entreprises</p>
        </div>

        {/* Carte 3 : Locations de Labo (7j) */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:bg-emerald-50/60 hover:border-emerald-600 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-emerald-700 transition-colors">
              Locations de Labo (7j)
            </span>
            <div className="rounded-xl bg-emerald-100 p-2.5 text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-xs">
              <FlaskConical className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-heading text-3xl font-extrabold text-brand-blue-dark">
              {kpis.lab7d}
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              <span>Forfaits TP</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-gray-500 font-medium">Établissements secondaires partenaires</p>
        </div>

        {/* Carte 4 : Total Soumissions & En Attente */}
        <div className="relative overflow-hidden rounded-2xl border-2 border-slate-200/90 bg-white p-6 shadow-xs transition-all duration-300 hover:bg-purple-50/60 hover:border-purple-600 hover:shadow-md hover:-translate-y-0.5 cursor-pointer group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 group-hover:text-purple-700 transition-colors">
              Total Soumissions
            </span>
            <div className="rounded-xl bg-purple-100 p-2.5 text-purple-700 group-hover:bg-purple-600 group-hover:text-white transition-all shadow-xs">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-heading text-3xl font-extrabold text-brand-blue-dark">
              {kpis.totalSubmissions}
            </span>
            <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-800 shadow-2xs">
              <Clock className="h-3 w-3" />
              <span>{kpis.pendingSubmissions} en attente</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-gray-500 font-medium">Toutes catégories confondues</p>
        </div>
      </div>

      {/* Grille Principale — BORDURES DE 2PX */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Colonne Gauche (2/3) : Dernières Soumissions Reçues */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-slate-200 px-6 py-4 bg-slate-50/80">
              <div>
                <h2 className="font-heading text-base font-bold text-gray-900">
                  Dernières Soumissions Reçues
                </h2>
                <p className="text-xs text-gray-500 font-medium">
                  Candidatures et demandes d'information en temps réel
                </p>
              </div>
              <Link
                href="/admin/soumissions"
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-2xs"
              >
                Voir tout <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              {recentSubmissions.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <Inbox className="h-8 w-8 text-gray-300 mx-auto" />
                  <p className="text-xs font-bold text-gray-700">Aucune soumission reçue pour le moment.</p>
                  <p className="text-[11px] text-gray-500">Les nouvelles candidatures et demandes s&apos;afficheront ici en temps réel.</p>
                </div>
              ) : (
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100/90 uppercase text-slate-700 font-bold border-b-2 border-slate-200">
                    <tr>
                      <th className="px-6 py-3.5">Demandeur / Organisation</th>
                      <th className="px-6 py-3.5">Type de demande</th>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Statut</th>
                      <th className="px-6 py-3.5 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 font-medium text-slate-700">
                    {recentSubmissions.map((sub) => {
                      const name =
                        sub.type === "training"
                          ? sub.company_name
                          : sub.type === "lab"
                          ? sub.institution_name
                          : sub.full_name;

                      return (
                        <tr key={sub.id} className="hover:bg-blue-50/60 transition-colors cursor-pointer">
                          <td className="px-6 py-4">
                            <p className="font-bold text-slate-900">{name}</p>
                            <p className="text-[11px] text-slate-500">{sub.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block rounded-lg bg-slate-100 border border-slate-200 px-2.5 py-1 text-[11px] font-bold text-slate-700">
                              {getSubmissionTypeLabel(sub.type)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-slate-500 font-semibold">
                            {new Date(sub.created_at).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </td>
                          <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href="/admin/soumissions"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-brand-blue hover:text-white transition-colors"
                              title="Inspecter la soumission"
                            >
                              <Eye className="h-4 w-4" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Section Dernières Actualités — BORDURE DE 2PX */}
          <div className="rounded-2xl border-2 border-slate-200/90 bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between border-b-2 border-slate-200 px-6 py-4 bg-slate-50/80">
              <h2 className="font-heading text-base font-bold text-gray-900">
                Articles & Actualités Récentes
              </h2>
              <Link
                href="/admin/actualites"
                className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-200 bg-white px-3.5 py-1.5 text-xs font-bold text-gray-700 hover:bg-brand-blue hover:text-white hover:border-brand-blue transition-all shadow-2xs"
              >
                Gérer les actualités <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-200">
              {recentNews.map((news) => (
                <div key={news.id} className="flex items-center justify-between p-4 hover:bg-blue-50/60 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    {news.cover_image_url ? (
                      <img
                        src={news.cover_image_url}
                        alt={news.title}
                        className="h-12 w-16 rounded-xl object-cover border-2 border-slate-200 shrink-0"
                      />
                    ) : (
                      <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-slate-100 text-slate-400 border-2 border-slate-200 shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 line-clamp-1">
                        {news.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                        <span>{news.category || "Général"}</span>
                        <span>•</span>
                        <span>
                          {new Date(news.published_at).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Badge
                    variant={news.status === "published" ? "default" : "outline"}
                    className={news.status === "published" ? "bg-emerald-600 text-white font-bold" : "text-amber-700 bg-amber-50 border-amber-300 font-bold"}
                  >
                    {news.status === "published" ? "Publié" : "Brouillon"}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Colonne Droite (1/3) : Actions Rapides & Infos Rentrée */}
        <div className="space-y-6 lg:col-span-1">
          {/* Panneau d'Actions Rapides — BORDURE DE 2PX */}
          <div className="rounded-2xl border-2 border-slate-200/90 bg-white p-6 shadow-xs space-y-4">
            <h2 className="font-heading text-base font-bold text-gray-900 border-b-2 border-slate-100 pb-3">
              Actions Rapides
            </h2>
            <div className="space-y-3">
              <Link
                href="/admin/actualites"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-brand-orange py-3 px-4 text-xs font-bold text-white hover:bg-brand-orange-dark shadow-md transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <PlusCircle className="h-4 w-4" />
                Rédiger une nouvelle actualité
              </Link>

              <Link
                href="/admin/soumissions"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-brand-blue-dark py-3 px-4 text-xs font-bold text-brand-blue-dark hover:bg-brand-blue-dark hover:text-white transition-all cursor-pointer shadow-xs hover:scale-[1.02] active:scale-[0.98]"
              >
                <Clock className="h-4 w-4" />
                Traiter les soumissions ({kpis.pendingSubmissions})
              </Link>

              <Link
                href="/admin/equipe"
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-slate-200 py-3 px-4 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:border-slate-300 transition-all cursor-pointer shadow-2xs"
              >
                <UserPlus className="h-4 w-4 text-slate-500" />
                Mettre à jour l'organigramme
              </Link>
            </div>
          </div>

          {/* Carte Rentrée Académique Septembre 2026 */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-blue-dark via-brand-blue-dark to-brand-blue p-6 text-white shadow-xl border-2 border-white/20">
            <div className="absolute -right-6 -bottom-6 opacity-15 pointer-events-none">
              <GraduationCap className="h-40 w-40 text-white" />
            </div>
            <span className="inline-block rounded-full bg-brand-orange px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white shadow-xs">
              Événement Majeur
            </span>
            <h3 className="font-heading text-lg font-bold text-white mt-3">
              Rentrée Académique 2026
            </h3>
            <p className="text-xs text-white/80 mt-2 leading-relaxed font-medium">
              Préparation des premières promotions en Prépa MP2I, Licences Professionnelles et Formations Continues.
            </p>
            <div className="mt-4 pt-4 border-t border-white/15 flex items-center justify-between text-xs">
              <span className="text-white/70">Démarrage des cours :</span>
              <span className="font-bold text-white bg-white/20 px-2.5 py-0.5 rounded-lg border border-white/20">Octobre 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
