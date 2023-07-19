import { createApp } from "vue";
import { createPinia } from "pinia";
import i18n from "@/utils/i18n";
import { VueQueryPlugin } from "vue-query";
import "mosha-vue-toastify/dist/style.css";

import App from "./App.vue";
import router from "@/router";

import "./assets/main.css";

const app = createApp(App);
app.use(i18n);
app.use(createPinia());
app.use(router);
app.use(VueQueryPlugin);

app.mount("#app");
