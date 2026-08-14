import type { Metadata } from "next";
import {
  Bodoni_Moda,
  EB_Garamond,
  Fraunces,
  Geist,
  Geist_Mono,
  Instrument_Serif,
  Libre_Caslon_Display,
  Schibsted_Grotesk,
} from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

/*
  One display face and two workhorses. PLINTH's Archivo and LATTICE's Manrope
  left with their directions when MERIDIAN won the comparison.

  - Schibsted Grotesk — the display face, pending the heading review below. A
    newspaper grotesk, editorial and faintly warm, with the authority a deep
    blue institutional page needs and none of the shout.
  - Geist / Geist Mono — running text everywhere, and the measured voice used
    for the process numerals and the contact-row labels.
*/
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted-src",
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

/*
  THE HEADING FACES UNDER REVIEW — five of them, and they are temporary.

  MERIDIAN's headings were Schibsted Grotesk on the argument that a display
  serif belonged to the classical world this build replaced. The user has since
  seen Libre Caslon Display on the other build, likes it, and asked to compare
  it here against alternatives. So these load alongside the workhorses while
  `FontSwitch` is on the page, and the four that lose come out of this file with
  it — the same deal the three direction faces already have above.

  They are chosen to span the serif space rather than to offer five versions of
  one idea, because "a serif" is not a decision:

  - LIBRE CASLON DISPLAY — the reference, and the reason for the exercise. A
    transitional face: sturdy, bookish, even in colour.
  - INSTRUMENT SERIF — high contrast and tightly set. The most current-looking,
    and the one that changes the page most at headline scale.
  - FRAUNCES — old-style with deliberate softness and wonk. Warmest of the five
    and the least institutional.
  - BODONI MODA — a didone. Extreme thick-to-thin, which reads as luxury and
    fashion rather than as trade.
  - EB GARAMOND — Renaissance humanist. Historically the closest thing here to
    the Roman world the arcade comes from, and the quietest.

  Weight is pinned to 400 where the face offers a choice. These are display
  faces at 3–7rem, and a semibold serif at that size is a different typeface
  wearing the same name.
*/
const caslon = Libre_Caslon_Display({
  variable: "--font-caslon-src",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument-src",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces-src",
  subsets: ["latin"],
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

export const metadata: Metadata = {
  metadataBase: new URL("https://pulitodigital.com.au"),
  // The headlines lead with the offer rather than the audience, per the
  // user's decision; the title still has to carry Adelaide and the services,
  // because that is what a search result is judged on.
  title: "Pulito Digital | Web design, SEO and automation, Adelaide",
  description:
    "See your homepage redesigned before you pay anything. Web design, SEO and AI automation for Adelaide's premium building and renovation trades.",
  openGraph: {
    title: "Pulito Digital | See the redesign before you pay for it",
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
PULITO DIGITAL — DIRECTION CONTRACT (MERIDIAN, chosen by the user from a
three-way comparison; the losing directions live in git history)

THESIS: One offer carried across a small multi-page site. The category default
it refuses is the proof-shaped agency page — logo wall, testimonials, stats,
pricing table — because the business is new and none of that is true yet; the
free-preview offer does the persuading instead, on every page.

OWN-WORLD: Ultramarine ground over three recessed depths, hairline rules
between everything, bone ink, one verdigris action. ACTIONS ARE PILLS,
STRUCTURE IS SQUARE. One soft shadow, on floating nav furniture only. Display
grotesk at scale (heading face under review); Geist for running text; mono for
measurement only. The classical world appears as weather: a generated arcade
silhouette in the hero, hairline primitives elsewhere.

STORY: A renovation builder, on a phone between site visits, reads that he can
see his own homepage redesigned before he pays anything, understands Pulito
does web, search and automation, and sends four fields.

FIRST VIEWPORT: Headline stacked upper-left over the arcade picture, one word
in the accent; subhead and two pill actions beneath; pill nav with links left,
wordmark centred, the enquiry action right.

FORM: Pinned by the user across two builds and a comparison; not dealt.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${schibsted.variable} ${geist.variable} ${geistMono.variable} ${caslon.variable} ${instrument.variable} ${fraunces.variable} ${bodoni.variable} ${garamond.variable} h-full`}
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
