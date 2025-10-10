import "./bootstrap";
import "flowbite";
import { createApp } from "vue";
import { createPinia } from "pinia";
import { checkDashboardAuth } from "./lib/auth_guard";
import loginVue from "./components/Auth/login.vue";
import SideVue from "./components/Nav/Sidenav.vue";
import TopVue from "./components/Nav/Topnav.vue";
import AgentVue from "./components/Agents/Agent.vue";
import BuilderVue from "./components/Builder/Builder.vue";
import DashboardVue from "./components/Dashboard.vue";
import { dialog } from "./utils/dialog";
import { useNotifyStore } from "./stores/notify";

window.dialog = dialog;

const app = createApp({
    components: {
        loginVue,
        SideVue,
        TopVue,
        AgentVue,
        BuilderVue,
        DashboardVue,
    },
});

const pinia = createPinia();
app.use(pinia);

// const auth = useAuthStore();
// auth.checkAuth().then((ok) => {
//     if (window.location.pathname.startsWith("/dashboard")) {
//         if (ok) {
//             // ✅ User authenticated → reveal dashboard
//             const wrap = document.getElementById("app-wrap");
//             if (wrap) wrap.style.display = "block";
//         } else {
//             // ❌ Not logged in → redirect to login
//             window.location.href = "/";
//         }
//     }
// });

checkDashboardAuth();
let notify = useNotifyStore();
window.notify = notify;

app.mount("#app");
