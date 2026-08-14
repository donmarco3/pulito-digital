# Pulito Digital design system

Recorded from the built world, not from intention. Product truth lives in
`PRODUCT.md`.

Three directions are live at once, deliberately. `/` is the comparison board;
the directions are at `/1`, `/2` and `/3`. They share one stylesheet, one copy
file, one form, one drawing system and one set of accessibility rules. Two of
them get deleted once the comparison is settled; until then, anything written
here that says "every direction" is a shared commitment and anything scoped to
one is not.

This world replaced a classical/photographic one. That build — five directions
on Met sculpture photography, five display serifs, marble and arch grounds —
is not here; it lives on `main` and in the other working tree. Nothing from it
survives except the arch, and the arch survives as line-work.

## The premise all three share

**One offer, three kinds of page.** The user supplied three reference sites and
asked for one direction after each. What the references share is a modern
grotesk at scale, real motion and tight component craft. What they do not share
is ground, density or shape language — and that is the comparison. A reader
choosing between these is choosing what kind of page they want to be, not which
palette they prefer.

The category default all three refuse is the proof-shaped SaaS page: logo wall,
testimonials, growth stats, pricing table. The business is new, none of that is
true, and PRODUCT.md forbids inventing it. The offer does the persuading
instead.

- **1 MERIDIAN (`/1`) — the studio. THE CHOSEN DIRECTION.** Ultramarine, a lot
  of air, and a sticky-sidebar showcase for the body. The user picked it, then
  pulled pieces into it from the other two and from the references, so it is no
  longer one of three equals — it is the page being built, and `/2` and `/3`
  are kept only so they can still be flicked back to.

  What came from where: the ground is the ultramarine from the build running
  alongside this one, the user's own pick. The action is verdigris, arrived at
  over two rounds of review — bone, then the warm metals, then a set probing
  hue and saturation. `globals.css` carries the reasoning. The headline is their line. The pill nav and the
  hero gradient came across from PLINTH. The body is the reference's solutions
  section, rebuilt from its stylesheet.
- **2 PLINTH (`/2`) — the agency.** Warm white, and **no chrome at all**: not
  one card, border, shadow or box on the page. Structure is carried by tonal
  bands and by Archivo at 800. The header contracts into a floating pill on
  scroll. Medium length.
- **3 LATTICE (`/3`) — the product page.** Cool white on a ruled grid,
  blue-violet, and **entirely chrome**: bordered cells, soft corners, shared
  hairlines. The densest of the three, nine sections.

**Two of the three are light.** That is the user's correction, not an oversight:
they were viewing the third reference in its light mode and preferred it. So
PLINTH and LATTICE are pulled hard apart on everything except value — warm
against cool, sparse against dense, no chrome against all chrome.

## Shape is a direction variable

Not a house rule. Each direction owns one shape language and never borrows
another's:

| | MERIDIAN | PLINTH | LATTICE |
|---|---|---|---|
| Radius | pill on **actions only**; `0` on everything that holds content | pill (`9999px`) on nav and actions, nothing else | `0.5rem`–`0.75rem` on cells and controls |
| Structure | hairline rules between everything | tonal bands; **no rules at all** | bordered cells on a grid field |
| Elevation | one soft shadow, on the nav pill when stuck | none | one soft shadow on the hero slot |

MERIDIAN's radius rule changed when it took PLINTH's pill nav: a square button
inside a pill bar reads as an oversight. It is now one legible rule —
**actions are pills, structure is square** — and the form is where that rule
stops being a preference and starts telling the reader which element is the
control.

If a fourth pattern is ever needed, it belongs to whichever direction's system
already answers it — not to all three.

## Tokens

Declared once in `@theme` in `app/globals.css`. Named for the direction rather
than the hue — `bg-mer`, `text-pli-ink`, `border-lat-line` — because while
three worlds share one stylesheet, the useful thing to know at a glance is
which page a class belongs to. Ratios are measured against the ground the token
is actually used on.

