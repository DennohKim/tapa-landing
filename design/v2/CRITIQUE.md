# Critique log

## Mechanical results before round 1

- `shoot.mjs` (390, 768, 1280, 1440): no FAILs.
- `matrix.mjs`: windows-125, windows-150, windows-hc, linux, android, reflow-320, motion, l10n, l10n-phone all clean. Firefox, Safari and Safari iPhone **skipped** (engines not installed).
- Fixed before round 1: reduced-motion clipped ticker on the POS screen (now one "650 KES" each side), CTA below the fold at 1280×610 (hero min-height), CTA wrapping at 320 (label shortens to "Talk to us" under 360px), hero headline under the band at 320 (phone hero is now a column), phone till captions collapsing to one word per line, band stops cut off at the top of the till, text layered above the 3D canvas so the band passes behind copy in flight.

### Warns answered

- **13 distinct text sizes.** Deliberate: 12, 13, 14, 19 and the 40/96/140 steps belong to the POS screen, which replicates the real terminal UI at its native 360×720 size (it is product evidence, not page type). The page's own scale is display, h2, 26, lede, 18, 16, 15, 13.

## Round 1 (renders: shots/r2)

| # | Line | Score |
|---|---|---|
| 1 | Concept on the page | 4 |
| 2 | Not the category average | 4 |
| 3 | Not a slop face | 4 |
| 4 | First screen | 4 |
| 5 | Typography | 3 |
| 6 | Colour | 3 |
| 7 | Richness | 4 |
| 8 | Structure and rhythm | 3 |
| 9 | Craft | 2 |
| 10 | Responsive | 3 |
| 11 | Everyone's computer | 2 |
| 12 | Signature | 4 |
| 13 | Screenshot test | 4 |
| 14 | Fidelity | 4 |

Not done (two lines at 2, 7 of 13 at 4+).

Five asks and what happened:
1. Collision-proof band and labels: done (per-frame label/h1/nav/viewport test, strap callout dropped under 1100px, NFC label above the tag, smaller phone/768 band, nowrap button with short phone label, shadow from real bounds, clamped ink balance chip).
2. Till rework: done in part. Terminal 270 → ~310px wide (350×760 not reachable with room for the band above it), tap rests on the reader mark with ring + press, flood grows from the screen rect, rest stop in the right column. Phone terminal 210–230px (240 does not fit with caption + band in 844px).
3. Moments recoloured to the night's light (no orange/green), 400px sheets, 80px offsets, overflow hidden.
4. Offline beat: green drains to grey, struck-signal eyebrow, POS clock 22:16, two-line "Saved, will send", "Offline used", full-ink captions, U+2011 in M‑Pesa, close band in profile.
5. LED 5×7 glyph labels, phone rows split, intro aligned to ledger, future rows #8A9097 with "—", facts 40px after the pin with larger headings.
Also: band rests in the FAQ intro; the close ends with a three-field brief that builds the email; sticky-pin clip removed (the "lighter box").

## Round 2 (renders: shots/r3)

| # | Line | R1 | R2 |
|---|---|---|---|
| 1 | Concept on the page | 4 | 4 |
| 2 | Not the category average | 4 | 4 |
| 3 | Not a slop face | 4 | 4 |
| 4 | First screen | 4 | 5 |
| 5 | Typography | 3 | 4 |
| 6 | Colour | 3 | 4 |
| 7 | Richness | 4 | 4 |
| 8 | Structure and rhythm | 3 | 4 |
| 9 | Craft | 2 | 3 |
| 10 | Responsive | 3 | 4 |
| 11 | Everyone's computer | 2 | 4 |
| 12 | Signature | 4 | 4 |
| 13 | Screenshot test | 4 | 5 |
| 14 | Fidelity | 4 | 5 |

**Done by the stop rule** (no line below 3, 12 of 13 at 4+), conditional on Firefox and Safari passes. Partial declines accepted by the critic: terminal ~310px wide (not 350), phone terminal 210–230px (not 240), held 3px press with a looping ring.

