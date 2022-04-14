<template>
  <div class="container">
    <div class="header">
      <Header />
    </div>
    <nav id="navbar">
      <router-link @click="isAffiche = true" :to="{ name: 'Home' }">Accueil</router-link>
      <router-link @click="isAffiche = false" :to="{ name: 'Contact' }">Contact</router-link>
      <router-link @click="isAffiche =false" :to="{ name: 'Inscription' }" v-show="!isConnecte">
        Inscription
      </router-link>
      <router-link @click="isAffiche = false" :to="{ name: 'Connexion' }" v-show="!isConnecte">
        Connexion
      </router-link>
      <router-link @click="isAffiche = false" :to="{ name: 'Profil' }" v-show="!isConnecte"
        >Profil</router-link
      >
    </nav>
    <router-view />
      <div v-show="isAffiche" class="accueil">
        <Accueil />
      </div>
      <div class="foorter">
        <Footer />
      </div>
  </div>
</template>


<script>
import Accueil from "/src/components/Accueil.vue";
import Footer from "/src/components/Footer.vue";
import Header from "/src/components/Header.vue";
export default {
  name: "App",

  components: {
    Accueil,
    Footer,
    Header,
  },

  data() {
    return {
      isConnecte: "",
      villePos: "",
      villeDest: "",
      ville: [],
      isAffiche: true,
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
.accueil{
  margin: 2em;
}
</style>
