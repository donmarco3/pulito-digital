import type { Metadata } from "next";
import {
  Archivo,
  Bodoni_Moda,
  Bricolage_Grotesque,
  EB_Garamond,
  Geist,
  Geist_Mono,
  Libre_Caslon_Display,
} from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

/*
  Four faces are used by the page: Libre Caslon Display for the display voice,
  Archivo for controls, and Geist / Geist Mono for running text and measured
  values.

  Bodoni Moda, EB Garamond and Bricolage Grotesque are loaded for ONE reason:
  they are the alternatives in the tweak bar's display-face picker, left over
  from the five directions that were compared. They are the page's largest
  remaining weight. **Delete these three the moment the lettering is settled**
  — this file, their tokens in `globals.css`, and their options in
  `components/TweakBar.tsx`.
*/
const caslon = Libre_Caslon_Display({
  variable: "--font-caslon-src",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni-src",
  subsets: ["latin"],
  display: "swap",
});

const garamond = EB_Garamond({
  variable: "--font-garamond-src",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo-src",
  subsets: ["latin"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage-src",
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
  // The headline is deliberately broad; the title still has to carry Adelaide
  // and the services, because that is what a search result is judged on.
  title: "Pulito Digital | Digital marketing for premium craft, Adelaide",
  description:
    "Web design, SEO and AI automation for Adelaide's premium builders, renovators and makers. Get a free redesign preview of your current homepage.",
  openGraph: {
    title: "Pulito Digital | Digital marketing for premium craft",
    description:
      "Web, search and automation for Adelaide's premium building and renovation trades.",
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

/*
  The direction contract, emitted as a real HTML comment as the first child of
  <body> so it survives the production build and can be grepped out of the
  served page. It tops the artifact re-opened on every edit.
*/
const CONTRACT = `
PULITO DIGITAL — DIRECTION CONTRACT (ULTRAMARINE; chosen from five, seed f1f3f5a9)

THESIS: A business presented the way an institution presents its collection.
Every picture is a photograph of a real carved object; the category default
this refuses is the drawn arch — an SVG arcade under a serif headline, which
argues for real material with a drawing of it.

OWN-WORLD: Drenched ultramarine, warm bone accent, Libre Caslon Display over
Archivo and Geist. Hairline rules, no cards. Radius 0: the only curves are
inside the photograph.

STORY: A renovation builder, on a phone between site visits, sees work
photographed to the standard he sells at, understands Pulito does web, search
and automation, and sends four fields to get his own homepage rebuilt free.

FIRST VIEWPORT: A lit marble head holding the right two-fifths at full height,
screened into the ground so it stands in the page. The headline runs under and
across it at display scale; the action sits in the reading path beneath, with a
second action in the header.

FORM: One page, chosen from five photographic directions compared side by side;
the four that lost are at commit 6670c6a.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${caslon.variable} ${bodoni.variable} ${garamond.variable} ${archivo.variable} ${bricolage.variable} ${geist.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full">
        <div dangerouslySetInnerHTML={{ __html: `<!--${CONTRACT}-->` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
