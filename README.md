# kaion

Application web React construite avec Vite. Le projet porte le nom **kaion** et utilise React Router pour la navigation ainsi que Neon Postgres via `@neondatabase/serverless` pour l’accès aux données.

- Version : `0.0.0`
- Statut : projet privé (`private: true`)
- Langage : JavaScript / JSX
- TypeScript : non utilisé
- PWA : aucune dépendance PWA déclarée
- Tests : aucun script de test défini
- Licence : aucune licence déclarée

---

## Sommaire

- [Stack technique](#stack-technique)
- [Prérequis](#prérequis)
- [Installation](#installation)
- [Scripts](#scripts)
- [Dépendances](#dépendances)
- [Architecture](#architecture)
- [Accès aux données Neon](#accès-aux-données-neon)
- [Sécurité](#sécurité)
- [Build et prévisualisation](#build-et-prévisualisation)
- [Déploiement](#déploiement)
- [Dépannage](#dépannage)
- [Contribution](#contribution)
- [Licence](#licence)

---

## Stack technique

| Domaine | Technologie |
|---|---|
| Interface | React 19 |
| Rendu DOM | React DOM 19 |
| Routage | React Router DOM 7 |
| Build | Vite 8 |
| Plugin React | `@vitejs/plugin-react` 6 |
| Lint | oxlint |
| Base de données | Neon Postgres via `@neondatabase/serverless` |
| Couleurs | `color-peek` |

Le projet est écrit en JavaScript / JSX. Il n’utilise ni TypeScript, ni Supabase, ni service worker PWA.

---

## Prérequis

- Node.js 20.19 ou supérieur
- npm
- Une base Neon Postgres si l’accès aux données est utilisé

---

## Installation

```bash
npm install
```

Puis lancer le serveur de développement :

```bash
npm run dev
```

Vite affiche l’URL locale dans le terminal, généralement `http://localhost:5173`.

---

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Lance le serveur de développement Vite |
| `npm run build` | Génère le build de production dans `dist/` |
| `npm run preview` | Prévisualise le build de production |
| `npm run lint` | Exécute oxlint |

Il n’existe pas de script `test`, `format` ou `typecheck` dans le `package.json`.

---

## Dépendances

### Dépendances de production

| Paquet | Version |
|---|---|
| `@neondatabase/serverless` | `^1.2.0` |
| `color-peek` | `^0.5.1-alpha` |
| `react` | `^19.2.8` |
| `react-dom` | `^19.2.8` |
| `react-router-dom` | `^7.18.4` |

### Dépendances de développement

| Paquet | Version |
|---|---|
| `@types/react` | `^19.2.18` |
| `@types/react-dom` | `^19.2.7` |
| `@vitejs/plugin-react` | `^6.1.1` |
| `oxlint` | `^1.81.0` |
| `vite` | `^8.3.0` |

---

## Architecture

Architecture fonctionnelle actuelle :

```text
Navigateur
   │
   ▼
Application React
   │
   ├── React Router DOM
   │     └── navigation entre les vues
   │
   ├── Composants et interface
   │
   └── Accès aux données
         └── @neondatabase/serverless
               └── Neon Postgres
```

Principes :

- l’interface est une application React montée par Vite ;
- la navigation est gérée avec `react-router-dom` ;
- l’accès à la base passe par `@neondatabase/serverless` ;
- `color-peek` est disponible pour les traitements liés aux couleurs ;
- le lint est assuré par oxlint.

---

## Accès aux données Neon

La dépendance `@neondatabase/serverless` est déclarée dans le projet. Elle permet d’interroger une base Neon Postgres.

Le projet ne fournit pas de fichier `.env.example` ni de nom de variable d’environnement imposé dans le `package.json`. La configuration de connexion à Neon doit donc être gérée par l’environnement d’exécution et rester hors du dépôt.

Le schéma de base de données et les migrations ne sont pas décrits dans les dépendances déclarées. Ils doivent être gérés avec les outils Neon associés au projet.

---

## Sécurité

- Ne jamais committer de chaîne de connexion Neon.
- Ne jamais exposer une chaîne de connexion à la base dans le bundle client.
- Ne pas placer de secret dans une variable préfixée `VITE_`, car les variables `VITE_` sont intégrées au code frontend.
- Pour un accès à Neon depuis un navigateur, passer par une API ou une fonction serverless qui protège les identifiants et applique les contrôles d’accès.
- Vérifier les règles d’accès au niveau de la base et de l’API.
- Limiter les droits de l’utilisateur de base de données au strict nécessaire.

`@neondatabase/serverless` étant déclaré côté dépendances applicatives, toute utilisation directe depuis le client doit être auditée avant mise en production.

---

## Build et prévisualisation

```bash
npm run build
npm run preview
```

Le build Vite est généré dans :

```text
dist/
```

Le dossier `dist/` contient les fichiers statiques à servir par l’hébergeur.

---

## Déploiement

Le projet produit un build statique Vite. Il peut être servi par un hébergeur de fichiers statiques ou une plateforme compatible Vite.

Procédure :

```bash
npm install
npm run build
```

Puis servir le dossier `dist/`.

Points de vigilance :

- configurer Node.js 20.19 ou supérieur sur la plateforme de build ;
- protéger les accès à Neon ;
- ne pas exposer de secret dans le bundle ;
- vérifier que les routes React Router fonctionnent avec la stratégie de fallback de l’hébergeur ;
- relancer `npm run lint` avant déploiement.

---

## Dépannage

### `npm run dev` échoue à cause de la version de Node.js

Vite 8 nécessite une version récente de Node.js. Utiliser Node.js 20.19 ou supérieur.

### Le lint signale des erreurs

```bash
npm run lint
```

Corriger les erreurs signalées par oxlint avant de committer.

### Le build échoue

```bash
npm run build
```

Vérifier les imports, les dépendances installées et la compatibilité des versions React 19 / React Router 7.

### La connexion Neon échoue

Vérifier :

- que la base Neon est accessible ;
- que la chaîne de connexion utilisée par l’environnement est valide ;
- que les règles réseau et les droits de la base autorisent la connexion ;
- que la connexion n’est pas exposée côté client.

### Les routes React Router renvoient une erreur après déploiement

Configurer l’hébergeur pour rediriger les requêtes inconnues vers `index.html`, afin que React Router prenne le relais.

---

## Contribution

Le projet est privé. Les modifications se font sur des branches dédiées.

```bash
git checkout -b feat/ma-modification
npm install
npm run lint
npm run build
git commit -m "feat: description de la modification"
git push origin feat/ma-modification
```

Avant de proposer une modification :

- exécuter `npm run lint` ;
- exécuter `npm run build` ;
- ne pas introduire de secret dans le dépôt ;
- conserver la cohérence des versions React 19 et React Router 7.

---

## Licence

Aucune licence n’est déclarée dans le `package.json`. Le projet est marqué `private: true`. Tous droits réservés par défaut.
```
