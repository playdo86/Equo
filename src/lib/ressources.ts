/**
 * Ressources : lecture de la collection, fichiers joints et chiffrement
 * des contenus réservés aux adhérents.
 *
 * Principe (site statique, sans serveur) :
 * - le code d'accès est fourni au moment de la construction du site par la
 *   variable d'environnement CODE_ADHERENTS (secret GitHub, jamais dans le dépôt) ;
 * - les textes et fichiers « adhérents » sont chiffrés (AES-GCM 256 bits, clé
 *   dérivée du code par PBKDF2-SHA256) : sans le code, ils sont illisibles ;
 * - le navigateur de l'adhérent refait la même dérivation et déchiffre.
 * Sans code configuré, aucun contenu adhérents n'est publié.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export type Ressource = CollectionEntry<'ressources'>;

export const nomsTypes: Record<Ressource['data']['type'], string> = {
  article: 'Article',
  fiche: 'Fiche pratique',
  audio: 'Audio',
  video: 'Vidéo',
  outil: 'Outil interactif',
  document: 'Document',
};
export const nomsDomaines: Record<Ressource['data']['domaine'], string> = {
  mouvement: 'Mouvement',
  emotions: 'Émotions et mieux-être',
  education: 'Éducation et accompagnement',
};

export async function toutesLesRessources() {
  const liste = await getCollection('ressources', (r) => r.data.publie);
  return liste.sort((a, b) => a.data.ordre - b.data.ordre || b.data.date.getTime() - a.data.date.getTime());
}

/* ---------------- Fichiers joints ---------------- */

const DOSSIER_PRIVE = path.resolve('src/prive/ressources');
const MIME: Record<string, string> = {
  '.pdf': 'application/pdf', '.mp3': 'audio/mpeg', '.m4a': 'audio/mp4', '.wav': 'audio/wav', '.ogg': 'audio/ogg',
  '.mp4': 'video/mp4', '.webm': 'video/webm', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
};

export function infosFichier(chemin: string) {
  const nom = path.basename(chemin);
  return { nom, mime: MIME[path.extname(nom).toLowerCase()] ?? 'application/octet-stream' };
}
export async function lireFichier(chemin: string) {
  return new Uint8Array(await readFile(path.join(DOSSIER_PRIVE, path.basename(chemin)))) as Uint8Array<ArrayBuffer>;
}
export function tailleLisible(octets: number) {
  return octets > 1e6 ? `${(octets / 1e6).toFixed(1).replace('.', ',')} Mo` : `${Math.max(1, Math.round(octets / 1e3))} Ko`;
}

/* ---------------- Chiffrement ---------------- */

export const ITERATIONS = 310_000;
// Insensible aux majuscules et aux espaces autour, comme dans le navigateur.
const CODE = (process.env.CODE_ADHERENTS ?? '').trim().toLowerCase();
export const codeConfigure = CODE.length > 0;

// Un sel par construction du site : changer le code ou republier invalide les anciennes copies.
const SEL = crypto.getRandomValues(new Uint8Array(16));
let cle: Promise<CryptoKey> | null = null;
function laCle() {
  if (!codeConfigure) throw new Error('CODE_ADHERENTS non défini');
  return (cle ??= crypto.subtle
    .importKey('raw', new TextEncoder().encode(CODE), 'PBKDF2', false, ['deriveKey'])
    .then((base) =>
      crypto.subtle.deriveKey(
        { name: 'PBKDF2', salt: SEL, iterations: ITERATIONS, hash: 'SHA-256' },
        base,
        { name: 'AES-GCM', length: 256 },
        false,
        ['encrypt'],
      ),
    ));
}
const b64 = (u: Uint8Array) => Buffer.from(u).toString('base64');
export const selBase64 = b64(SEL);

/** Chiffre des octets : renvoie IV (12 octets) + données chiffrées. */
export async function chiffrer(donnees: Uint8Array<ArrayBuffer>) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const c = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, await laCle(), donnees));
  const out = new Uint8Array(iv.length + c.length);
  out.set(iv); out.set(c, iv.length);
  return out;
}
export async function chiffrerTexte(texte: string) {
  return b64(await chiffrer(new TextEncoder().encode(texte)));
}
