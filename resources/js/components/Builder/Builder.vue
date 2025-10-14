<template>
    <div class="grid h-screen grid-cols-[2fr_1fr] w-full gap-3 p-3">
        <!-- Left side -->
        <div class="overflow-auto">
            <div class="bg-[#202123] rounded-[11px] border border-[#2F2F30]">
                <span
                    class="flex items-center justify-between border-b p-4 border-[#2F2F30]"
                >
                    <p class="text-[18px] font-bold">Trigger</p>

                    <Btn
                        title="Edit"
                        class="text-[#1A3643] text-[12px] !font-bold !bg-white"
                    ></Btn>
                </span>

                <div class="p-4">
                    <p class="text-[15px] text-[#9E9E9E]">
                        Run this agent
                        <span class="text-[#705CF6]">manually</span> on agent
                        page, or on a
                        <span class="text-[#705CF6]"
                            >user configured schedule</span
                        >
                    </p>
                </div>
            </div>

            <div
                class="bg-[#202123] rounded-[11px] border border-[#2F2F30] mt-5"
            >
                <span
                    class="flex items-center justify-between border-b p-4 border-[#2F2F30]"
                >
                    <p class="text-[18px] font-bold">Trigger</p>

                    <Btn
                        title="Add action"
                        class="text-[12px] !font-bold text-white"
                        @click="showModal('action')"
                    ></Btn>
                </span>

                <div class="p-4">
                    <div
                        class="flex items-center justify-between gap-6 -mt-4 py-4"
                        v-for="(summary, index) in actionsStore.actionSummaries"
                        :key="index"
                    >
                        <div class="flex items-center gap-5">
                            <span class="flex items-center gap-1">
                                <img src="/assets/icons/count.svg" alt="" />
                                <p class="text-white text-[14px] font-normal">
                                    {{ index + 1 }}
                                </p>
                            </span>

                            <div v-if="summary.type === 'get_user_input'">
                                <p
                                    class="text-[13px] font-semibold text-[rgba(255,255,255,0.90)]"
                                >
                                    Get User Input
                                </p>

                                <p
                                    class="text-[14px] text-[rgba(255,255,255,0.75)]"
                                >
                                    Get user input type
                                    <span
                                        class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[3px]"
                                        >{{ summary.input_type }}</span
                                    >
                                    with prompt
                                    <span
                                        class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[3px]"
                                        >{{ summary.user_prompt }}</span
                                    >
                                    and save to
                                    <span
                                        class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[3px]"
                                        >{{ summary.output_variable }}</span
                                    >
                                </p>
                            </div>

                            <div v-if="summary.type === 'get_list'">
                                <p
                                    class="text-[13px] font-semibold text-[rgba(255,255,255,0.90)]"
                                >
                                    Get User List
                                </p>

                                <p
                                    class="text-[14px] text-[rgba(255,255,255,0.75)]"
                                >
                                    Get
                                    <span
                                        class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[3px]"
                                        >User List</span
                                    >
                                    with prompt
                                    <span
                                        class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[3px]"
                                        >{{ summary.user_prompt }}</span
                                    >
                                    and save to
                                    <span
                                        class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[3px]"
                                        >{{ summary.output_variable }}</span
                                    >
                                </p>
                            </div>

                            <div v-if="summary.type === 'contact_file_upload'">
                                <p
                                    class="text-[13px] font-semibold text-[rgba(255,255,255,0.90)]"
                                >
                                    Contact File Upload
                                </p>

                                <p
                                    class="text-[14px] text-[rgba(255,255,255,0.75)]"
                                >
                                    Get
                                    <span
                                        class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[3px]"
                                        >Contact File Upload</span
                                    >
                                    with prompt
                                    <span
                                        class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[3px]"
                                        >{{ summary.user_prompt }}</span
                                    >
                                    and save to
                                    <span
                                        class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[3px]"
                                        >{{ summary.output_variable }}</span
                                    >
                                </p>
                            </div>
                        </div>

                        <div class="flex items-center gap-3">
                            <img src="/assets/icons/toggle.svg" />

                            <button
                                class="bg-[rgba(244,244,245,0.25)] rounded-[4px] p-2"
                                @click="editAction(index)"
                            >
                                <img src="/assets/icons/edit2.svg" alt="" />
                            </button>

                            <button
                                class="bg-[rgba(244,244,245,0.25)] rounded-[4px] p-2"
                                @click="actionsStore.deleteAction(index)"
                            >
                                <img src="/assets/icons/delete2.svg" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Right side -->
        <div class="overflow-auto">
            <div
                class="bg-[#202123] rounded-[11px] border border-[#2F2F30] p-3"
            >
                <div
                    class="flex items-center justify-between border-b pb-5 border-[#2F2F30]"
                >
                    <p class="text-[#705CF6] text-[15px] font-bold">Preview</p>

                    <span class="flex items-center gap-3">
                        <p class="text-[13px] font-bold text-[#718096]">
                            Details
                        </p>
                        <img src="/assets/icons/toggle.svg" />

                        <button
                            class="bg-white w-[100px] flex items-center justify-center p-2 rounded-[5px]"
                        >
                            <img src="/assets/icons/recall2.svg" />
                            <p class="text-[13px] text-[#1A3643] font-semibold">
                                Restart
                            </p>
                        </button>
                    </span>
                </div>

                <div class="space-y-6 mt-4 flow">
                    <div
                        v-for="(action, index) in previewableActions"
                        :key="index"
                        class="p-4 rounded-md"
                    >
                        <p class="text-[14px] font-normal text-[#718096]">
                            {{ index + 1 }} {{ action.user_prompt }}
                        </p>

                        <!-- Conditionally render the right input -->
                        <input
                            v-if="action.input_type === 'text'"
                            type="text"
                            class="w-full p-3 rounded-[3px] border border-[#2F2F30] bg-transparent mt-2 focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                            v-model="action.default_value"
                        />

                        <textarea
                            v-else-if="action.input_type === 'textarea'"
                            rows="4"
                            class="w-full p-3 rounded-[3px] border border-[#2F2F30] bg-transparent mt-2 focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                            v-model="action.default_value"
                        ></textarea>

                        <input
                            v-else-if="action.input_type === 'number'"
                            type="number"
                            class="w-full p-3 rounded-[3px] border border-[#2F2F30] bg-transparent mt-2 focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                            v-model="action.default_value"
                        />

                        <input
                            v-else-if="action.input_type === 'url'"
                            type="url"
                            class="w-full p-3 rounded-[3px] border border-[#2F2F30] bg-transparent mt-2 focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                            v-model="action.default_value"
                        />

                        <select
                            v-else-if="action.input_type === 'yes_no'"
                            class="text-[#9E9E9E] text-[15px] mt-2 font-normal rounded-[14px] p-3 border border-[#2F2F30] focus:border-[#2F2F30] bg-transparent block w-full focus:outline-none focus:ring-0"
                            v-model="action.default_value"
                        >
                            <option value="disabled">
                                Choose default value
                            </option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>

                        <select
                            v-else-if="
                                [
                                    'dropdown_single',

                                    'multi_select',
                                    'multi_select-table',
                                ].includes(action.input_type)
                            "
                            v-model="action.default_value"
                            class="text-[#9E9E9E] text-[15px] mt-2 font-normal rounded-[14px] p-3 border border-[#2F2F30] focus:border-[#2F2F30] bg-transparent block w-full focus:outline-none focus:ring-0"
                        >
                            <option value="" disabled>Choose an option</option>
                            <option
                                v-for="(opt, i) in action.options
                                    ?.split('\n')
                                    .filter((o) => o.trim())"
                                :key="i"
                                :value="opt.trim()"
                            >
                                {{ opt.trim() }}
                            </option>
                        </select>

                        <!-- DROPDOWN & MULTI SELECT TYPES -->
                        <div
                            v-else-if="
                                ['dropdown_multiple'].includes(
                                    action.input_type
                                )
                            "
                            class="space-y-2 mt-2"
                        >
                            <p class="text-[#9E9E9E] text-[14px]">
                                Choose option(s):
                            </p>

                            <div
                                v-for="(opt, i) in action.options
                                    ?.split('\n')
                                    .filter((o) => o.trim())"
                                :key="i"
                                class="flex items-center gap-2"
                            >
                                <label
                                    class="flex items-center gap-2 cursor-pointer"
                                >
                                    <!-- checkbox is the peer -->
                                    <input
                                        type="checkbox"
                                        :id="`opt-${index}-${i}`"
                                        :value="opt.trim()"
                                        v-model="selectedOptions[index]"
                                        class="hidden peer"
                                    />
                                    <!-- custom box that changes color when checked -->
                                    <span
                                        class="w-4 h-4 border border-[#2F2F30] rounded-sm flex items-center justify-center peer-checked:bg-[#999999] peer-checked:border-white transition-colors"
                                    ></span>
                                </label>
                                <label
                                    :for="`opt-${index}-${i}`"
                                    class="text-[15px] text-[#C6CCD8] cursor-pointer"
                                >
                                    {{ opt.trim() }}
                                </label>
                            </div>
                        </div>

                        <!-- GET USER LIST -->
                        <textarea
                            v-else-if="action.action === 'get_list'"
                            rows="4"
                            class="w-full p-3 rounded-[3px] border border-[#2F2F30] bg-transparent mt-2 focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                            v-model="action.list_delimeter"
                        ></textarea>

                        <div
                            class="flex justify-center items-center w-full"
                            v-else-if="action.action === 'contact_file_upload'"
                        >
                            <label
                                for="file-upload"
                                class="w-full h-16 flex flex-col justify-center items-center border-2 border-dashed border-[#2F2F30] rounded-xl cursor-pointer hover:border-[#2F2F30] transition-colors"
                            >
                                <!-- <svg
                                    class="w-12 h-12 text-blue-500 mb-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0 0l-4-4m4 4l4-4m-4-8V4m0 0L8 8m4-4l4 4"
                                    />
                                </svg> -->

                                <span class="text-gray-700 font-medium text-lg"
                                    >Click here to upload a file</span
                                >
                            </label>

                            <input
                                id="file-upload"
                                type="file"
                                class="hidden"
                            />
                        </div>

                        <!-- Optional: fallback -->
                        <p v-else class="text-gray-500 text-sm mt-2">
                            Unsupported input type
                        </p>
                    </div>
                </div>

                <!-- <div class="mt-3">
                    <p
                        class="text-[12px] font-normal text-[#718096] capitalize italic"
                    >
                        1 User input
                    </p>

                    <p class="text-[14px] font-normal pt-2">
                        What is the name of your business?
                    </p>
                    <input
                        type="text"
                        class="w-full border border-[#2F2F30] focus:border-[#2F2F30] p-3 rounded-[3px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                    />
                </div> -->
            </div>
        </div>
    </div>

    <Actions @new-action="actionsStore.addActionSummary"></Actions>
    <Inputs
        v-if="selectedForm"
        :form-type="selectedForm"
        :edit-data="
            editingIndex !== null
                ? actionsStore.actionsState.action_data[editingIndex]
                : null
        "
        :edit-index="editingIndex"
        @back="
            () => {
                selectedForm = null;
                editingIndex = null;
            }
        "
        @new-action="
            (action) => {
                selectedForm = null;
                editingIndex = null;
                actionsStore.addActionSummary(action);
            }
        "
    />
