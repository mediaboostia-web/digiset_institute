"use client";

import { useState, useEffect, useRef } from "react";
import {
  FolderImage,
  Upload,
  Search,
  Trash2,
  Copy,
  Check,
  Plus,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MediaItem } from "@/lib/media-store";
import { ConfirmDeleteDialog } from "@/components/admin/confirm-delete-dialog";

export default function AdminGalleryPage() {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchMedia = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/media");
      const json = await res.json();
      if (json.ok && Array.isArray(json.data)) {
        setMediaList(json.data);
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
        const newMediaPayload = {
          title: file.name.replace(/\.[^/.]+$/, ""),
          url: base64Url,
          category: "Campus & Uploads",
          size: `${Math.round(file.size / 1024)} KB`,
          dimensions: "Importé",
        };

        try {
          const res = await fetch("/api/media", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newMediaPayload),
          });
          const json = await res.json();
          if (json.ok && json.data) {
            setMediaList((prev) => [json.data, ...prev]);
          }
        } catch (err) {
          console.error("Erreur ajout photo médiathèque:", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = async (id: string) => {
    setMediaList((prev) => prev.filter((m) => m.id !== id));
    try {
      await fetch(`/api/media?id=${id}`, { method: "DELETE" });
      await fetchMedia();
    } catch (err) {
      console.error("Erreur suppression photo:", err);
    }
  };

  const copyUrlToClipboard = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = ["Tous", "Équipe & Direction", "Campus & Bâtiments", "Campus & Étudiants", "Laboratoires & TP", "Campus & Uploads"];

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
            <FolderImage className="h-6 w-6 text-brand-orange" />
            Médiathèque & Banque d&apos;Images Officielle
          </h1>
          <p className="text-xs text-slate-500">
            Stockez, organisez et réutilisez toutes les photos du campus, des laboratoires et de l&apos;équipe pour vos articles et pages.
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
              placeholder="Rechercher une photo dans la banque de médias..."
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
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-48 rounded-xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredMedia.length === 0 ? (
          <div className="py-16 text-center space-y-3">
            <ImageIcon className="h-10 w-10 text-slate-300 mx-auto" />
            <p className="text-sm font-bold text-slate-700">Aucune image dans cette catégorie.</p>
            <p className="text-xs text-slate-500">
              Importez des photos pour enrichir la médiathèque de DigiSET Institute.
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
                  <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
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
                        <Copy className="h-3.5 w-3.5" /> Copier l&apos;URL
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => setDeleteTarget({ id: media.id, name: media.title })}
                    className="text-slate-400 hover:text-red-600 p-1 cursor-pointer transition-colors"
                    title="Supprimer la photo"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

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
        description="Cette photo sera retirée de la Médiathèque."
      />
    </div>
  );
}
