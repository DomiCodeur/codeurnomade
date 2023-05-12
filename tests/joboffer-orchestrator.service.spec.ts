import { describe, test, expect, vi} from 'vitest';
import { createApp, App } from 'vue';
import { DataProcessingService } from '@/services/data-processing.service';
import { JobOfferOrchestratorService } from '@/services/job-offer-orchestrator.service';
import { JobOfferCounts, LanguagePercentage } from '@/types';

describe('JobOfferOrchestrator', () => {
  test('should fetch job offer counts for all languages and calculate percentages', async () => {
    // Injecter les services dans l'application Vue existante
    const dataProcessingService = new DataProcessingService();
    const app: App = createApp({});
    const apiService = { fetchJobOffersCount: vi.fn() };
    app.config.globalProperties.$apiService = apiService;
    app.config.globalProperties.$dataProcessingService = dataProcessingService;
    app.provide('DataProcessingService', dataProcessingService);

    // Créer une instance de JobOfferOrchestrator en récupérant les services depuis l'application Vue
    const jobOfferOrchestrator = new JobOfferOrchestratorService();

// Mock la méthode fetchJobOffersCount de ApiService pour qu'elle retourne des résultats prédéfinis
const originalFetchJobOffersCount = apiService.fetchJobOffersCount;
let fetchJobOffersCountCallCount = 0;
apiService.fetchJobOffersCount.mockImplementation(async (departmentCode: string, language: string) => {
    fetchJobOffersCountCallCount++;
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
    case 'c#':
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
      { language: 'c#', percentage: 9 },
      { language: 'go', percentage: 5 },
      { language: 'kotlin', percentage: 3 },
      { language: 'c++', percentage: 2 },
      { language: 'ruby', percentage: 2 },
      { language: 'swift', percentage: 1 },
    ];

    // Appeler la méthode à tester
    const result = await jobOfferOrchestrator.fetchJobOffersCountsForAllLanguages('departmentCode');

    // Vérifier que la méthode fetchJobOffersCount de ApiService a été appelée avec les bons paramètres pour chaque langage
    expect(fetchJobOffersCountCallCount).toBe(10);
    expect(apiService.fetchJobOffersCount).toHaveBeenNthCalledWith(1, 'departmentCode', 'java');
    expect(apiService.fetchJobOffersCount).toHaveBeenNthCalledWith(2, 'departmentCode', 'python');
    expect(apiService.fetchJobOffersCount).toHaveBeenNthCalledWith(3, 'departmentCode', 'javascript');
    expect(apiService.fetchJobOffersCount).toHaveBeenNthCalledWith(4, 'departmentCode', 'php');
    expect(apiService.fetchJobOffersCount).toHaveBeenNthCalledWith(5, 'departmentCode', 'go');
    expect(apiService.fetchJobOffersCount).toHaveBeenNthCalledWith(6, 'departmentCode', 'c#');
    expect(apiService.fetchJobOffersCount).toHaveBeenNthCalledWith(7, 'departmentCode', 'kotlin');
    expect(apiService.fetchJobOffersCount).toHaveBeenNthCalledWith(8, 'departmentCode', 'c++');
    expect(apiService.fetchJobOffersCount).toHaveBeenNthCalledWith(9, 'departmentCode', 'ruby');
    expect(apiService.fetchJobOffersCount).toHaveBeenNthCalledWith(10, 'departmentCode', 'swift');

    // Vérifier que la méthode calculateLanguagePercentages de DataProcessingService a été appelée avec les bons paramètres
  //  expect(dataProcessingService.calculateLanguagePercentages).toHaveBeenCalledTimes(1);
    //expect(dataProcessingService.calculateLanguagePercentages).toHaveBeenCalledWith((10));

    // Vérifier que le résultat correspond au tableau attendu d'objets LanguagePercentage
    expect(result).toEqual(expectedPercentages);
    // Restaurer la méthode fetchJobOffersCount à sa valeur d'origine
    apiService.fetchJobOffersCount = originalFetchJobOffersCount;

  });
});

