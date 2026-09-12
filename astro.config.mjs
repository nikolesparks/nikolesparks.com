import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nikolesparks.com',
  // Static output — deploys to Netlify (or any static host) with no server runtime.
  output: 'static',
  // Canonical URLs always carry a trailing slash; Netlify 301s the no-slash
  // form to it (see scripts/gen-redirects.mjs) so Google indexes one per page.
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  integrations: [
    sitemap({
      // Keep the post-submit confirmation page out of search results.
      filter: (page) => !page.includes('/contact/success'),
    }),
  ],
});
