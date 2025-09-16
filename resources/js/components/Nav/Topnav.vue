<template>
    <div
        class="border border-[#424347] topbar max-[861px]:hidden max-[861px]:-ml-[80px] left-[80px] md:left-[110px] max-[861px]:-mt-[70px] right-2 fixed top-2 bg-border rounded-2xl shadow-inner p-4 mb-4 z-50"
    >
        <div class="flex items-center justify-between">
            <span class="flex items-center gap-3">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="26"
                    height="20"
                    viewBox="0 0 26 20"
                    fill="none"
                >
                    <path
                        d="M22.0225 9.16676V10.8334L8.12513 10.8334L11.6379 13.5355L10.1058 14.714L3.97754 10L10.1058 5.28595L11.6379 6.46446L8.12488 9.16676L22.0225 9.16676Z"
                        fill="white"
                    />
                </svg>
                <h1 class="text-[20px] font-semibold">{{ props.title }}</h1>
            </span>

            <div class="flex gap-8 items-center">
                <ul class="text-base flex items-center gap-4">
                    <li>Total Credit: 10000</li>
                    <li>Reseller</li>
                    <li>Whitelabel</li>
                    <li>Support</li>
                </ul>

                <ul class="flex items-center gap-5">
                    <li>
                        <img src="/public/assets/icons/setting.svg" />
                    </li>
                    <li>
                        <img src="/public/assets/icons/notification.svg" />
                    </li>

                    <li class="border-l border-[#424347] pl-5">
                        <img src="/public/assets/icons/avatar.svg" />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script setup>
// Receive the title from Blade
const props = defineProps({
    title: String,
});
</script>
