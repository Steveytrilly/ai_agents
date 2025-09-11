import "./bootstrap";
import { createApp } from "vue";

import loginVue from "./components/Auth/login.vue";
import Sidevue from "./components/Nav/Sidenav.vue";
import TopVue from "./components/Nav/Topnav.vue";

const app = createApp({
    components: {
        loginVue,
        Sidevue,
        TopVue,
    },
});

app.mount("#app");
