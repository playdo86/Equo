/**
 * Ressources en libre accès proposées par ÉQUO (outils, fiches, supports).
 * Pour ajouter une ressource : ajouter un objet à la liste.
 * La page /ressources les affiche automatiquement, dans cet ordre.
 */
export interface Ressource {
  id: string;
  titre: string;
  /** Phrase courte affichée sous le titre. */
  accroche: string;
  description: string;
  /** Nature de la ressource : « Outil interactif », « Fiche pratique », « Audio »… */
  type: string;
  /** Domaine d'action lié (voir src/data/domaines.ts). */
  domaine: 'mouvement' | 'emotions' | 'education';
  public: string;
  duree: string;
  /** Page de la ressource sur le site. */
  href: string;
  /** Illustration de la carte (chemin dans /public). */
  image: string;
}

export const ressources: Ressource[] = [
  {
    id: 'emoforme',
    titre: 'Émoforme',
    accroche: 'Donnez une forme à ce que vous ressentez.',
    description:
      'Un outil libre pour mettre une image sur une émotion : choisissez sa forme, sa couleur, sa texture, son mouvement et sa place, puis nommez-la.',
    type: 'Outil interactif',
    domaine: 'emotions',
    public: 'Adolescents et adultes',
    duree: '5 à 10 minutes',
    href: '/ressources/emoforme',
    image: '/outils/emoforme/emoforme-symbole.svg',
  },
];

export const nomsDomaines: Record<Ressource['domaine'], string> = {
  mouvement: 'Mouvement',
  emotions: 'Émotions et mieux-être',
  education: 'Éducation et accompagnement',
};
