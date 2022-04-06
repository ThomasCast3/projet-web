import { createRouter, createWebHistory} from "vue-router";
import Inscription from "../views/Inscription.vue";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/Inscription",
        name: "Inscription",
        component: Inscription
    }

];


const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;