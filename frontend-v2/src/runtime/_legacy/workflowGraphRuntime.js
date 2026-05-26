/**
 * MOS360
 * Workflow Graph Runtime
 *
 * RESPONSIBILITY:
 * - workflow graph orchestration
 * - adaptive progression routing
 * - reinforcement routing
 * - revisit routing
 * - recovery routing
 *
 * THIS IS:
 * - non-linear progression runtime
 * - learning workflow foundation
 *
 * MUST NOT:
 * - mutate persisted lessons
 * - create chaotic routing
 * - fragment learning continuity
 */

// ============================================
// BUILD WORKFLOW GRAPH
// ============================================

export function buildWorkflowGraphRuntime({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        (block, index) => ({

            ...block,

            workflowRole:

                buildWorkflowRole({

                    block,

                    telemetry
                }),

            nextRoute:

                buildNextRoute({

                    blocks,

                    block,

                    index,

                    telemetry
                }),

            reinforcementRequired:

                shouldReinforce({

                    block,

                    telemetry
                })
        })
    );
}

// ============================================
// WORKFLOW ROLE
// ============================================

function buildWorkflowRole({

    block,

    telemetry

}) {

    const hesitation =
        telemetry?.hesitationLevel || 0;

    // ================================
    // REINFORCEMENT
    // ================================

    if (
        hesitation >= 6
    ) {

        return "reinforcement";
    }

    // ================================
    // RECOVERY
    // ================================

    if (
        block.type ===
        "checkpoint"
    ) {

        return "recovery";
    }

    // ================================
    // PRIMARY FLOW
    // ================================

    if (
        block.priority ===
        "primary"
    ) {

        return "progression";
    }

    return "support";
}

// ============================================
// NEXT ROUTE
// ============================================

function buildNextRoute({

    blocks,

    block,

    index,

    telemetry

}) {

    const hesitation =
        telemetry?.hesitationLevel || 0;

    const fatigue =
        telemetry?.fatigueLevel || 0;

    // ================================
    // FATIGUE RECOVERY
    // ================================

    if (
        fatigue >= 7
    ) {

        return findNextBlock({

            blocks,

            startIndex:
                index + 1,

            type:
                "checkpoint"
        });
    }

    // ================================
    // REINFORCEMENT ROUTING
    // ================================

    if (
        hesitation >= 6
    ) {

        return findNextBlock({

            blocks,

            startIndex:
                index + 1,

            type:
                "reinforcement"
        });
    }

    // ================================
    // DEFAULT FLOW
    // ================================

    return blocks[index + 1]?.id || null;
}

// ============================================
// REINFORCEMENT
// ============================================

function shouldReinforce({

    telemetry

}) {

    return (
        telemetry?.hesitationLevel >= 6
    );
}

// ============================================
// FIND NEXT BLOCK
// ============================================

function findNextBlock({

    blocks,

    startIndex,

    type

}) {

    const match =
        blocks.find(

            (block, index) => (

                index >= startIndex

                &&

                block.type === type
            )
        );

    return match?.id || null;
}