/**
 * MOS360
 * Block Sequencing Engine
 *
 * RESPONSIBILITY:
 * - runtime sequencing
 * - block orchestration
 * - cinematic pacing
 * - continuity-aware flow
 * - reinforcement positioning
 *
 * MUST NOT:
 * - render UI
 * - mutate persisted runtime
 * - bypass validation
 */

// ============================================
// PRIMARY BLOCK TYPES
// ============================================

const PRIMARY_BLOCKS = [
    "video",
    "workflow",
    "text"
];

// ============================================
// REINFORCEMENT BLOCK TYPES
// ============================================

const REINFORCEMENT_BLOCKS = [
    "checkpoint",
    "reinforcement",
    "continuity"
];

// ============================================
// CREATE SEQUENCED BLOCKS
// ============================================

export function createSequencedBlocks(
    blocks = []
) {

    const sequenced =
        [...blocks];

    return sequenced.sort(
        sequencingPrioritySort
    );
}

// ============================================
// SEQUENCING PRIORITY SORT
// ============================================

function sequencingPrioritySort(
    a,
    b
) {

    return (
        getBlockPriorityWeight(a) -
        getBlockPriorityWeight(b)
    );
}

// ============================================
// BLOCK PRIORITY WEIGHT
// ============================================

function getBlockPriorityWeight(
    block = {}
) {

    // ================================
    // PRIMARY FLOW
    // ================================

    if (
        PRIMARY_BLOCKS.includes(
            block.type
        )
    ) {

        return 1;
    }

    // ================================
    // SUPPORT FLOW
    // ================================

    if (
        block.type === "tips" ||
        block.type === "resource"
    ) {

        return 2;
    }

    // ================================
    // REINFORCEMENT FLOW
    // ================================

    if (
        REINFORCEMENT_BLOCKS.includes(
            block.type
        )
    ) {

        return 3;
    }

    return 99;
}

// ============================================
// CREATE CONTINUITY FLOW
// ============================================

export function createContinuityFlow(
    blocks = []
) {

    return blocks.map(
        (block, index) => ({

            index,

            type:
                block.type,

            continuityRole:

                getContinuityRole(
                    block
                )
        })
    );
}

// ============================================
// CONTINUITY ROLE
// ============================================

function getContinuityRole(
    block = {}
) {

    if (
        PRIMARY_BLOCKS.includes(
            block.type
        )
    ) {

        return "progression";
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
// CREATE PACING PROFILE
// ============================================

export function createPacingProfile(
    blocks = []
) {

    return {

        totalBlocks:
            blocks.length,

        primaryDensity:

            calculateDensity(
                blocks,
                PRIMARY_BLOCKS
            ),

        reinforcementDensity:

            calculateDensity(
                blocks,
                REINFORCEMENT_BLOCKS
            )
    };
}

// ============================================
// CALCULATE DENSITY
// ============================================

function calculateDensity(
    blocks = [],
    types = []
) {

    if (!blocks.length) {

        return 0;
    }

    const count =
        blocks.filter(

            block =>

                types.includes(
                    block.type
                )

        ).length;

    return Number(
        (
            count / blocks.length
        ).toFixed(2)
    );
}