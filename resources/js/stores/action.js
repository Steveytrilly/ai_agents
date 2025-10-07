// stores/action.js
import { defineStore } from "pinia";
import { ref } from "vue";
import api from "../lib/axios_global";

export const useActionsStore = defineStore("actions", () => {
    // Full state object
    const actionsState = ref({
        agent_id: null,
        active: true,
        action_data: [], // <-- array of action objects
        variables: {}, // <-- output variables
        action_type: "default",
    });

    const actionSummaries = ref([]);

    function setAgentId(id) {
        actionsState.value.agent_id = id;
    }

    // Load summaries from localStorage
    const storedSummaries = localStorage.getItem("actionSummaries");
    if (storedSummaries) actionSummaries.value = JSON.parse(storedSummaries);

    // Default action template
    function newActionTemplate(type) {
        return {
            action: type,
            input_type: "",
            user_prompt: "",
            default_value: "",
            options: "",
            required: true,
            output_variable: "",
            active: true,
        };
    }

    // Add a new action
    function addAction(action = null) {
        const newAct = action || newActionTemplate();
        actionsState.value.action_data.push(newAct);

        // Track output variable
        if (newAct.output_variable) {
            if (!actionsState.value.variables[newAct.output_variable]) {
                actionsState.value.variables[newAct.output_variable] = "";
            }
        }

        // Generate summary
        const summary = generateSummary(newAct);
        actionSummaries.value.push(summary);
        localStorage.setItem(
            "actionSummaries",
            JSON.stringify(actionSummaries.value)
        );
    }

    function generateSummary(action) {
        if (action.action === "get_user_input") {
            return `Get user input type ${
                action.input_type || "unknown"
            } with prompt "${action.user_prompt || ""}" and save to "${
                action.output_variable || ""
            }"`;
        }
        if (action.action === "get_user_list") {
            return `Get user list with prompt "${
                action.user_prompt || ""
            }" and save to "${action.output_variable || ""}"`;
        }
        return "Unknown action";
    }

    // Delete action
    async function deleteAction(index) {
        const removed = actionsState.value.action_data.splice(index, 1)[0];
        actionSummaries.value.splice(index, 1);

        // Rebuild variables if needed
        if (removed?.output_variable) {
            delete actionsState.value.variables[removed.output_variable];
        }

        // Update local storage (optional)
        localStorage.setItem(
            "actionSummaries",
            JSON.stringify(actionSummaries.value)
        );

        // Send updated array to backend
        try {
            const res = await api.post("/build/ai-agent", actionsState.value);
            console.log("Backend updated after delete:", res.data);
        } catch (err) {
            console.error("Error updating backend after delete:", err);
        }
    }

    // Submit full action state to backend
    async function submitActions() {
        if (!actionsState.value.agent_id)
            throw new Error("agent_id is required");

        // const payload = {
        //     ...actionsState.value,
        //     action_data: JSON.stringify(actionsState.value.action_data),
        // };

        try {
            const res = await api.post("/build/ai-agent", actionsState.value);
            return res.data;
        } catch (err) {
            console.error("Error submitting actions:", err);
            throw err;
        }
    }

    // async function fetchAgentActions(agentId) {
    //     try {
    //         const res = await api.get(`/ai-agent/${agentId}`);
    //         const agentData = res.data.data;

    //         actionsState.value.agent_id = agentData.id;
    //         actionsState.value.action_data = agentData.actions || [];

    //         // Rebuild summaries
    //         actionSummaries.value = actionsState.value.action_data.map((a) =>
    //             generateSummary(a)
    //         );

    //         console.log("Store hydrated from API:", actionsState.value);
    //     } catch (err) {
    //         console.error("Error fetching agent actions:", err);
    //     }
    // }

    return {
        actionsState,
        actionSummaries,
        addAction,
        deleteAction,
        generateSummary,
        submitActions,
        newActionTemplate,
        setAgentId,
    };
});
