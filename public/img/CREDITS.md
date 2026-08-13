# Photography credits and licences

Every photograph in this build is free to use. Nothing here is generated, and
nothing is drawn — the brief rules out vector art and illustration, so the only
imagery on any direction is a real photograph of a real object.

Two licence families are in play, and they carry different obligations. That
distinction is the one thing on this page that could cost money if it is
ignored, so it is recorded per file rather than summarised.

## CC0 / Public Domain — no obligation

The Metropolitan Museum of Art, Open Access. Free for any use, commercial
included, with no attribution required. Credit is given below anyway, because
a page selling craft should say where its material came from.

| File | Object | Met object ID |
|---|---|---|
| `figure-diadoumenos.webp` | Fragments of a marble statue of the Diadoumenos | 251838 |
| `torso-athena.webp` | Marble head and torso of Athena | 251476 |
| `bust-caligula.webp` | Marble portrait bust of the emperor Gaius (Caligula) | 248851 |
| `bust-herodotos.webp` | Marble bust of Herodotos | 245829 |
| `head-caracalla.webp` | Marble portrait of the emperor Caracalla | 253592 |
| `head-constantine.webp` | Marble portrait head of the Emperor Constantine I | 252884 |
| `torso-eros.webp` | Marble torso of Eros | 257633 |
| `torso-rosso.webp` | Rosso antico torso of a centaur | 248143 |
| `torso-boy.webp` | Marble torso of a boy | 254969 |

Source: `https://www.metmuseum.org/art/collection/search/<object ID>`

## CC BY / CC BY-SA — attribution required, and share-alike on two of them

Wikimedia Commons. These are resized, which makes the file in this repo a
derivative work. **CC BY-SA obliges a derivative to carry the same licence**,
so the four BY-SA files below cannot quietly become proprietary site assets.
For a comparison prototype that is fine and the credit line in each footer
discharges it. Before this goes live commercially, either keep the visible
credit and accept the share-alike terms, or replace these five with CC0
equivalents.

| File | Original | Author | Licence |
|---|---|---|---|
| `cast-relief.webp` | The V&A Cast Courts-8598 | www.mgaylard.co.uk | CC BY 2.0 |
| `gallery-relief.webp` | The V&A Cast Courts-8602 | www.mgaylard.co.uk | CC BY 2.0 |
| `cast-hall.webp` | Victoria and Albert Museum (4 August 2023) 24 | DiscoA340 | CC BY-SA 4.0 |
| `quarry-face.webp` | Carrara marble quarry face | Wittylama | CC BY-SA 4.0 |
| `quarry-range.webp` | Marble Quarry near Carrera | Ingo Mehling | CC BY-SA 4.0 |

Source: `https://commons.wikimedia.org/wiki/File:<original file name>.jpg`

## Processing

Originals were downloaded at full resolution, resized to a maximum 1200–1500px
on the long edge and encoded to WebP at quality 62–80 — lower for the
detail-dense quarry and cast-court photographs, where the grain is material
rather than information and was costing three times its worth. No cropping, no
colour grading, no retouching: every treatment on the pages is done in CSS, so
swapping a photograph never means re-editing a file.
