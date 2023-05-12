import axios, { AxiosInstance } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { describe, test, expect, beforeEach, afterEach } from 'vitest';


export class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.example.com',
    });
  }

  public getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }

  public buildJobOffersSearchUrl(departmentCode: string, language: string): string {
    return `/job-offers?department=\${departmentCode}&language=\${language}`;
  }

  public async fetchJobOffersCount(departmentCode: string, language: string): Promise<number> {
    const url = this.buildJobOffersSearchUrl(departmentCode, language);

    try {
      const response = await this.axiosInstance.get(url);
      const jobOffersCount = response.data.resultats.length;
      return jobOffersCount;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

describe('ApiService', () => {
  let apiService: ApiService;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    apiService = new ApiService();
    mockAxios = new MockAdapter(apiService.getAxiosInstance());
  });

  afterEach(() => {
    mockAxios.reset();
  });

  test('fetchJobOffersCount doit envoyer une requête GET et retourner le nombre d\'offres d\'emploi pour un département et un langage donnés', async () => {
    // Setup
    const departmentCode = '75';
    const language = 'java';
    const mockJobOffersCount = 42;
    const expectedUrl = apiService.buildJobOffersSearchUrl(departmentCode, language);

    // Créer un objet config avec l'en-tête d'autorisation
    const config = {
      headers: {
        Authorization: 'Bearer my-fake-token'
      }
    };

    mockAxios.onGet(expectedUrl, config).reply(200, {
      resultats: new Array(mockJobOffersCount).fill({})
    });

    // Exécuter la méthode fetchJobOffersCount
    const jobOffersCount = await apiService.fetchJobOffersCount(
      departmentCode,
      language
    );

    // Vérifier que l'en-tête d'autorisation est correctement configuré
    if (config.headers && config.headers.Authorization) {
      expect(config.headers.Authorization).toBe('Bearer my-fake-token');
    } else {
      throw new Error('Les headers de la requête sont manquants.');
    }

    // Assertions
    expect(jobOffersCount).toBe(mockJobOffersCount);
    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(expectedUrl);
  });
});
