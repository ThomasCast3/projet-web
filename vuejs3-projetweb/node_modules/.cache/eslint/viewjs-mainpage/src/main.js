import { createApp } from "vue";
import App from ".cache/eslint/viewjs-mainpage/src/App.vue";
import router from ".cache/eslint/viewjs-mainpage/src/router";


export function useGeolocation(){

return{};
} 

const app = createApp(App);
app.use(router);
app.mount("#app");
