/**
 * Every visible string lives here. Nothing may hard-code copy in a page.
 *
 * The file has two halves, and the split survived the comparison that created
 * it.
 *
 * `site` is PRODUCT TRUTH: the services, the process, the offer, the questions
 * people actually ask, the form. These are facts about the business, and every
 * page of the site draws on the same ones.
 *
 * `meridian` is VOICE: the headline, the way the problem is put, what the
 * sections are called. It was one of three competing voices (`directions` in
 * git history); MERIDIAN won and the other two were deleted with their pages.
 *
 * Standing constraints, from PRODUCT.md, that bind both halves:
 * no testimonials, logos, ratings or client numbers; no pricing in any form;
 * nothing about the founder personally; Australian English.
 */

export const site = {
  name: "Pulito Digital",
  contactEmail: "hello@pulitodigital.com.au",
  location: "Adelaide, South Australia",

  /** One CTA label, used in the nav, the hero and the footer. */
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
   * `slug` is the service's own page under /services. The nav dropdown, the
   * showcase's "more" links and the routes all read it from here, so a rename
   * cannot strand a link.
   *
   * Each service carries three `points`. Every one of them is a sentence that
   * already existed in this file, either in the service's own body or in the
   * capability list that used to sit below it, moved to the service it
   * actually belongs to. Nothing here is a new claim.
   */
  /*
   * Each service also carries its own PAGE now — the "one claim per room"
   * structure chosen at the milestone-2 review (seed c95ba129, candidate
   * 7 of 7): `claim` opens the page at display scale with one word in the
   * accent, each point gets a whole dimmed room with `more` as its second,
   * quieter paragraph, and the page ends at its own enquiry form.
   *
   * `more` may only deepen what `body` already says with facts this file or
   * PRODUCT.md already grants — no new claims. `timeline` appears above the
   * form where a ratified delivery promise exists (web design only; the
   * owner confirmed the estimates on 2026-08-14).
   */
  services: [
    {
      code: "01",
      slug: "web-design",
      title: "Web design",
      claim: "Look like your work.",
      claimAccent: "work",
      body: "A site built around the way high-end clients actually buy: the work first, the process second, an enquiry within reach on every screen. If you already have a site, the content and the search rankings carry across — we replace the shopfront, not the business.",
      points: [
        {
          title: "Mobile first, genuinely",
          body: "Designed on a 390px screen before a desktop one, because that is where your enquiries actually arrive.",
          more: "Your client is comparing you against three other builders from a ute between site visits, on 4G. That screen is the showroom, and the desktop version is the adaptation — not the other way around.",
        },
        {
          title: "A speed budget",
          body: "Pages that load on site reception on a phone, not only on office wi-fi with a fast laptop.",
          more: "A slow page loses the enquiry before anyone reads a word, so speed is part of the design brief from the first sketch — never an optimisation pass bolted on at the end.",
        },
        {
          title: "Ownership from day one",
          body: "Domain, hosting and code in your name. Leaving us should never mean losing your website.",
          more: "No page-builder subscriptions, no monthly ransom to keep the site online. If we stop working together, everything keeps running and everything stays yours.",
        },
      ],
      timeline:
        "A redesign is usually a couple of weeks; a full site runs four to six.",
    },
    {
      code: "02",
      slug: "seo",
      title: "SEO",
      claim: "Be the one they call.",
      claimAccent: "call",
      body: "Getting found for the searches worth money in Adelaide, and being the one they call rather than the one they scroll past.",
      points: [
        {
          title: "Suburb and service pages",
          body: "The pages that rank for searches with money behind them, written so they read like a business rather than a keyword.",
          more: "Adelaide first: a search with a suburb in it usually has a job attached, and those are the pages that meet it.",
        },
        {
          title: "Google Business Profile",
          body: "Set up and maintained properly, so the map result works as hard as the website does.",
          more: "For a trade, the map pack is often the first Google result that matters — the profile gets the same care as the site behind it.",
        },
        {
          title: "The technical side",
          body: "The fixes that let a site rank at all — the part that is invisible until it is missing.",
          more: "Indexing, structure and speed, done quietly under the surface. Nothing to admire, everything to lose.",
        },
      ],
      timeline: null,
    },
    {
      code: "03",
      slug: "ai-automation",
      title: "AI automation",
      claim: "Answered in minutes.",
      claimAccent: "minutes",
      body: "Enquiries answered in minutes instead of days, and nothing falling through the gap between the site visit and the quote.",
      points: [
        {
          title: "Enquiries acknowledged",
          body: "Every enquiry gets a reply within minutes, logged, whether or not anyone is at a desk.",
          more: "The client who hears back first assumes the rest of the job runs the same way. That reply goes out while your competitors' enquiries sit unread in a van.",
        },
        {
          title: "Quotes chased",
          body: "Follow-up that happens on its own, instead of when someone remembers on a Sunday night.",
          more: "The quote marked “with the client” stops quietly dying there — the follow-up runs on its own schedule until there is an answer either way.",
        },
        {
          title: "Jobs logged",
          body: "The record keeps itself, so the pipeline is something you can look at rather than something you carry around.",
          more: "Every enquiry, quote and job in one place you can read at a glance, instead of across a phone, a notebook and a memory.",
        },
      ],
      timeline: null,
    },
  ],

  /*
   * Each step also carries the deep version for /process — the "deepened
   * ladder" chosen at the milestone-3 review (seed b80f7f55, candidate 3):
   * `youGet` is the deliverable the reader leaves the step with, and `fact`
   * is the step's one measured line, set in the mono measurement voice.
   * Every fact is ratified or already granted: the reply time and the
   * delivery estimates were confirmed by the owner as written (2026-08-14),
   * and $0 / ownership are the offer's own terms. Nothing here may carry a
   * number PRODUCT.md does not grant.
   */
  process: [
    {
      title: "Audit",
      body: "We go through your current site, your search visibility and how enquiries reach you today. You get the findings whether or not you hire us.",
      youGet: "The findings, in writing — yours to keep either way.",
      fact: "Reply within one business day",
    },
    {
      title: "Design",
      body: "You see the real thing before we build it: your photos, your work, your words, laid out the way it will ship.",
      youGet: "A working preview of your own homepage, built with your photos and copy.",
      fact: "Paid so far · $0",
    },
    {
      title: "Build",
      body: "Fast, mobile-first, and yours. No page builder subscriptions, no monthly ransom to keep the site online.",
      youGet: "A fast, mobile-first site, built in your name.",
      fact: "Couple of weeks · 4–6 for a full site",
    },
    {
      title: "Handover",
      body: "Trained on how to update it, with the enquiry flow tested end to end. Ongoing SEO and automation only if you want it.",
      youGet: "The keys: domain, hosting and code, and the training to run it.",
      fact: "Domain, hosting, code · yours",
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
    /* Shown only when the live submit fails; the mailto beside it is the
       recovery, not decoration. */
    failBody: "That didn't send. Email us directly instead —",
  },

  footer: {
    line: "Web design, SEO and automation for renovation trades in Adelaide.",
  },
} as const;

export type Service = (typeof site.services)[number];

/**
 * The site's voice — MERIDIAN's, the direction that won the three-way
 * comparison recorded in git history and in DESIGN.md.
 *
 * It keeps its name rather than dissolving into `site`, because the split
 * between fact and voice is what kept three competing pages honest, and it
 * keeps a one-voice site honest for free.
 */
export const meridian = {
  /** What the page says it is, in the running header. */
  eyebrow: "Pulito Digital — Adelaide",
  /*
    The user's own line, carried over from the build they liked and shortened
    from "Built to be looked at." at their request. Three words, about the
    reader's work rather than about the offer, and it lands before the reader
    has decided whether to keep reading. The guarantee moves into the subhead,
    where it still does the persuading.
  */
  headline: "Built to be seen.",
  /*
    The one word in the headline set in the accent — EMPTY, and the hero line
    now runs unbroken.

    It was "seen", and it stopped earning its place when the action went bone:
    an accent word only marks anything while the accent is a HUE, and bone
    lettering beside bone lettering marks nothing. That is the same reasoning
    that sent the accent to verdigris in the first place, running the other
    way. Left as a token rather than deleted because the mechanism is intact —
    put a word back here and the hero accents it again.

    The line stays ONE string either way: the word is located inside it at
    render time, and `lib/headline.ts` returns the line whole when this is
    empty. Authoring the emphasis as JSX would fork the copy into fragments,
    which every earlier build came to regret the moment the line needed
    editing.
  */
  headlineAccent: "",
  subhead:
    "Web design, SEO and AI automation for the trades whose work already sets the standard — starting with your own homepage, redesigned as a working preview for free.",
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
    Row labels on the enquiry section's contact list.

    They sit here rather than in `site` because they are furniture — what this
    world calls the things it shows — while the values behind them, the address
    and the region, are facts about the business and live in `site`.

    There is no phone row. The business publishes an email address and nothing
    else, confirmed by the owner on 2026-08-14 — the placeholder number that
    used to sit here is in git history if a real one ever lands.

    "Serving" rather than "Address": there is no shopfront to visit, and a
    reader on a building site is asking whether these people cover him, not
    where to post a letter.
  */
  contactLabels: {
    email: "Email",
    location: "Serving",
  },
  /*
    The aspect of the hero image slot that used to sit between the hero and
    the body. The slot is gone from the page — the picture went INTO the hero
    instead — but the recorded aspect stays so reinstating the plate is a
    one-line change rather than an excavation. See DESIGN.md.
  */
  heroSlot: { w: 1600, h: 900 },

  /*
    Inner-page voice. FIRST-DRAFT SCAFFOLDING from the consolidation commit:
    these pages exist so the new nav has real destinations, and each gets its
    own design-and-copy pass in a later milestone. The facts are all lifted
    from `site` and PRODUCT.md; nothing here is a new claim.
  */
  pages: {
    process: {
      title: "How the work runs",
      lede: "Four steps from first look to handover — and you see the design before you commit to anything. This is the same sequence whether the job is a redesign or a site built from nothing.",
    },
    /*
      THE MIRROR — the structure chosen at the milestone-3 review (seed
      c5cdef18, candidate 3). The page pairs the reader's craft with the
      studio's, row by row, and its opening statement deliberately echoes
      the site's headline: "seen" takes the accent here for the same reason
      it does on the hero. Nothing about the founder, per the standing
      constraint. Every `us` cell is a fact PRODUCT.md already grants —
      ownership, no packages, quote-after-scope, the preview.
    */
    about: {
      title: "The studio",
      statement: "You build the work. We build where it's seen.",
      statementAccent: "seen",
      lede: "Pulito is a digital studio in Adelaide, built for the renovation trades whose work already sets the standard.",
      mirrorLabels: { you: "On site", us: "At the studio" },
      mirror: [
        {
          you: "You hand over joins you would accept in your own house.",
          us: "We ship pages to the same standard — measured, tested on the phone in your client's hand, nothing held together with tape.",
        },
        {
          you: "Your tools are your own. Nobody rents you a saw.",
          us: "Your site is your own. No page-builder subscriptions, no monthly ransom — domain, hosting and code in your name from day one.",
        },
        {
          you: "You quote after you have walked the job.",
          us: "So do we. No packages: the price follows the scope, after a call, and we will say so if your current site is fine.",
        },
        {
          you: "You show finished jobs, not promises.",
          us: "We show you your own homepage, rebuilt as a working preview, before you pay us anything.",
        },
      ],
      body: [
        "We do three things: web design, SEO and AI automation, for kitchen designers and builders, bathroom and whole-home renovators, and high-end builders across Adelaide and regional South Australia.",
        "The businesses we work with sell on craftsmanship, and most of them are undersold online — premium work presented on a template site that is slow on a phone and looks nothing like the standard of the builds. We exist to close that gap, and we prove it before you pay anything.",
      ],
    },
    contact: {
      title: "Talk to the studio",
      lede: "Four fields, or a plain email — both reach the same desk, and both get an answer within one business day.",
      /* The service area, said once in full. Granted by PRODUCT.md's
         geography facts. */
      area: "Adelaide and regional South Australia are home. Interstate is possible for design and build — we will be upfront if distance makes us the wrong fit.",
    },
    /*
      The privacy notice exists because the form is real: it delivers what a
      visitor types to the studio's email through Web3Forms. Plain language,
      only claims that are true of this build — no analytics, no ad
      tracking, no cookies of our own — and dated, so a change to any of
      that has to change the date too.
    */
    privacy: {
      title: "Privacy",
      dated: "14 August 2026",
      lede: "The short version: the enquiry form collects what you type into it, it reaches us as an email, and that is the only thing this site collects about you.",
      sections: [
        {
          heading: "What we collect",
          body: "The enquiry form asks for your name, your email address, your business website if you have one, and what you need. Nothing is collected until you press send, and the website field is optional.",
        },
        {
          heading: "Where it goes",
          body: "Submissions are delivered to hello@pulitodigital.com.au by Web3Forms, a form delivery service that processes the submission solely to deliver it to us. We do not run analytics, advertising trackers, or cookies of our own on this site.",
        },
        {
          heading: "What we do with it",
          body: "We use what you send to reply to your enquiry and, if you asked for one, to prepare your preview. We do not sell it, rent it, or share it with anyone else, and we keep correspondence only as long as the conversation needs.",
        },
        {
          heading: "Your choices",
          body: "Email us any time to ask what we hold about you, to correct it, or to have it deleted. We handle personal information in line with the Australian Privacy Principles.",
        },
      ],
    },
  },
} as const;
