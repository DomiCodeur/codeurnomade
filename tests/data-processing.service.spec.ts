import { describe, test, expect } from 'vitest';
import { DataProcessingService } from '@/services/data-processing.service';
import { JobOfferCounts, LanguagePercentage } from '@/types';

describe('DataProcessingService', () => {
  const dataProcessingService = new DataProcessingService();

  test('should calculate language percentages', () => {
    // Crée un objet contenant le nombre d'offres d'emploi pour chaque langage de programmation
    const jobOfferCounts: JobOfferCounts = {
      java: 10,
      python: 20,
      javascript: 30,
      php: 10,
      go: 5,
      'c#': 8,
      kotlin: 3,
      'c++': 2,
      ruby: 2,
      swift: 1,
    };
    // Calcule les pourcentages de présence de chaque langage et crée un tableau d'objets avec le langage et son pourcentage
    const percentages = dataProcessingService.calculateLanguagePercentages(jobOfferCounts);

    // Définit le résultat attendu trié par ordre décroissant de pourcentage
    const expectedPercentages: LanguagePercentage[] = [
      { language: 'javascript', percentage: 34 },
      { language: 'python', percentage: 22 },
      { language: 'java', percentage: 11 },
      { language: 'php', percentage: 11 },
      { language: 'c#', percentage: 9 },
      { language: 'go', percentage: 5 },
      { language: 'kotlin', percentage: 3 },
      { language: 'c++', percentage: 2 },
      { language: 'ruby', percentage: 2 },
      { language: 'swift', percentage: 1 },
    ];

    // Calcule la somme des pourcentages
    const sumOfPercentages = percentages.reduce((total, percentage) => total + percentage.percentage, 0);

    // Vérifie que les résultats correspondent aux attentes
    expect(percentages).toEqual(expectedPercentages);
    expect(sumOfPercentages).toBe(100);
  });
});
