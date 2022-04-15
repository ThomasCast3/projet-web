<template>
  <div id="headerContainer">
    <h1 id="nomSite">SnStation</h1>
    <img id="bus" :src="imgBus">
  </div>
</template>

<script>
export default {
  name: "HeaderPage",
  data() {
    return {
        imgBus: "autobus.png",
    };
  },
};
</script>

<style scoped>
#headerContainer {
  background-color: #76a0c7;
  color: white;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
}
#nomSite {
  margin-block-start: 0;
  margin-block-end: 0;
  display: inline;
  padding: 2%;
}
#bus{
    width: 10%;
    height: 10%;
}
</style>