| Token | Value | Notes |
|---|---|---|
| `--color-mer` | `#12306e` | MERIDIAN's ground. The ultramarine the user picked out |
| `--color-mer-2` | `#0d2454` | Recessed bands: the showcase, the enquiry panel |
| `--color-mer-3` | `#081a3e` | Deepest: footer, form fields, text on accent fills |
| `--color-mer-line` | `#2f4c8c` | 1.5:1. Decorative hairlines only |
| `--color-mer-line-strong` | `#8ba0c8` | 4.8:1. Field borders, WCAG 1.4.11 |
| `--color-mer-ink` | `#f3f1ec` | 11.1:1 |
| `--color-mer-ink-soft` | `#bcc7de` | 7.4:1 |
| `--color-mer-accent` | `#43b0a0` | 4.75:1. Verdigris. The action; `mer-3` sits on the fill at 6.5:1 |
| `--color-mer-accent-deep` | `#359287` | Hover and pressed; the label holds 4.6:1 |
| `--color-mer-alert` | `#ffb3a7` | 8.8:1 on the enquiry panel. Validation errors, and nothing else |
| `--color-pli` | `#f6f4ef` | PLINTH's ground. A printer's warm white, not cream |
| `--color-pli-2` | `#ebe7de` | Recessed bands |
| `--color-pli-3` | `#14130f` | The inverted band and footer |
| `--color-pli-line` | `#d8d2c6` | Used almost nowhere by design; process numerals |
| `--color-pli-line-strong` | `#6b6558` | 4.5:1. Field underlines |
| `--color-pli-ink` | `#14130f` | 16.1:1 |
| `--color-pli-ink-soft` | `#55504a` | 6.6:1 |
| `--color-pli-accent` | `#b93a16` | 5.2:1 on ground. The action, links, the figures |
| `--color-pli-accent-deep` | `#90290c` | Hover and pressed |
| `--color-lat` | `#ffffff` | LATTICE's ground |
| `--color-lat-2` | `#f4f6fa` | Recessed bands and cell fills |
| `--color-lat-3` | `#0b0f1a` | The inverted CTA band and footer |
| `--color-lat-line` | `#e2e6ee` | Cell borders and the ruled grid |
| `--color-lat-line-strong` | `#737a88` | 4.3:1. Field borders |
| `--color-lat-ink` | `#0b0f1a` | 18.9:1 |
| `--color-lat-ink-soft` | `#545c6b` | 6.7:1 |
| `--color-lat-accent` | `#4634d9` | 7.6:1. The action, marks, step numerals |
| `--color-lat-accent-deep` | `#3628b0` | Hover and pressed |
| `--color-lat-accent-soft` | `#eeebfd` | The offer band's whole ground |
| `--color-bone` | `#f7f7f5` | What sits on any dark or saturated fill |
| `--color-obsidian` | `#0b0b0e` | What sits on any light fill |

**One accent per direction, and it marks what the reader can act on.** Buttons,
the submit control, link underlines, focus-state field rules. The two
deliberate exceptions are both whole regions rather than marks: LATTICE's offer
band is `lat-accent-soft` end to end, and PLINTH's four figures are set in the
accent at display size because the figures *are* the offer.

**MERIDIAN separates its action by HUE, and that is a reversal.** It was bone,
and bone worked by FILL alone — a solid panel against ultramarine is
unmistakably a control, while bone lettering beside bone lettering is not, so
the accent could not be used as text. The hero picture ended that: bone
measured 1.09:1 against the arcade's travertine. Verdigris restores the
distinction by hue, which also unlocks the accent AS text — the hero headline
now sets one word in it.

**The one exception is the error state, which needed its own hue.** With bone
as the accent, error text set in the accent is the same colour as the label
above it and the hint beside it — nothing but the sentence marks the field as
wrong. The failure is already conveyed non-visually (`aria-invalid`,
`aria-describedby`, real text), so `--color-mer-alert` is not a WCAG fix; it is
so a reader who has just been rejected by a form can see which line is the
rejection. Soft rose rather than signal red, shown only on failure. The invalid
BORDER stays bone, so the field and its message are not both shouting.

## Type

Five faces load at the root: three display faces, one per direction, plus two
workhorses. That is a review-stage cost, paid because the compare board puts
all three on one screen and a route-scoped face would arrive late into its
panel. Two thirds of it comes out of `app/layout.tsx` when a direction is
chosen.

| Face | Direction | Why |
|---|---|---|
| Schibsted Grotesk | MERIDIAN | A newspaper grotesk. Editorial, faintly warm, authoritative on a dark ground without shouting |
| Archivo 700–800 | PLINTH | The only one of the three with real poster weight, which is the whole job on a page with no cards, borders or shadows |
| Manrope | LATTICE | Semi-geometric, even colour, engineered-looking at small sizes — what a dense ruled page needs |
| Geist | all | Running text |
| Geist Mono | all | MERIDIAN's process numerals. Measurement only, never as a costume |

