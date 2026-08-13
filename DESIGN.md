# Pulito Digital design system

Recorded from the built world, not from intention. Product truth lives in
`PRODUCT.md`.

Five directions are live at once, deliberately. `/` is the comparison surface;
the directions are at `/1` … `/5`. They share one stylesheet, one copy file,
one form and one set of accessibility rules, and they differ in ground, accent,
lettering, structure, motion and — because the user asked for it — voice. Four
of them get deleted once the comparison is settled; until then, anything
written here that says "every direction" is a shared commitment and anything
scoped to one is not.

## The premise all five share

**Every picture is a photograph of a real carved or quarried object.** No
vector art, no illustration, no generated imagery, no icon set. That is the
user's instruction and it is the single decision the whole system falls out of:
when the only picture you are allowed is a photograph, the design work moves
into ground, crop, type, measure and rule, which is why the five are told apart
by what they *do to* a photograph rather than by what they draw next to one.

The direction this replaced was the opposite — three arch-led pages whose every
object was hand-authored SVG. It is recoverable from git history. The reason it
went is worth keeping: **a page selling craft to people who build things cannot
argue for real material with a drawing of it.**

**Radius 0, everywhere, on all five.** The only curves anywhere are the ones
inside the photographs. A rounded button would put a second kind of curve on
the page and immediately make the first kind decorative.

| | World | Ground | Accent | Display face | What the photograph does |
|---|---|---|---|---|---|
| `/1` | **Ultramarine** — the institution | Drenched blue | Warm bone | Libre Caslon Display | One lit head *screened* into the ground, standing in the page |
| `/2` | **Nero** — the house catalogue | Near-black | Gilt | Bodoni Moda | The object lit out of the same darkness the type sits in |
| `/3` | **Bianco** — the auction catalogue | Cold paper | Vermilion | EB Garamond | Framed, captioned plates; nothing knocked out |
| `/4` | **Cava** — the quarry | Quarry dust | Hi-vis orange | Archivo 800 | Full-bleed daylight, ungraded; the material before it is anything |
| `/5` | **Gesso** — the cast court | Plaster shadow | Acid | Bricolage Grotesque | Driven to grey, type set *on* it at full bleed |

## Tokens

Declared once in `@theme` in `app/globals.css`, named for the direction rather
than the hue — `bg-ultra`, `text-nero-bone`, `border-cava-rule` — because while
five worlds share one stylesheet, the useful thing to know at a glance is which
page a class belongs to.

Contrast ratios are measured against the ground each token is actually used on
and recorded beside the value. A token that only clears on the base ground is
not allowed on the recessed one without being rechecked.

| Direction | Ground | Recessed | Rule (strong) | Text | Soft text | Accent |
|---|---|---|---|---|---|---|
| Ultramarine | `#12306e` | `#0d2454` | `#8ba0c8` 4.6:1 | `#f3f1ec` 11.4:1 | `#bcc7de` 6.4:1 | `#e8e3d6` 10.8:1 |
| Nero | `#0b0b0c` | `#141416` | `#7d7669` 4.5:1 | `#efece4` 16.4:1 | `#a9a396` 7.6:1 | `#c9a227` 8.4:1 |
| Bianco | `#f6f6f4` | `#ececea` | `#6b6b66` 4.9:1 | `#17171a` 15.4:1 | `#56565a` 6.9:1 | `#b4321c` 5.4:1 |
| Cava | `#ddd8d0` | `#cbc4b9` | `#6a6157` 4.8:1 | `#1b1916` 13.7:1 | `#554e45` 6.4:1 | `#b8410e` 5.1:1 |
| Gesso | `#2a2a28` | `#1e1e1c` | `#8c8a80` 4.6:1 | `#edece6` 12.1:1 | `#a8a69c` 6.3:1 | `#d6e34a` 10.4:1 |

Shared: `--color-bone` `#f4f1ea` sits on any dark accent fill; `--color-obsidian`
`#121214` on any light one (bone, acid, signal).

**Never knock a soft token down with alpha.** Every photo credit line on the
site was once `*-soft/70`, which took sound 6.3–7.6:1 tokens to 3.7–4.4:1 — and
those lines carry the CC BY / CC BY-SA attribution, so the copy with a legal
obligation attached was the least legible on the page. If a label reads too
loud, make it smaller; do not fade it.

