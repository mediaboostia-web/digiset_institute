import Link from "next/link";
import { HeroSection } from "@/components/shared/hero-section";
import { Monitor, CheckCircle2, ArrowRight, Video, FileCheck, Clock } from "lucide-react";

export default function DigisetOnlinePage() {
  return (
    <div>
      <HeroSection
        badge="Formation à Distance"
        title="DigiSET Online"
        subtitle="Suivez nos cursus d'excellence en ligne avec le même niveau d'exigence pédagogique, un accompagnement personnalisé et des diplômes équivalents au présentiel."
        breadcrumbs={[
          { label: "Programmes", href: "/programmes" },
          { label: "DigiSET Online" },
        ]}
        primaryCtaText="Rejoindre DigiSET Online"
        primaryCtaHref="/inscription/candidature?program=digiset-online"
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <h2 className="font-heading text-2xl font-extrabold text-slate-900">
              La Flexibilité de l&apos;Apprentissage à Distance, la Rigueur de DigiSET
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              DigiSET Online a été conçu pour permettre aux professionnels en activité, aux étudiants résidant en province ou à l&apos;étranger de se former aux métiers du numérique sans interrompre leur carrière ou déménager.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <Video className="h-8 w-8 text-brand-blue" />
              <h3 className="font-heading text-base font-bold text-slate-900">Classes Virtuelles Interactives</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Cours en direct avec les enseignants et accès illimité aux replays en haute définition.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <Clock className="h-8 w-8 text-brand-orange" />
              <h3 className="font-heading text-base font-bold text-slate-900">Emploi du Temps Adaptable</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Avancez à votre rythme grâce aux travaux dirigés synchrones et asynchrones.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <FileCheck className="h-8 w-8 text-emerald-600" />
              <h3 className="font-heading text-base font-bold text-slate-900">Diplôme & Certificat Équivalent</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Examens contrôlés et diplôme final rigoureusement identique à la formation sur campus.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-brand-blue-dark text-white p-8 text-center space-y-4">
            <h3 className="font-heading text-xl font-bold">Inscrivez-vous à DigiSET Online</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
              Déposez votre candidature en ligne et commencez votre formation à distance dès la rentrée.
            </p>
            <div className="pt-2">
              <Link
                href="/inscription/candidature?program=digiset-online"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-brand-orange-dark transition-colors"
              >
                Postuler en ligne
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
