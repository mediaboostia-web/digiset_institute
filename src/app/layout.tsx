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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.digiset-gabon.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "DigiSET Institute — Établissement Supérieur Privé aux Métiers du Numérique (Akanda, Gabon)",
    template: "%s | DigiSET Institute",
  },
  description:
    "DigiSET Institute (Akanda, Libreville - Gabon) est l'établissement supérieur privé de référence dédié aux métiers du numérique. Formations d'excellence Bac+2 et Bac+3 : Classe Préparatoire Scientifique MP2I, Licence Pro IA & Data Science, Cybersécurité et Systèmes de Paiement Électronique (Monétique). Laboratoires TP haute technologie, certifications internationales (Cisco, AWS, Microsoft) et accompagnement d'avenir.",
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
    "DigiSET Akanda Gabon",
    "Dr ABAGA ABESSOLO Michel Audrey",
    "Université privée informatique Libreville Akanda",
    "École supérieure du numérique Gabon",
    "Formation IA et Data Science Gabon",
    "Licence Pro Cybersécurité Akanda",
    "Systèmes de Paiement Électronique Monétique PCI-DSS Gabon",
    "Classe Préparatoire Scientifique MP2I Gabon ECTS",
    "Certifications Cisco AWS Microsoft Linux CompTIA Gabon",
    "Location laboratoires TP physique électricité optique Gabon",
    "Formation continue entreprises Libreville",
    "Angondje Carrefour Moussavou Akanda",
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
    title: "DigiSET Institute — Établissement Supérieur Privé aux Métiers du Numérique (Akanda, Gabon)",
    description:
      "Formations d'excellence en Intelligence Artificielle, Cybersécurité, Monétique et Classe Prépa MP2I à Akanda, Gabon. Laboratoires TP haute technologie et certifications internationales.",
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
    title: "DigiSET Institute — L'Excellence Numérique à Akanda, Gabon",
    description:
      "Classe Préparatoire MP2I, Licences Pro IA, Cybersécurité & Monétique à Akanda. Apprentissage pratique en laboratoire et certifications internationales.",
    images: [`${siteUrl}/images/img/Hero_image1.jpg`],
  },
};

import { CookieBanner } from "@/components/layout/cookie-banner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: "DigiSET Institute",
    alternateName: "Digital Science, Engineering and Technology Institute",
    url: "https://www.digiset-gabon.com",
    logo: "https://www.digiset-gabon.com/brand/logo-digiset.png",
    image: "https://www.digiset-gabon.com/brand/logo-digiset.png",
    description:
      "Établissement supérieur privé d'ingénierie et de technologies numériques à Akanda, Gabon. Formations certifiantes et diplômantes en IA & Data Science, Cybersécurité, Systèmes de Paiement et Prépa MP2I.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Angondjé, Carrefour Moussavou",
      addressLocality: "Akanda",
      addressRegion: "Estuaire",
      addressCountry: "GA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "0.4988",
      longitude: "9.4290",
    },
    founder: {
      "@type": "Person",
      name: "Dr ABAGA ABESSOLO Michel Audrey",
      jobTitle: "Fondateur & Directeur Général",
    },
    telephone: "+241 07 40 00 00",
    email: "contact@digiset-gabon.com",
    sameAs: [
      "https://facebook.com/digisetgabon",
      "https://linkedin.com/company/digisetgabon",
      "https://maps.app.goo.gl/UqxLEnz4v7BHb7be7",
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
        <CookieBanner />
      </body>
    </html>
  );
}
