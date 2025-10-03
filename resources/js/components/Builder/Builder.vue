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
                    <div class="flex items-center gap-6">
                        <span class="flex items-center gap-1">
                            <img src="/assets/icons/count.svg" alt="" />
                            <p class="text-white text-[14px] font-normal">1</p>
                        </span>

                        <span class="space-y-1">
                            <h3
                                class="text-[rgba(255,255,255,0.90)] font-semibold"
                            >
                                Get User Input
                            </h3>

                            <p
                                class="text-[rgba(255,255,255,0.75)] text-[14px] font-normal leading-[28px]"
                            >
                                Get user input type
                                <span
                                    class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[4px]"
                                    >text</span
                                >
                                with prompt
                                <span
                                    class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[4px]"
                                    >What is the name of your business?</span
                                >
                                and save to
                                <span
                                    class="bg-[rgba(112,92,246,0.25)] p-1 rounded-[4px]"
                                    >business_name</span
                                >
                            </p>
                        </span>

                        <div class="flex items-center gap-3">
                            <img src="/assets/icons/toggle.svg" />

                            <button
                                class="bg-[rgba(244,244,245,0.25)] rounded-[4px] p-2"
                            >
                                <img src="/assets/icons/edit2.svg" alt="" />
                            </button>

                            <button
                                class="bg-[rgba(244,244,245,0.25)] rounded-[4px] p-2"
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

                <div class="mt-3">
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
                </div>
            </div>
        </div>
    </div>

    <Actions></Actions>
</template>

<script setup>
import Btn from "../Atoms/Button.vue";
import Actions from "../Modals/Actions/Actions.vue";
import { showModal } from "../../utils/utils";
import { useActionsStore } from "../../stores/action";
import { onMounted } from "vue";

const actionsStore = useActionsStore();

onMounted(() => {
    // Get the agent_id from the URL
    const parts = window.location.pathname.split("/");
    const agentId = parts[parts.length - 1]; // last segment
    actionsStore.setAgentId(agentId);
});
</script>
