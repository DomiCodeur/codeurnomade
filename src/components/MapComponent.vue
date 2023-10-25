<template>
  <div class="map-container">
    <div id="france-map"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";
import * as d3 from "d3";
import { scaleLinear } from 'd3-scale';
import { geoMercator, geoPath } from 'd3-geo';
import { max } from 'd3-array';
import { Selection, BaseType } from 'd3-selection';


export default defineComponent({
  name: "MapComponent",
  props: {
    demandData: {
      type: Object,
      required: true,
      default: () => ({}), 
    },
    selectedDepartement: {
      type: String,
      required: false,
      default: '',
    },
    resetTrigger: {
      type: Boolean,
      required: true,
    },
  },
  emits: {
    "departement-select": null,
  },
  setup(props, ctx) {
    const lastClickedRegion = ref<any>(null);
    const colorScale = ref(scaleLinear<string>().range(["#ADD8E6", "#00008B"]));

    const drawFranceMap = async () => {
      
      const width = window.innerWidth > 768 ? 800 : window.innerWidth;
      const height = window.innerWidth > 768 ? 700 : window.innerWidth * (700 / 800);


      try {
        // Récupération du fichier GeoJSON
        const response = await fetch("/departements.geojson");
        const franceDepartements = await response.json();
        // Création de l'élément SVG qui contiendra la carte
        const svg = d3.select("#france-map")
          .html('')  // Clear any existing SVG
          .append("svg")
          .attr("width", width)
          .attr("height", height);

        // Définition de la projection de la carte
        const scale = width / 800;
        const projection = geoMercator().scale(scale)    
        .fitSize([width, height], franceDepartements);

        const pathGenerator = geoPath().projection(projection);

        // Dessin de la carte
        svg
        .selectAll("path")
        .data(franceDepartements.features)
        .join("path")
        .attr("d", (d: any) => pathGenerator(d) as string)
        .attr("stroke", "#333")
        .attr("fill", (d: any) => {
          const departementCode = d.properties.code;
          if (props.resetTrigger) {
            return "#ccc";  // Reset color to grey when resetTrigger is true
          } else if (props.selectedDepartement === departementCode) {
            return "#ADD8E6";  // Light blue color for selected departement
          } else {
            const demandValue = props.demandData[departementCode];
            return demandValue ? colorScale.value(demandValue) : "#ccc";  // Grey color for unselected departements
          }
          })
          .on("click", function(event: MouseEvent, d: any) {
            const departementCode = d.properties.code;
            ctx.emit("departement-select", departementCode);

            // Reset de la couleur de la region cliquee
            if (lastClickedRegion.value) {
              lastClickedRegion.value.attr("fill", "#ccc");
            }

            // Update du lastClickedRegion ref
            lastClickedRegion.value = d3.select(this);  

          
            lastClickedRegion.value.attr("fill", "#ADD8E6");
            drawFranceMap();  // Re-draw the map to reflect the new selected departement
          });
      } catch (error) {
        console.error("Erreur lors du dessin de la carte de France :", error);
      }
    };

    onMounted(() => {
      colorScale.value.domain([0, props.demandData ? max(Object.values(props.demandData)) : 0]);
      drawFranceMap();
    });


    watch([() => props.demandData, () => props.selectedDepartement, () => props.resetTrigger], () => {
      colorScale.value.domain([0, props.demandData ? max(Object.values(props.demandData)) : 0]);
      drawFranceMap();
    });

    return {
      drawFranceMap,
    };
  },
});
</script>

<style>
.map-container, #france-map {
  margin: 0;
  padding: 0;
}

.map-container {
  max-width: 100%;
  max-height: 600px;
  position: relative;
}

@media (max-width: 768px) {
  .map-container {
    width: 100%;
    height: auto;
  }
}

</style>
