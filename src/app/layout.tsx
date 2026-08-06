import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const sora = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://digiset-gabon.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Digi-SET Institute — Établissement Supérieur Privé aux Métiers du Numérique",
    template: "%s | Digi-SET Institute",
  },
  description:
    "Digi-SET Institute (Akanda, Gabon) forme les futurs experts en Intelligence Artificielle, Cybersécurité et Systèmes de Paiement Électronique. Classe préparatoire MP2I, Licence Professionnelle, certifications Cisco, AWS, Microsoft et location de laboratoires de TP.",
  icons: {
    icon: [
      { url: "/brand/logo-digiset.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: ["/brand/logo-digiset.png"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  keywords: [
    "Digi-SET Institute",
    "École supérieure numérique Gabon",
    "Formation IA et Data Science Libreville",
    "Licence Cybersécurité Akanda",
    "Systèmes de Paiement Électronique Monétique",
    "Classe Préparatoire MP2I Gabon",
    "Certifications Cisco AWS Microsoft Linux Gabon",
    "Location laboratoires TP physique Libreville",
  ],
  authors: [{ name: "Digi-SET Institute", url: siteUrl }],
  creator: "Digi-SET Institute",
  publisher: "Digi-SET Institute",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_GA",
    url: siteUrl,
    title: "Digi-SET Institute — Établissement Supérieur Privé du Numérique au Gabon",
    description:
      "Formations d'excellence en Intelligence Artificielle, Cybersécurité et Monétique à Akanda, Gabon. Découvrez nos diplômes Bac+2 et Bac+3 et nos laboratoires de TP de pointe.",
    siteName: "Digi-SET Institute",
    images: [
      {
        url: `${siteUrl}/images/img/Image_1.jpg`,
        width: 1200,
        height: 630,
        alt: "Digi-SET Institute Campus Akanda",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digi-SET Institute — L'Excellence Numérique au Gabon",
    description:
      "Classe Préparatoire MP2I, Licence Pro IA, Cybersécurité & Monétique à Akanda. Pratique 100% en laboratoire et certifications internationales.",
    images: [`${siteUrl}/images/img/Image_1.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Digi-SET Institute",
    alternateName: "Digital Science, Engineering and Technology Institute",
    url: siteUrl,
    logo: `${siteUrl}/brand/logo-digiset.png`,
    image: `${siteUrl}/images/img/Image_1.jpg`,
    description:
      "Établissement supérieur privé de formation aux métiers du numérique : IA & Data Science, Cybersécurité, Systèmes de Paiement Électronique et location de laboratoires de travaux pratiques.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Angondje, Carrefour Moussavou",
      addressLocality: "Akanda",
      addressRegion: "Estuaire",
      addressCountry: "GA",
    },
    telephone: "+24174000000",
    email: "contact@digiset-gabon.com",
    sameAs: [
      "https://facebook.com",
      "https://linkedin.com",
    ],
  };

  return (
    <html
      lang="fr"
      className={`${sora.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
