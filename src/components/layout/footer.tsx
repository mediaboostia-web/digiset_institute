import Link from "next/link";

/**
 * Footer minimal — squelette fonctionnel en attendant le composant final
 * conçu dans Stitch. Cf. design-system-digiset-institute.md §4 "Footer".
 */
const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Institut",
    links: [
      { href: "/institution", label: "À propos" },
      { href: "/vie-etudiante", label: "Vie étudiante" },
      { href: "/actualites", label: "Actualités" },
    ],
  },
  {
    title: "Programmes",
    links: [
      { href: "/programmes/classe-preparatoire", label: "Classe préparatoire" },
      { href: "/programmes/licence-professionnelle", label: "Licence professionnelle" },
      { href: "/programmes/formation-continue", label: "Formation continue" },
      { href: "/programmes/certifications", label: "Certifications" },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/services/location-laboratoires", label: "Location de laboratoires" },
      { href: "/services/consulting-it", label: "Consulting IT" },
    ],
  },
  {
    title: "Contact",
    links: [
      { href: "/contact", label: "Nous contacter" },
      { href: "/mentions-legales", label: "Mentions légales" },
      { href: "/politique-de-confidentialite", label: "Politique de confidentialité" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-brand-blue-dark text-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
        {COLUMNS.map((column) => (
          <div key={column.title}>
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-white/70">
              {column.title}
            </h3>
            <ul className="mt-3 space-y-2">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-white/90 hover:text-brand-orange">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10 px-6 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Digi-SET Institute — Angondje, Carrefour Moussavou, Akanda, Gabon
      </div>
    </footer>
  );
}
