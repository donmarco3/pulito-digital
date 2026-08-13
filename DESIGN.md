# Pulito Digital design system

Recorded from the built world, not from intention. Product truth lives in
`PRODUCT.md`.

One page, at `/`. **ULTRAMARINE — the institution.** Drenched ultramarine,
warm bone accent, Libre Caslon Display, and one lit marble head screened into
the ground so it stands in the page rather than on a rectangle.

It was chosen from five photographic directions built and compared side by
side. The four that lost — Nero, Bianco, Cava, Gesso — and everything that
belonged only to them are in git history at `6670c6a`. What follows describes
what shipped; where a rule was learned from one of the others it says so,
because the reason usually outlives the page that taught it.

## The premise

**Every picture is a photograph of a real carved object.** No vector art, no
illustration, no generated imagery, no icon set. That is the user's
instruction and it is the single decision the whole system falls out of: when
the only picture you are allowed is a photograph, the design work moves into
ground, crop, type, measure and rule.

The world this replaced was the opposite — three arch-led pages whose every
object was hand-authored SVG. The reason it went is worth keeping: **a page
selling craft to people who build things cannot argue for real material with a
drawing of it.**

**Radius 0.** The only curves anywhere are the ones inside the photograph — a
carved shoulder, a jaw, a cut lip of stone. A rounded button would put a second
kind of curve on the page and immediately make the first kind decorative. The
tweak bar exposes `--radius` anyway, with that written next to the slider: it
is there to be understood, not to be dragged.

## Tokens

Declared once in `@theme` in `app/globals.css`. Contrast is measured against
the ground each token actually sits on and recorded beside the value.

| Token | Value | Measured |
|---|---|---|
| `--color-ultra` | `#12306e` | the ground |
| `--color-ultra-2` | `#0d2454` | recessed bands |
| `--color-ultra-rule` | `#2f4c8c` | decorative hairline |
| `--color-ultra-rule-strong` | `#8ba0c8` | 4.6:1 — field borders, WCAG 1.4.11 |
| `--color-ultra-bone` | `#f3f1ec` | 11.4:1 on the ground |
| `--color-ultra-bone-soft` | `#bcc7de` | 6.4:1 |
| `--color-ultra-signal` | `#e8e3d6` | 10.8:1 — the action fill |
| `--color-obsidian` | `#121214` | 14.6:1 on the signal fill |

**These values are editable at runtime.** The tweak bar overrides these exact
custom properties, which is why the panel recomputes every ratio above as the
colours move — a tool that lets measured colours be dragged without
re-measuring would quietly destroy the property this table is asserting.

**Never knock a soft token down with alpha.** Every photo credit line was once
`*-soft/70`, which took a sound 6.4:1 token to 4.4:1 — and those lines carry
the CC BY / CC BY-SA attribution, so the copy with a legal obligation attached
was the least legible on the page. If a label reads too loud, make it smaller;
do not fade it.

**One accent, and it marks what can be pressed.** The bone signal fills the
button and nothing else is filled with it. Every accent is its own boundary on
its own ground, so a fill needs no hairline around it to satisfy WCAG 1.4.11.

## Type

**Libre Caslon Display** for the display voice — a real Caslon cut for
headlines, institutional without being a wordmark — over **Archivo** for
controls and **Geist** for running text, with **Geist Mono** for measured
values.

Three further display faces (Bodoni Moda, EB Garamond, Bricolage Grotesque)
are still loaded in `app/layout.tsx` for one reason only: the tweak bar's face
picker. **They are the page's largest remaining weight and they should come
out the moment the lettering is settled** — three imports in that file, three
tokens in `globals.css`, three options in `TweakBar.tsx`.

If the faces are ever moved off the root, the trap fails silently: `@theme`
declares `--font-caslon: var(--font-caslon-src), …` on `:root`, and a custom
property is substituted at computed-value time **on the element it is declared
on**. Move a face variable off `<html>` and that declaration references
something that does not exist there, so the token computes to the
guaranteed-invalid value and inherits as empty into every descendant —
wordmark and all — with no error anywhere.

