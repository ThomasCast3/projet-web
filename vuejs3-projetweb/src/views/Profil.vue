<template>
  <div class="container">
    <div v-show="isConnected" class="Connecte">
      <div class="dashboard-header">
        <div class="dashboard-header-title">
          <h1>Dashboard</h1>
        </div>
      </div>
      <div class="dashboard">
        <div class="dashboard-left">
          <div class="dashboard-navbar">
            <div class="dashboard-navbar-title">
              <h2>Mon Dashboard</h2>
            </div>
            <div class="dashboard-navbar-infos">
              <div class="dashboard-navbar-infos-item">
                <div class="dashboard-navbar-infos-item-title">
                  <h3>Informations</h3>
                </div>
              </div>
              <div class="dashboard-navbar-infos-item">
                <div class="dashboard-navbar-infos-item-title">
                  <h3>Notifications</h3>
                </div>
              </div>
              <div class="dashboard-navbar-infos-item">
                <div class="dashboard-navbar-infos-item-title">
                  <h3>Mes trajets</h3>
                </div>
              </div>
              <div class="dashboard-navbar-infos-item">
                <div class="dashboard-navbar-delete">
                  <h3>Deconnexion</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dashboard-right">
          <div class="informations">
            <Info />
          </div>
        </div>
      </div>
    </div>
    <div v-show="!isConnected" class="pasConnecte">
      <strong>PAS CONNECTE</strong>
    </div>
  </div>
</template>




<script>
import Info from "/src/components/ProfilInfo.vue";
export default {
  name: "profilePage",
  components: {
    Info,
  },
  data() {
    return {
      isConnected: true,
    };
  },
  methods: {

  },
  computed: {},
};
</script>




<style scoped>
.dashboard {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.dashboard-left {
  width: 20%;
}
.dashboard-right {
    width: 60%;
}
.dashboard-header-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}
.dashboard-navbar {
  background-color: #eeeeee;
  text-align: left;
  padding: 1em;
  border-radius: 1em;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.75);
}
.dashboard-navbar-infos {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  align-content: center;
}
.dashboard-content {
  background-color: #cbcbcb;
  text-align: left;
}

.dashboard-navbar-delete:hover {
  background-color: rgb(225, 65, 65);
  border: none;
  border-radius: 1em;
  padding-left: 1em;
  padding-right: 1em;
  cursor: pointer;
  color: white;
}
.dashboard-navbar-infos-item-title:hover {
  background-color: #5c9ad4;
  border: none;
  border-radius: 1em;
  padding-left: 1em;
  padding-right: 1em;
  cursor: pointer;
  color: white;
}
</style>