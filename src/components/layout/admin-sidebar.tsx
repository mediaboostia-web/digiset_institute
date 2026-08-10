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

export function AdminSidebar() {
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
    <aside className="sticky top-0 h-screen w-64 shrink-0 border-r border-white/10 bg-brand-blue-dark text-white flex flex-col justify-between overflow-y-auto">
      <div>
        {/* Logo & Titre */}
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white p-1 shadow-xs">
            <Image
              src="/brand/logo-digiset.png"
              alt="Logo DigiSET"
              width={36}
              height={36}
              className="object-contain"
            />
          </div>
          <div>
            <h2 className="font-heading text-base font-bold text-white leading-tight">
              DigiSET
            </h2>
            <p className="text-[11px] font-medium text-white/60">Portail Back-Office</p>
          </div>
        </div>

        {/* Action Rapide : Publier Actualité */}
        <div className="px-4 pt-5 pb-2">
          <Link
            href="/admin/actualites"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-brand-orange-dark active:scale-[0.98]"
          >
            <PlusCircle className="h-4 w-4" />
            Publier une actualité
          </Link>
        </div>

        {/* Navigation par Groupes */}
        <nav className="flex flex-col gap-5 px-3 py-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-white/40">
                {group.title}
              </p>
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
                      className={cn(
                        "group relative flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors",
                        isActive
                          ? "bg-white/15 font-bold text-white shadow-xs"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <Icon
                          className={cn(
                            "h-4 w-4 transition-colors",
                            isActive ? "text-brand-orange" : "text-white/60 group-hover:text-white"
                          )}
                        />
                        <span>{item.label}</span>
                      </div>

                      {item.badge && item.badge > 0 && (
                        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-brand-orange px-1.5 text-[10px] font-extrabold text-white">
                          {item.badge}
                        </span>
                      )}

                      {/* Barre d'activation latérale */}
                      {isActive && (
                        <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-brand-orange" />
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
      <div className="border-t border-white/10 p-4">
        <Link
          href="/"
          target="_blank"
          className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white"
        >
          <span>Voir le site public</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Link>
      </div>
    </aside>
  );
}