**No kicker above the heading.** It carried a tracked "Web, search and
automation" line, and the subhead one element later said the same thing again,
so the label was not even paying for itself in information.

**The headline is one text node; its line break comes from the measure.**
`lg:max-w-[10ch]` plus `text-balance` produces "Built to be / looked at." on a
wide screen and re-breaks sensibly on a narrow one. It used to render two
variants of the same words — a phone string and desktop line spans — and that
is fine until you make it `contenteditable`, at which point the caret lands
between them and rewriting the headline produces "Built to be Made to be
looked at.looked at.". **A headline you can rewrite in place has to be a
single string.** If you change it, check the wrap at 1440 and at 390.

## Structure

Hairlines divide; services are ruled rows, never cards. A card is a box, and
the only closed shape allowed on this page is the photograph.

Composition is deliberately asymmetric and deliberately not centred: the head
holds the right two-fifths at full height, the headline runs under and across
it, and the action sits in the reading path rather than beside it.

Section order: hero → problem → services → process → offer → enquiry → FAQ.
Vertical rhythm is one `.band` utility scaled by `--rhythm`, so density moves
across the whole page from one control rather than from twelve edits.

## Photograph treatments

Every treatment is CSS over an untouched file, never a baked-in edit, so
swapping a picture never means re-exporting anything.

- **`plate-screen`** — museum object photography arrives on a near-black
  sweep; `screen` throws the sweep away and leaves only the lit stone. **This
  only works on a plate shot against a near-black ground** — caracalla,
  caligula, herodotos. On a mid-grey sweep it leaves a pale rectangle floating
  in the blue, which is exactly why the framed figure below the fold is
  duotoned instead. The tweak bar's photograph picker offers every plate and
  says this next to the toggle.
- **`plate-vignette`** — `screen` fully erases only a pure-black sweep, and
  museum sweeps lift towards the top of frame. The mask dissolves the frame
  edge so the residue has no straight line to draw. It is authored as a mask
  rather than a gradient overlay, because an overlay would sit *on* the
  photograph and grey the stone it is meant to rescue.
- **`plate-duotone`** — `luminosity` over a wrapper carrying the ground's own
  fill. The framed plate read as a hole punched in the blue until it took the
  page's hue and kept only the photograph's lightness. **The wrapper must
  carry the fill**; `luminosity` over nothing does nothing.
- **`plate-graded`** — `brightness()`/`contrast()` from custom properties,
  defaulting to a no-op. It exists for the tweak bar and costs the shipped
  page nothing.

**Every `<Image>` carries the recessed-band colour behind it**, so a bad
site-visit connection shows the world's own ground rather than a blank box.

## Motion

All CSS. No React state for a continuously changing value, no scroll listeners,
no pointer listeners. One authored entrance, `motion-settle` — the page settles
down under its own weight — plus `plate-develop`, which brings the hero plate
up out of nothing to full value the way a print comes up in a tray. That is the
vocabulary photography actually has, and nothing on this page is drawing.

**The reveal's failure mode is the rule worth keeping.** It was a Framer Motion
component with `initial={{ opacity: 0.25 }}`, which put `opacity:0.25` on every
section below the hero in the server-rendered HTML, where nothing removed it
until the bundle arrived. Body copy at 25% measures 1.41:1. The comment
justified the 0.25 as insurance "so nothing is invisible if the observer never
fires", which was the bug wearing the mitigation's clothes. The CSS version
cannot fail that way: a browser without `animation-timeline` drops that one
declaration and is left with a zero-duration animation under `both` fill, which
resolves immediately to the finished state.

**Any future entrance animation must be verifiable in the built HTML.** Grep
the output for a hidden initial state; if a block ships hidden and only a
script can reveal it, it is a bug regardless of how the animation is written.
The current build ships no inline `opacity` at all.

