<template>
    <div class="mt-5">
        <div class="flex items-start gap-4">
            <div class="w-[180px]">
                <span
                    @click="dropDown = true"
                    class="flex items-center justify-between gap-2 border border-[#2F2F30] p-2 rounded-[14px] w-full"
                >
                    <p class="text-[15px] text-[#C6CCD8] font-normal">
                        Category
                    </p>
                    <img src="/public/assets/icons/arrow-down.svg" alt="" />
                </span>

                <ul
                    v-if="dropDown"
                    class="bg-[#363739] mt-2 text-[14px] font-normal text-white px-2 py-1 rounded-[8px]"
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

            <div
                class="flex items-center w-[180px] p-2 gap-2 border border-[#2F2F30] rounded-[14px]"
            >
                <p class="text-[15px] text-[#C6CCD8] font-normal">Category</p>
                <img src="/public/assets/icons/arrow-down.svg" alt="" />
            </div>
        </div>

        <div class="grid grid-cols-4 gap-5 mt-7">
            <div
                class="bg-[#202123] p-4 rounded-[16px] relative"
                v-for="agents in list"
                :key="agents.id"
            >
                <span class="flex items-center justify-between">
                    <img :src="agents.agent_image" />
                    <button
                        :id="`dropdownDefaultButton-${agents.id}`"
                        :data-dropdown-toggle="`dropdown-${agents.id}`"
                    >
                        <img src="/public/assets/icons/dot.svg" alt="" />
                    </button>
                </span>

                <Editagent
                    :agent="agents"
                    :modal-id="'editAgent' + agents.id"
                    @updated="agentsList"
                ></Editagent>

                <ul
                    :id="`dropdown-${agents.id}`"
                    :aria-labelledby="`dropdownDefaultButton-${agents.id}`"
                    class="bg-[#262729] p-2 max-w-[164px] hidden rounded-md font-normal"
                >
                    <li
                        @click="showModal('editAgent' + agents.id)"
                        class="flex items-center gap-2 hover:bg-[#38334F] p-2 rounded-md cursor-pointer"
                    >
                        <img src="/public/assets/icons/edit.svg" />
                        <p class="text-[14px]">Edit</p>
                    </li>

                    <li
                        class="flex items-center gap-2 hover:bg-[#38334F] p-2 rounded-md cursor-pointer"
                        @click="duplicateAgent(agents.id)"
                    >
                        <img src="/public/assets/icons/duplicate.svg" />
                        <p class="text-[14px]">Duplicate</p>
                    </li>

                    <li
                        class="flex items-center gap-2 hover:bg-[#38334F] p-2 rounded-md cursor-pointer"
                    >
                        <img src="/public/assets/icons/recall.svg" />
                        <p class="text-[14px] text-[#24B26B]">Build</p>
                    </li>

                    <li
                        @click="showModal('delete')"
                        class="flex items-center gap-2 hover:bg-[#38334F] p-2 rounded-md cursor-pointer"
                    >
                        <img src="/public/assets/icons/delete.svg" />
                        <p class="text-[14px] text-[#FF6640]">Delete</p>
                    </li>
                </ul>

                <h3 class="text-[20px] font-medium pt-2">
                    {{ agents.name }}
                </h3>

                <p class="text-[#9E9E9E] font-normal text-[14px] pt-3">
                    {{ agents.description }}
                </p>

                <div class="flex flex-col items-center mt-3 w-full">
                    <Btn title="Use Agent" class="!w-full"></Btn>
                </div>

                <div
                    class="backdrop hidden"
                    @click.self="close_modal(['delete'])"
                    id="delete"
                >
                    <div class="modal">
                        <span class="flex items-center justify-between">
                            <p class="text-[20px] font-semibold">
                                Deleting Content
                            </p>
                            <button @click.self="close_modal(['delete'])">
                                <img src="/public/assets/icons/x.svg" />
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
</template>

<script setup>
import Btn from "../Atoms/Button.vue";

import api from "../../lib/api_functions";
import { ref, onMounted } from "vue";
import { showModal, close_modal } from "../../utils/utils";
import Editagent from "../Modals/Editagent.vue";

const dropDown = ref(false);
const list = ref([]);

const agentsList = async () => {
    try {
        const res = await api.listAgents();
        if (res) {
            list.value = res.data;
        }
    } catch (error) {
        console.log(error);
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

// const ages = [12, 13, 14, 15, 17, 18, 22];

// const test = ages.filter((age) => {
//     return age > 13;
// });

// console.log(test);

onMounted(() => {
    agentsList();
});
</script>

<style scoped>
#app [id^="dropdown-"] {
    position: absolute !important;
    inset: auto !important;
    transform: none !important;
    bottom: 20px !important; /* adjust manually */
    right: 1.5rem !important;
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
