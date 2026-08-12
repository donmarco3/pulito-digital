# Pulito Digital design system

Recorded from the built world, not from intention. One page, one direction.
Product truth lives in `PRODUCT.md`.

## The world

An excavation, not a brochure. Premium craft is presented the way a museum
presents worked stone: a burgundy marble slab under the first viewport with a
Solomonic column standing on it and Roman capitals running behind the shaft,
then a near-black page in which the burgundy is the accent and the gold has
been reduced to gilding. The page refuses the agency site that opens with a
service list and the local-trades site that opens with a suburb.

## Tokens

Declared once in `@theme` in `app/globals.css`. No scoping, no theme switch:
the page is one committed world.

| Token | Value | Notes |
|---|---|---|
| `--color-surface` | `#0a0a0b` | Near-black, never pure black |
| `--color-surface-2` | `#101012` | Raised: marquee band, form panel |
| `--color-surface-3` | `#17171a` | Rarely used |
| `--color-line` | `#26262a` | 2px structural rules |
| `--color-line-strong` | `#6e6c64` | Field borders, 3.6:1 on surface-2 |
| `--color-fg` | `#f4f1ea` | Bone, 17.5:1 |
| `--color-fg-muted` | `#a9a49a` | 8:1 |
| `--color-accent` | `#bd6470` | Working wine. 4.9:1 on surface, 4.7:1 on surface-2 |
| `--color-accent-deep` | `#5e1622` | The marble. Grounds and fills only |
| `--color-accent-shade` | `#1a0509` | Sub-surface cloud inside the slab |
| `--color-gild` | `#c8a34a` | Gilding. 1px rules and control edges only |

Colour strategy is Committed, and the accent is split by job because one
burgundy cannot do both. `--color-accent-deep` is the material: at 1.5:1
against the page it can never carry type, so anything sitting on it is bone
at 11.5:1. `--color-accent` is the same colour lifted until it can be read —
numerals, markers, field labels, link hovers, the marquee separators.

Gold is no longer a UI colour. It survives as 1px rules and as the edge of
filled controls, and it is never type. That second job matters: a burgundy
fill is 1.5:1 against the page and cannot be its own boundary, so the gilt
hairline is what satisfies WCAG 1.4.11 at 8.3:1.

Below the hero the material returns twice, and only twice: the museum plates
are printed in it, and the offer section is floored with it.

## Type

Loaded via `next/font`.

- **Display: Cinzel**, all caps. Hero is `clamp(2.2rem, 10.5vw, 9rem)`, sized
  so the long first line genuinely runs off the right edge. Section headings
  `1.7rem` to `2.8rem`.
- **Body: Geist.**
- **Mono: Geist Mono** for field labels, the running header and small
  metadata, at 10-11px with `0.22em` tracking.

FAQ questions are set mixed case even though the rest of the display type is
capitals: Cinzel caps measurably slow down full sentences.

## Shape and material

Radius `0` everywhere. No shadows, no glass, no cards. Division is done with
`2px` rules and cut lines. Services are full-width carved slabs with the title
at architectural scale and the description inset beneath, never a card grid.

## Imagery

Public-domain museum photography (Getty, the Met), vendored under
`public/img/`. Nothing under `public/` may contain tooling artefacts;
`public/**/.claude/` is gitignored.

| File | Role |
|---|---|
| `column-solomonic.webp` | The object. A twisted Broccato Rosso column (the Met), keyed out of its studio ground and desaturated to 0.28 so it reads as pale marble against the burgundy rather than merging with it. |
| `relief-rider.jpg` | Weathered carving opposite the problem statement. |
| `capital-acanthus.jpg` | Carved acanthus as a full-width frieze under the services. Cropped to `object-[center_62%]`: the source is an archival plate with annotations along its top edge. |

The slab itself is not a photograph — see `MarbleField` below.

Rules that hold:

- Museum plates arrive on a neutral studio ground. `feather-plate`, a radial
  mask, dissolves that rectangle into the page. Never paste the grey box on.
- Cut-outs are keyed on red-minus-blue, not on saturation or luminance:
  warm stone against a neutral studio grey separates at 0.008 versus 0.25,
  which no highlight in the object crosses.
- The plates are duotoned by lifting the greyscale and multiplying through
  `--color-accent-deep`. Multiply lands the plate's brightest point on the
  accent and drives everything else darker. A `color` blend keeps the
  original luminance and turns a lit museum plate pink.
- A full-bleed image must remain legible. Scrims are weighted to the column
  the copy occupies and lift off where the subject is. An image knocked back
  until invisible is deleted instead, not left to cost payload.
