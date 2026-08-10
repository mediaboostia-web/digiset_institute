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
  Users,
  MessageSquareQuote,
  Building2,
  FileText,
  FolderDown,
  UserCheck,
  Settings,
  PlusCircle,
  ExternalLink,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

interface AdminSidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function AdminSidebar({ isCollapsed = false, onToggle }: AdminSidebarProps) {
  const pathname = usePathname();

  const NAV_GROUPS: NavGroup[] = [
    {
      title: "Modules V1 (Opérationnels)",
      items: [
        {
          href: "/admin",
          label: "Tableau de bord",
          icon: LayoutDashboard,
        },
        {
          href: "/admin/soumissions",
          label: "Réception des Soumissions",
          icon: Inbox,
          badge: 4,
        },
        {
          href: "/admin/actualites",
          label: "Actualités & Presse",
          icon: Newspaper,
        },
        {
          href: "/admin/equipe",
          label: "Organigramme & Équipe",
          icon: Users,
        },
        {
          href: "/admin/parametres",
          label: "Paramètres du site",
          icon: Settings,
        },
      ],
    },
    {
      title: "Modules Version 2.0 (V2)",
      items: [
        {
          href: "/admin/partenaires",
          label: "Partenaires & Logos",
          icon: Building2,
        },
        {
          href: "/admin/programmes",
          label: "Programmes académiques",
          icon: GraduationCap,
        },
        {
          href: "/admin/temoignages",
          label: "Témoignages & Avis",
          icon: MessageSquareQuote,
        },
        {
          href: "/admin/galerie",
          label: "Galerie médias",
          icon: ImageIcon,
        },
        {
          href: "/admin/documents",
          label: "Documents PDF",
          icon: FolderDown,
        },
        {
          href: "/admin/pages",
          label: "Pages libres & SEO",
          icon: FileText,
        },
        {
          href: "/admin/utilisateurs",
          label: "Gestion Administrateurs",
          icon: UserCheck,
        },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "sticky top-0 h-screen shrink-0 border-r border-white/10 bg-brand-blue-dark text-white flex flex-col justify-between overflow-y-auto transition-all duration-300 z-40",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div>
        {/* Logo & Retract Icon Toggle */}
        <div className="flex items-center justify-between border-b border-white/10 px-3.5 py-4">
          <Link href="/admin" className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white p-1 shadow-xs">
              <Image
                src="/brand/logo-digiset.png"
                alt="Logo DigiSET"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            {!isCollapsed && (
              <div className="min-w-0">
                <h2 className="font-heading text-sm font-bold text-white leading-tight truncate">
                  DigiSET
                </h2>
                <p className="text-[10px] font-medium text-white/60 truncate">Back-Office</p>
              </div>
            )}
          </Link>

          {/* Bouton d'icône de retrait de la sidebar */}
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer shrink-0"
            title={isCollapsed ? "Agrandir le menu" : "Réduire / Cacher le menu"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="h-5 w-5 text-brand-orange" />
            ) : (
              <PanelLeftClose className="h-5 w-5 hover:text-brand-orange transition-colors" />
            )}
          </button>
        </div>

        {/* Action Rapide : Publier Actualité */}
        <div className={cn("pt-4 pb-2", isCollapsed ? "px-2" : "px-4")}>
          <Link
            href="/admin/actualites"
            title="Publier une actualité"
            className={cn(
              "flex items-center justify-center gap-2 rounded-lg bg-brand-orange text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-orange-dark active:scale-[0.98]",
              isCollapsed ? "h-10 w-10 p-0" : "w-full px-4 py-2.5"
            )}
          >
            <PlusCircle className="h-4 w-4 shrink-0" />
            {!isCollapsed && <span>Publier une actualité</span>}
          </Link>
        </div>

        {/* Navigation par Groupes */}
        <nav className={cn("flex flex-col gap-4 py-3", isCollapsed ? "px-2" : "px-3")}>
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              {!isCollapsed && (
                <p className="px-3 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-white/40">
                  {group.title}
                </p>
              )}
              <div className="flex flex-col gap-0.5">
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
                      title={isCollapsed ? item.label : undefined}
                      className={cn(
                        "group relative flex items-center rounded-lg text-xs font-medium transition-colors",
                        isCollapsed ? "justify-center h-10 w-10 p-0 mx-auto" : "justify-between px-3 py-2",
                        isActive
                          ? "bg-white/15 font-bold text-white shadow-xs"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            "h-4 w-4 shrink-0 transition-colors",
                            isActive ? "text-brand-orange" : "text-white/60 group-hover:text-white"
                          )}
                        />
                        {!isCollapsed && <span>{item.label}</span>}
                      </div>

                      {item.badge && item.badge > 0 && (
                        <span
                          className={cn(
                            "flex items-center justify-center rounded-full bg-brand-orange font-extrabold text-white",
                            isCollapsed
                              ? "absolute -top-1 -right-1 h-4 min-w-[16px] px-1 text-[9px] ring-2 ring-brand-blue-dark"
                              : "h-5 min-w-[20px] px-1.5 text-[10px]"
                          )}
                        >
                          {item.badge}
                        </span>
                      )}

                      {/* Barre d'activation latérale */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-brand-orange" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Pied de Sidebar : Voir le site public */}
      <div className={cn("border-t border-white/10", isCollapsed ? "p-2 text-center" : "p-4")}>
        <Link
          href="/"
          target="_blank"
          title="Voir le site public"
          className={cn(
            "flex items-center justify-between rounded-lg bg-white/5 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white",
            isCollapsed ? "h-9 w-9 justify-center p-0 mx-auto" : "px-3 py-2 w-full"
          )}
        >
          {!isCollapsed && <span>Voir le site public</span>}
          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
        </Link>
      </div>
    </aside>
  );
}
