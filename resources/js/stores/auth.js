// stores/auth.js
import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    }),

    actions: {
        async login(credentials) {
            this.loading = true;
            this.error = null;

            console.log("Attempting login with:", credentials);

            try {
                const baseURL = `${window.location.origin}/api/v1`; // dynamic base URL
                console.log("API Base URL:", baseURL);

                const res = await axios.post(`${baseURL}/login`, credentials);

                console.log("✅ API Response:", res.data);

                if (!res.data.error) {
                    this.user = res.data.user;
                    this.token = res.data.token;

                    console.log("Logged-in user:", this.user);
                    console.log(" Token:", this.token);

                    localStorage.setItem("token", this.token);
                    axios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${this.token}`;

                    Swal.fire({
                        icon: "success",
                        title: "Welcome!",
                        text: res.data.message || "Login successful",
                        timer: 2000,
                        showConfirmButton: false,
                    });

                    if (res.data.redirect_to) {
                        console.log("➡️ Redirecting to:", res.data.redirect_to);
                        window.location.href = res.data.redirect_to;
                    }
                } else {
                    this.error = res.data.message;
                    console.error("API returned an error:", this.error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: this.error,
                    });
                }
            } catch (err) {
                this.error = err.response?.data?.message || "Login failed";
                console.error("🚨 Login failed:", err);

                Swal.fire({
                    icon: "error",
                    title: "Login Failed",
                    text: this.error,
                });
            } finally {
                this.loading = false;
                console.log("⏹️ Login request finished");
            }
        },

        logout() {
            console.log("👋 Logging out...");
            this.user = null;
            this.token = null;
            localStorage.removeItem("token");
            delete axios.defaults.headers.common["Authorization"];
            console.log("✅ Logged out and token cleared");
        },
    },
});
