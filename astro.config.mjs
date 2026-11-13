// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// URL publique définitive du site : à renseigner via la variable SITE_URL
// au moment du déploiement (ex. https://www.equo-association.fr).
const SITE_URL = process.env.SITE_URL ?? 'https://equo.example';

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/espace-membres'),
      i18n: undefined,
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
