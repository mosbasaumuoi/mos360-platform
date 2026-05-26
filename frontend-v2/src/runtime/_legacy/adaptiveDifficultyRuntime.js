/**
 * MOS360
 * Adaptive Difficulty Runtime
 *
 * RESPONSIBILITY:
 * - adaptive difficulty orchestration
 * - progression complexity regulation
 * - mastery-aware challenge balancing
 * - cognitive pressure stabilization
 *
 * THIS IS:
 * - adaptive complexity layer
 * - mastery-responsive progression runtime
 *
 * MUST NOT:
 * - aggressively gamify difficulty
 * - overload learners cognitively
 * - create unstable progression spikes
 */

// ============================================
// BUILD ADAPTIVE DIFFICULTY
// ============================================

export function buildAdaptiveDifficultyRuntime({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        block => {

            const difficulty =
                buildDifficultyState({

                    block,

                    telemetry
                });

            return {

                ...block,

                adaptiveDifficulty:
                    difficulty.level,

                challengeIntensity:
                    difficulty.intensity,

                difficultySupport:
                    difficulty.support
            };
        }
    );
}

// ============================================
// BUILD DIFFICULTY STATE
// ============================================

function buildDifficultyState({

    telemetry

}) {

    const mastery =
        telemetry?.masteryConfidence || 0;

    const hesitation =
        telemetry?.hesitationLevel || 0;

    const retryCount =
        telemetry?.retryCount || 0;

    const momentum =
        telemetry?.momentumLevel || 0;

    // ================================
    // RECOVERY MODE
    // ================================

    if (

        hesitation >= 7

        ||

        retryCount >= 3
    ) {

        return {

            level:
                "recovery",

            intensity:
                "soft",

            support:
                "Reducing complexity temporarily to stabilize understanding"
        };
    }

    // ================================
    // GUIDED MODE
    // ================================

    if (

        hesitation >= 4

        ||

        mastery <= 0.5
    ) {

        return {

            level:
                "guided",

            intensity:
                "moderate",

            support:
                "Building confidence progressively through guided reinforcement"
        };
    }

    // ================================
    // ADVANCED FLOW
    // ================================

    if (

        mastery >= 0.8

        &&

        momentum >= 7
    ) {

        return {

            level:
                "advanced",

            intensity:
                "deep",

            support:
                "Your progression stability supports deeper learning complexity"
        };
    }

    // ================================
    // STABLE DEFAULT
    // ================================

    return {

        level:
            "stable",

        intensity:
            "balanced",

        support:
            "Maintaining a balanced progression challenge"
    };
}