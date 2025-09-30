<template>
    <div
        class="backdrop hidden"
        @click.self="close_modal(['create'])"
        id="create"
    >
        <div class="modal flow">
            <span class="flex items-center justify-between">
                <h3 class="text-[26px]">Create AI Agent</h3>

                <button @click="close_modal(['create'])">
                    <img src="/assets/icons/x.svg" />
                </button>
            </span>

            <form action="" @submit.prevent="create">
                <div>
                    <label class="text-[15px] font-meduim">Agent Name *</label>
                    <input
                        v-model="agents.name"
                        type="text"
                        class="w-full border border-[#2F2F30] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        required
                    />
                </div>

                <div class="mt-3">
                    <label class="text-[15px] font-meduim">Category</label>
                    <select
                        class="text-[#9E9E9E] text-[15px] font-normal rounded-[14px] border border-[#2F2F30] focus:border-[#2F2F30] bg-transparent block w-full focus:outline-none focus:ring-0"
                    >
                        <option value="disabled">Choose a Category</option>
                        <option value="test1">Tes1</option>
                        <option value="test2">Tes2</option>
                    </select>
                </div>

                <div class="mt-3">
                    <label class="text-[15px] font-meduim"
                        >Agent Description (optional)</label
                    >
                    <textarea
                        v-model="agents.description"
                        class="w-full mt-2 resize-none h-[110px] border border-[#2F2F30] rounded-[14px] bg-transparent focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                    ></textarea>
                </div>

                <div class="w-full max-w-md space-y-2">
                    <!-- Label -->
                    <p class="text-sm font-medium text-white">Image</p>

                    <!-- Upload box -->
                    <label
                        for="file-upload"
                        class="flex items-center justify-between border border-[#2F2F30] rounded-[14px] p-3 cursor-pointer transition"
                    >
                        <!-- Left: Thumbnail + Filename -->
                        <div class="flex items-center gap-3">
                            <!-- Placeholder Thumbnail -->
                            <img
                                :src="previewImage || '/assets/icons/image.svg'"
                                alt="Preview"
                                class="w-12 h-12 rounded-lg object-cover bg-gray-700"
                            />
                            <span
                                class="text-gray-300 text-sm truncate max-w-[250px]"
                                >{{
                                    fileName || "Image file name shows here.jpg"
                                }}</span
                            >
                        </div>

                        <!-- Right: Delete Icon -->
                        <button @click="removeImage">
                            <img src="/assets/icons/delete.svg" />
                        </button>
                    </label>

                    <!-- Hidden file input -->
                    <input
                        id="file-upload"
                        type="file"
                        class="hidden"
                        accept="image/*"
                        @change="handleFileUpload"
                    />
                </div>

                <div class="flex flex-col items-end mt-5">
                    <Btn title="Save"></Btn>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { close_modal } from "../../utils/utils";
import Btn from "../Atoms/Button.vue";
import api from "../../lib/api_functions";
import { ref } from "vue";

const previewImage = ref("");
const fileName = ref("");
const backendImage = ref(""); // for image returned from backend

const agents = ref({
    name: "",
    description: "",
    // category: "",
    image: "",
});

const props = defineProps({
    agent: {
        type: Object,
    },
});

// const create = async () => {
//     const formData = new FormData();
//     formData.append("name", agents.value.name);
//     formData.append("description", agents.value.description);
//     // formData.append("category_id", agents.value.category);
//     if (fileInput.value) formData.append("agent_image", fileInput.value);
//     const res = await api.createAgent(formData);
//     if (res) {
//         console.log("Created agent:", res);
//         close_modal("create");
//     } else {
//         console.error("Failed to create agent");
//     }
// };

const create = async () => {
    const formData = new FormData();
    formData.append("name", agents.value.name);
    formData.append("description", agents.value.description);
    if (fileInput.value) formData.append("agent_image", fileInput.value);

    const res = await api.createAgent(formData);
    if (res && res.data) {
        props.agent();
        console.log("Created agent:", res);
        // set backend image URL
        backendImage.value = res.data.agent_image.replace(/^"|"$/g, "");
        close_modal("create");
    } else {
        console.error("Failed to create agent");
    }
};

const fileInput = ref(null);

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        fileInput.value = file; // store raw file
        fileName.value = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// function removeImage() {
//     previewImage.value = "";
//     fileName.value = "";
//     agents.value.image = "";
// }
</script>

<style scoped>
.flow {
    height: calc(100vh - 300px);
    overflow-y: scroll;
}

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
    width: 500px;
    background-color: #202123;
    border-radius: 14px;
    padding: 20px;
    border: 1px solid #2f2f30;
    box-shadow: 0px 16px 80px 0px rgba(0, 0, 0, 0.7),
        0px 30px 20px -30px rgba(0, 0, 0, 0.25);
}
</style>
