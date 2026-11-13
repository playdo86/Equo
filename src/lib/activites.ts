import { getCollection, type CollectionEntry } from 'astro:content';

export type Activite = CollectionEntry<'activites'>;

export const libelleType = {
  reguliere: 'Activité régulière',
  atelier: 'Atelier',
  stage: 'Stage',
  evenement: 'Événement',
} as const;

export const libelleDomaine = {
  mouvement: 'Mouvement',
  emotions: 'Régulation émotionnelle',
  education: 'Éducation',
} as const;

export const libelleInscription = {
  prochainement: 'Inscriptions prochainement',
  ouverte: 'Inscriptions ouvertes',
  complet: 'Complet',
  terminee: 'Terminé',
} as const;

const fmt = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Europe/Paris' });
const fmtHeure = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Paris' });

export const formatDate = (d: Date) => fmt.format(d);
export function formatCreneau(debut: Date, fin?: Date) {
  const h = fmtHeure.format(debut);
  return fin ? `${formatDate(debut)}, ${h} – ${fmtHeure.format(fin)}` : `${formatDate(debut)}, ${h}`;
}

/** Activités publiées. Les activités datées dont toutes les dates sont passées sont exclues. */
export async function activitesPubliees() {
  const now = Date.now();
  const toutes = await getCollection('activites', (a) => a.data.publie);
  return toutes.filter((a) => a.data.type === 'reguliere' || a.data.dates.length === 0 || a.data.dates.some((d) => (d.fin ?? d.debut).getTime() >= now));
}

export function prochaineDate(a: Activite): Date | undefined {
  const now = Date.now();
  return a.data.dates.map((d) => d.debut).filter((d) => d.getTime() >= now).sort((x, y) => x.getTime() - y.getTime())[0];
}
