# Pulito Digital design system

Recorded from the built world, not from intention. Product truth lives in
`PRODUCT.md`.

This is MERIDIAN — the winner of a three-way comparison (PLINTH and LATTICE,
both fully built, both deleted in the consolidation commit on branch
`site/meridian`; `design/modern-three` still holds all three). The site is
being expanded from one landing page into a small multi-page site inside this
one system. Everything below describes what stands.

## The premise

**One offer, one voice, several pages.** The category default this world
refuses is the proof-shaped agency page: logo wall, testimonials, growth
stats, pricing table. The business is new, none of that is true, and
PRODUCT.md forbids inventing it. The free-preview offer does the persuading
on every page, and every page ends at the enquiry.

The world in one breath: ultramarine ground, a lot of air, hairline rules
between everything, bone ink, one BONE action on a monochrome page, Libre
Caslon Display at display scale, and the classical world present only as
weather — a generated arcade silhouette in the hero, parametric line-work
elsewhere.

## Tokens

Declared once in `@theme` in `app/globals.css`. Still named for the direction
(`bg-mer`, `text-mer-ink`) rather than renamed to something generic: the
prefix is the system's signature in the class soup, and a rename would churn
every file to say the same thing. Ratios are measured against the ground the
token is actually used on.

| Token | Value | Notes |
|---|---|---|
| `--color-mer` | `#12306e` | The ground. The ultramarine the user picked out |
| `--color-mer-2` | `#0d2454` | Recessed bands: the showcase and the CTA band. **No longer the enquiry panel** — the form is flat on the ground |
| `--color-mer-3` | `#081a3e` | Deepest: footer, and text on accent fills. **No longer the form fields** |
| `--color-mer-line` | `#2f4c8c` | 1.5:1. Decorative hairlines only |
| `--color-mer-line-strong` | `#8ba0c8` | 4.8:1. Field borders (WCAG 1.4.11), the menu toggle's ring |
| `--color-mer-ink` | `#f3f1ec` | 11.1:1 |
| `--color-mer-ink-soft` | `#bcc7de` | 7.4:1 |
| `--color-mer-sky` | `#122c79` | The hero picture's own sky, sampled off its top edge — see the hero notes |
| `--color-mer-accent` | `#f5f3ed` | 11.0:1. BONE — the page is monochrome and the action separates by FILL. `mer-3` sits on it at 15.9:1 |
| `--color-mer-accent-deep` | `#e2ded2` | Hover and pressed; the label holds 13.9:1 |
| `--color-mer-alert` | `#ffb3a7` | 8.8:1 on the enquiry panel. Validation errors |
| `--color-bone` | `#f7f7f5` | What sits on any dark or saturated fill |
| `--color-obsidian` | `#0b0b0e` | What sits on any light fill |

**The action has now been decided three times, and it is back where it
started.** Bone → verdigris → bone. It went to verdigris because a photoreal
travertine arcade made bone measure 1.09:1 against the hero; it came back
because that picture is gone — the hero is a dark silhouette whose brightest
pixel inside the text block is `#25438b`, and bone measures 9.8:1 on it. The
full argument is in `globals.css` over the token, kept in one piece because
the next person to reach for this deserves the reasoning rather than the
verdict.

**What it costs, accepted knowingly:** a near-white accent can only mark by
FILL. Everywhere the accent carried meaning as INK — link underlines, the
process numerals, the `Measured` fact lines, the active chip border — it now
sits a hair off `--color-mer-ink` and marks nothing. The hero's accent word
went with it (`headlineAccent` is empty; the mechanism is intact if a hue
returns). The error rose is the only hue left on the site, which is exactly
the state `--color-mer-alert` was introduced to survive.

## Type

Four faces, each with one job. **The heading review is CLOSED**: the owner
chose Libre Caslon Display on the live hero over the incumbent grotesk and
four other serifs (Instrument Serif, Fraunces, Bodoni Moda, EB Garamond —
all in git history with the `FontSwitch` review panel).

