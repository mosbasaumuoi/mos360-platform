// ============================================
// MOS360 ECOSYSTEM INTEGRATION ENGINE
// Ecosystem-native semantic integration runtime
// ============================================

// ============================================
// EVENT TYPES
// ============================================

export const ECOSYSTEM_EVENTS = {

    LESSON_COMPLETED:
        "lesson_completed",

    COURSE_PROGRESS_UPDATED:
        "course_progress_updated",

    SKILL_MASTERY_UPDATED:
        "skill_mastery_updated",

    LEARNER_STATE_CHANGED:
        "learner_state_changed",

    CONTENT_PUBLISHED:
        "content_published"
};

// ============================================
// CREATE ECOSYSTEM EVENT
// ============================================

export function createEcosystemEvent({

    type = "",
    payload = {}

} = {}) {

    return {

        id:

            `event_${Date.now()}`,

        type,

        payload,

        createdAt:
            Date.now()
    };
}

// ============================================
// VALIDATE EVENT
// ============================================

export function validateEcosystemEvent({

    event = {}

}) {

    // ========================================
    // TYPE
    // ========================================

    if (!event.type) {

        return {

            valid: false,

            issue:
                "missing_event_type"
        };
    }

    // ========================================
    // PAYLOAD
    // ========================================

    if (

        typeof event.payload !==
        "object"

    ) {

        return {

            valid: false,

            issue:
                "invalid_event_payload"
        };
    }

    return {

        valid: true
    };
}

// ============================================
// CREATE INTEGRATION CONTRACT
// ============================================

export function createIntegrationContract({

    name = "",
    version = "1.0.0",
    supportedEvents = []

} = {}) {

    return {

        name,

        version,

        supportedEvents,

        createdAt:
            Date.now()
    };
}

// ============================================
// REGISTER INTEGRATION
// ============================================

export function registerIntegration({

    registry = [],
    integration = {}

}) {

    return [

        ...registry,

        integration
    ];
}

// ============================================
// EMIT EVENT
// ============================================

export function emitEcosystemEvent({

    event = {},
    integrations = []

}) {

    const validation =

        validateEcosystemEvent({
            event
        });

    // ========================================
    // BLOCK INVALID
    // ========================================

    if (!validation.valid) {

        return {

            emitted:
                false,

            validation
        };
    }

    // ========================================
    // MATCHED INTEGRATIONS
    // ========================================

    const matched =

        integrations.filter(

            integration =>

                integration.supportedEvents
                    ?.includes(event.type)
        );

    return {

        emitted:
            true,

        event,

        integrations:
            matched.length
    };
}

// ============================================
// GENERATE ECOSYSTEM REPORT
// ============================================

export function generateEcosystemReport({

    integrations = []

}) {

    return {

        integrations:
            integrations.length,

        supportedEvents:

            integrations.flatMap(

                integration =>

                    integration.supportedEvents
                    || []
            ),

        generatedAt:
            Date.now()
    };
}