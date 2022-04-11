<template>
  <div class="field">
    <div class="control">
      <label class="label">Votre mail</label>
      <textarea
        class="textarea"
        placeholder="Email"
        v-model="form.email"
      ></textarea>
      <label class="label">Votre mot de passe</label>
      <textarea
        class="textarea"
        placeholder="Mot de passe"
        v-model="form.mdp"
      ></textarea>
      <button type="submit" class="btn" >Envoyer</button>
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
        email: "",
        mdp: "",
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
  /* column center */
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
  margin: 1rem;
  resize: none;
  border-radius: 0.5rem;
  overflow: hidden;
  text-align: center;
  border:gray solid;
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