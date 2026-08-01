import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://nikolesparks.com',
  // Static output — deploys to Netlify (or any static host) with no server runtime.
  output: 'static',
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
