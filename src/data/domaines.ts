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
    objectif:
      'Favoriser le mieux-être au quotidien par le mouvement, en proposant des actions accessibles à des personnes peu ou pas actives, sans objectif de performance ni injonction.',
    exemples: ['Remise en mouvement progressive', 'Prévention de la sédentarité', 'Activités parents-enfants'],
    actions: [
      'Ateliers sport-santé',
      'Remise en mouvement progressive',
      'Prévention de la sédentarité et des chutes',
      'Maintien de l’autonomie',
      'Activités parents-enfants et projets intergénérationnels',
      'Programmes collectifs adaptés (6 à 8 séances)',
      'Activité physique sur prescription médicale, lorsque le cadre le permet',
    ],
    publics: 'Adultes, seniors, familles, personnes peu ou pas actives',
    complement:
      'Ces actions sont souvent un premier point d’appui pour des personnes qui souhaitent aller mieux sans savoir par où commencer. Elles favorisent aussi les échanges et le sentiment d’appartenance.',
    icone: 'mouvement',
    motif: 'mouvement',
    photo: 'Marche en petit groupe, adultes et seniors, en extérieur',
  },
  {
    id: 'emotions',
    numero: '02',
    titre: 'Régulation émotionnelle et mieux-être',
    accroche: 'Des espaces collectifs pour explorer ses ressources face au stress et à la fatigue.',
    objectif:
      'Offrir des espaces collectifs non thérapeutiques permettant d’explorer et de renforcer les ressources liées au stress, aux émotions, à la fatigue et aux périodes de transition de vie.',
    exemples: ['Respiration et relaxation', 'Gestion du stress et sommeil', 'Transitions de vie'],
    actions: [
      'Respiration et relaxation',
      'Gestion du stress',
      'Sommeil et récupération',
      'Prévention de l’épuisement',
      'Ateliers et groupes d’échanges autour des émotions',
      'Accompagnement des transitions de vie (parentalité, retraite, changements hormonaux…)',
    ],
    publics: 'Adultes, parents, aidants, seniors, salariés',
    complement: 'Ces actions permettent d’aborder le mieux-être psychologique de manière accessible et déstigmatisée.',
    icone: 'souffle',
    motif: 'emotions',
    photo: 'Atelier en cercle, échanges détendus entre participants',
  },
  {
    id: 'education',
    numero: '03',
    titre: 'Éducation et accompagnement',
    accroche: 'Comprendre ses équilibres pour faire des choix réalistes et durables.',
    objectif:
      'Développer des programmes structurés d’éducation et d’accompagnement, fondés sur les principes de l’éducation thérapeutique, pour soutenir l’autonomie et la capacité d’agir des personnes.',
    exemples: ['Ateliers d’éducation à la santé', 'Parcours structurés de prévention', 'ETP avec les professionnels habilités'],
    actions: [
      'Ateliers d’éducation à la santé',
      'Parcours structurés de prévention',
      'Programmes d’éducation thérapeutique du patient (ETP), en partenariat avec les professionnels et structures habilités',
      'Ressources et supports pédagogiques',
      'Programmes territoriaux de prévention, co-construits avec les acteurs de santé',
    ],
    publics: 'Tous publics, en lien avec les professionnels de santé et les structures partenaires',
    complement: 'Ces actions s’inscrivent en continuité avec les autres actions de prévention et de mieux-être de l’association.',
    icone: 'education',
    motif: 'education',
    photo: 'Petit groupe autour d’une table, supports pédagogiques',
  },
] as const;
