<template>
  <div class="field">
    <div class="control">
      <label class="label">Prénom</label>
      <textarea
        class="textarea"
        placeholder="Prénom"
        v-model="form.firstName"
      ></textarea>
      <label class="label">Nom</label>
      <textarea
        class="textarea"
        placeholder="Nom"
        v-model="form.lastName"
      ></textarea>
      <label class="label">Mail</label>
      <textarea
        class="textarea"
        placeholder="Email"
        v-model="form.mail"
      ></textarea>
      <label class="label">Mot de passe</label>
      <textarea
        class="textarea"
        placeholder="Mot de passe"
        v-model="form.mdp"
      ></textarea>
      <button type="submit" class="btn">Envoyer</button>
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