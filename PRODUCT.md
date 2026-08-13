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
- **Services:** web design, SEO, AI automation. Redesigns are not a separate
  service — they are most of what web design actually is, and the user merged
  the two lines because splitting them made the list look padded. The FAQ still
  answers "we already have a website" directly, because that is still true and
  still the most common way a job starts.
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
- **Pinned aesthetic (user-supplied references): modern, clean, professional.**
  Three sites, supplied together and named as the thing to build after:
  `daliagents.com`, the Omega agency template on nextjsshop, and the Notus
  agent-marketing template **in its light mode**. What the user named as the
  reasons: Dali's dark blue, its subtle hero background graphic, its centred
  wordmark with slash marks, its hero-to-body scroll transition, the sticky
  sidebar in its solutions section, and the way it dims every section except
  the one being read. (The "little column on the left" was first read as a
  page-margin index; against the reference's own stylesheet it is the solutions
  sidebar, and the margin rail was removed once that was clear.)
  Omega's nav contracting into a pill on scroll, its black-and-white
  illustration, its key figures, its simple palette. Notus's centred hero with
  an accent and a device in the middle, and its grid.
- **The classical world is retired.** Greco-Roman remains the user's personal
  favourite and they asked for a trace of it, explicitly conditional on it
  being cheap. It survives as **hairline geometry only** — an arcade, fluting,
  a cornice — drawn parametrically in `components/Classical.tsx`. No marble, no
  sculpture photography, no serif display face. The user's standard was "clean
  enough to get up and running and to look professional", and "not too fancy".
- **The hero imagery is being generated separately by the user**, through
  Higgsfield. `/2` and `/3` each reserve a real 16:9 slot with a composed
  placeholder; `DESIGN.md` records the dimensions. **`/1`, the direction that
  is actually shipping, no longer has one** — the user asked for the arcade
  image below its hero to go, and that box was the slot. Where a supplied hero
  image lives on Meridian is an open question.
- **Nothing about the founder appears on the page.** No name, no photograph,
  no bio, no "who we are". Asked directly whether a founder section should
  stand in for the missing proof, the user said no. A standing constraint, not
  a gap waiting to be filled.
- **The headline leads with the offer, not the audience.** The user's call: the
  guarantee — you see the redesign before you pay for it — is what the first
  screen argues, and it is deliberately not tied to a trade or a city. The
  wording varies between directions; the claim does not. Adelaide is carried
  by the FAQ, the footer, the page title and the schema.
- All page copy lives in `content/site.ts`.

## History

Earlier builds, all deleted and all recoverable from git history: three dark
directions on stone/malachite, palazzo/gilt and porphyry/red (`2fe6377`); a
near-black page with a generated marble slab and three cursor behaviours
(`9e26ea5`); a light pair of a joiner's setout sheet and a museum catalogue;
and three arch-led directions at `/a` `/b` `/c` whose every object was
hand-authored SVG.

Most recently, five photographic directions on Met sculpture photography —
Ultramarine, Nero, Bianco, Cava, Gesso — with five display serifs and a
compare board. **That build is still live on `main`, in the primary working
tree, and is being finished in a separate session.** Nothing here touches it.

This tree is a separate branch, `design/modern-three`, in its own worktree. It
exists because the user said plainly that they had not been happy with any of
the classical attempts, and supplied three modern reference sites instead. The
brief that replaced the old one, in their words: clean enough to get up and
running, professional, not too fancy.

The live build here is **three modern directions, one after each reference**,
compared side by side and flicked through. All three carry identical product
facts, the same offer and the same form; what varies is ground, density,
structure and one signature mechanic each.

- **`/1` — Meridian. THE CHOSEN ONE.** The studio, after Dali. Ultramarine,
  amber-orange action, Schibsted Grotesk, headline "Built to be seen." The user
  picked this direction and then pulled parts into it: the ultramarine and the
  headline from the build running alongside this one, the pill nav and the hero
  gradient from Plinth, and the sticky-sidebar showcase from the Dali
  reference. `/2` and `/3` are now reference material rather than candidates.
- **`/2` — Plinth.** The agency, after Omega. Warm white with **no chrome at
  all** — no card, border or shadow on the page — Archivo at 800 carrying the
  hierarchy alone. Its mechanic is the header contracting into a floating pill,
  and it owns the figures band.
- **`/3` — Lattice.** The product page, after Notus in light mode. Cool white
  on a ruled grid, blue-violet, bordered cells, nine sections. The densest of
  the three, and the only one with a bento grid.
- **`/` — the comparison surface.** All three live in iframes at a real device
  width. BOARD shows all three at once — at phone width they render 1:1, which
  five panels never allowed — and FLICK shows one at a time, stepped with the
  arrow keys, without unmounting the others. Flicking matters more here than it
  did before: two of the three are carried by scroll mechanics that do not read
  honestly in a shrunken panel.

**Decided:** Meridian ships. What is still open is only the cleanup — Plinth
and Lattice, their form skins, tokens, motion gestures and display faces come
out in one commit along with the board and the switcher, and Meridian moves to
`/`. `DESIGN.md` lists exactly what each deletion takes with it. They are being
kept alive for now so the user can still flick back and compare.

**Still to come from the user:** the hero images, generated in Higgsfield. The
slots are reserved and dimensioned.

**Unratified copy.** Two commitments in `content/site.ts` are not granted
anywhere in this document and predate the current build: the reply time
("within one business day", used in the form body and the success panel) and
the delivery estimates ("a couple of weeks", "four to six") in the FAQ. They
are operational promises rather than invented proof, so they have been left as
written rather than quietly softened — but they need the owner to confirm them
or they need to change.
