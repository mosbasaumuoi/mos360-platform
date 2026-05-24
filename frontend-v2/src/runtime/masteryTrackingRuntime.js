/**
 * MOS360
 * Mastery Tracking Runtime
 *
 * RESPONSIBILITY:
 * - mastery confidence tracking
 * - fragile understanding detection
 * - progression stability analysis
 * - reinforcement depth orchestration
 *
 * THIS IS:
 * - mastery-native runtime layer
 * - understanding stabilization system
 *
 * MUST NOT:
 * - reduce learning to completion metrics
 * - aggressively score learners
 * - create pressure-driven progression
 */

// ============================================
// BUILD MASTERY TRACKING
// ============================================

export function buildMasteryTrackingRuntime({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        (block, index) => {

            const mastery =
                buildMasteryState({

                    block,

                    telemetry
                });

            return {

                ...block,

                masteryLevel:
                    mastery.level,

                masteryConfidence:
                    mastery.confidence,

                masterySupport:
                    mastery.support
            };
        }
    );
}

// ============================================
// BUILD MASTERY STATE
// ============================================

function buildMasteryState({

    block,

    telemetry

}) {

    const hesitation =
        telemetry?.hesitationLevel || 0;

    const retryCount =
        telemetry?.retryCount || 0;

    const continuity =
        telemetry?.continuityLevel || 0;

    const momentum =
        telemetry?.momentumLevel || 0;

    // ================================
    // FRAGILE UNDERSTANDING
    // ================================

    if (

        hesitation >= 7

        ||

        retryCount >= 3
    ) {

        return {

            level:
                "fragile",

            confidence: 0.3,

            support:
                "Reinforcement and revisiting will help stabilize this understanding"
        };
    }

    // ================================
    // DEVELOPING UNDERSTANDING
    // ================================

    if (

        hesitation >= 4

        ||

        continuity <= 4
    ) {

        return {

            level:
                "developing",

            confidence: 0.55,

            support:
                "Your understanding is forming steadily through progression"
        };
    }

    // ================================
    // STABLE UNDERSTANDING
    // ================================

    if (

        momentum >= 7

        &&

        continuity >= 7
    ) {

        return {

            level:
                "stable",

            confidence: 0.85,

            support:
                "Your progression stability is strengthening naturally"
        };
    }

    // ================================
    // DEFAULT
    // ================================

    return {

        level:
            "emerging",

        confidence: 0.7,

        support:
            "Your understanding is continuing to evolve"
    };
}