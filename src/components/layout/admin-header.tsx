"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Bell, Settings, LogOut, ShieldCheck } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AdminHeader() {
  const router = useRouter();
  const pathname = usePathname();

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

  const handleLogout = () => {
    document.cookie = "admin_dev_mode=; path=/; max-age=0";
    router.push("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-white px-6 shadow-xs">
      <div className="flex items-center gap-3">
        <h1 className="font-heading text-lg font-bold text-brand-blue-dark">
          {getPageTitle()}
        </h1>
        <span className="rounded-full bg-brand-blue/10 px-2.5 py-0.5 text-xs font-semibold text-brand-blue">
          Espace Admin
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Bouton Notification avec badge */}
        <Link
          href="/admin/soumissions"
          className="relative rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-brand-blue-dark"
          title="Soumissions reçues"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-brand-orange ring-2 ring-white" />
        </Link>

        {/* Bouton Paramètres */}
        <Link
          href="/admin/parametres"
          className="rounded-full p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-brand-blue-dark"
          title="Paramètres"
        >
          <Settings className="h-5 w-5" />
        </Link>

        <div className="h-6 w-px bg-gray-200" />

        {/* Profil Administrateur */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 rounded-lg p-1.5 transition-colors hover:bg-gray-100 focus:outline-none">
            <Avatar className="h-9 w-9 border border-gray-200">
              <AvatarImage src="/brand/logo-digiset.png" alt="Admin Digi-SET" />
              <AvatarFallback className="bg-brand-blue-dark text-xs text-white">
                DS
              </AvatarFallback>
            </Avatar>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-bold leading-tight text-gray-900">
                Dr. ABAGA ABESSOLO
              </p>
              <p className="text-[11px] font-medium text-gray-500">
                Super Administrateur
              </p>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="font-semibold text-gray-900">
                Mon Compte Admin
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/admin/utilisateurs")} className="cursor-pointer">
                <ShieldCheck className="mr-2 h-4 w-4 text-brand-blue" />
                Gérer les accès
              </DropdownMenuItem>
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
