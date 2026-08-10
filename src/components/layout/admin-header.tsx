"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Bell, Settings, LogOut, Inbox, FileText, Briefcase, Microscope, Mail, ArrowRight, User, PanelLeftClose, PanelLeftOpen, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { createClient } from "@/lib/supabase/client";

interface NotificationItem {
  id: string;
  typeLabel: string;
  name: string;
  date: string;
  type: "registration" | "training" | "lab" | "contact";
}

function getInitials(name: string): string {
  if (!name) return "DS";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function formatDisplayName(email?: string | null, rawName?: string | null): string {
  if (rawName && rawName.trim().length > 0) return rawName;
  if (email) {
    const handle = email.split("@")[0];
    return handle.charAt(0).toUpperCase() + handle.slice(1);
  }
  return "Administrateur";
}

interface AdminHeaderProps {
  isCollapsed?: boolean;
  onToggleSidebar?: () => void;
  onOpenMobile?: () => void;
}

export function AdminHeader({ isCollapsed = false, onToggleSidebar, onOpenMobile }: AdminHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("Administrateur");
  const [userRole, setUserRole] = useState<string>("Super-Administrateur");
  const [unreadCount, setUnreadCount] = useState(0);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  const fetchNotifications = async () => {
    try {
      const res = await fetch("/api/admin/submissions");
      const json = await res.json();

      if (json.ok && Array.isArray(json.data)) {
        const newSubmissions = json.data.filter((item: { status: string }) => item.status === "nouveau");
        setUnreadCount(newSubmissions.length);

        const formatted: NotificationItem[] = newSubmissions.slice(0, 5).map((item: { id: string; type: string; fullName?: string; name?: string; createdAt: string }) => {
          let label = "Candidature";
          if (item.type === "training-request") label = "Formation Continue";
          if (item.type === "lab-request") label = "Location Laboratoire";
          if (item.type === "contact") label = "Message Contact";

          return {
            id: item.id,
            typeLabel: label,
            name: item.fullName || item.name || "Demandeur",
            date: new Date(item.createdAt).toLocaleDateString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
            type: item.type as "registration" | "training" | "lab" | "contact",
          };
        });

        setNotifications(formatted);
      }
    } catch (err) {
      console.error("Erreur chargement notifications admin:", err);
    }
  };

  useEffect(() => {
    async function loadUserData() {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      if (supabaseUrl) {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        if (data.user) {
          const email = data.user.email || "";
          setUserEmail(email);
          const fullName = (data.user.user_metadata?.full_name as string) || "";
          setUserName(formatDisplayName(email, fullName));
          return;
        }
      }

      // Si pas de session Supabase active (mode dev), essayer de lire les identifiants locaux
      setUserEmail("direction@digiset-gabon.com");
      setUserName("Dr ABAGA ABESSOLO");
    }

    loadUserData();
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 15000);
    return () => clearInterval(interval);
  }, []);

  // Nom dynamique basé sur la route
  const getPageTitle = () => {
    if (pathname === "/admin") return "Tableau de Bord";
    if (pathname.startsWith("/admin/soumissions")) return "Gestion des Soumissions";
    if (pathname.startsWith("/admin/programmes")) return "Gestion des Programmes";
    if (pathname.startsWith("/admin/actualites")) return "Gestion des Actualités";
    if (pathname.startsWith("/admin/galerie")) return "Galerie Médias";
    if (pathname.startsWith("/admin/equipe")) return "Organigramme & Équipe";
    if (pathname.startsWith("/admin/temoignages")) return "Témoignages";
    if (pathname.startsWith("/admin/partenaires")) return "Partenaires";
    if (pathname.startsWith("/admin/pages")) return "Pages Institutionnelles";
    if (pathname.startsWith("/admin/documents")) return "Documents Téléchargeables";
    if (pathname.startsWith("/admin/utilisateurs")) return "Utilisateurs Admin";
    if (pathname.startsWith("/admin/parametres")) return "Paramètres du Site";
    return "Administration";
  };

  const handleLogout = async () => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    if (supabaseUrl) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    document.cookie = "admin_dev_mode=; path=/; max-age=0";
    router.push("/admin/login");
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "registration":
        return <FileText className="h-4 w-4 text-brand-orange" />;
      case "training-request":
        return <Briefcase className="h-4 w-4 text-brand-blue" />;
      case "lab-request":
        return <Microscope className="h-4 w-4 text-purple-600" />;
      default:
        return <Mail className="h-4 w-4 text-emerald-600" />;
    }
  };

  const userInitials = getInitials(userName);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-white px-3 sm:px-6 shadow-xs">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        {/* Mobile Menu Button (< 768px) */}
        {onOpenMobile && (
          <button
            onClick={onOpenMobile}
            className="p-1.5 rounded-lg text-slate-700 hover:text-brand-blue hover:bg-slate-100 transition-colors md:hidden cursor-pointer shrink-0"
            title="Ouvrir le menu"
          >
            <Menu className="h-5 w-5 text-brand-orange" />
          </button>
        )}

        {/* Desktop Collapse Toggle Button (>= 768px) */}
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="hidden md:flex p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer shrink-0"
            title={isCollapsed ? "Afficher le menu latéral" : "Cacher / Réduire le menu latéral"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-5 w-5 text-brand-orange" />
            ) : (
              <PanelLeftClose className="h-5 w-5 hover:text-brand-orange transition-colors" />
            )}
          </button>
        )}

        <h1 className="font-heading text-sm sm:text-lg font-bold text-brand-blue-dark truncate">
          {getPageTitle()}
        </h1>
        <span className="rounded-full bg-brand-blue/10 px-2 py-0.5 text-[11px] sm:text-xs font-semibold text-brand-blue hidden lg:inline-block shrink-0">
          Espace Admin
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Menu Déroulant Notifications Interactif */}
        <DropdownMenu>
          <DropdownMenuTrigger className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-brand-blue-dark focus:outline-none cursor-pointer">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-orange text-[10px] font-extrabold text-white ring-2 ring-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-80 p-0 shadow-xl border border-gray-200 rounded-xl overflow-hidden">
            <div className="bg-brand-blue-dark p-3.5 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-brand-orange" />
                <span className="font-heading text-xs font-bold">Notifications & Leads</span>
              </div>
              <span className="rounded-full bg-brand-orange px-2 py-0.5 text-[10px] font-extrabold text-white">
                {unreadCount} nouvelle{unreadCount > 1 ? "s" : ""}
              </span>
            </div>

            <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto text-xs">
              {unreadCount === 0 ? (
                <div className="p-6 text-center space-y-2 bg-gray-50/50">
                  <Inbox className="h-7 w-7 text-gray-300 mx-auto" />
                  <p className="font-bold text-gray-700">Aucune nouvelle notification</p>
                  <p className="text-[11px] text-gray-500">
                    Les futurs leads et candidatures étudiants s&apos;afficheront ici en temps réel.
                  </p>
                </div>
              ) : (
                notifications.map((notif) => (
                  <Link
                    key={notif.id}
                    href="/admin/soumissions"
                    className="flex items-start gap-3 p-3 hover:bg-slate-50 transition-colors"
                  >
                    <div className="p-2 rounded-lg bg-slate-100 shrink-0">
                      {getIcon(notif.type)}
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-brand-blue">{notif.typeLabel}</span>
                        <span className="text-slate-400 text-[10px]">{notif.date}</span>
                      </div>
                      <p className="font-semibold text-slate-800 truncate">{notif.name}</p>
                      <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
                        ● Nouvelle soumission reçue
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            <div className="border-t border-gray-100 p-2.5 text-center bg-gray-50">
              <Link
                href="/admin/soumissions"
                className="inline-flex items-center gap-1 text-xs font-bold text-brand-blue hover:text-brand-blue-dark"
              >
                Voir toutes les soumissions <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Bouton Paramètres */}
        <Link
          href="/admin/parametres"
          className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-brand-blue-dark"
          title="Paramètres"
        >
          <Settings className="h-5 w-5" />
        </Link>

        <div className="h-6 w-px bg-gray-200" />

        {/* Profil Administrateur Personnalisé */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-gray-100 focus:outline-none cursor-pointer">
            <Avatar className="h-9 w-9 border border-brand-blue/20 ring-2 ring-brand-blue/10">
              <AvatarFallback className="bg-brand-blue text-xs font-bold text-white uppercase shadow-xs">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold leading-tight text-gray-900 line-clamp-1 max-w-[150px]">
                {userName}
              </p>
              <p className="text-[11px] font-medium text-gray-500">
                {userRole}
              </p>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-bold text-gray-900">
                {userName}
              </DropdownMenuLabel>
              <p className="px-2 pb-1.5 text-[11px] text-gray-500 truncate">
                {userEmail || "Connecté au back-office"}
              </p>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/admin/parametres")} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4 text-gray-500" />
                Paramètres généraux
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-700"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

