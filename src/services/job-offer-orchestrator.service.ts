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

  // Quand l'utilisateur a cliqué sur un département, on recherche tous les langages
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


// On recherche le nombre d'offre pour tous les departements, quand l'utilisateur a entré un langage
public async fetchJobOffersCountPerDepartment(language: string, updateData: (data: Record<string, number>) => void): Promise<void> {
  const departmentCodes = [
    "01", "02", "03", "04", "05", "06", "07", "08", "09", "10",
    "11", "12", "13", "14", "15", "16", "17", "18", "19", "2A",
    "2B", "21", "22", "23", "24", "25", "26", "27", "28", "29",
    "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
    "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
    "50", "51", "52", "53", "54", "55", "56", "57", "58", "59",
    "60", "61", "62", "63", "64", "65", "66", "67", "68", "69",
    "70", "71", "72", "73", "74", "75", "76", "77", "78", "79",
    "80", "81", "82", "83", "84", "85", "86", "87", "88", "89",
    "90", "91", "92", "93", "94", "95"
];

  const demandData: Record<string, number> = {};

  for (const departmentCode of departmentCodes) {
    try {
        const count = await this.apiService.fetchWithRetry(departmentCode, language);  
        demandData[departmentCode] = count;
        updateData({...demandData}); 
      } catch (error) {
        console.error('Erreur lors de la récupération des comptes des offres d\'emploi pour le département', departmentCode, ":", error);
    }
  }
    
  }

}
