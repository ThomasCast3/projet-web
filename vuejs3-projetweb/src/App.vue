<template>
<div>
  <div class="container">
    <nav id="navbar">
      <router-link :to="{ name: 'Home' }">Accueil</router-link>
      <router-link :to="{ name: 'Contact' }">Contact</router-link>
      <router-link :to="{ name: 'Inscription' }" v-show="!isConnecte">
        Inscription
      </router-link>
      <router-link :to="{ name: 'Connexion' }" v-show="!isConnecte">
        Connexion
      </router-link>
      <router-link :to="{ name: 'Profil' }" v-show="isConnecte">Profil</router-link>
    </nav>
    <router-view />
  </div>
  <div>
      <Accueil />
    <Footer />
  </div>
  </div>
</template>


<script>
import Footer from "/src/assets/components/Footer.vue";
import Accueil from "./assets/components/Accueil.vue";
export default {
  name: "App",
    components: {
    Footer,
    Accueil,
  },
  data() {
    return {
      isConnecte: "",
    };
  },
  methods: {
    displayPage() {
      console.log(this.isConnecte);
      if (
        localStorage.getItem("isConnected") === null ||
        localStorage.getItem("isConnected") === "false"
      ) {
        this.isConnecte = false;
        console.log(this.isConnecte);
      } else {
        this.isConnecte = true;
        console.log(this.isConnecte);
      }
    },
    created: function () {
      this.displayPage();
    },
  },
};
</script>

<style >
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100&display=swap");
html,
body {
  font-family: "Poppins", sans-serif;
  height: 100%;
  margin: 0;
}
#navbar {
  background-color: #5c9ad4;
  padding: 1em;
  text-align: center;
}
#navbar a {
  padding: 0.75em;
  text-decoration: none;
  color: #333;
}
#navbar a:hover {
  color: #fff;
  background-color: #b2d3f2;
}
</style>
