# Pulito Digital design system

Recorded from the built world, not from intention. One page, one direction.
Product truth lives in `PRODUCT.md`.

## The world

An excavation, not a brochure. Premium craft is presented the way a museum
presents worked stone: near-black ground, marble lit against it, Roman
capitals at architectural scale, one antique gold. The page refuses the
agency site that opens with a service list and the local-trades site that
opens with a suburb.

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
| `--color-accent` | `#c8a34a` | Antique gold, 8.3:1 both directions |
| `--color-accent-fg` | `#0a0a0b` | Type on a gold fill |

Colour strategy is Committed: gold carries every rule, numeral, marker,
field label and action, and appears nowhere else. The last word of the
headline is the only place it is used as display type.

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

Four plates, mostly material and carved detail with a single figure kept so
the Roman register survives outright:

| File | Role |
|---|---|
| `herodotos.jpg` | The one figure. Hero, behind the type. |
| `relief-rider.jpg` | Weathered carving opposite the problem statement. |
| `capital-acanthus.jpg` | Carved acanthus as a full-width frieze under the services. Cropped to `object-[center_62%]`: the source is an archival plate with annotations along its top edge. |
| `seated-man.jpg` | A carved Greek signature, behind the offer. |

Rules that hold:

- Museum plates arrive on a neutral studio ground. `feather-plate`, a radial
  mask, dissolves that rectangle into the page. Never paste the grey box on.
- A full-bleed image must remain legible. Scrims are weighted to the column
  the copy occupies and lift off where the subject is. An image knocked back
  until invisible is deleted instead, not left to cost payload.
- On phones the hero figure drops to `opacity-55` and the scrim strengthens:
  a portrait at full strength behind body copy is unreadable at 390.
- Classical nudes are excluded. The reader is a tradesperson on a phone.

## Motion

Three moves, all transform and opacity, all motivated by the excavation idea:

1. **`HeroFigure`** settles once on load (scale 1.08 to 1, 1.6s) then drifts
   against the scroll via `useScroll`/`useTransform`. Motion values only,
   never React state, so it does not re-render per frame.
2. **`Reveal`** rises content into place once per block, from `opacity: 0.25`
   rather than `0`, so nothing is invisible if the observer never fires.
3. **`Marquee`**, one per page, pure CSS transform.

No scroll listeners. Everything collapses under `prefers-reduced-motion`.

## Accessibility rules this system holds to

- Body text ≥ 4.5:1, non-text UI boundaries ≥ 3:1, measured rather than
  judged by eye. Ratios are recorded in comments beside the values.
- Nothing sets `focus:outline-none`. The `:focus-visible` ring in
  `globals.css` is the single focus signal, and it must never be drawn in the
  colour of the ground behind it.
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

## The enquiry form

`components/EnquiryForm.tsx` with a single skin in `components/skins.ts`.
Four fields, matching the "Four fields" promise in the copy.

Demo-only: it validates, focuses the first invalid field after paint, shows a
success panel, and issues no network request. The single `TODO` in
`lib/leadForm.ts` marks where a real endpoint attaches. Wiring it means the
page starts collecting personal information and needs a privacy notice.
