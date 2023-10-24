<template>
  <div class="search-form">
    <input v-model="inputValue" placeholder="Entrez le nom d'un langage" class="search-input"/>
    <button @click="checkAndEmitLanguage" class="search-button">Rechercher</button>
  </div>
</template>
  
  <script lang="ts">
  import { defineComponent, ref, getCurrentInstance } from "vue";
  
  const VALID_LANGUAGES = [
  "java", "python", "javascript", "php", "golang", "go", "c#", "csharp", "kotlin", 
  "c++", "cpp", "ruby", "swift", "typescript", "ts", "bash", "shell", "r", "scala", 
  "rust", "dart", "elixir", "erlang", "fortran", "haskell", "html", "css", "lua", 
  "matlab", "objective-c", "obj-c", "perl", "powershell", "racket", "scheme", "lisp", 
  "common-lisp", "clojure", "smalltalk", "sql", "vba", "webassembly", "wasm", "xml", 
  "xslt", "yaml", "yml", "angular", "react", "vuejs", "vue", "nodejs", "node", "express", 
  "django", "flask", "spring", "dotnet", "asp.net", "ruby-on-rails", "meteor", "ember", 
  "backbone", "bootstrap", "tailwind", "svelte", "graphql", "webpack", "gulp", "grunt"
];


  
  export default defineComponent({
    name: "LanguageInputComponent",
    setup(props, ctx) {
      const inputValue = ref("");
  
      const checkAndEmitLanguage = () => {
        const language = inputValue.value.toLowerCase();
        ctx.emit("reset-map");  
        if (VALID_LANGUAGES.includes(language)) {
          ctx.emit("language-select", language);
        } else {
          alert("Langage non reconnu. Veuillez essayer à nouveau.");
        }
      };
  
      return {
        inputValue,
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
  