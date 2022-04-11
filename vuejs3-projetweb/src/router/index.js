import { createRouter, createWebHistory } from "vue-router";
import Inscription from "../views/Inscription.vue";
import Home from "../views/Home.vue";
import Connexion from "../views/Connexion.vue";
import Contact from "../views/Contact.vue";
import Profil from "../views/Profil.vue";
import Users from "../views/Profil.vue";
import Notifications from "../components/ProfilNotif.vue";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Inscription",
    name: "Inscription",
    component: Inscription,
  },
  {
    path: "/Connexion",
    name: "Connexion",
    component: Connexion,
  },
  {
    path: "/Contact",
    name: "Contact",
    component: Contact,
  },
  {
    path: "/Profil",
    name: "Profil",
    component: Profil,
  },
  {
    path: "/Profil/:id",
    name: "Users",
    component: Users,
  },
  {
    path: "/Profil/Notifications",
    name: "Notifications",
    component: Notifications,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
