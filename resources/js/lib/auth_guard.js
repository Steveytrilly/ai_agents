import { useAuthStore } from "../stores/auth";

export async function checkDashboardAuth() {
    const auth = useAuthStore();
    const ok = await auth.checkAuth();

    if (window.location.pathname.startsWith("/dashboard")) {
        if (ok) {
            const wrap = document.getElementById("app-wrap");
            if (wrap) wrap.style.display = "block";
        } else {
            window.location.href = "/";
        }
    }
}
