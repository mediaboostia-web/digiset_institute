import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center gap-4 px-6 py-24 text-center">
      <p className="font-heading text-sm font-semibold uppercase tracking-wide text-brand-orange">
        Erreur 404
      </p>
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Cette page n&apos;existe pas
      </h1>
      <p className="max-w-md text-sm text-muted-foreground">
        La page que vous cherchez a peut-être été déplacée ou n&apos;existe plus.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-brand-orange-dark"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
