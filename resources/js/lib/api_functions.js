import ax from "./axios_global";

function handleError(e) {
    if (e.response.data.restriction) {
        restrict.open(1, e.response.data.message);
        return 204;
    }
    // dialog.toastError(e.response.data.message);
    return 204;
}

async function createAgent(x) {
    return await ax
        .post("/create/ai-agent", x)
        .then((res) => res.data)
        .catch((e) => handleError(e));
}

async function listAgents() {
    return await ax
        .get("/ai-agents")
        .then((res) => res.data)
        .catch((e) => handleError(e));
}

async function deleteAgents(id) {
    return await ax
        .post("/delete/ai-agent", { agent_id: id })
        .then((res) => res.data)
        .catch((e) => handleError(e));
}

async function duplicateAgents(id) {
    return await ax
        .post("/duplicate/ai-agent", { agent_id: id })
        .then((res) => res.data)
        .catch((e) => handleError(e));
}

async function editAgents(form) {
    return await ax
        .post("/edit/ai-agent", form, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => res.data)
        .catch((e) => handleError(e));
}

export default {
    createAgent,
    listAgents,
    deleteAgents,
    duplicateAgents,
    editAgents,
};
