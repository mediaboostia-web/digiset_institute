import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { FounderSection } from "@/components/shared/founder-section";
import { Globe, Mail, Phone, ShieldCheck, Award, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Institution & Stratégie — Organigramme et Partenaires",
  description:
    "Découvrez l'histoire, la gouvernance en 3 rangs hiérarchiques, l'organigramme de Digi-SET Institute et nos partenaires institutionnels et technologiques au Gabon.",
};

interface TeamMember {
  name: string;
  role: string;
  department: string;
  image: string;
  linkedin?: string;
  email?: string;
  phone?: string;
}

function TeamMemberCard({ member }: { member: TeamMember }) {
  return (
    <div className="group relative rounded-2xl border border-slate-200 bg-white p-5 shadow-xs hover:border-2 hover:border-brand-blue hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Photo avec cadre soigné */}
        <div className="relative h-48 w-full rounded-xl overflow-hidden bg-slate-100 mb-4 border border-slate-200">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 300px"
          />
          <div className="absolute top-2.5 right-2.5 bg-brand-blue/90 backdrop-blur-xs text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
            {member.department}
          </div>
        </div>

        {/* Identité & Poste */}
        <h4 className="font-heading text-base font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
          {member.name}
        </h4>
        <p className="text-xs font-semibold text-brand-orange mt-0.5">
          {member.role}
        </p>
      </div>

      {/* Réseaux sociaux & Contact */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-brand-blue hover:text-white transition-colors"
              aria-label={`LinkedIn de ${member.name}`}
            >
              <Globe className="h-3.5 w-3.5" />
            </a>
          )}
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-brand-blue hover:text-white transition-colors"
              aria-label={`Email de ${member.name}`}
            >
              <Mail className="h-3.5 w-3.5" />
            </a>
          )}
          {member.phone && (
            <a
              href={`tel:${member.phone}`}
              className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-brand-blue hover:text-white transition-colors"
              aria-label={`Téléphone de ${member.name}`}
            >
              <Phone className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
        <span className="text-[10px] text-slate-400 font-medium">Digi-SET Campus</span>
      </div>
    </div>
  );
}

export default function InstitutionPage() {
  // Rang 1 : Direction Générale
  const RANG_1: TeamMember[] = [
    {
      name: "Dr ABAGA ABESSOLO Michel Audrey",
      role: "Fondateur & Directeur Général",
      department: "Direction Générale",
      image: "/images/fondateur/Dr ABAGA ABESSOLO Michel Audrey.jpg",
      linkedin: "https://linkedin.com",
      email: "direction@digiset-gabon.com",
      phone: "+24174000000",
    },
  ];

  // Rang 2 : Pôles Formations & Académique
  const RANG_2: TeamMember[] = [
    {
      name: "Prof. Jean-Marc ONDO",
      role: "Directeur des Études & Maquettes ECTS",
      department: "Pôle Pédagogie & Recherche",
      image: "/images/img/Image6.jpg",
      linkedin: "https://linkedin.com",
      email: "etudes@digiset-gabon.com",
    },
    {
      name: "Dr. Sylvie NGUEMA",
      role: "Présidente du Conseil Scientifique",
      department: "Conseil Académique",
      image: "/images/img/Image7.jpg",
      linkedin: "https://linkedin.com",
      email: "conseil@digiset-gabon.com",
    },
  ];

  // Rang 3 : Pôle Services, Partenariats & Plateaux TP
  const RANG_3: TeamMember[] = [
    {
      name: "Ing. Patrick ELLA",
      role: "Chef du Pôle Cybersécurité & Labos SOC",
      department: "Pôle Cybersécurité",
      image: "/images/img/Image_4.jpg",
      linkedin: "https://linkedin.com",
      email: "cyber@digiset-gabon.com",
    },
    {
      name: "Dr. Marc MBOUMBA",
      role: "Chef du Pôle IA & Data Science",
      department: "Pôle IA & Data",
      image: "/images/img/Img_2.jpg",
      linkedin: "https://linkedin.com",
      email: "ia@digiset-gabon.com",
    },
    {
      name: "Mme Carine BEKALE",
      role: "Responsable Pôle Monétique & Paiements",
      department: "Pôle Monétique PCI-DSS",
      image: "/images/img/Image_3.jpg",
      linkedin: "https://linkedin.com",
      email: "monetique@digiset-gabon.com",
    },
  ];

  // Partenaires avec vrais visuels de logos dans "certifications" / "img" / "brand"
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
        subtitle="Découvrez la structure organisationnelle de Digi-SET Institute, son équipe dirigeante en 3 rangs hiérarchiques et ses alliances technologiques internationales."
        breadcrumbs={[{ label: "Institution & Stratégie" }]}
      />

      {/* Le Mot du Fondateur & Directeur Général */}
      <FounderSection />

      {/* ORGANIGRAMME HIÉRARCHIQUE EN 3 RANGS */}
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
              Présentation visuelle de l&apos;équipe dirigeante, des responsables de pôles de formation et des plateaux techniques.
            </p>
          </div>

          {/* RANG 1 : Direction Générale */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="h-3 w-3 rounded-full bg-brand-orange" />
              <h3 className="font-heading text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Rang 1 — Direction Générale & Présidence
              </h3>
            </div>
            <div className="flex justify-center">
              <div className="w-full max-w-sm">
                <TeamMemberCard member={RANG_1[0]} />
              </div>
            </div>
          </div>

          {/* RANG 2 : Pôles Formations & Académique */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="h-3 w-3 rounded-full bg-brand-blue" />
              <h3 className="font-heading text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Rang 2 — Pôles Formations & Direction Académique
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {RANG_2.map((m, i) => (
                <TeamMemberCard key={i} member={m} />
              ))}
            </div>
          </div>

          {/* RANG 3 : Pôle Services, Partenariats & Plateaux TP */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
              <span className="h-3 w-3 rounded-full bg-emerald-600" />
              <h3 className="font-heading text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Rang 3 — Pôle Services, Partenariats & Plateaux Techniques TP
              </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {RANG_3.map((m, i) => (
                <TeamMemberCard key={i} member={m} />
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* STRATÉGIE & PARTENAIRES INSTITUTIONNELS ET TECHNOLOGIQUES */}
      <section id="strategie" className="py-16 bg-slate-50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-orange">
              Stratégie & Partenariats
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">
              Partenaires Institutionnels & Technologiques
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              Nos alliances avec les éditeurs mondiaux et organismes officiels garantissent la qualité et la certification de nos diplômes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
