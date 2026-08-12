"use client";

import { useState, useEffect, useRef } from "react";
import {
  Users,
  PlusCircle,
  Search,
  Edit3,
  Trash2,
  Upload,
  X,
  Mail,
  UserCheck,
  FileImage,
} from "lucide-react";
import { TeamMember, INITIAL_TEAM } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

const POLE_OPTIONS = [
  "Direction Générale",
  "Direction Académique",
  "Conseil Scientifique",
  "Pôles de Formation",
  "Corps Professoral",
  "Plateaux Techniques & Labos",
  "Secrétariat & Administration",
];

const LOCAL_STORAGE_KEY = "digiset_team_local_cache_v2";

export default function AdminTeamPage() {
  const [teamList, setTeamList] = useState<TeamMember[]>(INITIAL_TEAM);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [poleFilter, setPoleFilter] = useState("all");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isMediaPickerOpen, setIsMediaPickerOpen] = useState(false);

  const saveToLocalStorage = (list: TeamMember[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
      } catch (e) {
        console.error("Erreur sauvegarde local storage:", e);
      }
    }
  };

  const fetchTeam = async () => {
    setIsLoading(true);

    // 1. Restauration instantanée depuis le cache navigateur local
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setTeamList(parsed);
          }
        } catch {
          // Ignorer
        }
      }
    }

    // 2. Synchronisation serveur
    try {
      const res = await fetch("/api/team");
      const json = await res.json();
      if (json.ok && Array.isArray(json.data) && json.data.length > 0) {
        setTeamList(json.data);
        saveToLocalStorage(json.data);
      }
    } catch (err) {
      console.error("Erreur chargement équipe:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  // Form State
  const [formData, setFormData] = useState({
    full_name: "",
    role_title: "",
    pole: "Direction Générale",
    photo_url: "/brand/fondateur.png",
    bio: "",
    email: "",
    facebook_url: "",
    linkedin_url: "",
    sort_order: 1,
  });

  const openCreateModal = () => {
    setEditingMember(null);
    setFormData({
      full_name: "",
      role_title: "",
      pole: "Direction Générale",
      photo_url: "/brand/fondateur.png",
      bio: "",
      email: "",
      facebook_url: "",
      linkedin_url: "",
      sort_order: teamList.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      full_name: member.full_name,
      role_title: member.role_title,
      pole: member.pole || "Direction Générale",
      photo_url: member.photo_url || "/brand/fondateur.png",
      bio: member.bio || "",
      email: member.email || "",
      facebook_url: member.facebook_url || "",
      linkedin_url: member.linkedin_url || "",
      sort_order: member.sort_order || 1,
    });
    setIsModalOpen(true);
  };

  const handleSaveMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.role_title) return;

    const payload: TeamMember = {
      id: editingMember ? editingMember.id : `team-${Date.now()}`,
      full_name: formData.full_name,
      role_title: formData.role_title,
      pole: formData.pole || "Direction Générale",
      photo_url: formData.photo_url || "/brand/fondateur.png",
      bio: formData.bio || "",
      email: formData.email || "",
      facebook_url: formData.facebook_url || "",
      linkedin_url: formData.linkedin_url || "",
      sort_order: formData.sort_order || 1,
      created_at: editingMember ? editingMember.created_at : new Date().toISOString(),
    };

    let updatedList: TeamMember[];
    if (editingMember) {
      updatedList = teamList.map((m) => (m.id === editingMember.id ? payload : m));
    } else {
      updatedList = [...teamList, payload];
    }

    // Mise à jour réactive immédiate dans le navigateur (zéro délai de rafraîchissement)
    setTeamList(updatedList);
    saveToLocalStorage(updatedList);
    setIsModalOpen(false);

    try {
      if (editingMember) {
        await fetch("/api/team", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } else {
        await fetch("/api/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
      await fetchTeam();
    } catch (err) {
      console.error("Erreur enregistrement membre serveur:", err);
    }
  };

  const handleDelete = async (id: string) => {
    const updatedList = teamList.filter((m) => m.id !== id);
    setTeamList(updatedList);
    saveToLocalStorage(updatedList);

    try {
      await fetch(`/api/team?id=${id}`, { method: "DELETE" });
      await fetchTeam();
    } catch (err) {
      console.error("Erreur suppression membre:", err);
    }
  };

  const filteredTeam = teamList.filter((m) => {
    if (poleFilter !== "all" && m.pole !== poleFilter) return false;
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      return (
        m.full_name.toLowerCase().includes(q) ||
        m.role_title.toLowerCase().includes(q) ||
        (m.bio && m.bio.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">
            Organigramme & Équipe Dirigeante
          </h1>
          <p className="text-xs text-gray-500">
            Gérez les fiches des membres de la Direction Générale, du Conseil Scientifique et des Pôles.
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold text-xs shadow-sm cursor-pointer"
        >
          <PlusCircle className="h-4 w-4" /> Ajouter un membre
        </Button>
      </div>

      {/* Barre de Recherche et Filtres par Pôle */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher par nom, rôle ou spécialité..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-500">Pôle :</span>
          <Select value={poleFilter} onValueChange={(val) => setPoleFilter(val || "all")}>
            <SelectTrigger className="w-[180px] text-xs h-9">
              <SelectValue placeholder="Tous les pôles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les pôles ({teamList.length})</SelectItem>
              {POLE_OPTIONS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grille des Membres sous forme de cartes professionnelles */}
      {isLoading && teamList.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4 animate-pulse">
              <div className="h-16 w-16 rounded-full bg-gray-200 mx-auto" />
              <div className="h-4 w-1/2 bg-gray-200 rounded mx-auto" />
              <div className="h-3 w-1/3 bg-gray-200 rounded mx-auto" />
            </div>
          ))}
        </div>
      ) : filteredTeam.length === 0 ? (
        <div className="py-12 text-center border rounded-xl bg-gray-50">
          <Users className="mx-auto h-10 w-10 text-gray-300" />
          <p className="mt-2 text-sm font-medium text-gray-600">Aucun membre trouvé.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeam.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-xs hover:border-brand-blue hover:shadow-md transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-brand-blue/10 px-2.5 py-1 text-[10px] font-bold text-brand-blue uppercase tracking-wider">
                    {member.pole}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400">
                    Ordre: #{member.sort_order}
                  </span>
                </div>

                <div className="text-center space-y-2">
                  <Avatar className="h-20 w-20 mx-auto border-2 border-brand-orange/30 shadow-xs">
                    <AvatarImage src={member.photo_url || "/brand/fondateur.png"} alt={member.full_name} />
                    <AvatarFallback className="bg-brand-blue text-white font-bold">
                      {member.full_name.substring(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className="font-bold text-sm text-gray-900">{member.full_name}</h3>
                    <p className="text-xs font-semibold text-brand-orange">{member.role_title}</p>
                  </div>

                  {member.bio && (
                    <p className="text-[11px] text-gray-600 line-clamp-2 italic px-2">
                      &quot;{member.bio}&quot;
                    </p>
                  )}
                </div>

                {member.email && (
                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500">
                    <Mail className="h-3.5 w-3.5 text-brand-blue" />
                    <span>{member.email}</span>
                  </div>
                )}
              </div>

              {/* Boutons d'Action */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => openEditModal(member)}
                  className="text-xs gap-1 font-semibold hover:text-brand-blue cursor-pointer"
                >
                  <Edit3 className="h-3.5 w-3.5" /> Modifier
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setDeleteTarget({ id: member.id, name: member.full_name })}
                  className="text-xs gap-1 font-semibold text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700 cursor-pointer"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Supprimer
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal d'Édition / Création de membre CONNECTÉ À LA MÉDIATHÈQUE */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-xl w-[94vw] max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-2xl border-2 border-slate-200 shadow-2xl bg-white">
            <DialogHeader className="p-5 bg-slate-50 border-b border-slate-200 shrink-0">
              <DialogTitle className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-brand-orange" />
                {editingMember ? "Modifier le membre" : "Ajouter un membre à l'organigramme"}
              </DialogTitle>
              <DialogDescription className="text-xs text-slate-600 font-medium">
                Renseignez les informations du membre et choisissez sa photo depuis la Médiathèque.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveMember} className="flex flex-col flex-1 overflow-hidden min-h-0">
              <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs max-h-[calc(90vh-140px)]">
                
                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Nom complet & Titre académique *</label>
                  <Input
                    required
                    placeholder="ex. Dr. ABAGA ABESSOLO Michel Audrey"
                    value={formData.full_name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                    className="text-xs font-bold text-slate-900 bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Fonction / Rôle *</label>
                  <Input
                    required
                    placeholder="ex. Fondateur & Directeur Général"
                    value={formData.role_title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, role_title: e.target.value }))}
                    className="text-xs bg-white"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Pôle d&apos;activité</label>
                    <Select
                      value={formData.pole}
                      onValueChange={(val) => setFormData((prev) => ({ ...prev, pole: val || "Direction Générale" }))}
                    >
                      <SelectTrigger className="text-xs h-9 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {POLE_OPTIONS.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Ordre d&apos;affichage</label>
                    <Input
                      type="number"
                      min={1}
                      value={formData.sort_order}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 1 }))
                      }
                      className="text-xs bg-white"
                    />
                  </div>
                </div>

                {/* Photo de profil avec la Médiathèque */}
                <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <label className="font-bold text-slate-900 flex items-center justify-between text-[11px] uppercase tracking-wider text-brand-blue">
                    <span>Photo de profil</span>
                    <Button
                      type="button"
                      onClick={() => setIsMediaPickerOpen(true)}
                      className="bg-brand-blue hover:bg-brand-blue-dark text-white text-[11px] font-bold px-3 py-1 rounded-lg gap-1.5 cursor-pointer"
                    >
                      <FileImage className="h-3.5 w-3.5 text-brand-orange" />
                      <span>Ouvrir la Médiathèque</span>
                    </Button>
                  </label>

                  {formData.photo_url ? (
                    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 bg-white shadow-2xs">
                      <Avatar className="h-14 w-14 border shrink-0">
                        <AvatarImage src={formData.photo_url} />
                        <AvatarFallback>DS</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-900">Photo sélectionnée</p>
                        <button
                          type="button"
                          onClick={() => setIsMediaPickerOpen(true)}
                          className="text-[11px] font-bold text-brand-orange hover:underline mt-0.5 block"
                        >
                          Changer depuis la Médiathèque →
                        </button>
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData((prev) => ({ ...prev, photo_url: "" }))}
                        className="text-xs text-red-600 border-red-200 hover:bg-red-50 cursor-pointer"
                      >
                        <X className="h-3.5 w-3.5 mr-1" /> Retirer
                      </Button>
                    </div>
                  ) : (
                    <div
                      onClick={() => setIsMediaPickerOpen(true)}
                      className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-300 bg-white p-5 text-center cursor-pointer hover:bg-slate-100/80 transition-colors"
                    >
                      <FileImage className="h-7 w-7 text-brand-orange mb-1" />
                      <span className="text-xs font-bold text-slate-900">Ouvrir la Médiathèque pour choisir ou importer une photo</span>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Adresse email professionnelle</label>
                    <Input
                      type="email"
                      placeholder="direction@digiset-gabon.com"
                      value={formData.email}
                      onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                      className="text-xs bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-slate-700">Profil LinkedIn (URL)</label>
                    <Input
                      type="url"
                      placeholder="https://linkedin.com/in/nom-profil"
                      value={formData.linkedin_url}
                      onChange={(e) => setFormData((prev) => ({ ...prev, linkedin_url: e.target.value }))}
                      className="text-xs bg-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Profil / Page Facebook (URL)</label>
                  <Input
                    type="url"
                    placeholder="https://facebook.com/nom-page"
                    value={formData.facebook_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, facebook_url: e.target.value }))}
                    className="text-xs bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-slate-700">Biographie courte / Présentation</label>
                  <Textarea
                    rows={3}
                    placeholder="Expert en cybersécurité, enseignant-chercheur..."
                    value={formData.bio}
                    onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                    className="text-xs bg-white"
                  />
                </div>
              </div>

              {/* FOOTER FIXE */}
              <div className="flex items-center justify-end gap-3 p-4 px-6 border-t border-slate-200 bg-slate-100 shrink-0 z-50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs font-bold bg-white hover:bg-slate-200 cursor-pointer"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-extrabold px-6 py-2.5 rounded-xl shadow-md cursor-pointer"
                >
                  {editingMember ? "Enregistrer les modifications" : "Ajouter le membre"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal de Sélection depuis la Médiathèque */}
      <MediaPickerModal
        isOpen={isMediaPickerOpen}
        onClose={() => setIsMediaPickerOpen(false)}
        currentSelectedUrl={formData.photo_url}
        onSelectMedia={(url) => setFormData((prev) => ({ ...prev, photo_url: url }))}
        title="Sélectionner ou importer la photo du membre"
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
        title="Supprimer le membre"
        description="Le membre sera définitivement retiré de l'organigramme."
      />
    </div>
  );
}
