# Site internet de l'association ÉQUO

Astro 5 · TypeScript · Tailwind CSS 4. Voir [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) pour l'architecture, les parcours et la direction artistique.

## Démarrer

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # vérification des types + génération dans dist/
npm run preview    # prévisualise la version générée
```

Au déploiement, définir `SITE_URL` (adresse du site) et, si le site est dans un sous-dossier, `BASE_PATH` (ex. `/Equo` pour GitHub Pages). Mise en ligne : voir la section 11 de `docs/ARCHITECTURE.md`.

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

## Activer l'envoi des formulaires

Le site étant statique, les formulaires (contact, partenariat) passent par un service gratuit.
Sans configuration, ils ouvrent la messagerie du visiteur avec le message prérempli.

1. Aller sur https://web3forms.com, saisir `contact.equo@gmail.com` : une clé est envoyée par e-mail.
2. Dans `src/config/site.ts` → `forms`, mettre `provider: 'web3forms'` et coller la clé dans `web3formsKey`.

La politique de confidentialité s'adapte automatiquement.

## Publier une activité dans l'agenda

Créer un fichier `src/content/activites/nom-de-l-activite.md` :

```markdown
---
titre: Atelier sport-santé — Remise en mouvement
domaine: mouvement            # mouvement | emotions | education
type: atelier                 # reguliere | atelier | stage | evenement
resume: Une séance douce pour reprendre confiance dans son corps.
public: Adultes et seniors peu ou pas actifs
lieu: Salle des fêtes, Mercurey
intervenant: Nom de l'intervenant·e
dates:
  - debut: 2027-01-12T10:00:00+01:00
    fin: 2027-01-12T11:30:00+01:00
# recurrence: Tous les mardis, 10 h – 11 h 30 (pour une activité régulière)
places: 12
tarif: 10 € (8 € pour les adhérents)
conditions: Tenue confortable. Aucun niveau requis.
inscription:
  statut: ouverte             # prochainement | ouverte | complet | terminee
  helloassoUrl: https://www.helloasso.com/associations/...
publie: true
---

Description détaillée de l'activité (texte libre).
```

La fiche `/agenda/nom-de-l-activite` est créée automatiquement. L'interface d'administration (étape 5) remplacera cette manipulation.
