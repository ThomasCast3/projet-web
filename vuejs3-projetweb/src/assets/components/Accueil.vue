<template>
  <div id="AccueilContainer">
    <MapTrajet />
  </div>
</template>

<script>
import MapTrajet from "/src/assets/components/MapTrajet.vue";

export default {
  name: "Accueil",
  components: {
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
}
</style>