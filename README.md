#Codeur Nomade
Codeur Nomade est un outil gratuit qui aide les développeurs juniors à trouver des opportunités dans leur région en fonction des langages informatiques demandés. Il intègre l'API Pôle Emploi pour obtenir des offres d'emploi actualisées et favorise ainsi une répartition équilibrée des compétences en France.

##Fonctionnalités
Recherche d'opportunités par département
Carte de France interactive
Affichage des langages de programmation les plus demandés par département
Technologies utilisées
Vue.js
API Pôle Emploi
Axios

##Comment utiliser
Clonez ce dépôt
Installez les dépendances en exécutant npm install
Ajoutez un fichier .env et collez y vos POLE_EMPLOI_CLIENT_ID= et POLE_EMPLOI_CLIENT_SECRET= . Vous pouvez les obtenir en faisant une demande sur  https://pole-emploi.io/

Pour lancer l'application en mode développement, exécutez npm run dev
Accédez à l'application à l'adresse http://localhost:3000 dans votre navigateur
Langages de programmation pris en charge
Java
Python
JavaScript
PHP
Go
C#
Kotlin
C++
Ruby
Swift

##API Pôle Emploi
L'application utilise l'API Pôle Emploi pour rechercher les offres d'emploi par département et par langage de programmation. Un exemple de requête GET est le suivant : https://api.pole-emploi.io/partenaire/offresdemploi/v2/offres/search?departement=92&motsCles=php

##Contribution
N'hésitez pas à contribuer à ce projet en soumettant des issues ou des pull requests.

##Licence
Ce projet est sous licence MIT.