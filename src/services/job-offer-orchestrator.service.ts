import { ApiService } from "./api.service";
import { DataProcessingService } from "./data-processing.service";
import { LanguagePercentage, JobOfferCounts, JobOffer } from "@/types";

export class JobOfferOrchestratorService {
  constructor(
    private apiService: ApiService,
    private dataProcessingService: DataProcessingService
  ) {}

  public async getJobOffers(departmentCode: string): Promise<JobOffer[]> {
    const rawData = await this.apiService.fetchAllJobOffers(departmentCode);
    return this.dataProcessingService.processJobOffers(rawData);
  }


  public async fetchJobOffersCountsForAllLanguages(departmentCode: string): Promise<LanguagePercentage[]> {
    const jobOffers = await this.getJobOffers(departmentCode);
    const jobOfferCounts: JobOfferCounts = {
      "java": 0,
      "python": 0,
      "javascript": 0,
      "php": 0,
      "golang": 0,
      "c#": 0,
      "kotlin": 0,
      "c++": 0,
      "ruby": 0,
      "swift": 0,
    };

    // Fonction pour enlever les caractères spéciaux d'une chaîne avant de l'utiliser dans une regex
    function escapeRegExp(string: string) {
      return string.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); 
    }

    // Compte le nombre d'offres contenant chaque langage
    for (const offer of jobOffers) {
      const description = offer.description.toLowerCase();
      for (const language of Object.keys(jobOfferCounts)) {
        const regex = new RegExp(`(^|\\s)${escapeRegExp(language)}(\\s|$)`, "g");
        const matches = description.match(regex);
        if (matches) {
          jobOfferCounts[language] += matches.length;
        }
      }
    }

    const percentages = this.dataProcessingService.calculateLanguagePercentages(jobOfferCounts);
    return percentages;
}


}
