<template>
    <!-- Login Page -->
    <div class="grid items-center h-screen">
        <section class="flex max-[973px]:flex-col max-[973px]:-mt-8">
            <!-- Form here -->
            <form
                class="top-0 flex items-center flex-1 h-screen ml-2 max lg:sticky"
                @submit.prevent="handleLogin"
            >
                <div class="w-full responsive">
                    <h2
                        class="text-4xl max-[973px]:text-[28px] font-bold max-[973px]:font-normal text-center mt-0 text-white max-[973px]:text-left"
                    >
                        Login
                    </h2>

                    <div class="flex flex-col">
                        <div class="flex flex-col">
                            <label
                                for="Email"
                                class="font-semibold max-[973px]:font-light text-white text-md"
                                >Email</label
                            >
                            <input
                                type="email"
                                v-model="email"
                                id="email"
                                name="email"
                                placeholder="Your email address"
                                class="px-5 py-4 mt-2 text-white bg-transparent border border-solid cursor-pointer focus:ring-0 focus:outline-none focus:border-bordercolor border-bordercolor rounded-2xl text-md"
                                required
                            />
                        </div>

                        <div class="flex flex-col relative max-[973px]:-mt-7">
                            <label
                                for="password"
                                id="password"
                                class="block mt-10 font-semibold max-[973px]:font-light text-white text-md"
                                >Password</label
                            >
                            <input
                                v-model="password"
                                name="password"
                                placeholder="Enter your password"
                                class="py-4 pl-5 mt-2 text-white bg-transparent border-solid cursor-pointer pr-9 focus:ring-0 focus:outline-none focus:border-bordercolor border-bordercolor rounded-2xl text-md"
                                required
                            />
                            <span
                                class="cursor-pointer absolute right-3 top-[82px]"
                            >
                                <!-- <i
                                    v-if="showPassword"
                                    class="text-white fas fa-eye-slash"
                                ></i>
                                <i v-else class="text-white fas fa-eye"></i> -->
                            </span>
                        </div>
                    </div>

                    <div class="flex justify-between mt-4">
                        <div>
                            <input
                                checked
                                id="purple-checkbox"
                                type="checkbox"
                                value=""
                                class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label class="font-normal text-white text-md pr-7"
                                >Remember me</label
                            >
                        </div>

                        <div>
                            <a
                                href="/recover-password"
                                class="font-normal no-underline text-link text-md"
                                >Forgot Password?</a
                            >
                        </div>
                    </div>

                    <!-- <button
                        class="w-full px-5 py-3 mt-7 bg-[#705CF6] rounded-[14px]"
                    >
                        Log In
                    </button> -->

                    <button
                        type="submit"
                        :disabled="auth.loading"
                        class="w-full !py-3 bg-[#705CF6] rounded-[14px] mt-10"
                    >
                        {{ auth.loading ? "Logging in..." : "Login" }}
                    </button>

                    <!-- <p v-if="auth.error" class="text-red-500 text-sm mt-2">
                        {{ auth.error }}
                    </p> -->
                </div>
            </form>

            <div class="border-right"></div>
            <!-- Gif here -->
            <div
                class="flex-1 max-[973px]:hidden flex justify-center items-center"
            >
                <div class="flex flex-col items-center w-[100%]">
                    <div class="w-[100%]">
                        <div class="flex justify-center w-[100%]">
                            <img src="/public/assets/icons/Gig.svg" />
                            <!-- <img
                                src="/assets/images/login_with_text3.svg"
                                class="max-[1890px]:w-[400px] w-[320px] max-[973px]:hidden min-[1900px]:w-[600px]"
                                style="width: 100%; height: 94vh"
                            /> -->
                        </div>

                        <div class="flex flex-col gap-1 mt-8">
                            <h1
                                class="text-link text-4xl text-center font-bold max-[535px]:text-3xl m-0"
                            >
                                <span class="gradient-text">AI AGENT</span>
                            </h1>
                            <p
                                class="text-white text-center text-xl mt-3 max-[535px]:text-md px-4"
                            >
                                Your AI-powered Agent Builder
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../stores/auth";

const email = ref("");
const password = ref("");
const auth = useAuthStore();

const handleLogin = async () => {
    // console.log("🔍 Submitting login form...");
    await auth.login({ email: email.value, password: password.value });
};
</script>

<style scoped>
.border-right {
    border-right: 1px solid #232324;
    margin-left: 3rem;
}

.gradient-text {
    background-image: var(
        --budd-color-purple-pink,
        linear-gradient(138deg, #705cf6 15.96%, #ec4899 166.51%)
    );
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}
/* .bg {
    background: var(--Background, #151517);
    border: 1px solid var(--budd-color-border-dark, #2f2f30);
} */

/* Checkbox style */
#purple-checkbox:checked + label::before {
    background-color: #705cf6;
}
.st {
    position: absolute;
    margin-left: 21rem;
    margin-top: 23.4rem;
}
.btn {
    border-radius: 14px;
    background: var(--budd-color-primary, #705cf6);
    cursor: pointer;
    transition: color 0.3s ease;
    color: var(--generic-white, #fff);
    text-align: center;
    font-family: Nunito;
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.btn:hover {
    background-color: #5e4dcf;
}
.max {
    max-width: 500px;
    padding: 0 4rem;
    box-sizing: border-box;
}
.outline-0:focus {
    outline: none;
}
/* .image {
    width: 500px;
    height: 500px;
} */
/* .bg {
    background: var(--Background, #151517);
    border: 1px solid var(--budd-color-border-dark, #2f2f30);
} */

/* Styles for screens up to 940px */
@media screen and (max-width: 973px) {
    .max {
        width: 100%;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
        padding: 0 1rem;
        /* margin-top: 3rem; */
    }

    .responsive {
        max-width: 600px;
        margin-left: auto;
        margin-right: auto;
        /* height: 700px; */
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
    }
    .st {
        position: absolute;
        margin-left: 25rem;
        margin-top: 28.4rem;
    }
    /* .bg {
        background: var(--Background, #151517);
        border: 1px solid var(--budd-color-border-dark, #2f2f30);
    } */
}

/* Styles for screens greater than 940px */
@media screen and (min-width: 1900px) {
    .max {
        width: 100%;
        max-width: 700px;
        padding: 0 3rem;
        margin: 0 auto;
    }

    /* .responsive {
        max-width: 450px;
        height: 200px;
        display: flex;
        flex-direction: column;
        margin: auto;
        margin-left: 11rem;
        margin-top: 12rem;
    } */
    .border-right {
        border-right: 1px solid #232324;
        /* margin-left: -24rem; */
    }
    .bg {
        background: var(--Background, #151517);
        border: 1px solid var(--budd-color-border-dark, #2f2f30);
    }

    /* .st {
        position: absolute;
        margin-left: 25rem;
        margin-top: 28.4rem;
    } */
}
@media screen and (max-width: 843px) {
    .st {
        display: none;
    }
}
</style>
