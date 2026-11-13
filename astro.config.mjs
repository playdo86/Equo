// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// URL publique définitive du site : à renseigner via la variable SITE_URL
// au moment du déploiement (ex. https://www.equo-association.fr).
const SITE_URL = process.env.SITE_URL ?? 'https://equo.example';

// Sous-dossier éventuel (GitHub Pages : « /Equo »). Vide sur un nom de domaine.
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/espace-membres') && !page.includes('/merci'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
