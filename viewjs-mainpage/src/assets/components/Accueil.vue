<template>
  <div id="AccueilContainer">
    <CreerTrajet />
    <MapTrajet />
  </div>
</template>

<script>
import MapTrajet from "/src/assets/components/MapTrajet.vue";
import CreerTrajet from "/src/assets/components/CreerTrajet.vue";

export default {
  name: "Accueil",
  components: {
    CreerTrajet,
    MapTrajet,
  },
  Data() {
        return{}
    },
}
</script>

<style scoped>
#AccueilContainer{
    padding: 2%;
    background-color: white;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items:center;
    justify-content: space-between;
}
</style>