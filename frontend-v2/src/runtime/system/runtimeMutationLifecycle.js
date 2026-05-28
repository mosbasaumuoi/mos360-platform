/**
 * MOS360
 * Runtime Mutation Lifecycle
 *
 * RESPONSIBILITY:
 * - canonical runtime mutation flow
 * - orchestration lifecycle stabilization
 * - runtime phase consistency
 * - mutation observability hooks
 * - semantic mutation lifecycle
 */

// ============================================
// RUNTIME PHASES
// ============================================

export const RUNTIME_PHASES = {

    CORE:
        "core-runtime",

    ADAPTIVE:
        "adaptive-foundation",

    PROGRESSION:
        "progression-intelligence",

    REINFORCEMENT:
        "reinforcement-runtime",

    OBSERVABILITY:
        "observability-runtime",

    MASTERY:
        "mastery-intelligence",

    SEMANTIC:
        "semantic-intelligence"
};

// ============================================
// CREATE RUNTIME SNAPSHOT
// ============================================

export function createRuntimeSnapshot({

    phase,

    blocks = [],

    metadata = {}

}) {

    return {

        phase,

        metadata,

        timestamp:
            Date.now(),

        blockCount:
            blocks.length
    };
}

// ============================================
// APPLY RUNTIME PHASE
// ============================================

export function applyRuntimePhase({

    phase,

    runtimeBuilder,

    blocks = [],

    telemetry = {},

    observability = null

}) {

    const beforeSnapshot =
        createRuntimeSnapshot({

            phase,

            blocks,

            metadata: {

                lifecycle:
                    "before-mutation"
            }
        });

    const mutatedBlocks =
        runtimeBuilder({

            blocks,

            telemetry
        });

    const afterSnapshot =
        createRuntimeSnapshot({

            phase,

            blocks:
                mutatedBlocks,

            metadata: {

                lifecycle:
                    "after-mutation"
            }
        });

    const mutationReport =

        createMutationReport({

            phase,

            beforeSnapshot,

            afterSnapshot
        });

    if (

        typeof observability ===
        "function"

    ) {

        observability(
            mutationReport
        );
    }

    return {

        phase,

        beforeSnapshot,

        afterSnapshot,

        mutationReport,

        blocks:
            mutatedBlocks
    };
}

// ============================================
// CREATE MUTATION REPORT
// ============================================

function createMutationReport({

    phase,

    beforeSnapshot = {},

    afterSnapshot = {}

}) {

    return {

        phase,

        beforeBlocks:

            beforeSnapshot
                ?.blockCount || 0,

        afterBlocks:

            afterSnapshot
                ?.blockCount || 0,

        mutationDelta:

            (
                afterSnapshot
                    ?.blockCount || 0
            )

            -

            (
                beforeSnapshot
                    ?.blockCount || 0
            ),

        createdAt:
            Date.now()
    };
}