Display sizes cap at `5.8rem`; tracking never goes below `-0.04em`; body
measure runs 58–68ch. Headlines are authored on lines per direction
(`headlineLines` in `content/site.ts`) and those breaks apply above `sm` only —
below it the headline is one string and `text-balance` does the work.

## The drawing system

`components/Classical.tsx`. Three primitives, all parametric, all `aria-hidden`,
all server components. The user's own taste is Greco-Roman; the instruction was
to weave it in only if it was cheap. So it is geometry, not illustration —
there is no artwork in the repo, nothing to re-export when a token moves, and
every line takes `currentColor` from the direction it is drawn on.

- **`Arcade({bays})`** — N round arches on piers over a base rule. Declares its
  own `aspect-ratio` inline, so a `w-full` arcade fills its box exactly instead
  of being letterboxed by `preserveAspectRatio="meet"`. Callers that set an
  explicit height still win. Fewer bays means larger arches.
- **`Fluting({count})`** — the vertical channels of a column shaft, flattened
  into a texture band. Stretches (`preserveAspectRatio="none"`).
- **`Cornice()`** — three rules at uneven weights and uneven spacing. Evenly
  spaced they would read as a border rather than as a moulding. **Give it an
  explicit width**: an inline SVG is a replaced element, so `inset-x` with
  `width: auto` resolves to its 100-unit intrinsic width and it renders as a
  stub.

## The hero image slots

Every direction reserves a real, correctly proportioned box for a hero image
the user is generating separately. Dropping one in is a one-line change with no
reflow: the aspect is read from `directions[key].heroSlot` in
`content/site.ts`, so the reserved box and the recorded dimensions cannot
drift apart.

| Direction | Slot | Position |
|---|---|---|
| MERIDIAN | **1600 × 900** | ~~Below the hero~~ — **removed at the user's request.** See below |
| PLINTH | **1920 × 1080** | Full-bleed band under the centred hero |
| LATTICE | **1600 × 900** | Centred device, where the reference puts its dashboard |

All three are 16:9, so one generated image fits any of them.

**MERIDIAN no longer has one, and no longer needs one.** The user asked for the
arcade image between the hero and the body to go, and that box WAS the reserved
slot — the hero runs straight into the offer. `heroSlot` stays in the content
file and `.plate-open` stays in the stylesheet, both unused on that page.

The picture went **into** the hero instead. See *Meridian's hero picture*
below.

## Meridian's hero picture

`public/img/hero-arcade-silhouette-2k.webp`, **2560 × 2060, 84 KB**. Generated
(`nano_banana_pro`, image-to-image) from a control drawing authored for the
purpose, because the composition is one an image model will not produce from a
text prompt: asked in words for a flat elevation with arches scaled up left to
right, it returns a receding viaduct in perspective every time. Three separate
attempts did. Fed the geometry as a picture, six different rendering styles all
obeyed it.

**The file is taller than what was rendered, on purpose.** The generated frame
is 16:9 and lives in the bottom 1434px; the 626px above it is the picture's own
top row repeated upward. That gives `object-cover` spare sky to trim instead of
arcade. It is seamless rather than approximate because the sky in this frame is
genuinely flat — which is what removing the corner light produced — so a
sampled hex would have been a worse match than replication.

Pipeline: generate at 1k → `upscale_image` to 2K (returned 3856 × 2160) →
resize to 2560 wide → extend upward → WebP q90. Smooth gradients, so 84 KB at
2560 wide, and it is `priority` for LCP.

**IT IS A SILHOUETTE, AND THAT IS A LEGIBILITY DECISION, NOT A MOOD.**

The first version lit the arcade in pale travertine. Measured inside the box
where the hero text actually sits — 2–46% across, 24–78% down — its brightest
pixel was `#e1d8c6`, which is **1.25:1** against the headline ink. The picture
and the type were the same brightness, and the page compensated with a CSS
gradient laid across the left. That worked and was a compromise: the left was
dark because a sheet was on top of it, not because the scene was dark there.

