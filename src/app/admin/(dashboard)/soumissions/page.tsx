"use client";

import { useState } from "react";
import {
  Inbox,
  Search,
  Filter,
  UserCheck,
  Building,
  FlaskConical,
  MessageSquare,
  FileText,
  Download,
  Trash2,
  CheckCircle,
  Clock,
  Archive,
  Eye,
  Phone,
  Mail,
  PlusCircle,
  X,
} from "lucide-react";
import {
  INITIAL_SUBMISSIONS,
  AnySubmission,
  SubmissionStatus,
} from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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

export default function AdminSubmissionsPage() {
  const [submissions, setSubmissions] = useState<AnySubmission[]>(INITIAL_SUBMISSIONS);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Soumission sélectionnée pour le tiroir/modal de détail
  const [selectedSubmission, setSelectedSubmission] = useState<AnySubmission | null>(null);

  // Modal d'ajout manuel de soumission
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [manualType, setManualType] = useState<"registration" | "training" | "lab" | "contact">("registration");
  const [manualForm, setManualForm] = useState({
    name: "",
    email: "",
    phone: "",
    diplomaOrCompany: "",
    programOrDomain: "Classe Préparatoire MP2I",
    message: "",
  });

  const handleCreateManualSubmission = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualForm.name || !manualForm.email) return;

    let newSub: AnySubmission;
    const newId = `sub-manual-${Date.now()}`;
    const createdAt = new Date().toISOString();

    if (manualType === "registration") {
      newSub = {
        id: newId,
        type: "registration",
        full_name: manualForm.name,
        email: manualForm.email,
        phone: manualForm.phone || "+241 07 00 00 00",
        last_diploma: manualForm.diplomaOrCompany || "Baccalauréat",
        program_title: manualForm.programOrDomain || "Classe Préparatoire MP2I",
        attachments: [],
        status: "nouveau",
        created_at: createdAt,
      };
    } else if (manualType === "training") {
      newSub = {
        id: newId,
        type: "training",
        company_name: manualForm.diplomaOrCompany || "Entreprise",
        contact_name: manualForm.name,
        email: manualForm.email,
        phone: manualForm.phone || "+241 01 00 00 00",
        domain: manualForm.programOrDomain || "Cybersécurité",
        participants_count: 5,
        desired_dates: "À convenir",
        message: manualForm.message || "Enregistrement manuel en accueil/téléphone.",
        status: "nouveau",
        created_at: createdAt,
      };
    } else if (manualType === "lab") {
      newSub = {
        id: newId,
        type: "lab",
        institution_name: manualForm.diplomaOrCompany || "Établissement Lycée",
        contact_name: manualForm.name,
        email: manualForm.email,
        phone: manualForm.phone || "+241 07 00 00 00",
        lab_type: "physique",
        desired_slots: "Forfait 5 manipulations",
        headcount: 30,
        status: "nouveau",
        created_at: createdAt,
      };
    } else {
      newSub = {
        id: newId,
        type: "contact",
        full_name: manualForm.name,
        email: manualForm.email,
        phone: manualForm.phone || "+241 06 00 00 00",
        subject: manualForm.programOrDomain || "Demande d'information",
        message: manualForm.message || "Prise de contact directe.",
        status: "nouveau",
        created_at: createdAt,
      };
    }

    setSubmissions((prev) => [newSub, ...prev]);
    setIsCreateModalOpen(false);
    setManualForm({
      name: "",
      email: "",
      phone: "",
      diplomaOrCompany: "",
      programOrDomain: "Classe Préparatoire MP2I",
      message: "",
    });
  };

  // Mise à jour du statut d'une soumission
  const handleUpdateStatus = (id: string, newStatus: SubmissionStatus) => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: newStatus } : sub))
    );
    if (selectedSubmission && selectedSubmission.id === id) {
      setSelectedSubmission((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  // Suppression d'une soumission
  const handleDeleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
    if (selectedSubmission?.id === id) {
      setSelectedSubmission(null);
    }
  };

  // Filtrage combiné par Tab, Recherche et Statut
  const filteredSubmissions = submissions.filter((sub) => {
    if (activeTab === "registration" && sub.type !== "registration") return false;
    if (activeTab === "training" && sub.type !== "training") return false;
    if (activeTab === "lab" && sub.type !== "lab") return false;
    if (activeTab === "contact" && sub.type !== "contact") return false;

    if (statusFilter !== "all" && sub.status !== statusFilter) return false;

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const name =
        sub.type === "training"
          ? sub.company_name + " " + sub.contact_name
          : sub.type === "lab"
          ? sub.institution_name + " " + sub.contact_name
          : sub.full_name;

      const email = sub.email;
      const phone = sub.phone;

      return (
        name.toLowerCase().includes(q) ||
        email.toLowerCase().includes(q) ||
        phone.toLowerCase().includes(q)
      );
    }

    return true;
  });

  const getStatusBadge = (status: SubmissionStatus) => {
    switch (status) {
      case "nouveau":
        return <Badge className="bg-amber-500 text-white font-semibold">Nouveau</Badge>;
      case "en_cours":
        return <Badge className="bg-blue-600 text-white font-semibold">En cours</Badge>;
      case "traite":
        return <Badge className="bg-emerald-600 text-white font-semibold">Traité</Badge>;
      case "archive":
        return <Badge variant="outline" className="text-gray-500 border-gray-300">Archivé</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "registration":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-700">
            <UserCheck className="h-3 w-3" /> Candidature
          </span>
        );
      case "training":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-orange-50 px-2 py-1 text-[11px] font-bold text-orange-700">
            <Building className="h-3 w-3" /> Formation Pro
          </span>
        );
      case "lab":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1 text-[11px] font-bold text-emerald-700">
            <FlaskConical className="h-3 w-3" /> Location Labo
          </span>
        );
      case "contact":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-purple-50 px-2 py-1 text-[11px] font-bold text-purple-700">
            <MessageSquare className="h-3 w-3" /> Contact
          </span>
        );
      default:
        return type;
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-gray-900">
            Gestion des Soumissions & Leads
          </h1>
          <p className="text-xs text-gray-500">
            Consultez, traitez et enregistrez les candidatures et demandes d'information.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold text-xs shadow-sm"
          >
            <PlusCircle className="h-4 w-4" /> Enregistrer une soumission
          </Button>
        </div>
      </div>

      {/* Barre de Recherche et Filtres */}
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-xs md:flex-row md:items-center md:justify-between">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Rechercher par nom, email, téléphone ou organisation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-500 flex items-center gap-1">
            <Filter className="h-3.5 w-3.5" /> Statut :
          </span>
          <Select value={statusFilter} onValueChange={(val) => setStatusFilter(val || "all")}>
            <SelectTrigger className="w-[160px] text-xs h-9">
              <SelectValue placeholder="Tous les statuts" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="nouveau">Nouveaux</SelectItem>
              <SelectItem value="en_cours">En cours</SelectItem>
              <SelectItem value="traite">Traités</SelectItem>
              <SelectItem value="archive">Archivés</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Onglets par Type de Soumission */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100/80 p-1 w-full justify-start overflow-x-auto">
          <TabsTrigger value="all" className="text-xs font-bold px-4">
            Toutes ({submissions.length})
          </TabsTrigger>
          <TabsTrigger value="registration" className="text-xs font-bold px-4">
            Candidatures ({submissions.filter((s) => s.type === "registration").length})
          </TabsTrigger>
          <TabsTrigger value="training" className="text-xs font-bold px-4">
            Formations Continues ({submissions.filter((s) => s.type === "training").length})
          </TabsTrigger>
          <TabsTrigger value="lab" className="text-xs font-bold px-4">
            Locations Labo ({submissions.filter((s) => s.type === "lab").length})
          </TabsTrigger>
          <TabsTrigger value="contact" className="text-xs font-bold px-4">
            Messages Contact ({submissions.filter((s) => s.type === "contact").length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4">
          <div className="rounded-xl border border-gray-200 bg-white shadow-xs overflow-hidden">
            {filteredSubmissions.length === 0 ? (
              <div className="py-12 text-center">
                <Inbox className="mx-auto h-10 w-10 text-gray-300" />
                <p className="mt-2 text-sm font-medium text-gray-600">Aucune soumission trouvée.</p>
                <p className="text-xs text-gray-400">Essayez de réinitialiser vos filtres de recherche.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-gray-50 uppercase text-gray-500 font-semibold border-b border-gray-100">
                    <tr>
                      <th className="px-6 py-3.5">Demandeur</th>
                      <th className="px-6 py-3.5">Catégorie</th>
                      <th className="px-6 py-3.5">Détail rapide</th>
                      <th className="px-6 py-3.5">Date</th>
                      <th className="px-6 py-3.5">Statut</th>
                      <th className="px-6 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                    {filteredSubmissions.map((sub) => {
                      const name =
                        sub.type === "training"
                          ? `${sub.company_name} (${sub.contact_name})`
                          : sub.type === "lab"
                          ? `${sub.institution_name} (${sub.contact_name})`
                          : sub.full_name;

                      const detail =
                        sub.type === "registration"
                          ? sub.program_title
                          : sub.type === "training"
                          ? `${sub.domain} • ${sub.participants_count} pers.`
                          : sub.type === "lab"
                          ? `Labo ${sub.lab_type} • ${sub.headcount} élèves`
                          : sub.subject;

                      return (
                        <tr key={sub.id} className="hover:bg-gray-50/80 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-bold text-gray-900">{name}</p>
                            <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                              <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{sub.email}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{sub.phone}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">{getTypeBadge(sub.type)}</td>
                          <td className="px-6 py-4">
                            <span className="font-medium text-gray-800 line-clamp-1">{detail}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-500">
                            {new Date(sub.created_at).toLocaleDateString("fr-FR", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-6 py-4">{getStatusBadge(sub.status)}</td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-8 gap-1 text-xs font-bold text-brand-blue border-brand-blue hover:bg-brand-blue hover:text-white"
                                onClick={() => setSelectedSubmission(sub)}
                              >
                                <Eye className="h-3.5 w-3.5" /> inspecter
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-700"
                                title="Supprimer"
                                onClick={() => handleDeleteSubmission(sub.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Modal / Dialog de Création Manuelle de Soumission */}
      {isCreateModalOpen && (
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogContent className="max-w-xl w-[94vw] max-h-[88vh] overflow-y-auto overflow-x-hidden p-6">
            <DialogHeader className="border-b border-gray-100 pb-4">
              <DialogTitle className="font-heading text-lg font-bold text-gray-900">
                Enregistrer une Soumission
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500">
                Saisissez les informations d'un candidat ou prospect reçu par téléphone ou à l'accueil.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleCreateManualSubmission} className="space-y-4 py-2 text-xs">
              <div className="space-y-1.5">
                <label className="font-bold text-gray-700">Type de soumission *</label>
                <Select
                  value={manualType}
                  onValueChange={(val: any) => setManualType(val)}
                >
                  <SelectTrigger className="text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="registration">Candidature Formation Initiale</SelectItem>
                    <SelectItem value="training">Demande Formation Continue (Entreprise)</SelectItem>
                    <SelectItem value="lab">Location de Laboratoire TP</SelectItem>
                    <SelectItem value="contact">Message de Contact / Rendez-vous</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700">Nom du demandeur *</label>
                  <Input
                    required
                    placeholder="ex. Paul Mba"
                    value={manualForm.name}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700">Adresse Email *</label>
                  <Input
                    type="email"
                    required
                    placeholder="ex. paul.mba@gmail.com"
                    value={manualForm.email}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700">Numéro de téléphone</label>
                  <Input
                    placeholder="+241 07 12 34 56"
                    value={manualForm.phone}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-bold text-gray-700">
                    {manualType === "training"
                      ? "Nom de l'Entreprise"
                      : manualType === "lab"
                      ? "Nom du Lycée / Établissement"
                      : "Dernier Diplôme"}
                  </label>
                  <Input
                    placeholder={
                      manualType === "training"
                        ? "ex. BGFI Bank"
                        : manualType === "lab"
                        ? "ex. Lycée Léon Mba"
                        : "ex. Baccalauréat C"
                    }
                    value={manualForm.diplomaOrCompany}
                    onChange={(e) => setManualForm((prev) => ({ ...prev, diplomaOrCompany: e.target.value }))}
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700">
                  {manualType === "registration"
                    ? "Programme Souhaité"
                    : manualType === "training"
                    ? "Domaine de Formation"
                    : "Sujet / Créneaux"}
                </label>
                <Input
                  placeholder="ex. Licence Pro Option IA & Data Science"
                  value={manualForm.programOrDomain}
                  onChange={(e) => setManualForm((prev) => ({ ...prev, programOrDomain: e.target.value }))}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-bold text-gray-700">Notes internes / Message</label>
                <Textarea
                  rows={3}
                  placeholder="Détails de l'échange ou remarques spécifiques..."
                  value={manualForm.message}
                  onChange={(e) => setManualForm((prev) => ({ ...prev, message: e.target.value }))}
                  className="text-xs resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="text-xs"
                >
                  Annuler
                </Button>
                <Button type="submit" className="bg-brand-orange hover:bg-brand-orange-dark text-white text-xs font-bold">
                  Enregistrer la soumission
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Modal / Dialog de Consultation Détaillée Réactif */}
      {selectedSubmission && (
        <Dialog open={!!selectedSubmission} onOpenChange={(open) => !open && setSelectedSubmission(null)}>
          <DialogContent className="max-w-2xl w-[94vw] max-h-[88vh] overflow-y-auto overflow-x-hidden p-6">
            <DialogHeader className="border-b border-gray-100 pb-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <DialogTitle className="font-heading text-lg font-bold text-gray-900">
                    Dossier de Soumission #{selectedSubmission.id}
                  </DialogTitle>
                  <DialogDescription className="text-xs text-gray-500 mt-1">
                    Reçu le {new Date(selectedSubmission.created_at).toLocaleString("fr-FR")}
                  </DialogDescription>
                </div>
                <div>{getTypeBadge(selectedSubmission.type)}</div>
              </div>
            </DialogHeader>

            <div className="space-y-6 py-4 text-xs">
              {/* Statut & Actions Rapides */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl bg-gray-50 p-4 border border-gray-200">
                <div>
                  <span className="text-gray-500 block text-[11px] font-semibold uppercase">Statut actuel :</span>
                  <div className="mt-1">{getStatusBadge(selectedSubmission.status)}</div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-gray-500 text-[11px] font-semibold">Basculer le statut :</span>
                  <Button
                    size="sm"
                    variant={selectedSubmission.status === "en_cours" ? "default" : "outline"}
                    className="h-7 text-[11px] gap-1"
                    onClick={() => handleUpdateStatus(selectedSubmission.id, "en_cours")}
                  >
                    <Clock className="h-3 w-3" /> En cours
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedSubmission.status === "traite" ? "default" : "outline"}
                    className="h-7 text-[11px] gap-1 bg-emerald-600 hover:bg-emerald-700 text-white"
                    onClick={() => handleUpdateStatus(selectedSubmission.id, "traite")}
                  >
                    <CheckCircle className="h-3 w-3" /> Traité
                  </Button>
                  <Button
                    size="sm"
                    variant={selectedSubmission.status === "archive" ? "default" : "outline"}
                    className="h-7 text-[11px] gap-1"
                    onClick={() => handleUpdateStatus(selectedSubmission.id, "archive")}
                  >
                    <Archive className="h-3 w-3" /> Archiver
                  </Button>
                </div>
              </div>

              {/* Coordonnées du Demandeur */}
              <div className="rounded-xl border border-gray-200 p-4 space-y-3">
                <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-brand-blue-dark">
                  Coordonnées & Contact
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-gray-500 block">Nom complet / Structure :</span>
                    <span className="font-bold text-gray-900">
                      {selectedSubmission.type === "training"
                        ? selectedSubmission.company_name
                        : selectedSubmission.type === "lab"
                        ? selectedSubmission.institution_name
                        : selectedSubmission.full_name}
                    </span>
                  </div>

                  {(selectedSubmission.type === "training" || selectedSubmission.type === "lab") && (
                    <div>
                      <span className="text-gray-500 block">Personne de contact :</span>
                      <span className="font-bold text-gray-900">{selectedSubmission.contact_name}</span>
                    </div>
                  )}

                  <div>
                    <span className="text-gray-500 block">Adresse Email :</span>
                    <a href={`mailto:${selectedSubmission.email}`} className="font-bold text-brand-blue hover:underline">
                      {selectedSubmission.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-gray-500 block">Téléphone :</span>
                    <a href={`tel:${selectedSubmission.phone}`} className="font-bold text-gray-900">
                      {selectedSubmission.phone}
                    </a>
                  </div>
                </div>
              </div>

              {/* Détails spécifiques selon le type de soumission */}
              {selectedSubmission.type === "registration" && (
                <div className="rounded-xl border border-gray-200 p-4 space-y-3">
                  <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-brand-blue-dark">
                    Détails du Dossier de Candidature
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-gray-500 block">Programme souhaité :</span>
                      <span className="font-bold text-brand-blue-dark">{selectedSubmission.program_title}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Dernier diplôme obtenu :</span>
                      <span className="font-bold text-gray-900">{selectedSubmission.last_diploma}</span>
                    </div>
                  </div>

                  {/* Pièces jointes PDF */}
                  {selectedSubmission.attachments && selectedSubmission.attachments.length > 0 && (
                    <div className="pt-2">
                      <span className="text-gray-500 block font-semibold mb-2">Pièces jointes fournies ({selectedSubmission.attachments.length}) :</span>
                      <div className="space-y-2">
                        {selectedSubmission.attachments.map((att, idx) => (
                          <div key={idx} className="flex items-center justify-between rounded-md bg-gray-50 p-2.5 border border-gray-200">
                            <div className="flex items-center gap-2">
                              <FileText className="h-4 w-4 text-brand-blue" />
                              <span className="font-bold text-gray-900">{att.name}</span>
                              <span className="text-[10px] text-gray-400">({att.size})</span>
                            </div>
                            <Button size="sm" variant="ghost" className="h-7 gap-1 text-xs text-brand-blue">
                              <Download className="h-3.5 w-3.5" /> Télécharger
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {selectedSubmission.type === "training" && (
                <div className="rounded-xl border border-gray-200 p-4 space-y-3">
                  <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-brand-blue-dark">
                    Spécifications Demande Formation Continue
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-gray-500 block">Axe / Domaine retenu :</span>
                      <span className="font-bold text-brand-blue-dark">{selectedSubmission.domain}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Nombre de participants :</span>
                      <span className="font-bold text-gray-900">{selectedSubmission.participants_count} personnes</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Dates souhaitées :</span>
                      <span className="font-bold text-gray-900">{selectedSubmission.desired_dates}</span>
                    </div>
                  </div>
                  {selectedSubmission.message && (
                    <div className="pt-2">
                      <span className="text-gray-500 block font-semibold">Message / Besoins spécifiques :</span>
                      <p className="mt-1 rounded-md bg-gray-50 p-3 text-gray-800 leading-relaxed border border-gray-100">
                        {selectedSubmission.message}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {selectedSubmission.type === "lab" && (
                <div className="rounded-xl border border-gray-200 p-4 space-y-3">
                  <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-brand-blue-dark">
                    Détails Location de Laboratoire de TP
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <span className="text-gray-500 block">Type de laboratoire :</span>
                      <span className="font-bold text-brand-blue-dark capitalize">Laboratoire {selectedSubmission.lab_type}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block">Effectif estimé :</span>
                      <span className="font-bold text-gray-900">{selectedSubmission.headcount} élèves</span>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-500 block">Créneaux / Forfait demandé :</span>
                      <span className="font-bold text-gray-900">{selectedSubmission.desired_slots}</span>
                    </div>
                  </div>
                </div>
              )}

              {selectedSubmission.type === "contact" && (
                <div className="rounded-xl border border-gray-200 p-4 space-y-3">
                  <h4 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-brand-blue-dark">
                    Contenu du Message
                  </h4>
                  <div>
                    <span className="text-gray-500 block">Sujet :</span>
                    <span className="font-bold text-gray-900">{selectedSubmission.subject}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block font-semibold mb-1">Message :</span>
                    <p className="rounded-md bg-gray-50 p-3 text-gray-800 leading-relaxed border border-gray-100">
                      {selectedSubmission.message}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
