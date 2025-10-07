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
                        class="flex items-center justify-between gap-6"
                        v-for="(summary, index) in actionsStore.actionSummaries"
                        :key="index"
                    >
                        <div class="flex items-center">
                            <span class="flex items-center gap-1">
                                <img src="/assets/icons/count.svg" alt="" />
                                <p class="text-white text-[14px] font-normal">
                                    {{ index + 1 }}
                                </p>
                            </span>

                            <span class="space-y-1">
                                <div class="p-2 text-white">
                                    {{ summary }}
                                </div>
                            </span>
                        </div>

                        <div class="flex items-center gap-3">
                            <img src="/assets/icons/toggle.svg" />

                            <button
                                class="bg-[rgba(244,244,245,0.25)] rounded-[4px] p-2"
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

            <!-- <div
                v-for="(summary, index) in actionsStore.actionSummaries"
                :key="index"
                class="p-2 text-white"
            >
                {{ summary }}
            </div> -->
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
                        v-for="(action, index) in actionsStore.actionsState
                            .action_data"
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
</template>

<script setup>
import Btn from "../Atoms/Button.vue";
import Actions from "../Modals/Actions/Actions.vue";
import { showModal } from "../../utils/utils";
import { ref, watch, onMounted } from "vue";
import { useActionsStore } from "../../stores/action";
import api from "../../lib/axios_global";

const actionsStore = useActionsStore();

const formValues = ref({});

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
</style>
