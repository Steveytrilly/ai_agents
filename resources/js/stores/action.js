// // stores/action.js
// import { defineStore } from "pinia";
// import { ref } from "vue";
// import api from "../lib/axios_global";

// export const useActionsStore = defineStore("actions", () => {
//     // Full state object
//     const actionsState = ref({
//         agent_id: null,
//         active: true,
//         action_data: [], // <-- array of action objects
//         variables: {}, // <-- output variables
//         action_type: "default",
//     });

//     const actionSummaries = ref([]);

//     function setAgentId(id) {
//         actionsState.value.agent_id = id;
//     }

//     // Load summaries from localStorage
//     const storedSummaries = localStorage.getItem("actionSummaries");
//     if (storedSummaries) actionSummaries.value = JSON.parse(storedSummaries);

//     // Default action template
//     function newActionTemplate(type) {
//         return {
//             action: type,
//             input_type: "",
//             user_prompt: "",
//             default_value: "",
//             options: "",
//             required: true,
//             output_variable: "",
//             active: true,
//         };
//     }

//     function formatVariableName(name) {
//         return name
//             .trim()
//             .toLowerCase()
//             .replace(/\s+/g, "_")
//             .replace(/[^\w_]/g, "");
//     }

//     function ensureUniqueVariable(name) {
//         let formatted = formatVariableName(name);
//         let counter = 1;
//         while (actionsState.value.variables[formatted]) {
//             formatted = `${formatVariableName(name)}_${counter}`;
//             counter++;
//         }
//         return formatted;
//     }

//     // Add a new action
//     // function addAction(action = null) {
//     //     const newAct = action || newActionTemplate();
//     //     actionsState.value.action_data.push(newAct);

//     //     // Check uniqueness BEFORE adding
//     //     if (newAct.output_variable) {
//     //         const formattedVar = formatVariableName(newAct.output_variable);

//     //         if (actionsState.value.variables[formattedVar]) {
//     //             alert("Output variable must be unique"); // <-- alert user
//     //             return false; // <-- prevent adding
//     //         }

//     //         newAct.output_variable = formattedVar; // <-- format variable
//     //         actionsState.value.variables[formattedVar] = ""; // track it
//     //     }

//     //     // Track output variable
//     //     if (newAct.output_variable) {
//     //         if (!actionsState.value.variables[newAct.output_variable]) {
//     //             actionsState.value.variables[newAct.output_variable] = "";
//     //         }
//     //     }

//     //     // Generate summary
//     //     const summary = generateSummary(newAct);
//     //     actionSummaries.value.push(summary);
//     //     localStorage.setItem(
//     //         "actionSummaries",
//     //         JSON.stringify(actionSummaries.value)
//     //     );
//     // }

//     function addAction(action = null) {
//         const newAct = action || newActionTemplate();

//         // Check uniqueness BEFORE adding
//         if (newAct.output_variable) {
//             const formattedVar = formatVariableName(newAct.output_variable);

//             if (actionsState.value.variables[formattedVar]) {
//                 alert("Output variable must be unique"); // <-- alert user
//                 return false; // <-- prevent adding
//             }

//             newAct.output_variable = formattedVar; // <-- format variable
//             actionsState.value.variables[formattedVar] = ""; // track it
//         }

//         actionsState.value.action_data.push(newAct);

//         // Generate summary
//         const summary = generateSummary(newAct);
//         actionSummaries.value.push(summary);
//         localStorage.setItem(
//             "actionSummaries",
//             JSON.stringify(actionSummaries.value)
//         );
//     }

//     function generateSummary(action) {
//         const summaryTemplates = {
//             get_user_input: (a) => ({
//                 type: a.action,
//                 input_type: a.input_type || "unknown",
//                 user_prompt: a.user_prompt || "",
//                 output_variable: a.output_variable || "",
//             }),

//             get_list: (a) => ({
//                 type: a.action,
//                 user_prompt: a.user_prompt || "",
//                 output_variable: a.output_variable || "",
//             }),
//         };

//         const generator = summaryTemplates[action.action];
//         return generator ? generator(action) : { type: "unknown" };
//     }

