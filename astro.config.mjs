// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// URL publique définitive du site : à renseigner via la variable SITE_URL
// au moment du déploiement (ex. https://www.equo-association.fr).
const SITE_URL = process.env.SITE_URL ?? 'https://equo.example';

// Sous-dossier éventuel (GitHub Pages : « /Equo »). Vide sur un nom de domaine.
const BASE_PATH = process.env.BASE_PATH ?? '/';
const PREFIXE = BASE_PATH.replace(/\/$/, '');

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Anciennes adresses → nouvelles (liens déjà partagés).
  redirects: {
    '/association': `${PREFIXE}/qui-sommes-nous`,
    '/approche': `${PREFIXE}/qui-sommes-nous#approche`,
    '/rejoindre': `${PREFIXE}/adherer`,
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/espace-membres') && !page.includes('/merci'),
    }),
  ],
  vite: { plugins: [tailwindcss()] },
});