The user proposed swapping the values — white clouds, blue arches. Generated
and measured, that came back at **1.11:1** in the same box, marginally *worse*
than what it replaced, because white is brighter than travertine and the cloud
bank runs the full width. It also erased the secondary CTA, which is an
outlined pill with no fill.

What shipped inverts past the halfway point instead: the arches are darker than
the sky, the cloud is pulled right and thinned off the left edge. Brightest
pixel in the text box is now `#25438b` — **8.25:1** against the headline,
**5.48:1** against the subhead.

**So the left falloff is deleted.** The picture supplies its own shadow. Any
future hero swap that reinstates a bright object in the left third brings that
gradient back with it, so measure the text box before changing the file.

**Two optimizer traps this hero fell into, both silent, both worth knowing
before anyone swaps the file again:**

1. **The optimizer caches against the source URL.** Replacing the file in place
   kept serving the previously-optimized 1376-wide variant out of
   `.next/cache/images`. The picture read as low quality through a whole round
   of review while the file on disk was already 2560. Hence `-2k` in the
   filename: the version is in the URL, so a swap cannot be silently ignored.
   If a file is ever replaced in place, `rm -rf .next/cache/images`.
2. **Next 16 ignores a `quality` prop not listed in `images.qualities`** and
   falls back to 75 without warning. 75 is right for photographs and wrong for
   this frame — a 1920-wide re-encode at 75 came back at **58 KB**, smaller
   than the 2560-wide source it was made from, and banding across the sky.
   `next.config.ts` now allows `[75, 90]`; at 90 the same width is 128 KB.

Both are general to this repo, not to this image. Any future hero that is
mostly gradient will want `quality={90}`.

**The geometry, so it can be redrawn:** 1600 × 900 field. Six round-headed
arches on piers, springing from a single baseline at y = 752. One straight
raking cornice from (80, 668) to (1600, 168); every crown sits 16px below it,
which is what fixes each arch's height. Opening width is 0.54 × arch height.
Centres at x = 175, 350, 560, 810, 1105, 1420 — spacing ramps with the heights
so the run accelerates rather than marching. A scalloped cloud bank along the
bottom, kept low enough that the small arches stand ankle-deep in it rather
than being swallowed. The upper-left triangle above the cornice is left empty:
that is the headline's room, and it is a spec, not a leftover.

**How it is placed, and why each part is not the obvious thing:**

| Decision | Reason |
|---|---|
| The picture **fills the section**, anchored bottom | It was a bottom band first. A 16:9 frame in a 3:1 box loses ~42% off its top, and the deck exits near the top of the right edge — so a 1920-wide screen showed decapitated arches and no cornice at all. The sketch has the arcade reaching the top-right corner; a bottom strip was never what was asked for |
| Headroom in the **file**, not in the CSS | Fading the band's top edge only blurred the cut. Giving `cover` spare sky to eat is the fix that survives every viewport |
| `object-contain` below `lg`, `object-cover` at `lg` and up | `cover` on a phone crops to about two arches. The ramp is a wide-format idea; on a narrow screen it has to be shown whole and small |
| Section ground is `--color-mer-sky`, not `--color-mer` | Sampled off the image's own top edge. `contain` leaves open section above the picture on every phone, and it has to match to the pixel or the join reads as a seam. The page ground is bluer-by-eye and would not have |
| ~~A left-to-right falloff~~ — **deleted** | It existed because the lit-stone frame measured 1.25:1 against the headline inside the text box. The silhouette frame measures 8.25:1 there, so the picture supplies its own shadow and the gradient is gone. It also used to swallow the two smallest arches, which is no longer a price anyone pays |
| Subhead measure cut to `40ch` at `lg` | At `58ch` it ran out across the stone |

**Known limit: ultrawide.** Beyond about 2:1 the content, scaled to full width,
is taller than the viewport, and the top of the arcade starts to go again.
Added sky cannot help — sky and content scale together. It needs a wider
render, not a taller one.

Shrinking the band was tried twice while it was still a band, and did nothing:
the image is anchored to the bottom, so a shorter band crops the tops off the
tall arches and leaves the piers exactly where they were.

Until an image arrives, `HeroSlot` paints a composed placeholder rather than a
grey rectangle: a fluting rhythm behind everything, a cornice near the head, and
a three-bay arcade standing on the base, over the direction's own wash. It is
deliberately finished-looking — three pages being compared side by side would
all read as unfinished in the same way if the slot announced itself as empty.
It carries no "placeholder" label on the page; these dimensions are the record.

