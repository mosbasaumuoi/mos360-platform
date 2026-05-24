/**
 * MOS360
 * Progression Guidance Engine
 *
 * RESPONSIBILITY:
 * - contextual progression guidance
 * - adaptive continuity guidance
 * - hesitation-aware support
 * - momentum-aware guidance
 * - humane learning progression support
 *
 * MUST NOT:
 * - manipulate learner psychology
 * - create urgency pressure
 * - inject addictive loops
 */

// ============================================
// BUILD PROGRESSION GUIDANCE
// ============================================

export function buildProgressionGuidance({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        (block, index) => ({

            ...block,

            progressionGuidance:

                buildGuidance({

                    block,

                    telemetry,

                    index,

                    total:
                        blocks.length
                })
        })
    );
}

// ============================================
// BUILD GUIDANCE
// ============================================

function buildGuidance({

    block,

    telemetry,

    index,

    total

}) {

    const hesitation =
        telemetry?.hesitationLevel || 0;

    const fatigue =
        telemetry?.fatigueLevel || 0;

    const momentum =
        telemetry?.momentumLevel || 0;

    // ================================
    // FATIGUE SUPPORT
    // ================================

    if (
        fatigue >= 7
    ) {

        return (
            "Take this step gently — continuity matters more than speed"
        );
    }

    // ================================
    // HESITATION SUPPORT
    // ================================

    if (
        hesitation >= 6
    ) {

        return (
            "Focus on understanding one small piece at a time"
        );
    }

    // ================================
    // LOW MOMENTUM
    // ================================

    if (
        momentum <= 3
    ) {

        return (
            "A small forward step is enough to rebuild momentum"
        );
    }

    // ================================
    // CHECKPOINT FLOW
    // ================================

    if (
        block.type ===
        "checkpoint"
    ) {

        return (
            "Reconnect with the progression you already built"
        );
    }

    // ================================
    // ENTRY FLOW
    // ================================

    if (index === 0) {

        return (
            "Start calmly and let the learning flow guide you"
        );
    }

    // ================================
    // RESOLUTION FLOW
    // ================================

    if (
        index === total - 1
    ) {

        return (
            "Your progression is continuing beyond this session"
        );
    }

    return (
        "Your learning flow is moving forward naturally"
    );
}