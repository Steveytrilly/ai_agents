import { API_URL, APP_VERSION } from "./app_constants";
const apiUrl = API_URL;
const appVersion = APP_VERSION;
const apiRoute = "/api/";
const baseURL = apiUrl + apiRoute + appVersion;

async function get(path, headers) {
    return await axios.get(baseURL + path, headers);
}

async function post(path, data) {
    return await axios.post(baseURL + path, data);
}

//const put = (path, data) => axios.put(baseURL + path, data);

async function getNoApi(path, headers) {
    return await axios.get(apiUrl + path, headers);
}

export default {
    get,
    post,
    getNoApi,
    // put,
};
