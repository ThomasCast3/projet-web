<template>
    <div class="container">
        <router-link to="/">Home</router-link>
    </div>
</template>

<script>
export default {
  name: "HomePage",

  data() {
    return {};
  },

    methods: {},

    computed: {},
};

</script>

<style>
body {
    background-color: #f5f5f5;
}
.container {
  /* column center */
  display: flex;
  flex-direction: column;
}
</style>