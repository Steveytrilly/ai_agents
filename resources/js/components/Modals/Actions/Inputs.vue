<template>
    <div class="backdrop">
        <div class="modal">
            <button
                @click="emit('back')"
                class="text-white mb-4 px-4 py-2 bg-gray-700 rounded-lg"
            >
                ← Back
            </button>
            <div v-if="formType === 'get-user-input'">
                <h2 class="text-xl font-semibold mb-2">Get User Input</h2>
                <input
                    type="text"
                    placeholder="Enter text"
                    class="w-full p-2 rounded bg-gray-800 text-white"
                />
            </div>

            <div v-if="formType === 'get-user-list'">
                <h2 class="text-xl font-semibold mb-2">Get User List</h2>
                <textarea
                    placeholder="Enter multiple values"
                    class="w-full p-2 rounded bg-gray-800 text-white"
                ></textarea>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    formType: String, // e.g. 'get-user-input' | 'get-user-list' | ...
});
const emit = defineEmits(["back"]);
</script>

<style scoped>
.backdrop {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: #1a1a1a5a;
    z-index: 100;
}

.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 896px;
    background-color: #202123;
    border-radius: 14px;
    padding: 20px;
    border: 1px solid #2f2f30;
    box-shadow: 0px 16px 80px 0px rgba(0, 0, 0, 0.7),
        0px 30px 20px -30px rgba(0, 0, 0, 0.25);
}
</style>
