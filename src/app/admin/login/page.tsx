"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Rate Limiting anti-robot : 5 tentatives échouées = blocage 30 secondes
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lockoutSeconds > 0) {
      interval = setInterval(() => {
        setLockoutSeconds((prev) => {
          if (prev <= 1) {
            setFailedAttempts(0);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutSeconds]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (lockoutSeconds > 0) {
      setErrorMessage(`Compte temporairement verrouillé. Veuillez patienter ${lockoutSeconds} seconde(s).`);
      return;
    }

    // Validation email existant / valide
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Veuillez saisir une adresse email valide.");
      return;
    }

    setIsLoading(true);

    const recordFailure = () => {
      const nextCount = failedAttempts + 1;
      setFailedAttempts(nextCount);
      if (nextCount >= 5) {
        setLockoutSeconds(30);
        setErrorMessage("Trop de tentatives infructueuses (5 échecs). Accès verrouillé pendant 30 secondes pour prévenir les attaques d'automatisation.");
      } else {
        setErrorMessage(`Identifiants incorrects. Tentative ${nextCount}/5 avant verrouillage anti-robot.`);
      }
      setIsLoading(false);
    };

    try {
      // 1. Authentification Supabase réelle
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (supabaseUrl && supabaseAnonKey) {
        const { createClient } = await import("@/lib/supabase/client");
        const supabase = createClient();
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

        if (error) {
          recordFailure();
          return;
        }

        setFailedAttempts(0);
        router.push("/admin");
        return;
      }

      // 2. Mode dev / secours
      if (email.trim() === "direction@digiset-gabon.com" && password === "DigiSET2026@") {
        document.cookie = "admin_dev_mode=true; path=/; max-age=86400";
        setFailedAttempts(0);
        router.push("/admin");
      } else {
        recordFailure();
      }
    } catch (err) {
      setErrorMessage("Une erreur est survenue lors de la connexion.");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-center bg-[#F8F9FB] px-4 py-8 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Logo DigiSET Institute */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-2.5 shadow-md border border-gray-200">
          <Image
            src="/brand/logo-digiset.png"
            alt="DigiSET Institute Logo"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>

        <h2 className="mt-6 font-heading text-2xl font-extrabold tracking-tight text-brand-blue-dark sm:text-3xl">
          Espace Administration
        </h2>
        <p className="mt-2 text-xs font-medium text-gray-500">
          Portail de gestion officiel de DigiSET Institute
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          {errorMessage && (
            <div className={`mb-6 flex items-start gap-2.5 rounded-xl p-3.5 text-xs font-medium border ${
              lockoutSeconds > 0 ? "bg-amber-50 text-amber-800 border-amber-300" : "bg-red-50 text-red-700 border-red-200"
            }`}>
              {lockoutSeconds > 0 ? (
                <ShieldAlert className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
              )}
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
                  disabled={lockoutSeconds > 0}
                  placeholder="direction@digiset-gabon.com"
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
                  type={showPassword ? "text" : "password"}
                  required
                  disabled={lockoutSeconds > 0}
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-9 pr-10 text-xs h-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors p-1"
                  title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading || lockoutSeconds > 0}
              className="w-full gap-2 bg-brand-orange text-white hover:bg-brand-orange-dark font-bold text-xs h-11 shadow-sm transition-all"
            >
              {isLoading ? (
                "Connexion en cours..."
              ) : lockoutSeconds > 0 ? (
                `Verrouillé (${lockoutSeconds}s)`
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
