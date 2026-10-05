# Tapa Landing

Marketing site for Tapa. Next.js 16 (App Router), Tailwind 4, Motion, and
[Aceternity UI](https://ui.aceternity.com/) components vendored through the shadcn CLI.

Pages:

- `/` — home
- `/devlog` — build log, one entry per step, sourced from `devlog/*.md` (not built yet)

## Run it

```sh
pnpm install
pnpm dev         # http://localhost:3030
pnpm typecheck
pnpm lint
pnpm build
```

## Layout

```
src/
├── app/                 layout (Outfit, metadata), page, favicon
├── assets/              hero photo (mirrored so the wristband sits under the glass frame)
├── components/          one file per section: hero, platform, features, event-timeline, faq, closing-cta, site-footer
│   └── ui/              Aceternity components, adapted (see below)
└── lib/site.ts          contact link and nav items
```

Brand colours are the same scale as the POS and the console (`src/app/globals.css`).

## Aceternity components

Added with `pnpm dlx shadcn@latest add @aceternity/<name>` (registry in `components.json`), then edited:

| Component | Used for | Changes |
|---|---|---|
| `resizable-navbar` | Site nav | Light-on-photo look until scrolled, lucide icons, real button for the menu toggle, fixed shadow values |
| `3d-card` | Glass frame in the hero | Typed props instead of `any` |
| `3d-marquee` | Tiles in the coral card | Takes rendered tiles instead of image URLs; board scale and grid offset are props |
| `bento-grid` | Feature cards | Title above the visual, Tapa styling |
| `timeline` | "An event, from setup to the last round" | Heading is a prop, height tracks resizes, brand colours |
| `text-hover-effect` | Footer wordmark | Fixed `viewBox`, brand gradient, Outfit |

Re-running `shadcn add` on one of these overwrites the edits.

## Credits

Hero photo by [Daniela Becerra on Unsplash](https://unsplash.com/photos/a-group-of-people-raising-their-hands-in-the-air-SvwmxHVO9ko) (Unsplash License).