**One accent per direction, and the rule it keeps is a hierarchy, not a
prohibition.** The accent also marks section eyebrows, step numerals and lot
references on the directions that use those. What is guaranteed everywhere is
that **the only FILLED instance of an accent on any screen is a control** —
everything else it touches is an 11px label or a numeral, so the button wins on
area by an order of magnitude and the single conversion event keeps its
meaning. Nero is the case that proves the boundary: it has no red anywhere,
including in its form errors, which are set in `gilt-bright`.

Every accent is its own boundary on its own ground — a fill needs no hairline
around it to satisfy WCAG 1.4.11.

## Type

Five display faces, one per direction, plus two shared workhorses. All seven
load at the root in `app/layout.tsx`, because the compare board puts all five
on one screen at once and a route-scoped face arrives late into its panel
there. That is a review-stage cost, paid deliberately; **four fifths of it
comes out of that file on the day a direction is chosen.**

- **Libre Caslon Display** — `/1`, a real Caslon cut for headlines.
- **Bodoni Moda** — `/2`. A didone's thick and thin only exist above ~60px, and
  it is the only thing that holds against gilt on black.
- **EB Garamond** — `/3`, a book face, because a catalogue is a book. This is
  the only direction whose display size is small on purpose: a catalogue's
  authority comes from its margins and its consistency, not from its type size.
- **Archivo 800** — `/4`, tight capitals with enough weight to survive being
  set over a quarry face in full sun.
- **Bricolage Grotesque** — `/5`, optical-size aware, holds an enormous size
  without turning into a logo.
- **Geist / Geist Mono** — running text everywhere, and the measured voice for
  lot references, schedules and credits.

If the faces are ever split back onto their own routes, the trap fails
silently: `@theme` declares `--font-caslon: var(--font-caslon-src), …` on
`:root`, and a custom property is substituted at computed-value time **on the
element it is declared on**. Move a face variable off `<html>` and the `:root`
declaration references something that does not exist there, so the token
computes to the guaranteed-invalid value and inherits as empty into every
descendant — wordmark and all — with no error anywhere.

**No kicker above any heading, on any direction.** All five once carried a
tracked "Web, search and automation" line over the `h1`, and all five then said
the same thing again in the subhead one element later, so the label was not
even paying for itself in information.

**Authored line breaks are a desktop decision and are applied only there.**
`BrokenHeadline` in `components/Reveal.tsx` renders `headlineLines` above `sm`
and the single `headline` string with `text-balance` below it. Forced onto a
390px screen the desktop breaks re-wrapped into five and six lines with
two-word orphans stranded on their own — a worse rag than the browser produces
unaided.

## Structure

Each direction argues with a different arrangement, not a different palette on
one arrangement. The failure this is guarding against is real and was caught in
review: Cava and Gesso were briefly one page in two colourways, identical
section for section, which cost a fifth of the comparison.

- **`/1`** divides with hairlines; services are ruled rows, never cards.
- **`/2`** is symmetrical and ceremonial; everything centres and the display
  type overlaps the plate beneath it the way a title page overlaps a
  frontispiece.
- **`/3`** is a single-pixel gap grid of plates with references and a title
  block `<dl>`; the whole page is a catalogue's furniture.
- **`/4`** is a schedule: a 2×2 services grid with drawn boundaries, and a
  vertical **setout** for the process — reference, item, description, ruled off.
- **`/5`** is **the hall**: services are a sideways snap-scrolling register of
  four tall plaster plates, photograph large and type small. It is the only
  section anywhere on the site that moves horizontally, and the plates are
  deliberately objects that appear on other directions, driven to grey — a cast
  court is full of accurate copies of things that exist somewhere else, and so
  is that row.

None of the five may become a card grid.

**Known and open:** all five still share one section *sequence* (hero →
problem → services → process → offer → enquiry → FAQ). That is defensible as a
controlled comparison — same content, five treatments — but it is the reason
the set can read as one template with five skins, and it is recorded here
rather than argued away.

## Photograph treatments

Every treatment is CSS over an untouched file, never a baked-in edit, so
swapping a picture never means re-exporting anything.

- **`plate-screen`** — museum object photography arrives on a near-black
  sweep; `screen` throws the sweep away and leaves only the lit stone, so the
  object stops sitting on a rectangle and starts standing in the page. **This
  only works on plates shot against a near-black ground.** Screening a mid-grey
  sweep over a coloured ground leaves a pale rectangle hanging in the page,
  which is why `/1`'s full figure is framed rather than screened.
