import {

    RUNTIME_SESSION_STATUSES

}

    from "../../contracts/runtimeSessionContract";

// ============================================
// SEMANTIC PROGRESSION CONSTANTS
// ============================================

const DEFAULT_PROGRESSION_STATE = {

    momentumState:
        "starting",

    engagementState:
        "low",

    reinforcementState:
        "inactive",

    continuityState:
        "linear"
};

// ============================================
// START SESSION
// ============================================

export function startRuntimeSession(

    session = {}

) {

    return {

        ...session,

        status:
            "active",

        startedAt:
            Date.now(),

        progression:
            session.progression || 0,

        currentBlockIndex:
            session.currentBlockIndex || 0,

        visitedBlocks:
            session.visitedBlocks || [],

        semanticProgression:

            session.semanticProgression ||

            {

                ...DEFAULT_PROGRESSION_STATE,

                startedAt:
                    Date.now(),

                lastMutationAt:
                    Date.now()
            }
    };
}

// ============================================
// COMPLETE SESSION
// ============================================

export function completeRuntimeSession(

    session = {}

) {

    return {

        ...session,

        status:
            "completed",

        progression:
            100,

        completedAt:
            Date.now(),

        semanticProgression: {

            ...(session.semanticProgression || {}),

            momentumState:
                "completed",

            engagementState:
                "completed",

            reinforcementState:
                "resolved",

            completedAt:
                Date.now(),

            lastMutationAt:
                Date.now()
        }
    };
}

// ============================================
// UPDATE BLOCK PROGRESSION
// ============================================

export function updateRuntimeProgression({

    session = {},

    totalBlocks = 1,

    currentBlockIndex = 0,

    block = {}

}) {

    const safeTotalBlocks =

        Math.max(totalBlocks, 1);

    const progression =

        Math.round(

            ((currentBlockIndex + 1)

                / safeTotalBlocks) * 100
        );

    const previousProgression =

        session.progression || 0;

    const progressionDelta =

        progression - previousProgression;

    const momentumState =

        resolveMomentumState({
            progression,
            progressionDelta
        });

    const engagementState =

        resolveEngagementState({
            session,
            block
        });

    const reinforcementState =

        resolveReinforcementState({
            block
        });

    const continuityState =

        resolveContinuityState({
            session,
            currentBlockIndex
        });

    return {

        ...session,

        currentBlockIndex,

        progression,

        semanticProgression: {

            ...(session.semanticProgression || {}),

            momentumState,

            engagementState,

            reinforcementState,

            continuityState,

            lastVisitedBlockId:
                block?.id || null,

            lastMutationAt:
                Date.now(),

            progressionSnapshots: [

                ...(
                    session
                        ?.semanticProgression
                        ?.progressionSnapshots || []
                ),

                {
                    progression,
                    currentBlockIndex,
                    timestamp:
                        Date.now()
                }
            ].slice(-20)
        }
    };
}

// ============================================
// VISIT BLOCK
// ============================================

export function visitRuntimeBlock({

    session = {},

    blockId,

    block = {}

}) {

    const visitedBlocks =

        new Set(

            session.visitedBlocks || []
        );

    visitedBlocks.add(blockId);

    const revisitCount =

        session
            ?.semanticProgression
            ?.revisitCount || 0;

    const hasVisitedBefore =

        session
            ?.visitedBlocks
            ?.includes(blockId);

    return {

        ...session,

        visitedBlocks:

            Array.from(
                visitedBlocks
            ),

        semanticProgression: {

            ...(session.semanticProgression || {}),

            revisitCount:

                hasVisitedBefore

                    ? revisitCount + 1
                    : revisitCount,

            lastVisitedBlockId:
                blockId,

            lastVisitedBlockType:
                block?.type || null,

            lastVisitAt:
                Date.now(),

            lastMutationAt:
                Date.now()
        }
    };
}

// ============================================
// VALIDATE SESSION STATUS
// ============================================

export function isValidSessionStatus(

    status

) {

    return RUNTIME_SESSION_STATUSES.includes(
        status
    );
}

// ============================================
// MOMENTUM STATE
// ============================================

function resolveMomentumState({

    progression = 0,

    progressionDelta = 0

}) {

    if (progression >= 100) {

        return "completed";
    }

    if (progression >= 70) {

        return "accelerating";
    }

    if (progressionDelta <= 0) {

        return "stalled";
    }

    return "active";
}

// ============================================
// ENGAGEMENT STATE
// ============================================

function resolveEngagementState({

    session = {},

    block = {}

}) {

    const visitedCount =

        session
            ?.visitedBlocks
            ?.length || 0;

    if (block?.type === "quiz") {

        return "interactive";
    }

    if (visitedCount >= 10) {

        return "deep";
    }

    return "active";
}

// ============================================
// REINFORCEMENT STATE
// ============================================

function resolveReinforcementState({

    block = {}

}) {

    const reinforcementTypes = [

        "quiz",
        "practice",
        "checkpoint",
        "challenge",
        "exercise"
    ];

    if (

        reinforcementTypes.includes(
            block?.type
        )

    ) {

        return "reinforcing";
    }

    return "inactive";
}

// ============================================
// CONTINUITY STATE
// ============================================

function resolveContinuityState({

    session = {},

    currentBlockIndex = 0

}) {

    const previousIndex =

        session.currentBlockIndex || 0;

    const delta =

        Math.abs(
            currentBlockIndex - previousIndex
        );

    if (delta > 1) {

        return "nonlinear";
    }

    return "linear";
}
