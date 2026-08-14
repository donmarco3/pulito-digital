import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Libre_Caslon_Display,
  Schibsted_Grotesk,
} from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

/*
  Four faces, each with one job. The five-way serif review is over — Libre
  Caslon Display won on the live hero, and the four losing candidates left
  this file with the switcher.

  - Libre Caslon Display — headings, through `display-face`. Transitional,
    sturdy, bookish; institutional without being cold.
  - Schibsted Grotesk — controls, the nav and the wordmark. A newspaper
    grotesk, editorial and faintly warm; a serif at control size would be
    worse than the grotesk it replaced.
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
  Weight is pinned to 400: Libre Caslon Display ships a single weight, and a
  synthesised semibold at display scale is a different typeface wearing the
  same name. `display-face` in globals.css carries the weight with the
  family for the same reason.
*/
const caslon = Libre_Caslon_Display({
  variable: "--font-caslon-src",
  subsets: ["latin"],
  weight: "400",
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
    /* The hero's own bottom frame, cut to 1200×630 (the crop recipe is in
       git history with the milestone-4 commit). JPEG rather than WebP —
       some share targets still refuse WebP cards. */
    images: [{ url: "/img/og-arcade.jpg", width: 1200, height: 630 }],
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
STRUCTURE IS SQUARE. One soft shadow, on floating nav furniture only. Libre
Caslon Display for headings, Schibsted Grotesk for controls, Geist for
running text, mono for measurement only. The classical world appears as
weather: a generated arcade silhouette in the hero, hairline primitives
elsewhere.

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
      className={`${schibsted.variable} ${geist.variable} ${geistMono.variable} ${caslon.variable} h-full`}
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
