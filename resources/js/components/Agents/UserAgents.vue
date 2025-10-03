<template>
    <div class="mt-5">
        <div class="flex items-center gap-4 px-3">
            <div class="w-[180px] relative">
                <button
                    @click.stop="toggleDropdown('dropdown')"
                    class="flex items-center justify-between gap-2 border border-[#2F2F30] p-3 rounded-[14px] w-full"
                >
                    <p class="text-[15px] text-[#C6CCD8] font-normal">
                        Category
                    </p>
                    <img src="/assets/icons/arrow-down.svg" />
                </button>

                <ul
                    v-if="openDropdown === 'dropdown'"
                    class="bg-[#363739] mt-2 text-[14px] z-50 absolute font-normal text-white px-2 py-1 rounded-[8px]"
                >
                    <li class="hover:bg-[#38334F] p-2 rounded-[8px]">All</li>
                    <li class="hover:bg-[#38334F] p-2 rounded-[8px]">Sales</li>
                    <li class="hover:bg-[#38334F] p-2 rounded-[8px]">
                        Socials
                    </li>
                    <li class="hover:bg-[#38334F] p-2 rounded-[8px]">
                        Marketing
                    </li>
                    <li class="hover:bg-[#38334F] p-2 rounded-[8px]">
                        Customer Services
                    </li>
                </ul>
            </div>

            <div class="relative w-full max-w-md">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search Agents..."
                    class="w-full bg-transparent font-normal text-gray-300 placeholder-gray-400 pl-10 pr-4 py-3 rounded-xl border border-[#2F2F30] focus:border-[#2F2F30] focus:outline-none focus:ring-0"
                />

                <img
                    src="/assets/icons/search.svg"
                    class="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5"
                />
            </div>
        </div>

        <div class="grid grid-cols-4 items-start gap-5 mt-7 px-3 flow">
            <div
                class="bg-[#202123] p-4 rounded-[16px] relative"
                v-for="agents in filteredList"
                :key="agents.id"
            >
                <span class="flex items-start justify-between">
                    <!-- <img :src="agents.agent_image" /> -->
                    <img
                        :src="cleanUrl(agents.agent_image)"
                        class="rounded-full w-[80px] h-[80px]"
                    />

                    <button @click.stop="toggleDropdown(agents.id)">
                        <img src="/assets/icons/dot.svg" alt="" />
                    </button>
                </span>

                <Editagent
                    :agent="agents"
                    :modal-id="'editAgent' + agents.id"
                    @updated="agentsList"
                ></Editagent>

                <ul
                    v-if="openDropdown === agents.id"
                    tabindex="-1"
                    class="bg-[#262729] absolute right-10 top-6 p-2 max-w-[164px] rounded-md font-normal"
                >
                    <li
                        @click="showModal('editAgent' + agents.id)"
                        class="flex items-center gap-2 hover:bg-[#38334F] p-2 rounded-md cursor-pointer"
                    >
                        <img src="/assets/icons/edit.svg" />
                        <p class="text-[14px]">Edit</p>
                    </li>

                    <li
                        class="flex items-center gap-2 hover:bg-[#38334F] p-2 rounded-md cursor-pointer"
                        @click="duplicateAgent(agents.id)"
                    >
                        <img src="/assets/icons/duplicate.svg" />
                        <p class="text-[14px]">Duplicate</p>
                    </li>

                    <li
                        class="flex items-center gap-2 hover:bg-[#38334F] p-2 rounded-md cursor-pointer"
                        @click="buildAgent(agents.id)"
                    >
                        <img src="/assets/icons/recall.svg" />
                        <p class="text-[14px] text-[#24B26B]">Build</p>
                    </li>

                    <li
                        @click="showModal('delete' + agents.id)"
                        class="flex items-center gap-2 hover:bg-[#38334F] p-2 rounded-md cursor-pointer"
                    >
                        <img src="/assets/icons/delete.svg" />
                        <p class="text-[14px] text-[#FF6640]">Delete</p>
                    </li>
                </ul>

                <h3 class="text-[20px] font-medium pt-4">
                    {{ agents.name }}
                </h3>

                <p class="text-[#9E9E9E] font-normal text-[14px] pt-3">
                    {{ agents.description }}
                </p>

                <div class="flex flex-col items-center mt-3 w-full">
                    <Btn title="Run Agent" class="!w-full"></Btn>
                </div>

                <div
                    class="backdrop hidden"
                    @click.self="close_modal(['delete' + agents.id])"
                    :id="`delete${agents.id}`"
                >
                    <div class="modal">
                        <span class="flex items-center justify-between">
                            <p class="text-[20px] font-semibold">
                                Deleting Content
                            </p>
                            <button
                                @click.self="
                                    close_modal(['delete' + agents.id])
                                "
                            >
                                <img src="/assets/icons/x.svg" />
                            </button>
                        </span>

                        <p class="text-base font-normal mt-8">
                            Are you sure you want to Delete this Content?
                        </p>

                        <div class="flex justify-end items-center gap-3 mt-5">
                            <Btn
                                title="Cancel"
                                class="!bg-transparent"
                                @click.self="close_modal(['delete'])"
                            ></Btn>
                            <Btn
                                title="Delete"
                                class="!bg-[#b81d1c]"
                                @click="deleteAgent(agents.id)"
                            ></Btn>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <Createagent :refreshAgents="agentsList"></Createagent> -->
</template>

<script setup>
import Btn from "../Atoms/Button.vue";

import api from "../../lib/api_functions";
import { ref, onMounted, onBeforeUnmount, computed } from "vue";
import { showModal, close_modal } from "../../utils/utils";
import Editagent from "../Modals/Editagent.vue";
// import Createagent from "../Modals/Createagent.vue";

const cleanUrl = (url) =>
    url ? url.replace(/^"|"$/g, "").replace(/\\/g, "") : "";

const list = ref([]);
const searchQuery = ref("");

const openDropdown = ref(null);
function toggleDropdown(id) {
    openDropdown.value = openDropdown.value === id ? null : id;
}
function handleClickOutside(e) {
    // Close dropdown if clicked outside of any
    if (!e.target.closest("ul") && !e.target.closest("button")) {
        openDropdown.value = null;
    }
}

const agentsList = async () => {
    try {
        const res = await api.listAgents();
        if (res && res.data) {
            list.value = res.data
                // .filter(
                //     (agent) =>
                //         agent.agent_type === "personal" ||
                //         agent.agent_type === "dfy"
                // )
                .map((agent) => ({
                    ...agent,
                    agent_image: cleanUrl(agent.agent_image),
                }));
        }
    } catch (err) {
        console.log(err);
    }
};

const deleteAgent = async (id) => {
    const res = await api.deleteAgents(id);
    if (res) {
        list.value = list.value.filter((agent) => agent.id !== id);
    }
};

const duplicateAgent = async (id) => {
    const res = await api.duplicateAgents(id);
    if (res) {
        list.value.push(res.data);
    }
};

// Computed property: filters list whenever searchQuery changes
const filteredList = computed(() => {
    if (!searchQuery.value) return list.value; // if empty search, show all

    return list.value.filter(
        (agent) =>
            agent.name
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase()) ||
            agent.description
                .toLowerCase()
                .includes(searchQuery.value.toLowerCase())
    );
});

function buildAgent(agentId) {
    window.location.href = `/dashboard/agents/builder/${agentId}`;
}

onMounted(() => {
    agentsList();
    document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.flow {
    height: calc(100vh - 340px);
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
