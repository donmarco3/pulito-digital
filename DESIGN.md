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
between everything, bone ink, one verdigris action, a newspaper grotesk at
display scale (under review, below), and the classical world present only as
weather — a generated arcade silhouette in the hero, parametric line-work
elsewhere.

## Shape

**Actions are pills, structure is square.** The nav bar and every button are
pills, because a square control inside a pill bar reads as an oversight.
Everything that holds content — the showcase box, its panels, the form
fields, the nav's dropdown and mobile sheet — keeps radius 0. One rule, and
it says which things can be pressed.

**Elevation is one soft shadow, on floating nav furniture only**: the pill
bar when it is hardened, and the two panels that hang from it (the services
dropdown and the mobile sheet), which are nav furniture and wear the same
shadow token. Nothing else on any page casts one.

## Tokens

Declared once in `@theme` in `app/globals.css`. Still named for the direction
(`bg-mer`, `text-mer-ink`) rather than renamed to something generic: the
prefix is the system's signature in the class soup, and a rename would churn
every file to say the same thing. Ratios are measured against the ground the
token is actually used on.

| Token | Value | Notes |
|---|---|---|
| `--color-mer` | `#12306e` | The ground. The ultramarine the user picked out |
| `--color-mer-2` | `#0d2454` | Recessed bands: the showcase, the enquiry panel, the CTA band |
| `--color-mer-3` | `#081a3e` | Deepest: footer, form fields, text on accent fills |
| `--color-mer-line` | `#2f4c8c` | 1.5:1. Decorative hairlines only |
| `--color-mer-line-strong` | `#8ba0c8` | 4.8:1. Field borders (WCAG 1.4.11), the menu toggle's ring |
| `--color-mer-ink` | `#f3f1ec` | 11.1:1 |
| `--color-mer-ink-soft` | `#bcc7de` | 7.4:1 |
| `--color-mer-sky` | `#122c79` | The hero picture's own sky, sampled off its top edge — see the hero notes |
| `--color-mer-accent` | `#43b0a0` | 4.75:1. Verdigris. The action; `mer-3` sits on the fill at 6.5:1 |
| `--color-mer-accent-deep` | `#359287` | Hover and pressed; the label holds 4.6:1 |
| `--color-mer-alert` | `#ffb3a7` | 8.8:1 on the enquiry panel. Validation errors, and nothing else |
| `--color-bone` | `#f7f7f5` | What sits on any dark or saturated fill |
| `--color-obsidian` | `#0b0b0e` | What sits on any light fill |

**One accent, and it marks what the reader can act on.** Buttons, the submit
control, link underlines, the active state in the nav's panels, focus-state
field rules, and one word of the hero headline (`headlineAccent` in
`content/site.ts`). The accent-as-text works because the accent is a HUE —
it was bone once, and bone lettering beside bone lettering marked nothing.
`globals.css` carries the full history of that reversal.

**The error rose is the one other hue.** Soft rose rather than signal red,
shown only on failure, so a reader who has just been rejected by a form can
see which line is the rejection. The invalid border stays quiet so field and
message are not both shouting.

## Type

Four faces, each with one job. **The heading review is CLOSED**: the owner
chose Libre Caslon Display on the live hero over the incumbent grotesk and
four other serifs (Instrument Serif, Fraunces, Bodoni Moda, EB Garamond —
all in git history with the `FontSwitch` review panel).

| Face | Role |
|---|---|
| Libre Caslon Display | HEADINGS, through the `display-face` utility. Transitional: sturdy, bookish, even in colour — institutional without being cold, and at home beside the Roman arcade |
| Schibsted Grotesk | CONTROLS, the nav and the wordmark. A serif at 15px inside a pill button would be worse than the grotesk, so the grotesk keeps every job below display scale |
| Geist | Running text |
| Geist Mono | Measurement only: process numerals, the mono group labels on contact rows, the footer and the mobile sheet. Never a costume |

`display-face` reads `--font-display` and `--font-display-weight` from
`:root` in `globals.css` — still the single point of indirection, so the
face lives in exactly one place. **Weight travels with the family**: Caslon
ships a single 400, and a synthesised 600 would smear its thin strokes, so
no heading class carries its own `font-semibold`.

Display sizes cap at `7.5rem` (the hero only; section headings at
`clamp(1.9rem,3.4vw,2.9rem)`, page titles at `clamp(2.6rem,6.5vw,4.8rem)`);
tracking never goes below `-0.04em`; body measure runs 52–68ch.

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
- **Process and About share the scaffold pattern for now**: title + lede
  band under the fixed nav (`pt-40`/`pt-44` clears it), hairline-ruled
  content, then `components/CtaBand.tsx` linking back to `/#enquiry`. Both
  are **first-draft scaffolding** and get their full pass in milestone 3.
  `CtaBand` stays their close; the service pages outgrew it.

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

- **`components/Solutions.tsx`** — a two-column grid: sticky left sidebar,
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
that styles the form in one audited place). Square fields cut into the
recessed panel, darker than their ground (a cut, not a card); pill submit;
16px inputs everywhere because mobile Safari zooms on smaller and does not
zoom back. Field borders 4.8:1, labels and errors 4.5:1+, no
`focus:outline-none` anywhere. The demo submit and `lib/leadForm.ts` are
unchanged; the real endpoint is a recorded plan (PRODUCT.md).

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

## Review scaffolding

None left. The compare board, the direction switcher, `--switch-bar` and its
clearance consumers went with the consolidation; `FontSwitch` and the four
losing serifs went when the heading face was decided. The world carries no
furniture that is not the site's own.
