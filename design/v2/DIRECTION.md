# Tapa landing v2: direction

## Brief (partly self-authored)

- **What:** marketing site for Tapa, cashless NFC wristband payments for events in Kenya. Redesign of `design/landing-mockup.html` (kept untouched; v2 lives in `design/v2/`).
- **Who:** organisers of festivals, concerts and club nights in Kenya, and the people they bring in to run bars and stands.
- **The one job:** in ten seconds, understand that guests pay with a wristband loaded by M-Pesa, that it keeps working offline, and that stands get paid during the night. Then "Talk to us".
- **Feel (from the user):** cool, appealing, "really really cool". Mockups must look real, like a product shot of an actual RFID fabric wristband. Animations that hand off from one section to the next.
- **References:** inspora.design (Web): real objects lit like product photography (a Game Boy, a lanyard badge, jelly sweets), engraving, dot matrix, 3D cards. The wristband pile photo (woven sublimated straps, PVC tags threaded through slots, plastic slider locks). Behance "Wristband Mockup" returned 403; the photo stands in for it.
- **What exists:** name, Tapa mark and traced wordmark (`design/brand/`), brand orange `#FB5B37` and cream `#EBEBDA` (shared with the POS and console), state colours from the POS (Paid green `#23C865`, Saved yellow `#FFD23F`), the full v1 copy, the terminal "Paid" screen built in HTML, one licensed photo (Unsplash, a US festival, not Kenya).
- **Image generation:** none connected. Imagery = the product itself (terminal UI in HTML), the wristband built in three.js, drawn in code.

## Current (v1 mockup)

- Warm canvas ground `#EDEAE4`, Mona Sans expanded 900, orange buttons, woven ink "band" tickers, terminal playing a Paid sale, Paid/Saved colour fields, a four-column timeline, FAQ, photo close.
- Wears: part of the Paper Edition (warm paper, black/orange pill button, stats-ish "stations" strip), two marquees, template order (hero, features trio, timeline, FAQ, CTA band).
- Works and must survive (keep list): the copy and every fact in it (M-Pesa top-up, ~1 s sale, offline allowance, 10-minute sweeps, USDC on Base unseen, lost band freeze, reversals, nothing to refund, four moments, five FAQ answers); the logo; brand orange; the terminal Paid moment and the Paid/Saved state colours; mailto CTA.
- Lose: the marquees as decoration, the warm paper ground, the stats strip.
- History row for v1: `object|paper|expanded|orange|data|scroll-story`.

## The category default we refuse

Cashless-festival competitors (Tappit, Intellitix, PlayPass, Weezevent, Glownet) share: a crowd-with-raised-hands-at-sunset photo, a wristband macro on a dark purple or magenta gradient, "Go cashless", a logo wall of festivals, a stats strip ("500+ events, 30M transactions"). The category colour is festival neon purple; the fintech colour is money green. Natural slop faces for this brief: the Launch Page (dark, glow, neon) and the Paper Edition (what v1 drifted into).

## Imagery we can honestly get

The product itself: the wristband (built in three.js from the reference photo: woven sublimated strap, PVC tag threaded through two slots, slider lock, loose tail), the Sunmi V2s terminal and its real screens (HTML, from the POS), the stands' numbers. No festival stock: the one licensed photo is a US festival and the category cliché, so it is dropped.

## Three concepts

| | A · Studio object | B · Stage LED wall | C · Strap print |
|---|---|---|---|
| Sentence | Tapa is the wristband itself, shot like a product launch. | Tapa is the LED wall beside the main stage at 22:14. | Tapa is a roll of sublimation-printed strap. |
| Family | objects and materials | media / place | printed matter |
| Ground | light (cool studio sweep `#E4E7EA`) | dark (truss black `#0B0C0B`) | colour field (cobalt `#2140E8`) |
| Type | Bricolage Grotesque (warm grotesque, width axis) | Big Shoulders Display + Text (condensed signage) | M PLUS Rounded 1c (rounded) |
| Richness | 3D object (three.js band) | data, as a dot-matrix LED canvas | colour-material (woven straps in SVG) |
| Accent | orange `#FB5B37` | green `#2BD46E` | yellow `#FFD23F` |
| Grammar | scroll-story | single-screen | poster |
| Motion | 3D object: slow sway, eased pointer tilt, callouts that track the object | dot matrix: scrolling LED label, tap, flood, PAID | kinetic type: balance ticking down per tap, straps drifting on pointer |

Shots: `shots/explore-a`, `shots/explore-b`, `shots/explore-c`.