## Fixed after the last round, not rescored (renders: shots/r4)

1. Moments stack: a covered sheet's title, paragraph and list fade to 0 over the 140px before the next sheet's edge reaches the title, so no edge ever crosses a display glyph (1440 and 390 checked).
2. Flood timing: grow, drain and the Saved grow each take 4.5% of the pin (about 120px of scroll) with ease-out, so the half-green frame is a blink.
3. Lift path: new "rise" stop beside the reader, above the screen's top edge, before the band drops to its rest in the right column; it no longer crosses "Paid".
4. Eyebrow reads "3 queued" once Saved lands; sheet text column moved 8px to line up with the moments intro; phone hero shadow tucked up under the band with 24px clear above the h1.
5. Close placeholders read "e.g. …" in 58% ink, lighter than typed values.
6. **Found by the Firefox/WebKit passes:** the `modulepreload` for band.js sat before the import map, so Firefox rejected the map and silently fell back to the poster image. The import map now comes first; Firefox and WebKit render the full 3D experience (checked hero, till, flood, night, moments, close in both).

Final mechanical results: scan no FAILs; matrix 12 of 12 passes (now including Firefox, Safari, Safari iPhone) with 0 FAILs.

### Warns answered (final)

- **13–14 distinct text sizes:** the POS screen replica at native size (see above).
- **12 text elements invisible after scrolling (moments sheets):** deliberate. They are the covered sheets' title and body, faded only while another opaque sheet sits on top of them; the role/time row stays visible and the text remains in the accessibility tree.

## User feedback after the rounds

- Tag print rebuilt (band.js `cardTexture`): the brand lockup now uses the v1 proportions (cream tile with the orange mark, wordmark 0.566× tile height, ascender at 0.253×, gap 0.158×); the stray loose mark is gone; a four-arc EMV-style contactless symbol sits top-right on the same row as "KILELE NIGHTS"; "Tap to pay" and "B1310" share one baseline; every element sits on the same left and right edges inside the print area between the slots. Hero poster re-rendered; the "NFC tag" callout now points at the contactless symbol. Scan: no FAILs.
- Night section reframed per the user: no sweeps, USDC or tokens. The LED wall and the list now show Kilele Bar's sales coming in from three tills (22:14 and 22:16 are the till section's taps); the FAQ answer and the "All night" sheet were reworded to match.
- Terminal rebuilt per the user's reference as a handheld Android POS (368×812 natural): rounded printer housing with two lugs and a recessed paper lid, tear-bar paper slot, screen set in a black glass panel with a diagonal glare, three keys on the right edge, mic hole. The contactless mark sits on the lid and the band taps there (ring + press). POS screen shortened to 360×642 to keep the device proportion. Scan no FAILs; matrix 12/12 passes 0 FAILs.
- POS screen ported from terminal-pos/design/tapa-till-review.html (round 18), replacing the hand-rolled approximation: same tokens, Mona Sans type scale (t-display / t-fill / t-headline / t-title / t-figure / t-button / t-body / t-meta / t-label), Android status bar and 3-button nav, top bar with the circled back arrow and the centred "Kilele Bar · Till 1" (becomes the "Offline · 2 queued" pill offline), the price ribbon with the clasp open while waiting and shut while checking, sew lights, the Paid result (word fills the width, ruled balance line, Next sale) and the Saved result (headline, "Band read OK" note, allowance meter, Next sale + View queue). Fixed a markup bug that drew the mark as a third clasp block. Scan no FAILs; matrix 12/12 passes 0 FAILs.
- Moments sheets recoloured by time of day (user choice over the grey ramp): afternoon sky, dusk, night blue, small hours, each as a zenith-to-horizon gradient. State colours stay off this section. Scan no FAILs (one saturated hue family on the page); matrix 12/12 passes 0 FAILs.
