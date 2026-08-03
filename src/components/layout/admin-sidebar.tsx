import Link from "next/link";

/**
 * Sidebar admin minimale — squelette fonctionnel en attendant le composant
 * final conçu dans Stitch. Cf. design-system-digiset-institute.md §5.
 */
const NAV_SECTIONS: { title: string; items: { href: string; label: string }[] }[] = [
  {
    title: "Vue d'ensemble",
    items: [{ href: "/admin", label: "Dashboard" }],
  },
  {
    title: "Leads",
    items: [{ href: "/admin/soumissions", label: "Soumissions" }],
  },
  {
    title: "Contenu",
    items: [
      { href: "/admin/programmes", label: "Programmes" },
      { href: "/admin/actualites", label: "Actualités" },
      { href: "/admin/galerie", label: "Galerie médias" },
      { href: "/admin/temoignages", label: "Témoignages" },
      { href: "/admin/partenaires", label: "Partenaires" },
      { href: "/admin/equipe", label: "Équipe / organigramme" },
      { href: "/admin/pages", label: "Pages de contenu libre" },
      { href: "/admin/documents", label: "Documents téléchargeables" },
    ],
  },
  {
    title: "Administration",
    items: [
      { href: "/admin/utilisateurs", label: "Utilisateurs admin" },
      { href: "/admin/parametres", label: "Paramètres du site" },
    ],
  },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 shrink-0 bg-brand-blue-dark text-white">
      <div className="border-b border-white/10 px-4 py-4">
        <span className="font-heading text-sm font-bold">Digi-SET Admin</span>
      </div>
      <nav className="flex flex-col gap-6 px-3 py-4">
        {NAV_SECTIONS.map((section) => (
          <div key={section.title}>
            <p className="px-2 text-xs font-semibold uppercase tracking-wide text-white/50">
              {section.title}
            </p>
            <div className="mt-1 flex flex-col">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-md px-2 py-1.5 text-sm text-white/90 hover:bg-white/10"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
