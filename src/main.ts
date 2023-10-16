import { createApp } from "vue";
import App from "./App.vue";
import { ApiService } from "./services/api.service";
import { DataProcessingService } from "./services/data-processing.service";
import { JobOfferOrchestratorService } from "./services/job-offer-orchestrator.service";
import VueGtag from "vue-gtag-next";


const apiServiceInstance = new ApiService();
const dataProcessingInstance = new DataProcessingService();
const jobOfferOrchestratorInstance = new JobOfferOrchestratorService(
  apiServiceInstance,
  dataProcessingInstance
);

const app = createApp(App);

app.use(VueGtag, {
  property: { id: "G-P28MN21GTX" }
});

app.config.globalProperties.$apiService = apiServiceInstance;
app.config.globalProperties.$dataProcessingService = dataProcessingInstance;
app.config.globalProperties.$jobOfferOrchestratorService =
  jobOfferOrchestratorInstance;

app.mount("#app");
