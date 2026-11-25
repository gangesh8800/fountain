# Global Water Fountains Enterprises

A premium, minimal website for **Global Water Fountains Enterprises** — a fountain design, installation and repair company based in Shahdara, Delhi, serving all of India.

Founder-led, with 15 years of experience. Call or WhatsApp: **+91 97114 27227**.

Workshop: H. No. 106, Street No. 5, Hardevpuri, Shahdara, Delhi — 110093.

## Folder structure

```text
fountain/
├── index.html              # Semantic HTML only — no inline style or script
├── README.md
├── .gitignore
├── css/
│   ├── base.css            # Reset, CSS variables, typography
│   ├── layout.css          # Grid, sections, responsive rules
│   └── components.css      # Buttons, cards, nav, form, accordion
├── js/
│   ├── main.js             # Nav toggle, scroll fade-in
│   ├── faq.js              # FAQ accordion
│   └── enquiry.js          # Enquiry form validation + WhatsApp link
└── assets/
    ├── images/             # logo.jpg, hero.jpg, hero-800.jpg, hero-1600.jpg
    │   ├── services/       # One photo per service
    │   └── projects/       # Selected project photos
    ├── icons/              # call.svg, whatsapp.svg, menu.svg
    └── og-image.jpg        # Social share image, 1200 × 630
```

## How to run locally

Just open `index.html` in a browser — no build step is needed.

For the most accurate preview (fonts and relative paths), use a simple local server from this folder:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## How to edit content and images

- **Text, services, prices, phone number:** edit `index.html` directly. All copy lives there, in plain HTML.
- **Colours, fonts, spacing:** change the variables in `:root` at the top of `css/base.css` — the whole theme follows from that one place. The theme is warm off-white `#FAF8F4`, charcoal text, and one deep teal accent (`#14424E`).
- **Layout and responsive rules:** `css/layout.css` (mobile-first, then `@media (min-width: 768px)` and `@media (min-width: 1100px)`).
- **Buttons, cards, form, accordion:** `css/components.css`.
- **Behaviour:** `js/main.js` (nav toggle, fade-in), `js/faq.js` (accordion), `js/enquiry.js` (form validation, builds the WhatsApp message).
- **Images:** replace a file in `assets/images/` with a photo of the same name, keeping it under 200 KB. Add new photos the same way, then reference them in `index.html` with a normal relative path, `width` and `height` attributes, alt text, and `loading="lazy"` for anything below the hero. The hero is served in two sizes with `srcset` (`hero-800.jpg` / `hero-1600.jpg`).
- **Logo:** `assets/images/logo.jpg` — shown top-left in the header with the business name, and again in the dark footer.

The enquiry form does not send anything by itself. On submit it validates the name and a 10-digit Indian mobile number, builds the enquiry text, and opens WhatsApp to +91 97114 27227, ready for the visitor to send.

## How it is deployed on GitHub Pages

The site is a static project served from the root of the `fountain` repository (`gangesh8800/fountain`, branch `main`).

- GitHub Pages is enabled in the repo: **Settings → Pages → Source: Deploy from a branch, branch `main`, folder `/ (root)`**.
- Live site: <https://gangesh8800.github.io/fountain/>
- To update the live site, replace the changed files in the repo (for example by uploading them through GitHub's web upload) and commit. Pages rebuilds automatically — usually within a minute or two.
- The canonical URL in `index.html` is `https://gangesh8800.github.io/fountain/`.