//     // function generateSummary(action) {
//     //     if (action.action === "get_user_input") {
//     //         return `Get user input type ${
//     //             action.input_type || "unknown"
//     //         } with prompt "${action.user_prompt || ""}" and save to "${
//     //             action.output_variable || ""
//     //         }"`;
//     //     }
//     //     if (action.action === "get_user_list") {
//     //         return `Get user list with prompt "${
//     //             action.user_prompt || ""
//     //         }" and save to "${action.output_variable || ""}"`;
//     //     }
//     //     return "Unknown action";
//     // }

//     // Delete action
//     async function deleteAction(index) {
//         const removed = actionsState.value.action_data.splice(index, 1)[0];
//         actionSummaries.value.splice(index, 1);

//         // Rebuild variables if needed
//         if (removed?.output_variable) {
//             delete actionsState.value.variables[removed.output_variable];
//         }

//         // Update local storage (optional)
//         localStorage.setItem(
//             "actionSummaries",
//             JSON.stringify(actionSummaries.value)
//         );

//         // Send updated array to backend
//         try {
//             const res = await api.post("/build/ai-agent", actionsState.value);
//             console.log("Backend updated after delete:", res.data);
//         } catch (err) {
//             console.error("Error updating backend after delete:", err);
//         }
//     }

//     // Submit full action state to backend
//     async function submitActions() {
//         if (!actionsState.value.agent_id)
//             throw new Error("agent_id is required");

//         // const payload = {
//         //     ...actionsState.value,
//         //     action_data: JSON.stringify(actionsState.value.action_data),
//         // };

//         try {
//             const res = await api.post("/build/ai-agent", actionsState.value);
//             return res.data;
//         } catch (err) {
//             console.error("Error submitting actions:", err);
//             throw err;
//         }
//     }

//     // function updateAction(index, updatedAction) {
//     //     // Format and ensure unique output_variable
//     //     if (updatedAction.output_variable) {
//     //         updatedAction.output_variable = ensureUniqueVariable(
//     //             updatedAction.output_variable
//     //         );
//     //         actionsState.value.variables[updatedAction.output_variable] = "";
//     //     }

//     //     // Replace the old one
//     //     actionsState.value.action_data[index] = { ...updatedAction };

//     //     // Update its summary
//     //     actionSummaries.value[index] = generateSummary(updatedAction);

//     //     // Sync localStorage
//     //     localStorage.setItem(
//     //         "actionSummaries",
//     //         JSON.stringify(actionSummaries.value)
//     //     );

//     //     // submitActions();
//     // }

//     function updateAction(index, updatedAction) {
//         // Check uniqueness BEFORE updating
//         if (updatedAction.output_variable) {
//             const formattedVar = formatVariableName(
//                 updatedAction.output_variable
//             );

//             const isDuplicate =
//                 Object.keys(actionsState.value.variables).includes(
//                     formattedVar
//                 ) &&
//                 actionsState.value.action_data[index].output_variable !==
//                     formattedVar;

//             if (isDuplicate) {
//                 alert("Output variable must be unique"); // <-- alert user
//                 return false; // <-- prevent update
//             }

//             // Remove old variable from tracking
//             const oldVar =
//                 actionsState.value.action_data[index].output_variable;
//             if (oldVar && oldVar !== formattedVar) {
//                 delete actionsState.value.variables[oldVar];
//             }

//             updatedAction.output_variable = formattedVar;
//             actionsState.value.variables[formattedVar] = "";
//         }

//         // Replace the old action
//         actionsState.value.action_data[index] = { ...updatedAction };

//         // Update summary
//         actionSummaries.value[index] = generateSummary(updatedAction);

//         // Sync localStorage
//         localStorage.setItem(
//             "actionSummaries",
//             JSON.stringify(actionSummaries.value)
//         );
//     }

//     return {
//         actionsState,
//         actionSummaries,
//         addAction,
//         deleteAction,
//         generateSummary,
//         submitActions,
//         newActionTemplate,
//         setAgentId,
//         updateAction,
//         formatVariableName,
//         ensureUniqueVariable,
//     };
// });

// stores/action.js
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
        variables: {}, // tracks all used output_variable names
        action_type: "default",
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
