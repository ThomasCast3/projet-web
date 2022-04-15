<template>
  <div class="Informations">
    <h2>Vos informations</h2>

    <div class="Informations-item">
      <input
        type="input"
        class="Informations-prenom"
        placeholder="Prénom"
        v-model="form.firstName"
        required
      />
      <input
        type="input"
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
      <button @click="userUpdate()" type="submit" class="Informations-btn">
        Sauvegarder
      </button>
      <button @click="deleteUser()" type="submit" class="Informations-btn">
        Supprimer mon compte
      </button>
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
        firstName: "Louis",
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
      if (
        localStorage.getItem("isConnected") === null ||
        localStorage.getItem("isConnected") === "false"
      ) {
        window.location = "/Connexion";
      }
      var userData = JSON.parse(localStorage.getItem("user"));
      console.log(userData);
      this.form.id = userData["id"];
      this.form.firstName = userData["firstName"];
      this.form.lastName = userData["lastName"];
      this.form.mail = userData["email"];
      return;
    },

    userUpdate() {
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open(
        "PUT",
        "http://10.57.29.14:8080/update-account",
        true
      );
      xmlHttpRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      xmlHttpRequest.send(
        `id=${this.form.id}&firstName=${this.form.firstName}&lastName=${this.form.lastName}&email=${this.form.mail}`
      );
      var userData = JSON.parse(localStorage.getItem("user"));
      userData["firstName"] = this.form.firstName;
      userData["lastName"] = this.form.lastName;
      userData["email"] = this.form.mail;
      localStorage.setItem("user", JSON.stringify(userData));
      window.location = "/Profil";
    },

    deleteUser() {
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open(
        "DELETE",
        "http://10.57.29.14:8080/delete-account",
        true
      );
      xmlHttpRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      xmlHttpRequest.send(`id=${this.form.id}`);
      localStorage.setItem("isConnected", false);
      localStorage.removeItem("user");
      window.location = "/Inscription";
    },

    
    getUser() {
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open("GET", "http://10.57.29.14:8080/users", true);
      xmlHttpRequest.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );

    },
  },
  created: function () {
    this.getUserInfo();
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