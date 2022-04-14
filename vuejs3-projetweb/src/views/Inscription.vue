<template>
  <div class="field">
    <div class="control">
      <label class="label">Prénom</label>
      <input @keyup="hasSpecialChars" @keydown="hasIntegers"
        class="textarea"
        placeholder="Prénom"
        v-model="this.form.firstName"
        required
      >
      <label class="label">Nom</label>
      <input
        class="textarea" @keyup="hasSpecialChars" @keydown="hasIntegers"
        placeholder="Nom"
        v-model="this.form.lastName"
        required
      >
      <label class="label">Mail</label>
      <input @keyup="hasSpecialChars"
        class="textarea"
        placeholder="Email"
        v-model="this.form.mail"
        required

      >
      <label class="label">Mot de passe</label>
      <input
        type="password"
        class="textarea"
        placeholder="Mot de passe"
        v-model="this.form.mdp"
        required
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
      hasSpecialChars: false,
      hasNumbers: false,
    };
  },

  methods: {
    registerUser() {
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open("POST", "http://10.57.29.14:8080/register", true);
      xmlHttpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      if( this.hasSpecialChars){
        alert("Votre nom ou prénom ou mail ne doit pas contenir de caractères spéciaux");
        return;
      }
      else if(this.hasNumbers){
        alert("Votre nom ou prénom ne doit pas contenir de chiffres");
        return;
      }
      xmlHttpRequest.send(`email=${this.form.mail}&password=${this.form.mdp}&lastName=${this.form.lastName}&firstName=${this.form.firstName}`);
    },
    hasSpecialChar(){
      var specialChar =/[~`!#$%^&*+=\-[\]\\';,/{}|\\":<>?]/;
      if(specialChar.test(this.form.lastName) || specialChar.test(this.form.firstName) || specialChar.test(this.form.mail)){
        this.hasSpecialChar = true;
        console.log("this.hasSpecialChar");
        return this.hasSpecialChars;

      }
    },
    hasIntegers(){
      var integers =/[0-9]/;
      if(integers.test(this.form.lastName) || integers.test(this.form.firstName)){
        this.hasNumbers = true;
        console.log("this.hasNumbers");
        return this.hasNumbers;
      }
    }

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