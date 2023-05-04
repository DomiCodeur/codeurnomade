// data-processing.service.ts

import { LanguagePercentage, JobOfferCounts } from '@/types';

export class DataProcessingService {

  /**
   * Calcule le pourcentage de présence de chaque langage de programmation dans le département concerné, arrondi à l'entier le plus proche.
   * Trie ensuite les langages par pourcentage le plus haut et retourne un tableau d'objets avec le langage et son pourcentage.
   * @param jobOfferCounts Objet contenant le nombre d'offres d'emploi pour chaque langage de programmation.
   * @returns Tableau d'objets contenant le langage et son pourcentage de présence, trié par ordre décroissant de pourcentage.
   */
  public calculateLanguagePercentages(jobOfferCounts: JobOfferCounts): LanguagePercentage[] {
    // Tableau des langages de programmation à rechercher, trié par ordre alphabétique
    const languages = Object.keys(jobOfferCounts).sort();
  
    // Calcul du nombre total d'offres d'emploi pour tous les langages
    const totalJobOffers = Object.values(jobOfferCounts).reduce(
      (total, count) => total + count,
      0
    );
  
    // Calcul des pourcentages de présence pour chaque langage et création d'un tableau d'objets avec le langage et son pourcentage
    const percentages: LanguagePercentage[] = languages.map(language => {
      const jobOffersForLanguage = jobOfferCounts[language] || 0;
      const percentage = (jobOffersForLanguage / totalJobOffers) * 100;
      const roundedPercentage = Math.round(percentage);
      return { language, percentage: roundedPercentage };
    });
  
    // Tri du tableau d'objets par ordre décroissant de pourcentage
    percentages.sort((a, b) => b.percentage - a.percentage);
  
    // Ajout de la différence entre 100 et la somme des pourcentages arrondis
    const sumOfPercentages = percentages.reduce((total, { percentage }) => total + percentage, 0);
    const difference = 100 - sumOfPercentages;
    percentages[0].percentage += difference;
  
    return percentages;
  }
  

  
  

}