</template>

<script setup>
import Btn from "../Atoms/Button.vue";
import Actions from "../Modals/Actions/Actions.vue";
import { showModal } from "../../utils/utils";
import { ref, computed, onMounted, watch } from "vue";
import { useActionsStore } from "../../stores/action";
import api from "../../lib/axios_global";
import Inputs from "../Modals/Actions/Inputs.vue";

const actionsStore = useActionsStore();

const previewableTypes = ["get_user_input", "get_list", "contact_file_upload"];

const previewableActions = computed(() =>
    actionsStore.actionsState.action_data.filter((action) =>
        previewableTypes.includes(action.action)
    )
);

// ✅ initialize selectedOptions as an array of arrays
const selectedOptions = ref(
    actionsStore.actionsState.action_data.map((a) => {
        if (["dropdown_multiple"].includes(a.input_type)) {
            return a.default_value
                ? a.default_value.split(",").map((x) => x.trim())
                : [];
        }
        return [];
    })
);

// FOR MULTISELCT

watch(
    () => actionsStore.actionsState.action_data,
    (actions) => {
        // Ensure selectedOptions matches action count
        selectedOptions.value = actions.map((a, i) => {
            const defaults = a.default_value
                ? a.default_value.split(",").map((x) => x.trim())
                : [];
            return defaults;
        });
    },
    { deep: true, immediate: true }
);

