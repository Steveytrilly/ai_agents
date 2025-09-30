// import moment from "moment";

export class funct {
    // Navigate to a URL
    static nav(x) {
        window.location.href = x;
    }

    // Go back or navigate based on "create" query parameter
    static back() {
        const create = funct.getQueryParam("create");
        create
            ? funct.nav("/dashboard/dfy/customize/" + funct.getPath())
            : window.history.back();
    }

    // Get the last segment of the current path
    static getPath() {
        const segments = window.location.pathname.split("/").filter(Boolean); // remove empty segments
        return segments[segments.length - 1] || ""; // return the **last segment** of the path
    }

    // Get a query parameter from the URL
    static getQueryParam(name) {
        const urlSearchParams = new URLSearchParams(window.location.search);
        return urlSearchParams.get(name);
    }

    // // Example: format datetime
    // static datetime(value) {
    //     return moment(value).format("lll");
    // }

    // // Example: format date
    // static date(value) {
    //     return moment(value).format("YYYY-MM-DD");
    // }
}
