/**
 * Every visible string on the page lives here.
 *
 * Changing the headline, the offer or a service name is a one-file edit.
 * Australian English throughout. No prices anywhere: pricing depends on the
 * job and is discussed on the call.
 */

export const site = {
  name: "Pulito Digital",
  contactEmail: "hello@pulitodigital.com.au",
  location: "Adelaide, South Australia",

  /** One CTA label, used in the nav, the hero and the footer. */
  cta: "Get a free preview",

  hero: {
    headline: "Websites for Adelaide's premium renovation builders",
    /** Same words, with the breaks variant three sets its capitals on. */
    headlineLines: [
      "Websites for",
      "Adelaide's premium",
      "renovation builders",
    ],
    subhead:
      "We design, build and rank the sites that win high-end kitchen and whole-home jobs.",
  },

  /** Running header used by variant three's mono metadata strip. */
  disciplines: "Web, search and automation",

  /** Section headings, so a wording change reaches all three variants. */
  sections: {
    services: "What we do for renovation businesses",
    process: "How the work runs",
    faq: "Questions we get asked",
  },

  problem: {
    headline: "Your last kitchen was worth more than your whole website.",
    body: "Premium renovation work sells on how it looks. Then the enquiry lands on a site built years ago on a template, slow on a phone, with a gallery that undersells the job and a contact form nobody checks. The client has already compared you to three other builders before you pick up. The work is the easy part. The first impression is the leak.",
  },

  services: [
    {
      title: "Web design",
      body: "A site built around the way renovation clients actually buy: the work first, the process second, an enquiry within reach on every screen.",
    },
    {
      title: "Web redesign",
      body: "Keep the business, replace the shopfront. Your existing content and search rankings carry across to something that matches the standard of your builds.",
    },
    {
      title: "SEO",
      body: "Getting found for the searches worth money in Adelaide. Suburb and service pages, a Google Business Profile that works, and technical fixes that let the site rank at all.",
    },
    {
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