Under `prefers-reduced-motion` every animation is forced off and the resting
state each ends on is the composition. `filter` is reset there explicitly as
well as `opacity` and `transform`, because a gesture that animates `filter`
would otherwise rest blurred. `letter-spacing` is settled in a **separate**
rule from the animation reset: it inherits, so folding it into the shared
selector would put a tracking value on every `.reveal` wrapper and from there
into every descendant, re-wrapping the whole page for reduced-motion readers
alone.

## The tweak bar

`components/TweakBar.tsx`. Live editing of the page it sits on: palette, type,
layout, photograph and copy, with a measured contrast readout and an export
that hands the changes back.

It exists because a landing page is argued about in specifics — "the blue is
too cold", "the headline wants to be bigger", "try the other head" — and the
edit / rebuild / look loop is far too slow for that conversation.

Four properties hold it together:

1. **It moves CSS custom properties, not React state.** Every control writes to
   `document.documentElement.style`, so the page repaints without re-rendering
   and a slider stays smooth with the whole document open. It also means the
   page stays a **server component**: the bar is the only thing on the site
   that hydrates.
2. **The defaults live in the stylesheet.** `globals.css` holds the real
   design; the bar only overrides. Delete the bar and the page is unchanged —
   the property that makes it safe to keep around.
3. **It can hand the changes back.** EXPORT copies a paste-ready block: CSS
   overrides for `globals.css`, edited copy keyed by its path in
   `content/site.ts`, and any photography change. A tweak tool that cannot tell
   you what you changed is a toy — you end up with a look you like and no way
   to ship it.
4. **It never renders for a visitor.** Development only, or `?tweak` on the URL
   for a deployed preview. Verified against the production build: the panel is
   absent from the emitted HTML.

Two implementation notes worth keeping:

- **State lives in a small external store read through `useSyncExternalStore`,
  not `useState` seeded from an effect.** The natural shape — restore from
  `localStorage` in an effect, then `setState` — is the cascading-render
  pattern React now flags, and the flag is fair: `localStorage` and the URL are
  external systems. It also buys the property that matters here for free: the
  server snapshot is a constant `enabled: false`, so the first client render
  agrees with the server and the panel is never briefly painted into a page
  that should not have it. The snapshot is a **string**, because `getSnapshot`
  must return a stable reference or React re-renders forever.
- **Swapping a photograph must clear `srcset`, not just `src`.** Next emits a
  responsive set and the browser prefers it, so setting `src` alone changes
  nothing and reads as a broken control.

Editable copy is marked in the page with `data-copy="<path>"`, naming its home
in `content/site.ts`. Editing happens **in place on the real elements** rather
than in fields in the panel, because a headline can only be judged at its real
size against the photograph it sits on. Export reports only what actually
changed, by comparing against the text each element started with.

The floating toggle steps aside when the panel opens (`right-[21rem]`). Left at
`right-0` it sat on top of the panel's own footer and swallowed the clicks
meant for Export and Reset — a control covering the controls.

`Reset` removes the inline custom properties as well as clearing the store. A
property set on `documentElement` outlives a React reset, so without that the
panel would report the shipped design while the page kept showing the
overrides.

## Accessibility rules this system holds to

- Body text ≥4.5:1, large text ≥3:1, non-text UI boundaries ≥3:1, measured
  against the ground each element actually sits on. Where type sits over a
  photograph, measure from the **rendered background with the text hidden**, at
  its lightest patch — sampling the text's own box measures the glyphs, not
  what they sit on.
- Nothing sets `focus:outline-none`. The `:focus-visible` ring is
  `currentColor`, because it has to survive on the ground, on the recessed
  band, on top of the bone fill — and keep surviving after the tweak bar has
  moved all three.
- An invalid field carries the error in its own border as well as in the
  message beneath it.
