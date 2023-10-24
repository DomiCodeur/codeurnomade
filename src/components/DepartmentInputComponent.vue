<template>
  <div>
    <form @submit.prevent="submitForm" placeholder="Entrez un numéro de département" class="search-form">
      <!-- On empêche le comportement par défaut du formulaire qui est de recharger la page -->
      <input
        type="text"
        v-model="departementCode"
        placeholder="Entrer le code département"
        class="search-input"
      />
      <!-- Un champ pour que l'utilisateur puisse entrer le code de département -->
      <button type="submit" class="search-button">Rechercher</button>
      <!-- Un bouton pour soumettre le formulaire -->
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "DepartmentInputComponent",
  emits: {
    "departement-select": null, // On déclare l'événement "departement-select"
    "reset-map": null
  },
  setup(_, ctx) {
    const departementCode = ref(""); // On utilise une référence pour stocker le code du département

          const submitForm = () => {
            ctx.emit("reset-map");  

        // Quand le formulaire est soumis, on vérifie que le code du département est valide
        // (de 01 à 19, de 21 à 95, ou 2A ou 2B pour la Corse), puis on émet l'événement "departement-select"
        const codeIsValid = /^(0[1-9]|[1-8]\d|9[0-5])$/.test(departementCode.value.toUpperCase());

        if (codeIsValid && departementCode.value !== '20') {
          ctx.emit("departement-select", departementCode.value);
        } else {
          alert(
            "Veuillez entrer un code département valide (de 01 à 19, de 21 à 95, 2A ou 2B pour la Corse)"
          );
        }
      };



    return {
      departementCode,
      submitForm,
    };
  },
});
</script>

<style scoped>
.search-form {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.search-input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  width: 200px;
}

.search-button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.25rem;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;
}

.search-button:hover {
  background-color: #0056b3;
}
/* CSS */
@media (max-width: 600px) {
  .search-input, .search-button {
    width: 100%;
  }

  .search-form {
    flex-direction: column;
    gap: 0.5rem;
  }
}

 
</style>
