"use client";

import { useState, useRef } from "react";
import {
  UserPlus,
  Edit3,
  Trash2,
  Mail,
  Upload,
  X,
  Share2,
} from "lucide-react";
import { INITIAL_TEAM, TeamMember } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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

// Composants Icônes Réseaux Sociaux SVGs
function LinkedInIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26Z" />
    </svg>
  );
}

function FacebookIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.21.19 2.21.19v2.43h-1.25c-1.23 0-1.61.76-1.61 1.54V12h2.73l-.44 3h-2.29v6.8c4.56-.93 8-4.96 8-9.8Z" />
    </svg>
  );
}

export default function AdminTeamPage() {
  const [teamList, setTeamList] = useState<TeamMember[]>(INITIAL_TEAM);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<{
    full_name: string;
    role_title: string;
    pole: string;
    photo_url: string;
    bio: string;
    email: string;
    facebook_url: string;
    linkedin_url: string;
    sort_order: number;
  }>({
    full_name: "",
    role_title: "",
    pole: "Direction Générale",
    photo_url: "",
    bio: "",
    email: "",
    facebook_url: "",
    linkedin_url: "",
    sort_order: teamList.length + 1,
  });

  const openCreateModal = () => {
    setEditingMember(null);
    setFormData({
      full_name: "",
      role_title: "",
      pole: "Direction Générale",
      photo_url: "",
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
      photo_url: member.photo_url || "",
      bio: member.bio || "",
      email: member.email || "",
      facebook_url: member.facebook_url || "",
      linkedin_url: member.linkedin_url || "",
      sort_order: member.sort_order,
    });
    setIsModalOpen(true);
  };

  const handlePhotoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, photo_url: imageUrl }));
    }
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.full_name || !formData.role_title) return;

    if (editingMember) {
      setTeamList((prev) =>
        prev.map((item) =>
          item.id === editingMember.id
            ? {
                ...item,
                full_name: formData.full_name,
                role_title: formData.role_title,
                pole: formData.pole,
                photo_url: formData.photo_url,
                bio: formData.bio,
                email: formData.email,
                facebook_url: formData.facebook_url,
                linkedin_url: formData.linkedin_url,
                sort_order: formData.sort_order,
              }
            : item
        )
      );
    } else {
      const newMember: TeamMember = {
        id: `team-${Date.now()}`,
        full_name: formData.full_name,
        role_title: formData.role_title,
        pole: formData.pole,
        photo_url: formData.photo_url,
        bio: formData.bio,
        email: formData.email,
        facebook_url: formData.facebook_url,
        linkedin_url: formData.linkedin_url,
        sort_order: formData.sort_order,
        created_at: new Date().toISOString(),
      };
      setTeamList((prev) => [...prev, newMember].sort((a, b) => a.sort_order - b.sort_order));
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    setTeamList((prev) => prev.filter((item) => item.id !== id));
  };

  const sortedTeam = [...teamList].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">
            Organigramme & Équipe Dirigeante
          </h1>
          <p className="text-xs text-gray-500">
            Gérez les membres de la direction, du conseil d'administration et du corps professoral.
          </p>
        </div>
        <Button
          onClick={openCreateModal}
          className="gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold text-xs shadow-sm"
        >
          <UserPlus className="h-4 w-4" /> Ajouter un membre
        </Button>
      </div>

      {/* Cartes des Membres de l'Équipe */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedTeam.map((member) => (
          <div
            key={member.id}
            className="flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-6 shadow-xs transition-shadow hover:shadow-md"
          >
            <div>
              <div className="flex items-start justify-between">
                <Avatar className="h-16 w-16 border-2 border-brand-blue/20">
                  <AvatarImage src={member.photo_url} alt={member.full_name} />
                  <AvatarFallback className="bg-brand-blue-dark text-white font-bold text-base">
                    {member.full_name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <Badge variant="outline" className="text-[10px] font-bold text-gray-600 bg-gray-50">
                  Ordre #{member.sort_order}
                </Badge>
              </div>

              <div className="mt-4">
                <h3 className="font-heading text-base font-bold text-gray-900">
                  {member.full_name}
                </h3>
                <p className="text-xs font-semibold text-brand-blue mt-0.5">
                  {member.role_title}
                </p>
                <Badge className="mt-2 bg-gray-100 text-gray-700 hover:bg-gray-100 font-medium text-[10px]">
                  {member.pole || "Direction"}
                </Badge>
              </div>

              {member.bio && (
                <p className="mt-3 text-xs text-gray-600 line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>
              )}

              {/* Coordonnées & Réseaux Sociaux */}
              <div className="mt-4 pt-3 border-t border-gray-100 space-y-2 text-xs">
                {member.email && (
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <Mail className="h-3.5 w-3.5 text-gray-400 shrink-0" />
                    <a href={`mailto:${member.email}`} className="hover:text-brand-blue font-medium truncate">
                      {member.email}
                    </a>
                  </div>
                )}

                <div className="flex items-center gap-2 pt-1">
                  {member.linkedin_url && (
                    <a
                      href={member.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-700 hover:bg-blue-100 transition-colors"
                      title="Profil LinkedIn"
                    >
                      <LinkedInIcon className="h-3 w-3" /> LinkedIn
                    </a>
                  )}

                  {member.facebook_url && (
                    <a
                      href={member.facebook_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 rounded-md bg-sky-50 px-2 py-1 text-[11px] font-bold text-sky-700 hover:bg-sky-100 transition-colors"
                      title="Page Facebook"
                    >
                      <FacebookIcon className="h-3 w-3" /> Facebook
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1.5 text-xs font-bold text-gray-700"
                onClick={() => openEditModal(member)}
              >
                <Edit3 className="h-3.5 w-3.5" /> Modifier
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 text-xs text-red-500 hover:bg-red-50 hover:text-red-700"
                onClick={() => handleDelete(member.id)}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal d'édition / création de membre réactif */}
      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-lg w-[92vw] max-h-[88vh] overflow-y-auto overflow-x-hidden p-6">
            <DialogHeader className="border-b border-gray-100 pb-4">
              <DialogTitle className="font-heading text-lg font-bold text-gray-900">
                {editingMember ? "Modifier le profil" : "Ajouter un membre à l'organigramme"}
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Renseignez les informations du membre, téléversez sa photo et ajoutez ses liens sociaux.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSaveMember} className="space-y-4 py-2 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700">Nom complet & Titre académique *</label>
                <Input
                  required
                  placeholder="ex. Dr. ABAGA ABESSOLO Michel Audrey"
                  value={formData.full_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700">Fonction / Rôle *</label>
                <Input
                  required
                  placeholder="ex. Fondateur & Directeur Général"
                  value={formData.role_title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role_title: e.target.value }))}
                  className="text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700">Pôle d'activité</label>
                  <Select
                    value={formData.pole}
                    onValueChange={(val) => setFormData((prev) => ({ ...prev, pole: val || "Direction Générale" }))}
                  >
                    <SelectTrigger className="text-xs h-9">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Direction Générale">Direction Générale</SelectItem>
                      <SelectItem value="Direction Académique">Direction Académique</SelectItem>
                      <SelectItem value="Corps Professoral">Corps Professoral</SelectItem>
                      <SelectItem value="Administration & Partenariats">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700">Ordre d'affichage</label>
                  <Input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, sort_order: parseInt(e.target.value) || 1 }))
                    }
                    className="text-xs"
                  />
                </div>
              </div>

              {/* Téléversement de Photo */}
              <div className="space-y-2">
                <label className="font-bold text-gray-700">Photo de profil</label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoFileUpload}
                  className="hidden"
                />

                {formData.photo_url ? (
                  <div className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 bg-gray-50">
                    <Avatar className="h-12 w-12 border">
                      <AvatarImage src={formData.photo_url} />
                      <AvatarFallback>DS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 truncate">Photo chargée</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setFormData((prev) => ({ ...prev, photo_url: "" }))}
                      className="text-xs text-red-600 border-red-200"
                    >
                      <X className="h-3.5 w-3.5 mr-1" /> Retirer
                    </Button>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 p-4 text-center cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <Upload className="h-5 w-5 text-brand-blue" />
                    <span className="text-xs font-bold text-gray-900">Téléverser une photo depuis votre appareil</span>
                  </div>
                )}

                <Input
                  placeholder="Ou URL externe : https://..."
                  value={formData.photo_url}
                  onChange={(e) => setFormData((prev) => ({ ...prev, photo_url: e.target.value }))}
                  className="text-xs mt-1"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700">Adresse email professionnelle</label>
                <Input
                  type="email"
                  placeholder="m.abaga@digiset-gabon.com"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="text-xs"
                />
              </div>

              {/* Liens Réseaux Sociaux : LinkedIn & Facebook */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700 flex items-center gap-1">
                    <LinkedInIcon className="h-3.5 w-3.5 text-blue-600" /> Profil LinkedIn
                  </label>
                  <Input
                    placeholder="https://linkedin.com/in/..."
                    value={formData.linkedin_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, linkedin_url: e.target.value }))}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700 flex items-center gap-1">
                    <FacebookIcon className="h-3.5 w-3.5 text-sky-600" /> Page Facebook
                  </label>
                  <Input
                    placeholder="https://facebook.com/..."
                    value={formData.facebook_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, facebook_url: e.target.value }))}
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700">Biographie courte / Présentation</label>
                <Textarea
                  rows={3}
                  placeholder="Parcours académique, spécialités et responsabilités..."
                  value={formData.bio}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                  className="text-xs resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="text-xs"
                >
                  Annuler
                </Button>
                <Button type="submit" className="bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold">
                  {editingMember ? "Enregistrer" : "Ajouter le membre"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