| Face | Role |
|---|---|
| Libre Caslon Display | HEADINGS, through the `display-face` utility. Transitional: sturdy, bookish, even in colour — institutional without being cold, and at home beside the Roman arcade |
| Schibsted Grotesk | CONTROLS and the nav — no longer the wordmark |
| Bodoni Moda | THE WORDMARK, and nothing else: 36px, tracking opened to `0.04em` rather than tightened, which is what a Didone at display size wants. A mark is not type, so it follows no role and is deliberately NOT wired to `--font-control` — swapping the control face should move the nav and the buttons and leave the name alone. 400, not the 100 the picker was left on: Bodoni Moda ships 400–900 and a browser cannot synthesise lighter than the lightest it has |
| Geist | Running text |

**Never Geist Mono** — the default-monospace tell of a generated page. It
reaches the site through `--font-measure` alone (consumed by `t-label`), so
replacing it is one line in `globals.css`. OPEN: what `t-label` wears
instead. Until that is decided the code still ships it, so this is the
outstanding job rather than a description of what stands.

The faces are indirections in `:root` — `--font-display`, `--font-control`,
`--font-body`, `--font-measure` — so each lives in exactly one place.
**Weight travels with the family**: Caslon ships a single 400, and a
synthesised 600 would smear its thin strokes, so no heading class carries its
own `font-semibold`.

Display sizes cap at `7.5rem` (the hero only; section headings at
`clamp(1.9rem,3.4vw,2.9rem)`, page titles at `clamp(2.6rem,6.5vw,4.8rem)`);
tracking never goes below `-0.04em`; body measure runs 52–68ch.

### The seven roles

Every string on the site wears one of seven role utilities, and **nothing
hard-codes a face, size, leading, tracking, case, alignment or measure any
more**: `t-h1`, `t-h2`, `t-h3`, `t-lead`, `t-body`, `t-label`, `t-control`.
`display-face` survives for the things that want the heading face without
h2's size — FAQ summaries, sibling-service links.

Each role's size is **a clamp times a scale**: a `--role-min / -fluid / -max`
triple, multiplied by `--role-scale` and by the global `--type-scale`.
Instances that legitimately differ override the triple **inline** — the
landing hero at `7.5rem`, a page title at `4.8rem`, the process numerals at
`11px`. That is what lets one control move the whole system while keeping
the hierarchy between instances intact.

Two shell utilities go with them: `shell` (the centred `--shell` column with
its responsive `--gutter`) and `band` (vertical padding times `--rhythm`),
which between them replaced fifteen copies of
`mx-auto max-w-[86rem] px-5 py-24 sm:px-8 sm:py-32`. Shape is two tokens:
`pill` (`--pill`) and `boxed` (`--box`), so radius moves from one place.

**Position is `translate`, never `transform`.** The entrances (`hero-arrive`,
`reveal`, `plate-open`) all animate `transform`; `translate` is a separate
property that composes with it, so a nudged heading cannot fight its own
entrance.

## Navigation

`components/MeridianNav.tsx`. The pill mechanic, grown into site navigation
when the site went multi-page.

- **The pill itself is unchanged and was fought for**: contraction 92rem to
  80rem only — "not so it shrinks, so it stays as a pill but almost a full
  length of the screen" — with the transition carried by the ends rounding,
  a hairline appearing, the ground going translucent and the blur switching
  on. Everything animates on one element over one duration. `max-width`
  moves between two explicit values because transitioning from `none` is a
  no-op in every engine.
- **Desktop (`md` up)**: three-column grid — Services ▾ / Process / About on
  the left, the wordmark dead centre (flex would centre it only by
  coincidence), the enquiry pill right. The current page's link is bright
  ink with `aria-current="page"`.
