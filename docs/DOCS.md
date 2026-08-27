# Developer documentation

## Technology:
- [x] React.js
- [x] Vite
- [x] Python

### Installation and build:
```
npm i
npm run build
```

`npm run build` produces two things in `dist/`, and both are published to GitHub Pages:

| Output | What it is |
| --- | --- |
| `index.html` + `assets/` | The standalone site at [cawscit.github.io/logo-finder](https://cawscit.github.io/logo-finder/) |
| `build.js` | The embeddable widget other sites drop in (see below) |

They can also be built separately with `npm run build:site` and `npm run build:embed`.
`build:embed` writes into the *same* `dist/` without clearing it, so it must run
after `build:site` — the `build` script already chains them in that order.

### The filesystem
.pdf's or .png's, that is the question? In this project we use `.pdf` files as the source of truth. We create transparent `.png` files based off of the `.pdf` files with a script.

### Adding a new logo
Add the `.pdf` file to `public/pdf` and then run the Python script:
```python
# Python environment
python -m venv .venv
source .venv/bin/activate

# Python requirements
pip install -r requirements.txt

# Convert pdf to png and re-create the image list dynamically.
python convert_pdf.py
```

Commit the new .png files. Push to `main` to deploy.

New logos show up on the standalone site and in the embeddable widget at the same
time — both read the same `src/image_list.js`, so there is nothing extra to do.

> **Note**: This is an open source repository, but pull requests may not be approved.

### File naming convention
> This is _very_ important to follow.

File naming is very important. We follow this structure:
```
{Language} - {Color} Outline - {Color} Background - {Inner/Outer} {TM/R}.pdf
```

Some examples would be:
```
English - White Outline - Green Background - Inner R.pdf
Danish - Green Outline - White Background - Outer TM.pdf
```

---

## Embedding the logos on another site

To put the logo browser on another site (for example `ca.org/logos`), add these
two lines wherever the logos should appear:

```html
<div id="ca-logo-app"></div>
<script src="https://cawscit.github.io/logo-finder/build.js"></script>
```

That renders **only** the logos — grouped by language, in horizontally scrolling
rows, each with an Image (.png) and PDF (.pdf) download and the same click-to-
enlarge lightbox as the standalone site. The page header, the intro text and the
Brand Guidelines tab are not included.

A live example is deployed at
[cawscit.github.io/logo-finder/embed-example.html](https://cawscit.github.io/logo-finder/embed-example.html)
(source: `public/embed-example.html`).

### How it isolates itself from the host page

The widget renders inside a **Shadow DOM**, so the host site's CSS cannot restyle
it and its own CSS cannot leak out into the host site. The lightbox is portalled
into a separate shadow root attached to `<body>`, so it still covers the viewport
even if the widget sits inside a container with a CSS `transform` (which would
otherwise break `position: fixed`).

Downloads are fetched as blobs rather than relying on `<a download>`, because
browsers ignore that attribute for cross-origin URLs. GitHub Pages serves the
assets with `Access-Control-Allow-Origin: *`, which is what makes this work — if
the logos are ever moved off GitHub Pages, the new host must send that header too
or the download buttons will fall back to opening the file in a new tab.

### Where the logos are loaded from

By default the widget loads `img/`, `img/thumbnail/` and `pdf/` from **the same
directory `build.js` was served from**. Loading the script from
`https://cawscit.github.io/logo-finder/build.js` therefore reads the logos from
`https://cawscit.github.io/logo-finder/img/…`, with no configuration needed.

To point it somewhere else, set `data-base` on either the script tag or the
container (the container wins):

```html
<div id="ca-logo-app" data-base="https://example.org/ca-logos/"></div>
<script src="https://example.org/assets/build.js"></script>
```

### Other options

Any element with `id="ca-logo-app"` or a `data-ca-logo-app` attribute is mounted
automatically, so several copies can live on one page. If the container is added
later (by a page builder, a tab, or a single-page app), mount it by hand:

```html
<script>
  CALogoApp.mount(document.querySelector("#my-container"));
  // …or re-scan the whole page:
  CALogoApp.mountAll();
</script>
```

Two CSS custom properties can be set on the container to fit the host layout:

```html
<style>
  #ca-logo-app {
    --ca-logos-padding: 24px;            /* default: none when embedded */
    --ca-logo-font: Georgia, serif;      /* default: inherits the host page font */
  }
</style>
```

### Code layout

`src/logos/` holds everything both builds share, so the embedded widget and the
standalone site can never drift apart:

| File | Purpose |
| --- | --- |
| `src/logos/LogoGrid.jsx` | The grid itself; takes the asset base URL as a prop |
| `src/logos/Lightbox.jsx` | Click-to-enlarge overlay (zoom, pan, ESC to close) |
| `src/logos/logos.css` | All widget styles, scoped and self-contained |
| `src/logos/languages.js` | Display order of the language groups |
| `src/logos/download.js` | Cross-origin-safe download helper |
| `src/embed/embed.jsx` | Embed entry point: finds the container, mounts a Shadow DOM |
| `src/components/Logos.jsx` | The standalone site's "View Logos" tab; a thin wrapper |
| `vite.embed.config.js` | Builds `src/embed/embed.jsx` into a single `dist/build.js` |

`src/logos/logos.css` deliberately contains no global selectors (no bare `*`,
`img`, `a` or `h2` rules) — everything is scoped under `.ca-logos` / `.ca-lightbox`
so it is safe to inject into somebody else's page.
