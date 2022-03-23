import { createApp } from "vue";
import App from "./App.vue";
import * as config from "../config.js";

const app = createApp(App);

app.config.globalProperties.$config = config;

app.mount("#app");
