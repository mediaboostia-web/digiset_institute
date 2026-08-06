"use client";

import { useState } from "react";
import Image from "next/image";

export function CertificationBanner() {
  const CERTIFICATIONS = [
    { name: "Cisco Networking", logo: "/images/certifications/Logo Cisco.png", desc: "CCNA & CyberOps" },
    { name: "Microsoft Certified", logo: "/images/certifications/microsoft_certificat_logo.png", desc: "Azure & AI Fundamentals" },
    { name: "AWS Academy", logo: "/images/certifications/AWS_certificat_logo.png", desc: "Cloud & Machine Learning" },
    { name: "Linux Professional", logo: "/images/certifications/Linux_certificat_logo.jpg", desc: "LPIC & RedHat Admin" },
    { name: "CompTIA Security+", logo: "/images/certifications/CompTIA Security+.png", desc: "Cybersécurité Internationale" },
    { name: "PCI-DSS / ISO 27001", logo: "/images/certifications/PCI-DSS_ISO 27001.png", desc: "Sécurité Monétique & SI" },
  ];

  // Tripler le tableau pour garantir un défilement infini ultra-fluide sans à-coup ni rebond
  const DOUBLE_CERTIFICATIONS = [...CERTIFICATIONS, ...CERTIFICATIONS, ...CERTIFICATIONS];
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="bg-slate-50 py-12 border-y border-border overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header de section */}
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Reconnaissance & Partenariats Métiers
          </span>
          <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-900 mt-2">
            Certifications Internationales Partenaires
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Défilement continu — Survolez une carte pour suspendre l&apos;animation.
          </p>
        </div>

        {/* Défilement infini continu ultra-fluide avec PAUSE au survol */}
        <div
          className="relative overflow-hidden py-2"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Gradients de dégradé latéral */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

          {/* Marquee fluide sans rebond */}
          <div
            className={`flex items-center gap-6 w-max ${
              isPaused ? "[animation-play-state:paused]" : ""
            }`}
            style={{
              animation: "marquee 28s linear infinite",
            }}
          >
            {DOUBLE_CERTIFICATIONS.map((cert, idx) => (
              <div
                key={idx}
                className="shrink-0 w-48 sm:w-56 rounded-xl bg-white border border-slate-200 p-5 text-center shadow-2xs hover:border-2 hover:border-brand-blue hover:ring-4 hover:ring-brand-blue/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group flex flex-col items-center justify-between cursor-pointer"
              >
                <div className="relative h-16 w-full flex items-center justify-center mb-3 p-2">
                  <Image
                    src={cert.logo}
                    alt={cert.name}
                    width={130}
                    height={55}
                    className="max-h-14 w-auto object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div>
                  <div className="font-heading text-xs font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                    {cert.name}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5 font-medium">
                    {cert.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CSS Keyframes inline pour la fluidité absolue sans rebond */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-33.333%);
            }
          }
        `}</style>

      </div>
    </section>
  );
}
