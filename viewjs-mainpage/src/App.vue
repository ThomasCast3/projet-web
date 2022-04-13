<template>
  <div>
    <Header />
    <Accueil />
    <Footer />
  </div>
</template>

<script>
import Header from "/src/assets/components/Header.vue";
import Footer from "/src/assets/components/Footer.vue";
import Accueil from "./assets/components/Accueil.vue";

export default {
  name: "App",
  components: {
    Header,
    Footer,
    Accueil,
  },

  data() {
    return {};
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");
body {
  font-family: "Poppins", sans-serif;
  margin: 0;
}
</style>
