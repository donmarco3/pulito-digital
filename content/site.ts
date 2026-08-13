/**
 * Every visible string lives here. Nothing may hard-code copy in a page.
 *
 * The file has two halves, and the split is the point.
 *
 * `site` is PRODUCT TRUTH: the services, the process, the offer, the
 * questions people actually ask, the form. It is identical on all five
 * directions, because those are facts about the business and a comparison
 * that let them drift would be comparing two things at once.
 *
 * `directions` is VOICE: the headline, the way the problem is put, what the
 * sections are called, and the small label each world uses for its own
 * furniture. The user asked for copy to vary with the design, so it does —
 * but only where wording is a design decision rather than a claim.
 *
 * Standing constraints, from PRODUCT.md, that bind both halves:
 * no testimonials, logos, ratings or client numbers; no pricing in any form;
 * Australian English; Adelaide carried by the header, FAQ, title and schema
 * rather than by a headline.
 */

export const site = {
  name: "Pulito Digital",
  contactEmail: "hello@pulitodigital.com.au",
  location: "Adelaide, South Australia",

  /** One CTA label, used in the nav, the hero and the footer of every world. */
  cta: "Get a free preview",

  /** Running header metadata. */
  disciplines: "Web, search and automation",

  services: [
    {
      code: "WD",
      title: "Web design",
      body: "A site built around the way high-end clients actually buy: the work first, the process second, an enquiry within reach on every screen.",
    },
    {
      code: "RD",
      title: "Web redesign",
      body: "Keep the business, replace the shopfront. Your existing content and search rankings carry across to something that matches the standard of your builds.",
    },
    {
      code: "SE",
      title: "SEO",
      body: "Getting found for the searches worth money in Adelaide. Suburb and service pages, a Google Business Profile that works, and technical fixes that let the site rank at all.",
    },
    {
      code: "AI",
      title: "AI automation",
      body: "Enquiries answered in minutes instead of days. Quotes chased, leads followed up and jobs logged without anyone remembering to do it.",
    },
  ],

  process: [
    {
      title: "Audit",
      body: "We go through your current site, your search visibility and how enquiries reach you today. You get the findings whether or not you hire us.",
    },
    {
      title: "Design",
      body: "You see the real thing before we build it: your photos, your work, your words, laid out the way it will ship.",
    },
    {
      title: "Build",
      body: "Fast, mobile-first, and yours. No page builder subscriptions, no monthly ransom to keep the site online.",
    },
    {
      title: "Handover",
      body: "Trained on how to update it, with the enquiry flow tested end to end. Ongoing SEO and automation only if you want it.",
    },
  ],

  offer: {
    headline: "See it on your own site first",
    body: "Send through your website and we will redesign the homepage as a working preview, built with your own photos and copy. No obligation, no pitch deck. If you like it, we talk. If you don't, you keep the preview.",
  },

  faqs: [
    {
      q: "What does a website cost?",
      a: "It depends on the size of the site, how much of the content already exists, and whether you want SEO and automation on top. We quote after a short call, once we know what the job actually involves. No packages, no per-month lock-in.",
    },
    {
      q: "We already have a website. Do we have to start again?",
      a: "Usually not. If the content and search rankings are sound, a redesign keeps both and replaces the presentation. We tell you which of the two you need in the audit, and we will say so if your current site is fine.",
    },
    {
      q: "How long does it take?",
      a: "A single-page site is a couple of weeks. A full renovation site with project galleries and suburb pages usually runs four to six, most of which is waiting on photography and copy approvals.",
    },
    {
      q: "Do you only work with renovation businesses?",
      a: "Kitchens, bathrooms, whole-home renovations and high-end builders are what we know. We understand how the enquiry turns into a site visit and then a quote, which is the part generalist agencies get wrong.",
    },
    {
      q: "Do you work with businesses outside Adelaide?",
      a: "Adelaide and regional South Australia are home, and being local matters for the search side of the work. Interstate is possible for design and build, we will be upfront if distance makes us the wrong fit.",
    },
    {
      q: "Who owns the site when it is finished?",
      a: "You do. The domain, the hosting and the code are in your name. Leaving us should never mean losing your website.",
    },
  ],

  form: {
    headline: "Tell us about the business",
    body: "Four fields. We will come back to you within one business day with the preview or a straight answer about whether we can help.",
    successHeadline: "Thanks, that's come through",
    successBody:
      "We will be in touch within one business day. If it is urgent, email us directly.",
  },

  footer: {
    line: "Web design, SEO and automation for renovation trades in Adelaide.",
  },
} as const;

