/**
 * Configuration centrale du site ÉQUO.
 *
 * Toutes les informations susceptibles d'évoluer (coordonnées, liens HelloAsso,
 * réseaux sociaux, tarifs, interrupteurs de fonctionnalités) sont ici, en un
 * seul endroit. À l'étape « Administration », ce fichier sera remplacé par un
 * fichier de données éditable depuis l'interface d'administration.
 *
 * Règle : une valeur `null` signifie « pas encore disponible ». Le site affiche
 * alors un état « Prochainement disponible » au lieu d'un lien fictif.
 */

export const site = {
  name: 'ÉQUO',
  legalName: 'Association ÉQUO',
  descriptor: 'Association de prévention et sport-santé',
  tagline: 'Construire les équilibres du quotidien',
  signature: 'Bouger. Respirer. Ajuster. Prendre soin de soi, à son rythme.',
  description:
    "ÉQUO est une association de prévention qui propose des actions concrètes, accessibles et progressives pour permettre à chacun de construire ses propres équilibres autour du mouvement, des émotions et des modes de vie.",
  founded: 2026,
  /** Numéro au Répertoire national des associations. */
  rna: 'W712009450',
  locale: 'fr_FR',

  contact: {
    email: 'contact.equo@gmail.com',
    locality: 'Mercurey',
    region: 'Saône-et-Loire',
    postalCode: '71640',
    // Adresse du siège social (statuts). Affichée uniquement dans les mentions légales.
    streetAddress: '2 rue du Liard',
  },

  /** Réseaux sociaux : laisser `null` tant que les comptes n'existent pas. */
  social: {
    facebook: null as string | null,
    instagram: null as string | null,
    linkedin: null as string | null,
  },

  /** Interrupteurs de fonctionnalités. */
  features: {
    /** Affiche un petit repère « Photo à venir » sur les emplacements photo. */
    showPhotoHints: true,
    /** Espace adhérents / licenciés (étape 6). */
    memberArea: false,
    /** Affiliation fédérale effective (ex. Fédération Française Sports pour Tous). */
    federationAffiliation: false,
    /** Éligibilité au mécénat confirmée (reçus fiscaux). */
    taxReceiptsEligible: false,
  },
} as const;

/* ------------------------------------------------------------------ */
/* HelloAsso : liens officiels à renseigner quand ils seront créés.    */
/* ------------------------------------------------------------------ */

export type HelloAssoKey =
  | 'adhesion'
  | 'licence'
  | 'donPonctuel'
  | 'donMensuel'
  | 'campagne'
  | 'evenements';

export interface HelloAssoLink {
  label: string;
  /** URL de la page HelloAsso (ex. https://www.helloasso.com/associations/equo/adhesions/...) */
  url: string | null;
  /** URL du widget HelloAsso, si une intégration embarquée est souhaitée. */
  widgetUrl: string | null;
}

export const helloasso: Record<HelloAssoKey, HelloAssoLink> = {
  adhesion: {
    label: 'Adhérer à ÉQUO',
    url: 'https://www.helloasso.com/associations/association-equo/adhesions/adhesion-associative-equo',
    widgetUrl: 'https://www.helloasso.com/associations/association-equo/adhesions/adhesion-associative-equo/widget',
  },
  licence: { label: "S'inscrire à la pratique sport-santé", url: null, widgetUrl: null },
  donPonctuel: {
    label: 'Faire un don avec HelloAsso',
    url: 'https://www.helloasso.com/associations/association-equo/formulaires/1',
    widgetUrl: 'https://www.helloasso.com/associations/association-equo/formulaires/1/widget',
  },
  // Même formulaire que le don ponctuel : le choix « mensuel » se fait dans le formulaire HelloAsso.
  donMensuel: {
    label: 'Faire un don mensuel',
    url: 'https://www.helloasso.com/associations/association-equo/formulaires/1',
    widgetUrl: 'https://www.helloasso.com/associations/association-equo/formulaires/1/widget',
  },
  campagne: { label: 'Soutenir la campagne en cours', url: null, widgetUrl: null },
  evenements: { label: "S'inscrire à un atelier", url: null, widgetUrl: null },
};

/* ------------------------------------------------------------------ */
/* Formulaires (contact, partenariat)                                  */
/* ------------------------------------------------------------------ */

/**
 * Le site est statique : l'envoi des formulaires passe par un service
 * externe gratuit. Tant qu'aucun service n'est configuré, le formulaire
 * prépare un e-mail dans la messagerie du visiteur (aucun envoi simulé).
 *
 * Web3Forms : créer une clé gratuite sur https://web3forms.com avec
 * l'adresse contact.equo@gmail.com, puis renseigner `web3formsKey`.
 * (Cette clé est publique par conception : elle peut figurer ici.)
 */
export const forms = {
  provider: null as null | 'web3forms' | 'formspree',
  web3formsKey: null as string | null,
  /** Identifiant Formspree (ex. « xyzabcd »), si ce service est préféré. */
  formspreeId: null as string | null,
};

export const typesDemande = [
  { value: 'participer', label: 'Participer à une activité' },
  { value: 'adherer', label: 'Adhérer' },
  { value: 'partenariat', label: 'Proposer un partenariat' },
  { value: 'intervention', label: 'Organiser une intervention' },
  { value: 'don', label: 'Faire un don' },
  { value: 'autre', label: 'Autre' },
] as const;

/* ------------------------------------------------------------------ */
/* Bureau : renseigner les noms uniquement avec l'accord des personnes. */
/* ------------------------------------------------------------------ */

export const bureau: { role: string; nom: string | null; presentation?: string }[] = [
  { role: 'Présidente', nom: null },
  { role: 'Trésorière', nom: null },
  { role: 'Secrétaire', nom: null },
];

/* ------------------------------------------------------------------ */
/* Tarifs : affichés avec leur statut de validation.                   */
/* ------------------------------------------------------------------ */

export const tarifs = {
  adhesion: { montant: 25, periode: 'an', statut: 'valide' as 'envisage' | 'valide' },
  licence: { montantMin: 150, periode: 'an', statut: 'a-confirmer' as 'a-confirmer' | 'valide' },
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: "L'association", href: '/association' },
  { label: 'Notre approche', href: '/approche' },
  { label: 'Nos actions', href: '/actions' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'Partenaires', href: '/partenaires' },
  { label: 'Soutenir', href: '/soutenir' },
];

export const footerNav: NavItem[] = [
  { label: 'Accueil', href: '/' },
  ...mainNav,
  { label: 'Rejoindre ÉQUO', href: '/rejoindre' },
  { label: 'Contact', href: '/contact' },
];

export const legalNav: NavItem[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/confidentialite' },
];
