<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <TestApiComponent />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TestApiComponent from "./components/TestApiComponent.vue";

export default defineComponent({
  name: "App",
  components: {
    TestApiComponent,
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
