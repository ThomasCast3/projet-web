<template>
  <div class="Informations">
    <h2>Vos informations</h2>
    <!-- {{ getUserInfo() }} -->
    {{ getConsole() }}

    <div class="Informations-item">
      <input
        type="textarea"
        class="Informations-prenom"
        placeholder="Prénom"
        v-model="form.firstaName"
        required
      />
      <input
        type="textarea"
        class="Informations-nom"
        placeholder="Nom"
        v-model="form.lastName"
        required
      />
      <input
        type="mail"
        class="Informations-mail"
        placeholder="Email"
        v-model="form.mail"
        required
      />
      <router-link :to="{ name: 'ChangerMotDePasse' }"
        >ChangerMotDePasse</router-link
      >
      <button type="submit" class="Informations-btn">Sauvegarder</button>
      <!-- {{ getUserName() }} -->
    </div>
  </div>
</template>

<script>
export default {
  name: "infoPage",
  components: {},
  data() {
    return {
      form: {
        id: "",
        firstName: "",
        lastName: "",
        mdp: "",
        mail: "",
      },
      user: "",
    };
  },
  methods: {
    // getUserName() {
    //   const xmlHttpRequest = new XMLHttpRequest();
    //   xmlHttpRequest.open("GET", "http://10.57.29.14:8080/users", true);
    //   xmlHttpRequest.send();
    //   xmlHttpRequest.onload = () => {
    //     for (let user of this.data) {
    //       console.log(user.email);
    //       this.form.firstName = user.email;
    //     }
    //   };
    // },
    getUserInfo() {

        const xmlHttpRequest = new XMLHttpRequest();
        xmlHttpRequest.open("POST", "http://10.57.29.14:8080/login", true);
        xmlHttpRequest.setRequestHeader(
          "Content-Type",
          "application/x-www-form-urlencoded"
        );
        xmlHttpRequest.send(
          `email=${this.form.mail}&password=${this.form.mdp}`
        );
        xmlHttpRequest.onload = () => {
          if (xmlHttpRequest.status === 200) {
            this.data = JSON.parse(xmlHttpRequest.responseText);
            this.form.id = this.data["id"];
            this.form.firstName = this.data["firstName"];
            this.form.lastName = this.data["lastName"];
            this.form.email = this.data["email"];
          }
        };
    },

    getConsole() {
      console.log(this.form.id);
      console.log(this.$isConnected)
    },
  },
  computed: {},
};
</script>

<style scoped>
.Informations {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
  background-color: #eeeeee;
  padding: 1em;
  border-radius: 1em;
  margin: 1rem;
}
.Informations-item {
  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  width: 70%;
}
.Informations-item input {
  margin: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  resize: none;
  overflow: hidden;
  padding: 0.5rem;
  width: 100%;
}
.Informations-item input:hover {
  border-bottom: 2px solid #272f40;
}
.Informations-btn {
  background-color: #76a0c7;
  color: #fff;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 1em;
  margin: 10px;
  align-content: center;
}
</style>