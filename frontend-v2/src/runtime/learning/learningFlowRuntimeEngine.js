/**
 * MOS360
 * Learning Flow Runtime Engine
 *
 * RESPONSIBILITY:
 * - learning flow orchestration
 * - continuity flow rendering
 * - transition orchestration
 * - progression rhythm
 * - cinematic runtime continuity
 *
 * MUST NOT:
 * - fragment learning flow
 * - render isolated experiences
 * - create abrupt progression transitions
 */

// ============================================
// BUILD LEARNING FLOW
// ============================================

export function buildLearningFlow(
    blocks = []
) {

    return blocks.map(
        (block, index) => ({

            ...block,

            flowRole:
                buildFlowRole({

                    block,

                    index,

                    total:
                        blocks.length
                }),

            flowTransition:
                buildFlowTransition({

                    block,

                    index
                }),

            flowIntensity:
                buildFlowIntensity(
                    block
                )
        })
    );
}

// ============================================
// FLOW ROLE
// ============================================

function buildFlowRole({

    block,

    index,

    total

}) {

    // ================================
    // ENTRY
    // ================================

    if (index === 0) {

        return "entry";
    }

    // ================================
    // EXIT
    // ================================

    if (
        index === total - 1
    ) {

        return "resolution";
    }

    // ================================
    // RECOVERY
    // ================================

    if (

        block.type ===
        "checkpoint"

        ||

        block.type ===
        "continuity"

        ||

        block.type ===
        "reinforcement"
    ) {

        return "recovery";
    }

    // ================================
    // IMMERSIVE FLOW
    // ================================

    if (
        block.priority ===
        "primary"
    ) {

        return "immersive";
    }

    return "support";
}

// ============================================
// FLOW TRANSITION
// ============================================

function buildFlowTransition({

    block,

    index

}) {

    if (
        block.priority ===
        "primary"
    ) {

        return "cinematic";
    }

    if (
        block.type ===
        "checkpoint"
    ) {

        return "breathing";
    }

    if (
        block.type ===
        "reinforcement"
    ) {

        return "soft";
    }

    return (
        index % 2 === 0
            ? "smooth"
            : "light"
    );
}

// ============================================
// FLOW INTENSITY
// ============================================

function buildFlowIntensity(
    block
) {

    if (
        block.priority ===
        "primary"
    ) {

        return "high";
    }

    if (

        block.type ===
        "checkpoint"

        ||

        block.type ===
        "continuity"
    ) {

        return "low";
    }

    return "medium";
}