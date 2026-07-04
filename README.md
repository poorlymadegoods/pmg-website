# Poorly Made Goods — Website

Four-page marketing + ordering site for **Poorly Made Goods** (PMG), a one-person
full-grain leather workshop in Chicago (Est. 2016). Built with **Next.js 15**
(App Router, TypeScript) as a fully static export, deployable to **GitHub Pages**.

Pages: Home (`/`) · Goods (`/goods`) · Custom Order (`/custom-order`) · Contact (`/contact`).

## Local development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → ./out
```

## Deploying to GitHub Pages

1. Create a GitHub repo and push this folder to its `main` branch.
2. In the repo: **Settings → Pages → Source → GitHub Actions**.
3. Every push to `main` builds and deploys via `.github/workflows/deploy.yml`.

The site is configured for a **root domain** (custom domain or
`username.github.io`). For a custom domain, add it under Settings → Pages →
Custom domain (GitHub creates the CNAME record check), and add a `CNAME` file
containing the domain to `/public` so it survives deploys. If you ever deploy
to a *project* path (`username.github.io/repo-name`) instead, set
`basePath: "/repo-name"` in [next.config.ts](next.config.ts).

## Form submissions (Formspree)

Both the Contact form and the Custom Order flow submit through Formspree.
Until it's configured, forms **fall back to a `mailto:` link** (opens the
visitor's email client, pre-filled) so the site works out of the box.

To turn on real submissions:

1. Create a free form at [formspree.io](https://formspree.io) pointed at
   `contact@poorlymadegoods.com`.
2. Copy the form ID (the part after `/f/` in the endpoint).
3. Paste it into `FORMSPREE_FORM_ID` in [lib/config.ts](lib/config.ts).

Spam protection: a hidden honeypot field (`company`) silently drops bot
submissions on both paths.

## Adding real photography

Product/workshop photos were not available at build time; the five photo
positions render the design's hatched placeholder. To swap one in:

1. Drop the image into `public/photos/`.
2. Find the corresponding `<PhotoSlot … />` and add
   `src="/photos/your-file.jpg" alt="…"`:
   - Home: `app/page.tsx` — workbench + hides (2 slots)
   - Goods: `app/goods/GoodsChapters.tsx` — one per product (3 slots)

Images render with `object-fit: cover`, so any reasonably large photo works.

## Fonts

- **Hitch Route Stencil** (client-owned) — self-hosted from
  `app/fonts/HitchRoute-Stencil.otf` via `next/font/local`. To upgrade to a
  woff2 from the client, replace the file and update the `src` in
  [app/layout.tsx](app/layout.tsx).
- **Hanken Grotesk** and **Space Mono** — Google Fonts, self-hosted
  automatically at build time by `next/font` (no runtime Google requests).

## Implementation notes

- Static export (`output: "export"`) — no server. The Custom Order → Contact
  handoff uses `sessionStorage` + `?reason=` query param, matching the design
  handoff behavior.
- `position: sticky` pinning (Goods scroll-zoom) depends on `overflow-x: clip`
  (never `hidden`) on `html`/`body` — see the comment in `app/globals.css`.
- All motion (grain jitter, hero parallax, scroll-zoom, reveals, sweep bars)
  honors `prefers-reduced-motion: reduce`.
- Design tokens (colors, type scale, spacing) live in `app/globals.css` and
  mirror the design handoff exactly.
