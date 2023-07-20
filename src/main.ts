import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";
import i18n from "@/utils/i18n";
import { VueQueryPlugin } from "vue-query";
import "mosha-vue-toastify/dist/style.css";

import App from "./App.vue";
import router from "@/router";

import "./assets/main.css";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

app.use(i18n);
app.use(pinia);
app.use(router);
app.use(VueQueryPlugin);

app.mount("#app");
