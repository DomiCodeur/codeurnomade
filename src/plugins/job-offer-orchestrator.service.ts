import { App, Plugin } from "vue";
import { JobOfferOrchestratorService } from "../services/job-offer-orchestrator.service";
import { ApiService } from "../services/api.service";
import { DataProcessingService } from "../services/data-processing.service";

export const JobOfferOrchestratorPlugin: Plugin = {
  install: (app: App) => {
    const apiService = new ApiService();
    const dataProcessingService = new DataProcessingService();
    const jobOfferOrchestratorInstance = new JobOfferOrchestratorService(apiService, dataProcessingService);
    app.config.globalProperties.$jobOfferOrchestratorService = jobOfferOrchestratorInstance;
  },
};
