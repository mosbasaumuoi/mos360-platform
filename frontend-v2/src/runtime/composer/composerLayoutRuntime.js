/**
 * MOS360
 * Composer Layout Engine
 *
 * RESPONSIBILITY:
 * - visual block layout
 * - viewport focus orchestration
 * - cinematic spacing
 * - block grouping
 * - visual sequencing
 *
 * MUST NOT:
 * - mutate lessons
 * - bypass sequencing
 * - render raw runtime
 */

// ============================================
// PRIMARY BLOCKS
// ============================================

const PRIMARY_BLOCKS = [
    "video",
    "workflow",
    "text"
];

// ============================================
// REINFORCEMENT BLOCKS
// ============================================

const REINFORCEMENT_BLOCKS = [
    "checkpoint",
    "reinforcement",
    "continuity"
];

// ============================================
// CREATE VISUAL FLOW
// ============================================

export function createVisualFlow(
    blocks = []
) {

    return blocks.map(
        (block, index) => ({

            ...block,

            visualOrder:
                index,

            visualGroup:
                getVisualGroup(
                    block
                ),

            focusMode:
                getFocusMode(
                    block
                ),

            cinematicSpacing:
                getCinematicSpacing(
                    block
                )
        })
    );
}

// ============================================
// VISUAL GROUP
// ============================================

function getVisualGroup(
    block = {}
) {

    if (
        PRIMARY_BLOCKS.includes(
            block.type
        )
    ) {

        return "primary";
    }

    if (
        REINFORCEMENT_BLOCKS.includes(
            block.type
        )
    ) {

        return "reinforcement";
    }

    return "support";
}

// ============================================
// FOCUS MODE
// ============================================

function getFocusMode(
    block = {}
) {

    if (
        PRIMARY_BLOCKS.includes(
            block.type
        )
    ) {

        return "focused";
    }

    return "normal";
}

// ============================================
// CINEMATIC SPACING
// ============================================

function getCinematicSpacing(
    block = {}
) {

    if (
        block.type === "checkpoint"
    ) {

        return "xl";
    }

    if (
        PRIMARY_BLOCKS.includes(
            block.type
        )
    ) {

        return "lg";
    }

    return "md";
}