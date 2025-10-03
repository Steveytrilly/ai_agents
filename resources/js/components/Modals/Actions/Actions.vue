<template>
    <div
        class="backdrop hidden"
        id="action"
        @click.self="close_modal(['action'])"
    >
        <div class="modal p-5">
            <span class="flex items-center justify-between">
                <p class="text-[20px] font-bold">Action Library</p>
                <button @click="close_modal(['action'])">
                    <img src="/assets/icons/x.svg" />
                </button>
            </span>

            <div class="relative w-full mt-5">
                <input
                    type="text"
                    placeholder="What would you like to do?"
                    class="w-full bg-transparent font-normal text-gray-300 placeholder-gray-400 pl-10 pr-4 py-3 rounded-[4px] border border-[#2F2F30] focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                />

                <img
                    src="/assets/icons/search.svg"
                    class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                />
            </div>

            <div class="border-t border-[#2F2F30] pt-t mt-5">
                <span class="flex items-center gap-2 mt-5">
                    <img src="/assets/icons/action.svg" alt="" />

                    <p class="text-[14px] font-semibold text-[#705CF6]">
                        Engine Categories
                    </p>
                </span>

                <div class="mt-6 flow w-full">
                    <button
                        @click="openCategory('input')"
                        class="hover:bg-[#2F2F30] w-full cursor-pointer p-3 rounded-[4px] flex items-center gap-3"
                        :class="
                            showActive === 'input'
                                ? 'bg-[#705CF6] hover:bg-[#705CF6]'
                                : ''
                        "
                    >
                        <img src="/assets/icons/input.svg" />
                        <p class="text-[16px] font-medium">
                            Inputs & Data Retrieval Engine
                        </p>
                    </button>
                    <!-- Dropdown for  Inputs & Data Retrieval Engine -->
                    <ul
                        class="mt-6 space-y-2"
                        v-if="showActive === 'input' && !selectedForm"
                    >
                        <li
                            @click="openForm('get-user-input')"
                            class="hover:bg-[#2F2F30] cursor-pointer p-3 rounded-[4px] flex items-center gap-3 border border-[#2F2F30]"
                        >
                            <img src="/assets/icons/input.svg" />
                            <span>
                                <p class="text-[14px] font-semibold">
                                    Get User Input
                                </p>

                                <p class="text-[12px]">
                                    Capture user input with options like text,
                                    numbers, URLs, and dropdowns, to collect
                                    dynamic responses.
                                </p>
                            </span>
                        </li>

                        <li
                            @click="openForm('get-user-list')"
                            class="hover:bg-[#2F2F30] cursor-pointer p-3 rounded-[4px] flex items-center gap-3 border border-[#2F2F30]"
                        >
                            <img src="/assets/icons/input.svg" />
                            <span>
                                <p class="text-[14px] font-semibold">
                                    Get User List
                                </p>

                                <p class="text-[12px]">
                                    Collect multiple entries from a textarea and
                                    split on a delimiter or newline.
                                </p>
                            </span>
                        </li>

                        <li
                            class="hover:bg-[#2F2F30] cursor-pointer p-3 rounded-[4px] flex items-center gap-3 border border-[#2F2F30]"
                        >
                            <img src="/assets/icons/input.svg" />
                            <span>
                                <p class="text-[14px] font-semibold">
                                    Get User File
                                </p>

                                <p class="text-[12px]">
                                    Allow users to upload files (CSV, Excel,
                                    PDFs, etc.) for processing, storage, or
                                    review within the workflow
                                </p>
                            </span>
                        </li>

                        <li
                            class="hover:bg-[#2F2F30] cursor-pointer p-3 rounded-[4px] flex items-center gap-3 border border-[#2F2F30]"
                        >
                            <img src="/assets/icons/input.svg" />
                            <span>
                                <p class="text-[14px] font-semibold">
                                    Get User Knowledge Files
                                </p>

                                <p class="text-[12px]">
                                    Retrieve information from user-selected
                                    knowledge files to support decision-making.
                                </p>
                            </span>
                        </li>

                        <li
                            class="hover:bg-[#2F2F30] cursor-pointer p-3 rounded-[4px] flex items-center gap-3 border border-[#2F2F30]"
                        >
                            <img src="/assets/icons/input.svg" />
                            <span>
                                <p class="text-[14px] font-semibold">
                                    Wait for User Confirmation
                                </p>

                                <p class="text-[12px]">
                                    Pause the workflow until the user explicitly
                                    confirms to continue.
                                </p>
                            </span>
                        </li>

                        <li
                            class="hover:bg-[#2F2F30] cursor-pointer p-3 rounded-[4px] flex items-center gap-3 border border-[#2F2F30]"
                        >
                            <img src="/assets/icons/input.svg" />
                            <span>
                                <p class="text-[14px] font-semibold">
                                    Web Page Content
                                </p>

                                <p class="text-[12px]">
                                    Extract text from a specified web page or
                                    crawl multiple pages for comprehensive data
                                    gathering.
                                </p>
                            </span>
                        </li>

                        <li
                            class="hover:bg-[#2F2F30] cursor-pointer p-3 rounded-[4px] flex items-center gap-3 border border-[#2F2F30]"
                        >
                            <img src="/assets/icons/input.svg" />
                            <span>
                                <p class="text-[14px] font-semibold">
                                    Click Go to Continue
                                </p>

                                <p class="text-[12px]">
                                    Prompt users to click Go to proceed with the
                                    next step in the workflow.
                                </p>
                            </span>
                        </li>
                    </ul>

                    <button
                        @click="showActive = 'dfy'"
                        class="hover:bg-[#2F2F30] w-full cursor-pointer p-3 rounded-[4px] flex items-center gap-3"
                    >
                        <img src="/assets/icons/socialmedia.svg" />
                        <p class="text-[16px] font-medium">
                            Social Media Data Retrieval Engine
                        </p>
                    </button>
                    <!-- Dropdown for   Social Media Data Retrieval Engine -->
                    <div class="bg-red-500" v-if="showActive === 'dfy'">
                        x x x x x x x
                    </div>

                    <button
                        class="hover:bg-[#2F2F30] w-full cursor-pointer p-3 rounded-[4px] flex items-center gap-3"
                    >
                        <img src="/assets/icons/img1.svg" />
                        <p class="text-[16px] font-medium">
                            Audience & Contact Retrieval Engine
                        </p>
                    </button>

                    <button
                        class="hover:bg-[#2F2F30] w-full cursor-pointer p-3 rounded-[4px] flex items-center gap-3"
                    >
                        <img src="/assets/icons/img1.svg" />
                        <p class="text-[16px] font-medium">
                            Content Generation & Processing Engines
                        </p>
                    </button>

                    <button
                        class="hover:bg-[#2F2F30] w-full cursor-pointer p-3 rounded-[4px] flex items-center gap-3"
                    >
                        <img src="/assets/icons/img2.svg" />
                        <p class="text-[16px] font-medium">
                            Email Marketing Provider Engines
                        </p>
                    </button>

                    <button
                        class="hover:bg-[#2F2F30] w-full cursor-pointer p-3 rounded-[4px] flex items-center gap-3"
                    >
                        <img src="/assets/icons/img3.svg" />
                        <p class="text-[16px] font-medium">
                            Social Media Engagement Engines
                        </p>
                    </button>

                    <button
                        class="hover:bg-[#2F2F30] w-full cursor-pointer p-3 rounded-[4px] flex items-center gap-3"
                    >
                        <img src="/assets/icons/engines.svg" />
                        <p class="text-[16px] font-medium">
                            Email Engagement Analytics Engines
                        </p>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <Inputs
        v-if="selectedForm"
        :form-type="selectedForm"
        @back="
            () => {
                selectedForm = null;
                showModal('action');
            }
        "
    />
</template>

<!-- <script setup>
import Inputs from "./Inputs.vue";
import { ref } from "vue";
import { showModal } from "../../../utils/utils";

const showActive = ref("");
// "actions" = default parent list
// "input"   = child Inputs.vue
// "test"    = show Inputs.vue blue div
</script> -->

<script setup>
import { ref } from "vue";
import Inputs from "./Inputs.vue";
import { close_modal, showModal } from "../../../utils/utils";

const showActive = ref(null); // 'input' | 'dfy' | etc
const selectedForm = ref(null); // 'get-user-input' | 'get-user-list' | etc

function openCategory(category) {
    showActive.value = category;
    selectedForm.value = null;
}

function openForm(formKey) {
    selectedForm.value = formKey;
    close_modal(["action"]);
}
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
