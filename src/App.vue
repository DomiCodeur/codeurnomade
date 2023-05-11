<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <TestApiComponent />
  <MapComponent @departement-select="handleDepartementSelect" />
  <div v-if="selectedDepartement">
    Département sélectionné : {{ selectedDepartement }}
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TestApiComponent from "./components/TestApiComponent.vue";
import MapComponent from "./components/MapComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    TestApiComponent,
    MapComponent,
  },
  setup() {
    const selectedDepartement = ref(""); // Variable pour stocker le département sélectionné

    // Fonction pour gérer la sélection du département
    const handleDepartementSelect = (departementCode: string) => {
      selectedDepartement.value = departementCode; // Stockage de la valeur émise dans la variable
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
