<template>
  <div class="field">
    <div class="control">
      <label class="label">Votre mail</label>
      <input class="textarea" placeholder="Email" v-model="this.form.mail" />
      <label class="label">Votre mot de passe</label>
      <input
        type="password"
        class="textarea"
        placeholder="Mot de passe"
        v-model="this.form.mdp"
      />
      <button @click="connectUser()" type="submit" class="btn">Envoyer</button>
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
        mail: "",
        mdp: "",
      },
    };
  },

  methods: {
    connectUser() {
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open("POST", "http://10.57.29.14:8080/login", true);
      xmlHttpRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      xmlHttpRequest.send(`email=${this.form.mail}&password=${this.form.mdp}`);
      xmlHttpRequest.onload = () => {
        if (xmlHttpRequest.status !== 200) return;

        localStorage.setItem("isConnected", true);
        localStorage.setItem("user", xmlHttpRequest.responseText);
        window.location = "./"
      };
      if(xmlHttpRequest.responseText("role") === "admin"){
        localStorage.setItem("isAdmin", true);
        console.log(this.$isAdmin);
      }
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
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  background-color: whitesmoke;
  padding: 10px;
  border-radius: 15px;
  box-sizing: border-box;
  box-shadow: 0px 10px 50px -10px white;
}
.textarea {
  width: 50%;
  padding: 0.5em;
  margin: 1rem;
  resize: none;
  border-radius: 0.5rem;
  overflow: hidden;
  text-align: center;
  border: gray solid;
}
.btn {
  background-color: #76a0c7;
  color: #fff;
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