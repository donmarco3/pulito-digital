# Pulito Digital design system

Recorded from the built world, not from intention. Three landing-page variants
share one token contract and one component set; each variant re-points the
tokens and composes them differently. Product truth lives in `PRODUCT.md`.

## How the three worlds are wired

`app/globals.css` declares one set of semantic tokens in `@theme` and
re-points them inside `[data-v="one" | "two" | "three"]` scopes. Every
component is written once in semantic classes (`bg-surface`, `text-fg`,
`border-line`, `text-accent`) and renders as three unrelated designs depending
on which wrapper it sits inside.

Because the scope lives on a wrapper inside `<body>`, matching rules on
`html:has([data-v="…"])` carry the background and `color-scheme` up to the
root. Without that, the scrollbar gutter and overscroll area keep variant
one's limestone on the dark variants.

| Token | I Stone | II Palazzo | III Porphyry |
|---|---|---|---|
| `--color-surface` | `#edebe6` | `#0a0a0c` | `#08070a` |
| `--color-surface-2` | `#e4e1da` | `#101013` | `#100e14` |
| `--color-surface-3` | `#d8d4cb` | `#17171b` | `#191520` |
| `--color-line` | `#c6c1b6` | `#26262c` | `#2c2534` |
| `--color-line-strong` | `#a8a294` | `#3a3a43` | `#463b52` |
| `--color-fg` | `#141d19` | `#ede8de` | `#f4f0ea` |
| `--color-fg-muted` | `#46544e` | `#a8a091` | `#b3a8bd` |
| `--color-accent` | `#0f4d3a` | `#c9a227` | `#d1465f` |
| `--color-accent-fg` | `#f2f0eb` | `#0a0a0c` | `#08070a` |

Colour strategy differs on purpose. I is restrained until the enquiry section,
where the accent takes the entire region. II is a neutral ground with gilt used
only as rule, numeral and action. III is committed: porphyry carries display
type, rules, numerals and every action.

## Type

Loaded through `next/font` in `app/layout.tsx`, exposed as CSS variables and
selected per variant scope.

- **I** Marcellus, Roman inscriptional capitals. Display sizes `1.75rem` to
  `5rem`, wide tracking on the wordmark and small labels.
- **II** Bodoni Moda, didone. Display `1.9rem` to `4.1rem`. Highest stroke
  contrast of the three; needs the largest sizes to hold.
- **III** Cinzel, all caps throughout the display range, `clamp(2.4rem,
  7.4vw, 6.2rem)` in the hero, set to overrun the right edge.
- Body is Geist everywhere. Geist Mono carries field labels, catalogue
  numerals and running headers.

Long FAQ questions are set mixed case even in III, where everything else is
capitals: Cinzel caps measurably slow down full sentences.

## Shape and material

Radius is `0` everywhere, in all three variants, with one exception: variant
one's hero plate is an arch (`rounded-t-[999px]`). No shadows, no glass.
Division is done with rules: hairline in I and II, `2px` in III.

Border weight is a variant signal: `1px` (I), `1px` with gilt accents (II),
`2px` structural (III).

## Imagery

Public-domain museum photography from the Getty and the Metropolitan Museum
of Art, vendored under `public/img/`. Nothing under `public/` may contain
tooling artefacts; `public/**/.claude/` is gitignored.

Museum plates arrive on a neutral studio ground, which reads as a grey
rectangle pasted onto a designed page. Two remedies are in use:

- **Light variant:** `mix-blend-multiply` with `saturate-[0.55]` over the
  surface, so the studio grey becomes warm stone.
- **Dark variants:** the `feather-plate` utility, a radial mask that dissolves
  the plate's edges into the ground.

Full-bleed background images must remain legible. A scrim is weighted to the
column the copy occupies and lifts off where the subject is; an image knocked
back until invisible is deleted instead.

Classical nudes are excluded. The audience is a tradesperson scanning on a
phone; busts, draped figures, animals and carved inscriptions carry the same
register without the problem.

## Motion

`components/Reveal.tsx` provides one authored entrance per variant:
`settle` (I), `draw` (II), `rise` (III). Entrances start at `opacity: 0.25`,
not `0`, so content is never invisible if the observer does not fire, and run
`once`. `components/Marquee.tsx` is pure CSS, transform only, and appears at
most once per page. Everything collapses under `prefers-reduced-motion`.

No scroll listeners anywhere.

## Accessibility rules this system holds to

- Body text ≥ 4.5:1, non-text UI boundaries ≥ 3:1. Field border ratios are
  recorded in comments in `components/skins.ts` and were measured, not judged
  by eye.
- No component sets `focus:outline-none`. The `:focus-visible` ring in
  `globals.css` is the single focus signal.
- `color-scheme` is set per variant so native selects and scrollbars match.
- `scroll-margin-top: 6rem` on all ids, so anchors clear the sticky header.
- Decorative imagery takes `alt=""`; meaningful plates describe the object.

## Content

Every visible string lives in `content/site.ts`, including section headings
and the three hero lines variant three sets its capitals on. No variant may
hard-code copy: a wording change must reach all three.

Standing content constraints, enforced by `PRODUCT.md`: no testimonials,
logos, ratings or client numbers; no pricing in any form; Australian English;
Adelaide named explicitly.

## The enquiry form

One component, `components/EnquiryForm.tsx`, three skins in
`components/skins.ts`. Markup, validation, ARIA wiring and submit behaviour
are shared so the variants cannot drift on behaviour. Four fields, matching
the "Four fields" promise in the copy.

Currently demo-only: it validates, focuses the first invalid field after
paint, shows a success panel, and issues no network request. The single
`TODO` in `lib/leadForm.ts` marks where a real endpoint attaches. Wiring it
means the page starts collecting personal information and needs a privacy
notice.

## Review chrome, not design

`components/VariantSwitcher.tsx` and `/compare` exist to compare directions.
They are deliberately neutral, never borrow a variant's palette, and hide
themselves inside iframes. Neither ships with a chosen direction.
