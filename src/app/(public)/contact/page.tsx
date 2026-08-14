import type { Metadata } from "next";
import { HeroSection } from "@/components/shared/hero-section";
import { ContactForm } from "@/components/forms/contact-form";
import { FaqSection } from "@/components/shared/faq-section";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { mergeContentValues } from "@/lib/content-defaults";
import { getContentBlocks } from "@/lib/content-blocks";

export const metadata: Metadata = {
  title: "Contact & Accès Campus Akanda — Foire Aux Questions (FAQ)",
  description:
    "Contactez le secrétariat académique de DigiSET Institute à Akanda, Gabon. Formulaire de contact, numéros de téléphone, carte interactive Google Maps et FAQ.",
};

export default async function ContactPage() {
  const blocks = await getContentBlocks("contact");
  const content = mergeContentValues("contact", blocks);

  return (
    <div>
      <HeroSection
        badge={content.hero_badge}
        title={content.hero_title}
        subtitle={content.hero_subtitle}
        breadcrumbs={[{ label: "Contact" }]}
      />

      <section className="py-12 bg-slate-50 border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Colonne Gauche : Formulaire */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>

            {/* Colonne Droite : Coordonnées & Carte Google Maps Fonctionnelle */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-5 shadow-sm">
                <h3 className="font-heading text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                  Coordonnées du Campus
                </h3>

                <div className="space-y-4 text-xs text-slate-700">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-brand-orange shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold">Adresse Géographique :</strong>
                      <span>{content.coord_address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold">Téléphone & WhatsApp Scolarité :</strong>
                      <span>{content.coord_phone}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-brand-blue shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold">Email de Contact :</strong>
                      <span>{content.coord_email}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-slate-900 font-bold">Horaires d&apos;Ouverture Secrétariat :</strong>
                      {content.coord_hours.split("\n").map((line, idx) => (
                        <span key={idx} className="block">{line}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Carte Google Maps Fonctionnelle */}
              <div className="rounded-xl border border-slate-300 bg-white p-2 shadow-sm overflow-hidden space-y-2">
                <div className="relative w-full h-[260px] rounded-lg overflow-hidden border border-slate-200">
                  <iframe
                    title="Localisation Google Maps DigiSET Institute Contact"
                    src="https://maps.google.com/maps?q=Angondje,+Carrefour+Moussavou,+Akanda,+Libreville,+Gabon&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
                <div className="text-center pt-1">
                  <a
                    href="https://maps.app.goo.gl/UqxLEnz4v7BHb7be7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-brand-blue hover:underline inline-flex items-center gap-1"
                  >
                    📍 Ouvrir la carte dans Google Maps →
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION FAQ intégrée sur la page de contact */}
      <FaqSection
        title={content.faq_title}
        subtitle={content.faq_subtitle}
      />
    </div>
  );
}
