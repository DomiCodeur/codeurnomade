import { App, Plugin } from "vue";
import { JobOfferOrchestratorService } from "../services/job-offer-orchestrator.service";

export const JobOfferOrchestratorPlugin: Plugin = {
  install: (app: App) => {
    const jobOfferOrchestratorInstance = new JobOfferOrchestratorService();
    app.config.globalProperties.$jobOfferOrchestratorService = jobOfferOrchestratorInstance;
  },
};