/**
 * A photograph's credit line and alternative text.
 *
 * Alt text describes the object, never the treatment. A screen reader user
 * gets told there is a marble Diadoumenos; being told it has been screened
 * into an ultramarine ground tells them about CSS, not about the page.
 *
 * `credit` is not optional politeness. Five of these files are CC BY or
 * CC BY-SA, which oblige attribution on a derivative, and the resize made
 * every file in the repo a derivative. `public/img/CREDITS.md` records which
 * is which and what that costs before this goes live commercially.
 */
export type Plate = {
  src: string;
  alt: string;
  credit: string;
  width: number;
  height: number;
};

export const plates = {
  diadoumenos: {
    src: "/img/figure-diadoumenos.webp",
    alt: "Marble statue of the Diadoumenos, a young athlete binding a band around his head, standing beside a tree stump",
    credit: "The Met, Open Access (CC0)",
    width: 1500,
    height: 2043,
  },
  athena: {
    src: "/img/torso-athena.webp",
    alt: "Marble head and torso of Athena, draped and belted, the surface weathered",
    credit: "The Met, Open Access (CC0)",
    width: 1200,
    height: 1600,
  },
  caligula: {
    src: "/img/bust-caligula.webp",
    alt: "Marble portrait bust of the emperor Gaius, known as Caligula, lit against a black ground",
    credit: "The Met, Open Access (CC0)",
    width: 1500,
    height: 1999,
  },
  herodotos: {
    src: "/img/bust-herodotos.webp",
    alt: "Marble bust of Herodotos, bearded, his name cut in Greek capitals across the base",
    credit: "The Met, Open Access (CC0)",
    width: 1200,
    height: 1599,
  },
  galleryRelief: {
    src: "/img/gallery-relief.webp",
    alt: "A carved stone relief panel hung in a museum gallery against a deep red wall",
    credit: "M. Gaylard, Wikimedia Commons (CC BY 2.0)",
    width: 1200,
    height: 799,
  },
  eros: {
    src: "/img/torso-eros.webp",
    alt: "Marble torso of Eros, broken at the shoulders and thighs, on a plain ground",
    credit: "The Met, Open Access (CC0)",
    width: 1100,
    height: 1100,
  },
  rosso: {
    src: "/img/torso-rosso.webp",
    alt: "Torso of a centaur carved in rosso antico, a deep red marble",
    credit: "The Met, Open Access (CC0)",
    width: 1000,
    height: 1333,
  },
  boy: {
    src: "/img/torso-boy.webp",
    alt: "Marble torso of a boy, weathered smooth",
    credit: "The Met, Open Access (CC0)",
    width: 1000,
    height: 1272,
  },
  constantine: {
    src: "/img/head-constantine.webp",
    alt: "Marble portrait head of the Emperor Constantine I",
    credit: "The Met, Open Access (CC0)",
    width: 1000,
    height: 1333,
  },
  caracalla: {
    src: "/img/head-caracalla.webp",
    alt: "Marble portrait of the emperor Caracalla, brow drawn down, head turned sharply",
    credit: "The Met, Open Access (CC0)",
    width: 1200,
    height: 1599,
  },
  quarryFace: {
    src: "/img/quarry-face.webp",
    alt: "A worked face of a Carrara marble quarry, cut in terraces under a deep blue sky",
    credit: "Wittylama, Wikimedia Commons (CC BY-SA 4.0)",
    width: 1200,
    height: 1600,
  },
  quarryRange: {
    src: "/img/quarry-range.webp",
    alt: "Marble quarries cut into a mountain range above a valley, seen from across the slope",
    credit: "Ingo Mehling, Wikimedia Commons (CC BY-SA 4.0)",
    width: 1280,
    height: 687,
  },
  castRelief: {
    src: "/img/cast-relief.webp",
    alt: "A plaster cast of a carved architectural niche, a shell hood over figures beneath a tree",
    credit: "M. Gaylard, Wikimedia Commons (CC BY 2.0)",
    width: 1200,
    height: 1804,
  },
  castHall: {
    src: "/img/cast-hall.webp",
    alt: "The interior of a museum cast hall, plaster casts of monuments crowded under a high roof",
    credit: "DiscoA340, Wikimedia Commons (CC BY-SA 4.0)",
    width: 1200,
    height: 800,
  },
} satisfies Record<string, Plate>;

export type DirectionKey = "1" | "2" | "3" | "4" | "5";

