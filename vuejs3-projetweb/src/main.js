import { createApp} from "vue";
import router from "./router";
import App from "./App.vue";
import Inscription from "./views/Inscription.vue";



const app = createApp(App);
console.log("appCreated")

if (app.config.globalProperties.$isConnected == undefined) {
app.config.globalProperties.$isConnected = false;
app.config.globalProperties.$user = [];
console.log(app.config.globalProperties.$isConnected)
console.log(app.config.globalProperties.$user)
}

app.Inscription = ("Inscriptions", Inscription);
app.use(router);
app.mount("#app");

