// ============================================
// MOS360 EVENT INTELLIGENCE ENGINE
// Event-driven semantic intelligence runtime
// ============================================

import {

    ECOSYSTEM_EVENTS

}
    from "../system/ecosystemIntegrationEngine.js";

// ============================================
// EVENT HANDLERS
// ============================================

const EVENT_HANDLERS = {

    // ========================================
    // LESSON COMPLETED
    // ========================================

    [ECOSYSTEM_EVENTS.LESSON_COMPLETED]:

        function handleLessonCompleted({

            payload = {}

        }) {

            return {

                type:
                    "lesson_intelligence",

                message:
                    "Learner completed lesson successfully.",

                learnerId:
                    payload.learnerId,

                courseId:
                    payload.courseId
            };
        },

    // ========================================
    // COURSE PROGRESS
    // ========================================

    [ECOSYSTEM_EVENTS.COURSE_PROGRESS_UPDATED]:

        function handleProgressUpdated({

            payload = {}

        }) {

            return {

                type:
                    "progression_intelligence",

                message:
                    "Course progression updated.",

                progress:
                    payload.progressPercent
            };
        },

    // ========================================
    // SKILL UPDATED
    // ========================================

    [ECOSYSTEM_EVENTS.SKILL_MASTERY_UPDATED]:

        function handleSkillUpdated({

            payload = {}

        }) {

            return {

                type:
                    "skill_intelligence",

                message:
                    "Skill mastery updated.",

                skillId:
                    payload.skillId
            };
        },

    // ========================================
    // LEARNER STATE
    // ========================================

    [ECOSYSTEM_EVENTS.LEARNER_STATE_CHANGED]:

        function handleLearnerState({

            payload = {}

        }) {

            return {

                type:
                    "learner_state_intelligence",

                message:
                    "Learner state changed.",

                state:
                    payload.state
            };
        }
};

// ============================================
// ROUTE EVENT
// ============================================

export function routeIntelligenceEvent({

    event = {}

}) {

    const handler =

        EVENT_HANDLERS[
        event.type
        ];

    // ========================================
    // NO HANDLER
    // ========================================

    if (!handler) {

        return {

            handled:
                false,

            reason:
                "missing_handler"
        };
    }

    // ========================================
    // HANDLE
    // ========================================

    const result =

        handler({

            payload:
                event.payload || {}
        });

    return {

        handled:
            true,

        result
    };
}

// ============================================
// REGISTER EVENT HANDLER
// ============================================

export function registerEventHandler({

    eventType = "",
    handler

}) {

    EVENT_HANDLERS[
        eventType
    ] = handler;

    return {

        registered:
            true,

        eventType
    };
}

// ============================================
// GENERATE EVENT REPORT
// ============================================

export function generateEventReport({

    event = {}

}) {

    const routed =

        routeIntelligenceEvent({
            event
        });

    return {

        eventType:
            event.type,

        handled:
            routed.handled,

        generatedAt:
            Date.now(),

        result:
            routed.result || null
    };
}

// ============================================
// GENERATE NERVOUS SYSTEM REPORT
// ============================================

export function generateNervousSystemReport() {

    return {

        totalHandlers:

            Object.keys(
                EVENT_HANDLERS
            ).length,

        supportedEvents:

            Object.keys(
                EVENT_HANDLERS
            ),

        generatedAt:
            Date.now()
    };
}