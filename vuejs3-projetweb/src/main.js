import { createApp } from "vue";
import router from "./router";
import App from "./App.vue";
import Inscription from "./views/Inscription.vue";


const app = createApp(App);


app.Inscription = ("Inscriptions", Inscription);
app.use(router);
app.mount("#app");
