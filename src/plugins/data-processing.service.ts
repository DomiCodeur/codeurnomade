import { App } from "vue";

export default {
  install: (app: App, options: any) => {
    app.config.globalProperties.$dataProcessingService = options.dataProcessingService;
  },
};