/**
 * Per-direction voice.
 *
 * Every field here is a wording decision the design makes. None of them is a
 * claim: the five headlines say the same true thing about the same business
 * in five registers, and no direction gets a fact the others are denied.
 */
export const directions = {
  "1": {
    name: "Ultramarine",
    tagline: "The institution",
    /** What the page says it is, in the running header. */
    eyebrow: "Pulito Digital — Adelaide",
    headline: "Built to be looked at.",
    headlineLines: ["Built to be", "looked at."],
    subhead:
      "Web, search and automation for the builders, renovators and makers whose work already sets the standard.",
    problem: {
      headline: "Your last build was worth more than your whole website.",
      body: "Premium work sells on how it looks. Then the enquiry lands on a site built years ago on a template, slow on a phone, with a gallery that undersells the job. The client has already compared you to three others before you pick up. The work is the easy part. The first impression is the leak.",
    },
    sections: {
      services: "What we do",
      process: "How the work runs",
      faq: "Questions we get asked",
      offer: "The offer",
    },
  },
  "2": {
    name: "Nero",
    tagline: "The house catalogue",
    eyebrow: "Adelaide, South Australia",
    headline: "Work of this standard deserves a shopfront to match.",
    headlineLines: ["Work of this standard", "deserves a shopfront", "to match."],
    subhead:
      "A digital studio for premium trades. Web design, redesign, search and automation, made in Adelaide.",
    problem: {
      headline: "The gap is not in the work. It is in the window.",
      body: "You spend months on a kitchen that photographs like furniture, and it arrives online as four compressed thumbnails on a page that takes six seconds to load. Nobody doubts the craft. They never get close enough to see it.",
    },
    sections: {
      services: "The disciplines",
      process: "How a commission runs",
      faq: "Before you ask",
      offer: "An offer, without obligation",
    },
  },
  "3": {
    name: "Bianco",
    tagline: "The auction catalogue",
    eyebrow: "Pulito Digital · Adelaide SA · Web, search, automation",
    headline: "Everything you build is catalogued badly.",
    headlineLines: ["Everything you build", "is catalogued badly."],
    subhead:
      "We rebuild the record: the site, the search listing and the follow-up, for premium building and renovation trades.",
    problem: {
      headline: "A good object, described poorly, sells for less.",
      body: "That is the whole of it. The kitchen is right, the joinery is right, the finish is right — and the page describing it is a stock template with a phone number in the footer. The buyer is comparing entries, not builders, and yours reads like the cheap lot.",
    },
    sections: {
      services: "Services",
      process: "Method",
      faq: "Conditions of sale",
      offer: "On approval",
    },
  },
  "4": {
    name: "Cava",
    tagline: "The quarry",
    eyebrow: "Adelaide + regional SA",
    headline: "Nothing good was ever finished in a hurry.",
    headlineLines: ["Nothing good", "was ever finished", "in a hurry."],
    subhead:
      "Websites, search and automation for the trades who cut, fit and finish. Built properly, owned by you.",
    problem: {
      headline: "You would not accept this standard on site.",
      body: "A template site is a job done by someone who has never seen the work. Wrong dimensions, wrong materials, finished in an afternoon and signed off by nobody. You would pull it out and start again. Somehow the website gets a pass.",
    },
    sections: {
      services: "The work",
      process: "Sequence",
      faq: "Straight answers",
      offer: "Free, no obligation",
    },
  },
  "5": {
    name: "Gesso",
    tagline: "The cast court",
    eyebrow: "Pulito Digital",
    headline: "A copy is never the thing.",
    headlineLines: ["A copy is", "never", "the thing."],
    subhead:
      "Every template site is a cast of somebody else's business. We build the original: web, search and automation for premium trades in Adelaide.",
    problem: {
      headline: "Your website is a cast of a website.",
      body: "Same layout as the last three builders who called you. Same hero photo, same four icons, same form nobody checks. It is a copy of a copy, and it is doing the job of representing work that is genuinely one of one.",
    },
    sections: {
      services: "What we make",
      process: "The sequence",
      faq: "Asked and answered",
      offer: "Take the original",
    },
  },
} as const satisfies Record<
  DirectionKey,
  {
    name: string;
    tagline: string;
    eyebrow: string;
    headline: string;
    headlineLines: readonly string[];
    subhead: string;
    problem: { headline: string; body: string };
    sections: {
      services: string;
      process: string;
      faq: string;
      offer: string;
    };
  }
>;
