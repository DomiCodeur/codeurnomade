<template>
  <div class="map-container">
    <div id="france-map"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, EmitsOptions } from "vue";
import * as d3 from "d3";
import { Selection, BaseType } from "d3-selection";


export default defineComponent({
  name: "MapComponent",
  emits: {
    "departement-select": null, 
  },
  setup(props, ctx) {
    // Fonction pour dessiner la carte de France
    const lastClickedRegion = ref<Selection<BaseType | SVGPathElement, unknown, null, undefined> | null>(null);

    const drawFranceMap = async () => {
      const width = 800;
      const height = 600;

      try {
        // Récupération du fichier GeoJSON
        const response = await fetch("/departements.geojson");
        const franceDepartements = await response.json();

        // Création de l'élément SVG qui contiendra la carte
        const svg = d3
          .select("#france-map")
          .append("svg")
          .attr("width", width)
          .attr("height", height);

      // Définition de la projection de la carte
        const projection = d3
          .geoMercator()
          .fitSize([width, height], franceDepartements);

        const pathGenerator = d3.geoPath().projection(projection);

        // Dessin de la carte
        svg
          .selectAll("path")
          .data(franceDepartements.features)
          .join("path")
          .attr("d", (d: any) => pathGenerator(d) as string)
          .attr("stroke", "#333")
          .attr("fill", "#ccc")
          .on("click", function(event: MouseEvent, d: any) {
            const departementCode = d.properties.code;
            ctx.emit("departement-select", departementCode);

            if (lastClickedRegion.value) {
                lastClickedRegion.value.attr("fill", "#ccc");
            }

            d3.select(this).attr("fill", "#ADD8E6");
            lastClickedRegion.value = d3.select(this);

            console.log("departmentcode", departementCode);
          });
      } catch (error) {
        console.error("Erreur lors du dessin de la carte de France :", error);
      }
    };

    onMounted(() => {
      // Appel de la fonction pour dessiner la carte lors du montage du composant
      drawFranceMap();
    });

    return {
      drawFranceMap,
    };
  },
});
</script>

<style>
.map-container {
  width: 100%;
  position: relative;
}

@media (max-width: 768px) {
  .map-container {
    padding-bottom: 40%;
    position: relative;
  }
}

#france-map {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
