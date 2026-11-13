/**
 * Modèles de contenus administrables.
 *
 * Chaque collection correspond à un dossier de `src/content/`. Les fichiers
 * (Markdown + en-tête) seront créés et modifiés depuis l'interface
 * d'administration (étape 5) — aucune activité, aucun partenaire ni aucune
 * actualité n'est inventé ici : les dossiers sont volontairement vides.
 */
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const domaine = z.enum(['mouvement', 'emotions', 'education']);

/**
 * Les images sont déposées via l'administration dans `public/uploads/`
 * et référencées par leur chemin (ex. « /uploads/atelier.webp »).
 */
const cheminImage = z.string().optional().transform((v) => (v && v.trim() ? v.trim() : undefined));

/** Activités et ateliers (catalogue + agenda). */
const activites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/activites' }),
  schema: z.object({
      titre: z.string(),
      domaine,
      type: z.enum(['reguliere', 'atelier', 'stage', 'evenement']),
      resume: z.string().max(240),
      public: z.string(),
      lieu: z.string().optional(),
      intervenant: z.string().optional(),
      /** Séances datées (ateliers, stages, événements). */
      dates: z
        .array(z.object({ debut: z.coerce.date(), fin: z.coerce.date().optional() }))
        .default([]),
      /** Créneau récurrent (ex. « Mardi 10h–11h, hors vacances scolaires »). */
      recurrence: z.string().optional(),
      places: z.number().int().positive().optional(),
      tarif: z.string().optional(),
      conditions: z.string().optional(),
      /** Réservé aux licenciés (pratique régulière) ? */
      reserveLicencies: z.boolean().default(false),
      inscription: z.object({
        statut: z.enum(['prochainement', 'ouverte', 'complet', 'terminee']).default('prochainement'),
        helloassoUrl: z.string().url().or(z.literal('')).optional(),
      }),
      photo: cheminImage,
      photoAlt: z.string().optional(),
      publie: z.boolean().default(false),
    }),
});

/** Actualités de l'association. */
const actualites = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/actualites' }),
  schema: z.object({
      titre: z.string(),
      date: z.coerce.date(),
      resume: z.string().max(280),
      photo: cheminImage,
      photoAlt: z.string().optional(),
      /** 'public' ou réservé à l'espace membres (étape 6). */
      visibilite: z.enum(['public', 'adherents', 'licencies']).default('public'),
      publie: z.boolean().default(false),
    }),
});

/** Partenaires : publiés uniquement après validation. */
const partenaires = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/partenaires' }),
  schema: z.object({
      nom: z.string(),
      categorie: z.enum([
        'collectivite',
        'sante',
        'medico-social',
        'association',
        'entreprise',
        'institution',
      ]),
      logo: cheminImage,
      url: z.string().url().or(z.literal('')).optional(),
      /** Accord explicite du partenaire pour figurer sur le site. */
      valide: z.boolean().default(false),
    }),
});

/** Documents associatifs téléchargeables (statuts, projet associatif…). */
const documents = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/documents' }),
  schema: z.object({
    titre: z.string(),
    fichier: z.string(), // chemin public, ex. « /documents/statuts.pdf »
    description: z.string().optional(),
    visibilite: z.enum(['public', 'adherents', 'licencies']).default('public'),
    ordre: z.number().default(0),
  }),
});

export const collections = { activites, actualites, partenaires, documents };
