<template>
  <div id="AccueilContainer">
    <MapTrajet />
  </div>
</template>

<script>
import MapTrajet from "/src/components/MapTrajet.vue";

export default {
  name: "AccueilPage",
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