- **Services is a DISCLOSURE, not an ARIA menu**: a button with
  `aria-expanded` and a square hairline panel of plain links, fed from
  `site.services` so a re-slug cannot strand it. Three items need no roving
  tabindex. Closes on Escape, click-outside, and navigation.
- **The phone gets a real menu.** The old bar hid its links below `md`; a
  multi-page site cannot. The toggle is a pill with a drawn two-bar icon
  that crosses into an X (line-work in `currentColor`, like every other
  line); the sheet is a square panel hanging under the bar with the services
  under a mono group label, hairline rules between groups, and the contact
  line at the foot. It locks body scroll, closes on Escape (returning focus
  to the toggle), on navigation, and on the viewport growing past `md` —
  where it is `display: none` but would otherwise still hold the scroll.
- **While either panel is open the bar hardens** into its stuck state
  regardless of scroll position, so pill and panel read as one object.

## The hero

- **The text sits HIGH in the section**, hanging off the top of a `100svh`
  band rather than centred in it (`--hero-place: flex-start`). It arrived as
  three separate ~250px nudges in the tweak bar, which is what "this block
  should sit higher" looks like when the tool to hand is an offset; recorded
  as placement instead, because a fixed translate is the same distance on a
  laptop and on a tall monitor and rides under the nav on one of them.
- **The hero column is NARROWER than the site** — 79.5rem against 86rem, by
  overriding `--shell` on that one block. It is the room the picture needs:
  every other band is type on a flat ground and wants the full measure, this
  one is type over an arcade.
- **ONE action, not two.** The outlined "See how it works" is gone, and it
  can go because the showcase is the next thing under the fold — the reader
  arrives there by scrolling whether or not a button points at it.
  `site.ctaSecondary` still has consumers on the service pages, where the
  second action goes somewhere a scroll does not.
- **The headline runs unbroken** — see the accent note under Tokens.

## The footer

`components/SiteFooter.tsx`, shared by every page. Brand block, two link
groups under mono labels (Services, Studio), and the location/email line
under a hairline. Deepest ground (`mer-3`), no cards, no icons.

## Page anatomy

