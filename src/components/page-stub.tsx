/**
 * Placeholder de page — à remplacer par l'UI générée dans Google Stitch.
 * Chaque page publique/admin importe ce composant en attendant sa maquette
 * définitive, avec la liste exacte des sections attendues (cf.
 * liste-pages-sections-maquettes.md) pour qu'aucune section ne soit oubliée
 * au moment du remplacement.
 */
export function PageStub({
  title,
  route,
  sections,
}: {
  title: string;
  route: string;
  sections: string[];
}) {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-16">
      <div className="rounded-lg border border-dashed border-border bg-secondary/40 p-6">
        <p className="font-heading text-xs font-semibold uppercase tracking-wide text-brand-orange">
          Page stub — à concevoir dans Stitch
        </p>
        <h1 className="mt-2 font-heading text-2xl font-bold text-foreground">
          {title}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{route}</p>
      </div>

      <div className="rounded-lg border border-border p-6">
        <h2 className="font-heading text-sm font-semibold text-foreground">
          Sections attendues (dans l&apos;ordre)
        </h2>
        <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
          {sections.map((section) => (
            <li key={section}>{section}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
