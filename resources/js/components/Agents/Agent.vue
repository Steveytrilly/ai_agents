<template>
    <div class="font-bold text-[30px] mt-8">
        <span class="flex items-center justify-between px-3">
            <h1>AI AGENT</h1>
            <Btn title="Create AI Agent" @click="showModal('create')"></Btn>
        </span>

        <div class="flex items-center gap-8 border-b border-gray-700 mt-5 px-3">
            <!-- Tab 1 -->
            <button
                @click="showActive = 'dfy'"
                :class="
                    showActive === 'dfy'
                        ? 'text-[#705CF6] border-b-4 border-[#705CF6]'
                        : 'text-[#9E9E9E]'
                "
                class="py-2 text-[15px] font-medium transition-colors duration-200"
            >
                DFY AGENTS
            </button>

            <!-- Tab 2 -->
            <button
                :class="
                    showActive === 'user'
                        ? 'text-[#705CF6] border-b-4 border-[#705CF6]'
                        : 'text-[#9E9E9E]'
                "
                @click="showActive = 'user'"
                class="py-2 text-[15px] font-medium transition-colors duration-200"
            >
                MY AGENT
            </button>
        </div>

        <DfyAgents v-if="showActive === 'dfy'"></DfyAgents>
        <UserAgents v-if="showActive === 'user'"></UserAgents>
        <Createagent></Createagent>
        <!-- <Editagent></Editagent> -->
    </div>
</template>

<script setup>
import Btn from "../Atoms/Button.vue";
import DfyAgents from "./DfyAgents.vue";
import UserAgents from "./UserAgents.vue";
import { ref } from "vue";
import { showModal } from "../../utils/utils";
import Createagent from "../Modals/Createagent.vue";
// import Editagent from "../Modals/Editagent.vue";

const showActive = ref("dfy");
</script>