**Winner: A, merged.** It is the only one where the first thing you see is the product, and it is what the user asked for (a mockup that looks like a real wristband). It is also the one a designer would screenshot.
- From B: the dot-matrix LED wall, used once, for the night section where stands get paid (data is the right richness there).
- From C: the ground as a colour field that changes with meaning. The section grounds are the terminal's own result screens: Paid green floods out of the screen when the band taps, Saved yellow when it taps offline, then the lights go down for the night.
- B lost as the lead because a dark LED page is one step from the category's neon-festival default and shows no band. C lost because its straps are illustration standing in for an object we can actually render, and the text fights the ribbons.

History check against v1 (`object|paper|expanded|orange|data|scroll-story`): v2 is `object|colour-field|grotesque|orange|3d-object|scroll-story`, 3 of 6 columns differ. **Deliberate evolution:** orange is brand equity shared with the POS and console; the source stays the band because the band is the product; scroll-story is what the user asked for ("animations that sync one section to the other").

## Tokens

Colour (light ground; no dark mode, `color-scheme: light`, except the night section which is a designed dark field):
- `--ground #E4E7EA`: a cool grey studio sweep, so the band reads as a lit object, not a print.
- `--ink #121417`, `--ink-2 #4A5057` (6.6:1 on ground).
- `--accent #FB5B37`: the Tapa tile. One job: the "Talk to us" action. On the orange close it inverts to ink.
- `--paid #23C865`, `--saved #FFD23F`: the POS result screens. Only where a sale lands or is saved.
- `--night #0D0F10`, `--night-ink #EDEBE4`, `--night-ink-2 #A9A79F`: the venue after dark, for the money section.
- `--cream #ECEBDB`: the mark's colour, on the band print and the close button.

Type: **Bricolage Grotesque**, because it is a gig-poster grotesque whose ink traps look printed, like the event print on the strap, and its width axis gives a condensed display voice and a normal text voice from one family. Display 800 at `wdth 82`, text 400 to 600 at `wdth 100`. Scale: display `clamp(56px, 8.4vw, 136px)`, h2 `clamp(40px, 5.4vw, 84px)`, h3 26, lede 20, body 18, small 15, meta 13. Tabular figures on every amount.

Space: 8, 12, 16, 24, 40, 64, 104, 168. Gutter `clamp(20px, 4vw, 64px)`. 12-column grid, max 1440.

Radius family, from the PVC tag (corner = 12% of the short side): buttons 14, sheets 28, device 38. Shadows only on things that float (the terminal, the sheets).

## Grammar (scroll-story)

1. **Hero** (what is it?) The band, big, lit, turning a little, three callouts that track its parts. Headline, one line, Talk to us.
2. **Load** (how does money get on it?) The band turns its tag toward you; a balance tag tracks the tag and counts from KES 0 to 2,000 as you scroll.
3. **The till** (what happens at the bar? what if the signal drops?) Pinned. The band flies down to the terminal, taps, the screen floods green and the flood fills the section. Signal drops, it taps again, Saved yellow. Captions swap with the beats.
4. **Night** (when do stands get paid?) Pinned, dark. An LED wall where the clock runs 22:00 to 23:00 with the scroll and Kilele Bar's sales come in from its three tills. A list of the latest sales and two facts beside it. (User decision: no sweeps, USDC or tokens on the page; that is plumbing organisers do not need.)
5. **Four moments** (how does an event run?) Stacked sheets, one per moment, coloured by time of day: cream (before), orange (doors at dusk), ink (all night), green (close, books balanced).
6. **Questions** (what if it goes wrong?) Five answers.
7. **Close** (how do I start?) Orange field, the band lands beside the action.

## The signature: the tap that floods the room

- **Trigger:** scroll progress through the pinned till section (scrubbed, reversible).
- **Frames:** 0 to 4%: the band arrives and hovers up-right of the terminal. 4 to 15%: it lowers onto the reader mark on the top bezel. 15 to 23%: held; the reader mark lights with a ring, the device presses 3px, the screen shows "Keep it there · Checking band #B1310" and its stitches run. 23%: Paid; the screen floods green in 420 ms (spring). 23 to 27.5%: the green grows from the screen's own rectangle to the whole section. 29%: the band rises beside the reader, above the screen. 36 to 44%: it rests in the right column. 46 to 50.5%: the signal drops; the green drains back into the screen, the eyebrow becomes "Signal lost · 2 queued · 22:16". 58 to 66%: second tap. 66 to 70.5%: Saved yellow grows from the screen; the eyebrow says "3 queued". 72%: rise. 78 to 88%: rest. 97%: the band leaves upward.
- **Easing:** band position and rotation follow scroll through a 0.16 per-frame lerp (inertia); floods ease-out over about 120px of scroll.
- **Reduced motion:** no flight and no growth. A still band is glued to each stop (hero, load, till, FAQ, close); the till switches instantly between waiting, Paid green, grey and Saved yellow as you scroll.

