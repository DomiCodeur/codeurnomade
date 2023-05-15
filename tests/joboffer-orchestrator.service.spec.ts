import { describe, test, expect, vi } from 'vitest';
import { createApp, App } from 'vue';
import { DataProcessingService } from '@/services/data-processing.service';
import { JobOfferOrchestratorService } from '@/services/job-offer-orchestrator.service';
import { JobOfferCounts, LanguagePercentage } from '@/types';
import { ApiService } from '@/services/api.service';

describe('JobOfferOrchestrator', () => {
  test('should fetch job offer counts for all languages and calculate percentages', async () => {
    // Injecter les services dans l'application Vue existante
    const dataProcessingService = new DataProcessingService();
    const apiService = new ApiService();
    const fetchJobOffersCountSpy = vi.spyOn(apiService, 'fetchJobOffersCount');
    const calculateLanguagePercentagesSpy = vi.spyOn(dataProcessingService, 'calculateLanguagePercentages');

    const app: App = createApp({});
    app.config.globalProperties.$apiService = apiService;
    app.config.globalProperties.$dataProcessingService = dataProcessingService;
    
    app.provide('DataProcessingService', dataProcessingService);

    // Créer une instance de JobOfferOrchestrator en récupérant les services depuis l'application Vue
    const jobOfferOrchestrator = new JobOfferOrchestratorService(apiService, dataProcessingService);

    // Mock la méthode fetchJobOffersCount de ApiService pour qu'elle retourne des résultats prédéfinis
    fetchJobOffersCountSpy.mockImplementation(async (departmentCode: string, language: string) => {
      let count = 0;
      switch (language) {
        case 'java':
          count = 10;
          break;
        case 'python':
          count = 20;
          break;
        case 'javascript':
          count = 30;
          break;
        case 'php':
          count = 10;
          break;
        case 'go':
          count = 5;
          break;
        case 'csharp':
          count = 8;
          break;
        case 'kotlin':
          count = 3;
          break;
        case 'c++':
          count = 2;
          break;
        case 'ruby':
          count = 2;
          break;
        case 'swift':
          count = 1;
          break;
      }
      return count; 
    });

    // Définir le résultat attendu
    const expectedPercentages: LanguagePercentage[] = [
      { language: 'javascript', percentage: 34 },
      { language: 'python', percentage: 22 },
      { language: 'java', percentage: 11 },
      { language: 'php', percentage: 11 },
      { language: 'csharp', percentage: 9 },
      { language: 'go', percentage: 5 },
      { language: 'kotlin', percentage: 3 },
      { language: 'c++', percentage: 2 },
      { language: 'ruby', percentage: 2 },
      { language: 'swift', percentage: 1 },
    ];
    
    // Appeler la méthode à tester
    const result = await jobOfferOrchestrator.fetchJobOffersCountsForAllLanguages('departmentCode');

    // Vérifier que la méthode fetchJobOffersCount de ApiService a été appelée avec les bons paramètres pour chaque langage
    expect(fetchJobOffersCountSpy).toHaveBeenCalledTimes(10);
    expect(fetchJobOffersCountSpy).toHaveBeenCalledTimes(10);
    expect(fetchJobOffersCountSpy).toHaveBeenNthCalledWith(1, 'departmentCode', 'java');
    expect(fetchJobOffersCountSpy).toHaveBeenNthCalledWith(2, 'departmentCode', 'python');
    expect(fetchJobOffersCountSpy).toHaveBeenNthCalledWith(3, 'departmentCode', 'javascript');
    expect(fetchJobOffersCountSpy).toHaveBeenNthCalledWith(4, 'departmentCode', 'php');
    expect(fetchJobOffersCountSpy).toHaveBeenNthCalledWith(5, 'departmentCode', 'go');
    expect(fetchJobOffersCountSpy).toHaveBeenNthCalledWith(6, 'departmentCode', 'csharp');
    expect(fetchJobOffersCountSpy).toHaveBeenNthCalledWith(7, 'departmentCode', 'kotlin');
    expect(fetchJobOffersCountSpy).toHaveBeenNthCalledWith(8, 'departmentCode', 'c++');
    expect(fetchJobOffersCountSpy).toHaveBeenNthCalledWith(9, 'departmentCode', 'ruby');
    expect(fetchJobOffersCountSpy).toHaveBeenNthCalledWith(10, 'departmentCode', 'swift');

    // Vérifier que la méthode calculateLanguagePercentages de DataProcessingService a été appelée avec les bons paramètres
    expect(calculateLanguagePercentagesSpy).toHaveBeenCalledTimes(1);
    expect(calculateLanguagePercentagesSpy).toHaveBeenCalledWith({
      'java': 10,
      'python': 20,
      'javascript': 30,
      'php': 10,
      'go': 5,
      'csharp': 8,
      'kotlin': 3,
      'c++': 2,
      'ruby': 2,
      'swift': 1
    });    
    // Vérifier que le résultat correspond au tableau attendu d'objets LanguagePercentage
    expect(result).toEqual(expectedPercentages);

    // Restaurer la méthode fetchJobOffersCount à sa valeur d'origine
    fetchJobOffersCountSpy.mockReset();
    calculateLanguagePercentagesSpy.mockReset();
  });
});
