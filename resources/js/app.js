import "./bootstrap";
import { createApp } from "vue";

import loginVue from "./components/Auth/login.vue";
import Sidevue from "./components/Nav/Sidenav.vue";
import Topvue from "./components/Nav/Topnav.vue";

const app = createApp({
    components: {
        loginVue,
        Sidevue,
        Topvue,
    },
});

app.mount("#app");
