// api.service.spec.ts

import { ApiService } from "@/services/api.service";
import MockAdapter from "axios-mock-adapter";

describe("ApiService", () => {
  let apiService: ApiService;
  let mockAxios: MockAdapter;

  beforeEach(() => {
    apiService = new ApiService();
    mockAxios = new MockAdapter(apiService.getAxiosInstance());
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it("fetchJobOffersCount doit envoyer une requête GET et retourner le nombre d'offres d'emploi pour un département et un langage donnés", async () => {
    // Setup
    const departmentCode = "75";
    const language = "java";
    const mockJobOffersCount = 42;
    const expectedUrl = apiService.buildJobOffersSearchUrl(departmentCode, language);

    // Mock du token pour la méthode refreshToken
    const mockToken = "mock-token";
    const proxyUrl = "http://localhost:3000/get_token";
    mockAxios.onPost(proxyUrl).reply(200, {
      access_token: mockToken,
      expires_in: 3600,
    });

    // Simuler la requête GET et la réponse avec Axios
    mockAxios.onGet(expectedUrl).reply(function (config) {
      // Vérifier que l'en-tête d'autorisation est correctement configuré
      if (config.headers && config.headers.Authorization) {
        expect(config.headers.Authorization).toBeDefined();
      } else {
        throw new Error("Les headers de la requête sont manquants.");
      }

      return [200, { resultats: new Array(mockJobOffersCount).fill({}) }];
    });

    // Exécuter la méthode fetchJobOffersCount
    const jobOffersCount = await apiService.fetchJobOffersCount(
      departmentCode,
      language
    );

    // Assertions
    expect(jobOffersCount).toBe(mockJobOffersCount);
    expect(mockAxios.history.get.length).toBe(1);
    expect(mockAxios.history.get[0].url).toBe(expectedUrl);
  });
});
