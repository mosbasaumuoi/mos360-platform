import {

    calculateSessionMomentum

}

    from "./runtimeSessionMomentumEngine";

import {

    calculateSessionEngagement

}

    from "./runtimeSessionAnalytics";

import {

    evaluateSessionContinuity

}

    from "./runtimeSessionContinuityEngine";

// ============================================
// CREATE SESSION VIEW MODEL
// ============================================

export function createRuntimeSessionViewModel({

    session = {},

    lesson = {}

}) {

    const momentum =

        calculateSessionMomentum(
            session
        );

    const engagement =

        calculateSessionEngagement(
            session
        );

    const continuity =

        evaluateSessionContinuity(
            session
        );

    const semanticProgression =

        session.semanticProgression || {};

    const runtimeHealth =

        resolveRuntimeHealth({

            session,
            continuity,
            engagement
        });

    const recoveryState =

        resolveRecoveryState({

            session,
            continuity
        });

    return {

        // ====================================
        // LESSON
        // ====================================

        lessonId:
            lesson.id,

        lessonTitle:
            lesson.title,

        // ====================================
        // SESSION CORE
        // ====================================

        progression:
            session.progression || 0,

        currentBlockIndex:

            session.currentBlockIndex || 0,

        visitedBlocks:

            session.visitedBlocks || [],

        status:
            session.status,

        // ====================================
        // SEMANTIC RUNTIME
        // ====================================

        momentum,

        engagement,

        continuity,

        runtimeHealth,

        recoveryState,

        semanticProgression,

        // ====================================
        // SESSION INTELLIGENCE
        // ====================================

        lastVisitedBlockId:

            semanticProgression
                ?.lastVisitedBlockId || null,

        lastVisitedBlockType:

            semanticProgression
                ?.lastVisitedBlockType || null,

        revisitCount:

            semanticProgression
                ?.revisitCount || 0,

        continuityState:

            semanticProgression
                ?.continuityState || "linear",

        reinforcementState:

            semanticProgression
                ?.reinforcementState || "inactive",

        engagementState:

            semanticProgression
                ?.engagementState || "low",

        momentumState:

            semanticProgression
                ?.momentumState || "starting",

        // ====================================
        // TIMELINE
        // ====================================

        startedAt:
            session.startedAt || null,

        completedAt:
            session.completedAt || null,

        lastMutationAt:

            semanticProgression
                ?.lastMutationAt || null
    };
}

// ============================================
// RUNTIME HEALTH
// ============================================

function resolveRuntimeHealth({

    session = {},

    continuity = {},

    engagement = {}

}) {

    const progression =

        session.progression || 0;

    if (

        continuity?.continuityState ===
        "broken"

    ) {

        return "unstable";
    }

    if (

        progression >= 80

    ) {

        return "strong";
    }

    if (

        engagement?.score >= 70

    ) {

        return "engaged";
    }

    return "active";
}

// ============================================
// RECOVERY STATE
// ============================================

function resolveRecoveryState({

    session = {},

    continuity = {}

}) {

    const lastMutationAt =

        session
            ?.semanticProgression
            ?.lastMutationAt || 0;

    const inactiveTime =

        Date.now() - lastMutationAt;

    const oneHour =

        1000 * 60 * 60;

    if (

        inactiveTime > oneHour * 24

    ) {

        return "recovery-needed";
    }

    if (

        continuity?.continuityState ===
        "deep"

    ) {

        return "stable";
    }

    return "active";
}
