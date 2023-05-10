import { createApp } from "vue";
import App from "./App.vue";
import { LMap, LTileLayer,LGeoJson } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

const app = createApp(App);
app.component("l-map", LMap);
app.component("l-tile-layer", LTileLayer);
app.component("l-geo-json", LGeoJson);
app.mount("#app");
