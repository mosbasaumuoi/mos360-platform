import {

    RUNTIME_EVENT_TYPES

}

    from "./runtimeSessionEventEngine";

// ============================================
// COUNT EVENTS
// ============================================

export function countRuntimeEvents(

    session = {}

) {

    const events =

        Array.isArray(
            session.interactionEvents
        )

            ? session.interactionEvents

            : [];

    return events.length;
}

// ============================================
// COUNT EVENT TYPE
// ============================================

export function countRuntimeEventType({

    session = {},

    type

}) {

    const events =

        Array.isArray(
            session.interactionEvents
        )

            ? session.interactionEvents

            : [];

    return events.filter(

        (event) =>

            event.type === type
    ).length;
}

// ============================================
// SESSION ENGAGEMENT
// ============================================

export function calculateSessionEngagement(

    session = {}

) {

    const totalEvents =

        countRuntimeEvents(
            session
        );

    const blockInteractions =

        countRuntimeEventType({

            session,

            type:
                "interaction"
        });

    const checkpoints =

        countRuntimeEventType({

            session,

            type:
                "checkpoint"
        });

    return {

        totalEvents,

        blockInteractions,

        checkpoints,

        engagementLevel:

            totalEvents >= 20

                ? "high"

                : totalEvents >= 8

                    ? "medium"

                    : "low"
    };
}

// ============================================
// VALID EVENT TYPE
// ============================================

export function isValidRuntimeEventType(

    type

) {

    return RUNTIME_EVENT_TYPES.includes(
        type
    );
}