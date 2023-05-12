<template>
  <div>
    <TestApiComponent />
    <MapComponent @departement-select="handleDepartementSelect" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import TestApiComponent from "./components/TestApiComponent.vue";
import MapComponent from "./components/MapComponent.vue";


export default defineComponent({
  name: "App",
  components: {
    TestApiComponent,
    MapComponent,
  },
  setup() {
    const selectedDepartement = ref("");
    const jobOfferOrchestratorInstance = getCurrentInstance()?.appContext.config.globalProperties.$jobOfferOrchestratorService;

    const handleDepartementSelect = (departementCode: string) => {
  selectedDepartement.value = departementCode;
  jobOfferOrchestratorInstance?.fetchJobOffersCountsForAllLanguages(
    departementCode
  );
};


    return {
      selectedDepartement,
      handleDepartementSelect,
      
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
