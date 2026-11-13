/**
 * Préfixe un chemin interne avec le chemin de base du site.
 * Nécessaire quand le site est servi dans un sous-dossier
 * (ex. GitHub Pages : https://playdo86.github.io/Equo/).
 * Sur un nom de domaine propre, la base vaut « / » et rien ne change.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

export function u(path: string): string {
  if (!path.startsWith('/') || path.startsWith('//')) return path;
  return `${BASE}${path}` || '/';
}

/** Retire la base d'un chemin (pour comparer avec les liens de navigation). */
export function sansBase(pathname: string): string {
  const p = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname;
  return p.replace(/\/$/, '') || '/';
}
