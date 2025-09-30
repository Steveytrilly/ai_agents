<template>
    <img src="/assets/icons/logo.svg" class="mx-auto mt-3" />

    <ul class="flex flex-col items-center mt-6 space-y-5">
        <li class="relative group">
            <a
                class="flex items-center justify-center"
                href="/dashboard"
                v-html="
                    icon.dashboard(
                        35,
                        35,
                        funct.getPath() == 'dashboard' ? '#705CF6' : '#575566'
                    )
                "
            >
            </a>

            <span
                class="text-[10px] text-white font-bold hidden justify-center group-hover:flex"
                >Dashboard</span
            >
        </li>

        <li class="relative group">
            <a
                class="flex items-center justify-center"
                href="/dashboard/agents"
                v-html="
                    icon.client(
                        35,
                        35,
                        funct.getPath() == 'agents' ? '#705CF6' : '#575566'
                    )
                "
            >
            </a>

            <span
                class="text-[10px] text-white font-bold hidden justify-center group-hover:flex"
                >Agents</span
            >
        </li>
    </ul>
</template>

<script setup>
import { ref } from "vue";
import { funct } from "../../utils/funct";
import { icons } from "../../utils/icon";

let icon = new icons();

const currentPath = ref(window.location.pathname);

const isActive = (path) => currentPath.value.startsWith(path);
</script>
