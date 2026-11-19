# ÉQUO — Architecture, parcours et direction artistique

*Étapes 1 et 2 du projet de site. Document de travail, novembre 2026.*

---

## 1. Choix techniques

| Besoin | Choix | Pourquoi |
|---|---|---|
| Site rapide, bien référencé | **Astro 5** (pages statiques) | Chaque page est livrée en HTML pur : chargement immédiat, SEO excellent, hébergement gratuit ou presque. |
| Interactivité (formulaires, filtres d'agenda) | **Îlots React + TypeScript** (ajoutés à l'étape 3) | React uniquement là où c'est utile, pas sur tout le site. |
| Design | **Tailwind CSS 4** + jetons de couleur centralisés | Cohérence visuelle, modifications de palette en un seul endroit (`src/styles/global.css`). |
| Contenus administrables | **Collections de contenus typées** (`src/content/`) | Activités, actualités, partenaires, documents : un fichier par élément, validé par un schéma. |
| Administration (étape 5) | **Sveltia CMS** ou **Decap CMS** (interface web, sans base de données) | Gratuit, léger, accès sécurisé par compte. Les modifications sont enregistrées dans le dépôt et le site se reconstruit automatiquement. |
| Hébergement | **Netlify** ou **Cloudflare Pages** (offre gratuite) | Déploiement automatique, HTTPS, formulaires et protection anti-spam disponibles. |
| Paiements | **HelloAsso** uniquement | Liens et widgets officiels, rien n'est stocké côté site. |
| Polices | Hébergées sur le site (Fraunces, Nunito) | Aucune requête vers Google : rien à déclarer au titre du RGPD. |

> Le brief proposait « React, TypeScript, Tailwind ». Astro garde React et TypeScript, mais produit des pages statiques, ce qui est plus rapide et mieux référencé qu'une application React classique. C'est aussi plus simple à maintenir pour une association.

---

## 2. Arborescence

```
/                         Accueil
/qui-sommes-nous          Équipe, nom (équilibre / écho), approche (5 principes), projet, missions, documents
                          (remplace /association et /approche, qui redirigent ici)
/actions                  Nos actions : 3 domaines (#mouvement, #emotions, #education)
  /actions/[programme]      Fiches programmes (au fil de l'eau)
/agenda                   Activités & agenda : régulières, ateliers, stages, événements
/ressources               Ressources : libre accès + espace adhérents (contenus chiffrés, code d'accès)
  /ressources/emoforme      Outil Émoforme (servi depuis /outils/emoforme/)
  /ressources/[ressource]   Ressource publique (article, fichier)
  /agenda/[activite]        Fiche activité (description, public, lieu, horaires, tarif, inscription)
/adherer                  Adhésion associative + pratique sport-santé (ancienne adresse /rejoindre redirigée)
/partenaires              Offre partenaires + formulaire de demande
/soutenir                 Dons ponctuels, mensuels, mécénat, adhésion
/contact                  Formulaire + coordonnées
/actualites               (activée à la première actualité publiée)
/mentions-legales
/confidentialite
/espace-membres/*         Réservé : espace adhérents / licenciés (étape 6, non indexé)
/admin                    Interface d'administration (étape 5)
```

Navigation principale : Qui sommes-nous · Nos actions · Agenda · Partenaires · Soutenir — avec **Contact** et un bouton **Adhérer** toujours visibles.

Vocabulaire unique sur tout le site : **Participer** (agenda) · **Adhérer** (/adherer) · **Faire un don** (/soutenir) · **Devenir partenaire** (/partenaires).

Accueil en 4 blocs (retours du bureau, novembre 2026) : 1. Construire les équilibres · 2. Pourquoi ÉQUO (équilibre / écho + trombinoscope) · 3. Ce que nous faisons · 4. S'engager.

---

## 3. Parcours utilisateurs

