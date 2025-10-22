<template>
    <div class="backdrop" id="inputs" @click.self="close_modal['inputs']">
        <div class="modal">
            <button
                @click="emit('back')"
                class="text-white mb-4 px-4 py-2 bg-gray-700 rounded-lg"
            >
                ← Back
            </button>

            <div v-if="formType === 'get_user_input'">
                <span class="flex items-center gap-3">
                    <img src="/assets/icons/input.svg" />
                    <h2 class="text-xl font-semibold mb-2">Get User Input</h2>
                </span>

                <form class="mt-10 space-y-6 flow" @submit.prevent="saveAction">
                    <div>
                        <label class="text-[15px] font-meduim block"
                            >Input Type *</label
                        >
                        <select
                            v-model="form.input_type"
                            class="text-[#9E9E9E] text-[15px] mt-2 font-normal rounded-[14px] p-3 border border-[#2F2F30] focus:border-[#2F2F30] bg-transparent block w-full focus:outline-none focus:ring-0"
                            required
                        >
                            <option value="disabled">
                                Choose a Input type
                            </option>
                            <option value="text">Text</option>
                            <option value="number">Number</option>
                            <option value="yes_no">Yes/No</option>
                            <option value="textarea">Textarea</option>
                            <option value="url">URL</option>
                            <option value="website">Website</option>
                            <option value="dropdown_single">
                                Dropdown (Single)
                            </option>
                            <option value="dropdown_multiple">
                                Multi-Item Selector
                            </option>
                            <!-- <option value="multi_select">
                                Multi-Item Selector
                            </option>
                            <option value="multi_select-table">
                                Multi-Item Selector (Table view)
                            </option> -->
                        </select>
                    </div>

                    <div>
                        <label class="text-[15px] font-meduim"
                            >User Prompt</label
                        >
                        <textarea
                            v-model="form.user_prompt"
                            required
                            class="w-full mt-2 resize-none h-[110px] border border-[#2F2F30] rounded-[14px] bg-transparent focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                        ></textarea>
                    </div>

                    <div v-if="isDropdownType">
                        <label class="text-[15px] font-meduim"
                            >Select Options * (enter each options on a new
                            line)</label
                        >
                        <textarea
                            v-model="form.options"
                            class="w-full mt-2 resize-none h-[110px] border border-[#2F2F30] rounded-[14px] bg-transparent focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                        ></textarea>
                    </div>

                    <!-- Validation Warning -->
                    <p
                        v-if="form.default_value && !validDefaultOption"
                        class="text-[#FF6B6B] text-sm mt-1"
                    >
                        ⚠️ Default value must match one of the options listed
                        above.
                    </p>

                    <!-- YES/NO DEFAULT VALUE -->
                    <div v-if="form.input_type === 'yes_no'">
                        <label class="text-[15px] font-meduim"
                            >Default Value</label
                        >
                        <select
                            v-model="form.default_value"
                            class="text-[#9E9E9E] text-[15px] mt-2 font-normal rounded-[14px] p-3 border border-[#2F2F30] focus:border-[#2F2F30] bg-transparent block w-full focus:outline-none focus:ring-0"
                        >
                            <option value="disabled">
                                Choose default value
                            </option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                        </select>
                    </div>

                    <!-- URL DEFAULT VALUE -->
                    <div v-if="form.input_type === 'url'">
                        <label class="text-[15px] font-meduim"
                            >Default Value</label
                        >
                        <input
                            v-model="form.default_value"
                            placeholder="enter a url"
                            type="url"
                            class="w-full border placeholder:text-[#9E9E9E] border-[#2F2F30] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div v-else>
                        <label class="text-[15px] font-meduim"
                            >Default Value</label
                        >
                        <input
                            v-model="form.default_value"
                            type="text"
                            class="w-full border border-[#2F2F30] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            v-model="form.required"
                            class="hidden peer"
                        />
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
                            v-model="form.output_variable"
                            type="text"
                            placeholder="user_input"
                            required
                            class="w-full border border-[#2F2F30] placeholder:text-[#9E9E9E] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div class="flex flex-col items-end mt-5">
                        <button
                            type="submit"
                            class="bg-[#705CF6] px-6 py-1.5 rounded-[8px]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <div v-else-if="formType === 'get_list'">
                <span class="flex items-center gap-3">
                    <img src="/assets/icons/input.svg" />
                    <h2 class="text-xl font-semibold mb-2">Get List</h2>
                </span>

                <form class="mt-10 space-y-6 flow" @submit.prevent="saveAction">
                    <div>
                        <label class="text-[15px] font-meduim"
                            >User Prompt</label
                        >
                        <input
                            v-model="form.user_prompt"
                            type="text"
                            class="w-full border border-[#2F2F30] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div>
                        <label class="text-[15px] font-meduim"
                            >List Delimiter (Leave Blank for New Line)</label
                        >
                        <textarea
                            v-model="form.list_delimeter"
                            class="w-full mt-2 resize-none h-[110px] border border-[#2F2F30] rounded-[14px] bg-transparent focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                        ></textarea>
                    </div>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            v-model="form.required"
                            class="hidden peer"
                        />
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
                            v-model="form.output_variable"
                            @input="formatOutputVariable"
                            type="text"
                            placeholder="user_input"
                            required
                            class="w-full border border-[#2F2F30] placeholder:text-[#9E9E9E] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div class="flex flex-col items-end mt-5">
                        <button
                            type="submit"
                            class="bg-[#705CF6] px-6 py-1.5 rounded-[8px]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <div v-else-if="formType === 'contact_file_upload'">
                <span class="flex items-center gap-3">
                    <img src="/assets/icons/input.svg" />
                    <h2 class="text-xl font-semibold mb-2">
                        Get User File For Contact Import
                    </h2>
                </span>

                <form class="mt-10 space-y-6 flow" @submit.prevent="saveAction">
                    <div>
                        <label class="text-[15px] font-meduim"
                            >User Prompt</label
                        >
                        <input
                            v-model="form.user_prompt"
                            type="text"
                            class="w-full border border-[#2F2F30] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            v-model="form.required"
                            class="hidden peer"
                        />
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
                            v-model="form.output_variable"
                            @input="formatOutputVariable"
                            type="text"
                            placeholder="contact_file_upload"
                            required
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
                        <button
                            type="submit"
                            class="bg-[#705CF6] px-6 py-1.5 rounded-[8px]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <div v-else-if="formType === 'knowledge_file_upload'">
                <span class="flex items-center gap-3">
                    <img src="/assets/icons/input.svg" />
                    <h2 class="text-xl font-semibold mb-2">
                        Get User Knowledge File
                    </h2>
                </span>

                <form class="mt-10 space-y-6 flow" @submit.prevent="saveAction">
                    <div>
                        <label class="text-[15px] font-meduim"
                            >User Prompt</label
                        >
                        <input
                            v-model="form.user_prompt"
                            type="text"
                            class="w-full border border-[#2F2F30] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            v-model="form.required"
                            class="hidden peer"
                        />
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
                            v-model="form.output_variable"
                            @input="formatOutputVariable"
                            type="text"
                            placeholder="contact_file_upload"
                            required
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
                        <button
                            type="submit"
                            class="bg-[#705CF6] px-6 py-1.5 rounded-[8px]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <div v-else-if="formType === 'user_confirmation'">
                <span class="flex items-center gap-3">
                    <img src="/assets/icons/input.svg" />
                    <h2 class="text-xl font-semibold mb-2">
                        Wait For User Confirmation
                    </h2>
                </span>

                <form class="mt-10 space-y-6 flow" @submit.prevent="saveAction">
                    <div>
                        <label class="text-[15px] font-meduim"
                            >Message To Show User</label
                        >
                        <input
                            v-model="form.message_to_user"
                            required
                            type="text"
                            class="w-full border border-[#2F2F30] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div class="flex flex-col items-end mt-5">
                        <button
                            type="submit"
                            class="bg-[#705CF6] px-6 py-1.5 rounded-[8px]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <div v-else-if="formType === 'crawl'">
                <span class="flex items-center gap-3">
                    <img src="/assets/icons/input.svg" />
                    <h2 class="text-xl font-semibold mb-2">
                        Get Web Page Content
                    </h2>
                </span>

                <form class="mt-10 space-y-6 flow" @submit.prevent="saveAction">
                    <div>
                        <label class="text-[15px] font-meduim">URL *</label>
                        <input
                            v-model="form.url"
                            required
                            type="url"
                            class="w-full border border-[#2F2F30] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div>
                        <label class="text-[15px] font-meduim"
                            >Crawling Mode *</label
                        >
                        <input
                            v-model="form.crawl_mode"
                            type="text"
                            placeholder="Scrape one page (default)"
                            required
                            class="w-full border border-[#2F2F30] placeholder:text-[#9E9E9E] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <label class="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            v-model="form.required"
                            class="hidden peer"
                        />
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

                    <div class="flex flex-col items-end mt-5">
                        <button
                            type="submit"
                            class="bg-[#705CF6] px-6 py-1.5 rounded-[8px]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>

            <div v-else-if="formType === 'go'">
                <span class="flex items-center gap-3">
                    <img src="/assets/icons/input.svg" />
                    <h2 class="text-xl font-semibold mb-2">
                        Click Go to Continue
                    </h2>
                </span>

                <form class="mt-10 space-y-6 flow" @submit.prevent="saveAction">
                    <div>
                        <label class="text-[15px] font-meduim">Label</label>
                        <input
                            v-model="form.message_to_user"
                            required
                            type="text"
                            class="w-full border border-[#2F2F30] focus:border-[#2F2F30] p-3 rounded-[14px] bg-transparent mt-2 focus:outline-none focus:ring-0"
                        />
                    </div>

                    <div class="flex flex-col items-end mt-5">
                        <button
                            type="submit"
                            class="bg-[#705CF6] px-6 py-1.5 rounded-[8px]"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import Btn from "../../Atoms/Button.vue";
