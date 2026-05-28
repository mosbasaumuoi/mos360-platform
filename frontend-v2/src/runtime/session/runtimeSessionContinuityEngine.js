// ============================================
// SAVE SESSION SNAPSHOT
// ============================================

export function createSessionSnapshot(

    session = {}

) {

    const semanticProgression =

        session.semanticProgression || {};

    return {

        id:
            session.id,

        lessonId:
            session.lessonId,

        progression:
            session.progression || 0,

        currentBlockIndex:

            session.currentBlockIndex || 0,

        visitedBlocks:

            Array.isArray(
                session.visitedBlocks
            )

                ? session.visitedBlocks

                : [],

        semanticProgression,

        runtimeState: {

            momentumState:

                semanticProgression
                    ?.momentumState || "starting",

            engagementState:

                semanticProgression
                    ?.engagementState || "low",

            reinforcementState:

                semanticProgression
                    ?.reinforcementState || "inactive",

            continuityState:

                semanticProgression
                    ?.continuityState || "linear"
        },

        snapshotVersion:
            "phase-i-session-intelligence",

        savedAt:
            Date.now()
    };
}

// ============================================
// RESTORE SESSION
// ============================================

export function restoreSessionFromSnapshot({

    session = {},

    snapshot = {}

}) {

    return {

        ...session,

        progression:

            snapshot.progression || 0,

        currentBlockIndex:

            snapshot.currentBlockIndex || 0,

        visitedBlocks:

            Array.isArray(
                snapshot.visitedBlocks
            )

                ? snapshot.visitedBlocks

                : [],

        semanticProgression: {

            ...(snapshot.semanticProgression || {}),

            restoredAt:
                Date.now(),

            recoveryState:
                "restored"
        }
    };
}

// ============================================
// SESSION CONTINUITY STATE
// ============================================

export function evaluateSessionContinuity(

    session = {}

) {

    const progression =

        session.progression || 0;

    const semanticProgression =

        session.semanticProgression || {};

    const revisitCount =

        semanticProgression
            ?.revisitCount || 0;

    const lastMutationAt =

        semanticProgression
            ?.lastMutationAt || 0;

    const inactiveTime =

        Date.now() - lastMutationAt;

    const oneHour =

        1000 * 60 * 60;

    let continuityState = "new";

    // ========================================
    // CONTINUITY STATE
    // ========================================

    if (

        inactiveTime > oneHour * 24

    ) {

        continuityState = "broken";
    }

    else if (

        progression >= 80

    ) {

        continuityState = "deep";
    }

    else if (

        progression >= 40

    ) {

        continuityState = "stable";
    }

    else if (

        progression >= 10

    ) {

        continuityState = "building";
    }

    // ========================================
    // REVISIT STATE
    // ========================================

    const revisitState =

        revisitCount >= 5

            ? "high"

            : revisitCount >= 2

                ? "medium"

                : "low";

    return {

        progression,

        revisitCount,

        revisitState,

        inactiveTime,

        continuityState,

        recoveryRecommended:

            continuityState === "broken"
    };
}
