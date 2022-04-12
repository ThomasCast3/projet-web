<template>
  <div class="container">
    <nav id="navbar">
      <router-link :to="{ name: 'Home' }">Accueil</router-link>
      <router-link :to="{ name: 'Contact' }">Contact</router-link>
      <router-link :to="{ name: 'Inscription' }" v-show="notConnecte">
        Inscription
      </router-link>
      <router-link :to="{ name: 'Connexion' }" v-show="notConnecte">
        Connexion
      </router-link>
      <router-link :to="{ name: 'Profil' }">Profil</router-link>
    </nav>
    <router-view />
  </div>
</template>


<script>
export default {
  name: "App",
  data() {
    return {
      notConnecte: true,
    };
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
