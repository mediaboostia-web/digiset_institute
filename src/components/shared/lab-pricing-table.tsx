import Link from "next/link";
import { Check, ArrowRight, FlaskConical, Users, ShieldCheck } from "lucide-react";

export function LabPricingTable() {
  return (
    <div className="space-y-8">
      {/* Informations Clés */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-100">
          <div className="h-10 w-10 rounded-lg bg-brand-blue text-white flex items-center justify-center shrink-0">
            <FlaskConical className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-brand-blue uppercase tracking-wider">Catalogue</div>
            <div className="text-sm font-bold text-slate-900">+30 Manipulations TP</div>
            <div className="text-xs text-slate-600">Physique, Optique, Électricité, Mécanique</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-indigo-50 border border-indigo-100">
          <div className="h-10 w-10 rounded-lg bg-indigo-600 text-white flex items-center justify-center shrink-0">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-indigo-600 uppercase tracking-wider">Capacité</div>
            <div className="text-sm font-bold text-slate-900">20 Étudiants Max</div>
            <div className="text-xs text-slate-600">Encadrement personnalisé & sécurité TP</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-100">
          <div className="h-10 w-10 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Équipement</div>
            <div className="text-sm font-bold text-slate-900">Plateau de Pointe</div>
            <div className="text-xs text-slate-600">Matériel conforme programmes CPGE</div>
          </div>
        </div>
      </div>

      {/* Grille Tarifaire */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        
        {/* Offre 1 : Forfait 5 Manipulations */}
        <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-blue transition-all">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-blue">
              Forfait Découverte & Pratique
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mt-1">
              5 Manipulations de TP
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Idéal pour cibler les travaux pratiques clés du semestre.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-3xl font-extrabold text-brand-blue-dark">
                  500 000 FCFA
                </span>
                <span className="text-xs font-semibold text-slate-500">/ forfait</span>
              </div>
              <div className="text-xs text-emerald-600 font-medium mt-1">
                Soit 100 000 FCFA par manipulation
              </div>
            </div>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Choix parmi 30+ manipulations du programme prépa</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Accès complet aux paillasses et instruments de mesure</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Groupe de 20 étudiants maximum par session</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Fiches d&apos;instructions et consommables inclus</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/services/location-laboratoires/demande"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-blue transition-colors"
            >
              Réserver ce forfait
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Offre 2 : Forfait 10 Manipulations (Populaire) */}
        <div className="flex flex-col justify-between rounded-xl border-2 border-brand-orange bg-white p-6 shadow-md relative">
          <div className="absolute -top-3 right-6 bg-brand-orange text-white text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
            Meilleur Rapport Qualité / Prix
          </div>

          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-brand-orange">
              Forfait Annuel Intégral
            </div>
            <h3 className="font-heading text-xl font-bold text-slate-900 mt-1">
              10 Manipulations de TP
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Couverture complète des besoins TP de l&apos;année académique.
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100">
              <div className="flex items-baseline gap-1">
                <span className="font-heading text-3xl font-extrabold text-brand-blue-dark">
                  800 000 FCFA
                </span>
                <span className="text-xs font-semibold text-slate-500">/ forfait</span>
              </div>
              <div className="text-xs text-brand-orange font-bold mt-1">
                Soit 80 000 FCFA par manipulation (20% de réduction)
              </div>
            </div>

            <ul className="mt-6 space-y-2.5 text-xs text-slate-700">
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                <span><strong>10 TP complets</strong> pour votre classe préparatoire</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                <span>Priorité sur le calendrier et les créneaux d&apos;occupation</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                <span>Assistance technique et consommables spécialisés inclus</span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="h-4 w-4 text-brand-orange shrink-0 mt-0.5" />
                <span>Convention de partenariat annuelle pour l&apos;établissement</span>
              </li>
            </ul>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <Link
              href="/services/location-laboratoires/demande"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-4 py-2.5 text-xs font-bold text-white hover:bg-brand-orange-dark shadow-sm transition-colors"
            >
              Demander une convention 10 TP
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
