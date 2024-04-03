<h1 align="center">Codeur Nomade</h1>
<div align="center">
Outil gratuit aidant les développeurs juniors à trouver des opportunités en région selon les langages informatiques demandés
</div>
Codeur Nomade est un outil gratuit qui aide les développeurs juniors à trouver des opportunités dans leur région en fonction des langages informatiques demandés. Il intègre l'API France Travail pour obtenir des offres d'emploi actualisées et favorise ainsi une répartition équilibrée des compétences en France.

## Table des matières

- [Fonctionnalités](#Fonctionnalités)
- [Technologies utilisées](#Technologies-utilisées)
- [Comment utiliser](#Comment-utiliser)
- [Langages de programmation pris en charge](#Langages-de-programmation-pris-en-charge)
- [API de France Travail](#API-de-France-Travail)
- [Contribution](#Contribution)
- [Licence](#Licence)

## Fonctionnalités

- Recherche d'opportunités par département
- Carte de France interactive
- Affichage des langages de programmation les plus demandés par département

## Technologies utilisées

- Vue.js
- API France Travail
- Axios

## Comment utiliser

1. Clonez ce dépôt
2. Installez les dépendances en exécutant npm install
3. Ajoutez un fichier .env et collez y vos POLE_EMPLOI_CLIENT_ID= et POLE_EMPLOI_CLIENT_SECRET=. Vous pouvez les obtenir en faisant une demande sur https://francetravail.io/
4. Pour lancer l'application en mode développement, exécutez npm run dev
5. Accédez à l'application à l'adresse http://localhost:3000 dans votre navigateur

## Langages de programmation pris en charge

1 - Java
2 - Python
3 - JavaScript
4 - PHP
5 - Go
6 - C#
7 - Kotlin
8 - C++
9 - Ruby
10 - Swift

## API de France Travail

L'application utilise l'API France travail pour rechercher les offres d'emploi par département et par langage de programmation. Un exemple de requête GET est le suivant : https://api.francetravail.io/partenaire/offresdemploi/v2/offres/search?departement=92&motsCles=php

## Contributions

N'hésitez pas à contribuer à ce projet en soumettant des issues ou des pull requests.

## License

Ce projet est sous licence MIT.
