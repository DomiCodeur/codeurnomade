export interface JobOfferCounts {
  [key: string]: number;
}

export interface LanguagePercentage {
  language: string;
  percentage: number;
}

export interface JobOffer {
  id: string;
  libelle: string;
  description: string; 
}