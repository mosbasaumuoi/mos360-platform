import { json }
    from "../../utils/response.js";

import {
    getAnalytics
}
    from "./analytics.service.js";

export async function handleAnalytics(
    request,
    env
) {

    try {

        const analytics =
            await getAnalytics(
                env
            );

        return json(analytics);

    } catch (error) {

        return json(
            error.message,
            500
        );
    }
}