import { useActionsStore } from "../../../stores/action";
import { dialog } from "../../../utils/dialog";

const props = defineProps({
    formType: { type: String, required: true },
    editData: { type: Object, default: null }, // new
    editIndex: { type: Number, default: null }, // index of action being edited
});

const validDefaultOption = computed(() => {
    // Only validate when dropdown type
    if (!isDropdownType.value) return true;

    const options = form.value.options
        ?.split("\n")
        .map((o) => o.trim())
        .filter(Boolean);

    // Empty default = fine
    if (!form.value.default_value) return true;

    // Check if the default exists in the option list
    return options.includes(form.value.default_value.trim());
});

function formatOutputVariable() {
    form.output_variable = form.output_variable
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "_")
        .replace(/[^\w_]/g, "");
}

const emit = defineEmits(["back", "new-action"]);

const actionsStore = useActionsStore();

// Form initialized from store template
// const form = ref(actionsStore.newActionTemplate(props.formType));
// const form = ref(actionsStore.newActionTemplate(props.formType));
const form = ref(
    props.editData
        ? { ...props.editData }
        : actionsStore.newActionTemplate(props.formType)
);

const allowedDropdownTypes = [
    "dropdown_single",
    "dropdown_multiple",
    "multi_select",
    "multi_select-table",
];

