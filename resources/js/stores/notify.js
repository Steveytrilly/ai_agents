import { defineStore } from "pinia";
import { ref, watch, reactive, computed } from "vue";

export const useNotifyStore = defineStore("notify", () => {
    let notifications = ref([]);

    function PUSH_NOTIFICATION(notification) {
        notifications.value.push({
            ...notification,
            id: (Math.random().toString(36) + Date.now().toString(36)).substr(
                2
            ),
        });
    }

    function REMOVE_NOTIFICATION(notificationToRemove) {
        notifications.value = notifications.value.filter((notification) => {
            return notification.id != notificationToRemove.id;
        });
    }

    function successTxt(message) {
        PUSH_NOTIFICATION({
            type: "success",
            message,
        });
    }

    function errorTxt(message) {
        PUSH_NOTIFICATION({
            type: "error",
            message,
        });
    }

    return {
        notifications,
        PUSH_NOTIFICATION,
        REMOVE_NOTIFICATION,
        successTxt,
        errorTxt,
    };
});
