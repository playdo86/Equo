# Administrer le site ÉQUO

L'interface d'administration permet de modifier le site **sans toucher au code** :
activités, actualités, photos, tarifs, liens HelloAsso, textes de l'accueil, bureau,
partenaires et documents.

**Adresse : https://playdo86.github.io/Equo/admin/**

---

## 1. Créer sa clé d'accès (une seule fois, environ 3 minutes)

L'accès est protégé par une clé personnelle GitHub. Seules les personnes ayant le droit
de modifier le dépôt `playdo86/Equo` peuvent se connecter.

1. Connectez-vous sur **github.com**.
2. Ouvrez : **https://github.com/settings/personal-access-tokens/new**
3. Remplissez :
   - **Token name** : `Administration ÉQUO`
   - **Expiration** : 1 an (vous recevrez un rappel avant l'échéance)
   - **Repository access** : *Only select repositories* → choisissez **Equo**
   - **Permissions → Repository permissions → Contents** : *Read and write*
4. Cliquez sur **Generate token**, puis copiez la clé (elle commence par `github_pat_`).
   Elle ne s'affiche qu'une fois.
5. Ouvrez l'adresse d'administration, cliquez sur **« Se connecter avec un jeton d'accès »**
   et collez la clé.

La clé reste enregistrée dans votre navigateur. **Ne la communiquez à personne** et ne
l'envoyez pas par e-mail. En cas de perte ou de doute, supprimez-la sur
https://github.com/settings/personal-access-tokens et créez-en une nouvelle.

Pour donner l'accès à un autre membre du bureau : invitez son compte GitHub dans
*Settings → Collaborators* du dépôt, puis il crée sa propre clé.

---

## 2. Comment ça marche

- Chaque **Enregistrer** met le site à jour automatiquement en **1 à 2 minutes**.
- Une activité, une actualité ou un partenaire n'apparaît sur le site que si la case
  **« Publiée »** (ou **« Accord du partenaire »**) est cochée. Vous pouvez donc préparer
  un brouillon tranquillement.
- Les photos sont **compressées automatiquement** (format WebP, 1 800 px maximum).
- Tout est historisé : une erreur peut toujours être annulée (demandez-moi).

---

## 3. Les rubriques

| Rubrique | Ce qu'on y fait |
|---|---|
| **Activités & agenda** | Ajouter un atelier, un stage, un événement ou une activité régulière : dates, lieu, public, places, tarif, lien HelloAsso, photo. Une fiche est créée automatiquement. |
| **Actualités** | Publier une nouvelle. Les trois dernières apparaissent sur l'accueil. |
| **Partenaires** | Ajouter un partenaire et son logo. Affiché seulement avec son accord. |
| **Documents associatifs** | Déposer un PDF (statuts, rapport d'activité…) téléchargeable sur la page Qui sommes-nous. |
| **Textes de l'accueil** | Modifier le grand titre, la présentation, « Pourquoi ÉQUO ? », les textes équilibre / écho. |
| **Photos du site** | Remplacer les illustrations par de vraies photos (accueil, 3 domaines, partenaires). |
| **Liens HelloAsso** | Coller l'adresse d'un formulaire HelloAsso. Vide = bouton « Prochainement ». |
| **Tarifs** | Montants et validation (un tarif non validé n'est pas affiché). |
| **Équipe (page Qui sommes-nous)** | Titre et texte de la section, membres (nom, rôle, métier, phrase personnelle, présentation, portrait), mot de la Présidente, photos d'équipe. Les portraits apparaissent aussi sur l'accueil. Toujours avec l'accord des personnes. |
| **Coordonnées & options** | E-mail, adresse, RNA, réseaux sociaux, repères « Photo à venir », reçus fiscaux. |
| **Envoi des formulaires** | Activer la réception des messages par e-mail (Web3Forms). |

---

### Cadrer un portrait

Dans **Équipe → Membres → (une personne) → Cadrage du portrait** :
- **Position horizontale** et **verticale** : l'endroit où se trouve le visage sur la photo d'origine,
  de 0 à 100 (0 = bord gauche ou haut, 100 = bord droit ou bas). Pour une photo en buste, le visage se
  trouve souvent vers 20 à 30 en vertical.
- **Zoom** : 1 = photo entière ; 1,5 convient bien à une photo en buste.

Enregistrez, attendez 1 à 2 minutes, puis rechargez la page (Ctrl + F5) pour voir le résultat.

## 4. Bonnes pratiques

- **Photos** : lumière naturelle, vraies situations, personnes ayant donné leur accord
  (droit à l'image, autorisation parentale pour les mineurs). Remplissez toujours la
  description (utile aux personnes malvoyantes).
- **Pas de données de santé** dans les textes publiés.
- **Reçus fiscaux** : ne cochez l'option qu'après confirmation officielle de l'éligibilité.
- **Liens HelloAsso** : utilisez l'adresse publique (`https://www.helloasso.com/associations/…`),
  jamais celle de votre espace d'administration (`admin.helloasso.com`).
