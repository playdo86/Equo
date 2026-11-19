/**
 * Configuration centrale du site ÉQUO.
 *
 * Les valeurs modifiables (coordonnées, liens HelloAsso, tarifs, bureau,
 * formulaires, options) sont stockées dans `src/data/reglages/*.json`,
 * éditables depuis l'interface d'administration (/admin).
 * Ce fichier les lit, les vérifie et les expose au reste du site.
 *
 * Règle : une valeur vide signifie « pas encore disponible ». Le site affiche
 * alors un état « Prochainement disponible » au lieu d'un lien fictif.
 */
import general from '@/data/reglages/general.json';
import helloassoData from '@/data/reglages/helloasso.json';
import tarifsData from '@/data/reglages/tarifs.json';
import bureauData from '@/data/reglages/bureau.json';
import formulairesData from '@/data/reglages/formulaires.json';

/** Chaîne vide ou absente → null. */
const ou = (v: string | null | undefined) => (v && v.trim() ? v.trim() : null);

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
  rna: general.rna,
  locale: 'fr_FR',

  contact: {
    email: general.email,
    locality: general.localite,
    region: general.region,
    postalCode: general.codePostal,
    /** Adresse du siège social (statuts). Affichée uniquement dans les mentions légales. */
    streetAddress: general.adresse,
  },

  /** Réseaux sociaux : vides tant que les comptes n'existent pas. */
  social: {
    facebook: ou(general.reseaux.facebook),
    instagram: ou(general.reseaux.instagram),
    linkedin: ou(general.reseaux.linkedin),
  },

  /** Interrupteurs de fonctionnalités. */
  features: {
    /** Affiche un petit repère « Photo à venir » sur les emplacements photo sans image. */
    showPhotoHints: general.options.reperesPhotos,
    /** Espace adhérents / licenciés (étape 6). */
    memberArea: false,
    /** Affiliation fédérale effective. */
    federationAffiliation: general.options.affiliationFederale,
    /** Éligibilité aux reçus fiscaux confirmée. */
    taxReceiptsEligible: general.options.recusFiscaux,
  },
};

/* ------------------------------------------------------------------ */
/* HelloAsso                                                           */
/* ------------------------------------------------------------------ */

export type HelloAssoKey = 'adhesion' | 'licence' | 'donPonctuel' | 'donMensuel' | 'campagne' | 'evenements';

export interface HelloAssoLink {
  label: string;
  /** URL de la page HelloAsso (https://www.helloasso.com/associations/...) */
  url: string | null;
  /** URL du widget HelloAsso (se termine par /widget), pour l'intégration dans la page. */
  widgetUrl: string | null;
}

const helloassoValide = (v: string | null) => (v && /^https:\/\/(www\.)?helloasso\.com\//.test(v) ? v : null);

export const helloasso = Object.fromEntries(
  (Object.keys(helloassoData) as HelloAssoKey[]).map((k) => [
    k,
    {
      label: helloassoData[k].label,
      url: helloassoValide(ou(helloassoData[k].url)),
      widgetUrl: helloassoValide(ou(helloassoData[k].widgetUrl)),
    },
  ]),
) as Record<HelloAssoKey, HelloAssoLink>;

/* ------------------------------------------------------------------ */
/* Formulaires (contact, partenariat)                                  */
/* ------------------------------------------------------------------ */

/**
 * Le site est statique : l'envoi des formulaires passe par un service
 * externe gratuit. Tant qu'aucun service n'est configuré, le formulaire
 * prépare un e-mail dans la messagerie du visiteur (aucun envoi simulé).
 * Web3Forms : clé gratuite sur https://web3forms.com (publique par conception).
 */
const service = formulairesData.service;
export const forms = {
  provider:
    service === 'web3forms' && ou(formulairesData.web3formsKey)
      ? ('web3forms' as const)
      : service === 'formspree' && ou(formulairesData.formspreeId)
        ? ('formspree' as const)
        : null,
  web3formsKey: ou(formulairesData.web3formsKey),
  formspreeId: ou(formulairesData.formspreeId),
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
/* Bureau : noms publiés uniquement avec l'accord des personnes.       */
/* ------------------------------------------------------------------ */

export interface Membre {
  role: string;
  nom: string | null;
  metier: string | null;
  phrase: string | null;
  presentation: string | null;
  photo: string | null;
  /** Cadrage du portrait dans le cercle : point du visage (en %) et zoom. */
  cadrage: { x: number; y: number; zoom: number };
}

const borne = (v: unknown, min: number, max: number, defaut: number) =>
  typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : defaut;

export const bureau: Membre[] = bureauData.membres.map((m) => ({
  role: m.role,
  nom: ou(m.nom),
  metier: ou(m.metier),
  phrase: ou(m.phrase),
  presentation: ou(m.presentation),
  photo: ou(m.photo),
  cadrage: {
    x: borne(m.cadrage?.x, 0, 100, 50),
    y: borne(m.cadrage?.y, 0, 100, 30),
    zoom: borne(m.cadrage?.zoom, 1, 4, 1.5),
  },
}));

/** Texte et photos de la section « Équipe » (page L'association). */
export const equipe = {
  pageTitre: ou(bureauData.pageTitre) ?? 'Une équipe engagée,',
  pageTitreAccent: ou(bureauData.pageTitreAccent) ?? 'des expertises au service du quotidien',
  titre: ou(bureauData.titre) ?? 'Le bureau',
  paragraphes: (bureauData.texte ?? '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean),
  /** « Mot de la Présidente » : affiché seulement s'il est rempli. */
  mot: ou(bureauData.mot?.texte)
    ? {
        titre: ou(bureauData.mot.titre) ?? 'Le mot de la Présidente',
        // Apostrophes typographiques (’) pour un rendu soigné.
        paragraphes: bureauData.mot.texte
          .split(/\n\s*\n/)
          .map((p) => p.trim().replace(/'/g, '’'))
          .filter(Boolean),
        signature: ou(bureauData.mot.signature),
      }
    : null,
  photos: ((bureauData.photos ?? []) as { image?: string; alt?: string; legende?: string }[])
    .map((p) => ({ image: ou(p.image), alt: ou(p.alt), legende: ou(p.legende) }))
    .filter((p): p is { image: string; alt: string | null; legende: string | null } => !!p.image),
};

/* ------------------------------------------------------------------ */
/* Tarifs                                                              */
/* ------------------------------------------------------------------ */

export const tarifs = {
  adhesion: { montant: tarifsData.adhesion.montant, periode: 'an', valide: tarifsData.adhesion.valide },
  licence: { montantMin: tarifsData.licence.montantMin, periode: 'an', valide: tarifsData.licence.valide },
};

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export interface NavItem {
  label: string;
  href: string;
}

export const mainNav: NavItem[] = [
  { label: 'Qui sommes-nous', href: '/qui-sommes-nous' },
  { label: 'Nos actions', href: '/actions' },
  { label: 'Agenda', href: '/agenda' },
  { label: 'Partenaires', href: '/partenaires' },
  { label: 'Soutenir', href: '/soutenir' },
];

export const footerNav: NavItem[] = [
  { label: 'Accueil', href: '/' },
  ...mainNav,
  { label: 'Actualités', href: '/actualites' },
  { label: 'Adhérer', href: '/adherer' },
  { label: 'Contact', href: '/contact' },
];

export const legalNav: NavItem[] = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/confidentialite' },
];
