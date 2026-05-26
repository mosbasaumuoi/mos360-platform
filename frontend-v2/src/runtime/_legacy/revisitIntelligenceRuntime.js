/**
 * MOS360
 * Revisit Intelligence Runtime
 *
 * RESPONSIBILITY:
 * - revisit intelligence
 * - progression gap detection
 * - reinforcement revisit routing
 * - hesitation revisit orchestration
 *
 * THIS IS:
 * - progression stabilization layer
 * - understanding continuity system
 *
 * MUST NOT:
 * - create chaotic revisits
 * - overload learner memory
 * - interrupt cinematic flow aggressively
 */

// ============================================
// BUILD REVISIT INTELLIGENCE
// ============================================

export function buildRevisitIntelligenceRuntime({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        (block, index) => ({

            ...block,

            revisitPriority:

                buildRevisitPriority({

                    block,

                    telemetry
                }),

            revisitRequired:

                shouldRevisit({

                    block,

                    telemetry
                }),

            revisitTarget:

                buildRevisitTarget({

                    blocks,

                    index,

                    telemetry
                })
        })
    );
}

// ============================================
// REVISIT PRIORITY
// ============================================

function buildRevisitPriority({

    block,

    telemetry

}) {

    const hesitation =
        telemetry?.hesitationLevel || 0;

    const retryCount =
        telemetry?.retryCount || 0;

    // ================================
    // HIGH REVISIT
    // ================================

    if (
        hesitation >= 7

        ||

        retryCount >= 2
    ) {

        return "high";
    }

    // ================================
    // RECOVERY SUPPORT
    // ================================

    if (
        block.type ===
        "checkpoint"
    ) {

        return "recovery";
    }

    // ================================
    // LOW REVISIT
    // ================================

    return "low";
}

// ============================================
// SHOULD REVISIT
// ============================================

function shouldRevisit({

    telemetry

}) {

    return (

        telemetry?.hesitationLevel >= 6

        ||

        telemetry?.retryCount >= 2
    );
}

// ============================================
// REVISIT TARGET
// ============================================

function buildRevisitTarget({

    blocks,

    index,

    telemetry

}) {

    const hesitation =
        telemetry?.hesitationLevel || 0;

    // ================================
    // NO REVISIT
    // ================================

    if (
        hesitation < 6
    ) {

        return null;
    }

    // ================================
    // FIND PREVIOUS PRIMARY
    // ================================

    for (
        let i = index - 1;
        i >= 0;
        i--
    ) {

        const candidate =
            blocks[i];

        if (
            candidate?.priority ===
            "primary"
        ) {

            return candidate.id;
        }
    }

    return null;
}