- **`plate-vignette`** — `screen` fully erases only a pure-black sweep, and
  museum sweeps lift towards the top of frame. The mask dissolves the frame
  edge so the residue has no straight line to draw. It is authored as a mask
  rather than a gradient overlay, because an overlay would sit *on* the
  photograph and grey the stone it is meant to rescue.
- **`plate-duotone`** — `luminosity` over a wrapper carrying the ground's own
  fill. `/1`'s framed plate read as a hole punched in the blue until it took
  the page's hue and kept only the photograph's lightness. **The wrapper must
  carry the fill**; `luminosity` over nothing does nothing.
- **`plate-gesso`** — `grayscale(1) contrast(1.06) brightness(0.5)`. The
  darkening is not mood: `/5` is the one world that sets type *on* its
  photograph at full bleed, so the picture is also the type's background, and
  warm plaster at full value put bone lettering at about 1.3:1.
- **`plate-cava`** — `saturate(.86) contrast(1.06)` and nothing else, because
  that direction's argument is that the material is already right.

**A scrim covers the type's own band, never the frame.** `/5` briefly ran two
washes at full height which compounded to nearly opaque and took the whole
picture with them. A hero photograph that renders as a black rectangle is worse
than no photograph, because the page still pays for it.

**Every `<Image>` carries its direction's recessed-band colour behind it**, so a
bad site-visit connection shows the world's own ground rather than a blank box.

## Motion

All CSS. No React state for a continuously changing value, no scroll listeners,
no pointer listeners. Each direction gets one authored load moment plus
`Reveal` for sections.

**One entrance per direction, not one for the whole site.** Every section of
all five once rose identically, which flattened each page and — on a build
whose entire purpose is a comparison — erased motion as an axis the five could
differ on. Each direction declares its gesture on its root and every `.reveal`
inside inherits it:

| | Class | Gesture |
|---|---|---|
| `/1` | `motion-settle` | Settles down under its own weight |
| `/2` | `motion-develop` | Develops up out of the dark, like its plates |
| `/3` | `motion-turn` | Turns a page in from the side |
| `/4` | `motion-setout` | Sets out left to right along a rule |
| `/5` | `motion-cast` | Comes up soft and sharpens, the way a cast leaves its mould |

`plate-develop` brings a hero plate up out of nothing to full value, the way a
print comes up in a tray — the vocabulary photography actually has, since
nothing on these pages is drawing.

**The reveal's failure mode is the rule worth keeping.** It was a Framer Motion
component with `initial={{ opacity: 0.25 }}`, which put `opacity:0.25` on every
section below the hero in the server-rendered HTML, where nothing removed it
until the bundle arrived. Body copy at 25% measures 1.41:1. The comment
justified the 0.25 as insurance "so nothing is invisible if the observer never
fires", which was the bug wearing the mitigation's clothes. The CSS version
cannot fail that way: a browser without `animation-timeline` drops that one
declaration and is left with a zero-duration animation under `both` fill, which
resolves immediately to the finished state.

**Any future entrance animation must be verifiable in the built HTML.** Grep the
output for a hidden initial state; if a block ships hidden and only a script can
reveal it, it is a bug regardless of how the animation is written. The current
build ships no inline `opacity` at all.

Under `prefers-reduced-motion` every animation is forced off and the resting
state each ends on is the composition. `filter` is reset there explicitly,
because `reveal-cast` and `reveal-develop` animate it and would otherwise
leave `/5` and `/2` resting blurred or at 40% brightness. `letter-spacing` is
settled in a **separate** rule from the animation reset: it inherits, so
folding it into the shared selector would put a tracking value on every
`.reveal` wrapper and from there into every descendant, re-wrapping the whole
page for reduced-motion readers alone.

## Accessibility rules this system holds to

- Body text ≥4.5:1, large text ≥3:1, non-text UI boundaries ≥3:1, measured
  against the ground each element actually sits on. Where type sits over a
  photograph the measurement is taken from the **rendered background with the
  text hidden**, at its lightest patch — sampling the text's own box measures
  the glyphs, not what they sit on.
- Nothing sets `focus:outline-none`. The `:focus-visible` ring is
  `currentColor`, because the same ring has to survive on ultramarine,
  near-black, cold paper, quarry dust and plaster shadow and on top of five
  different accent fills; any single hue fails on at least one.
- An invalid field carries the error in its own border as well as in the
  message beneath it.
- **Form fields are 16px minimum in every skin.** Mobile Safari zooms the
  viewport when a field under 16px is focused and does not zoom back out.
