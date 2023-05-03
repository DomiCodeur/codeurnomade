<template>
  <div>
    <h1>Test API</h1>
    <button @click="fetchOffers">Fetch Job Offers</button>
    <p v-if="jobOffersCount !== null">
      Nombre d'offres d'emploi pour le langage sélectionné :
      {{ jobOffersCount }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ApiService } from "@/services/api.service";

export default defineComponent({
  setup() {
    const apiService = new ApiService();
    const jobOffersCount = ref<number | null>(null);

    async function fetchOffers() {
      try {
        const departmentCode = "75";
        const language = "java";
        jobOffersCount.value = await apiService.fetchJobOffersCount(
          departmentCode,
          language
        );
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des offres d'emploi:",
          error
        );
      }
    }

    // Retourner les variables et les fonctions dans l'objet de retour
    return {
      jobOffersCount,
      fetchOffers,
    };
  },
});
</script>
