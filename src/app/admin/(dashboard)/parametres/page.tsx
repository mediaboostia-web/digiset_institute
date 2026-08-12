"use client";

import { useState, useEffect } from "react";
import {
  Building2,
  UserCheck,
  Lock,
  Save,
  CheckCircle2,
  AlertCircle,
  KeyRound,
  ShieldCheck,
  ShieldAlert,
  Globe,
  Megaphone,
  Mail,
  Send,
  Loader2,
  Bell,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useSiteSettings } from "@/lib/site-settings";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("etablissement");
  const [siteSettings, updateSiteSettings] = useSiteSettings();
  const [currentUserRole, setCurrentUserRole] = useState<"super_admin" | "editor" | "admin">("super_admin");

  // ---------------------------------------------------------------------------
  // 1. État : Informations de l'Établissement & Annonces
  // ---------------------------------------------------------------------------
  const [institutionForm, setInstitutionForm] = useState({
    name: "DigiSET Institute",
    sigle: "DigiSET",
    address: siteSettings.institutionAddress || "Angondje, Carrefour Moussavou, Akanda — Libreville, Gabon",
    phone1: siteSettings.institutionPhone1 || "+241 07 40 00 00",
    phone2: siteSettings.institutionPhone2 || "+241 06 60 00 00",
    email: siteSettings.institutionEmail || "contact@digiset-gabon.com",
    notificationEmail: siteSettings.notificationEmail || "contact@digiset-gabon.com",
    facebookUrl: "https://facebook.com/digisetgabon",
    linkedinUrl: "https://linkedin.com/company/digisetgabon",
  });

  const [institutionSuccess, setInstitutionSuccess] = useState(false);

  const handleSaveInstitution = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUserRole === "editor") return;
    updateSiteSettings({
      institutionAddress: institutionForm.address,
      institutionPhone1: institutionForm.phone1,
      institutionPhone2: institutionForm.phone2,
      institutionEmail: institutionForm.email,
      notificationEmail: institutionForm.notificationEmail,
    });
    setInstitutionSuccess(true);
    setTimeout(() => setInstitutionSuccess(false), 4000);
  };

  // ---------------------------------------------------------------------------
  // 2. État : Informations du Compte Administrateur
  // ---------------------------------------------------------------------------
  const [adminProfileForm, setAdminProfileForm] = useState({
    fullName: "Dr ABAGA ABESSOLO Michel Audrey",
    roleTitle: "Fondateur & Directeur Général",
    email: "contact@digiset-gabon.com",
    phone: "+241 07 40 00 00",
  });

  const [profileSuccess, setProfileSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const activeSession = localStorage.getItem("digiset_admin_active_session");
      if (activeSession) {
        try {
          const parsed = JSON.parse(activeSession);
          if (parsed.role) setCurrentUserRole(parsed.role);
          if (parsed.email) {
            setAdminProfileForm((prev) => ({
              ...prev,
              email: parsed.email,
              fullName: parsed.full_name || prev.fullName,
              roleTitle:
                parsed.role === "super_admin"
                  ? "Super-Administrateur"
                  : parsed.role === "editor"
                  ? "Éditeur de Contenu"
                  : "Administrateur",
            }));
          }
        } catch {}
      }
    }
  }, []);

  const saveAdminCredentialsToStorage = (emailVal?: string, passwordVal?: string) => {
    if (typeof window !== "undefined") {
      let currentEmail = adminProfileForm.email || "contact@digiset-gabon.com";
      let currentPassword = "DigiSET2026@";

      const stored = localStorage.getItem("digiset_admin_credentials_v2");
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.email) currentEmail = parsed.email;
          if (parsed.password) currentPassword = parsed.password;
        } catch {}
      }

      const updated = {
        email: (emailVal || currentEmail).toLowerCase().trim(),
        password: passwordVal || currentPassword,
      };

      localStorage.setItem("digiset_admin_credentials_v2", JSON.stringify(updated));
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveAdminCredentialsToStorage(adminProfileForm.email);
    setProfileSuccess(true);
    setTimeout(() => setProfileSuccess(false), 4000);
  };

  // ---------------------------------------------------------------------------
  // 3. État : Modification du Mot de Passe
  // ---------------------------------------------------------------------------
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(false);

    if (!passwordForm.currentPassword) {
      setPasswordError("Veuillez saisir votre mot de passe actuel.");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("Le nouveau mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("La confirmation ne correspond pas au nouveau mot de passe.");
      return;
    }

    saveAdminCredentialsToStorage(adminProfileForm.email, passwordForm.newPassword);
    setPasswordSuccess(true);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setTimeout(() => setPasswordSuccess(false), 5000);
  };

  // ---------------------------------------------------------------------------
  // 4. État : Notifications & Emailing Resend
  // ---------------------------------------------------------------------------
  const [emailConfig, setEmailConfig] = useState({
    adminRecipient: "contact@digiset-gabon.com",
    senderName: "DigiSET Institute <notifications@digiset-gabon.com>",
    notifyRegistration: true,
    notifyTraining: true,
    notifyLab: true,
    notifyContact: true,
  });

  const [emailSuccess, setEmailSuccess] = useState(false);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [testEmailResult, setTestEmailResult] = useState<string | null>(null);

  const handleSaveEmailConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings({ notificationEmail: emailConfig.adminRecipient });
    try {
      await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ notificationEmail: emailConfig.adminRecipient }),
      });
    } catch (err) {
      console.error("Erreur enregistrement paramètres email:", err);
    }
    setEmailSuccess(true);
    setTimeout(() => setEmailSuccess(false), 4000);
  };

  const handleSendTestEmail = async () => {
    setIsTestingEmail(true);
    setTestEmailResult(null);

    try {
      const response = await fetch("/api/admin/test-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipient: emailConfig.adminRecipient }),
      });

      const res = await response.json();

      if (!response.ok || !res.ok) {
        setTestEmailResult(res.error || "Erreur lors de l'envoi de l'email de test. Vérifiez votre clé RESEND_API_KEY dans .env.local.");
      } else {
        setTestEmailResult(res.message || `Email de test envoyé avec succès à ${emailConfig.adminRecipient} !`);
      }
    } catch (err) {
      setTestEmailResult("Erreur de connexion lors du test Resend.");
    } finally {
      setIsTestingEmail(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* En-tête de la page */}
      <div>
        <h1 className="font-heading text-2xl font-bold text-gray-900">
          Paramètres du Back-Office & Sécurité
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          Gérez les coordonnées officielles de DigiSET, vos alertes emails Resend, votre profil et la sécurité de votre compte.
        </p>
      </div>

      {/* Avertissement Rôle Éditeur */}
      {currentUserRole === "editor" && (
        <div className="flex items-center gap-3 rounded-xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 font-medium shadow-xs">
          <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0" />
          <div>
            <p className="font-bold">Accès Réduit — Rôle Éditeur de Contenu</p>
            <p className="text-[11px] text-amber-700 mt-0.5 leading-relaxed">
              Vous êtes connecté avec un compte Éditeur. La configuration de l&apos;établissement, les clés API Resend et les notifications globales sont gérées exclusivement par les Super-Administrateurs.
            </p>
          </div>
        </div>
      )}

      {/* Navigation par Onglets */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-gray-100/90 p-1 w-full justify-start overflow-x-auto">
          <TabsTrigger value="etablissement" className="text-xs font-bold gap-2 px-4">
            <Building2 className="h-4 w-4 text-brand-orange" />
            Informations Établissement & Annonces
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-xs font-bold gap-2 px-4">
            <Mail className="h-4 w-4 text-purple-600" />
            Notifications & Emailing (Resend)
          </TabsTrigger>
          <TabsTrigger value="profil" className="text-xs font-bold gap-2 px-4">
            <UserCheck className="h-4 w-4 text-brand-blue" />
            Profil Administrateur
          </TabsTrigger>
          <TabsTrigger value="securite" className="text-xs font-bold gap-2 px-4">
            <Lock className="h-4 w-4 text-red-600" />
            Modification Mot de Passe
          </TabsTrigger>
        </TabsList>

        {/* =================================================================== */}
        {/* ONGLET 1 : INFORMATIONS ÉTABLISSEMENT */}
        {/* =================================================================== */}
        <TabsContent value="etablissement" className="mt-6 space-y-6">
          {institutionSuccess && (
            <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in duration-300">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Les informations de l&apos;établissement et le bandeau d&apos;annonce ont été enregistrés avec succès !</span>
            </div>
          )}

          <form onSubmit={handleSaveInstitution} className="space-y-6">
            {/* Identité Établissement */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="font-heading text-base font-bold text-gray-900 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-brand-orange" />
                  Identité & Coordonnées Officielles
                </h3>
                <Badge className="bg-brand-blue text-white font-bold">V1 Opérationnelle</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Nom Officiel de l&apos;Établissement</Label>
                  <Input
                    value={institutionForm.name}
                    onChange={(e) => setInstitutionForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="text-xs font-bold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Sigle / Marque</Label>
                  <Input
                    value={institutionForm.sigle}
                    onChange={(e) => setInstitutionForm((prev) => ({ ...prev, sigle: e.target.value }))}
                    className="text-xs font-bold text-brand-orange"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Adresse Physique du Campus</Label>
                <Input
                  value={institutionForm.address}
                  onChange={(e) => setInstitutionForm((prev) => ({ ...prev, address: e.target.value }))}
                  className="text-xs"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Téléphone Principal</Label>
                  <Input
                    value={institutionForm.phone1}
                    onChange={(e) => setInstitutionForm((prev) => ({ ...prev, phone1: e.target.value }))}
                    className="text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Téléphone Secondaire</Label>
                  <Input
                    value={institutionForm.phone2}
                    onChange={(e) => setInstitutionForm((prev) => ({ ...prev, phone2: e.target.value }))}
                    className="text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Email Officiel Public</Label>
                  <Input
                    type="email"
                    value={institutionForm.email}
                    onChange={(e) => setInstitutionForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="text-xs"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Email de Réception des Notifications (Leads)</Label>
                  <Input
                    type="email"
                    value={institutionForm.notificationEmail}
                    onChange={(e) => setInstitutionForm((prev) => ({ ...prev, notificationEmail: e.target.value }))}
                    className="text-xs font-bold text-brand-blue"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Carte de Gestion du Bandeau d'Annonce Public */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                    <Megaphone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-gray-900">
                      Bandeau d&apos;Annonce d&apos;Accueil (Site Public)
                    </h3>
                    <p className="text-xs text-gray-500">
                      Affichez une bannière haut de page dynamique sur l&apos;accueil pour vos événements majeurs.
                    </p>
                  </div>
                </div>

                {/* Bouton d'activation On-Off */}
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-gray-700">
                    {siteSettings.isAnnouncementEnabled ? "Bannière Activée" : "Bannière Masquée"}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateSiteSettings({ isAnnouncementEnabled: !siteSettings.isAnnouncementEnabled })}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                      siteSettings.isAnnouncementEnabled ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        siteSettings.isAnnouncementEnabled ? "translate-x-5" : "translate-x-0"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Aperçu en direct */}
              <div className="space-y-2">
                <Label className="text-xs font-bold text-gray-700">Aperçu en Direct du Bandeau :</Label>
                {siteSettings.isAnnouncementEnabled ? (
                  <div className="rounded-lg bg-gradient-to-r from-brand-blue-dark via-brand-blue to-brand-blue-dark p-3 text-white text-xs flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-brand-orange px-2 py-0.5 text-[10px] font-extrabold uppercase text-white">
                        Annonce
                      </span>
                      <span className="font-semibold">{siteSettings.announcementText}</span>
                    </div>
                    <span className="rounded bg-white/20 px-2.5 py-1 text-[11px] font-bold text-white shrink-0">
                      {siteSettings.announcementCtaText} &rarr;
                    </span>
                  </div>
                ) : (
                  <div className="rounded-lg bg-gray-100 p-3 text-center text-xs font-semibold text-gray-500 border border-dashed border-gray-300">
                    Bandeau actuellement désactivé — Cliquez sur l&apos;interrupteur ci-dessus pour l&apos;afficher sur le site.
                  </div>
                )}
              </div>

              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Texte / Message de l&apos;Annonce *</Label>
                  <Input
                    value={siteSettings.announcementText}
                    onChange={(e) => updateSiteSettings({ announcementText: e.target.value })}
                    className="text-xs font-medium"
                    placeholder="ex: 🎓 Inscriptions ouvertes pour la Rentrée Académique Septembre 2026 !"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-gray-700">Texte du Bouton d&apos;Action (CTA)</Label>
                    <Input
                      value={siteSettings.announcementCtaText}
                      onChange={(e) => updateSiteSettings({ announcementCtaText: e.target.value })}
                      className="text-xs"
                      placeholder="ex: S'inscrire maintenant"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold text-gray-700">Lien de Redirection (URL)</Label>
                    <Input
                      value={siteSettings.announcementCtaHref}
                      onChange={(e) => updateSiteSettings({ announcementCtaHref: e.target.value })}
                      className="text-xs"
                      placeholder="ex: /inscription/candidature"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Réseaux sociaux */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="font-heading text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Globe className="h-5 w-5 text-sky-600" />
                Réseaux Sociaux Officiels
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Lien Facebook</Label>
                  <Input
                    value={institutionForm.facebookUrl}
                    onChange={(e) => setInstitutionForm((prev) => ({ ...prev, facebookUrl: e.target.value }))}
                    className="text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Lien LinkedIn</Label>
                  <Input
                    value={institutionForm.linkedinUrl}
                    onChange={(e) => setInstitutionForm((prev) => ({ ...prev, linkedinUrl: e.target.value }))}
                    className="text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-brand-orange hover:bg-brand-orange-dark text-white font-bold text-xs gap-2 px-6 py-2.5 shadow-md">
                <Save className="h-4 w-4" />
                Enregistrer les modifications établissement
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* =================================================================== */}
        {/* ONGLET 2 : NOTIFICATIONS & EMAILING (RESEND) */}
        {/* =================================================================== */}
        <TabsContent value="notifications" className="mt-6 space-y-6">
          {emailSuccess && (
            <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in duration-300">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Paramètres des notifications email enregistrés avec succès !</span>
            </div>
          )}

          {testEmailResult && (
            <div className={`flex items-center gap-3 rounded-xl p-4 border text-xs font-bold animate-in fade-in duration-300 ${
              testEmailResult.includes("succès") 
                ? "bg-emerald-50 border-emerald-200 text-emerald-800" 
                : "bg-amber-50 border-amber-200 text-amber-900"
            }`}>
              <Sparkles className="h-5 w-5 text-brand-orange shrink-0" />
              <span>{testEmailResult}</span>
            </div>
          )}

          <form onSubmit={handleSaveEmailConfig} className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-heading text-base font-bold text-gray-900">
                      Service d&apos;Emailing Transactionnel (Resend API)
                    </h3>
                    <p className="text-xs text-gray-500">
                      Configurez l&apos;envoi d&apos;alertes instantanées par email à chaque soumission de formulaire.
                    </p>
                  </div>
                </div>

                <Badge className="bg-purple-700 text-white font-bold">Resend v1.0</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Email Destinataire des Notifications Admin *</Label>
                  <Input
                    type="email"
                    value={emailConfig.adminRecipient}
                    onChange={(e) => setEmailConfig((prev) => ({ ...prev, adminRecipient: e.target.value }))}
                    className="text-xs font-bold text-brand-blue"
                    required
                  />
                  <p className="text-[10px] text-gray-500">Cet email recevra un message instantané à chaque demande.</p>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Nom & Adresse de l&apos;Expéditeur (From Header)</Label>
                  <Input
                    value={emailConfig.senderName}
                    onChange={(e) => setEmailConfig((prev) => ({ ...prev, senderName: e.target.value }))}
                    className="text-xs"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Alertes spécifiques par catégorie de soumission */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-4">
              <h3 className="font-heading text-base font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
                <Bell className="h-5 w-5 text-brand-orange" />
                Alertes Email par Catégorie de Soumission
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Candidatures */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/70">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Candidatures Étudiants</p>
                    <p className="text-[11px] text-gray-500">Envoyer une alerte admin lors d&apos;un dépôt MP2I ou Licence Pro</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailConfig((prev) => ({ ...prev, notifyRegistration: !prev.notifyRegistration }))}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      emailConfig.notifyRegistration ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${
                      emailConfig.notifyRegistration ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                {/* 2. Formation Inter & Intra */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/70">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Formations Inter & Intra-Entreprises</p>
                    <p className="text-[11px] text-gray-500">Envoyer une alerte admin lors d&apos;une demande de devis entreprise</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailConfig((prev) => ({ ...prev, notifyTraining: !prev.notifyTraining }))}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      emailConfig.notifyTraining ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${
                      emailConfig.notifyTraining ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                {/* 3. Labo */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/70">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Location de Laboratoires TP</p>
                    <p className="text-[11px] text-gray-500">Envoyer une alerte admin lors d&apos;une réservation d&apos;établissement</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailConfig((prev) => ({ ...prev, notifyLab: !prev.notifyLab }))}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      emailConfig.notifyLab ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${
                      emailConfig.notifyLab ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>

                {/* 4. Contact */}
                <div className="flex items-center justify-between p-3.5 rounded-xl border border-gray-100 bg-gray-50/70">
                  <div>
                    <p className="text-xs font-bold text-gray-900">Messages de Contact Général</p>
                    <p className="text-[11px] text-gray-500">Envoyer une alerte admin lors d&apos;un message de contact</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEmailConfig((prev) => ({ ...prev, notifyContact: !prev.notifyContact }))}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                      emailConfig.notifyContact ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                  >
                    <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition duration-200 ${
                      emailConfig.notifyContact ? "translate-x-5" : "translate-x-0"
                    }`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleSendTestEmail}
                disabled={isTestingEmail}
                className="gap-2 text-xs font-bold text-purple-700 border-purple-300 hover:bg-purple-50"
              >
                {isTestingEmail ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-purple-700" />
                    Envoi du test Resend en cours...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 text-purple-700" />
                    Tester l&apos;envoi d&apos;email (Resend API)
                  </>
                )}
              </Button>

              <Button type="submit" className="bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs gap-2 px-6 py-2.5 shadow-md">
                <Save className="h-4 w-4" />
                Enregistrer la configuration emails
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* =================================================================== */}
        {/* ONGLET 3 : PROFIL ADMINISTRATEUR */}
        {/* =================================================================== */}
        <TabsContent value="profil" className="mt-6 space-y-6">
          {profileSuccess && (
            <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in duration-300">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Profil administrateur mis à jour avec succès !</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-6">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="font-heading text-base font-bold text-gray-900 flex items-center gap-2">
                  <UserCheck className="h-5 w-5 text-brand-blue" />
                  Informations du Compte Admin
                </h3>
                <div className="flex items-center gap-2">
                  <Badge className="bg-brand-blue-dark text-white font-bold">Super-Administrateur</Badge>
                  <Badge className="bg-emerald-600 text-white font-bold">Compte Actif</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Nom Complet de l&apos;Administrateur</Label>
                  <Input
                    value={adminProfileForm.fullName}
                    onChange={(e) => setAdminProfileForm((prev) => ({ ...prev, fullName: e.target.value }))}
                    className="text-xs font-bold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Titre / Fonction</Label>
                  <Input
                    value={adminProfileForm.roleTitle}
                    onChange={(e) => setAdminProfileForm((prev) => ({ ...prev, roleTitle: e.target.value }))}
                    className="text-xs font-semibold text-brand-orange"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Adresse Email de Connexion (SupaAuth)</Label>
                  <Input
                    type="email"
                    value={adminProfileForm.email}
                    onChange={(e) => setAdminProfileForm((prev) => ({ ...prev, email: e.target.value }))}
                    className="text-xs font-bold"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-gray-700">Téléphone Direct</Label>
                  <Input
                    value={adminProfileForm.phone}
                    onChange={(e) => setAdminProfileForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="text-xs"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs gap-2 px-6 py-2.5 shadow-md">
                <Save className="h-4 w-4" />
                Mettre à jour le profil admin
              </Button>
            </div>
          </form>
        </TabsContent>

        {/* =================================================================== */}
        {/* ONGLET 4 : MODIFICATION DU MOT DE PASSE */}
        {/* =================================================================== */}
        <TabsContent value="securite" className="mt-6 space-y-6">
          {passwordSuccess && (
            <div className="flex items-center gap-3 rounded-xl bg-emerald-50 p-4 border border-emerald-200 text-emerald-800 text-xs font-bold animate-in fade-in duration-300">
              <ShieldCheck className="h-5 w-5 text-emerald-600 shrink-0" />
              <span>Votre mot de passe administrateur a été modifié avec succès !</span>
            </div>
          )}

          {passwordError && (
            <div className="flex items-center gap-3 rounded-xl bg-red-50 p-4 border border-red-200 text-red-700 text-xs font-bold animate-in fade-in duration-300">
              <AlertCircle className="h-5 w-5 text-red-600 shrink-0" />
              <span>{passwordError}</span>
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-6 max-w-xl">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="font-heading text-base font-bold text-gray-900 flex items-center gap-2">
                  <KeyRound className="h-5 w-5 text-red-600" />
                  Changer le Mot de Passe Administrateur
                </h3>
                <Badge variant="outline" className="text-gray-600 border-gray-300">Sécurité Accrue</Badge>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Mot de Passe Actuel *</Label>
                <Input
                  type="password"
                  placeholder="••••••••••••"
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                  className="text-xs"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Nouveau Mot de Passe *</Label>
                <Input
                  type="password"
                  placeholder="8 caractères minimum"
                  value={passwordForm.newPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                  className="text-xs"
                  required
                />
                <p className="text-[10px] text-gray-500">Utilisez un mot de passe fort comprenant au moins 8 caractères.</p>
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-gray-700">Confirmer le Nouveau Mot de Passe *</Label>
                <Input
                  type="password"
                  placeholder="Répétez le nouveau mot de passe"
                  value={passwordForm.confirmPassword}
                  onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                  className="text-xs"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs gap-2 px-6 py-2.5 shadow-md">
                <ShieldCheck className="h-4 w-4" />
                Mettre à jour le mot de passe
              </Button>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