- On phones the hero figure drops to `opacity-55` and the scrim strengthens:
  a portrait at full strength behind body copy is unreadable at 390.
- Classical nudes are excluded. The reader is a tradesperson on a phone.

## The slab — `components/hero/MarbleField.tsx`

Generated, not photographed. Displaced stripes are the standard way to get
marble out of Perlin noise: `feTurbulence` drives an `feDisplacementMap` over
a set of hand-placed rules, once coarsely (frequency 0.0045, throw 300) for
the vein network and once finely (0.011, throw 120) for the capillaries, over
a turbulence cloud that stops the ground reading as a flat fill. Vein
positions are hand-placed rather than mapped from an array — evenly spaced
veins read as a texture swatch.

Three reasons it is drawn rather than sourced. There is no public-domain
photograph of a burgundy slab at the resolution a full-bleed hero needs. It
costs a few hundred bytes instead of a megabyte. And, the point: the browser
rasterises the filter once, so the layers are then free to be transformed
every frame. **Nothing re-evaluates an SVG filter during motion** — that is
the constraint the whole hero is built around.

It sets no z-index; the caller owns stacking.

## Motion

All transform and opacity. Nothing uses React state for a continuously
changing value, and there are no scroll listeners.

1. **`Hero`** answers the pointer, in one of three modes selected by the
   `mode` prop and compared at `/motion/compare`:
   - `sheen` — a soft-light highlight tracks the pointer across the slab, and
     a second highlight tracks it across the column. The column's is a
     transformed ellipse inside a wrapper masked once by the column's own
     alpha, so no mask is recalculated per frame.
   - `parallax` — slab and column translate in opposing directions (26/16px
     against −46/−22px) through a spring. Opposition is what reads as depth.
   - `live` — both, over `vein-drift`, a 46s CSS scale-and-translate on the
     rasterised vein group.
2. All three share one scroll drift on the column, so a comparison isolates
   the cursor behaviour. On coarse pointers the scroll drift is the only
   motion: a hero that reacts to a tap looks broken, not alive.
3. **`Reveal`** rises content into place once per block, from `opacity: 0.25`
   rather than `0`, so nothing is invisible if the observer never fires.
4. **`Marquee`**, one per page, pure CSS transform.

Everything collapses under `prefers-reduced-motion`: the sheen and drift
layers are not rendered at all, the pointer listener is never attached, and
`vein-drift` and `marquee-run` are forced off in CSS.

## Routes

`/` is the site. `/motion/sheen`, `/motion/parallax` and `/motion/live` are
the same page with the hero's `mode` changed; `/motion/compare` embeds all
three at a real 1280px viewport in scaled iframes — the hero's type is sized
in `vw` and its height in `dvh`, so three copies in one document would be a
lie. The motion routes and the compare view are review furniture: not linked
from the site, not indexed, and deletable in one commit once a motion is
chosen.

## Accessibility rules this system holds to

- Body text ≥ 4.5:1, non-text UI boundaries ≥ 3:1, measured rather than
  judged by eye. Ratios are recorded in comments beside the values.
- Nothing sets `focus:outline-none`. The `:focus-visible` ring in
  `globals.css` is the single focus signal, and it must never be drawn in the
  colour of the ground behind it. It is bone rather than the accent because
  it has to survive on the near-black page *and* on the burgundy slab.
- `color-scheme: dark` on the root so native selects and the scrollbar match.
- `scroll-margin-top: 6rem` on all ids, so anchors clear the sticky header.
- Decorative imagery takes `alt=""`; meaningful plates describe the object.

## Content

Every visible string lives in `content/site.ts`, including section headings,
the running header and the three hero lines the capitals are set on. Nothing
may hard-code copy in the page.

Standing constraints from `PRODUCT.md`: no testimonials, logos, ratings or
client numbers; no pricing in any form; Australian English; Adelaide carried
by the header, FAQ, title and schema rather than the headline.

The hero's mono strapline and the running header carry the same line and are
exactly complementary — `lg:hidden` against `hidden lg:block`. It is never
shown twice and never hidden.

## The enquiry form

`components/EnquiryForm.tsx` with a single skin in `components/skins.ts`.
Four fields, matching the "Four fields" promise in the copy.

Demo-only: it validates, focuses the first invalid field after paint, shows a
success panel, and issues no network request. The single `TODO` in
`lib/leadForm.ts` marks where a real endpoint attaches. Wiring it means the
page starts collecting personal information and needs a privacy notice.
