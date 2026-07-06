# Product & Workshop Photography Guide

The site has five photo positions, each pre-wired to a filename under
`public/photos/`. Upload a correctly-named file and it appears on the next
deploy — no code changes. Until a file exists, its slot shows the design's
hatched placeholder.

## The five photos

| Filename (exact, lowercase) | Appears | Shape | Recommended pixels |
|---|---|---|---|
| `home-bench.jpg` | Home — "The Why" (workbench) | Landscape 4:3 | 1600 × 1200 |
| `home-hides.jpg` | Home — "The Where" (hides) | Landscape 4:3 | 1600 × 1200 |
| `goods-vfold.jpg` | Goods — chapter 01 | Landscape 7:5 | 1680 × 1200 |
| `goods-stash.jpg` | Goods — chapter 02 | Wide landscape 8:5 | 1920 × 1200 |
| `goods-notebook.jpg` | Goods — chapter 03 | Portrait 3:4 | 1200 × 1600 |

## Composition

- Images render with `object-fit: cover`: the frame is filled and overflow is
  trimmed from the edges, keeping the center. Center the product and leave
  breathing room — edge content may be cropped at some screen sizes.
- Recommended sizes are 2× the largest on-screen size (retina-sharp). Below
  ~1200px wide will look soft on high-DPI screens.
- The site is dark (`#1d2418`): dark/warm/neutral backgrounds blend in;
  bright white backgrounds will look pasted-on.

## Export

- JPEG, sRGB, quality 75–85, ideally under ~400 KB per file (no server-side
  image optimization on GitHub Pages).
- Filenames must match exactly — lowercase, `.jpg`. GitHub Pages is
  case-sensitive; a mismatch leaves the placeholder showing.

## Upload

Either:

- Drop the files into `public/photos/` in this repo folder, then
  `git add -A && git commit -m "Add product photos" && git push`; or
- On github.com: repo → `public` → **Add file → Upload files** → drag your
  local `photos` **folder** onto the page (dragging the folder creates
  `public/photos/`) → Commit. Deploys automatically.

Slot wiring lives in `app/page.tsx` (home ×2) and
`app/goods/GoodsChapters.tsx` (goods ×3); fallback logic in
`components/PhotoSlot.tsx`.
