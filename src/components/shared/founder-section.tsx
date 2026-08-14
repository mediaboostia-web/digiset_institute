"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { mergeContentValues } from "@/lib/content-defaults";
import type { ContentBlock } from "@/app/api/content-blocks/route";

export function FounderSection() {
  const [content, setContent] = useState<Record<string, string>>(() => mergeContentValues("founder", []));

  useEffect(() => {
    fetch("/api/content-blocks?page_key=founder")
      .then((res) => res.json())
      .then((json) => {
        const blocks: ContentBlock[] = json.ok && Array.isArray(json.data) ? json.data : [];
        setContent(mergeContentValues("founder", blocks));
      })
      .catch(() => {
        // Repli silencieux sur les valeurs par défaut déjà en state.
      });
  }, []);

  return (
    <section className="bg-brand-blue-dark text-white py-14 sm:py-20 border-y border-white/10 relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Titre avec soulignement stylé et professionnel uniquement sous le titre */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-block">
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Mot du Fondateur
            </h2>
            {/* Soulignement stylé courbé uniquement sous le titre */}
            <div className="h-1.5 w-24 sm:w-32 bg-gradient-to-r from-brand-orange via-brand-orange/80 to-transparent rounded-full mt-2.5 mx-auto" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Portrait du Fondateur */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
            <div className="relative group w-full max-w-sm sm:max-w-md">
              <div className="relative h-[380px] sm:h-[460px] w-full overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                <Image
                  src={content.photo_url}
                  alt={`${content.full_name} - Fondateur de DigiSET Institute`}
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority
                />
                {/* Dégradé flouté bas masquant l'intégration du bas du portrait */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/70 to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Texte officiel rédigé du Fondateur */}
          <div className="lg:col-span-7 space-y-5 order-1 lg:order-2">
            <div className="text-4xl sm:text-5xl font-serif text-brand-orange opacity-90 leading-none select-none font-bold">
              “
            </div>

            <div className="text-slate-100 text-xs sm:text-sm lg:text-base leading-relaxed space-y-4 font-body -mt-4 text-justify sm:text-left">
              <p>{content.quote_paragraph_1}</p>
              <p>{content.quote_paragraph_2}</p>
            </div>

            {/* Signature officielle */}
            <div className="pt-4 border-t border-white/15 flex items-center justify-between flex-wrap gap-3">
              <div>
                <div className="font-heading font-extrabold text-white text-sm sm:text-base">
                  {content.full_name}
                </div>
                <div className="text-xs text-brand-orange font-semibold">
                  {content.role_title}
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/10 px-3.5 py-1.5 rounded-full border border-white/20">
                <span>Rentrée Octobre 2026</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
