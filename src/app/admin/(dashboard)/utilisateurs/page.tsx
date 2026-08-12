"use client";

import { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  ShieldCheck,
  ShieldAlert,
  Search,
  Trash2,
  Lock,
  Mail,
  User,
  Eye,
  EyeOff,
  CheckCircle2,
  Clock,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import type { AdminUserAccount } from "@/app/api/admin/users/route";

export default function AdminUsersPage() {
  const [usersList, setUsersList] = useState<AdminUserAccount[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; name: string } | null>(null);

  // Modal d'ajout d'utilisateur
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalError, setModalError] = useState("");
  const [modalSuccess, setModalSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "editor" as "super_admin" | "editor" | "admin",
  });

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const json = await res.json();
      if (json.ok && Array.isArray(json.data)) {
        setUsersList(json.data);
      }
    } catch (err) {
      console.error("Erreur chargement utilisateurs:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const openAddModal = () => {
    setModalError("");
    setModalSuccess("");
    setFormData({
      full_name: "",
      email: "",
      password: "",
      role: "editor",
    });
    setIsAddModalOpen(true);
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setModalError("");
    setModalSuccess("");

    if (!formData.full_name || !formData.email || !formData.password) {
      setModalError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (formData.password.length < 6) {
      setModalError("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!json.ok) {
        setModalError(json.error || "Erreur lors de la création du compte.");
        setIsSubmitting(false);
        return;
      }

      setModalSuccess("Utilisateur administrateur créé avec succès !");
      await fetchUsers();
      setTimeout(() => {
        setIsAddModalOpen(false);
        setIsSubmitting(false);
      }, 1200);
    } catch (err) {
      setModalError("Une erreur est survenue lors de la communication avec le serveur.");
      setIsSubmitting(false);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      await fetchUsers();
    } catch (err) {
      console.error("Erreur lors de la suppression:", err);
    }
  };

  const filteredUsers = usersList.filter((u) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return u.full_name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brand-blue/10 text-brand-blue">
              <Users className="h-6 w-6" />
            </div>
            <h1 className="font-heading text-xl font-bold text-slate-900">
              Gestion des Comptes Administrateurs
            </h1>
          </div>
          <p className="text-xs text-slate-500 pl-10">
            Autorisez de nouveaux membres de l'équipe et gérez les rôles d'accès au back-office.
          </p>
        </div>

        <Button
          onClick={openAddModal}
          className="gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold text-xs h-10 px-5 shadow-xs cursor-pointer"
        >
          <UserPlus className="h-4 w-4" />
          Ajouter un Administrateur
        </Button>
      </div>

      {/* Barre de recherche et Filtre */}
      <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Rechercher par nom, prénom ou email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs h-9"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500 whitespace-nowrap">
          Total : <span className="text-slate-900 font-bold">{filteredUsers.length} comptes</span>
        </div>
      </div>

      {/* Tableau des utilisateurs */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {isLoading ? (
          <div className="p-8 space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-14 bg-slate-100 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <Users className="h-12 w-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-700 text-sm">Aucun utilisateur trouvé</h3>
            <p className="text-xs text-slate-500">
              Modifiez votre recherche ou ajoutez un nouveau compte administrateur.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-3.5 px-4">Utilisateur / Nom</th>
                  <th className="py-3.5 px-4">Adresse Email</th>
                  <th className="py-3.5 px-4">Rôle & Privilèges</th>
                  <th className="py-3.5 px-4">Date de Création</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-brand-blue/10 text-brand-blue font-bold flex items-center justify-center text-xs">
                          {user.full_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900">{user.full_name}</div>
                          <div className="text-[10px] text-slate-400">ID: {user.id.slice(0, 8)}...</div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-medium text-slate-700">
                      {user.email}
                    </td>

                    <td className="py-3.5 px-4">
                      {user.role === "super_admin" ? (
                        <Badge className="bg-purple-100 text-purple-800 border-purple-200 gap-1 font-bold text-[10px]">
                          <ShieldCheck className="h-3 w-3 text-purple-600" />
                          Super Administrateur
                        </Badge>
                      ) : user.role === "admin" ? (
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200 gap-1 font-bold text-[10px]">
                          <ShieldCheck className="h-3 w-3 text-brand-blue" />
                          Administrateur
                        </Badge>
                      ) : (
                        <Badge className="bg-slate-100 text-slate-700 border-slate-200 gap-1 font-bold text-[10px]">
                          <Users className="h-3 w-3 text-slate-500" />
                          Éditeur de Contenu
                        </Badge>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-500">
                      {new Date(user.created_at).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        disabled={user.email.toLowerCase() === "direction@digiset-gabon.com"}
                        onClick={() => setDeleteTarget({ id: user.id, name: user.full_name })}
                        className="text-red-600 hover:bg-red-50 hover:text-red-700 h-8 w-8 p-0 cursor-pointer disabled:opacity-30"
                        title={
                          user.email.toLowerCase() === "direction@digiset-gabon.com"
                            ? "Le compte de la Direction Générale ne peut pas être supprimé"
                            : "Supprimer cet utilisateur"
                        }
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal d'ajout d'utilisateur */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-xl w-[95vw] rounded-2xl p-0 gap-0 overflow-hidden shadow-2xl border border-slate-200 bg-white max-h-[92vh] flex flex-col">
          <DialogHeader className="p-5 sm:p-6 pb-4 bg-slate-50 border-b border-slate-200 shrink-0">
            <DialogTitle className="font-heading text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange">
                <UserPlus className="h-5 w-5" />
              </div>
              Créer un Compte Administrateur
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-slate-500 mt-1">
              Renseignez les identifiants pour permettre à un collaborateur d'accéder au back-office.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateUser} className="p-5 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto max-h-[75vh] text-xs sm:text-sm">
            {modalError && (
              <div className="flex items-start gap-2.5 rounded-xl bg-red-50 p-3.5 text-xs font-medium text-red-700 border border-red-200">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{modalError}</span>
              </div>
            )}

            {modalSuccess && (
              <div className="flex items-center gap-2.5 rounded-xl bg-emerald-50 p-3.5 text-xs font-bold text-emerald-800 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                <span>{modalSuccess}</span>
              </div>
            )}

            <div className="space-y-2">
              <label className="font-bold text-slate-700 text-xs sm:text-sm">Nom et Prénom *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  required
                  placeholder="ex: Jean-Claude MBOUMBA"
                  value={formData.full_name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, full_name: e.target.value }))}
                  className="pl-10 text-xs sm:text-sm h-11 rounded-xl bg-white border-slate-300 font-medium text-slate-800 focus:border-brand-blue shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 text-xs sm:text-sm">Adresse Email Professionnelle *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type="email"
                  required
                  placeholder="collaborateur@digiset-gabon.com"
                  value={formData.email}
                  onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                  className="pl-10 text-xs sm:text-sm h-11 rounded-xl bg-white border-slate-300 font-medium text-slate-800 focus:border-brand-blue shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 text-xs sm:text-sm">Mot de Passe *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className="pl-10 pr-10 text-xs sm:text-sm h-11 rounded-xl bg-white border-slate-300 font-medium text-slate-800 focus:border-brand-blue shadow-xs"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-bold text-slate-700 text-xs sm:text-sm">Rôle & Droits d'Accès *</label>
              <Select
                value={formData.role}
                onValueChange={(val) => {
                  if (val) {
                    setFormData((prev) => ({ ...prev, role: val as "super_admin" | "editor" | "admin" }));
                  }
                }}
              >
                <SelectTrigger className="h-11 rounded-xl text-xs sm:text-sm bg-white border-slate-300 font-medium text-slate-800 shadow-xs focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue">
                  <SelectValue placeholder="Sélectionner un rôle" />
                </SelectTrigger>
                <SelectContent className="rounded-xl shadow-xl border-slate-200">
                  <SelectItem value="editor" className="rounded-lg text-xs sm:text-sm py-2.5">
                    Éditeur de Contenu (Publication & Rédaction)
                  </SelectItem>
                  <SelectItem value="admin" className="rounded-lg text-xs sm:text-sm py-2.5">
                    Administrateur (Gestion des Contenus & Soumissions)
                  </SelectItem>
                  <SelectItem value="super_admin" className="rounded-lg text-xs sm:text-sm py-2.5">
                    Super Administrateur (Accès Total & Gestion Comptes)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="pt-4 flex flex-col-reverse sm:flex-row items-center justify-end gap-3 border-t border-slate-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddModalOpen(false)}
                className="w-full sm:w-auto text-xs sm:text-sm h-11 rounded-xl font-bold px-5"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-brand-orange text-white hover:bg-brand-orange-dark font-bold text-xs sm:text-sm h-11 rounded-xl px-6 shadow-md cursor-pointer"
              >
                {isSubmitting ? "Création en cours..." : "Créer le Compte Administrateur"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation de suppression */}
      {deleteTarget && (
        <ConfirmDeleteDialog
          isOpen={!!deleteTarget}
          onClose={() => setDeleteTarget(null)}
          onConfirm={() => {
            handleDeleteUser(deleteTarget.id);
            setDeleteTarget(null);
          }}
          title="Supprimer ce compte administrateur"
          description="Êtes-vous sûr de vouloir supprimer cet accès administrateur ? Cet utilisateur ne pourra plus se connecter au back-office."
          itemName={deleteTarget.name}
        />
      )}
    </div>
  );
}
