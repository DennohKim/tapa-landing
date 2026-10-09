# Tapa Landing

Marketing site for Tapa. The home page is a hand-built static page in `public/` (HTML, CSS, and a three.js
wristband); Next.js 16 serves it at `/` and stays in place for future routes such as `/devlog`.

Pages:

- `/` — home (`public/index.html`)
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
public/
├── index.html           the home page: markup, styles and scroll choreography in one file
├── band.js              the 3D woven wristband (three.js from jsDelivr, no build step)
├── assets/              wordmark path data, still render of the band (no-JS / WebGL fallback)
├── favicon.svg, apple-touch-icon.png, og.png
src/app/                 root layout (used by the 404 page and future routes), app icon
next.config.ts           rewrites / to /index.html
```

Edit the home page in `public/index.html`. Colour, type and spacing tokens are at the top of its `<style>`
block. The till screens inside the POS mockup follow the till redesign in the terminal-pos repo
(`design/tapa-till-review.html`).

`og:image` is a relative URL (`/og.png`). Make it absolute once the production domain is set, since some
link previews ignore relative image URLs.
