<template>
  <div class="color-legend">
    <div v-for="(value, index) in colorRange" :key="index" class="legend-item">
      <div :style="getBackgroundStyle(value)" class="color-box"></div>
      <div class="legend-label">{{ labels[index] }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ColorLegendComponent",
  data() {
    return {
      colorRange: ['#00008B', '#ADD8E6', '#ccc'],
      labels: ['Annonces nombreuses', 'Nombre moyen d\'annonces', 'Peu d\'annonces']
    }
  },
  methods: {
    getBackgroundStyle(color: string) {
      return { background: color };
    }
  }
});
</script>

  <style>
  .color-legend {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  background-color: #f9f9f9;
  margin-top: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.color-box {
  width: 20px;
  height: 20px;
  border: 1px solid #d0d0d0;
  border-radius: 3px;
}

.legend-label {
  font-size: 1rem;
  color: #333;
}

  </style>
  