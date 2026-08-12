import type { Metadata } from "next";
import {
  Bodoni_Moda,
  Cinzel,
  Geist,
  Geist_Mono,
  Marcellus,
} from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pulitodigital.com.au"),
  title: "Pulito Digital | Websites for Adelaide renovation builders",
  description:
    "Adelaide web design, redesign, SEO and AI automation for premium kitchen designers, renovators and home builders. Get a free redesign preview of your current site.",
  openGraph: {
    title: "Pulito Digital | Websites for Adelaide renovation builders",
    description:
      "Web design, redesign, SEO and AI automation for Adelaide's premium renovation trades.",
    url: "https://pulitodigital.com.au",
    siteName: "Pulito Digital",
    locale: "en_AU",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Pulito Digital",
  description:
    "Web design, redesign, SEO and AI automation for premium home renovation trades in Adelaide.",
  email: site.contactEmail,
  url: "https://pulitodigital.com.au",
  areaServed: {
    "@type": "City",
    name: "Adelaide",
    containedInPlace: { "@type": "State", name: "South Australia" },
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Adelaide",
    addressRegion: "SA",
    addressCountry: "AU",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${marcellus.variable} ${bodoni.variable} ${cinzel.variable} ${geist.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
