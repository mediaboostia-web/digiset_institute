"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Inbox,
  GraduationCap,
  Newspaper,
  Image as ImageIcon,
  Quote,
  Building2,
  Users,
  FolderDown,
  FileText,
  UserCheck,
  Settings,
  PlusCircle,
  X,
  PanelLeftClose,
  PanelLeftOpen,
  LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  pendingSubmissionsCount?: number;
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
  v2Badge?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export function AdminSidebar({
  isCollapsed = false,
  onToggle,
  isMobileOpen = false,
  onCloseMobile,
  pendingSubmissionsCount = 0,
}: AdminSidebarProps) {
  const pathname = usePathname();

  const NAV_GROUPS: NavGroup[] = [
    {
      title: "Fonctionnalités V1 (Actives)",
      items: [
        {
          href: "/admin",
          label: "Tableau de Bord",
          icon: LayoutDashboard,
        },
        {
          href: "/admin/soumissions",
          label: "Soumissions & Candidatures",
          icon: Inbox,
          badge: pendingSubmissionsCount,
        },
        {
          href: "/admin/actualites",
          label: "Actualités & Articles",
          icon: Newspaper,
        },
        {
          href: "/admin/galerie",
          label: "Médiathèque & Banque Média",
          icon: ImageIcon,
        },
        {
          href: "/admin/equipe",
          label: "Organigramme & Équipe",
          icon: Users,
        },
        {
          href: "/admin/utilisateurs",
          label: "Comptes & Droits Admin",
          icon: UserCheck,
        },
        {
          href: "/admin/parametres",
          label: "Paramètres & Notifications",
          icon: Settings,
        },
      ],
    },
    {
      title: "Extensions & Modules V2",
      items: [
        {
          href: "/admin/programmes",
          label: "Offres & Cursus",
          icon: GraduationCap,
          v2Badge: "V2",
        },
        {
          href: "/admin/temoignages",
          label: "Témoignages & Avis",
          icon: Quote,
          v2Badge: "V2",
        },
        {
          href: "/admin/partenaires",
          label: "Partenaires Officiels",
          icon: Building2,
          v2Badge: "V2",
        },
        {
          href: "/admin/pages",
          label: "Pages libres & SEO",
          icon: FileText,
          v2Badge: "V2",
        },
        {
          href: "/admin/documents",
          label: "Documents PDF",
          icon: FolderDown,
          v2Badge: "V2",
        },
      ],
    },
  ];

  const handleNavClick = () => {
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-xs md:hidden animate-in fade-in duration-200"
        />
      )}

      {/* Sidebar Container (Desktop & Mobile Drawer) — SANS DEBORDEMENT LATÉRAL */}
      <aside
        className={cn(
          "sticky top-0 h-screen shrink-0 border-r border-white/10 bg-brand-blue-dark text-white flex flex-col justify-between overflow-y-auto overflow-x-hidden transition-all duration-300 z-50 select-none no-scrollbar",
          // Mobile Drawer styling
          "fixed inset-y-0 left-0 md:relative",
          isMobileOpen ? "translate-x-0 w-72 shadow-2xl" : "-translate-x-full md:translate-x-0",
          // Desktop collapsed styling
          !isMobileOpen && (isCollapsed ? "md:w-16" : "md:w-64")
        )}
      >
        <div>
          {/* Logo & Retract Icon Toggle */}
          <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-4">
            <Link href="/admin" onClick={handleNavClick} className="flex items-center gap-3 min-w-0">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white p-1 shadow-xs border border-white/20">
                <Image
                  src="/brand/logo-digiset.png"
                  alt="Logo DigiSET"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
              {(!isCollapsed || isMobileOpen) && (
                <div className="min-w-0">
                  <h2 className="font-heading text-sm font-bold text-white leading-tight truncate">
                    DigiSET
                  </h2>
                  <p className="text-[10px] font-medium text-white/60 truncate">Back-Office</p>
                </div>
              )}
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors md:hidden cursor-pointer"
              title="Fermer le menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Action Rapide : Publier Actualité */}
          <div className={cn("pt-4 pb-2", isCollapsed && !isMobileOpen ? "px-2" : "px-3.5")}>
            <Link
              href="/admin/actualites"
              onClick={handleNavClick}
              title="Publier une actualité"
              className={cn(
                "flex items-center justify-center gap-2 rounded-xl bg-brand-orange text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-brand-orange-dark hover:scale-[1.02] active:scale-[0.98] cursor-pointer",
                isCollapsed && !isMobileOpen ? "h-10 w-10 p-0" : "w-full px-4 py-2.5"
              )}
            >
              <PlusCircle className="h-4 w-4 shrink-0" />
              {(!isCollapsed || isMobileOpen) && <span className="truncate">Publier une actualité</span>}
            </Link>
          </div>

          {/* Navigation Réordonnée : V1 en Haut, V2 en Bas */}
          <nav className={cn("flex flex-col gap-4 py-3", isCollapsed && !isMobileOpen ? "px-2" : "px-3")}>
            {NAV_GROUPS.map((group) => (
              <div key={group.title}>
                {(!isCollapsed || isMobileOpen) && (
                  <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40 truncate flex items-center justify-between">
                    <span>{group.title}</span>
                  </p>
                )}
                <div className="flex flex-col gap-1">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      item.href === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.href);

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleNavClick}
                        title={isCollapsed && !isMobileOpen ? item.label : undefined}
                        className={cn(
                          "group relative flex items-center rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer select-none",
                          isCollapsed && !isMobileOpen
                            ? "justify-center h-10 w-10 p-0 mx-auto hover:scale-110"
                            : "justify-between px-3 py-2.5 hover:translate-x-1",
                          isActive
                            ? "bg-white/20 font-bold text-white shadow-md ring-1 ring-white/20 border-l-4 border-brand-orange"
                            : "text-white/80 hover:bg-white/15 hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-transform group-hover:scale-110",
                              isActive ? "text-brand-orange" : "text-white/70 group-hover:text-white"
                            )}
                          />
                          {(!isCollapsed || isMobileOpen) && (
                            <span className="truncate">{item.label}</span>
                          )}
                        </div>

                        {item.badge && item.badge > 0 ? (
                          <span
                            className={cn(
                              "flex items-center justify-center rounded-full bg-brand-orange font-extrabold text-white shrink-0 shadow-sm",
                              isCollapsed && !isMobileOpen
                                ? "absolute -top-1 -right-1 h-4 min-w-[16px] px-1 text-[9px] ring-2 ring-brand-blue-dark"
                                : "h-5 min-w-[20px] px-1.5 text-[10px]"
                            )}
                          >
                            {item.badge}
                          </span>
                        ) : null}

                        {item.v2Badge && (!isCollapsed || isMobileOpen) && (
                          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-white/10 text-white/50 group-hover:bg-brand-orange/30 group-hover:text-white transition-colors">
                            {item.v2Badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Pied de Sidebar : Version & Statut */}
        {(!isCollapsed || isMobileOpen) && (
          <div className="border-t border-white/10 p-3.5 text-[10px] text-white/50 flex items-center justify-between">
            <span>DigiSET OS v1.2</span>
            <span className="h-2 w-2 rounded-full bg-emerald-400" title="En ligne" />
          </div>
        )}
      </aside>
    </>
  );
}
