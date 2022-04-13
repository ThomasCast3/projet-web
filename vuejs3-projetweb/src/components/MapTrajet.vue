
<template>
 <div id="TrajetContainer" >
 <CreerTrajet  @creer-Marker="ajoutMarker($event)"/>

  <div id="mapContainer" >

  </div>
   </div>
</template>

<script>
import "/public/leaflet.css";
import { Icon } from 'leaflet';
import L from "leaflet";
import "/public/Tween.js";
import "/public/leaflet.curve.js";
import CreerTrajet from "/src/assets/components/CreerTrajet.vue";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

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
      ajoutMarker(ville){
         markerPos.spliceWayponts(0,1);
         for(let x=0; x<2;x++){
          var CPvillePos = "";
          var CPvilleDest ="";
            fetch(
        `https://geo.api.gouv.fr/communes?nom=${ville[x]}&fields=code,nom,centre`
      ).then((response) =>
        response.json().then((data) => {
            for(let nomVille of data){
                let nameV = nomVille.nom;
                if(ville[0].toUpperCase() == nameV.toUpperCase()){
                  CPvillePos = nomVille;
                }
                 if(ville[1].toUpperCase() == nameV.toUpperCase()){
                  CPvilleDest = nomVille;
                }
             
              //  console.log(nameV)
                }
        
            var lngPos = CPvillePos.centre.coordinates[0];
            var latPos =CPvillePos.centre.coordinates[1];
           var markerPos = L.marker([latPos,lngPos]).addTo(this.map);
            var lngDest = CPvilleDest.centre.coordinates[0];
            var latDest =CPvilleDest.centre.coordinates[1];
            L.marker([latDest,lngDest]).addTo(this.map);
            })
            );
          }
        },
  },
}
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