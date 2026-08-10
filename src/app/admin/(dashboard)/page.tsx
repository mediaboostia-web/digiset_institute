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
  const [newsList] = useState<NewsItem[]>(INITIAL_NEWS);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/admin/submissions");
        const json = await res.json();
        if (json.ok && Array.isArray(json.data)) {
          setSubmissions(json.data);
        }
      } catch (err) {
        console.error("Erreur chargement tableau de bord:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  const kpis = calculateKPIs(submissions);

  // Séparation des dernières actualités et soumissions récents
  const recentSubmissions = submissions.slice(0, 5);
  const recentNews = newsList.slice(0, 4);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "nouveau":
        return <Badge className="bg-amber-500 text-white font-medium">Nouveau</Badge>;
      case "en_cours":
        return <Badge className="bg-blue-600 text-white font-medium">En cours</Badge>;
      case "traite":
        return <Badge className="bg-emerald-600 text-white font-medium">Traité</Badge>;
      case "archive":
        return <Badge variant="outline" className="text-gray-500">Archivé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
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

      {/* Cartes KPI Dynamiques */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Carte 1 : Nouvelles Inscriptions (7j) */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Inscriptions Initiales (7j)
            </span>
            <div className="rounded-lg bg-brand-blue/10 p-2.5 text-brand-blue">
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
          <p className="mt-2 text-[11px] text-gray-500">Candidatures reçues pour la rentrée 2026</p>
        </div>

        {/* Carte 2 : Formations Continues (7j) */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Formations Continues (7j)
            </span>
            <div className="rounded-lg bg-brand-orange/10 p-2.5 text-brand-orange">
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
          <p className="mt-2 text-[11px] text-gray-500">Demandes de devis d'entreprises</p>
        </div>

        {/* Carte 3 : Locations de Labo (7j) */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Locations de Labo (7j)
            </span>
            <div className="rounded-lg bg-emerald-100 p-2.5 text-emerald-700">
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
          <p className="mt-2 text-[11px] text-gray-500">Établissements secondaires partenaires</p>
        </div>

        {/* Carte 4 : Total Soumissions & En Attente */}
        <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Total Soumissions
            </span>
            <div className="rounded-lg bg-purple-100 p-2.5 text-purple-700">
              <FileText className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <span className="font-heading text-3xl font-extrabold text-brand-blue-dark">
              {kpis.totalSubmissions}
            </span>
            <div className="flex items-center gap-1.5 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-bold text-amber-800">
              <Clock className="h-3 w-3" />
              <span>{kpis.pendingSubmissions} en attente</span>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-gray-500">Toutes catégories confondues</p>
        </div>
      </div>

      {/* Grille Principale */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Colonne Gauche (2/3) : Dernières Soumissions Reçues */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-xl border border-gray-200 bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/50">
              <div>
                <h2 className="font-heading text-base font-bold text-gray-900">
                  Dernières Soumissions Reçues
                </h2>
                <p className="text-xs text-gray-500">
                  Candidatures et demandes d'information en temps réel
                </p>
              </div>
              <Link
                href="/admin/soumissions"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
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
                  <thead className="bg-gray-50 uppercase text-gray-500 font-semibold border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3">Demandeur / Organisation</th>
                      <th className="px-6 py-3">Type de demande</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Statut</th>
                      <th className="px-6 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                    {recentSubmissions.map((sub) => {
                      const name =
                        sub.type === "training"
                          ? sub.company_name
                          : sub.type === "lab"
                          ? sub.institution_name
                          : sub.full_name;

                      return (
                        <tr key={sub.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-gray-900">{name}</p>
                            <p className="text-[11px] text-gray-500">{sub.email}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-block rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-700">
                              {getSubmissionTypeLabel(sub.type)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(sub.created_at).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                            })}
                          </td>
                          <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href="/admin/soumissions"
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 hover:text-brand-blue transition-colors"
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

          {/* Section Dernières Actualités */}
          <div className="rounded-xl border border-gray-200 bg-white shadow-xs overflow-hidden">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-gray-50/50">
              <h2 className="font-heading text-base font-bold text-gray-900">
                Articles & Actualités Récentes
              </h2>
              <Link
                href="/admin/actualites"
                className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Gérer les actualités <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-gray-100">
              {recentNews.map((news) => (
                <div key={news.id} className="flex items-center justify-between p-4 hover:bg-gray-50/80 transition-colors">
                  <div className="flex items-center gap-4">
                    {news.cover_image_url ? (
                      <img
                        src={news.cover_image_url}
                        alt={news.title}
                        className="h-12 w-16 rounded-md object-cover border border-gray-200 shrink-0"
                      />
                    ) : (
                      <div className="flex h-12 w-16 items-center justify-center rounded-md bg-gray-100 text-gray-400 shrink-0">
                        <FileText className="h-5 w-5" />
                      </div>
                    )}
                    <div>
                      <h3 className="text-xs font-bold text-gray-900 line-clamp-1">
                        {news.title}
                      </h3>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-gray-500">
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
                    className={news.status === "published" ? "bg-emerald-600 text-white" : "text-amber-700 bg-amber-50 border-amber-200"}
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
          {/* Panneau d'Actions Rapides */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs">
            <h2 className="font-heading text-base font-bold text-gray-900 mb-4">
              Actions Rapides
            </h2>
            <div className="space-y-3">
              <Link
                href="/admin/actualites"
                className="flex w-full items-center justify-center gap-2.5 rounded-lg bg-brand-orange py-3 px-4 text-xs font-bold text-white hover:bg-brand-orange-dark shadow-sm transition-all"
              >
                <PlusCircle className="h-4 w-4" />
                Rédiger une nouvelle actualité
              </Link>

              <Link
                href="/admin/soumissions"
                className="flex w-full items-center justify-center gap-2.5 rounded-lg border-2 border-brand-blue-dark py-3 px-4 text-xs font-bold text-brand-blue-dark hover:bg-brand-blue-dark hover:text-white transition-all"
              >
                <Clock className="h-4 w-4" />
                Traiter les soumissions en attente ({kpis.pendingSubmissions})
              </Link>

              <Link
                href="/admin/equipe"
                className="flex w-full items-center justify-center gap-2.5 rounded-lg border border-gray-200 py-3 px-4 text-xs font-medium text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <UserPlus className="h-4 w-4 text-gray-500" />
                Mettre à jour l'organigramme
              </Link>
            </div>
          </div>

          {/* Carte Rentrée Académique Septembre 2026 */}
          <div className="relative overflow-hidden rounded-xl bg-brand-blue-dark p-6 text-white shadow-md">
            <div className="absolute -right-6 -bottom-6 opacity-15 pointer-events-none">
              <GraduationCap className="h-40 w-40 text-white" />
            </div>
            <span className="inline-block rounded-full bg-brand-orange px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide text-white">
              Événement Majeur
            </span>
            <h3 className="font-heading text-lg font-bold text-white mt-3">
              Rentrée Académique 2026
            </h3>
            <p className="text-xs text-white/80 mt-2 leading-relaxed">
              Préparation des premières promotions en Prépa MP2I, Licences Professionnelles et Formations Continues.
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-white/60">Démarrage des cours :</span>
              <span className="font-bold text-white">Septembre 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
