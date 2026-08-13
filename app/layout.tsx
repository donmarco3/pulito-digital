import type { Metadata } from "next";
import { Archivo, Geist, Geist_Mono, Manrope, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";

/*
  Five faces load at the root: three display faces, one per direction, plus two
  workhorses shared across all of them.

  That is a review-stage cost and it is deliberate. The compare board puts all
  three directions on one screen at once, and a face scoped to one route
  arrives late into its panel there, so the comparison would be of three
  fallbacks rather than of three directions. When one direction is chosen, the
  other two faces come out of this file in the same commit.

  - Schibsted Grotesk — 1 MERIDIAN. A newspaper grotesk, editorial and faintly
    warm, with the authority a deep blue institutional page needs and none of
    the shout.
  - Archivo — 2 PLINTH. At 700–800 in tight negative tracking it is the only
    one of the three with real poster weight, which is the whole job on a page
    that has no cards, no borders and no shadows to lean on.
  - Manrope — 3 LATTICE. Semi-geometric with even colour, engineered-looking
    at small sizes, which is what a dense ruled page needs.
  - Geist / Geist Mono — running text everywhere, and the measured voice used
    for the offer figures and the rail's indices.
*/
const schibsted = Schibsted_Grotesk({
  variable: "--font-schibsted-src",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo({
  variable: "--font-archivo-src",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope-src",
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
PULITO DIGITAL — DIRECTION CONTRACT (world pinned by the user: three reference
sites, one direction each; no roll, a pinned brief beats it)

THESIS: Three modern directions on one offer. Each takes its structure, density
and signature mechanic from one of the user's three references, and all three
carry identical product facts. The category default all three refuse is the
proof-shaped SaaS page — logo wall, testimonials, stats, pricing table — because
the business is new and none of that is true yet; the offer does the persuading
instead.

OWN-WORLD: One stylesheet, three grounds and three shape languages. 1 MERIDIAN
deep blue, square corners, a fixed section rail, neighbours dimmed. 2 PLINTH
warm white with NO chrome — no cards, borders or shadows — pill nav and pill
actions. 3 LATTICE cool white on a ruled grid, blue-violet, bento cells at
0.75rem. Shared across all three: hairline geometry drawn from classical
architecture — an arcade, fluting, a cornice rule. Line-work only, no marble,
no photography, no serif.

STORY: A renovation builder, on a phone between site visits, reads that he can
see his own homepage redesigned before he pays anything, understands Pulito does
web, search and automation, and sends four fields.

FIRST VIEWPORT: Differs per direction by design — that is what is being
compared. Each opens on the guarantee at display scale, a hero image slot
awaiting a supplied image, and the enquiry action reachable without scrolling.

FORM: Pinned by the user, not dealt. Reference-per-direction, chosen in
interview over one-skeleton-three-skins and over a loudness ladder.

FINISH: unreviewed and undocumented is unfinished; this build ends with the
finish review, the verdict, and DESIGN.md
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-AU"
      className={`${schibsted.variable} ${archivo.variable} ${manrope.variable} ${geist.variable} ${geistMono.variable} h-full`}
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
