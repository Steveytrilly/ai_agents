import "./bootstrap";
import { createApp } from "vue";
import { createPinia } from "pinia";

import loginVue from "./components/Auth/login.vue";
import SideVue from "./components/Nav/Sidenav.vue";
import TopVue from "./components/Nav/Topnav.vue";

const app = createApp({
    components: {
        loginVue,
        SideVue,
        TopVue,
    },
});

const pinia = createPinia();
app.use(pinia);
app.mount("#app");
