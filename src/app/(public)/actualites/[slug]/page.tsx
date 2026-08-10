import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/shared/hero-section";
import { ShareButtons } from "@/components/shared/share-buttons";
import { Calendar, ArrowLeft } from "lucide-react";

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const articleTitle = "Lancement Officiel des Inscriptions pour la Rentrée de Septembre 2026";

  return (
    <div>
      <HeroSection
        badge="Actualité Institutionnelle"
        title={articleTitle}
        subtitle="DigiSET Institute ouvre officiellement ses admissions pour sa première promotion à Akanda."
        breadcrumbs={[
          { label: "Actualités", href: "/actualites" },
          { label: slug },
        ]}
      />

      <section className="py-12 bg-white border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 text-xs text-slate-500 gap-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-orange" />
              <span>Publié le 15 Juillet 2026 • Par la Direction de la Scolarité</span>
            </div>
            <Link href="/actualites" className="inline-flex items-center gap-1 font-bold text-brand-blue hover:underline">
              <ArrowLeft className="h-3.5 w-3.5" />
              Retour aux actualités
            </Link>
          </div>

          {/* Boutons de Partage Réseaux */}
          <ShareButtons title={articleTitle} />

          {/* Image de couverture */}
          <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100">
            <Image
              src="/images/img/Image_3.jpg"
              alt="Lancement officiel Inscriptions DigiSET Institute"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="prose prose-slate text-sm leading-relaxed space-y-4 text-slate-700">
            <p className="font-semibold text-base text-slate-900">
              DigiSET Institute (Digital Science, Engineering and Technology Institute) est fier d&apos;annoncer l&apos;ouverture officielle de la campagne de recrutement pour la rentrée académique de Septembre 2026 sur son campus principal d&apos;Akanda.
            </p>
            <p>
              Implanté au Carrefour Moussavou à Angondje, l&apos;établissement met à disposition des étudiants gabonais et de la sous-région des infrastructures pédagogiques de dernier cri : laboratoires de travaux pratiques scientifiques équipés en physique, optique, électronique et cybersécurité, ainsi que des salles informatiques connectées à haut débit.
            </p>
            <h3 className="font-heading text-lg font-bold text-slate-900 pt-2">
              Les Programmes Ouverts à l&apos;Admission
            </h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Classe Préparatoire MP2I (Bac à Bac+2)</strong> : Cursus scientifique de 2 ans préparant aux grands concours et licences pro.</li>
              <li><strong>Licence Professionnelle (Bac+3 - 1 an)</strong> : 3 options à haute employabilité (IA & Data Science, Cybersécurité, Systèmes de Paiement Électronique).</li>
              <li><strong>DigiSET Online</strong> : Déclinaison à distance de nos programmes certifiants.</li>
            </ul>
            <p>
              Les candidats peuvent dès à présent déposer leur dossier en ligne ou prendre rendez-vous avec un conseiller d&apos;orientation sur le campus.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              href="/inscription/candidature"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-brand-orange-dark transition-colors"
            >
              Déposer votre dossier d&apos;inscription
            </Link>

            <Link href="/actualites" className="text-xs font-bold text-slate-600 hover:text-brand-blue transition-colors">
              ← Voir tous les articles
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}
