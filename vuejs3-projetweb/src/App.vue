<template>
<div class="container">
  <nav id=navbar>
    <router-link :to="{name: 'Home'}">Home</router-link>
    <router-link to="/Contact">Contact</router-link>
    <router-link :to="{name: 'Inscription'}">Inscription</router-link>
    <router-link to="/" >Connexion</router-link>
  </nav>
  <router-view />
</div>
</template>

<script>
// import Inscription from "./views/Inscription.vue";

export default {
  name: 'App',
  data() {
    return{};
  }
}
</script>

<style >
html,body{
  height: 100%;
  margin:0;
}
  #navbar {
    background-color: #76a0c7;
    padding: 20px;
    text-align: center;
  }
  #navbar a {
    padding: 10px;
    text-decoration: none;
    color: #333;
  }
</style>
