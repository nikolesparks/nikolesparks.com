# nikolesparks.com

Marketing website for **Nikole Sparks, AMFT** — depth-oriented psychotherapy in
Orange County (Newport Beach · Fullerton · online across California).

Built with [Astro](https://astro.build) as a fully static site, deployed to
**Netlify** (free tier) with **Netlify Forms** handling the contact form. No
recurring hosting cost beyond the domain.

## Local development

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs static site to dist/
npm run preview  # preview the production build locally
```

Node 20+ recommended.

## Project structure

```
src/
  data/site.ts          Single source of truth: nav, contact info, offices, license
  styles/global.css     The whole design system (palette, type, layout classes)
  layouts/Layout.astro  Base HTML shell (head, SEO/OG meta, fonts, header, footer)
  components/            Reusable building blocks:
    Header · Footer · Ticker · Portrait · Glyph · Faq · ConsultSteps · NextSteps
  pages/
    index.astro                     Home
    about.astro · approach.astro
    services/index.astro            Services overview
    services/individual-therapy.astro
    services/couples-therapy.astro
    services/premarital-counseling.astro
    services/therapy-for-anxiety.astro
    services/therapy-for-creatives.astro
    faqs.astro
    contact.astro · contact/success.astro
public/                 Static assets served as-is (favicon, robots.txt)
design-source/          Original Claude Design export (HTML/JS prototypes) — reference only
```

## Design system

- **Palette:** cream `#F6F1E4`, ink/olive-black `#3E4227`, cobalt `#3B63C4`,
  sage `#707748`, lime-chartreuse `#C7D64F` (CSS variables in `global.css`).
- **Type:** Instrument Serif (display) · Instrument Sans (body) · IBM Plex Mono
  (eyebrows, labels, buttons).
- Content is data-driven where it repeats — edit `src/data/site.ts` to update
  contact details, navigation, or office addresses everywhere at once.

## Editing common things

- **Contact details / addresses / license:** `src/data/site.ts`
- **Navigation links:** the `nav` array in `src/data/site.ts`
- **Colors, spacing, shared component styles:** `src/styles/global.css`
- **Page copy:** the corresponding file in `src/pages/`
- **Add a real photo:** drop the image in `public/` and pass its path to the
  `<Portrait src="/your-photo.jpg" alt="…" />` component (see any page that uses
  `Portrait`). Without `src`, a styled placeholder is shown.

## Contact form (Netlify Forms)

The form on `/contact/` is a standard static `<form data-netlify="true">` with a
hidden `form-name` field and a honeypot. Netlify detects it at build time; no
server code is required. Submissions appear in the Netlify dashboard under
**Forms** and can be emailed to the practice via a form notification. On success
visitors are redirected to `/contact/success/`.

## Deploying to Netlify

1. Connect this repository to a new Netlify site.
2. Build settings are read from `netlify.toml` (`npm run build` → publish `dist`).
3. Point the `nikolesparks.com` domain at Netlify and enable HTTPS.
4. Under **Forms → Notifications**, add an email notification to
   `info@nikolesparks.com`.