## Moments, revised after critique

The sheets are slices of the Nairobi sky at each moment, never the state colours (green, yellow and orange keep their jobs). Each is a vertical sky gradient, darker at the zenith and lighter at the horizon: the day before, afternoon sky #A9CCE6 → #D2E5F2; 18:00, dusk #E58A69 → #F2B48A → #F6C99B; 22:14, night #121A35 → #22305A; 02:30, small hours #06080D → #121722. Ink text on the first two, cream on the two night sheets. (User decision, replacing the earlier grey ramp.)

## Recorded look

`tapa-landing-v2|site|object|colour-field|grotesque|orange|3d-object|scroll-story` (history.md). 3 of 6 columns differ from v1; deliberate evolution, reasons above.

## Voice

Talks like the event-ops lead who has run a few hundred nights: short, exact about money and minutes, never salesy.

## Content

All facts come from the v1 copy (keep list). Invented names follow v1: Kilele Nights (event), Kilele Bar · Till 1, Achieng O., band B1310.

- **Nav:** tapa · How it works · For stands · Questions · Talk to us
- **Hero:** H1 "Your ticket is now your wallet". Lede "Guests load money onto an NFC wristband with M-Pesa and tap to pay at every bar and stand. About a second per sale, even when the signal drops." Button "Talk to us about your event". Callouts: "NFC tag / About a second per sale"; "Points at a wallet / The money never sits on the band"; "Linked at the gate / One scan of the ticket".
- **Load:** H2 "Every ticket gets its own wallet". Body "Guests top up in shillings with M-Pesa, before or during the event, and wear the band that points at their wallet. Lose the band and the help desk freezes it. The balance stays put." Balance tag "Band B1310 · Achieng O. / KES 0 → 2,000 / M-Pesa top-up · 21:02".
- **Till, beat 1:** H2 "A sale takes about a second". Body "The cashier keys the amount, the guest taps. No phone, no PIN, no waiting on an M-Pesa prompt." Screens: "Kilele Bar · Till 1", "Charging · KES 650", "Hold band to the top / Waiting for tap", "Keep it there / Checking band · #B1310", "Paid 650 KES", "Achieng O. · balance left 1,350 KES", "Next sale".
- **Till, beat 2:** H2 "Keeps selling when the signal drops". Body "Terminals take sales on trust up to an offline allowance you set, queue them, and send them the moment they reconnect. A sale can never be charged twice." Screens: chip "Offline · 2 queued", "Charging · KES 400", "Saved, will send 400 KES", "Offline allowance used 1,600 / 6,500 KES".
- **Night:** H2 "Stands get paid during the night". Body "Every sale shows up the moment it happens, and the money reaches each stand's own wallet while the night is still going. No float, no waiting days after the event." LED wall: "KILELE BAR", clock 22:00 to 23:00, takings KES 28,800 → 41,250, latest sale ("+650 · TILL 1"). Sales: 22:02 T2 650 · 22:05 T1 1,200 · 22:09 T3 300 · 22:14 T1 650 · 22:16 T1 400 · 22:21 T2 950 · 22:26 T3 650 · 22:31 T1 1,800 · 22:34 T2 300 · 22:40 T3 1,150 · 22:44 T1 650 · 22:51 T2 2,400 · 22:55 T3 500 · 22:58 T1 850 (22:14 and 22:16 are the till section's two taps). Facts: "Watch every stand, live / The organiser console shows sales as they happen, freezes a lost band, and handles late reversals with a reason on record." "Nothing to refund at the end / Unspent money never left the guest's wallet, so there is no refund queue when the lights come up."
- **Moments:** H2 "An event, from setup to the last round". Lede "Four moments, four kinds of people. Each one gets a screen built for exactly what they do." Sheets: The day before · Organiser · Before (Stands, prices and caps / Terminals set up by QR); 18:00 · Gate staff · Doors (Ticket scan, band linked / Re-entry is a single tap); 22:14 · Cashiers and help desk · All night (Swept to stands every 10 min / Reversals with an audit trail); 02:30 · Organiser · Close (Statement per stand / Unspent money stays with guests). Bodies verbatim from v1.
- **Questions:** H2 "Questions organisers ask", lede "The short version of how Tapa behaves when a real night gets messy.", the five v1 answers.
- **Close:** H2 "Running an event this season?" Body "Tell us the date, the venue and how many stands. We'll set you up with bands, terminals and the organiser console." Button "Talk to us". Footer "by Expendi · © 2026", nav.
