import { App, Plugin } from "vue";
import { JobOfferOrchestratorService } from "../services/job-offer-orchestrator.service";

export const JobOfferOrchestratorPlugin: Plugin = {
  install: (app: App) => {
    const jobOfferOrchestratorInstance = new JobOfferOrchestratorService();
<<<<<<< HEAD
    app.config.globalProperties.$jobOfferOrchestratorService =
      jobOfferOrchestratorInstance;
=======
    app.config.globalProperties.$jobOfferOrchestratorService = jobOfferOrchestratorInstance;
>>>>>>> dd6ae9c (Modifications des tests et ajout de plugins)
  },
};
