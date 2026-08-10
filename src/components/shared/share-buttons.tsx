"use client";

import { useState } from "react";
import { Share2, Check, Link2, MessageCircle } from "lucide-react";

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const currentUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "";
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className="flex flex-wrap items-center gap-2 py-2 border-y border-slate-100 my-4">
      <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 mr-1">
        <Share2 className="h-4 w-4 text-brand-orange" />
        Partager :
      </span>

      {/* WhatsApp */}
      <a
        href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${currentUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Partager sur WhatsApp"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 shadow-xs transition-all cursor-pointer"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        <span>WhatsApp</span>
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Partager sur Facebook"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2] text-white text-xs font-bold hover:bg-blue-700 shadow-xs transition-all cursor-pointer"
      >
        <span>Facebook</span>
      </a>

      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Partager sur LinkedIn"
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0A66C2] text-white text-xs font-bold hover:bg-blue-800 shadow-xs transition-all cursor-pointer"
      >
        <span>LinkedIn</span>
      </a>

      {/* Copier le lien */}
      <button
        onClick={handleCopyLink}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
          copied
            ? "bg-emerald-50 border-emerald-300 text-emerald-700"
            : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"
        }`}
      >
        {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Link2 className="h-3.5 w-3.5" />}
        <span>{copied ? "Lien copié dans le presse-papier !" : "Copier le lien"}</span>
      </button>
    </div>
  );
}
