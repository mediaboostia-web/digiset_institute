import Link from "next/link";
import { Wrench, Phone, Mail } from "lucide-react";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-brand-blue-dark text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md space-y-6">
        <div className="h-16 w-16 rounded-2xl bg-brand-orange text-white flex items-center justify-center mx-auto shadow-lg">
          <Wrench className="h-8 w-8" />
        </div>

        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">
          Plateforme en Maintenance Programée
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Le site web de Digi-SET Institute fait actuellement l&apos;objet d&apos;une mise à jour technique. Nos services restent joignables par téléphone et email.
        </p>

        <div className="pt-4 space-y-2 text-xs text-slate-300 border-t border-white/10">
          <div className="flex items-center justify-center gap-2">
            <Phone className="h-4 w-4 text-brand-orange" />
            <span>+241 (0) 74 00 00 00 / +241 (0) 66 00 00 00</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <Mail className="h-4 w-4 text-brand-orange" />
            <span>contact@digiset-gabon.com</span>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-5 py-2.5 text-xs font-bold text-white hover:bg-white/20 transition-colors"
          >
            Rafraîchir la page
          </Link>
        </div>
      </div>
    </div>
  );
}
