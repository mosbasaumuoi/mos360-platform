export const RUNTIME_EVENT_TYPES = [

    "block_enter",
    "block_exit",

    "interaction",

    "checkpoint",

    "pause",
    "resume",

    "complete",

    // ========================================
    // SEMANTIC EVENTS
    // ========================================

    "reinforcement",

    "continuity_recovery",

    "momentum_shift",

    "engagement_shift",

    "semantic_transition",

    "runtime_warning",

    "runtime_recovery"
];

// ============================================
// CREATE SESSION EVENT
// ============================================

export function createRuntimeEvent({

    type = "interaction",

    blockId = null,

    payload = {},

    metadata = {}

} = {}) {

    return {

        id:
            crypto.randomUUID(),

        type,

        blockId,

        payload,

        metadata,

        createdAt:
            Date.now()
    };
}

// ============================================
// PUSH SESSION EVENT
// ============================================

export function pushRuntimeEvent({

    session = {},

    event

}) {

    return {

        ...session,

        interactionEvents: [

            ...(session.interactionEvents || []),

            event
        ].slice(-200)
    };
}

// ============================================
// TRACK BLOCK ENTER
// ============================================

export function trackBlockEnter({

    session = {},

    blockId

}) {

    return pushRuntimeEvent({

        session,

        event:

            createRuntimeEvent({

                type:
                    "block_enter",

                blockId
            })
    });
}

// ============================================
// TRACK BLOCK EXIT
// ============================================

export function trackBlockExit({

    session = {},

    blockId

}) {

    return pushRuntimeEvent({

        session,

        event:

            createRuntimeEvent({

                type:
                    "block_exit",

                blockId
            })
    });
}

// ============================================
// TRACK REINFORCEMENT
// ============================================

export function trackReinforcementEvent({

    session = {},

    payload = {}

}) {

    return pushRuntimeEvent({

        session,

        event:

            createRuntimeEvent({

                type:
                    "reinforcement",

                payload
            })
    });
}

// ============================================
// TRACK CONTINUITY RECOVERY
// ============================================

export function trackContinuityRecovery({

    session = {},

    payload = {}

}) {

    return pushRuntimeEvent({

        session,

        event:

            createRuntimeEvent({

                type:
                    "continuity_recovery",

                payload
            })
    });
}
