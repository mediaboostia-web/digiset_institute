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
    default: "DigiSET Institute — Établissement Supérieur Privé aux Métiers du Numérique (Gabon)",
    template: "%s | DigiSET Institute",
  },
  description:
    "DigiSET Institute (Akanda, Gabon) forme les futurs leaders en Intelligence Artificielle, Cybersécurité et Systèmes de Paiement Électronique (Monétique). Classe préparatoire MP2I (120 ECTS), Licence Professionnelle (60 ECTS), certifications Cisco, AWS, Microsoft, Linux et location de laboratoires TP haute technologie.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
      { url: "/brand/Digiset-institute Favicon.png", type: "image/png" },
      { url: "/brand/logo-digiset.png", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/brand/Digiset-institute Favicon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  keywords: [
    "DigiSET Institute",
    "Dr ABAGA ABESSOLO Michel Audrey",
    "École supérieure numérique Gabon",
    "Université privée informatique Libreville Akanda",
    "Formation IA et Data Science Gabon",
    "Licence Cybersécurité Akanda",
    "Systèmes de Paiement Électronique Monétique PCI-DSS",
    "Classe Préparatoire MP2I Gabon ECTS",
    "Certifications Cisco AWS Microsoft Linux CompTIA Gabon",
    "Location laboratoires TP physique chimie Gabon",
    "Formation continue entreprises Libreville",
  ],
  authors: [{ name: "DigiSET Institute", url: siteUrl }],
  creator: "DigiSET Institute",
  publisher: "DigiSET Institute",
  alternates: {
    canonical: siteUrl,
  },
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
    title: "DigiSET Institute — Établissement Supérieur Privé aux Métiers du Numérique",
    description:
      "Formations d'excellence en Intelligence Artificielle, Cybersécurité et Monétique à Akanda, Gabon. Découvrez nos diplômes Bac+2 et Bac+3 et nos laboratoires de TP haute technologie.",
    siteName: "DigiSET Institute",
    images: [
      {
        url: `${siteUrl}/images/img/Hero_image1.jpg`,
        width: 1200,
        height: 630,
        alt: "DigiSET Institute Campus Akanda Gabon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiSET Institute — L'Excellence Numérique au Gabon",
    description:
      "Classe Préparatoire MP2I, Licence Pro IA, Cybersécurité & Monétique à Akanda. Pratique 100% en laboratoire et certifications internationales.",
    images: [`${siteUrl}/images/img/Hero_image1.jpg`],
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
    name: "DigiSET Institute",
    alternateName: "Digital Science, Engineering and Technology Institute",
    url: siteUrl,
    logo: `${siteUrl}/brand/Digiset Logo officiel.png`,
    image: `${siteUrl}/images/img/Hero_image1.jpg`,
    description:
      "Établissement supérieur privé de formation aux métiers du numérique : IA & Data Science, Cybersécurité, Systèmes de Paiement Électronique et location de laboratoires de travaux pratiques.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Angondje, Carrefour Moussavou",
      addressLocality: "Akanda",
      addressRegion: "Estuaire",
      addressCountry: "GA",
    },
    founder: {
      "@type": "Person",
      name: "Dr ABAGA ABESSOLO Michel Audrey",
      jobTitle: "Fondateur & Directeur Général",
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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="icon" href="/brand/Digiset-institute Favicon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/brand/Digiset-institute Favicon.png" />
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
