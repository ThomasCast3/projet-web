<template>
    <div id="TrajetContainer">
        <button id="btnCreerTrajet" v-on:click="afficherbtn = fasle" v-show="afficherbtn" >Nouveau Trajet</button>
        <div v-show="!afficherbtn">
            <form id="formTrajet" action="">
               
                <label for="position">Position :</label>
                <input @input="ville=villePos, villeList = affichVille(ville)" type="texte" name="position" v-model="villePos">
                <div id="suggestionVille">
                    <ul>
                        <li v-for="ville in villeList" v-bind:key="ville">{{ville}}</li>
                    </ul>
                </div>
                <label for="destination">Déstination :</label>
                <input type="texte" name="destination">
            
                <div id="checkboxContainer">
                <div>
                    <img class="vehicule" :src="imgBus" alt="logo bus">
                    <input type="radio" id="transport1" name="transport" value="bus">
                </div>
                  <div>
                    <img class="vehicule" :src="imgTrain" alt="logo bus">
                    <input type="radio" id="transport2" name="transport" value="train">
                </div>
                </div>
                <input type="submit" value="submit">
            </form>
        </div>
    </div>
</template>

<script>


export default ({
    name:"CreerTrajet",
  
    data() {
        return{
            afficherbtn: true,
            imgBus: "autobus.png",
            imgTrain: "train.png",
            villePos:"",
            villeList:[],
        }
    },
    methods:{
        affichVille(value){
          fetch(`https://geo.api.gouv.fr/communes?nom=${value}&fields=departement&boost=population`).then
          (response => response.json().then((data) => { 
                for(let ville of data){
                       villeList.push(ville.nom);
                }
              return villeList;
          }));
        },
    }
});
</script>


<style scoped>
#btnCreerTrajet{
    background-color: #76a0c7;
    border-color: #557899;
    color: white;
    border-radius: 45%;
    padding-top: 1%;
    padding-bottom: 1%;
    padding-left: 2% ;
    padding-right: 2% ;
}
#formTrajet{
    display: flex;
    flex-wrap: wrap;
    flex-direction:column;
    justify-content: center;
}
#checkboxContainer{
    display: flex;
    flex-direction: row;
    align-content: center;
    flex-wrap: wrap;
}
#TrajetContainer{
    width: 40%;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-items: center;
}
.vehicule{
    max-width: 15px;
    max-height: 15px;
}
</style>