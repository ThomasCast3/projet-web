<template>
  <div class="field">
    <div class="control">
      <label class="label">Prénom</label>
      <input
        class="textarea"
        placeholder="Prénom"
        v-model="this.form.firstName"
      >
      <label class="label">Nom</label>
      <input
        class="textarea"
        placeholder="Nom"
        v-model="this.form.lastName"
      >
      <label class="label">Mail</label>
      <input
        class="textarea"
        placeholder="Email"
        v-model="this.form.mail"
      >
      <label class="label">Mot de passe</label>
      <input
        type="password"
        class="textarea"
        placeholder="Mot de passe"
        v-model="this.form.mdp"
      >
      <button @click="registerUser()" type="submit" class="btn">Envoyer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "InscriptionPage",
  components: {},
  data() {
    return {
      form: {
        firstName: "",
        lastName: "",
        mdp: "",
        mail: "",
      },
    };
  },

  methods: {
    registerUser() {
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open("POST", "http://10.57.29.14:8080/register", true);
      xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xmlHttpRequest.send(`email=${this.form.mail}&password=${this.form.mdp}&lastName=${this.form.lastName}&firstName=${this.form.firstName}`);
    //   xmlHttpRequest.onload = () => {
    //     this.data = JSON.parse(xmlHttpRequest.responseText);
    //   };
    },
  },

  computed: {},
};
</script>

<style scoped>
body {
  display: flex;
  flex-direction: column;
}
.field {
  text-align: center;
  align-content: center;
  border-radius: 1em;
  background-color: #e4e4e4d5;
  margin: 20px;
  padding: 20px;
}
.control {
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: whitesmoke;
}
.textarea {
  width: 50%;
  padding: 0.5em;
  margin: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  resize: none;
  overflow: hidden;
}
.btn {
  background-color: #5c9ad4;
  color: #fff;
  border: none;
  padding: 10px;
  border-radius: 1em;
  margin: 10px;
  cursor: pointer;
}
.btn:hover {
  transform: translateY(-5px);
}
.textarea:hover {
  border-bottom: 2px solid #272f40;
}
</style>