- Submitting unmounts the form and the button that had focus with it, so the
  success panel takes `tabIndex={-1}` and is focused on mount. `role="status"`
  announces the outcome without moving anyone to it.
- Every direction carries a skip link, moved off-screen by transform and never
  by `display: none`.
- The heading order starts with the positioning line, not the wordmark. One
  `h1` per page, no skipped levels — verified on all five.
- Process steps are `<li>` elements carrying `.reveal` directly. Wrapping them
  in the `Reveal` div would put a `div` between `<ol>` and `<li>`, which is
  invalid and drops the list semantics a screen reader uses to announce
  "step 2 of 4".
- **A horizontal scroller takes `tabIndex={0}`, `role="group"` and a label.**
  `/5`'s hall once asserted in a comment that "every item is in the tab order"
  while its items held nothing focusable at all, resting keyboard reach on a
  browser heuristic Safari does not implement. The region itself takes focus so
  it can be driven with the arrow keys.
- The disclosure marker is a typographic `+`, not an icon. The brief rules out
  vector art, and an icon set is vector art with a licence attached.
- `color-scheme: light` on the root so native selects and the scrollbar match.
- `scroll-margin-top: 6rem` and `scroll-margin-bottom` clearing the review bar
  on all ids.

## Responsive rules earned the hard way

- **`/1` puts the plate before the headline on a phone.** The picture is the
  argument, and burying it below three screens of type would be making the case
  everywhere except where it is read.
- **`/3`'s frontispiece is `order-first` below `lg` and cropped 4:5.** Left in
  source order its phone fold was headline, rule, subhead, action and a
  four-cell metadata grid — a spec sheet, on the one direction whose contract
  says it opens on a photograph. At native ratio the plate ate 530px of an
  844px screen.
- **An attribution is shortened, never truncated.** `/4`'s hero credit was
  clipped to `CC BY-S…` on a phone, with a `title` attribute defended as the
  fallback — `title` is not reachable on touch, and the severed token was the
  licence name on a CC BY-SA image.
- **The review bar reserves its own space.** `--switch-bar` is declared on
  `html` and consumed by every direction's root as bottom padding. Without it
  the fixed bar sat across the hero's primary action at 390px: scaffolding
  covering the one control the page exists to offer.

## Content

Every visible string lives in `content/site.ts`, in two halves, and the split
is the point. `site` is **product truth** — services, process, offer, FAQ,
form — identical on all five, because those are facts about the business and a
comparison that let them drift would be comparing two things at once.
`directions` is **voice** — headline, problem, section names — which varies per
direction because the user asked for it, but only where wording is a design
decision rather than a claim. The five headlines say the same true thing in
five registers; no direction gets a fact the others are denied.

Standing constraints from `PRODUCT.md`: no testimonials, logos, ratings or
client numbers; no pricing in any form; Australian English; Adelaide carried by
the header, FAQ, title and schema rather than by a headline.

`/3` is the direction that looks most like a document of record, so every cell
in its title block is a fact `PRODUCT.md` already states. A catalogue that
invents a provenance, an estimate or a date is the most convincing lie
available.

**Open:** two commitments in `content/site.ts` predate this build and are not
granted by `PRODUCT.md` — the reply time ("within one business day") and the
delivery estimates ("a couple of weeks", "four to six"). They are operational
promises rather than invented proof, so they were left as written rather than
quietly softened. They need the owner to confirm them or they need to change.

## Photography

Fourteen files in `public/img`, all free-licence, downloaded rather than
hotlinked so the build carries no CDN dependency and no layout shift.

- **Nine CC0** from The Met Open Access — no obligation.
- **Five CC BY / CC BY-SA** from Wikimedia Commons. The resize made every file
  in this repo a derivative, and **CC BY-SA obliges a derivative to carry the
  same licence**, so those files cannot quietly become proprietary site assets.
  The visible credit in each footer discharges attribution; the share-alike
  terms are a decision to make before this goes live commercially.

`public/img/CREDITS.md` records licence, author and source per file. Alt text
describes the object, never the treatment: a screen reader user gets told there
is a marble Diadoumenos; being told it has been screened into an ultramarine
ground tells them about CSS, not about the page.

**Subject choice is a design decision, not just a licence one.** `/3` originally
led with a full-frontal standing nude at the largest scale on the page. This is
a cold page opened on a phone on a building site, sometimes with a client
present, so it now leads with a draped torso, which carries the identical
classical argument and asks less of the reader.

