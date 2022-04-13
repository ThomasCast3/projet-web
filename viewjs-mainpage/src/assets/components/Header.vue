<template>
    <div id="headerContainer">
        <h1 id="nomSite">Mon site web</h1>
    </div>
</template>

<script>
export default ({
    name: "Header",
    data() {
        return{}  
    },
})
</script>

<style scoped>
    #headerContainer{
        background-color: #76a0c7;
        color: white;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    #nomSite{
        margin-block-start: 0;
        margin-block-end: 0;
        display: inline;
        padding: 2%;
    }
</style>