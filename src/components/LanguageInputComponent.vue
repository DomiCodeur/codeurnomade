<template>
  <div class="search-form">
    <input v-model="inputValue" placeholder="Entrez le nom d'un langage" class="search-input"/>
    <button @click="checkAndEmitLanguage" class="search-button">Rechercher</button>

    <!-- Popup d'erreur -->
    <div v-if="showErrorPopup" class="error-popup">
      Langage non reconnu. Veuillez essayer à nouveau.
    </div>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, getCurrentInstance } from "vue";
  
  const VALID_LANGUAGES = [
  "java", "python", "javascript", "php", "golang", "c#", "kotlin", "c++", "ruby", "swift",
  "typescript", "bash", "shell", "r", "scala", "rust", "dart", "elixir", "erlang", "fortran",
  "haskell", "html", "css", "lua", "matlab", "objective-c", "perl", "powershell", "racket",
  "scheme", "smalltalk", "sql", "vba", "webassembly", "xml", "xslt", "yaml"
];

  
  export default defineComponent({
    name: "LanguageInputComponent",
    setup(props, ctx) {
      const inputValue = ref("");
      const showErrorPopup = ref(false);
  
      const checkAndEmitLanguage = () => {
        const language = inputValue.value.toLowerCase();
        console.log('Emitting reset-map');  // Ajout d'un log

        ctx.emit("reset-map");  
        if (VALID_LANGUAGES.includes(language)) {
          showErrorPopup.value = false;
          console.log('Emitting language-select');  // Ajout d'un log

          ctx.emit("language-select", language);
        } else {
          showErrorPopup.value = true;
        }
      };
  
      return {
        inputValue,
        showErrorPopup,
        checkAndEmitLanguage,
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

.error-popup {
  color: red;
  margin-top: 10px;
}
</style>
  