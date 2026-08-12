"use client";

import { useState, useEffect, useRef } from "react";
import {
  FileImage,
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  Image as ImageIcon,
  Edit2,
  Tag,
  X,
  Save,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MediaItem } from "@/lib/media-store";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const LOCAL_STORAGE_KEY = "digiset_media_local_cache_v3";

export default function AdminGalleryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  // Modal d'Édition d'Étiquette & Titre
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("Campus & Équipements");
  const [customCategory, setCustomCategory] = useState("");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const saveToLocalStorage = (data: MediaItem[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
      } catch (e) {
        console.warn("Erreur écriture localStorage média:", e);
      }
    }
  };

  const fetchMedia = async () => {
    setIsLoading(true);

    // 1. Restauration instantanée depuis le cache navigateur local (anti-disparition au rafraîchissement)
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMediaList(parsed);
          }
        } catch {
          // Ignorer
        }
      }
    }

    // 2. Synchronisation serveur
    try {
      const res = await fetch("/api/media");
      const json = await res.json();
      if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
        setMediaList(json.data);
        saveToLocalStorage(json.data);
      }
    } catch (err) {
      console.error("Erreur chargement médiathèque:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Url = reader.result as string;
        const defaultTitle = file.name.replace(/\.[^/.]+$/, "");
        
        const newMediaPayload = {
          id: `media-${Date.now()}`,
          title: defaultTitle,
          url: base64Url,
          category: selectedCategory !== "Tous" ? selectedCategory : "Campus & Équipements",
          size: `${Math.round(file.size / 1024)} KB`,
          dimensions: "Importé",
          created_at: new Date().toISOString(),
        };

        const updated = [newMediaPayload, ...mediaList];
        setMediaList(updated);
        saveToLocalStorage(updated);

        try {
          await fetch("/api/media", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMediaPayload),
          });
        } catch (err) {
          console.error("Erreur ajout photo médiathèque:", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleOpenEditModal = (media: MediaItem) => {
    setEditingMedia(media);
    setEditTitle(media.title);
    if (["Équipe & Direction", "Campus & Bâtiments", "Campus & Étudiants", "Laboratoires & TP", "Événements & Cérémonies", "Campus & Équipements"].includes(media.category)) {
      setEditCategory(media.category);
      setCustomCategory("");
    } else {
      setEditCategory("Personnalisé");
      setCustomCategory(media.category);
    }
  };

  const handleSaveEdit = async () => {
    if (!editingMedia) return;

    const finalCat = editCategory === "Personnalisé" ? (customCategory.trim() || "Général") : editCategory;

    const updatedMedia = mediaList.map((m) =>
      m.id === editingMedia.id
        ? { ...m, title: editTitle.trim() || m.title, category: finalCat }
        : m
    );

    setMediaList(updatedMedia);
    saveToLocalStorage(updatedMedia);
    setEditingMedia(null);

    try {
      await fetch("/api/media", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingMedia.id,
          title: editTitle.trim(),
          category: finalCat,
        }),
      });
    } catch (err) {
      console.error("Erreur mise à jour photo:", err);
    }
  };

  const handleDelete = async (id: string) => {
    const updated = mediaList.filter((m) => m.id !== id);
    setMediaList(updated);
    saveToLocalStorage(updated);
    setDeleteTarget(null);

    try {
      await fetch(`/api/media?id=${id}`, { method: "DELETE" });
    } catch (err) {
      console.error("Erreur suppression photo:", err);
    }
  };

  const copyUrlToClipboard = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = [
    "Tous",
    "Équipe & Direction",
    "Campus & Bâtiments",
    "Campus & Étudiants",
    "Laboratoires & TP",
    "Campus & Équipements",
  ];

  const filteredMedia = mediaList.filter((m) => {
    const matchesCat = selectedCategory === "Tous" || m.category === selectedCategory;
    if (!matchesCat) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return m.title.toLowerCase().includes(q) || (m.category && m.category.toLowerCase().includes(q));
  });

  return (
    <div className="space-y-6">
      {/* En-tête de la Médiathèque */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-slate-900 flex items-center gap-2">
            <FileImage className="h-6 w-6 text-brand-orange" />
            Médiathèque & Banque d&apos;Images Officielle
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Gérez vos étiquettes personnalisées et conservez vos photos de campus et d&apos;équipe en toute sécurité.
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />

        <Button
          onClick={() => fileInputRef.current?.click()}
          className="gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold text-xs shadow-sm cursor-pointer"
        >
          <Upload className="h-4 w-4" /> Importer une nouvelle photo
        </Button>
      </div>

      {/* Barre de recherche & Catégories */}
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher par titre ou étiquette..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 text-xs bg-slate-50"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand-blue text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grille des Médias */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
        {isLoading && mediaList.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-48 rounded-xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <ImageIcon className="h-10 w-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">Aucune image trouvée.</p>
            <p className="text-xs text-slate-500">
              Cliquez sur &quot;Importer une nouvelle photo&quot; pour ajouter vos visuels à la banque média.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMedia.map((media) => (
              <div
                key={media.id}
                className="group rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-brand-blue hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                  <img
                    src={media.url}
                    alt={media.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Tag className="h-3 w-3 text-brand-orange" />
                    {media.category}
                  </span>
                </div>

                <div className="p-4 space-y-2 flex-1">
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-1">{media.title}</h3>
                  <div className="flex items-center justify-between text-[10px] text-slate-500">
                    <span>{media.size || "Local"}</span>
                    <span>{new Date(media.created_at).toLocaleDateString("fr-FR")}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => copyUrlToClipboard(media.id, media.url)}
                    className="text-[11px] font-bold text-brand-blue hover:text-brand-blue-dark flex items-center gap-1 cursor-pointer"
                  >
                    {copiedId === media.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-600" /> Copié !
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> URL
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(media)}
                      className="text-slate-500 hover:text-brand-blue p-1.5 rounded-lg hover:bg-slate-200 cursor-pointer transition-colors"
                      title="Modifier l'étiquette et le titre"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>

                    <button
                      onClick={() => setDeleteTarget({ id: media.id, name: media.title })}
                      className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 cursor-pointer transition-colors"
                      title="Supprimer la photo"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal d'Édition du Titre & Étiquette */}
      <Dialog open={editingMedia !== null} onOpenChange={(open) => !open && setEditingMedia(null)}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-white shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-base font-bold text-gray-900 flex items-center gap-2">
              <Tag className="h-5 w-5 text-brand-orange" />
              Modifier l&apos;Étiquette et le Titre
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-700">Titre de l&apos;image</Label>
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Ex: Laboratoire de Réseaux & Optique"
                className="text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-xs font-bold text-gray-700">Choisir une Étiquette / Catégorie</Label>
              <select
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                className="w-full h-10 px-3 rounded-xl border border-gray-200 text-xs font-medium bg-white focus:outline-none focus:ring-2 focus:ring-brand-blue"
              >
                <option value="Campus & Équipements">Campus & Équipements</option>
                <option value="Équipe & Direction">Équipe & Direction</option>
                <option value="Campus & Bâtiments">Campus & Bâtiments</option>
                <option value="Campus & Étudiants">Campus & Étudiants</option>
                <option value="Laboratoires & TP">Laboratoires & TP</option>
                <option value="Événements & Cérémonies">Événements & Cérémonies</option>
                <option value="Personnalisé">+ Créer une étiquette personnalisée...</option>
              </select>
            </div>

            {editCategory === "Personnalisé" && (
              <div className="space-y-1.5 pt-1">
                <Label className="text-xs font-bold text-brand-blue">Saisir votre étiquette sur-mesure</Label>
                <Input
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  placeholder="Ex: Remise des Diplômes 2026"
                  className="text-xs border-brand-blue"
                />
              </div>
            )}
          </div>

          <DialogFooter className="gap-2 sm:gap-0 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditingMedia(null)}
              className="text-xs rounded-xl"
            >
              Annuler
            </Button>
            <Button
              type="button"
              onClick={handleSaveEdit}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-bold rounded-xl gap-2"
            >
              <Save className="h-4 w-4" /> Enregistrer l&apos;étiquette
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
        title="Supprimer la photo"
        description="Cette photo sera définitivement retirée de la Médiathèque."
      />
    </div>
  );
}
