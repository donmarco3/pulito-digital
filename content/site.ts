/**
 * Every visible string lives here. Nothing may hard-code copy in a page.
 *
 * The file has two halves, and the split is the point.
 *
 * `site` is PRODUCT TRUTH: the services, the capabilities, the process, the
 * offer, the figures, the questions people actually ask, the form. It is
 * identical on all three directions, because those are facts about the
 * business and a comparison that let them drift would be comparing two things
 * at once.
 *
 * `directions` is VOICE: the headline, the way the problem is put, what the
 * sections are called. The user asked for creativity and flexibility in the
 * hero copy specifically, so the three headlines say the same true thing in
 * three registers — but no direction gets a fact the others are denied.
 *
 * Standing constraints, from PRODUCT.md, that bind both halves:
 * no testimonials, logos, ratings or client numbers; no pricing in any form;
 * nothing about the founder personally; Australian English.
 */

export const site = {
  name: "Pulito Digital",
  contactEmail: "hello@pulitodigital.com.au",
  location: "Adelaide, South Australia",
  /**
   * PLACEHOLDER — NOT A REAL NUMBER, and deliberately unmistakable.
   *
   * The failure mode of a plausible-looking fake is that nobody notices it: it
   * ships, and the one action this audience is most likely to take on a phone
   * rings a stranger. The X's are the point. Do not tidy them into something
   * that reads like a number.
   *
   * TODO: replace with the real number, then make the enquiry row a `tel:`
   * link — the note beside it in `app/1/page.tsx` says exactly what to change.
   * It renders as plain text until then, because `tel:+61 4XX XXX XXX` dials
   * nothing.
   */
  phone: "+61 4XX XXX XXX",

  /** One CTA label, used in the nav, the hero and the footer of every world. */
  cta: "Get a free preview",
  /** The quieter second action, which scrolls rather than converts. */
  ctaSecondary: "See how it works",

  /** Running header metadata. */
  disciplines: "Web, search and automation",

  /**
   * THREE services, not four.
   *
   * "Web design" and "Web redesign" were separate entries and are now one, at
   * the user's instruction: they are the same job, and splitting them made the
   * list look padded rather than thorough. The redesign case did not get
   * dropped — it is the second half of the web design entry, and the FAQ still
   * answers "we already have a website" directly, because that is still true
   * and still the most common way a job starts.
   *
   * Each service carries three `points`. Every one of them is a sentence that
   * already existed in this file, either in the service's own body or in the
   * capability list that used to sit below it, moved to the service it
   * actually belongs to. Nothing here is a new claim.
   */
  services: [
    {
      code: "01",
      title: "Web design",
      body: "A site built around the way high-end clients actually buy: the work first, the process second, an enquiry within reach on every screen. If you already have a site, the content and the search rankings carry across — we replace the shopfront, not the business.",
      points: [
        {
          title: "Mobile first, genuinely",
          body: "Designed on a 390px screen before a desktop one, because that is where your enquiries actually arrive.",
        },
        {
          title: "A speed budget",
          body: "Pages that load on site reception on a phone, not only on office wi-fi with a fast laptop.",
        },
        {
          title: "Ownership from day one",
          body: "Domain, hosting and code in your name. Leaving us should never mean losing your website.",
        },
      ],
    },
    {
      code: "02",
      title: "SEO",
      body: "Getting found for the searches worth money in Adelaide, and being the one they call rather than the one they scroll past.",
      points: [
        {
          title: "Suburb and service pages",
          body: "The pages that rank for searches with money behind them, written so they read like a business rather than a keyword.",
        },
        {
          title: "Google Business Profile",
          body: "Set up and maintained properly, so the map result works as hard as the website does.",
        },
        {
          title: "The technical side",
          body: "The fixes that let a site rank at all — the part that is invisible until it is missing.",
        },
      ],
    },
    {
      code: "03",
      title: "AI automation",
      body: "Enquiries answered in minutes instead of days, and nothing falling through the gap between the site visit and the quote.",
      points: [
        {
          title: "Enquiries acknowledged",
          body: "Every enquiry gets a reply within minutes, logged, whether or not anyone is at a desk.",
        },
        {
          title: "Quotes chased",
          body: "Follow-up that happens on its own, instead of when someone remembers on a Sunday night.",
        },
        {
          title: "Jobs logged",
          body: "The record keeps itself, so the pipeline is something you can look at rather than something you carry around.",
        },
      ],
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

  /**
   * The figures band.
   *
   * The user liked the metrics block on one of the references and chose to
   * spend it on the offer rather than on results — which is the only honest
   * option available, because the business is new and has no results to
   * report. Every one of these four is a commitment already made in words
   * elsewhere on the page; none is a measurement, and none implies a client.
   */
  figures: [
    { value: "$0", label: "What the preview costs you" },
    { value: "0", label: "Lock-in contracts, ever" },
    { value: "100%", label: "Yours: domain, hosting and code" },
    { value: "1 day", label: "Until we come back to you" },
  ],

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
      q: "What's the catch with the free preview?",
      a: "There isn't one. We rebuild your homepage because showing you is faster than convincing you, and because it is the only honest way to prove the work before you have paid for any. If you like it we talk about the rest of the site. If you don't, you keep it and we leave you alone.",
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

export type DirectionKey = "1" | "2" | "3";

/**
 * Per-direction voice, plus the one piece of layout data that belongs with the
 * copy rather than in the page: the hero image slot's aspect.
 *
 * `heroSlot` is here so the three ratios are recorded in one readable place
 * for whoever generates the images. The page reads the ratio from this object,
 * so changing it here changes the reserved box — there is no second number to
 * keep in step.
 */
export const directions = {
  "1": {
    name: "Meridian",
    tagline: "The studio",
    /** What the page says it is, in the running header. */
    eyebrow: "Pulito Digital — Adelaide",
    /*
      The user's own line, carried over from the build they liked and shortened
      from "Built to be looked at." at their request. It is a better headline
      than the one it replaces: three words, about the reader's work rather
      than about the offer, and it lands before the reader has decided whether
      to keep reading. The guarantee moves into the subhead, where it still
      does the persuading.
    */
    headline: "Built to be seen.",
    headlineLines: ["Built to be seen."],
    /*
      The one word in the headline set in the accent, at the user's request.

      It lives here rather than as markup in the page because the headline stays
      ONE string — the word is located inside it at render time. Authoring the
      emphasis as JSX would fork the line into fragments, and splitting a
      headline into pieces is a decision every earlier build came to regret the
      moment the copy needed editing.

      "seen" and not "seen." — the full stop closes the sentence, not the word,
      and colouring it drags a coloured dot onto the end of the line.
    */
    headlineAccent: "seen",
    subhead:
      "Web, search and automation for the trades whose work already sets the standard — starting with your own homepage, redesigned as a working preview before you pay us anything.",
    problem: {
      headline: "Your last build was worth more than your whole website.",
      body: "Premium work sells on how it looks. Then the enquiry lands on a site built years ago on a template, slow on a phone, with a gallery that undersells the job. The client has already compared you to three others before you pick up. The work is the easy part. The first impression is the leak.",
    },
    sections: {
      offer: "The offer",
      services: "What we do",
      process: "How the work runs",
      faq: "Questions we get asked",
      enquiry: "Enquiry",
    },
    /*
      Row labels on the enquiry section's contact list. MERIDIAN only, so it is
      optional in the same way `headlineAccent` is: it is the one direction
      carrying the list, and PLINTH and LATTICE are being deleted. A direction
      without it renders the plain mailto it renders today, so this staying
      optional costs nothing and forces nothing on the other two.

      They sit in `directions` rather than in `site` because they are furniture
      — what this world calls the things it shows — while the values behind
      them, the address and the number and the region, are facts about the
      business and live in `site`.

      "Serving" rather than "Address": there is no shopfront to visit, and a
      reader on a building site is asking whether these people cover him, not
      where to post a letter.
    */
    contactLabels: {
      email: "Email",
      phone: "Phone",
      location: "Serving",
    },
    heroSlot: { w: 1600, h: 900 },
  },
  "2": {
    name: "Plinth",
    tagline: "The agency",
    eyebrow: "Adelaide, South Australia",
    headline: "See it built before you buy it.",
    headlineLines: ["See it built", "before you buy it."],
    subhead:
      "Send us your website and we redesign the homepage as a working preview. No obligation, no pitch deck, and you keep it either way.",
    problem: {
      headline: "The work is not the problem. The window is.",
      body: "You spend months on a kitchen that photographs like furniture, and it arrives online as four compressed thumbnails on a page that takes six seconds to load. Nobody doubts the craft. They never get close enough to see it.",
    },
    sections: {
      offer: "The offer",
      services: "What we do",
      process: "How a job runs",
      faq: "Before you ask",
      enquiry: "Start here",
    },
    heroSlot: { w: 1920, h: 1080 },
  },
  "3": {
    name: "Lattice",
    tagline: "The product page",
    eyebrow: "Pulito Digital · Adelaide SA · Web, search, automation",
    headline: "Your homepage, redesigned. Before you commit to anything.",
    headlineLines: ["Your homepage, redesigned.", "Before you commit to anything."],
    subhead:
      "Web design, redesign, SEO and AI automation for premium building and renovation trades. Start with a free working preview of your own homepage and decide from there.",
    problem: {
      headline: "Where the enquiry actually leaks.",
      body: "It is rarely the trade and it is rarely the price. It is a slow page on a phone, a gallery that undersells the job, and a form nobody checks. Three fixable things standing between the work and the quote.",
    },
    sections: {
      offer: "The offer",
      services: "What we do",
      process: "How it works",
      faq: "Frequently asked",
      enquiry: "Get your preview",
    },
    heroSlot: { w: 1600, h: 900 },
  },
} as const satisfies Record<
  DirectionKey,
  {
    name: string;
    tagline: string;
    eyebrow: string;
    headline: string;
    headlineLines: readonly string[];
    /*
      MERIDIAN only, so it is optional: it is the one direction whose headline
      sets a word in the accent, and PLINTH and LATTICE are being deleted. The
      page falls back to the whole line unaccented when it is absent, so this
      staying optional costs nothing and forces nothing on the other two.
    */
    headlineAccent?: string;
    subhead: string;
    problem: { headline: string; body: string };
    sections: {
      offer: string;
      services: string;
      process: string;
      faq: string;
      enquiry: string;
    };
    /* MERIDIAN only, and optional for the same reason `headlineAccent` is. */
    contactLabels?: { email: string; phone: string; location: string };
    heroSlot: { w: number; h: number };
  }
>;
