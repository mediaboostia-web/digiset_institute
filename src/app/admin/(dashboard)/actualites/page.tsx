"use client";

import { useState, useEffect, useRef } from "react";
import {
  Newspaper,
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  CheckCircle,
  Clock,
  Image as ImageIcon,
  Upload,
  X,
  Link as LinkIcon,
  Bold,
  Quote,
  List,
  Heading2,
  Heading3,
  Tag,
  Sparkles,
  MousePointerClick,
  Save,
  FileImage,
} from "lucide-react";
import { NewsItem, ContentStatus } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { MediaPickerModal } from "@/components/admin/media-picker-modal";

const CATEGORY_OPTIONS = [
  "Institutionnel",
  "Admissions & Concours",
  "Formations & Certifications",
  "Vie Étudiante & Événements",
  "Partenariats & Entreprises",
  "Laboratoires & TP Scientifiques",
  "DigiSET Online",
  "Autre (Personnalisé)",
];

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  // Modal d'édition/création & Médiathèque
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsItem | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  // Modal d'insertion de lien personnalisé sans prompt alert
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [customLinkText, setCustomLinkText] = useState("Postuler maintenant");
  const [customLinkUrl, setCustomLinkUrl] = useState("/inscription/candidature");

  const LOCAL_STORAGE_NEWS_KEY = "digiset_news_local_cache_v2";

  const saveNewsToLocalStorage = (list: NewsItem[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(list));
      } catch (e) {
        console.error("Erreur sauvegarde local storage news:", e);
      }
    }
  };

  const fetchArticles = async () => {
    setIsLoading(true);

    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(LOCAL_STORAGE_NEWS_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setNewsList(parsed);
          }
        } catch {
          // Ignorer
        }
      }
    }

    try {
      const res = await fetch("/api/news?status=all");
      const json = await res.json();
      if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
        if (typeof window !== "undefined") {
          const localCache = localStorage.getItem(LOCAL_STORAGE_NEWS_KEY);
          if (localCache) {
            try {
              const parsedLocal = JSON.parse(localCache);
              if (Array.isArray(parsedLocal) && parsedLocal.length >= json.data.length) {
                setNewsList(parsedLocal);
                return;
              }
            } catch {
              // Ignorer
            }
          }
        }
        setNewsList(json.data);
        saveNewsToLocalStorage(json.data);
      }
    } catch (err) {
      console.error("Erreur chargement actualités:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    categorySelect: string;
    customCategory: string;
    excerpt: string;
    body: string;
    cover_image_url: string;
    status: ContentStatus;
    tags: string;
    cta_text: string;
    cta_url: string;
  }>({
    title: "",
    slug: "",
    categorySelect: "Institutionnel",
    customCategory: "",
    excerpt: "",
    body: "",
    cover_image_url: "",
    status: "published",
    tags: "",
    cta_text: "Déposer une candidature",
    cta_url: "/inscription/candidature",
  });

  const openCreateModal = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      categorySelect: "Institutionnel",
      customCategory: "",
      excerpt: "",
      body: "",
      cover_image_url: "/images/img/Image_3.jpg",
      status: "published",
      tags: "Prépa MP2I, Licences Pro, Cybersécurité, IA, Libreville",
      cta_text: "Déposer mon dossier de candidature",
      cta_url: "/inscription/candidature",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (article: NewsItem) => {
    setEditingArticle(article);
    const isStandardCategory = CATEGORY_OPTIONS.includes(article.category || "");
    setFormData({
      title: article.title,
      slug: article.slug,
      categorySelect: isStandardCategory ? article.category || "Institutionnel" : "Autre (Personnalisé)",
      customCategory: isStandardCategory ? "" : article.category || "",
      excerpt: article.excerpt,
      body: article.body,
      cover_image_url: article.cover_image_url || "",
      status: article.status,
      tags: article.tags ? article.tags.join(", ") : "",
      cta_text: article.cta_text || "",
      cta_url: article.cta_url || "",
    });
    setIsModalOpen(true);
  };

  const handleTitleChange = (title: string) => {
    const slug = title
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setFormData((prev) => ({ ...prev, title, slug }));
  };

  // Insertion de texte / liens dans le corps de l'article pour le SEO
  const insertTextToBody = (textToInsert: string) => {
    setFormData((prev) => ({
      ...prev,
      body: prev.body ? `${prev.body}\n\n${textToInsert}` : textToInsert,
    }));
  };

  const handleConfirmInsertLink = () => {
    if (customLinkText && customLinkUrl) {
      insertTextToBody(`[${customLinkText}](${customLinkUrl})`);
    }
    setIsLinkModalOpen(false);
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.body) return;

    const finalCategory =
      formData.categorySelect === "Autre (Personnalisé)"
        ? formData.customCategory || "Général"
        : formData.categorySelect;

    const tagsArray = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const newOrUpdatedItem: NewsItem = {
      id: editingArticle ? editingArticle.id : `news-${Date.now()}`,
      title: formData.title,
      slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, "-"),
      category: finalCategory,
      excerpt: formData.excerpt,
      body: formData.body,
      cover_image_url: formData.cover_image_url || "/images/img/Image_3.jpg",
      status: formData.status,
      tags: tagsArray,
      cta_text: formData.cta_text,
      cta_url: formData.cta_url,
      published_at: editingArticle ? editingArticle.published_at : new Date().toISOString(),
      created_at: editingArticle ? editingArticle.created_at : new Date().toISOString(),
    };

    let updatedNewsList: NewsItem[];
    if (editingArticle) {
      updatedNewsList = newsList.map((n) => (n.id === editingArticle.id ? newOrUpdatedItem : n));
    } else {
      updatedNewsList = [newOrUpdatedItem, ...newsList];
    }

    setNewsList(updatedNewsList);
    saveNewsToLocalStorage(updatedNewsList);
    setIsModalOpen(false);

    try {
      if (editingArticle) {
        await fetch("/api/news", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrUpdatedItem),
        });
      } else {
        await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrUpdatedItem),
        });
      }
      await fetchArticles();
    } catch (err) {
      console.error("Erreur enregistrement article:", err);
    }
  };

  const toggleStatus = async (id: string) => {
    const target = newsList.find((n) => n.id === id);
    if (!target) return;

    const nextStatus = target.status === "published" ? "draft" : "published";

    const updatedList = newsList.map((item) =>
      item.id === id ? { ...item, status: nextStatus as ContentStatus } : item
    );
    setNewsList(updatedList);
    saveNewsToLocalStorage(updatedList);

    try {
      await fetch("/api/news", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      await fetchArticles();
    } catch (err) {
      console.error("Erreur bascule statut:", err);
    }
  };

  const handleDelete = async (id: string) => {
    const updatedList = newsList.filter((item) => item.id !== id);
    setNewsList(updatedList);
    saveNewsToLocalStorage(updatedList);

    try {
      await fetch(`/api/news?id=${id}`, { method: "DELETE" });
      await fetchArticles();
    } catch (err) {
      console.error("Erreur suppression article:", err);
    }
  };

  const getReadableImageDisplay = (url: string) => {
    if (!url) return "";
    if (url.startsWith("data:image")) {
      return "Photo personnalisée téléversée (Image locale)";
    }
    return url;
  };

  // Filtrage
  const filteredNews = newsList.filter((item) => {
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.excerpt.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">
            Gestion des Actualités & Articles
          </h1>
          <p className="text-xs text-gray-500">
            Rédigez, publiez et gérez les communiqués de presse et actualités institutionnelles.
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold text-xs shadow-sm cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" /> Publier une actualité
        </Button>
      </div>

      {/* Barre de Recherche et Filtres */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher une actualité par titre ou extrait..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-500">Statut :</span>
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
            <SelectTrigger className="w-[150px] text-xs h-9">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous ({newsList.length})</SelectItem>
              <SelectItem value="published">Publiés</SelectItem>
              <SelectItem value="draft">Brouillons</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Liste des Articles sous forme de Tableau */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-xs overflow-hidden">
        {filteredNews.length === 0 ? (
          <div className="py-12 text-center">
            <Newspaper className="mx-auto h-10 w-10 text-gray-300" />
            <p className="mt-2 text-sm font-medium text-gray-600">Aucun article trouvé.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 uppercase text-gray-500 font-semibold border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3.5">Article / Titre</th>
                  <th className="px-6 py-3.5">Catégorie</th>
                  <th className="px-6 py-3.5">Date de publication</th>
                  <th className="px-6 py-3.5">Statut</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                {filteredNews.map((article) => (
                  <tr key={article.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        {article.cover_image_url ? (
                          <img
                            src={article.cover_image_url}
                            alt={article.title}
                            className="h-12 w-16 rounded-md object-cover border border-gray-200 shrink-0"
                          />
                        ) : (
                          <div className="flex h-12 w-16 items-center justify-center rounded-md bg-gray-100 text-gray-400 shrink-0">
                            <ImageIcon className="h-5 w-5" />
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-gray-900 line-clamp-1">{article.title}</p>
                          <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5">{article.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="rounded-md bg-gray-100 px-2 py-1 text-[11px] font-semibold text-gray-700">
                        {article.category || "Général"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(article.published_at).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(article.id)}
                        className="cursor-pointer focus:outline-none"
                        title="Cliquer pour basculer le statut"
                      >
                        {article.status === "published" ? (
                          <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 font-semibold">
                            <CheckCircle className="h-3 w-3" /> Publié
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-700 bg-amber-50 border-amber-200 gap-1 font-semibold">
                            <Clock className="h-3 w-3" /> Brouillon
                          </Badge>
                        )}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-gray-600 hover:text-brand-blue cursor-pointer"
                          title="Modifier"
                          onClick={() => openEditModal(article)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                          title="Supprimer"
                          onClick={() => setDeleteTarget({ id: article.id, name: article.title })}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal d'Édition / Création */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl w-[96vw] max-h-[90vh] flex flex-col p-0 overflow-hidden border-2 border-slate-200 shadow-2xl rounded-2xl bg-white">
            
            <DialogHeader className="border-b border-slate-200 p-5 bg-slate-50/90 shrink-0">
              <DialogTitle className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <Newspaper className="h-5 w-5 text-brand-orange" />
                {editingArticle ? "Modifier l'article d'actualité" : "Rédiger une nouvelle actualité"}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-600 font-medium">
                Renseignez tous les détails de l'article, choisissez l'image depuis la Médiathèque et enregistrez.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveArticle} className="flex flex-col flex-1 overflow-hidden min-h-0">
              
              <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-xs max-h-[calc(90vh-140px)]">
                
                {/* Section 1 : Titre, Slug & Catégorie */}
                <div className="space-y-4 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-brand-blue flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-brand-orange" /> 1. Titre & Informations Générales
                  </h3>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Titre de l'actualité *</label>
                    <Input
                      required
                      placeholder="ex. L'Intelligence Artificielle et la Cybersécurité : Les métiers en or de 2026 !"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="text-xs h-10 font-bold text-slate-900 bg-white"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Slug (URL relative SEO)</label>
                      <Input
                        placeholder="lintelligence-artificielle-et-la-cybersecurite"
                        value={formData.slug}
                        onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                        className="text-xs font-mono bg-white text-slate-700"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-slate-700">Catégorie de l'article *</label>
                      <Select
                        value={formData.categorySelect}
                        onValueChange={(cat) => setFormData((prev) => ({ ...prev, categorySelect: cat || "Institutionnel" }))}
                      >
                        <SelectTrigger className="text-xs h-9 bg-white">
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORY_OPTIONS.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      {formData.categorySelect === "Autre (Personnalisé)" && (
                        <Input
                          placeholder="Saisissez votre catégorie personnalisée..."
                          value={formData.customCategory}
                          onChange={(e) => setFormData((prev) => ({ ...prev, customCategory: e.target.value }))}
                          className="text-xs mt-1.5 border-brand-orange/40 bg-orange-50/40"
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 2 : Photo de Couverture via la Médiathèque */}
                <div className="space-y-3 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                  <label className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-brand-blue flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <ImageIcon className="h-3.5 w-3.5 text-brand-orange" /> 2. Photo de couverture de l'article
                    </span>
                    <Button
                      type="button"
                      onClick={() => setIsMediaPickerOpen(true)}
                      className="bg-brand-blue hover:bg-brand-blue-dark text-white text-[11px] font-bold px-3 py-1 rounded-lg gap-1.5 cursor-pointer shadow-xs"
                    >
                      <FileImage className="h-3.5 w-3.5 text-brand-orange" />
                      <span>Ouvrir la Médiathèque</span>
                    </Button>
                  </label>

                  {formData.cover_image_url ? (
                    <div className="relative flex items-center gap-4 rounded-xl border border-slate-200 p-3 bg-white shadow-2xs">
                      <img
                        src={formData.cover_image_url}
                        alt="Aperçu"
                        className="h-20 w-32 rounded-lg object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900">Photo sélectionnée</p>
                        <p className="text-[11px] text-slate-500 truncate mt-0.5 font-mono">
                          {getReadableImageDisplay(formData.cover_image_url)}
                        </p>
                        <button
                          type="button"
                          onClick={() => setIsMediaPickerOpen(true)}
                          className="text-[11px] font-bold text-brand-orange hover:underline mt-1 block cursor-pointer"
                        >
                          Changer de photo via la Médiathèque →
                        </button>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData((prev) => ({ ...prev, cover_image_url: "" }))}
                        className="text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5 mr-1" /> Retirer
                      </Button>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsMediaPickerOpen(true)}
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white p-6 text-center cursor-pointer hover:bg-slate-100/80 transition-colors"
                    >
                      <FileImage className="h-8 w-8 text-brand-orange mb-2" />
                      <p className="text-xs font-bold text-slate-900">Cliquez pour ouvrir la Médiathèque et choisir ou importer une photo</p>
                      <p className="text-[11px] text-slate-500 mt-1">Accédez à la banque d'images de l'institut ou téléversez un nouveau fichier</p>
                    </div>
                  )}
                </div>

                {/* Section 3 : Chapeau / Extrait court */}
                <div className="space-y-2 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                  <label className="font-bold text-slate-900 uppercase tracking-wider text-[11px] text-brand-blue flex items-center gap-1.5">
                    <Quote className="h-3.5 w-3.5 text-brand-orange" /> 3. Chapeau / Extrait court (Méta-Description SEO) *
                  </label>
                  <Textarea
                    rows={3}
                    required
                    placeholder="Résumé captivant en 2-3 phrases affiché sur les cartes et réseaux sociaux..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    className="text-xs bg-white resize-y leading-relaxed"
                  />
                </div>

                {/* Section 4 : Corps de l'Article */}
                <div className="space-y-3 border-2 border-slate-200 rounded-xl p-4 bg-slate-50/70">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue">
                      <Sparkles className="h-4 w-4 text-brand-orange" />
                      <span>4. Rédaction du Corps de l'Article & Liens SEO</span>
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">Ajoutez des liens cliquables pour stimuler les candidatures</span>
                  </div>

                  {/* Boutons d'incitation SEO SANS PROMPT ALERT */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setIsLinkModalOpen(true)}
                      className="px-2.5 py-1 rounded-md bg-brand-blue text-white text-[11px] font-bold hover:bg-brand-blue-dark transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <LinkIcon className="h-3 w-3" /> Lien personnalisé...
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextToBody("[Déposer son dossier de candidature en ligne](/inscription/candidature)")}
                      className="px-2 py-1 rounded-md bg-white border border-slate-300 text-slate-700 text-[11px] font-semibold hover:border-brand-orange hover:text-brand-orange transition-all cursor-pointer"
                    >
                      + Candidature
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextToBody("[Découvrir les Licences Professionnelles](/programmes/licence-professionnelle)")}
                      className="px-2 py-1 rounded-md bg-white border border-slate-300 text-slate-700 text-[11px] font-semibold hover:border-brand-orange hover:text-brand-orange transition-all cursor-pointer"
                    >
                      + Licences Pro
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextToBody("[Découvrir la Classe Préparatoire MP2I](/programmes/classe-preparatoire)")}
                      className="px-2 py-1 rounded-md bg-white border border-slate-300 text-slate-700 text-[11px] font-semibold hover:border-brand-orange hover:text-brand-orange transition-all cursor-pointer"
                    >
                      + Prépa MP2I
                    </button>
                  </div>

                  <Textarea
                    rows={8}
                    required
                    placeholder="Saisissez le corps complet de l'article..."
                    value={formData.body}
                    onChange={(e) => setFormData((prev) => ({ ...prev, body: e.target.value }))}
                    className="text-xs bg-white border-slate-300 font-sans leading-relaxed min-h-[180px]"
                  />
                </div>

                {/* Section 5 : Tags & CTA */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50/70 p-4 rounded-xl border border-slate-200">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 flex items-center gap-1">
                      <Tag className="h-3.5 w-3.5 text-brand-blue" /> Tags SEO (séparés par virgule)
                    </label>
                    <Input
                      placeholder="ex. IA, Cybersécurité, Licence Pro, Libreville"
                      value={formData.tags}
                      onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                      className="text-xs bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700 flex items-center gap-1">
                      <MousePointerClick className="h-3.5 w-3.5 text-brand-orange" /> Bouton CTA de bas d&apos;article
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="Texte (ex. S'inscrire)"
                        value={formData.cta_text}
                        onChange={(e) => setFormData((prev) => ({ ...prev, cta_text: e.target.value }))}
                        className="text-xs bg-white"
                      />
                      <Input
                        placeholder="Lien (ex. /inscription/candidature)"
                        value={formData.cta_url}
                        onChange={(e) => setFormData((prev) => ({ ...prev, cta_url: e.target.value }))}
                        className="text-xs bg-white"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* FOOTER FIXE */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 px-6 border-t-2 border-slate-200 bg-slate-100 shrink-0 z-50">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="font-bold text-slate-700 text-xs">Statut de l'article :</span>
                  <Select
                    value={formData.status}
                    onValueChange={(val) => {
                      if (val) setFormData((prev) => ({ ...prev, status: val as ContentStatus }));
                    }}
                  >
                    <SelectTrigger className="w-[140px] text-xs h-9 bg-white border-slate-300 font-bold">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Publié (En ligne)</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="text-xs font-bold bg-white hover:bg-slate-200 cursor-pointer border-slate-300"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className="bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-extrabold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                  >
                    <Save className="h-4 w-4" />
                    <span>{editingArticle ? "Enregistrer les modifications" : "Publier l'actualité"}</span>
                  </Button>
                </div>
              </div>

            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* MODAL SHADCN PROPRE POUR AJOUT DE LIEN PERSONNALISÉ (REMPLACE LES PROMPT BROWSER) */}
      {isLinkModalOpen && (
        <Dialog open={isLinkModalOpen} onOpenChange={setIsLinkModalOpen}>
          <DialogContent className="max-w-md w-[92vw] p-6 rounded-2xl bg-white border border-slate-200 shadow-2xl">
            <DialogHeader className="space-y-1">
              <DialogTitle className="text-base font-bold text-slate-900 flex items-center gap-2">
                <LinkIcon className="h-4 w-4 text-brand-orange" />
                Insérer un lien personnalisé dans l&apos;article
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-500">
                Définissez le texte affiché et la page web de destination.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-3 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">Texte affiché sur le lien *</label>
                <Input
                  value={customLinkText}
                  onChange={(e) => setCustomLinkText(e.target.value)}
                  placeholder="ex. Postuler maintenant ou En savoir plus"
                  className="text-xs bg-slate-50 h-9 font-medium"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-slate-700">URL / Lien de destination *</label>
                <Input
                  value={customLinkUrl}
                  onChange={(e) => setCustomLinkUrl(e.target.value)}
                  placeholder="ex. /inscription/candidature ou https://..."
                  className="text-xs bg-slate-50 h-9 font-mono"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsLinkModalOpen(false)}
                className="text-xs font-bold bg-white hover:bg-slate-100"
              >
                Annuler
              </Button>
              <Button
                type="button"
                onClick={handleConfirmInsertLink}
                className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-extrabold px-4 py-2 rounded-xl"
              >
                Insérer le lien
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Sélection depuis la Médiathèque */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        currentSelectedUrl={formData.cover_image_url}
        onSelectMedia={(url) => setFormData((prev) => ({ ...prev, cover_image_url: url }))}
        title="Sélectionner ou importer l'image de couverture"
      />

      {/* Modal de Confirmation de Suppression */}
      <ConfirmDeleteDialog
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) {
            handleDelete(deleteTarget.id);
          }
        }}
        itemName={deleteTarget?.name}
        title="Supprimer l'actualité"
        description="L'article sera définitivement supprimé et retiré du site public."
      />
    </div>
  );
}
