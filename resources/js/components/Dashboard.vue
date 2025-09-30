<template>
    <section class="bg-surfaceA rounded-[14px] py-5 overflow-x-hidden">
        <div class="overflow-y-auto overflow">
            <div
                class="grid grid-cols-3 max-[878px]:grid-cols-1 items-start gap-8 justify-between px-5 max-sm:px-1"
            >
                <div class="col-span-2 shadowed">
                    <iframe
                        class="flex-shrink-0 w-full h-[400px]"
                        src="https://www.youtube-nocookie.com/embed/zfpD0rbY8Vs?si=SZDDyXldvql6q_j3&rel=0"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin"
                        allowfullscreen
                    ></iframe>

                    <!--
                    <div
                        class="flex items-center justify-center gap-10 -mt-4 -mb-4"
                    >
                        <p
                            class="text-white text-[28px] font-semibold text-cut pt-8"
                        >
                            Getting started with AI business that will
                            kick-start your...
                        </p>
                    </div> -->
                </div>

                <div class="shadowed rounded-[14px] w-full col-span-1">
                    <div
                        class="flex items-center justify-between max-[878px]:hidden"
                    >
                        <h4 class="text-white text-[22px] font-bold">
                            Chat History
                        </h4>

                        <!-- sdsds -->

                        <!-- <ChatToggle></ChatToggle> -->
                    </div>

                    <div class="flex items-center justify-center">
                        <div>
                            <img
                                src="/assets/icons/historybot.svg"
                                alt=""
                                class="w-[319px] h-[319px]"
                            />

                            <p
                                class="text-white text-[20px] text-center leading-8 font-medium pt-10"
                            >
                                You Have Not Created An Agent Yet!
                            </p>

                            <Btn
                                title="Create AI Agent"
                                class="mx-auto mt-3"
                            ></Btn>
                        </div>
                    </div>

                    <!-- <History
                        class="history h-[300px] overflow-y-auto max-[878px]:hidden"
                        v-if="history.state.content"
                    ></History> -->
                </div>
            </div>

            <!------- BUTTONS ------->
            <div class="px-[14px] py-5 max-sm:px-0">
                <div
                    class="grid grid-cols-3 max-[568px]:grid-cols-1 justify-between gap-5 items-center bg-life rounded-[14px] max-sm:rounded-none max-sm:bg-transparent px-7 py-3 max-sm:px-1"
                >
                    <a
                        class="bg-[#5E4DCF] cursor-pointer text-[22px] text-center no-underline max-[858px]:text-[18px] font-bold flex-1 border-0 text-white rounded-[10px] px-[30px] py-[25px]"
                        href="/dashboard/agents"
                    >
                        Create AI Agent
                    </a>

                    <a
                        class="bg-[#EC4899] no-underline cursor-pointer grad text-[22px] max-[858px]:text-[18px] text-center font-bold flex-1 border-0 text-white rounded-[10px] px-[20px] py-[25px]"
                        href="https://support.bizbudd.ai/"
                        target="_blank"
                    >
                        Video Library
                    </a>

                    <a
                        class="bg-[#684F76] no-underline cursor-pointer text-[22px] max-[858px]:text-[18px] text-center font-bold flex-1 border-0 text-white rounded-[10px] px-[20px] py-[25px]"
                        href="https://support.bizbudd.ai/"
                        target="_blank"
                    >
                        Knowledge base
                    </a>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import Btn from "./Atoms/Button.vue";
</script>

<style scoped>
* {
    scroll-behavior: smooth;
}
.text-cut {
    width: 700px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.grad {
    background: var(
        --budd-color-purple-pink,
        linear-gradient(138deg, #705cf6 15.96%, #ec4899 166.51%)
    );
    backdrop-filter: blur(5px);
}

.overflow::-webkit-scrollbar {
    width: 2px;
}

@media only screen and (min-width: 680px) {
    .overflow {
        height: calc(100vh - 136px);
    }
}

.shadowed {
    box-shadow: 0px 20px 30px -18px rgba(0, 0, 0, 0.25);
    border-radius: 14x;
}

.history::-webkit-scrollbar-track {
    display: none;
}
</style>
