/** Photos des emplacements fixes du site (modifiables dans l'administration). */
import photos from '@/data/reglages/photos.json';

export type EmplacementPhoto = keyof typeof photos;

export function photo(cle: EmplacementPhoto): { src?: string; alt?: string } {
  const p = photos[cle];
  return p?.image?.trim() ? { src: p.image.trim(), alt: p.alt?.trim() || undefined } : {};
}
