import Image from "next/image";

export function FounderSection() {
  return (
    <section className="bg-brand-blue-dark text-white py-16 lg:py-24 border-y border-white/10 relative">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Inspiré de Capture 2 (From the Director's Desk) */}
        <div className="text-center mb-12 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-widest text-brand-orange">
            Le Mot du Directeur
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Le Mot du Fondateur & Visionnaire
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Photo du Fondateur dans un cadre blanc épuré (style Capture 2) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group w-full max-w-md">
              <div className="rounded-3xl p-3 bg-white/10 backdrop-blur-xs border border-white/20 shadow-2xl">
                <div className="relative h-80 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-900">
                  <Image
                    src="/images/fondateur/Dr ABAGA ABESSOLO Michel Audrey.jpg"
                    alt="Dr ABAGA ABESSOLO Michel Audrey - Fondateur Digi-SET Institute"
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5">
                    <div>
                      <div className="font-heading font-extrabold text-white text-lg">
                        Dr ABAGA ABESSOLO Michel Audrey
                      </div>
                      <div className="text-xs text-brand-orange font-semibold">
                        Fondateur & Directeur Général — Digi-SET Institute
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Citation & Texte du Fondateur avec grand guillemet “ (style Capture 2) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-5xl sm:text-6xl font-serif text-brand-orange opacity-80 leading-none select-none font-bold">
              “
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl font-extrabold leading-tight text-white -mt-4">
              &quot;Former les leaders du numérique qui façonneront l&apos;Afrique de demain.&quot;
            </h3>

            <div className="text-slate-200 text-sm sm:text-base leading-relaxed space-y-4 font-body">
              <p>
                Digi-SET Institute est né d&apos;une conviction profonde : l&apos;Afrique subsaharienne, et le Gabon en particulier, possèdent un vivier exceptionnel de talents prêts à relever les défis de la révolution numérique mondiale.
              </p>
              <p>
                Notre mission est d&apos;offrir une formation d&apos;excellence, alliant rigueur académique (classes préparatoires et licences professionnelles) et compétences opérationnelles recherchées par les entreprises (Cybersécurité, Intelligence Artificielle, Systèmes de Paiement).
              </p>
              <p>
                Grâce à nos équipements de pointe et à des partenariats internationaux de premier plan, nous bâtissons l&apos;avenir technologique de notre région avec détermination et rigueur.
              </p>
            </div>

            <div className="pt-4 border-t border-white/15 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="font-heading font-extrabold text-white text-base">
                  Dr ABAGA ABESSOLO Michel Audrey
                </div>
                <div className="text-xs text-slate-300">
                  Docteur en Ingénierie & Sciences du Numérique • Akanda, Gabon
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-bold text-brand-orange bg-brand-orange/10 px-3.5 py-1.5 rounded-full border border-brand-orange/20">
                <span>Rentrée Septembre 2026</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
