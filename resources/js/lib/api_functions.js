import ax from "./axios_global";

function handleError(e) {
    if (e.response.data.restriction) {
        restrict.open(1, e.response.data.message);
        return 204;
    }
    dialog.toastError(e.response.data.message);
    return 204;
}

export default {};
