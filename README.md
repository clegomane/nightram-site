# NightRam website

The official site of **NightRam**, an arcade takedown roguelite for PC: a single page and a press kit (`/press`),
plain HTML and CSS, no build step. Served by GitHub Pages from the root of `main`.

## Files

| Path | What it is |
|---|---|
| `index.html` | The page: hero, features, the roguelite build section, media gallery |
| `press/index.html` | Press kit: fact sheet, description, logos and screenshots to download |
| `style.css` | Styles (synthwave palette, Teko + Inter from Google Fonts) |
| `links.js` | **The only links to fill in**: Steam page, Discord invite, press contact. An empty link greys its buttons out |
| `lightbox.js` | Gallery viewer (click outside, X or Escape to close; arrows to browse) |
| `media.js` | Animated loops: each still is swapped for `media/<name>.webm` / `.mp4` once loaded; the hero gets a background loop |
| `img/` | Stills (JPEG/PNG) |
| `media/` | Loops (MP4 H.264 + WebM VP9, 1280 px, 30 fps, no sound, under 1.5 MB each) |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are |

All files are plain git objects (no Git LFS): GitHub Pages does not serve LFS files.

## Source

The site is maintained in the game's private repository (`website/`, documented in `docs/site-web.md`) and copied
here to publish it. Loops are encoded there with `Tools/Website/encode-loop.ps1`; videos are only ever committed here,
never in the game repository.

## Custom domain

When `nightram.com` is bought: add a `CNAME` file containing `nightram.com`, set the DNS records listed in the game
repository's `docs/site-web.md`, then switch the `og:image` meta tag in `index.html` to an absolute URL.

© 2026 NightRam. All rights reserved.
