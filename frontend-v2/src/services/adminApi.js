import {
    apiGet
}
    from "./api.js";

export async function getAnalytics() {

    return apiGet(
        "/analytics"
    );
}