## Motion

Scroll-driven CSS, with one exception. A browser without `animation-timeline`
drops that declaration and is left with a zero-duration animation under `both`
fill, which resolves immediately to the finished state — so no support, and no
JavaScript at all, both render the finished content.

- **One entrance per direction**, not one for the build: MERIDIAN clears
  (rise + de-blur), PLINTH settles (heavy type dropping in), LATTICE assembles
  (snapping onto the grid). Three pages whose sections all arrived identically
  would have erased motion as an axis the comparison could turn on.
- **`hero-arrive`** — the single authored on-load moment per page, staggered
  across headline, subhead and actions.
- **`plate-open`** — MERIDIAN only. The hero slot starts inset and widens to
  full bleed as it is scrolled through. This is the hero-to-body transition.
- **`stroke-in`** — the arcade draws itself, left to right, keyed to
  `pathLength="1"` so the dash values never need remeasuring.
- **`bloom-breathe`** — a 14s scale pulse on the hero lights. **Transform
  only.** It once animated `opacity` as well, which silently defeated the
  `opacity-[…]` utility on the same element — an animation beats a normal
  declaration, so a bloom asking for 5% rendered at 85–100%, and every hero
  light on all three directions was several times stronger than its class said.
  Opacity belongs to the element; motion belongs to the animation.

Under `prefers-reduced-motion: reduce`, every animation resolves to its
finished state and the dimming is switched off entirely.

## MERIDIAN's showcase and dim

Two separate mechanics that were once conflated, and untangling them was the
main correction of this pass.

### The showcase — `components/Solutions.tsx`

The body of the page, and the thing the user asked for by name after looking at
the reference. It is worth recording what that section ACTUALLY is, because two
plausible readings of "a sidebar that scrolls through" are both wrong. It is
not a tab strip that swaps a panel on click, and it is not a pinned section
that hijacks the scroll. It is a two-column grid whose left column is sticky,
whose right column is a normal stack of very tall panels, and a scrollspy
marking the link for whichever panel is being read. Taken from the reference's
own stylesheet rather than guessed:

    .showcase     grid-template-columns: minmax(13.5rem,.28fr) minmax(0,1fr)
    .sidebarInner position: sticky; top: clamp(5.5rem,14vh,8.5rem)
    .panel        min-height: min(82vh,48rem); border-bottom: 1px
    .sidebarLink[aria-current=location]  border-left-color: accent;
                                         transform: translateX(.25rem)

Those proportions are kept. The 82vh panel height is load-bearing: it is what
gives the sticky column enough scroll distance to feel alive, and panels sized
to their own content would make the mechanism pointless.

Below `lg` the grid collapses and the sidebar becomes a sticky horizontal chip
bar under the nav, active state moving from a left border to a bottom border.
That is the reference's own mobile behaviour, and it is the part most builds of
this pattern get wrong by simply hiding the sidebar.

**A READ LINE, not an observer band.** The scrollspy was first built as an
IntersectionObserver with a thin `rootMargin` band, matching the dimming below,
and it marked the wrong panel: an observer callback only ever sees the entries
that CHANGED, so it cannot answer "which of the three is current" — only "which
one just crossed" — and a panel that never re-crosses keeps a stale marker.
The active panel is now COMPUTED from all three on every frame: it is the last
one whose top edge has passed a line 30% down the viewport. That is a total
function of scroll position, so it cannot go stale, and it gives the same
answer whether the reader arrives by scrolling, by deep link, or by a restored
scroll position. Three `getBoundingClientRect` calls in a rAF-throttled passive
listener.

### The dim — `components/SectionRail.tsx`

The page-level sections outside the showcase. One `IntersectionObserver` with
`rootMargin: -45% 0px -45%` collapses the viewport to a band across its middle,
so exactly one section intersects at a time and "active" needs no tie-break.
Sections register through context, so the page stays a server component and no
copy ships as client JavaScript. The showcase is deliberately NOT wrapped in a
`DimSection`: it runs its own scrollspy, and dimming three screens of content
as one unit would fight it.

