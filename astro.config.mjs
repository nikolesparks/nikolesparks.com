import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://nikolesparks.com',
  // Static output — deploys to Netlify (or any static host) with no server runtime.
  output: 'static',
  build: {
    format: 'directory',
  },
});
