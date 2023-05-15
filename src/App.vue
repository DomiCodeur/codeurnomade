<template>
  <div class="container">
    <div class="top-container">
      <DepartmentInputComponent @departement-select="handleDepartementSelect"/>
    </div>
    <div class="map-container">
      <MapComponent @departement-select="handleDepartementSelect" />
    </div>
    <div class="table-container">
      <LanguageTableComponent
        :languages="languages"
        :selectedDepartement="selectedDepartement"
        :loading="loading"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, getCurrentInstance } from "vue";
import DepartmentInputComponent from "./components/DepartmentInputComponent.vue";
import MapComponent from "./components/MapComponent.vue";
import LanguageTableComponent from "./components/LanguageTableComponent.vue";
import { LanguagePercentage } from "./types";

export default defineComponent({
  name: "App",
  components: {
    DepartmentInputComponent,
    MapComponent,
    LanguageTableComponent
  },
  setup() {
    const selectedDepartement = ref("");
    const languages = ref<LanguagePercentage[]>([]);
    const loading = ref(false);

    const jobOfferOrchestratorInstance =
      getCurrentInstance()?.appContext.config.globalProperties
        .$jobOfferOrchestratorService;

    const handleDepartementSelect = async (departementCode: string) => {
      loading.value = true;
      selectedDepartement.value = departementCode;
      const fetchedLanguages = await jobOfferOrchestratorInstance?.fetchJobOffersCountsForAllLanguages(
        departementCode
      );
      if (fetchedLanguages) {
        languages.value = fetchedLanguages;
      }
      loading.value = false;
    };

    return {
      selectedDepartement,
      languages,
      handleDepartementSelect,
      loading,
    };
  },
});
</script>


<style>
.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.top-container {
  width: 100%;
  text-align: center;
  margin: 2em;
}

.map-container {
  flex: 1;
  margin-right: 1rem;
}

.table-container {
  flex: 1;
}
</style>
