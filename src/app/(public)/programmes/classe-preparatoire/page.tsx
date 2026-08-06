import type { Metadata } from "next";
import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { CheckCircle2, GraduationCap, ArrowRight, FileText, Award, Calendar, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Classe Préparatoire MP2I (Bac+2 - 120 ECTS)",
  description:
    "Découvrez la Classe Préparatoire MP2I (Mathématiques, Physique, Informatique & Ingénierie) de Digi-SET Institute à Akanda. Cursus intensif de 2 ans ouvrant l'accès aux Licences Pro et cycles ingénieurs.",
  openGraph: {
    title: "Classe Préparatoire MP2I (Bac+2) | Digi-SET Institute Gabon",
    description:
      "Formation scientifique d'excellence de 2 ans (120 ECTS) avec pratique en laboratoire de physique et salles informatiques sous Linux/Python.",
  },
};

export default function ClassePreparatoirePage() {
  return (
    <div>
      <HeroSection
        badge="Formation Initiale • Cycle Préparatoire"
        title="Classe Préparatoire MP2I"
        subtitle="Mathématiques, Physique, Informatique & Ingénierie (MP2I) — Un cycle scientifique exigeant de 2 ans (120 ECTS) préparant aux métiers d'ingénieur et de chercheur."
        breadcrumbs={[
          { label: "Programmes", href: "/programmes" },
          { label: "Classe Préparatoire MP2I" },
        ]}
        primaryCtaText="Postuler à la Prépa MP2I"
        primaryCtaHref="/inscription/candidature"
        secondaryCtaText="Frais & Dossier"
        secondaryCtaHref="/inscription"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          {/* Fiche synthèse */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-brand-blue shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Durée</div>
                <div className="text-sm font-extrabold text-slate-900">2 Ans (4 Semestres)</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-brand-blue shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Crédits ECTS</div>
                <div className="text-sm font-extrabold text-slate-900">120 ECTS Acquis</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <GraduationCap className="h-8 w-8 text-brand-blue shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Niveau d&apos;accès</div>
                <div className="text-sm font-extrabold text-slate-900">Bac C, D, S, E</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-brand-orange shrink-0" />
              <div>
                <div className="text-[10px] uppercase font-bold text-slate-500">Poursuite</div>
                <div className="text-sm font-extrabold text-slate-900">Licence Pro & Ingénieur</div>
              </div>
            </div>
          </div>

          {/* Présentation & Objectifs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="font-heading text-2xl font-extrabold text-slate-900">
                Présentation du Cursus MP2I
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed">
                La Classe Préparatoire MP2I de Digi-SET Institute a été conçue pour apporter aux bacheliers scientifiques des bases théoriques inébranlables en mathématiques appliquées, physique fondamentale, algorithmique et ingénierie informatique.
              </p>
              <p className="text-sm text-slate-700 leading-relaxed">
                Pendant deux années intensives, l&apos;accent est mis à la fois sur le raisonnement scientifique de haut niveau et sur la pratique directe en laboratoire de travaux pratiques modernes (optique, mécanique, électronique, et salles informatiques sous Linux/Python).
              </p>

              <h3 className="font-heading text-lg font-bold text-slate-900 pt-4">
                Objectifs Pédagogiques du Programme
              </h3>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <span>Maîtriser les fondements des mathématiques (analyse, algèbre linéaire, probabilités).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <span>Acquérir une rigueur d&apos;expérimentation en physique et sciences de l&apos;ingénieur.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <span>Développer en C, Python et maîtriser l&apos;algorithmique fondamentale et les structures de données.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <span>Préparer aux poursuites d&apos;études en Licence Professionnelle ou en cycle ingénieur international.</span>
                </li>
              </ul>
            </div>

            {/* Dossier de candidature requis */}
            <div className="lg:col-span-5">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-4 shadow-xs">
                <div className="flex items-center gap-2 text-brand-blue font-bold text-sm">
                  <FileText className="h-5 w-5 text-brand-orange" />
                  <span>Pièces à fournir pour l&apos;admission</span>
                </div>
                <ul className="space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                    <span>Lettre de motivation explicative</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                    <span>Attestation ou Diplôme de Baccalauréat (légalisé)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                    <span>Relevé de notes officiel du Baccalauréat</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                    <span>Bulletins de notes des classes de Première et Terminale</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                    <span>Copie légalisée de l&apos;acte de naissance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-orange"></span>
                    <span>2 photos d&apos;identité récentes</span>
                  </li>
                </ul>

                <div className="pt-4">
                  <Link
                    href="/inscription/candidature"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-3 text-xs font-bold text-white hover:bg-brand-orange-dark transition-colors shadow-xs"
                  >
                    Déposer mon dossier en ligne
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Organisation en 4 Semestres */}
          <div className="space-y-6 pt-6">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900">
              Organisation des 4 Semestres de Formation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
                <div className="text-xs font-bold text-brand-blue uppercase tracking-wider">Semestre 1</div>
                <h3 className="font-heading text-base font-bold text-slate-900">Socle Scientifique</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• Analyse I & Algèbre I</li>
                  <li>• Mécanique du point & Optique</li>
                  <li>• Algorithmique (Python)</li>
                  <li>• Anglais scientifique I</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
                <div className="text-xs font-bold text-brand-blue uppercase tracking-wider">Semestre 2</div>
                <h3 className="font-heading text-base font-bold text-slate-900">Approfondissement</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• Analyse II & Électrocinétique</li>
                  <li>• Structures de données & C</li>
                  <li>• Physique expérimentale en labo</li>
                  <li>• Expression & Communication</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
                <div className="text-xs font-bold text-brand-orange uppercase tracking-wider">Semestre 3</div>
                <h3 className="font-heading text-base font-bold text-slate-900">Spécialisation</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• Probabilités & Statistiques</li>
                  <li>• Électromagnétisme & Ondes</li>
                  <li>• Bases de données & Réseaux</li>
                  <li>• Projet scientifique de groupe</li>
                </ul>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3 shadow-2xs">
                <div className="text-xs font-bold text-brand-orange uppercase tracking-wider">Semestre 4</div>
                <h3 className="font-heading text-base font-bold text-slate-900">Orientation & Stage</h3>
                <ul className="text-xs text-slate-600 space-y-1.5">
                  <li>• Algorithmique avancée & Graphes</li>
                  <li>• Modélisation physique avancée</li>
                  <li>• Stage d&apos;initiation technique (8 sem)</li>
                  <li>• Soutenance du diplôme (120 ECTS)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Débouchés & Poursuites */}
          <div className="rounded-2xl bg-brand-blue-dark text-white p-8 space-y-4 shadow-lg">
            <h3 className="font-heading text-xl font-bold">Poursuite d&apos;Études après la Prépa MP2I</h3>
            <p className="text-xs sm:text-sm text-slate-200 max-w-3xl leading-relaxed">
              Après l&apos;obtention des 120 crédits ECTS de la prépa MP2I, les étudiants intègrent directement nos Licences Professionnelles de Digi-SET Institute (IA, Cybersécurité, Systèmes de Paiement) ou poursuivent dans nos écoles partenaires en cycle ingénieur.
            </p>
            <div className="pt-2">
              <Link
                href="/inscription/candidature"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-brand-orange-dark transition-colors"
              >
                Poser ma candidature MP2I
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
