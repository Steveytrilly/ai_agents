import "./bootstrap";
import "flowbite";
import { createApp } from "vue";
import { createPinia } from "pinia";

import loginVue from "./components/Auth/login.vue";
import SideVue from "./components/Nav/Sidenav.vue";
import TopVue from "./components/Nav/Topnav.vue";
import AgentVue from "./components/Agents/Agent.vue";

const app = createApp({
    components: {
        loginVue,
        SideVue,
        TopVue,
        AgentVue,
    },
});

const pinia = createPinia();
app.use(pinia);
app.mount("#app");