## The enquiry form

`components/EnquiryForm.tsx` with five skins in `components/skins.ts`. Four
fields, matching the "Four fields" promise in the copy. Markup, validation,
accessibility wiring and the demo-only submit are shared, so the directions can
never drift apart on how the enquiry actually works — and so whichever one
wins, the form is already the tested one. **A skin may only change class
strings.**

Demo-only: it validates, focuses the first invalid field after paint, shows a
success panel, and issues no network request. The single `TODO` in
`lib/leadForm.ts` marks where a real endpoint attaches. Wiring it means the page
starts collecting personal information and needs a privacy notice.

## Routes and review furniture

| Route | What it is |
|---|---|
| `/` | The comparison surface. `noindex` |
| `/1` … `/5` | The five directions. All `noindex` |

All six routes are `noindex`. The real site is one page, and five half-built
directions competing with it in a search index is the one way this comparison
could do actual damage.

Everything on this list is scaffolding and comes out when a direction is
chosen: `app/page.tsx`, `components/CompareBoard.tsx`,
`components/DirectionSwitch.tsx`, the four losing directions' page files, their
skins, their tokens, their motion gestures and their faces in
`app/layout.tsx`. The winner moves to `/`.

**`DirectionSwitch`** is a fixed bar on each direction. `1`–`5` jump and `←` /
`→` step, wrapping — number keys are for going somewhere specific, the arrows
for the actual comparing motion, which is riffling back and forth through
neighbours without deciding anything yet. It stands down inside a field or a
contenteditable, and it hides itself inside the compare frames through
`useSyncExternalStore` so the server snapshot and the first client render agree
and the bar is never painted into the panels. Below `sm` it shows numerals
only; five names at 11px tracked do not fit 390px however they are cut, and the
full name stays on each link's accessible name.

**`CompareBoard`** renders the five as live iframes at a real device width.

- **Iframes, not inline components.** Each direction defines its own colours,
  display face and sticky header and is written assuming it owns the viewport.
  Rendered inline into one document they would fight over `position: sticky`,
  over `100svh`, over `:focus-visible`, and over any width-keyed `@media`
  query — five columns on a 27" screen are phone-width, so every direction
  would show its mobile layout and the comparison would be of the wrong thing.
- **Two modes, because they answer different questions.** BOARD shows all five
  at once, for "which of these is a different kind of thing". FLICK shows one
  at a time, stepped with the arrow keys, for "which of these is actually
  good" — which cannot be answered at 20% scale. The frames are never
  unmounted between modes, so flicking keeps every panel's scroll position and
  the comparison is between two things you have both just read.
- **Phone is the default width.** It is the reader's device, and it is the only
  width at which five panels are worth looking at: five 1440px frames across a
  1440px window run at 0.19 and stand 176px tall. Five 390px frames run at
  ~0.69 and stand ~580px. Desktop width therefore caps at two columns and
  scrolls. **The iframe is never stretched past its device height** to show more
  page — every `svh` inside it would then be measuring a viewport no reader
  has, and this board's whole job is to show what ships.
- **Scale is measured from a real column** with a `ResizeObserver`, capped at
  1:1. A phone frame scaled *up* is a blurrier, larger-than-life thing that is
  no longer what the reader would see.
- **The scroll lock is driven by a 40ms timer polling the frames**, and the two
  builds it replaced are the reason. A `scroll` listener inside each frame is
  the obvious build and does not work: a scaled, transformed iframe does not
  reliably fire scroll events to its own window, measured here as `scrollY`
  moving to 2200 while both a window-level and a document-level listener
  counted zero. A `requestAnimationFrame` poll has the same shape of problem:
  rAF is tied to the compositor and does not tick in a headless or
  non-painting context, which is exactly where this board gets checked. **A
  control whose whole job is to be trusted while a decision is made is built on
  the mechanism that cannot silently do nothing, not the one that is nominally
  more correct.**
- Frames are locked by scroll **fraction**, not by pixel, because the five
  pages have different section heights and pixel-locking compares the hero of
  one against the FAQ of another. Followed frames move with
  `behavior: "instant"` — every direction sets `scroll-behavior: smooth`, and a
  followed frame still animating on the next tick reads as the driver, so the
  five chase each other down the page.

`DirectionContract` is retained but **not currently mounted**. The direction
contract is emitted instead from `app/layout.tsx` as a real HTML comment, first
child of `<body>`, and it survives the production build — verified by grepping
the built output for the seed key.
