import {
    apiPost
}
    from "./api.js";

import {
    EVENT_TYPES
}
    from "../constants/eventTypes.js";

// ============================================
// SEND TRACKING EVENT
// ============================================

export async function sendTrackingEvent(
    event
) {

    // ========================================
    // EVENT VALIDATION
    // ========================================

    if (

        !Object.values(
            EVENT_TYPES
        ).includes(
            event.type
        )

    ) {

        console.error(

            "[MOS360:TRACKING]",

            "Invalid frontend event",

            event
        );

        return {
            ok: false
        };
    }

    // ========================================
    // TRACE
    // ========================================

    console.log(

        "[MOS360:TRACKING:SEND]",

        event.type,

        event
    );

    // ========================================
    // API
    // ========================================

    return apiPost(
        "/tracking/event",
        event,
        {
            silent: true
        }
    );
}