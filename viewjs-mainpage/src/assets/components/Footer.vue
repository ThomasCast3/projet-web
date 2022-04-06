<template>
    <div id="footerContainer">
        <div>
            <p>Nos colabos</p>
            <div class="colabContainers">
                <p id="txtColab">sncf</p>
                <img v-bind:src="imageSNFC" alt="logo sncf"/>
            </div>
            <div class="colabContainers">
                <p id="txtColab">ratp</p>
                 <img v-bind:src="imageRATP" alt="logo ratp"/>
            </div>
        </div>
    </div>
</template>

<script>
export default ({
    name: "Footer",
    data() {
        return{
            imageSNCF: "/src/assets/logo.sncf.png",
            imageRATP: "/src/assets/logo-ratp.jpeg"
        } 
    },
})
</script>

<style scoped>
    #footerContainer{
        background-color: #76a0c7;
        color: white;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }

    .colabContainers{
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
    }

</style>