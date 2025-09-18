import "./bootstrap";
import "flowbite";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { useAuthStore } from "./stores/auth";

import loginVue from "./components/Auth/login.vue";
import SideVue from "./components/Nav/Sidenav.vue";
import TopVue from "./components/Nav/Topnav.vue";
import AgentVue from "./components/Agents/Agent.vue";
import BuilderVue from "./components/Builder/Builder.vue";

const app = createApp({
    components: {
        loginVue,
        SideVue,
        TopVue,
        AgentVue,
        BuilderVue,
    },
});

const pinia = createPinia();
app.use(pinia);

const auth = useAuthStore();
auth.checkAuth().then((ok) => {
    if (window.location.pathname.startsWith("/dashboard")) {
        if (ok) {
            // ✅ User authenticated → reveal dashboard
            const wrap = document.getElementById("app-wrap");
            if (wrap) wrap.style.display = "block";
        } else {
            // ❌ Not logged in → redirect to login
            window.location.href = "/";
        }
    }
});
app.mount("#app");
