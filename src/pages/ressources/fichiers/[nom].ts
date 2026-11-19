/**
 * Fichiers joints aux ressources.
 * - ressource publique : fichier publié tel quel  → /ressources/fichiers/<nom>
 * - ressource adhérents : fichier chiffré         → /ressources/fichiers/<nom>.chiffre
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { toutesLesRessources, lireFichier, infosFichier, chiffrer, codeConfigure } from '@/lib/ressources';

export const getStaticPaths = (async () => {
  const chemins = [];
  for (const r of await toutesLesRessources()) {
    if (!r.data.fichier) continue;
    const { nom, mime } = infosFichier(r.data.fichier);
    if (r.data.visibilite === 'public') chemins.push({ params: { nom }, props: { chemin: r.data.fichier, mime, chiffre: false } });
    else if (codeConfigure) chemins.push({ params: { nom: `${nom}.chiffre` }, props: { chemin: r.data.fichier, mime: 'application/octet-stream', chiffre: true } });
  }
  return chemins;
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const octets = await lireFichier(props.chemin);
  const corps = props.chiffre ? await chiffrer(octets) : octets;
  return new Response(corps, { headers: { 'Content-Type': props.mime } });
};
