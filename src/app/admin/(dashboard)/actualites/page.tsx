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
  ExternalLink,
} from "lucide-react";
import { INITIAL_NEWS, NewsItem, ContentStatus } from "@/lib/admin-data";
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

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal d'édition/création
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsItem | null>(null);

  const fetchArticles = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/news?status=all");
      const json = await res.json();
      if (json.ok && Array.isArray(json.data)) {
        setNewsList(json.data);
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
      cover_image_url: "",
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

  const insertCustomLink = () => {
    const text = prompt("Texte sur lequel ajouter le lien (ex: Candidater en ligne) :", "Postuler maintenant");
    if (!text) return;
    const url = prompt("Lien de destination (ex: /inscription/candidature ou https://...) :", "/inscription/candidature");
    if (!url) return;
    insertTextToBody(`[${text}](${url})`);
  };

  // Téléversement d'image avec conversion en Data URL permanente (Base64)
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        setFormData((prev) => ({ ...prev, cover_image_url: base64Url }));
      };
      reader.readAsDataURL(file);
    }
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

    const payload = {
      title: formData.title,
      slug: formData.slug,
      category: finalCategory,
      excerpt: formData.excerpt,
      body: formData.body,
      cover_image_url: formData.cover_image_url,
      status: formData.status,
      tags: tagsArray,
      cta_text: formData.cta_text,
      cta_url: formData.cta_url,
    };

    try {
      if (editingArticle) {
        await fetch("/api/news", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: editingArticle.id, ...payload }),
        });
      } else {
        await fetch("/api/news", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      await fetchArticles();
    } catch (err) {
      console.error("Erreur enregistrement article:", err);
    }

    setIsModalOpen(false);
  };

  const toggleStatus = async (id: string) => {
    const target = newsList.find((n) => n.id === id);
    if (!target) return;

    const nextStatus = target.status === "published" ? "draft" : "published";

    setNewsList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: nextStatus } : item))
    );

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
    setNewsList((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch(`/api/news?id=${id}`, { method: "DELETE" });
      await fetchArticles();
    } catch (err) {
      console.error("Erreur suppression article:", err);
    }
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
          className="gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold text-xs shadow-sm"
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
                          className="h-8 w-8 text-gray-600 hover:text-brand-blue"
                          title="Modifier"
                          onClick={() => openEditModal(article)}
                        >
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-700"
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

      {/* Modal d'édition / création d'article réactif */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl w-[94vw] max-h-[88vh] overflow-y-auto overflow-x-hidden p-6">
            <DialogHeader className="border-b border-gray-100 pb-4">
              <DialogTitle className="font-heading text-lg font-bold text-gray-900">
                {editingArticle ? "Modifier l'article" : "Rédiger une nouvelle actualité"}
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Renseignez les détails ci-dessous et téléversez une image d'illustration.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveArticle} className="space-y-4 py-2 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700">Titre de l'actualité *</label>
                <Input
                  required
                  placeholder="ex. Lancement du Master en Intelligence Artificielle..."
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700">Slug (URL relative)</label>
                  <Input
                    placeholder="lancement-master-ia"
                    value={formData.slug}
                    onChange={(e) => setFormData((prev) => ({ ...prev, slug: e.target.value }))}
                    className="text-xs font-mono bg-gray-50"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700">Catégorie de l'article *</label>
                  <Select
                    value={formData.categorySelect}
                    onValueChange={(cat) => setFormData((prev) => ({ ...prev, categorySelect: cat || "Institutionnel" }))}
                  >
                    <SelectTrigger className="text-xs h-9">
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
                      className="text-xs mt-1.5 border-brand-orange/40 bg-orange-50/30"
                    />
                  )}
                </div>
              </div>

              {/* Téléversement d'image / photo de couverture */}
              <div className="space-y-2">
                <label className="font-bold text-gray-700">Photo de couverture de l'article</label>
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageFileUpload}
                  className="hidden"
                />

                {formData.cover_image_url ? (
                  <div className="relative flex items-center gap-4 rounded-xl border border-gray-200 p-3 bg-gray-50">
                    <img
                      src={formData.cover_image_url}
                      alt="Aperçu"
                      className="h-16 w-24 rounded-lg object-cover border border-gray-200"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">Photo sélectionnée</p>
                      <p className="text-[11px] text-gray-500 truncate">{formData.cover_image_url}</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData((prev) => ({ ...prev, cover_image_url: "" }))}
                      className="text-xs text-red-600 border-red-200 hover:bg-red-50"
                    >
                      <X className="h-3.5 w-3.5 mr-1" /> Retirer
                    </Button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-6 text-center cursor-pointer hover:bg-gray-100/80 transition-colors"
                  >
                    <Upload className="h-8 w-8 text-brand-blue mb-2" />
                    <p className="text-xs font-bold text-gray-900">Cliquez pour téléverser une image depuis votre ordinateur</p>
                    <p className="text-[11px] text-gray-500 mt-1">PNG, JPG, WEBP jusqu'à 5 MB</p>
                  </div>
                )}
                
                <div className="pt-2 space-y-1.5">
                  <span className="text-[11px] text-gray-500 font-semibold">Ou choisissez parmi les photos officielles de l'Institut :</span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { label: "Campus & Fondateur", url: "/brand/fondateur.png" },
                      { label: "Entrée Akanda", url: "/images/img/Image_3.jpg" },
                      { label: "Partenariats & Etudiants", url: "/images/img/Image_4.jpg" },
                      { label: "Laboratoires TP", url: "/images/img/Img_2.jpg" },
                      { label: "Conférences & Amphi", url: "/images/img/Image6.jpg" },
                      { label: "Informatique & Data", url: "/images/img/Image7.jpg" },
                    ].map((stock) => (
                      <button
                        key={stock.url}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, cover_image_url: stock.url }))}
                        className={`text-[10px] font-bold px-2.5 py-1 rounded-md border transition-all cursor-pointer ${
                          formData.cover_image_url === stock.url
                            ? "bg-brand-blue text-white border-brand-blue shadow-xs"
                            : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                        }`}
                      >
                        + {stock.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="pt-1">
                  <span className="text-[11px] text-gray-500 font-semibold">Ou collez une URL d'image externe :</span>
                  <Input
                    placeholder="https://..."
                    value={formData.cover_image_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, cover_image_url: e.target.value }))}
                    className="text-xs mt-1"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700">Chapeau / Extrait court (Méta-Description SEO) *</label>
                <Textarea
                  rows={2}
                  required
                  placeholder="Résumé en 2 phrases captivantes affiché sur les réseaux et cartes d'actualité..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="text-xs resize-none"
                />
              </div>

              {/* Assistant & Barre d'outils SEO pour la rédaction avec liens */}
              <div className="space-y-2 border border-slate-200 rounded-xl p-3.5 bg-slate-50/70">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-brand-blue">
                    <Sparkles className="h-4 w-4 text-brand-orange" />
                    <span>Barre d&apos;outils Rédaction PRO & SEO</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Insérez des liens et mots cliquables pour booster le taux de clic</span>
                </div>

                {/* Boutons d'insertion rapide de liens SEO internes */}
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1">
                    <LinkIcon className="h-3 w-3 text-brand-blue" /> Raccourcis de liens d&apos;incitation à cliquer (Call-to-Action SEO) :
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      onClick={insertCustomLink}
                      className="px-2.5 py-1 rounded-md bg-brand-blue text-white text-[11px] font-bold hover:bg-brand-blue-dark transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <LinkIcon className="h-3 w-3" /> Insérer un lien personnalisé...
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextToBody("[Déposer son dossier de candidature en ligne](/inscription/candidature)")}
                      className="px-2 py-1 rounded-md bg-white border border-slate-300 text-slate-700 text-[11px] font-semibold hover:border-brand-orange hover:text-brand-orange transition-all cursor-pointer"
                    >
                      + Lien Candidature
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
                    <button
                      type="button"
                      onClick={() => insertTextToBody("[Demande de Formation Continue Entreprise](/programmes/formation-continue)")}
                      className="px-2 py-1 rounded-md bg-white border border-slate-300 text-slate-700 text-[11px] font-semibold hover:border-brand-orange hover:text-brand-orange transition-all cursor-pointer"
                    >
                      + Formation Continue
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextToBody("[Consulter la brochure de nos Laboratoires](/services/location-laboratoires)")}
                      className="px-2 py-1 rounded-md bg-white border border-slate-300 text-slate-700 text-[11px] font-semibold hover:border-brand-orange hover:text-brand-orange transition-all cursor-pointer"
                    >
                      + Location Labos
                    </button>
                    <button
                      type="button"
                      onClick={() => insertTextToBody("[Contacter le Secrétariat Académique](/contact)")}
                      className="px-2 py-1 rounded-md bg-white border border-slate-300 text-slate-700 text-[11px] font-semibold hover:border-brand-orange hover:text-brand-orange transition-all cursor-pointer"
                    >
                      + Contact
                    </button>
                  </div>
                </div>

                {/* Formats de mise en page SEO */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1.5 border-t border-slate-200/60">
                  <span className="text-[11px] font-bold text-slate-600 mr-1">Structure SEO :</span>
                  <button
                    type="button"
                    onClick={() => insertTextToBody("## Titre de Section Important")}
                    className="px-2 py-1 rounded bg-white border border-slate-300 text-[11px] font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                  >
                    <Heading2 className="h-3 w-3 text-brand-blue" /> Titre H2
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextToBody("### Sous-titre de détail")}
                    className="px-2 py-1 rounded bg-white border border-slate-300 text-[11px] font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                  >
                    <Heading3 className="h-3 w-3 text-brand-blue" /> Titre H3
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextToBody("**mot important en gras**")}
                    className="px-2 py-1 rounded bg-white border border-slate-300 text-[11px] font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                  >
                    <Bold className="h-3 w-3" /> Gras
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextToBody("- Point clé à retenir 1\n- Point clé à retenir 2")}
                    className="px-2 py-1 rounded bg-white border border-slate-300 text-[11px] font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                  >
                    <List className="h-3 w-3" /> Puces
                  </button>
                  <button
                    type="button"
                    onClick={() => insertTextToBody("> Citation de la Direction de l'établissement...")}
                    className="px-2 py-1 rounded bg-white border border-slate-300 text-[11px] font-bold text-slate-800 hover:bg-slate-100 flex items-center gap-1 cursor-pointer"
                  >
                    <Quote className="h-3 w-3 text-brand-orange" /> Citation
                  </button>
                </div>

                <div className="space-y-1 pt-1.5">
                  <Textarea
                    rows={8}
                    required
                    placeholder="Saisissez le corps de votre article. Utilisez les boutons ci-dessus pour ajouter des liens hypertextes et des titres de section..."
                    value={formData.body}
                    onChange={(e) => setFormData((prev) => ({ ...prev, body: e.target.value }))}
                    className="text-xs bg-white border-slate-300 font-sans leading-relaxed"
                  />
                  <p className="text-[10px] text-slate-500">
                    💡 Astuce SEO : Pour ajouter un lien cliquable sur n&apos;importe quel mot, écrivez <code className="bg-slate-200 px-1 rounded text-slate-800">[Texte visible](https://lien.com)</code> ou utilisez le bouton &quot;Insérer un lien&quot;.
                  </p>
                </div>
              </div>

              {/* Optimisation SEO Avancée (Mots-clés & Bouton d'Action) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-gray-100 pt-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700 flex items-center gap-1">
                    <Tag className="h-3.5 w-3.5 text-brand-blue" /> Mots-clés / Tags SEO (séparés par virgule)
                  </label>
                  <Input
                    placeholder="ex. IA, Cybersécurité, Licence Pro, Libreville"
                    value={formData.tags}
                    onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700 flex items-center gap-1">
                    <MousePointerClick className="h-3.5 w-3.5 text-brand-orange" /> Bouton d&apos;appel à l&apos;action (CTA)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Texte du bouton (ex. S'inscrire)"
                      value={formData.cta_text}
                      onChange={(e) => setFormData((prev) => ({ ...prev, cta_text: e.target.value }))}
                      className="text-xs"
                    />
                    <Input
                      placeholder="Lien cible (ex. /inscription/candidature)"
                      value={formData.cta_url}
                      onChange={(e) => setFormData((prev) => ({ ...prev, cta_url: e.target.value }))}
                      className="text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <span className="font-bold text-gray-700">Statut :</span>
                  <Select
                    value={formData.status}
                    onValueChange={(val) => {
                      if (val) setFormData((prev) => ({ ...prev, status: val as ContentStatus }));
                    }}
                  >
                    <SelectTrigger className="w-[140px] text-xs h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="published">Publié</SelectItem>
                      <SelectItem value="draft">Brouillon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                    className="text-xs"
                  >
                    Annuler
                  </Button>
                  <Button type="submit" className="bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold gap-1.5 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    {editingArticle ? "Enregistrer les modifications" : "Publier l'actualité SEO"}
                  </Button>
                </div>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

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
