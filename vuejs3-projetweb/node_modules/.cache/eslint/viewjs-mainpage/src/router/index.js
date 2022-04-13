import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
  },
  {
    path: "/contactPage",
    name: "contact",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