- **Form fields are 16px minimum.** Mobile Safari zooms the viewport when a
  field under 16px is focused and does not zoom back out.
- Submitting unmounts the form and the button that had focus with it, so the
  success panel takes `tabIndex={-1}` and is focused on mount. `role="status"`
  announces the outcome without moving anyone to it.
- A skip link, moved off-screen by transform and never by `display: none`.
- One `h1`, no skipped heading levels.
- Process steps are `<li>` elements carrying `.reveal` directly. Wrapping them
  in the `Reveal` div would put a `div` between `<ol>` and `<li>`, which is
  invalid and drops the list semantics a screen reader uses to announce
  "step 2 of 4".
- The disclosure marker is a typographic `+`, not an icon. The brief rules out
  vector art, and an icon set is vector art with a licence attached.
- `color-scheme: light` on the root so native selects and the scrollbar match.
- `scroll-margin-top: 6rem` on all ids, so anchors clear the sticky header.

## Responsive rules earned the hard way

- **The plate comes before the headline on a phone.** The picture is the
  argument, and burying it below three screens of type would be making the case
  everywhere except where it is read.
- **The phone hero is tuned so the action clears the fold.** It is the one
  conversion event the page has.
- **An attribution is shortened, never truncated.** A credit clipped to
  `CC BY-S…` severs the licence name on a CC BY-SA image, and `title` is not
  reachable on touch.

## Content

Every visible string lives in `content/site.ts`, in two halves, and the split
is worth keeping now that one direction ships. `site` is **product truth** —
services, process, offer, FAQ, form — facts about the business. `direction` is
**voice** — how the page opens, how it puts the problem, what it calls its own
sections. That half changed five ways while five directions were compared, and
it is the half that will keep changing.

Standing constraints from `PRODUCT.md`: no testimonials, logos, ratings or
client numbers; no pricing in any form; Australian English; Adelaide carried by
the header, FAQ, title and schema rather than by the headline.

**Open:** two commitments predate this build and are not granted by
`PRODUCT.md` — the reply time ("within one business day") and the delivery
estimates ("a couple of weeks", "four to six"). They are operational promises
rather than invented proof, so they were left as written rather than quietly
softened. They need the owner to confirm them or they need to change.

## Photography

Fourteen files in `public/img`, all free-licence, downloaded rather than
hotlinked so the build carries no CDN dependency and no layout shift. The page
uses two — `head-caracalla` in the hero and `figure-diadoumenos` framed below —
and **the rest are kept deliberately**, as the tweak bar's photograph library.

- **Nine CC0** from The Met Open Access — no obligation.
- **Five CC BY / CC BY-SA** from Wikimedia Commons. The resize made every file
  in this repo a derivative, and **CC BY-SA obliges a derivative to carry the
  same licence**. None of those five is currently on the page; if the tweak bar
  puts one there, the footer credit discharges attribution and the share-alike
  terms become a decision to make before going live.

`public/img/CREDITS.md` records licence, author and source per file. Alt text
describes the object, never the treatment: a screen reader user gets told there
is a marble Diadoumenos; being told it has been screened into an ultramarine
ground tells them about CSS, not about the page.

**Subject choice is a design decision, not just a licence one.** This is a cold
page opened on a phone on a building site, sometimes with a client present.
The plate library contains several nudes; the two on the page are a portrait
head and a figure well below the fold, and that was deliberate.

## The enquiry form

`components/EnquiryForm.tsx` with its skin in `components/skins.ts`. Four
fields, matching the "Four fields" promise in the copy. The skin may only
change class strings; markup, validation, accessibility wiring and the
demo-only submit are shared — which is why, after five directions, the form was
already the tested one.

Demo-only: it validates, focuses the first invalid field after paint, shows a
success panel, and issues no network request. The single `TODO` in
`lib/leadForm.ts` marks where a real endpoint attaches. **Wiring it means the
page starts collecting personal information and needs a privacy notice.**
