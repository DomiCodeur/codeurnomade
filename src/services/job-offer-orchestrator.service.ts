import { ApiService } from './api.service';
import { DataProcessingService } from './data-processing.service';
import { LanguagePercentage, JobOfferCounts } from '@/types';

export class JobOfferOrchestratorService {
  constructor(
    private apiService: ApiService,
    private dataProcessingService: DataProcessingService
  ) {}

  public async fetchJobOffersCountsForAllLanguages(
    departmentCode: string
  ): Promise<LanguagePercentage[]> {
    const jobOfferCounts: JobOfferCounts = {
      java: 0,
      python: 0,
      javascript: 0,
      php: 0,
      go: 0,
      csharp: 0,
      kotlin: 0,
      'c++': 0,
      ruby: 0,
      swift: 0,
    };
    const languages = Object.keys(jobOfferCounts);
  
    for (const language of languages) {
      try {
        const count = await this.apiService.fetchJobOffersCount(
          departmentCode,
          language
        );
        jobOfferCounts[language] = count !== undefined ? count : 0;
      } catch (error) {
        console.error(`Erreur lors de la récupération des offres d'emploi pour le langage ${language}:`, error);
      }
    }
  
    const percentages = this.dataProcessingService.calculateLanguagePercentages(jobOfferCounts);
    return percentages;
  }
  
}
