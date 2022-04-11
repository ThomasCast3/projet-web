<template>
  <div class="Informations">
    <h2>Vos informations</h2>
    <div class="Informations-item">
      <input
        type="text"
        class="Informations-Prenom"
        placeholder="Prénom"
        v-model="form.firstName"
      />
      {{ getUser() }}
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
        firstName: "",
        lastName: "",
        mdp: "",
        mail: "",
      },
    };
  },
  methods: {
    getUser() {
      const xmlHttpRequest = new XMLHttpRequest();
      xmlHttpRequest.open("GET", "http://10.57.29.14:8080/get-users", true);
      xmlHttpRequest.send();
      xmlHttpRequest.onload = () => {
        console.log(xmlHttpRequest.responseText);
        document.querySelector(".Informations").innerHTML +=
          xmlHttpRequest.responseText;
      };
    },
    // getUserName(){
    //     const xmlHttpRequest = new XMLHttpRequest();
    //     xmlHttpRequest.open("GET", "http://10.57.29.14:8080/get-users", true);
    //     xmlHttpRequest.send();
    //     xmlHttpRequest.onload = () => {

    //     let email = xmlHttpRequest.responseText;
    //     for (let user in email){
    //         console.log(user.email);
    //     }
    //   }
    //   return user.email ;
    // }
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
  margin: 1em;
}
</style>