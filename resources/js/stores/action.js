import { defineStore } from "pinia";
import { ref, watch } from "vue";
import api from "../lib/axios_global";
import { dialog } from "../utils/dialog";

export const useActionsStore = defineStore("actions", () => {
    // ---------- STATE ----------
    const actionsState = ref({
        agent_id: null,
        active: true,
        action_data: [],
        variables: [], // tracks all used output_variable names
        // action_type: "default",
    });

    const actionSummaries = ref([]);

    // ---------- INIT: LOAD FROM LOCALSTORAGE ----------
    const storedActions = localStorage.getItem("actionsState");
    if (storedActions) {
        actionsState.value = JSON.parse(storedActions);
    }

    const storedSummaries = localStorage.getItem("actionSummaries");
    if (storedSummaries) {
        actionSummaries.value = JSON.parse(storedSummaries);
    }

    // ---------- HELPERS ----------
    function setAgentId(id) {
        actionsState.value.agent_id = id;
    }

    function newActionTemplate(type) {
        return {
            action: type,
            input_type: "",
            user_prompt: "",
            default_value: "",
            options: "",
            list_delimeter: "",
            required: true,
            output_variable: "",
            message_to_user: "",
            active: true,
        };
    }

    function formatVariableName(name) {
        return name
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "_")
            .replace(/[^\w_]/g, "");
    }

    // Ensure variables rebuild correctly after reload
    function rebuildVariables() {
        const vars = {};
        actionsState.value.action_data.forEach((act) => {
            if (act.output_variable) vars[act.output_variable] = "";
        });
        actionsState.value.variables = vars;
    }

    // Call once on load
    rebuildVariables();

    // ---------- MAIN ACTIONS ----------
    function addAction(action = null) {
        const newAct = action || newActionTemplate();

        if (newAct.output_variable) {
            const formattedVar = formatVariableName(newAct.output_variable);

            // Check for duplicate
            if (actionsState.value.variables[formattedVar]) {
                alert("Output variable must be unique");
                return false;
            }

            // Save formatted variable
            newAct.output_variable = formattedVar;
            actionsState.value.variables[formattedVar] = "";
        }

        actionsState.value.action_data.push(newAct);

        // Generate summary
        const summary = generateSummary(newAct);
        actionSummaries.value.push(summary);

        persistState();
    }

    function updateAction(index, updatedAction) {
        if (updatedAction.output_variable) {
            const formattedVar = formatVariableName(
                updatedAction.output_variable
            );

            const isDuplicate =
                Object.keys(actionsState.value.variables).includes(
                    formattedVar
                ) &&
                actionsState.value.action_data[index].output_variable !==
                    formattedVar;

            if (isDuplicate) {
                alert("Output variable must be unique");
                return false;
            }

            // Remove old variable
            const oldVar =
                actionsState.value.action_data[index].output_variable;
            if (oldVar && oldVar !== formattedVar) {
                delete actionsState.value.variables[oldVar];
            }

            updatedAction.output_variable = formattedVar;
            actionsState.value.variables[formattedVar] = "";
        }

        actionsState.value.action_data[index] = { ...updatedAction };
        actionSummaries.value[index] = generateSummary(updatedAction);

        persistState();
    }

    async function deleteAction(index) {
        const removed = actionsState.value.action_data.splice(index, 1)[0];
        actionSummaries.value.splice(index, 1);

        // Remove from variables
        if (removed?.output_variable) {
            delete actionsState.value.variables[removed.output_variable];
        }

        persistState();

        // Sync with backend (optional)
        try {
            const res = await api.post("/build/ai-agent", actionsState.value);
            console.log("Backend updated after delete:", res.data);
        } catch (err) {
            console.error("Error updating backend after delete:", err);
        }
    }

    async function submitActions() {
        if (!actionsState.value.agent_id)
            throw new Error("agent_id is required");

        const payload = {
            ...actionsState.value,
            action_data: JSON.stringify(actionsState.value.action_data),
        };

        try {
            const res = await api.post("/build/ai-agent", actionsState.value);
            return res.data;
        } catch (err) {
            console.error("Error submitting actions:", err);
            throw err;
        }
    }

    function generateSummary(action) {
        const summaryTemplates = {
            get_user_input: (a) => ({
                type: a.action,
                input_type: a.input_type || "unknown",
                user_prompt: a.user_prompt || "",
                output_variable: a.output_variable || "",
            }),
            get_list: (a) => ({
                type: a.action,
                user_prompt: a.user_prompt || "",
                output_variable: a.output_variable || "",
            }),
            contact_file_upload: (a) => ({
                type: a.action,
                user_prompt: a.user_prompt || "",
                output_variable: a.output_variable || "",
            }),
            knowledge_file_upload: (a) => ({
                type: a.action,
                user_prompt: a.user_prompt || "",
                output_variable: a.output_variable || "",
            }),
            user_confirmation: (a) => ({
                type: a.action,
                user_prompt: a.user_prompt || "",
            }),
        };
        const generator = summaryTemplates[action.action];
        return generator ? generator(action) : { type: "unknown" };
    }

    // ---------- PERSISTENCE ----------
    function persistState() {
        localStorage.setItem(
            "actionsState",
            JSON.stringify(actionsState.value)
        );
        localStorage.setItem(
            "actionSummaries",
            JSON.stringify(actionSummaries.value)
        );
    }

    // Automatically persist on any change
    watch(actionsState, () => persistState(), { deep: true });

    // ---------- EXPORT ----------
    return {
        actionsState,
        actionSummaries,
        addAction,
        deleteAction,
        updateAction,
        submitActions,
        newActionTemplate,
        generateSummary,
        formatVariableName,
        ensureUniqueVariable: formatVariableName, // kept for API compatibility
        setAgentId,
    };
});
