import Image from "next/image";
import Link from "next/link";

/**
 * Header minimal — squelette fonctionnel en attendant le composant final
 * (méga-menu Programmes, etc.) conçu dans Stitch. Cf.
 * design-system-digiset-institute.md §4 "Header / Navigation".
 */
const NAV_LINKS = [
  { href: "/programmes", label: "Programmes" },
  { href: "/services", label: "Services" },
  { href: "/vie-etudiante", label: "Vie étudiante" },
  { href: "/institution", label: "Institution" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/brand/logo-digiset.png"
            alt="Digi-SET Institute"
            width={40}
            height={40}
            priority
          />
          <span className="font-heading text-sm font-bold text-brand-blue-dark">
            Digi-SET Institute
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-brand-blue"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/inscription/candidature"
          className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-brand-orange-dark"
        >
          S&apos;inscrire
        </Link>
      </div>
    </header>
  );
}
