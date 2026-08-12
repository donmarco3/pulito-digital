# Pulito Digital

## What it is

A digital marketing studio in Adelaide, South Australia, selling web design, web
redesign, SEO and AI automation to premium home renovation trades: kitchen
designers, kitchen builders, bathroom and whole-home renovators, and high-end
builders.

## Unique mechanism

The clients sell on how their work looks, and are undersold by websites that
look nothing like the standard of their builds. Pulito closes that gap, and
proves it before the client pays anything, by rebuilding their homepage as a
working preview using their own photos and copy.

## Audience and scene

The reader is an owner or director of a renovation business, usually a
tradesperson who built the company themselves. They are reading on a phone,
between site visits, mildly sceptical of marketing agencies, and comparing
Pulito against the last three that cold-called them. They judge on
craftsmanship because that is what they sell.

## Surface

A single landing page. One conversion event: a short enquiry form.

## Product truth

- **Offer:** a free redesign preview of the prospect's existing homepage. No
  obligation. They keep it either way.
- **Services:** web design, web redesign, SEO, AI automation.
- **Geography:** Adelaide and regional South Australia. Interstate possible for
  design and build.
- **Pricing:** never stated on the page. Quoted after a call, because it depends
  on scope. No packages, no monthly lock-in.
- **Ownership:** the client owns the domain, hosting and code.

## Constraints

- **No proof exists yet.** The company is new. No testimonials, client logos,
  case studies, ratings or numbers may appear on the page, invented or implied.
  The offer and the process stand in for proof.
- **The form is a demo.** It validates and acknowledges locally, sends nothing.
  A real endpoint is a later change, and would require a privacy notice.
- **Australian English.** Adelaide named explicitly, in copy and in metadata.

## Brand commitments

- Name: Pulito Digital. Wordmark reads "Pulito".
- Contact: hello@pulitodigital.com.au
- Pinned aesthetic (user-supplied references): classical and heritage, in
  near-black, bone and burgundy. Museum and palazzo material, worked marble,
  carved detail, high-contrast Roman display lettering. Two later references
  (SPECTRA, an "ANTIQUE" concept page) pinned the hero composition: the
  display type runs *behind* the central object, and the first viewport has
  to feel alive rather than static.
- **Positioning is broad on purpose.** The headline says "digital marketing
  for premium craft", not "websites" and not "renovation builders": the work
  is web, search and automation, and the audience is premium craft generally.
  Adelaide is carried by the running header, the FAQ, the page title and the
  schema, never by the headline.
- All page copy lives in `content/site.ts`.

## History

Three full design directions were built and compared (stone/malachite,
palazzo/gilt, porphyry/red). The user chose the third and asked for gold in
place of the porphyry red. The other two were deleted; they are recoverable
from git history at tag-less commit `2fe6377` if a direction ever needs
revisiting.

The red then came back, deeper: burgundy marble as the hero's material and
the page's accent, with gold reduced to hairlines, and a Roman column as the
object the headline runs behind. Three cursor behaviours for the slab were
built rather than argued about — sheen, parallax, and both-plus-drift — and
are live at `/motion/compare`. **Open decision:** which one ships. `/`
currently renders `parallax`; changing it is one word in `app/page.tsx`, and
the losing two plus the whole `/motion` tree come out in one commit.
