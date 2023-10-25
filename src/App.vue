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
        <div class="table-container">
          <div class="table-container">
          <LanguageTableComponent
            v-if="!languageSelected"
            :languages="languages"
            :selectedDepartement="selectedDepartement"
            :loading="loading"
          />
          <ColorLegendComponent/>
        </div>
        </div>
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
import ColorLegendComponent from "./components/ColorLegendComponent.vue";


export default defineComponent({
  name: "App",
  components: {
    DepartmentInputComponent,
    MapComponent,
    LanguageTableComponent,
    LanguageInputComponent,
    ColorLegendComponent
  },
  setup() {
    const selectedDepartement = ref("");
    const languages = ref<LanguagePercentage[]>([]);
    const loading = ref(false);
    const jobOffersCounts = ref<Record<string, number>>({});  
    const resetTrigger = ref(false);
    const languageSelected = ref(false);

    
    const jobOfferOrchestratorInstance =
      getCurrentInstance()?.appContext.config.globalProperties
        .$jobOfferOrchestratorService;

    const handleDepartementSelect = async (departementCode: string) => {
      jobOffersCounts.value = {}; // Remettre les comptes d'offres d'emploi à zéro
      languageSelected.value = false;
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
      languageSelected.value = true;
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
      languageSelected
    };
  },
});
</script>

<style>

/* Styles pour le mode Desktop */
.top-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.content-container {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
}



/* Media query pour les écrans de petite taille (mobiles) */
@media (max-width: 1100px) {
  .top-container {
    flex-direction: column;
    align-items: center;
  }

  .content-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

</style>