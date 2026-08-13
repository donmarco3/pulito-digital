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
- Pinned aesthetic (user-supplied references): classical and heritage —
  Greco-Roman sculpture, worked marble, carved detail, quarried stone.
  Described by the user as "elegant minimalism". The seven references supplied
  are all photographic: a deep-blue hero with a classical figure, a near-black
  luxury furniture house, a saturated-blue law firm behind a silver statue, a
  white-and-yellow sculpture exhibition, a dark "antique" page, a dark-blue
  page around a marble statue, and a light minimalist deck of Greek busts.
- **Photography only. No vector art, no illustration, no generated imagery.**
  This is the user's explicit instruction and it overrides everything the
  earlier builds assumed. It also decides the design system: when the only
  picture allowed is a photograph, the work moves into ground, crop, type,
  measure and rule.
- **Imagery must be free and easily obtained.** Sourced from The Met Open
  Access (CC0) and Wikimedia Commons (CC BY / CC BY-SA), downloaded into
  `public/img` rather than hotlinked. `public/img/CREDITS.md` records the
  licence per file. **Five files are CC BY-SA, which obliges attribution and
  share-alike on the resized derivatives in this repo** — a decision to make
  before this goes live commercially, not after.
- **The arch is no longer the pinned motif.** It was pinned for the previous
  build and the user has since replaced the reference set. Radius 0 holds on
  every direction, so the only curves anywhere are the ones inside the
  photographs.
- **Positioning is broad on purpose.** The headline says "digital marketing
  for premium craft", not "websites" and not "renovation builders": the work
  is web, search and automation, and the audience is premium craft generally.
  Adelaide is carried by the running header, the FAQ, the page title and the
  schema, never by the headline.
- All page copy lives in `content/site.ts`.

## History

Earlier builds, all deleted and all recoverable from git history: three dark
directions on stone/malachite, palazzo/gilt and porphyry/red (`2fe6377`); a
near-black page with a generated marble slab and three cursor behaviours
(`9e26ea5`); a light pair of a joiner's setout sheet and a museum catalogue;
and three arch-led directions at `/a` `/b` `/c` whose every object was
hand-authored SVG.

That last one is the one worth remembering, because this build is its
opposite. The user supplied a new set of photographic references and ruled out
vector art and illustration entirely, so the drawn arcade — the whole premise
of the previous world — went with it. **A page selling craft to people who
build things cannot argue for real material with a drawing of it.**

The live build is **five photographic directions**, compared side by side and
flicked through:

- **`/1` — Ultramarine.** The institution. A drenched blue ground with one lit
  marble head screened into it, Libre Caslon Display, asymmetric.
- **`/2` — Nero.** The house catalogue. Near-black and gilt, Bodoni Moda,
  symmetrical, the object lit out of the same darkness the type sits in.
- **`/3` — Bianco.** The auction catalogue. Cold paper, vermilion, EB Garamond
  at small display size, plates with references and a title block.
- **`/4` — Cava.** The quarry. Quarry dust and hi-vis orange, Archivo at 800 in
  tight capitals, the stone before it is anything.
- **`/5` — Gesso.** The cast court. Plaster grey with one acid signal,
  Bricolage Grotesque, type over full-bleed photography, and a hall of casts
  that scrolls sideways.
- **`/` — the comparison surface.** All five live in iframes at a real device
  width. Two modes, because they answer different questions: BOARD shows all
  five at once (phone width by default, which is both the reader's device and
  the only width at which five panels are legible), and FLICK shows one at a
  time, stepped with the arrow keys, without unmounting the others.

**Open decision:** which one ships. The four losers — their plates, their form
skins, their tokens, their motion gestures and their display faces — come out
in one commit along with the board and the switcher; `DESIGN.md` lists exactly
what each deletion takes with it. The winner moves to `/`.

**Unratified copy.** Two commitments in `content/site.ts` are not granted
anywhere in this document and predate the current build: the reply time
("within one business day", used in the form body and the success panel) and
the delivery estimates ("a couple of weeks", "four to six") in the FAQ. They
are operational promises rather than invented proof, so they have been left as
written rather than quietly softened — but they need the owner to confirm them
or they need to change.
