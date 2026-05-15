import { json }
    from "../../utils/response.js";

import {
    trackEvent
}
    from "./tracking.service.js";

import {
    EVENT_TYPES
}
    from "./tracking.events.js";    

export async function handleTrackEvent(
    request,
    env
) {

    try {

        const body =
            await request.json();

        // ========================================
        // EVENT TYPE VALIDATION
        // ========================================

        if (

            !Object.values(
                EVENT_TYPES
            ).includes(
                body.type
            )

        ) {

            return json(
                "Invalid event type",
                400
            );
        }    

        console.log(

            "[MOS360:TRACKING]",

            body.type,

            body

        );

        const event =
            await trackEvent(
                env,
                body
            );

        return json(event);

    } catch (error) {

        return json(
            error.message,
            500
        );
    }
}