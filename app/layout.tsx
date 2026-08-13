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
  Seven faces load at the root: five display faces, one for each direction,
  plus two workhorses shared across all of them.

  That is a review-stage cost and it is deliberate. The compare board puts all
  five directions on one screen at once, and a face scoped to one route
  arrives late into its panel there, so the comparison would be of five
  fallbacks rather than of five directions. When one direction is chosen, the
  other four faces come out of this file in the same commit.

  - Libre Caslon Display — 1 ULTRAMARINE. A real Caslon at display size, cut
    for headlines rather than text. Institutional without being a wordmark.
  - Bodoni Moda — 2 NERO. A didone's thick and thin only exist above about
    60px, and it is the only thing that holds its own against gilt on black.
  - EB Garamond — 3 BIANCO. A book face, because a catalogue is a book. It is
    the only direction whose display size is small on purpose.
  - Archivo — 4 CAVA, at weight 800 in tight capitals. A grotesk with enough
    weight to survive being set over a quarry face in full sun.
  - Bricolage Grotesque — 5 GESSO. Optical-size aware, slightly irregular,
    and it holds an enormous size without turning into a logo.
  - Geist / Geist Mono — running text everywhere, and the measured voice that
    BIANCO and CAVA both use for lot numbers, dimensions and schedules.
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
  // The headlines are deliberately broad and differ per direction; the title
  // still has to carry Adelaide and the services, because that is what a
  // search result is judged on.
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
PULITO DIGITAL — DIRECTION CONTRACT (seed f1f3f5a9, form: pinned world, roll used for order only)

THESIS: Five photographic directions on one classical world, compared side by
side. Every picture is a photograph of a real carved or quarried object; the
category default this refuses is the drawn arch — an SVG arcade under a serif
headline, which argues for real material with a drawing of it.

OWN-WORLD: One system, five grounds. 1 ULTRAMARINE drenched blue with a figure
screened into it. 2 NERO near-black and gilt. 3 BIANCO cold paper, vermilion
lot marks. 4 CAVA quarry dust and hi-vis orange. 5 GESSO plaster shadow and
one acid signal. Radius 0 on all five: the only curves are inside the
photographs.

STORY: A renovation builder, on a phone between site visits, sees work
photographed to the standard he sells at, understands Pulito does web, search
and automation, and sends four fields to get his own homepage rebuilt free.

FIRST VIEWPORT: Differs per direction by design — that is what is being
compared. Each opens on one photograph at full commitment, the positioning
line, and the enquiry action visible without scrolling.

FORM: Five directions, presented together rather than chosen between; the roll
assigned index 5 of the grounded list, which leads the board.

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
