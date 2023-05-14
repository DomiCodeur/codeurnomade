<template>
  <div id="france-map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch, EmitsOptions } from "vue";
import * as d3 from "d3";

export default defineComponent({
  name: "MapComponent",
  emits: {
    "departement-select": null, // Déclarez l'événement "departement-select"
  },
  setup(props, ctx) {
    // Fonction pour dessiner la carte de France
    const drawFranceMap = async () => {
      const width = 800; // Largeur de la carte
      const height = 600; // Hauteur de la carte

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

        // Définition de la fonction pour dessiner les chemins géographiques
        const pathGenerator = d3.geoPath().projection(projection);

        // Dessin de la carte
        svg
          .selectAll("path")
          .data(franceDepartements.features)
          .join("path")
          .attr("d", (d: any) => pathGenerator(d) as string)
          .attr("stroke", "#333")
          .attr("fill", "#ccc")
          .on("click", (event: MouseEvent, d: any) => {
            // Envoi de l'identifiant du département vers le composant parent
            const departementCode = d.properties.code;
            ctx.emit("departement-select", departementCode);
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
#france-map {
  width: 800px;
  height: 600px;
}
</style>
