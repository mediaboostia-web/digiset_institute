"use client";

import { useState, useRef } from "react";
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

export default function AdminNewsPage() {
  const [newsList, setNewsList] = useState<NewsItem[]>(INITIAL_NEWS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Modal d'édition/création
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    category: string;
    excerpt: string;
    body: string;
    cover_image_url: string;
    status: ContentStatus;
  }>({
    title: "",
    slug: "",
    category: "Institutionnel",
    excerpt: "",
    body: "",
    cover_image_url: "",
    status: "published",
  });

  const openCreateModal = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      slug: "",
      category: "Institutionnel",
      excerpt: "",
      body: "",
      cover_image_url: "",
      status: "published",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (article: NewsItem) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      slug: article.slug,
      category: article.category || "Institutionnel",
      excerpt: article.excerpt,
      body: article.body,
      cover_image_url: article.cover_image_url || "",
      status: article.status,
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

  // Gestion du téléversement de fichier image local
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, cover_image_url: imageUrl }));
    }
  };

  const handleSaveArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.body) return;

    if (editingArticle) {
      setNewsList((prev) =>
        prev.map((item) =>
          item.id === editingArticle.id
            ? {
                ...item,
                title: formData.title,
                slug: formData.slug || item.slug,
                category: formData.category,
                excerpt: formData.excerpt,
                body: formData.body,
                cover_image_url: formData.cover_image_url,
                status: formData.status,
              }
            : item
        )
      );
    } else {
      const newArticle: NewsItem = {
        id: `news-${Date.now()}`,
        title: formData.title,
        slug: formData.slug || `article-${Date.now()}`,
        category: formData.category,
        excerpt: formData.excerpt,
        body: formData.body,
        cover_image_url: formData.cover_image_url,
        status: formData.status,
        published_at: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };
      setNewsList((prev) => [newArticle, ...prev]);
    }

    setIsModalOpen(false);
  };

  const toggleStatus = (id: string) => {
    setNewsList((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: item.status === "published" ? "draft" : "published",
            }
          : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setNewsList((prev) => prev.filter((item) => item.id !== id));
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
                  <label className="font-bold text-gray-700">Catégorie</label>
                  <Select
                    value={formData.category}
                    onValueChange={(cat) => setFormData((prev) => ({ ...prev, category: cat || "Institutionnel" }))}
                  >
                    <SelectTrigger className="text-xs h-9">
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Institutionnel">Institutionnel</SelectItem>
                      <SelectItem value="Partenariat">Partenariat</SelectItem>
                      <SelectItem value="Services & Labos">Services & Labos</SelectItem>
                      <SelectItem value="Événements">Événements</SelectItem>
                    </SelectContent>
                  </Select>
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
                <label className="font-bold text-gray-700">Chapeau / Extrait court *</label>
                <Textarea
                  rows={2}
                  required
                  placeholder="Résumé en 2 phrases affiché sur la carte d'actualité..."
                  value={formData.excerpt}
                  onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                  className="text-xs resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700">Corps complet de l'article *</label>
                <Textarea
                  rows={6}
                  required
                  placeholder="Contenu complet de l'actualité..."
                  value={formData.body}
                  onChange={(e) => setFormData((prev) => ({ ...prev, body: e.target.value }))}
                  className="text-xs"
                />
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
                  <Button type="submit" className="bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold">
                    {editingArticle ? "Enregistrer" : "Publier l'actualité"}
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
