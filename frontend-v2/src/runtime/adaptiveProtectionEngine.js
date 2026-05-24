/**
 * MOS360
 * Adaptive Protection Engine
 *
 * RESPONSIBILITY:
 * - adaptive runtime protection
 * - sequencing safety
 * - reinforcement limits
 * - continuity-safe adaptation
 *
 * MUST NOT:
 * - mutate persisted lessons
 * - bypass orchestration contracts
 * - inject uncontrolled runtime changes
 */

// ============================================
// MAX ADAPTIVE BLOCKS
// ============================================

const MAX_ADAPTIVE_BLOCKS = 3;

// ============================================
// PROTECT ADAPTIVE RUNTIME
// ============================================

export function protectAdaptiveRuntime(
    blocks = []
) {

    const adaptiveBlocks =
        blocks.filter(

            block =>

                block.runtimeInjected
        );

    // ================================
    // TOO MANY ADAPTIVE BLOCKS
    // ================================

    if (

        adaptiveBlocks.length >
        MAX_ADAPTIVE_BLOCKS

    ) {

        return trimAdaptiveBlocks(
            blocks
        );
    }

    return preserveRuntimeFlow(
        blocks
    );
}

// ============================================
// TRIM ADAPTIVE BLOCKS
// ============================================

function trimAdaptiveBlocks(
    blocks = []
) {

    let adaptiveCount = 0;

    return blocks.filter(
        block => {

            if (
                !block.runtimeInjected
            ) {

                return true;
            }

            adaptiveCount++;

            return (
                adaptiveCount <=
                MAX_ADAPTIVE_BLOCKS
            );
        }
    );
}

// ============================================
// PRESERVE RUNTIME FLOW
// ============================================

function preserveRuntimeFlow(
    blocks = []
) {

    return blocks.map(
        (block, index) => ({

            ...block,

            runtimeOrder:
                index
        })
    );
}