**The dim is 0.72, and that number is the price of the new ground.** Body text
is `mer-ink-soft` on `mer`. On the near-black navy this direction started with,
0.55 composited to 5.2:1 and the dim was deep. On the ultramarine — nearly
three times as light — the same 0.55 composites to 3.3:1 and fails; 0.70 still
measures 4.43:1; 0.72 is the first value clearing 4.5:1, at 4.60:1. So the dim
is genuinely shallower than it was, and no amount of taste changes that: a
lighter ground leaves less room between legible and faded. The paired
`scale(0.985)` now carries proportionally more of the effect, and costs no
contrast at all.

**A margin rail used to live here and is gone.** It was built from the user's
remark about "the little column on the left as another little navigation",
read as a page-level index in the far-left margin. Against the reference's
stylesheet, they were describing the showcase sidebar all along. Keeping both
would have put two competing navigations on one screen, which the reference
does not do either — its page nav is in the header.

### The nav — `components/MeridianNav.tsx`

PLINTH's pill mechanic at the width the user asked for: "not so it shrinks, so
it stays as a pill but almost a full length of the screen". The contraction is
therefore small, 92rem to 80rem, and the transition is carried by the ends
rounding, a hairline appearing, the ground going translucent and the blur
switching on. Three-column grid from `md` up so the wordmark sits dead centre;
a plain flex row below it, because with the links hidden there is nothing to
balance the action and the grid shoved the wordmark off centre anyway.

## Accessibility

Shared by all three, and none of it is a per-direction decision.

- Skip link on every page, off-screen until focused, never `display: none`.
- `:focus-visible` uses `currentColor` at 2px with a 3px offset — the same ring
  has to survive deep blue, warm white and cool white, and sit on a blue,
  burnt-orange or violet fill. Any fixed hue fails on at least one.
- Every form input is 16px in every skin. Mobile Safari zooms the viewport on a
  smaller field and does not zoom back out, which would throw the reader into a
  zoomed, horizontally scrolling page at the one conversion event the page has.
- Field borders and underlines clear 3:1 as non-text UI; labels, hints and
  errors clear 4.5:1. No skin sets `focus:outline-none`.
- Focus states never rely on colour alone — PLINTH's underline thickens,
  LATTICE's cell tints as well as changing border colour.
- Anchor targets clear both the sticky header and the fixed review bar.
- The drawing primitives are all `aria-hidden`; the figures band is a `<dl>`
  with the label as the `<dt>`.

## Review scaffolding, and what deleting it costs

None of this ships.

- `app/page.tsx` + `components/CompareBoard.tsx` — the board. Three live pages
  in iframes at real device width, a desktop/phone toggle, a 40ms scroll lock,
  and a flick view. Phone panels render at 1:1 in a three-column layout, so
  what is on screen is exactly what a reader gets.
- `components/DirectionSwitch.tsx` — the fixed bar. Hides itself inside an
  iframe, stands down inside a form field, and declares `--switch-bar`, which
  every direction consumes as bottom padding.
- All four routes are `noindex`.

**Choosing a direction** means: move it to `/`, delete the other two page
files, and in the same commit take out the board, the switcher, `--switch-bar`
and its `SWITCH_BAR_CLEARANCE` consumers, the two losing skins in
`components/skins.ts`, the two losing token blocks in `@theme`, the two losing
faces in `app/layout.tsx`, and the two losing entries in `directions`.

Direction-specific deletions:

- **MERIDIAN is the chosen direction**, so this one is what stays. When the
  comparison is closed it moves to `/` and takes `SectionRail.tsx`,
  `Solutions.tsx`, `MeridianNav.tsx`, the `.dimmable` rules, `.plate-open` and
  `public/img/hero-arcade-silhouette-2k.webp` and `.mer-bloom` with it. The bloom was deleted
  when the hero gained a picture and then restored at the user's request — it
  came back **white rather than warm**, and capped to the top `46vh`, so it
  reads as haze behind the nav rather than as a second sun competing with the
  picture's own light. `bloom-breathe` is shared; PLINTH, LATTICE and
  `HeroSlot` all use it too.
- **If PLINTH loses:** `components/PillNav.tsx` goes. The figures band goes with
  it — `site.figures` has no other consumer.
- **If LATTICE loses:** `.lat-grid` goes, and `site.capabilities` loses its only
  consumer.

`components/Classical.tsx`, `Reveal`, `Disclosure`, `EnquiryForm`,
`lib/leadForm.ts` and everything in `site` stay whichever way it goes.