watch(
    selectedOptions,
    (newValues) => {
        // Sync default_value with selected checkboxes
        newValues.forEach((vals, i) => {
            if (
                Array.isArray(vals) &&
                actionsStore.actionsState.action_data[i]
            ) {
                actionsStore.actionsState.action_data[i].default_value =
                    vals.join(",");
                console.log(
                    `Action ${i} default_value updated:`,
                    actionsStore.actionsState.action_data[i].default_value
                );
            }
        });
    },
    { deep: true }
);

// Fall back to just incase of an error
// watch(
//     selectedOptions,
//     (newValues) => {
//         newValues.forEach((vals, i) => {
//             if (Array.isArray(vals)) {
//                 actionsStore.actionsState.action_data[i].default_value =
//                     vals.join(",");
//                 console.log(
//                     `Action ${i} default_value updated:`,
//                     actionsStore.actionsState.action_data[i].default_value
//                 );
//             }
//         });
//     },
//     { deep: true }
// );

const selectedForm = ref(null);
const editingIndex = ref(null);

function editAction(index) {
    editingIndex.value = index;
    selectedForm.value = actionsStore.actionsState.action_data[index].action; // pass correct form type
}

onMounted(async () => {
    const parts = window.location.pathname.split("/");
    const agentId = Number(parts[parts.length - 1]);
    actionsStore.setAgentId(agentId);

    try {
        const res = await api.get(`/ai-agent/${agentId}`);
        const agentData = res.data.data;

        if (agentData.actions && agentData.actions.length) {
            // Parse the stringified action_data
            const parsedActions = agentData.actions
                .map((a) => JSON.parse(a.action_data))
                .flat();

            actionsStore.actionsState.action_data = parsedActions;

            // Rebuild summaries
            actionsStore.actionSummaries = parsedActions.map((a) =>
                actionsStore.generateSummary(a)
            );

            console.log(
                "Store hydrated from backend:",
                actionsStore.actionsState
            );
        }
    } catch (err) {
        console.error("Error fetching actions:", err);
    }
});
</script>

<style scoped>
.flow {
    height: calc(100vh - 300px);
    overflow-y: scroll;
}

.tag {
    color: red !important;
}

.custom-checkbox {
    appearance: none;
    -webkit-appearance: none;
    width: 1rem;
    height: 1rem;
    border: 1.5px solid #2f2f30;
    border-radius: 0.25rem;
    cursor: pointer;
    position: relative;
    transition: all 0.2s ease;
}

.custom-checkbox:checked {
    background-color: #705cf6;
    border-color: #705cf6;
}

.custom-checkbox:checked::after {
    content: "✓";
    position: absolute;
    color: white;
    font-size: 0.75rem;
    left: 3px;
    top: -1px;
}
</style>
