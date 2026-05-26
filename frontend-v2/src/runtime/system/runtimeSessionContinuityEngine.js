/**
 * MOS360
 * Runtime Session Continuity Engine
 *
 * RESPONSIBILITY:
 * - session continuity
 * - learning continuity persistence
 * - progression session orchestration
 * - runtime re-entry continuity
 *
 * MUST NOT:
 * - reset learner emotional continuity
 * - fragment learning sessions
 * - create disconnected progression feeling
 */

// ============================================
// BUILD SESSION CONTINUITY
// ============================================

export function buildRuntimeSessionContinuity({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        (block, index) => ({

            ...block,

            sessionContinuity:

                buildSessionContinuity({

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
// BUILD SESSION CONTINUITY
// ============================================

function buildSessionContinuity({

    telemetry,

    index,

    total

}) {

    const returnState =
        telemetry?.returnState || "active";

    const continuity =
        telemetry?.continuityLevel || 0;

    // ================================
    // RETURN FLOW
    // ================================

    if (
        returnState ===
        "returning"
    ) {

        if (index === 0) {

            return (
                "Welcome back — your learning flow is ready to continue"
            );
        }

        return (
            "Your progression is reconnecting naturally"
        );
    }

    // ================================
    // LOW CONTINUITY
    // ================================

    if (
        continuity <= 3
    ) {

        return (
            "Each small session strengthens your continuity"
        );
    }

    // ================================
    // RESOLUTION
    // ================================

    if (
        index === total - 1
    ) {

        return (
            "This session is becoming part of your larger progression journey"
        );
    }

    return (
        "Your learning continuity is moving forward steadily"
    );
}