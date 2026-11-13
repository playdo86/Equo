/**
 * Les trois domaines d'action d'ÉQUO (projet associatif, art. 2–4 des statuts).
 * Réutilisé sur l'accueil et la page « Nos actions ».
 */
export const domaines = [
  {
    id: 'mouvement',
    numero: '01',
    titre: 'Mouvement et activité physique adaptée',
    accroche: 'Le mouvement comme outil d’ajustement, jamais comme performance.',
    exemples: ['Remise en mouvement progressive', 'Prévention de la sédentarité', 'Activités parents-enfants'],
    icone: 'mouvement',
    motif: 'mouvement',
    photo: 'Marche en petit groupe, adultes et seniors, en extérieur',
  },
  {
    id: 'emotions',
    numero: '02',
    titre: 'Régulation émotionnelle et mieux-être',
    accroche: 'Des espaces collectifs pour explorer ses ressources face au stress et à la fatigue.',
    exemples: ['Respiration et relaxation', 'Gestion du stress et sommeil', 'Transitions de vie'],
    icone: 'souffle',
    motif: 'emotions',
    photo: 'Atelier en cercle, échanges détendus entre participants',
  },
  {
    id: 'education',
    numero: '03',
    titre: 'Éducation et accompagnement',
    accroche: 'Comprendre ses équilibres pour faire des choix réalistes et durables.',
    exemples: ['Ateliers d’éducation à la santé', 'Parcours structurés de prévention', 'ETP avec les professionnels habilités'],
    icone: 'education',
    motif: 'education',
    photo: 'Petit groupe autour d’une table, supports pédagogiques',
  },
] as const;
