import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Briefcase, Building2, MapPin, Phone, Mail, Sparkles, ShieldCheck, Cpu, ChevronRight, BookOpen, Award } from "lucide-react";
import { FounderSection } from "@/components/shared/founder-section";
import { CertificationBanner } from "@/components/shared/certification-banner";
import { ProgramCard } from "@/components/shared/program-card";
import { HomeFormsSection } from "@/components/shared/home-forms-section";

export default function AccueilPage() {
  return (
    <div className="space-y-0 overflow-x-hidden w-full">
      {/* 1. Hero Principal — Badge de Bienvenue à DigiSET Institute, Image Hero_image1.jpg Grand Format Flottante avec Flou Bas */}
      <section className="relative bg-brand-blue-dark text-white py-10 sm:py-14 lg:py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-25 scale-105 transform blur-[2px] pointer-events-none"
          style={{ backgroundImage: "url('/images/img/Background-image.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark/95 via-brand-blue-dark/85 to-brand-blue-dark/95" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            <div className="md:col-span-7 space-y-4 sm:space-y-5">
              {/* Badge avec Texte de Bienvenue Visible en Blanc Puro */}
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 border border-white/25 px-4 py-1.5 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white shadow-xs">
                Bienvenue à DigiSET Institute — Akanda, Gabon
              </div>

              {/* Titre H1 avec trait légèrement courbé stylé designer uniquement sur "Métiers du Numérique" */}
              <h1 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight sm:leading-tight text-white drop-shadow-xs">
                L&apos;Établissement Supérieur Privé de Référence aux{" "}
                <span className="relative inline-block text-white">
                  Métiers du Numérique
                  <svg
                    className="absolute -bottom-2 left-0 w-full h-3 text-brand-orange overflow-visible"
                    viewBox="0 0 100 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2 8C25 2 75 11 98 4"
                      stroke="currentColor"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Description claire et lisible sans soulignement */}
              <p className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-body max-w-2xl drop-shadow-2xs">
                DigiSET Institute forme les futurs experts en Intelligence Artificielle, Cybersécurité et Systèmes de Paiement Électronique (Monétique).
              </p>

              {/* Boutons d'action avec arrondis 15px et effet de survol dynamique */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                <Link
                  href="/inscription/candidature"
                  className="inline-flex items-center justify-center gap-2 rounded-[15px] bg-brand-orange px-6 py-3.5 text-xs sm:text-sm font-bold text-white shadow-md hover:bg-brand-orange-dark hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 active:scale-98"
                >
                  Déposer une candidature
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/programmes"
                  className="inline-flex items-center justify-center gap-2 rounded-[15px] border border-white/30 bg-white/10 px-6 py-3.5 text-xs sm:text-sm font-bold text-white hover:bg-white/25 hover:border-white/50 transition-all duration-300"
                >
                  Explorer les formations
                </Link>
              </div>

              {/* Cadre global transparent unique avec séparation légère pour les 3 métriques */}
              <div className="pt-3">
                <div className="rounded-[15px] bg-white/10 backdrop-blur-xs border border-white/20 p-3.5 sm:p-4 grid grid-cols-3 divide-x divide-white/20 shadow-md">
                  <div className="px-2 sm:px-4 text-center sm:text-left">
                    <div className="font-heading text-base sm:text-xl font-extrabold text-brand-orange">100%</div>
                    <div className="text-[10px] sm:text-xs text-slate-100 font-medium leading-tight">Pratique en Labo TP</div>
                  </div>
                  <div className="px-2 sm:px-4 text-center sm:text-left">
                    <div className="font-heading text-base sm:text-xl font-extrabold text-brand-orange">6+</div>
                    <div className="text-[10px] sm:text-xs text-slate-100 font-medium leading-tight">Certifications Pro</div>
                  </div>
                  <div className="px-2 sm:px-4 text-center sm:text-left">
                    <div className="font-heading text-base sm:text-xl font-extrabold text-brand-orange">Bac+2/3</div>
                    <div className="text-[10px] sm:text-xs text-slate-100 font-medium leading-tight">Parcours Diplômants</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Image du Hero (Hero_image1.jpg) — Grand Format visible UNIQUEMENT sur Tablette (md) et Desktop (lg) */}
            <div className="hidden md:block md:col-span-5 relative">
              <div className="relative w-full h-[460px] md:h-[500px] lg:h-[540px] animate-float rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-slate-900 group">
                <Image
                  src="/images/img/Hero_image1.jpg"
                  alt="DigiSET Institute Campus et Étudiants"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  priority
                  sizes="(max-width: 1024px) 45vw, 40vw"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/70 to-transparent flex items-end p-6 pointer-events-none">
                  <div className="text-white space-y-1">
                    <div className="text-xs font-bold uppercase tracking-wider text-brand-orange">Campus Akanda</div>
                    <div className="text-sm font-bold">Laboratoires de TP Haute Technologie & Salles Informatiques</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Mot du Fondateur */}
      <FounderSection />

      {/* 3. Section "Former l'Élite Technologique de Demain" */}
      <section className="py-14 sm:py-20 bg-slate-50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-3.5 py-1 rounded-full border border-blue-100">
              Mission & Engagements
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl font-extrabold text-slate-900">
              Former l&apos;Élite Technologique de Demain
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              DigiSET Institute allie rigueur scientifique et immersion pratique pour garantir la souveraineté numérique du Gabon et du continent.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            
            {/* CARTE 01 : Style Bleu Marine / Académique avec Illustration Grand 01 en arrière-plan */}
            <div className="relative group rounded-3xl bg-gradient-to-br from-brand-blue-dark via-slate-900 to-brand-blue-dark text-white p-7 sm:p-8 space-y-6 shadow-md border border-blue-400/20 hover:border-brand-blue hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between">
              <div className="absolute -right-2 -top-3 text-8xl font-black font-heading text-blue-400/10 group-hover:text-blue-400/20 transition-colors select-none pointer-events-none">
                01
              </div>

              <div className="relative space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-brand-blue text-white flex items-center justify-center font-heading font-extrabold text-lg shadow-sm border border-white/20">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-blue-300 bg-blue-950/60 px-2.5 py-0.5 rounded-md border border-blue-800/40">
                    Axe 1 — Rigueur
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white mt-1">
                    Exigence Académique ECTS
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-body">
                  Des cursus rigoureux alignés sur les standards européens avec 60 ECTS par an, garantissant la transférabilité internationale du diplôme et les poursuites d&apos;études en cycle ingénieur.
                </p>
              </div>

              <div className="relative pt-4 border-t border-white/15 text-xs font-bold text-blue-300 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brand-orange" />
                <span>Bac à Bac+3 Diplômant Validé</span>
              </div>
            </div>

            {/* CARTE 02 : Style Orange Vif / Laboratoires TP avec Illustration Grand 02 en arrière-plan */}
            <div className="relative group rounded-3xl bg-gradient-to-br from-brand-orange via-brand-orange-dark to-amber-700 text-white p-7 sm:p-8 space-y-6 shadow-md border border-orange-300/30 hover:border-white/60 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between">
              <div className="absolute -right-2 -top-3 text-8xl font-black font-heading text-white/15 group-hover:text-white/25 transition-colors select-none pointer-events-none">
                02
              </div>

              <div className="relative space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-white text-brand-orange flex items-center justify-center font-heading font-extrabold text-lg shadow-sm">
                  <Cpu className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-white bg-black/20 px-2.5 py-0.5 rounded-md border border-white/20">
                    Axe 2 — Pratique
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white mt-1">
                    Laboratoires TP Haute Technologie
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-100 leading-relaxed font-body">
                  Des plateaux scientifiques de pointe équipés en optique, électricité, serveurs sous Linux/Python et bancs de cybersécurité SOC accessibles dès la 1ère année d&apos;études.
                </p>
              </div>

              <div className="relative pt-4 border-t border-white/25 text-xs font-bold text-white flex items-center gap-2">
                <Cpu className="h-4 w-4 text-amber-200" />
                <span>100% de Pratique Garantie en Labo</span>
              </div>
            </div>

            {/* CARTE 03 : Style Émeraude / Certifications Pro avec Illustration Grand 03 en arrière-plan */}
            <div className="relative group rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-7 sm:p-8 space-y-6 shadow-md border border-emerald-500/30 hover:border-emerald-400 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 overflow-hidden flex flex-col justify-between">
              <div className="absolute -right-2 -top-3 text-8xl font-black font-heading text-emerald-400/10 group-hover:text-emerald-400/20 transition-colors select-none pointer-events-none">
                03
              </div>

              <div className="relative space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-heading font-extrabold text-lg shadow-sm border border-emerald-400/30">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-md border border-emerald-700/50">
                    Axe 3 — Emploi
                  </span>
                  <h3 className="font-heading text-lg sm:text-xl font-extrabold text-white mt-1">
                    Partenariats Certifiants
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-body">
                  Intégration directe des examens de certification mondiaux Cisco, Microsoft, AWS, Linux LPIC et CompTIA Security+ dans le cursus académique.
                </p>
              </div>

              <div className="relative pt-4 border-t border-white/15 text-xs font-bold text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Employabilité Immédiate & SOC</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Choisir une situation */}
      <section className="py-12 sm:py-16 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Accès par Profil
            </span>
            <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Quelle est votre situation ?
            </h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2">
              Orientation personnalisée selon votre profil académique ou professionnel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center mb-4">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                  Bacheliers & Étudiants
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 mt-1">
                  Formation Initiale (Bac à Bac+3)
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Intégrez notre Classe Préparatoire MP2I (2 ans) ou notre Licence Professionnelle (1 an) avec nos 3 options d&apos;avenir en IA, Cybersécurité et Monétique.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/inscription/candidature"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[15px] bg-brand-blue px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-blue-dark transition-all duration-300"
                >
                  Déposer une candidature
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-4">
                  <Briefcase className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-orange">
                  Entreprises & Administrations
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 mt-1">
                  Formations Continues pour Entreprises
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Accélérez la montée en compétences de vos équipes avec nos programmes certifiants : en groupe dans nos salles DigiSET ou sur-mesure directement dans vos locaux d'entreprise.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/programmes/formation-continue"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[15px] bg-brand-orange px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-orange-dark transition-all duration-300"
                >
                  Demander un devis entreprise
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="flex flex-col justify-between rounded-2xl bg-white p-6 border border-slate-200 shadow-xs hover:border-slate-300 hover:shadow-md transition-all">
              <div>
                <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4">
                  <Building2 className="h-6 w-6" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Organisations & DSI
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 mt-1">
                  Consulting IT & Transformations
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Accompagnement stratégique, audit de sécurité des SI, mise en place de SOC et conseil en transformation numérique à haute valeur ajoutée.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/services/consulting-it"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-[15px] bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all duration-300"
                >
                  Découvrir le Consulting IT
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CATALOGUE GÉNÉRAL — 3 Grands Blocs Principaux */}
      <section className="py-12 sm:py-16 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue">
                Offres de Catalogue
              </span>
              <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                Nos 3 Pôles Principaux de Formation
              </h2>
            </div>
            <Link
              href="/programmes"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:gap-2 transition-all"
            >
              Voir le catalogue complet <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* BLOC 1 : Formation Initiale (Englobe toute la formation diplômante) */}
            <ProgramCard
              title="Formation Initiale Diplômante"
              category="Initiale"
              description="Regroupe l'ensemble de nos formations académiques initiales : la Classe Préparatoire MP2I (2 ans) et notre Licence Professionnelle (1 an) déclinée en 3 options spécialisées."
              duration="1 à 2 ans (60 - 120 ECTS)"
              targetPublic="Bacheliers scientifiques & diplômés Bac+2"
              highlights={[
                "Classe Préparatoire MP2I (2 ans)",
                "Option IA & Data Science",
                "Option Cybersécurité & Audit SI",
                "Option Systèmes de Paiement Électronique",
              ]}
              href="/programmes"
              ctaText="Découvrir la Formation Initiale"
              isCatalogCard={true}
            />

            {/* BLOC 2 : Formation Continue (Formations Inter & Intra-Entreprises) */}
            <ProgramCard
              title="Formations Continues & Sur-Mesure"
              category="Continue"
              description="Formations professionnelles courtes et certifiantes pour accélérer la montée en compétences de vos équipes. Dispensées dans nos centres DigiSET ou directement dans vos locaux d'entreprise."
              duration="3 à 10 jours ou sur-mesure"
              targetPublic="Dirigeants, DSI, cadres, ingénieurs et collaborateurs"
              highlights={[
                "En Groupe dans nos centres (Inter-entreprises)",
                "Sur-Mesure dans vos bureaux (Intra-entreprise)",
                "Certifications Internationales (Cisco, AWS, Linux...)",
                "Ingénierie de formation & audit des besoins",
              ]}
              href="/programmes/formation-continue"
              ctaText="Découvrir les Formations Continues"
              isCatalogCard={true}
            />

            {/* BLOC 3 : Formations Online (DigiSET Online) */}
            <ProgramCard
              title="Formations Online (DigiSET Online)"
              category="Online"
              description="Déclinaison en ligne de nos programmes diplômants et certifiants avec plateforme LMS interactive, classes virtuelles et suivi personnalisé par tuteur dédié."
              duration="Rythme flexible / À distance"
              targetPublic="Professionnels en activité & étudiants éloignés"
              highlights={[
                "Plateforme e-learning interactive LMS",
                "Accompagnement et tutorat individualisé",
                "Classes virtuelles & laboratoires virtuels",
                "Examens et diplômes identiques au présentiel",
              ]}
              href="/programmes/digiset-online"
              ctaText="Découvrir DigiSET Online"
              isCatalogCard={true}
            />
          </div>
        </div>
      </section>

      {/* 6. BANDEAU CERTIFICATIONS INTERNATIONALES */}
      <CertificationBanner />

      {/* 7. VISUALISATION DES PÔLES DE L'ORGANIGRAMME */}
      <section className="py-12 sm:py-16 bg-slate-50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Structure & Gouvernance
              </span>
              <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                Les Pôles d&apos;Excellence de l&apos;Organigramme
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Une organisation hiérarchique en 3 rangs garantissant la rigueur pédagogique et l&apos;innovation.
              </p>
            </div>

            <Link
              href="/institution"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-orange hover:gap-2 transition-all shrink-0"
            >
              Voir l&apos;organigramme complet <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-brand-blue hover:shadow-md transition-all space-y-4">
              <div className="h-12 w-12 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center font-bold text-lg font-heading">
                R1
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-orange bg-orange-100/60 px-2 py-0.5 rounded-md">
                  Rang 1 — Stratégie
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 mt-1">
                  Direction Générale & Présidence
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Supervisée par le Dr ABAGA ABESSOLO Michel Audrey. Pilotage stratégique, alliances institutionnelles et gouvernance globale de l&apos;Institut.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Dr ABAGA ABESSOLO M. A.</span>
                <span className="text-brand-orange font-bold">Fondateur & DG</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-brand-blue hover:shadow-md transition-all space-y-4">
              <div className="h-12 w-12 rounded-xl bg-blue-50 text-brand-blue flex items-center justify-center font-bold text-lg font-heading">
                R2
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue bg-blue-100/60 px-2 py-0.5 rounded-md">
                  Rang 2 — Académique
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 mt-1">
                  Pôle Formations & Conseil Scientifique
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Dirigé par la Direction des Études et le Conseil Académique. Conception des maquettes ECTS, accreditations et suivi pédagogique.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Prof. Jean-Marc ONDO</span>
                <span className="text-brand-blue font-bold">Dir. des Études</span>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs hover:border-brand-blue hover:shadow-md transition-all space-y-4">
              <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-lg font-heading">
                R3
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100/60 px-2 py-0.5 rounded-md">
                  Rang 3 — Opérationnel
                </span>
                <h3 className="font-heading text-base sm:text-lg font-bold text-slate-900 mt-1">
                  Pôle Services & Plateaux TP
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Chefs de projets Cybersécurité (SOC), IA, Monétique PCI-DSS et responsable de la mise à disposition des laboratoires pour les lycées.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-700">
                <span className="font-semibold text-slate-900">Chefs de Pôles TP & SOC</span>
                <span className="text-emerald-700 font-bold">3 Experts Pôles</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 8. SECTION LES 3 FORMULAIRES EN LIGNE */}
      <HomeFormsSection />

      {/* 9. Localisation & Accès Campus avec Google Maps Fonctionnel */}
      <section className="py-12 sm:py-16 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Campus & Emplacement
              </span>
              <h2 className="font-heading text-xl sm:text-3xl font-extrabold text-slate-900">
                Localisation Exacte du Campus
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Notre campus moderne est situé au Carrefour Moussavou à Angondje (Commune d&apos;Akanda, Gabon), à proximité des grands axes de transport.
              </p>

              <div className="space-y-3 pt-2 text-xs text-slate-700">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <MapPin className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Adresse Géographique :</strong>
                    <span>Angondje, Carrefour Moussavou, Akanda — Libreville, Gabon</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <Phone className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Téléphone & WhatsApp :</strong>
                    <span>+241 (0) 74 00 00 00 / +241 (0) 66 00 00 00</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200 shadow-2xs">
                  <Mail className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 font-bold">Contact Email :</strong>
                    <span>contact@digiset-gabon.com</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-slate-300 bg-white p-2 shadow-md overflow-hidden">
                <div className="relative w-full h-[280px] sm:h-[360px] rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                  <iframe
                    title="Localisation Google Maps DigiSET Institute"
                    src="https://maps.google.com/maps?q=Angondje,+Carrefour+Moussavou,+Akanda,+Libreville,+Gabon&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
                <div className="p-3 text-center bg-slate-50 flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 truncate">📍 Angondje, Carrefour Moussavou, Akanda</span>
                  <a
                    href="https://maps.google.com/maps?q=Angondje,+Carrefour+Moussavou,+Akanda,+Libreville,+Gabon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-brand-blue hover:underline shrink-0"
                  >
                    GPS →
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
