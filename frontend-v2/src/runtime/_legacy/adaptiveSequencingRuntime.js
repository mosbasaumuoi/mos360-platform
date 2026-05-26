/**
 * MOS360
 * Adaptive Sequencing Runtime
 *
 * RESPONSIBILITY:
 * - adaptive sequencing
 * - reinforcement prioritization
 * - fatigue-aware sequencing
 * - hesitation-aware progression flow
 * - continuity stabilization
 *
 * THIS IS:
 * - workflow intelligence layer
 * - progression sequencing system
 *
 * MUST NOT:
 * - mutate persisted lesson data
 * - create chaotic ordering
 * - break continuity rhythm
 */

// ============================================
// BUILD ADAPTIVE SEQUENCING
// ============================================

export function buildAdaptiveSequencingRuntime({

    blocks = [],

    telemetry = {}

}) {

    const runtimeBlocks =
        [...blocks];

    const hesitation =
        telemetry?.hesitationLevel || 0;

    const fatigue =
        telemetry?.fatigueLevel || 0;

    // ========================================
    // FATIGUE RECOVERY PRIORITY
    // ========================================

    if (fatigue >= 7) {

        return prioritizeRecoveryBlocks(
            runtimeBlocks
        );
    }

    // ========================================
    // HESITATION REINFORCEMENT
    // ========================================

    if (hesitation >= 6) {

        return prioritizeReinforcementBlocks(
            runtimeBlocks
        );
    }

    // ========================================
    // DEFAULT FLOW
    // ========================================

    return runtimeBlocks.map(
        (block, index) => ({

            ...block,

            sequencingRole:
                "default",

            sequencingIndex:
                index
        })
    );
}

// ============================================
// RECOVERY PRIORITY
// ============================================

function prioritizeRecoveryBlocks(
    blocks
) {

    const recoveryBlocks =
        blocks.filter(

            block =>

                block.type ===
                "checkpoint"

                ||

                block.type ===
                "continuity"
        );

    const progressionBlocks =
        blocks.filter(

            block =>

                block.type !==
                "checkpoint"

                &&

                block.type !==
                "continuity"
        );

    return [

        ...recoveryBlocks,

        ...progressionBlocks

    ].map(

        (block, index) => ({

            ...block,

            sequencingRole:

                recoveryBlocks.includes(block)
                    ? "recovery-priority"
                    : "progression",

            sequencingIndex:
                index
        })
    );
}

// ============================================
// REINFORCEMENT PRIORITY
// ============================================

function prioritizeReinforcementBlocks(
    blocks
) {

    const reinforcementBlocks =
        blocks.filter(

            block =>

                block.type ===
                "reinforcement"

                ||

                block.type ===
                "practice"
        );

    const progressionBlocks =
        blocks.filter(

            block =>

                block.type !==
                "reinforcement"

                &&

                block.type !==
                "practice"
        );

    return [

        ...reinforcementBlocks,

        ...progressionBlocks

    ].map(

        (block, index) => ({

            ...block,

            sequencingRole:

                reinforcementBlocks.includes(block)
                    ? "reinforcement-priority"
                    : "progression",

            sequencingIndex:
                index
        })
    );
}