- **The landing page keeps the full pitch** (owner's decision): hero,
  problem+offer, the showcase, process, FAQ, enquiry. A cold visitor never
  needs to leave it.
- **The service pages are ONE CLAIM PER ROOM** — the structure chosen at
  the milestone-2 review (surface seed `c95ba129`, candidate 7 of the
  grounded list; brief in `.impeccable/surfaces/`). The page opens on a
  three-or-four-word claim at display scale with one word in the accent —
  the landing hero's own device, which is what makes the pages one
  family — then gives each of the service's three points an entire dimmed
  room: title at `clamp(2.1rem,4.6vw,3.7rem)`, the standing point body as
  the loud paragraph, a quieter `more` paragraph beneath (content rule:
  `more` may only deepen facts `site` or PRODUCT.md already grants). The
  middle room indents 22% at `lg` for rhythm; rooms are
  `sm:min-h-[72svh]` so a phone gets the pacing from the dim and the air,
  not from empty screens. A ruled two-cell row links to the sibling
  services, and the page ends at its OWN enquiry form — same proportions
  and panel as the landing page's, minus the contact list. Web design
  alone carries the ratified delivery estimate above the form. One dynamic
  route (`app/services/[slug]`), `generateStaticParams` off
  `site.services`, `dynamicParams = false`; claims split with
  `lib/headline.ts`, shared with the hero.
- **Process is THE DEEPENED LADDER** (seed `b80f7f55`, candidate 3; brief
  in `.impeccable/surfaces/`). Four full-width ruled bands, one per step,
  numerals earned twice over — the page is about the sequence. Each band
  pairs the standing step copy with a small `dl`: "You leave with" (the
  deliverable) and "Measured" (one mono fact line in the accent — ratified
  or granted numbers only, per the rule written above `site.process`).
  The signature beat is "Paid so far · $0" sitting inside Design, at the
  moment money would normally first change hands. Ends at its own enquiry
  form under `site.form` copy.
- **About is THE MIRROR** (seed `c5cdef18`, candidate 3; brief in
  `.impeccable/surfaces/`). Opening statement "You build the work. We
  build where it's seen." — "seen" takes the accent, closing the loop with
  the hero. Four ruled two-voice rows under the mono labels "On site" /
  "At the studio": the reader's craft in Caslon at statement scale, the
  studio's answering granted fact in running text. Never the founder.
  Closes with the studio's plain facts on the recessed ground, then
  `CtaBand` — now that band's only consumer.
- **Contact is the enquiry with its own address** — shaped directly, not
  rolled, because the interview specified it precisely: the landing
  enquiry section grown to a page (title + lede, then the words, the
  Email/Serving rows and the service-area line left, the recessed form
  panel right). It opens on the form because whoever lands here already
  decided to talk: it is the nav pill's destination from every page, and
  the footer's Contact link. In-page CTAs elsewhere still scroll to their
  local forms.
- **Privacy is the site's one Read surface, deliberately quiet**: no dim,
  no rooms, no statements — one title, a mono "last updated" line, and
  ruled running-text sections at 66ch. Copy lives in
  `meridian.pages.privacy` under the rule that a change to what the build
  collects changes the notice and its date together. Linked from the
  footer's bottom line.

## The drawing system

`components/Classical.tsx`. Three primitives, parametric, `aria-hidden`,
server components: `Arcade({bays})`, `Fluting({count})`, `Cornice()` (give it
an explicit width — as a replaced element, `inset-x` with `width: auto`
renders a stub). `HeroSlot` remains with its Meridian skin only; it currently
has NO consumer, kept because `meridian.heroSlot` records the 1600×900 aspect
and reinstating the hero plate should stay a one-line change.

## The hero picture

`public/img/hero-arcade-silhouette-2k.webp`, **2560 × 2060, 84 KB**,
generated (`nano_banana_pro`, image-to-image) from an authored control
drawing. Everything recorded about it remains true and load-bearing:

- **It is a silhouette as a legibility decision, not a mood.** Brightest
  pixel in the text box `#25438b` — 8.25:1 against the headline, 5.48:1
  against the subhead. The picture supplies its own shadow; the left-falloff
  gradient is deleted. Any future hero swap that reinstates a bright object
  in the left third brings that gradient back with it — measure the text box
  before changing the file.
- **The file is taller than what was rendered, on purpose**: the generated
  16:9 frame is the bottom 1434px; the 626px above is the picture's own flat
  top row repeated upward, so `object-cover` (anchored bottom, `lg` up)
  trims sky instead of arcade. Below `lg` it is `object-contain`, whole and
  small, over a section ground of `--color-mer-sky` sampled off the image's
  own top edge so the join cannot seam.
- **Two optimizer traps, both general to this repo**: (1) the optimizer
  caches variants against the source URL — replacing a file in place serves
  the stale variant; version the filename, or `rm -rf .next/cache/images`.
  (2) Next 16 ignores a `quality` prop not listed in `images.qualities` and
  falls back to 75, which bands gradient skies; `next.config.ts` allows
  `[75, 90]`, and any mostly-gradient hero wants `quality={90}`.
- **The geometry spec** (six arches, one baseline at y=752, raking cornice
  from (80,668) to (1600,168), crowns 16px below it, centres at x=175, 350,
  560, 810, 1105, 1420, cloud bank low, upper-left triangle left empty for
  the headline) is the record for any redraw.
- **Known limit: ultrawide.** Beyond ~2:1 the arcade tops crop; it needs a
  wider render, not a taller file.
- The **bloom** behind the nav is header furniture, not weather: literal
  white (never the accent — an accent swap must not repaint the sky), capped
  to the top 46vh, breathing on transform only (`bloom-breathe` — it once
  animated opacity and silently defeated every caller's opacity utility).

## Motion

Scroll-driven CSS; the one JavaScript mechanic is the rail-and-dim. A browser
without `animation-timeline` resolves every scroll-driven animation to its
finished state, so no support and no JavaScript both render the finished
page.

- **One entrance**: `reveal-clear` (rise + de-blur), scoped by
  `motion-clear` on each page root.
- **`hero-arrive`** — the single authored on-load moment per page, staggered
  by `--arrive-delay`. Inner pages reuse it on their title band.
- **`plate-open`** — kept in the stylesheet, currently unused (the hero
  plate it opened is gone). Leaves if the plate's return is ever ruled out.
- **`bloom-breathe`** — 14s transform-only pulse.
- **`stroke-in`** / **`rule-draw`** — line-work draws itself; keyed to
  `pathLength="1"` so dash values never need remeasuring.

Under `prefers-reduced-motion: reduce`, every animation resolves to its
finished state and the dimming switches off entirely.

## The showcase and the dim

Unchanged from the comparison build, and still the body of the landing page.

- **`components/Solutions.tsx`** — `min-w-0` on the aside is load-bearing: a
  grid item's implicit `min-width: auto` will not shrink below its content's
  min-content width, and the three `whitespace-nowrap` chips inside it —
  about 350px of them — pushed the whole showcase box wider than the page
  below roughly 380px, giving the DOCUMENT a horizontal scrollbar. The chips
  were always in an `overflow-x-auto` scroller; that is what lets them use
  it. A two-column grid: sticky left sidebar,
  tall panels right (`min-height: min(82vh,48rem)` is load-bearing — it is
  the scroll distance that makes the sticky column feel alive), and a
  scrollspy computed as a READ LINE: the active panel is the last one whose
  top has passed 30% down the viewport, a total function of scroll position
  that cannot go stale — an IntersectionObserver here marked the wrong panel
  because callbacks only see what CHANGED. Below `lg` the sidebar becomes a
  sticky chip bar under the nav (the reference's own mobile behaviour).
  Each panel now carries two exits: the conversion link (accent underline)
  and the service page link (quiet underline).
- **`components/SectionRail.tsx`** — one IntersectionObserver with
  `rootMargin: -45% 0px -45%` dims every landing-page section except the one
  being read. **0.72**, measured: body soft ink on this ground composites to
  4.60:1 at 0.72, and 0.70 fails 4.5:1. The paired `scale(0.985)` carries
  the depth. The showcase is deliberately NOT wrapped in a `DimSection`.

## The form

One `EnquiryForm`, one skin (`meridianSkin` — the two losing skins left with
their directions; the skin indirection stays because it keeps every class
that styles the form in one audited place). Pill submit; 16px inputs
everywhere because mobile Safari zooms on smaller and does not zoom back.
Labels and errors 4.5:1+, no `focus:outline-none` anywhere.

**It is FLAT ON THE GROUND.** The panel and the fields are both
`--color-mer`: nothing is recessed, and the only thing drawing a field is its
hairline. Fields were `mer-3` cut into a `mer-2` panel — a step darker than
their surround, on the reasoning that a lighter field reads as a raised card
and a darker one reads as a cut. Flattened by the owner, which is a
legitimate other answer: the form stops being an object sitting on the page
and becomes ruled lines drawn on it.

**What keeps it legal is the borders.** `mer-line-strong` measures 4.8:1 on
this ground, so the fields still clear WCAG 1.4.11's 3:1 for non-text UI on
their own — which they have to, now that fill carries none of that job. Any
future move on `--color-mer-line-strong` has to be measured against
`--color-mer`, not against `--color-mer-2`. One skin, four consumers: the
landing page, /contact, /process and every service page changed together.

**The submit is LIVE** (Web3Forms, key in `.env.local` — see PRODUCT.md
for the key's status) with three ends: the success panel that takes focus,
a `role="alert"` failure line in the error rose whose mailto IS the
recovery (fields keep their values, the button re-arms), and a keyless
fallback that acknowledges locally so review builds work end to end.

The enquiry section's contact list has TWO rows — Email and Serving. The
phone row was removed when the owner confirmed email-only contact; git
history has it.

## Accessibility

- Skip link on every page, off-screen until focused, never `display: none`.
- `:focus-visible` uses `currentColor` at 2px with a 3px offset — one ring
  that survives every ground and fill.
- `aria-current="page"` on nav links; `aria-expanded`/`aria-controls` on
  both disclosure buttons; the drawn icons are `aria-hidden` and the buttons
  carry real labels.
- Anchor targets clear the sticky header (`scroll-margin-top: 6rem`).
- The drawing primitives are `aria-hidden`; label/value pairs are `<dl>`s.

## The tweak bar

`components/TweakBar.tsx`, over `tweak/schema.ts` (what can be moved) and
`tweak/dom.ts` (how one element is addressed). **Development only, or
`?tweak` on a deployed URL.** `T` opens and closes.

Two modes, because design arguments come in two sizes.

**SYSTEM** moves the tokens: the palette, the four faces, all seven roles'
size/leading/tracking/case/alignment/nudge, the hero block's placement, the
shell, the two radii and the dim. One control changes every instance.

**ELEMENT** is the other half. Turn on Edit, click a thing, and get controls
for that thing alone — rewrite its copy in place, recolour it (including
taking the accent off one word), change its face and size, move it, or take
it off the page. ⌘-click a link to navigate while it is on.

- **System mode writes CSS custom properties, never React state**, so the
  site repaints without re-rendering and every page stays a server component.
  This is the only client component in the tree, and a visitor never pays for
  it.
- **Element mode writes inline styles, addressed by PATH** — a tag-and-index
  chain from `<body>`, scoped to the page it was made on. An edit cannot hold
  a DOM node, because the node is gone the moment React re-renders. It works
  because every page here is statically rendered from fixed content, and the
  resolver returns `null` rather than guessing when a step stops matching.
- **The stylesheet holds the design; the bar only overrides.** Delete it and
  the site is pixel-identical — the property that makes it safe to keep.
- **Nothing is destroyed.** Removing hides; every element's pristine state is
  captured before it is first touched. Rewritten COPY is put back by
  reloading rather than from that map, because the true original markup only
  exists on the server — and Fast Refresh empties module state without
  remounting, so a memory-only restore would faithfully restore the edit.
- **Copy is applied before style, shallowest first.** Writing `innerHTML`
  recreates every descendant, so a parent's rewritten text would otherwise
  throw away a child's colour — which is the normal order to work in:
  recolour the accent word, then fix the typo above it.
- **The contrast panel re-measures on every change**, including the dimmed
  row, because the ratios recorded in this file are the thing a colour picker
  would otherwise silently destroy. It reproduces every number in the token
  table above.
- **The extra faces are not in the bundle.** Twenty-seven are offered; each is
  fetched from Google on first selection. Export says so — a face this bar
  loaded exports as an instruction to add it to `app/layout.tsx` with
  `next/font`, not as a declaration that would preview fine and break the
  build.
- **Export writes a paste-ready `:root` block** for the tokens, and lists each
  element edit against a description you can search the source for.
- Hydration hangs off `subscribe`, not a mount effect: Fast Refresh
  re-evaluates the module and resets its singleton without remounting, so an
  effect-based version vanishes the first time you edit a file — which is
  exactly when the tool is in use.

## Review scaffolding

The tweak bar, and nothing else. The compare board, the direction switcher,
`--switch-bar` and its clearance consumers went with the consolidation;
`FontSwitch` and the four losing serifs went when the heading face was
decided. The bar stays because it is not tied to one open question the way
those were, and because it costs a production visitor nothing.
