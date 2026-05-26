/**
 * MOS360
 * Adaptive Progression Runtime
 *
 * RESPONSIBILITY:
 * - progression adaptation
 * - hesitation detection
 * - momentum-aware runtime
 * - adaptive pacing
 * - continuity stabilization
 *
 * MUST NOT:
 * - manipulate learner psychology
 * - aggressively optimize engagement
 * - create addictive loops
 */

// ============================================
// BUILD ADAPTIVE PROGRESSION
// ============================================

export function buildAdaptiveProgressionRuntime({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        (block, index) => ({

            ...block,

            adaptiveState:

                buildAdaptiveState({

                    block,

                    telemetry,

                    index
                }),

            adaptivePacing:

                buildAdaptivePacing({

                    block,

                    telemetry
                }),

            progressionSupport:

                buildProgressionSupport({

                    block,

                    telemetry
                })
        })
    );
}

// ============================================
// ADAPTIVE STATE
// ============================================

function buildAdaptiveState({

    block,

    telemetry,

    index

}) {

    const hesitation =
        telemetry?.hesitationLevel || 0;

    const fatigue =
        telemetry?.fatigueLevel || 0;

    // ================================
    // RECOVERY SUPPORT
    // ================================

    if (
        fatigue >= 7
    ) {

        return "recovery";
    }

    // ================================
    // HESITATION SUPPORT
    // ================================

    if (
        hesitation >= 5
    ) {

        return "guided";
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

    return "stable";
}

// ============================================
// ADAPTIVE PACING
// ============================================

function buildAdaptivePacing({

    block,

    telemetry

}) {

    const momentum =
        telemetry?.momentumLevel || 0;

    // ================================
    // LOW MOMENTUM
    // ================================

    if (
        momentum <= 3
    ) {

        return "soft";
    }

    // ================================
    // HIGH MOMENTUM
    // ================================

    if (
        momentum >= 7
    ) {

        return "immersive";
    }

    return "balanced";
}

// ============================================
// PROGRESSION SUPPORT
// ============================================

function buildProgressionSupport({

    telemetry

}) {

    const continuity =
        telemetry?.continuityLevel || 0;

    if (
        continuity <= 3
    ) {

        return (
            "Small consistent steps rebuild progression"
        );
    }

    if (
        continuity >= 7
    ) {

        return (
            "Your progression rhythm is stabilizing naturally"
        );
    }

    return (
        "Your learning flow is moving forward"
    );
}