**A. « Je veux reprendre une activité, sans savoir par où commencer »**
Accueil → *Trois domaines* → Nos actions (#mouvement) → Agenda (fiche activité) → inscription HelloAsso
*ou, si rien n'est encore programmé :* → Contact (type « Participer à une activité »)

**B. « Je veux soutenir / devenir membre »**
Accueil → *Rejoindre ÉQUO* → Rejoindre (adhésion 25 €) → HelloAsso → retour vers une page de remerciement

**C. « Je veux pratiquer régulièrement »** (futur licencié)
Accueil → Rejoindre (pratique régulière) → planning, documents, conditions → HelloAsso
*Tant que les formules ne sont pas validées : état « Prochainement », avec une invitation à nous écrire.*

**D. Collectivité, CPTS, MSP, entreprise**
Accueil → *Je représente une structure* → Partenaires (méthode : diagnostic → co-construction → animation → évaluation → capitalisation) → formulaire de partenariat
Pages complémentaires utiles pour convaincre : Notre approche, L'association (documents).

**E. Donateur ou mécène**
N'importe quelle page → pied de page « Faire un don » → Soutenir → HelloAsso

Règle commune : **chaque page se termine par une action claire** (participer, adhérer, nous écrire, construire un partenariat).

---

## 4. Structure des pages

### Accueil *(réalisée)*
1. Hero : titre, signature, texte, 2 boutons, visuel + encart « équilibre / écho »
2. Pourquoi ÉQUO ? (le texte en « Parce que… »)
3. Trois domaines d'action (3 cartes → `/actions#…`)
4. Une approche différente (3 principes + citation sur la résonance)
5. Deux façons de s'engager (particuliers / structures)
6. Appel à l'action final
7. Pied de page commun

### L'association
Introduction · Double sens du nom (équilibre / écho) · Citation sur la résonance · Vision de la santé positive · Valeurs fondatrices (5) · Missions (5) · Ce que nous souhaitons apporter · Équipe et bureau *(noms et photos à fournir)* · Documents à télécharger (statuts, projet associatif).

### Notre approche
Les 5 principes, chacun avec un exemple concret tiré du terrain · Expertise pluridisciplinaire · Données probantes · Évaluation et amélioration continue · Recherche-action, lorsque le contexte le permet.

### Nos actions
Pour chaque domaine : visuel, objectif, types d'actions, publics, bouton « Nous contacter » préremplissant le type de demande. Fiches programmes ajoutées depuis l'administration.

### Activités & agenda
Filtres (domaine, type, public) · liste chronologique · activités régulières · fiche détaillée par activité. **État vide soigné** tant qu'aucune activité n'est publiée : « Les premières activités sont en cours de programmation » + inscription par e-mail ou contact.

### Rejoindre ÉQUO
Deux colonnes comparatives :
- **Adhésion** — 25 €/an *(montant envisagé, à confirmer en AG)* — bouton « Adhérer à ÉQUO » (HelloAsso)
- **Pratique régulière sport-santé** — à partir de 150 €/an *(à confirmer, non publié tant que non validé)* — planning, documents, assurance ; mention « licence fédérale : affiliation en cours de réflexion », sans la présenter comme disponible.

Mention obligatoire : *Les activités relèvent de la prévention et du bien-être et ne remplacent pas un suivi médical.*

### Partenaires
Titre du brief · types de structures · méthode en 5 étapes · formulaire (structure, fonction, territoire, besoin) · projets réalisés et logos **uniquement après validation** (champ `valide` dans l'administration).

### Soutenir ÉQUO
Don ponctuel · don mensuel · mécénat · adhésion. Bouton principal « Faire un don avec HelloAsso ». **Aucune mention de réduction fiscale** tant que l'interrupteur `taxReceiptsEligible` est désactivé.

### Contact
Formulaire : nom, prénom, e-mail, type de demande (6 choix), message, consentement. Anti-spam : champ piège invisible + Cloudflare Turnstile (sans cookie publicitaire). Aucune donnée de santé demandée, avec un rappel près du champ message.

---

## 5. HelloAsso

Tous les liens sont centralisés dans `src/config/site.ts` (`helloasso`) puis, à l'étape 5, éditables depuis l'administration :

| Clé | Usage |
|---|---|
| `adhesion` | Cotisation annuelle |
| `licence` | Formules sport-santé |
| `donPonctuel` / `donMensuel` | Dons |
| `campagne` | Campagne de financement spécifique |
| `evenements` | Billetterie ateliers / événements (ou un lien par activité dans sa fiche) |

Lien absent (`null`) → bouton désactivé « Prochainement disponible » + lien vers le contact. **Jamais de faux lien.** Les widgets embarqués (`widgetUrl`) seront intégrés en iframe lorsque HelloAsso les fournit. Le retour vers le site se règle dans HelloAsso (URL de retour vers `/merci`).

---

## 6. Évolutivité : espace adhérents et licenciés

**En place (novembre 2026) : ressources adhérents par code d'accès commun.**
- Collection `ressources` (`src/content/ressources/`), champ `visibilite` : `public` ou `adherents`.
- Fichiers joints dans `src/prive/ressources/` (hors du dossier public). Publiés tels quels
  pour une ressource publique, chiffrés pour une ressource adhérents.
- À la construction, `CODE_ADHERENTS` (secret GitHub) sert à chiffrer les contenus adhérents
  (AES-GCM 256, clé dérivée par PBKDF2-SHA256, 310 000 itérations, sel renouvelé à chaque
  publication). Le navigateur de l'adhérent déchiffre avec le même code (`src/lib/ressources.ts`,
  `src/pages/ressources/index.astro`).
- Limites : un code commun peut circuler (le changer à chaque saison) ; **le dépôt doit être
  privé**, sinon les sources Markdown et les fichiers restent lisibles sur GitHub. GitHub Pages
  depuis un dépôt privé demande un compte GitHub payant ; Netlify ou Cloudflare Pages
  (gratuits) acceptent les dépôts privés (`netlify.toml` est prêt).

**Étape suivante possible : comptes personnels.**

Préparé, **non développé** :
- Rôles prévus : `visiteur`, `adherent`, `licencie`, `admin`.
- Les collections `actualites` et `documents` portent déjà un champ `visibilite` (`public` / `adherents` / `licencies`). Les contenus non publics sont simplement exclus du site public.
- `/espace-membres` est réservé et exclu du sitemap et de `robots.txt`.
- Activation future : Astro en mode hybride + un service d'authentification (ex. Supabase Auth ou lien magique par e-mail), la liste des membres étant synchronisée depuis l'export HelloAsso. Aucune donnée de licence fédérale n'est gérée par le site : elle suivra les procédures de la fédération retenue.

---

## 7. RGPD et accessibilité

- Aucun cookie non essentiel, aucune police ni aucun script tiers : **pas de bandeau cookies nécessaire** à ce stade. Si une mesure d'audience est ajoutée, préférer une solution sans cookie (Plausible, Matomo configuré sans consentement).
- Formulaires : collecte minimale, consentement explicite, aucune donnée de santé.
- Accessibilité : lien d'évitement, focus clavier visible (doré), menu mobile accessible (aria-expanded, Échap), contrastes AA, animations désactivées si l'utilisateur a choisi de réduire les animations, textes alternatifs.

---

## 8. Direction artistique

**Intention :** *un carnet de terrain lumineux*. Chaleureux, posé, crédible. Ni salle de sport, ni développement personnel, ni institution médicale.

**Couleurs** (ajustées au logo)

| Jeton | Hex | Usage |
|---|---|---|
| `creme` | #FAF9F6 | Fond principal |
| `sable` / `sable-clair` | #EDE7DC / #F4F0E8 | Sections alternées |
| `sauge` / `sauge-clair` | #8DAA9D / #DFE8E3 | Accents doux, pastilles, cartes |
| `lagon` | #5C9187 | Vert du logo : mot-symbole, italiques des titres |
| `foret` / `foret-sombre` | #315D50 / #23463C | Boutons, titres, pied de page |
| `or` | #C9A96E | Filets, ornements (décoratif uniquement) |
| `or-texte` | #8A6A2F | Doré lisible pour les petits textes |
| `soleil` | #E2CF6E | Point du logo, soleils des visuels |
| `anthracite` | #28332E | Texte courant |

**Typographies** : *Fraunces* (titres : sérif chaleureuse, italiques expressives) + *Nunito* (texte : sans sérif arrondie, très lisible, en écho aux formes rondes du logo).

**Formes** : cartes arrondies (20 px), ombres très légères, grands espaces, filets dorés courts, ondes et cercles concentriques (respiration, écho). Pictogrammes au trait, dans l'esprit du dessin de l'oiseau.

**Photographies** (à produire ou sélectionner) : lumière naturelle, situations réelles, tous âges, Saône-et-Loire reconnaissable si possible. Emplacements prévus :
1. Accueil (hero) : petit groupe qui marche en extérieur, âges mélangés
2. Mouvement : remise en mouvement en salle ou en plein air, seniors et adultes
3. Émotions : atelier en cercle, échanges détendus (pas de posture de méditation)
4. Éducation : petit groupe autour d'une table, supports pédagogiques
5. Partenaires : réunion de travail, territoire
6. Bureau : portraits naturels

En attendant, des compositions graphiques aux couleurs d'ÉQUO occupent ces emplacements, avec un repère « Photo à venir » (désactivable : `features.showPhotoHints`).

---

## 9. Feuille de route

| Étape | Contenu | État |
|---|---|---|
| 1 | Architecture et UX | ✅ ce document |
| 2 | Identité visuelle + accueil fonctionnel | ✅ |
| 3 | Pages complètes, formulaires contact et partenariat | ✅ (envoi direct à activer : voir README) |
| 4 | Branchement HelloAsso | ✅ adhésion et dons |
| 5 | Administration (Sveltia CMS, /admin) | ✅ voir docs/ADMINISTRATION.md |
| 6 | Bases de l'espace membres | réservé |

## 10. Informations à fournir ou à valider

- Nom de domaine souhaité et choix de l'hébergeur
- Numéro RNA (mentions légales)
- Composition du bureau, et accord de chacun pour la publication des noms et photos
- Photographies (ou budget pour un reportage)
- Validation du tarif de la pratique régulière (adhésion 25 € validée)
- Liens HelloAsso, une fois les formulaires créés
- Comptes de réseaux sociaux
- Versions PDF publiables des statuts et du projet associatif. *Remarque : la page de garde des statuts indique « MECRUREY » ; à corriger avant publication.*
