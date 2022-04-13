<template>
 <div id="TrajetContainer" >
 <CreerTrajet  @creer-Marker="ajoutMarker()"/>

  <div id="mapContainer" >

  </div>
   </div>
</template>

<script>
import "/public/leaflet.css";
import L from "leaflet";
import "/public/Tween.js";
import "/public/leaflet.curve.js";
import CreerTrajet from "/src/assets/components/CreerTrajet.vue";

export default {
  name: "LeafletMap",
  components: {
       CreerTrajet,
  },
  data() {
    return {
      map: null,
    };
  },
  mounted() {
    this.map = L.map("mapContainer").setView([46.05, 11.05], 5);
    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
    //use a mix of renderers
    var customPane = this.map.createPane("customPane");
    var canvasRenderer = L.canvas({ pane: "customPane" });
    customPane.style.zIndex = 399; // put just behind the standard overlay pane which is at 400
   
  },
  onBeforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },

  methods:{
      ajoutMarker( ){
      L.marker([100,100]).addTo(this.map);
      },
  },
};
</script>

<style scoped>
#mapContainer {
  width: 50vw;
  height: 50vh;
}

#TrajetContainer {
    
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
}

</style>