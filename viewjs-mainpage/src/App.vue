<template>
  <div>
    <Header/>
    <Accueil/>
    <Footer/>
  </div>
</template>

<script>
  import Header from "/src/assets/components/Header.vue";
  import Footer from "/src/assets/components/Footer.vue";
  import Accueil from './assets/components/Accueil.vue';

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
body{
  margin: 0;
}
</style>
