<template>
  <div class="container">
    <div class="top-container">
      <DepartmentInputComponent @reset-map="resetMap" @departement-select="handleDepartementSelect" />
      <LanguageInputComponent @reset-map="resetMap" @language-select="handleLanguageSelect"/>
    </div>
    <div class="content-container">
      <div class="map-container">
        <MapComponent :demandData="jobOffersCounts" :resetTrigger="resetTrigger" 
        @departement-select="handleDepartementSelect"
        @language-select="handleLanguageSelect"/>
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
import LanguageInputComponent from "./components/LanguageInputComponent.vue"; 
import { LanguagePercentage } from "./types";

export default defineComponent({
  name: "App",
  components: {
    DepartmentInputComponent,
    MapComponent,
    LanguageTableComponent,
    LanguageInputComponent,
  },
  setup() {
    const selectedDepartement = ref("");
    const languages = ref<LanguagePercentage[]>([]);
    const loading = ref(false);
    const jobOffersCounts = ref<Record<string, number>>({});  
    const resetTrigger = ref(false);
    
    const jobOfferOrchestratorInstance =
      getCurrentInstance()?.appContext.config.globalProperties
        .$jobOfferOrchestratorService;

    const handleDepartementSelect = async (departementCode: string) => {
      jobOffersCounts.value = {}; // Remettre les comptes d'offres d'emploi à zéro
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
      resetTrigger.value = false;  // on reinitialise le trigger
    };

    const handleLanguageSelect = async (language: string) => {
      jobOffersCounts.value = {}; // Remettre les comptes d'offres d'emploi à zéro
    try {
        await jobOfferOrchestratorInstance?.fetchJobOffersCountPerDepartment(language, (data: Record<string, number>) => {
            jobOffersCounts.value = data;
            resetMap();
        });
        resetTrigger.value = false; // Remise à false après la réinitialisation de la carte
    } catch (error) {
        console.error('Erreur lors de la récupération des comptes des offres d\'emploi:', error);
    } 
};

      const resetMap = () => {
      resetTrigger.value = !resetTrigger.value;
    };



    return {
      selectedDepartement,
      languages,
      handleDepartementSelect,
      handleLanguageSelect, 
      loading,
      jobOffersCounts, 
      resetTrigger,
      resetMap,
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