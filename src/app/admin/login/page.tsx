"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    // Simulation de validation de connexion
    setTimeout(() => {
      if (email && password) {
        // Enregistrer le cookie dev/mock pour franchir le proxy Next.js
        document.cookie = "admin_dev_mode=true; path=/; max-age=86400";
        router.push("/admin");
      } else {
        setErrorMessage("Veuillez saisir votre adresse email et mot de passe.");
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-center bg-[#F8F9FB] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo Digi-SET Institute */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2.5 shadow-md border border-gray-200">
          <Image
            src="/brand/logo-digiset.png"
            alt="Digi-SET Institute Logo"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>

        <h2 className="mt-6 font-heading text-2xl font-extrabold tracking-tight text-brand-blue-dark sm:text-3xl">
          Espace Administration
        </h2>
        <p className="mt-2 text-xs font-medium text-gray-500">
          Portail de gestion officiel de Digi-SET Institute
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {errorMessage && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5 text-xs">
            <div className="space-y-1.5">
              <label htmlFor="email" className="font-bold text-gray-700">
                Adresse email d'administration
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  required
                  placeholder="admin@digiset-gabon.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-9 text-xs h-10"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="font-bold text-gray-700">
                  Mot de passe
                </label>
                <button
                  type="button"
                  onClick={() => alert("Un email de réinitialisation vous sera envoyé.")}
                  className="text-[11px] font-semibold text-brand-blue hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 text-xs h-10"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold text-xs h-11 shadow-sm transition-all"
            >
              {isLoading ? (
                "Connexion en cours..."
              ) : (
                <>
                  Se connecter au tableau de bord <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-400">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Accès sécurisé réservé au personnel autorisé</span>
          </div>
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          <Link href="/" className="hover:text-gray-600 transition-colors font-medium">
            ← Retourner sur le site public
          </Link>
        </div>
      </div>
    </div>
  );
}
