<template>
  <div id="searchTraj">
    <button
      id="btnCreerTrajet"
      v-on:click="afficherbtn = false"
      v-show="afficherbtn"
    >
      Nouveau Trajet
    </button>
    <div v-show="!afficherbtn">
      <div id="formTrajet">
        <label for="position">Position :</label>
        <input
          @input="affichVille(villePos)"
          type="search"
          placeholder="Search"
          name="positionode"
          v-model="villePos"
          list="datalist"
        />
        <!--, afficherlog(villeList)-->
        <datalist id="datalist"> </datalist>
        <label for="destination">Déstination :</label>
        <input
          @input="affichVille(villeDest)"
          type="search"
          placeholder="Search"
          name="positionode"
          v-model="villeDest"
          list="datalist"
        />
        <datalist id="datalist"> </datalist>
        <div id="checkboxContainer">
          <div>
            <img class="vehicule" :src="imgBus" alt="logo bus" />
            <input type="radio" id="transport1" name="transport" value="bus" />
          </div>
          <div>
            <img class="vehicule" :src="imgTrain" alt="logo bus" />
            <input
              type="radio"
              id="transport2"
              name="transport"
              value="train"
            />
          </div>
        </div>
        <button @click="creerMarker()" id="Rechercher">Rechercher</button>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  name: "AccueilPage",
  component:{},
  data() {
    return {
      affichebtn: true,
      imgBus: "autobus.png",
      imgTrain: "train.png",
      villePos: "",
      villeDest: "",
      ville: [],
    };
  },
  methods: {
    affichVille(value) {
      const datalist = document.getElementById(`datalist`);
      datalist.innerHTML = "";
      fetch(
        `https://geo.api.gouv.fr/communes?nom=${value}&fields=code,nom,centre`
      ).then((response) =>
        response.json().then((data) => {
          for (let ville of data) {
            var optionBlock = document.createElement("option");
            datalist.appendChild(optionBlock);
            optionBlock.setAttribute("key", `${ville.nom}`);
            optionBlock.setAttribute("value", `${ville.nom}`);
          }
        })
      );
    },
  },
};
</script> 

<style scoped>
#btnCreerTrajet {
  background-color: #76a0c7;
  border-color: #557899;
  color: white;
  border-radius: 45%;
  padding-top: 1%;
  padding-bottom: 1%;
  padding-left: 2%;
  padding-right: 2%;
}
#formTrajet {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;
}
#checkboxContainer {
  display: flex;
  flex-direction: row;
  align-content: center;
  flex-wrap: wrap;
}

.vehicule {
  max-width: 15px;
  max-height: 15px;
}
#searchTraj{
    width: 40%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}
#Rechercher{
    background-color: #76a0c7;
    border-color: #557899;
    color: white;
    padding-top: 1%;
    padding-bottom: 1%;
    padding-left: 2%;
    padding-right: 2%;
}
</style>