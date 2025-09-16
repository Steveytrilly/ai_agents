import { defineStore } from "pinia";
// import axios from "axios";
import api from "../lib/axios_global";
import Swal from "sweetalert2";

// export const useAuthStore = defineStore("auth", {
//     state: () => ({
//         user: null,
//         token: localStorage.getItem("token") || null,
//         loading: false,
//         error: null,
//     }),

//     actions: {
//         async login(credentials) {
//             this.loading = true;
//             this.error = null;

//             console.log("Attempting login with:", credentials);

//             try {
//                 const baseURL = `${window.location.origin}/api/v1`; // dynamic base URL
//                 console.log("API Base URL:", baseURL);

//                 const res = await axios.post(`${baseURL}/login`, credentials);

//                 console.log("✅ API Response:", res.data);

//                 if (!res.data.error) {
//                     this.user = res.data.user;
//                     // this.token = res.data.token;

//                     console.log("Logged-in user:", this.user);
//                     console.log(" Token:", this.token);

//                     localStorage.setItem("token", this.token);
//                     axios.defaults.headers.common[
//                         "Authorization"
//                     ] = `Bearer ${this.token}`;

//                     Swal.fire({
//                         icon: "success",
//                         title: "Welcome!",
//                         text: res.data.message || "Login successful",
//                         timer: 2000,
//                         showConfirmButton: false,
//                     });

//                     if (res.data.redirect_to) {
//                         console.log("➡️ Redirecting to:", res.data.redirect_to);
//                         window.location.href = res.data.redirect_to;
//                     }
//                 } else {
//                     this.error = res.data.message;
//                     console.error("API returned an error:", this.error);
//                     Swal.fire({
//                         icon: "error",
//                         title: "Oops...",
//                         text: this.error,
//                     });
//                 }
//             } catch (err) {
//                 this.error = err.response?.data?.message || "Login failed";
//                 console.error("🚨 Login failed:", err);

//                 Swal.fire({
//                     icon: "error",
//                     title: "Login Failed",
//                     text: this.error,
//                 });
//             } finally {
//                 this.loading = false;
//                 console.log("⏹️ Login request finished");
//             }
//         },

//         logout() {
//             console.log("👋 Logging out...");
//             this.user = null;
//             this.token = null;
//             localStorage.removeItem("token");
//             delete axios.defaults.headers.common["Authorization"];
//             console.log("✅ Logged out and token cleared");
//         },
//     },
// });

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    }),

    actions: {
        // 🔹 LOGIN ACTION
        async login(credentials) {
            this.loading = true;
            this.error = null;

            try {
                const res = await api.post("/login", credentials);

                if (!res.data.error) {
                    // Save user and token
                    this.user = res.data.user;
                    this.token = res.data.token;
                    localStorage.setItem("token", this.token);

                    // Success alert
                    Swal.fire({
                        icon: "success",
                        title: "Welcome",
                        text:
                            res.data.message ||
                            "You have successfully logged in!",
                        timer: 1500,
                        showConfirmButton: false,
                    }).then(() => {
                        // Redirect after alert
                        if (res.data.redirect_to) {
                            window.location.href = res.data.redirect_to;
                        } else {
                            window.location.href = "/dashboard";
                        }
                    });
                } else {
                    this.error = res.data.message;

                    Swal.fire({
                        icon: "error",
                        title: "Login Failed",
                        text: this.error,
                    });
                }
            } catch (err) {
                this.error = err.response?.data?.message || "Login failed";

                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: this.error,
                });
            } finally {
                this.loading = false;
            }
        },

        // 🔹 LOGOUT ACTION
        logout() {
            this.user = null;
            this.token = null;
            localStorage.removeItem("token");

            Swal.fire({
                icon: "info",
                title: "Logged out",
                text: "You have been logged out.",
                timer: 1500,
                showConfirmButton: false,
            }).then(() => {
                window.location.href = "/login";
            });
        },
    },
});
