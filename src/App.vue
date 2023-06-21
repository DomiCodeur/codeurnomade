<template>
  <div class="container">
    <div class="top-container">
      <DepartmentInputComponent @departement-select="handleDepartementSelect" />
    </div>
    <div class="content-container">
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
    LanguageTableComponent,
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
      const fetchedLanguages =
        await jobOfferOrchestratorInstance?.fetchJobOffersCountsForAllLanguages(
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

.top-container {
  width: 100%;
  align-items: center;
  margin: 2em;
}

.content-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.map-container {
  flex: 1;
  margin-right: 1rem;
}
.map-container {
  flex: 1;
  margin-right: 1rem;
}

.table-container {
  max-width: 600px;
  margin-right: 3rem;
}

/* Media query pour les écrans de petite taille */
@media (max-width: 1300px) {
  .container {
    display: flex;
    flex-direction: column;
  }
  .content-container {
    display: flex;
    flex-direction: column;
  }
  .map-container {
    flex: 1;
    max-width: 50%;
   margin-right: 50%;
  }

  .table-container {
    margin-top: 70%;
    align-self: center;
  }
  
}
</style>