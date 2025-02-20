import { createApp } from "vue";
import "./global-style.css";
import App from "./App.vue";

import { createPinia } from "pinia";
import router from "./router";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";

import { useREM } from "./utils/flexible";

// 导入样式
import "vant/lib/index.css";

// 初始化 rem
useREM();

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount("#app");
