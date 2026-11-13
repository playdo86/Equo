# Site internet de l'association ÉQUO

Astro 5 · TypeScript · Tailwind CSS 4. Voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) pour l'architecture, les parcours et la direction artistique.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # vérification des types + génération dans dist/
npm run preview    # prévisualise la version générée
```

Au déploiement, définir `SITE_URL` (ex. `https://www.mon-domaine.fr`) : l'URL est utilisée pour les liens canoniques, le sitemap et robots.txt.

## Où modifier quoi

| Quoi | Où |
|---|---|
| Coordonnées, réseaux, interrupteurs | `src/config/site.ts` → `site` |
| Liens HelloAsso | `src/config/site.ts` → `helloasso` (`null` = « Prochainement ») |
| Tarifs | `src/config/site.ts` → `tarifs` |
| Couleurs, polices | `src/styles/global.css` (`@theme`) |
| Les 3 domaines d'action | `src/data/domaines.ts` |
| Activités, actualités, partenaires, documents | `src/content/*` (modèles dans `src/content.config.ts`) |
| Photos | Passer `src={import}` au composant `Visual` |

L'interface d'administration (étape 5) permettra de modifier ces contenus sans toucher au code.
