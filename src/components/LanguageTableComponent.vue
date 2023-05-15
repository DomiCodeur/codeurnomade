<template>
  <div class="rounded-container">
    <h2>
      Langages de programmation les plus demandés dans le département
      {{ selectedDepartement }}
    </h2>
    <div v-if="loading" class="loading">
      <img src="/spinner.gif" alt="Chargement..." />
    </div>
    <transition name="fade">
      <table v-if="!loading && languages.length">
        <thead>
          <tr>
            <th>Langage</th>
            <th>Pourcentage</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="language in languages" :key="language.language">
            <td>{{ language.language }}</td>
            <td>{{ language.percentage }}%</td>
          </tr>
        </tbody>
      </table>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { LanguagePercentage } from "@/types";

export default defineComponent({
  name: "LanguageTableComponent",
  props: {
    selectedDepartement: {
      type: String,
      required: true,
    },
    languages: {
      type: Array as PropType<LanguagePercentage[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
});
</script>

<style scoped>
.rounded-container {
  border: 1px solid #ddd;
  border-radius: 15px;
  padding: 2rem;
  margin: 1rem;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.loading {
  text-align: center;
  font-weight: bold;
  font-size: 1.2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

th,
td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  font-weight: bold;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
