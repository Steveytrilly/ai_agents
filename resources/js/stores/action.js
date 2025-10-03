// src/stores/actions.js
import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../lib/axios_global";

export const useActionsStore = defineStore("actions", () => {
    // Master state
    const actions = ref({
        agent_id: null, // required before sending
        active: true, // default to true
        action_data: [], // backend’s expected structure
        variables: {}, // local map of output variables
    });

    function setAgentId(id) {
        actions.value.agent_id = id;
    }

    // Add a new action
    function addAction(action) {
        actions.value.action_data.push(action);
        // register variable
        if (action.output_variable) {
            actions.value.variables[action.output_variable] = "";
        }
    }

    // Remove an action
    // function removeAction(index) {
    //     const removed = actions.value.action_data.splice(index, 1)[0];
    //     if (removed?.output_variable) {
    //         delete actions.value.variables[removed.output_variable];
    //     }
    // }

    // Reset all
    // function resetActions() {
    //     actions.value = {
    //         agent_id: null,
    //         active: true,
    //         action_data: [],
    //         variables: {},
    //     };
    // }

    // S to backend
    async function submitAction(payload) {
        if (!payload.agent_id) {
            throw new Error("agent_id is required");
        }

        try {
            const res = await api.post("/build/ai-agent", payload);
            return res.data;
        } catch (err) {
            console.error("Error saving actions", err);
            throw err;
        }
    }

    return {
        actions,
        addAction,
        submitAction,
        setAgentId,
    };
});
