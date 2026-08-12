"use client";

import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MediaItem } from "@/lib/media-store";
import {
  ImageIcon,
  Upload,
  Search,
  Check,
  Plus,
  FileImage,
  X,
  Sparkles,
  Trash2,
} from "lucide-react";

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia: (mediaUrl: string, mediaItem?: MediaItem) => void;
  currentSelectedUrl?: string;
  title?: string;
}

export function MediaPickerModal({
  isOpen,
  onClose,
  onSelectMedia,
  currentSelectedUrl = "",
  title = "Médiathèque - Sélectionner ou Importer une Photo",
}: MediaPickerModalProps) {
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [selectedItemUrl, setSelectedItemUrl] = useState(currentSelectedUrl);

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
    if (isOpen) {
      setSelectedItemUrl(currentSelectedUrl);
      fetchMedia();
    }
  }, [isOpen, currentSelectedUrl]);

  // Upload direct d'une nouvelle photo vers la médiathèque
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Url = reader.result as string;
        const newMediaPayload = {
          title: file.name.replace(/\.[^/.]+$/, ""),
          url: base64Url,
          category: "Uploads Récents",
          size: `${Math.round(file.size / 1024)} KB`,
          dimensions: "Image Importée",
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
            setSelectedItemUrl(json.data.url);
          }
        } catch (err) {
          console.error("Erreur ajout photo médiathèque:", err);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Filtrage des photos
  const categories = ["Tous", "Équipe & Direction", "Campus & Bâtiments", "Campus & Étudiants", "Laboratoires & TP", "Uploads Récents"];

  const filteredMedia = mediaList.filter((m) => {
    const matchesCat = selectedCategory === "Tous" || m.category === selectedCategory;
    if (!matchesCat) return false;

    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return m.title.toLowerCase().includes(q) || (m.category && m.category.toLowerCase().includes(q));
  });

  const handleConfirmSelect = (urlToUse?: string) => {
    const targetUrl = urlToUse || selectedItemUrl;
    if (!targetUrl) return;
    const matchedItem = mediaList.find((m) => m.url === targetUrl);
    onSelectMedia(targetUrl, matchedItem);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[96vw] max-h-[92vh] flex flex-col p-0 overflow-hidden rounded-2xl border-2 border-slate-200 shadow-2xl bg-white">
        
        {/* Header Fixe */}
        <DialogHeader className="p-5 bg-slate-50 border-b border-slate-200 shrink-0 flex flex-row items-center justify-between">
          <div>
            <DialogTitle className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileImage className="h-5 w-5 text-brand-orange" />
              {title}
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600 font-medium mt-0.5">
              Sélectionnez une photo de la banque média ou importez un nouveau fichier depuis votre appareil.
            </DialogDescription>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold gap-1.5 shadow-sm cursor-pointer shrink-0"
          >
            <Upload className="h-4 w-4" />
            <span>Importer une photo</span>
          </Button>
        </DialogHeader>

        {/* Zone de Recherche et Filtres */}
        <div className="p-4 bg-white border-b border-slate-100 space-y-3 shrink-0">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Rechercher une photo par nom ou catégorie (ex: Fondateur, Akanda, TP...)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 text-xs bg-slate-50 border-slate-200 h-10"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`text-[11px] font-bold px-3 py-1.5 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
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

        {/* Galerie de Photos (Grille Réactive) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 max-h-[calc(90vh-210px)] bg-slate-50/50">
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="h-36 rounded-xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <ImageIcon className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="text-xs font-bold text-slate-700">Aucune photo trouvée dans la Médiathèque.</p>
              <p className="text-[11px] text-slate-500">
                Cliquez sur le bouton &quot;Importer une photo&quot; ci-dessus pour ajouter vos propres images.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredMedia.map((media) => {
                const isSelected = selectedItemUrl === media.url;
                return (
                  <div
                    key={media.id}
                    onClick={() => setSelectedItemUrl(media.url)}
                    onDoubleClick={() => handleConfirmSelect(media.url)}
                    className={`group relative rounded-xl border-2 overflow-hidden bg-white cursor-pointer transition-all shadow-xs ${
                      isSelected
                        ? "border-brand-orange ring-2 ring-brand-orange/30 shadow-md scale-[1.02]"
                        : "border-slate-200 hover:border-brand-blue hover:shadow-md"
                    }`}
                  >
                    <div className="relative h-28 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={media.url}
                        alt={media.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-brand-orange text-white p-1 rounded-full shadow-md">
                          <Check className="h-3.5 w-3.5 stroke-[3]" />
                        </div>
                      )}
                    </div>
                    <div className="p-2.5 space-y-0.5">
                      <p className="text-[11px] font-bold text-slate-900 truncate">{media.title}</p>
                      <p className="text-[10px] text-slate-500 truncate">{media.category}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Fixe avec Validation */}
        <div className="p-4 px-6 bg-slate-100 border-t border-slate-200 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-600 font-medium truncate w-full sm:w-auto">
            {selectedItemUrl ? (
              <span className="text-brand-blue font-bold flex items-center gap-1.5">
                <Check className="h-4 w-4 text-emerald-600" /> Photo sélectionnée
              </span>
            ) : (
              <span>Aucune photo sélectionnée</span>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-xs font-bold bg-white hover:bg-slate-200 cursor-pointer"
            >
              Annuler
            </Button>
            <Button
              type="button"
              disabled={!selectedItemUrl}
              onClick={() => handleConfirmSelect()}
              className="bg-brand-blue hover:bg-brand-blue-dark text-white text-xs font-extrabold px-6 py-2.5 rounded-xl shadow-md cursor-pointer disabled:opacity-50"
            >
              Utiliser cette photo
            </Button>
          </div>
        </div>

      </DialogContent>
    </Dialog>
  );
}
