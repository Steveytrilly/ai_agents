<template>
    <button
        class="flex justify-center px-8 py-2 text-base border-0 font-medium rounded-lg cursor-pointer text-input"
        :class="
            loading || button
                ? 'bg-[#705CF6] text-white hover:text-white hover:bg-hover'
                : 'bg-[#705CF6] text-dots'
        "
        :disabled="loading"
    >
        {{ title }}
        <span
            v-if="loading"
            class="text-black"
            v-html="icon.loader(28, 28, '#fff')"
        />
    </button>
</template>

<script setup>
import { icons } from "../../utils/icon.js";

let icon = new icons();

defineProps({
    value: {
        type: String,
        default: "",
    },
    title: [String, NodeList],
    loading: Boolean,
    button: Boolean,
});
</script>

<style scoped></style>
