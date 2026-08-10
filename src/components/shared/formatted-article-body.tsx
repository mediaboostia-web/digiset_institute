import React from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface FormattedArticleBodyProps {
  content: string;
  className?: string;
}

/**
 * Composant de rendu d'article rédigé pour le SEO et le référencement.
 * Convertit automatiquement les structures Markdown/Rich text :
 * - Liens hypertextes SEO : [Texte du lien](https://url-ou-page)
 * - Mises en gras : **texte en gras**
 * - Titres H2 : ## Titre de section
 * - Titres H3 : ### Sous-titre
 * - Citations : > Citation
 * - Puces : - Point 1
 */
export function FormattedArticleBody({ content, className = "" }: FormattedArticleBodyProps) {
  if (!content) return null;

  const blocks = content.split(/\n\s*\n/);

  return (
    <div className={`prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed space-y-5 ${className}`}>
      {blocks.map((block, idx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Titre H2 : ## Titre
        if (trimmed.startsWith("## ")) {
          return (
            <h2 key={idx} className="font-heading text-xl font-bold text-slate-900 pt-4 pb-1 border-b border-slate-100 flex items-center gap-2">
              <span className="h-4 w-1 bg-brand-orange rounded-full inline-block" />
              {renderFormattedText(trimmed.replace(/^##\s+/, ""))}
            </h2>
          );
        }

        // Titre H3 : ### Titre
        if (trimmed.startsWith("### ")) {
          return (
            <h3 key={idx} className="font-heading text-lg font-bold text-slate-900 pt-3">
              {renderFormattedText(trimmed.replace(/^###\s+/, ""))}
            </h3>
          );
        }

        // Citation : > Texte
        if (trimmed.startsWith("> ")) {
          return (
            <blockquote key={idx} className="border-l-4 border-brand-orange bg-orange-50/60 p-4 rounded-r-xl italic text-slate-800 font-medium my-4 shadow-xs">
              {renderFormattedText(trimmed.replace(/^>\s+/, ""))}
            </blockquote>
          );
        }

        // Liste à puces : lignes commençant par - ou *
        const lines = trimmed.split("\n");
        if (lines.length > 0 && lines.every((l) => l.trim().startsWith("- ") || l.trim().startsWith("* "))) {
          return (
            <ul key={idx} className="list-disc pl-6 space-y-2 text-slate-700 my-3">
              {lines.map((line, itemIdx) => (
                <li key={itemIdx} className="leading-snug">
                  {renderFormattedText(line.trim().replace(/^[-*]\s+/, ""))}
                </li>
              ))}
            </ul>
          );
        }

        // Paragraphe classique
        return (
          <p key={idx} className="text-slate-700 leading-relaxed text-sm sm:text-base">
            {renderFormattedText(trimmed)}
          </p>
        );
      })}
    </div>
  );
}

/**
 * Analyse et formate le texte en ligne pour intercepter les liens [Texte](URL) et le gras **Texte**.
 */
function renderFormattedText(text: string) {
  const regex = /(\[.*?\]\(.*?\)|\*\*.*?\*\*)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    // Interception des Liens [Texte](URL)
    const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
    if (linkMatch) {
      const linkText = linkMatch[1];
      const url = linkMatch[2];
      const isExternal = url.startsWith("http://") || url.startsWith("https://");

      if (isExternal) {
        return (
          <a
            key={index}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-bold text-brand-blue underline decoration-brand-blue/30 underline-offset-4 hover:text-brand-orange hover:decoration-brand-orange transition-all"
          >
            {linkText}
            <ExternalLink className="h-3 w-3 inline text-brand-orange" />
          </a>
        );
      }

      return (
        <Link
          key={index}
          href={url}
          className="font-bold text-brand-blue underline decoration-brand-blue/40 underline-offset-4 hover:text-brand-orange hover:decoration-brand-orange transition-all"
        >
          {linkText}
        </Link>
      );
    }

    // Interception du Gras **Texte**
    const boldMatch = part.match(/^\*\*(.*?)\*\*$/);
    if (boldMatch) {
      return (
        <strong key={index} className="font-bold text-slate-900">
          {boldMatch[1]}
        </strong>
      );
    }

    return part;
  });
}