const isDropdownType = computed(() =>
    allowedDropdownTypes.includes(form.value.input_type)
);

// Watch for editing an existing action
watch(
    () => props.editData,
    (newData) => {
        if (newData) {
            form.value = { ...newData };
        }
    },
    { immediate: true }
);

// Watch for changing form type (new action only)
watch(
    () => props.formType,
    (newType) => {
        if (!props.editData) {
            form.value = actionsStore.newActionTemplate(newType);
        }
    }
);

// watch(
//     () => props.formType,
//     (newType) => {
//         form.value = actionsStore.newActionTemplate(newType);
//     }
// );

async function saveAction() {
    const actionToSave = { ...form.value };

    // Add this: check if output_variable is already used
    if (actionToSave.output_variable) {
        const formattedVar = actionsStore.formatVariableName(
            actionToSave.output_variable
        );

        // Check if variable exists in store
        const isDuplicate =
            Object.keys(actionsStore.actionsState.variables).includes(
                formattedVar
            ) &&
            // allow editing same action without triggering duplicate
            !(
                props.editIndex !== null &&
                actionsStore.actionsState.action_data[props.editIndex]
                    .output_variable === formattedVar
            );

        if (isDuplicate) {
            dialog.toastError("Output variable must be unique"); // <-- alert user
            return; // <-- prevent submission
        }

        if (isDropdownType.value && !validDefaultOption.value) {
            // alert("Default value must match one of the options listed.");
            return;
        }

        // Format variable before saving
        actionToSave.output_variable = formattedVar;
    }

    if (props.editIndex !== null) {
        // Editing existing action
        actionsStore.updateAction(props.editIndex, actionToSave);
    } else {
        // Adding new action
        actionsStore.addAction(actionToSave);
        emit("new-action", actionToSave);
    }

    // Submit to backend
    try {
        await actionsStore.submitActions();
    } catch (err) {
        console.error("Error submitting actions:", err);
    }

    // Reset form & close modal
    form.value = actionsStore.newActionTemplate(props.formType);
    emit("back");
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
