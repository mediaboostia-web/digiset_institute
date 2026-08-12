"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { HeroSection } from "@/components/shared/hero-section";
import { FounderSection } from "@/components/shared/founder-section";
import { Globe, Mail, Phone, Loader2, UserCheck } from "lucide-react";

interface TeamMember {
  id?: string;
  full_name: string;
  role_title: string;
  pole?: string;
  photo_url?: string;
  bio?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  facebook_url?: string;
  sort_order?: number;
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  const photo = member.photo_url || "/brand/fondateur.png";

  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-2 hover:border-brand-blue hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full">
      <div>
        {/* Photo avec cadre soigné */}
        <div className="relative h-52 w-full rounded-xl overflow-hidden bg-slate-100 mb-4 border border-slate-200">
          <img
            src={photo}
            alt={member.full_name}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {member.pole && (
            <div className="absolute top-2.5 right-2.5 bg-brand-blue/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
              {member.pole}
            </div>
          )}
        </div>

        {/* Identité & Poste */}
        <h4 className="font-heading text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
          {member.full_name}
        </h4>
        <p className="text-xs font-semibold text-brand-orange mt-0.5">
          {member.role_title}
        </p>

        {member.bio && (
          <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
            {member.bio}
          </p>
        )}
      </div>

      {/* Réseaux sociaux & Contact */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {member.linkedin_url && (
            <a
              href={member.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition-colors"
              title={`Profil LinkedIn de ${member.full_name}`}
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
          )}
          {member.facebook_url && (
            <a
              href={member.facebook_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
              title={`Profil Facebook de ${member.full_name}`}
            >
              <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="p-1.5 rounded-lg bg-orange-50 text-brand-orange hover:bg-brand-orange hover:text-white transition-colors flex items-center gap-1 text-[11px] font-bold"
              title={`Envoyer un email à ${member.full_name}`}
            >
              <Mail className="h-3.5 w-3.5" />
              <span className="truncate max-w-[130px]">{member.email}</span>
            </a>
          )}
        </div>
        <span className="text-[10px] text-slate-400 font-medium">DigiSET Campus</span>
      </div>
    </div>
  );
}

export default function InstitutionPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch("/api/team");
        const json = await res.json();
        if (json.ok && Array.isArray(json.data)) {
          setTeamMembers(json.data);
        }
      } catch (err) {
        console.error("Erreur chargement organigramme public:", err);
      } finally {
        setIsLoading(false);
      }
    }
    loadTeam();
  }, []);

  // Classification sans AUCUNE duplication de membres
  const rang1 = teamMembers.filter(
    (m) =>
      m.pole === "Direction Générale" ||
      m.role_title.toLowerCase().includes("fondateur") ||
      m.role_title.toLowerCase().includes("directeur général")
  );

  const rang2 = teamMembers.filter(
    (m) =>
      !rang1.some((r1) => r1.id === m.id) &&
      (m.pole === "Direction Académique" ||
        m.pole === "Pôles de Formation" ||
        m.role_title.toLowerCase().includes("directeur des études") ||
        m.role_title.toLowerCase().includes("conseil"))
  );

  const rang3 = teamMembers.filter(
    (m) => !rang1.some((r1) => r1.id === m.id) && !rang2.some((r2) => r2.id === m.id)
  );

  // Partenaires
  const PARTENAIRES_OFFICIELS = [
    {
      name: "Cisco Networking Academy",
      logo: "/images/certifications/Logo Cisco.png",
      category: "Certification & Réseaux",
    },
    {
      name: "Microsoft Certified",
      logo: "/images/certifications/microsoft_certificat_logo.png",
      category: "Cloud & Intelligence Artificielle",
    },
    {
      name: "AWS Academy",
      logo: "/images/certifications/AWS_certificat_logo.png",
      category: "Cloud & Machine Learning",
    },
    {
      name: "Linux Professional Institute",
      logo: "/images/certifications/Linux_certificat_logo.jpg",
      category: "Systèmes & Administration Linux",
    },
    {
      name: "CompTIA Security+",
      logo: "/images/certifications/CompTIA Security+.png",
      category: "Sécurité & Defense Informatique",
    },
    {
      name: "PCI-DSS / Monétique",
      logo: "/images/certifications/PCI-DSS_ISO 27001.png",
      category: "Sécurité Monétique & Banque",
    },
  ];

  return (
    <div>
      <HeroSection
        badge="Stratégie & Institution"
        title="Institution, Gouvernance & Partenaires"
        subtitle="Découvrez la structure organisationnelle de DigiSET Institute, son équipe dirigeante en 3 rangs hiérarchiques et ses alliances technologiques internationales."
        breadcrumbs={[{ label: "Institution & Stratégie" }]}
      />

      {/* Le Mot du Fondateur & Directeur Général */}
      <FounderSection />

      {/* ORGANIGRAMME HIÉRARCHIQUE EN 3 RANGS DYNAMIQUE */}
      <section className="py-16 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
              Gouvernance & Équipe Dirigeante
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Organigramme Structuré en 3 Rangs Hiérarchiques
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Présentation en temps réel de l&apos;équipe dirigeante, des responsables de pôles de formation et des plateaux techniques.
            </p>
          </div>

          {isLoading ? (
            <div className="py-16 text-center space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-brand-blue mx-auto" />
              <p className="text-xs font-semibold text-slate-500">Chargement de l&apos;organigramme en direct...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <UserCheck className="h-10 w-10 text-slate-300 mx-auto" />
              <p className="text-sm font-bold text-slate-700">Aucun membre dans l&apos;organigramme pour le moment.</p>
              <p className="text-xs text-slate-500">Ajoutez des membres depuis l&apos;Espace d&apos;Administration / Organigramme.</p>
            </div>
          ) : (
            <>
              {/* RANG 1 : Direction Générale */}
              {rang1.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span className="h-3 w-3 rounded-full bg-brand-orange" />
                    <h3 className="font-heading text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                      Rang 1 — Direction Générale & Présidence
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {rang1.map((m) => (
                      <TeamMemberCard key={m.id} member={m} />
                    ))}
                  </div>
                </div>
              )}

              {/* RANG 2 : Pôles Formations & Académique */}
              {rang2.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span className="h-3 w-3 rounded-full bg-brand-blue" />
                    <h3 className="font-heading text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                      Rang 2 — Pôles Formations & Direction Académique
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {rang2.map((m) => (
                      <TeamMemberCard key={m.id} member={m} />
                    ))}
                  </div>
                </div>
              )}

              {/* RANG 3 : Pôle Services, Partenariats & Plateaux TP */}
              {rang3.length > 0 && (
                <div className="space-y-4 pt-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <span className="h-3 w-3 rounded-full bg-emerald-600" />
                    <h3 className="font-heading text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                      Rang 3 — Pôle Services, Partenariats & Plateaux Techniques TP
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {rang3.map((m) => (
                      <TeamMemberCard key={m.id} member={m} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </section>

      {/* STRATÉGIE & PARTENAIRES INSTITUTIONNELS ET TECHNOLOGIQUES */}
      <section id="strategie" className="py-16 bg-slate-50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange bg-orange-50 px-3 py-1 rounded-full border border-orange-100">
              Certifications & Partenariats
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Partenaires Technologiques Officiels
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Nos cursus académiques préparent directement aux diplômes certifiants reconnus par les géants mondiaux du secteur.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {PARTENAIRES_OFFICIELS.map((partner, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-2xs hover:border-brand-blue hover:shadow-md transition-all flex flex-col justify-between items-center text-center group"
              >
                <div className="relative h-20 w-full flex items-center justify-center mb-4 p-2">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={140}
                    height={60}
                    className="max-h-16 w-auto object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <div>
                  <h4 className="font-heading text-sm font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                    {partner.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {partner.category}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 w-full text-[11px] text-slate-500 font-medium">
                  Partenaire Certifiant Officiel
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
