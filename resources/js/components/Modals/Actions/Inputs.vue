<template>
    <div class="backdrop" id="inputs" @click.self="close_modal['inputs']">
        <div class="modal">
            <button
                @click="emit('back')"
                class="text-white mb-4 px-4 py-2 bg-gray-700 rounded-lg"
            >
                ← Back
            </button>
            <div v-if="formType === 'get-user-input'">
                <span class="flex items-center gap-3">
                    <img src="/assets/icons/input.svg" />
                    <h2 class="text-xl font-semibold mb-2">Get User Input</h2>
                </span>

                <form class="mt-10 space-y-6 flow">
                    <div>
                        <label class="text-[15px] font-meduim block"
                            >Input Type *</label
                        >
                        <select
                            class="text-[#9E9E9E] text-[15px] mt-2 font-normal rounded-[14px] p-3 border border-[#2F2F30] focus:border-[#2F2F30] bg-transparent block w-full focus:outline-none focus:ring-0"
                            required
                        >
                            <option value="disabled">
                                Choose a Input type
                            </option>
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="boolean">Yes/No</option>
                        </select>
                    </div>

                    <div>
                        <label class="text-[15px] font-meduim"
                            >User Prompt</label
                        >
                        <textarea
                            class="w-full mt-2 resize-none h-[110px] border border-[#2F2F30] rounded-[14px] bg-transparent focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                        ></textarea>
                    </div>

                    <div>
                        <label class="text-[15px] font-meduim"
                            >Default Value</label
                        >
                        <input
                            type="text"
                            class="w-full border border-[#2F2F30] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" class="hidden peer" />
                        <div
                            class="w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center peer-checked:bg-[#705CF6] peer-checked:border-[#705CF6]"
                        >
                            <!-- Checkmark -->
                            <svg
                                class="w-3 h-3 text-white hidden peer-checked:block"
                                viewBox="0 0 24 24"
                            >
                                <path fill="currentColor" d="M20 6L9 17l-5-5" />
                            </svg>
                        </div>
                        <span class="text-[#C6CCD8] text-[15px]"
                            >Required?</span
                        >
                    </label>

                    <div>
                        <label class="text-[15px] font-meduim"
                            >Output Variable *</label
                        >
                        <input
                            type="text"
                            placeholder="user_input"
                            class="w-full border border-[#2F2F30] placeholder:text-[#9E9E9E] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div class="flex flex-col items-end mt-5">
                        <Btn title="Save"></Btn>
                    </div>
                </form>
            </div>

            <div v-if="formType === 'get-user-list'">
                <span class="flex items-center gap-3">
                    <img src="/assets/icons/input.svg" />
                    <h2 class="text-xl font-semibold mb-2">Get User List</h2>
                </span>

                <form class="mt-10 space-y-6 flow">
                    <div>
                        <label class="text-[15px] font-meduim"
                            >User Prompt</label
                        >
                        <input
                            type="text"
                            placeholder="Upload your File(s)"
                            class="w-full border border-[#2F2F30] placeholder:text-[#9E9E9E] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" class="hidden peer" />
                        <div
                            class="w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center peer-checked:bg-[#705CF6] peer-checked:border-[#705CF6]"
                        >
                            <!-- Checkmark -->
                            <svg
                                class="w-3 h-3 text-white hidden peer-checked:block"
                                viewBox="0 0 24 24"
                            >
                                <path fill="currentColor" d="M20 6L9 17l-5-5" />
                            </svg>
                        </div>
                        <span class="text-[#C6CCD8] text-[15px]"
                            >Required?</span
                        >
                    </label>

                    <div>
                        <label class="text-[15px] font-meduim"
                            >Output Variable *</label
                        >
                        <input
                            type="text"
                            placeholder="contact_file_upload"
                            class="w-full border border-[#2F2F30] placeholder:text-[#9E9E9E] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" class="hidden peer" />
                        <div
                            class="w-5 h-5 border-2 border-gray-400 rounded-sm flex items-center justify-center peer-checked:bg-[#705CF6] peer-checked:border-[#705CF6]"
                        >
                            <!-- Checkmark -->
                            <svg
                                class="w-3 h-3 text-white hidden peer-checked:block"
                                viewBox="0 0 24 24"
                            >
                                <path fill="currentColor" d="M20 6L9 17l-5-5" />
                            </svg>
                        </div>
                        <span class="text-[#C6CCD8] text-[15px]"
                            >Show File Uploaded</span
                        >
                    </label>

                    <div class="flex flex-col items-end mt-5">
                        <Btn title="Save"></Btn>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { close_modal } from "../../../utils/utils";
import Btn from "../../Atoms/Button.vue";

const props = defineProps({
    formType: String, // e.g. 'get-user-input' | 'get-user-list' | ...
});
const emit = defineEmits(["back"]);
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
    width: 896px;
    background-color: #202123;
    border-radius: 14px;
    padding: 20px;
    border: 1px solid #2f2f30;
    box-shadow: 0px 16px 80px 0px rgba(0, 0, 0, 0.7),
        0px 30px 20px -30px rgba(0, 0, 0, 0.25);
}
</style>
