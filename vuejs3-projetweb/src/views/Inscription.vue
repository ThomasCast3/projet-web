<template>
  <div class="field">
    <label class="label">Prenom</label>
    <div class="control">
      <textarea
        class="textarea"
        placeholder="First Name"
        v-model="form.firstName"
      ></textarea>
      <label class="label">Nom</label>
      <textarea
        class="textarea"
        placeholder="Last Name"
        v-model="form.lastName"
      ></textarea>
      <label class="label">Message</label>
      <textarea
        class="textarea"
        placeholder="Message"
        v-model="form.message"
      ></textarea>
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
        message: "",
        firstName: "",
        lastName: "",
      },
    };
  },

  methods: {},

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
  align-items: center;
  flex-direction: column;
}
.textarea {
  width: 50%;
  height: 100%;
  margin: 1rem;
  resize: none;
  overflow: hidden;
}
</style>