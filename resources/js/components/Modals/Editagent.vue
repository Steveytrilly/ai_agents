<template>
    <div
        class="backdrop hidden"
        @click.self="close_modal([modalId])"
        :id="modalId"
    >
        <div class="modal flow">
            <span class="flex items-center justify-between">
                <h3 class="text-[26px]">Edit AI Agent</h3>

                <button @click="close_modal([modalId])">
                    <img src="/public/assets/icons/x.svg" />
                </button>
            </span>

            <form @submit.prevent="editAgent">
                <div>
                    <label class="text-[15px] font-meduim">Agent Name *</label>
                    <input
                        v-model="formData.name"
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
                        v-model="formData.description"
                        class="w-full mt-2 resize-none h-[110px] border border-[#2F2F30] rounded-[14px] bg-transparent"
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
                            >
                                {{ fileName || "Current or new image" }}</span
                            >
                        </div>

                        <!-- Right: Delete Icon -->
                        <button @click.prevent="removeImage">
                            <img src="/public/assets/icons/delete.svg" />
                        </button>
                    </label>

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

<!-- <script setup>
import Btn from "../Atoms/Button.vue";
import { close_modal } from "../../utils/utils";
import { ref, watch } from "vue";
import api from "../../lib/api_functions";

// const props = defineProps({
//     agent: {
//         type: Object,
//         required: true,
//     },
//     modalId: {
//         type: String,
//         required: true,
//     },
// });

const props = defineProps({
  agent: Object,
  modalId: String,
});



</script> -->

<script setup>
import Btn from "../Atoms/Button.vue";
import { close_modal } from "../../utils/utils";
import { ref, watch } from "vue";
import api from "../../lib/api_functions";

const props = defineProps({
    agent: {
        type: Object,
        required: true,
    },
    modalId: {
        type: String,
        required: true,
    },
});

// Emits an event to parent (agents.vue) when update succeeds
const emit = defineEmits(["updated"]);

// Local state
const previewImage = ref("");
const fileName = ref("");
const fileInput = ref(null);

const formData = ref({
    id: props.agent.id,
    name: props.agent.name,
    description: props.agent.description,
    image: null, // will hold file
});

// Watch for changes to props (important if modal opens with new agent)
watch(
    () => props.agent,
    (newAgent) => {
        formData.value = {
            id: newAgent.id,
            name: newAgent.name,
            description: newAgent.description,
            image: null,
        };
        previewImage.value = newAgent.agent_image || "";
        fileName.value = "";
        fileInput.value = null;
    },
    { immediate: true }
);

const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        fileInput.value = file;
        fileName.value = file.name;

        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.value = e.target.result;
        };
        reader.readAsDataURL(file);
    }
};

const removeImage = () => {
    previewImage.value = "";
    fileName.value = "";
    fileInput.value = null;
};

const editAgent = async () => {
    const form = new FormData();
    form.append("agent_id", formData.value.id);
    form.append("name", formData.value.name);
    form.append("description", formData.value.description || "");

    if (fileInput.value) {
        form.append("agent_image", fileInput.value);
    }

    try {
        const res = await api.editAgents(form);
        console.log("Edited agent:", res);

        // Close modal and tell parent to refresh list
        close_modal([props.modalId]);
        emit("updated");
    } catch (error) {
        console.error(error);
    }
};
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
