/**
 * MOS360
 * Mastery Intelligence Runtime
 *
 * CANONICAL OWNERSHIP:
 * - mastery tracking
 * - adaptive difficulty
 * - reinforcement orchestration
 *
 * THIS IS:
 * - canonical mastery domain
 * - understanding stabilization runtime
 *
 * MUST NOT:
 * - duplicate mastery signals
 * - create fragmented reinforcement logic
 * - spawn nested mastery orchestration
 */

// ============================================
// BUILD MASTERY INTELLIGENCE
// ============================================

export function buildMasteryIntelligenceRuntime({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        block => {

            const mastery =
                buildMasteryState({

                    block,

                    telemetry
                });

            return {

                ...block,

                // ====================
                // MASTERY
                // ====================

                masteryLevel:
                    mastery.masteryLevel,

                masteryConfidence:
                    mastery.masteryConfidence,

                masteryState:
                    mastery.masteryState,

                // ====================
                // DIFFICULTY
                // ====================

                adaptiveDifficulty:
                    mastery.adaptiveDifficulty,

                challengeIntensity:
                    mastery.challengeIntensity,

                // ====================
                // REINFORCEMENT
                // ====================

                reinforcementState:
                    mastery.reinforcementState,

                reinforcementRequired:
                    mastery.reinforcementRequired,

                // ====================
                // SUPPORT
                // ====================

                masterySupport:
                    mastery.masterySupport
            };
        }
    );
}

// ============================================
// BUILD MASTERY STATE
// ============================================

function buildMasteryState({

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

    // ========================================
    // RECOVERY
    // ========================================

    if (

        hesitation >= 7

        ||

        retryCount >= 3
    ) {

        return {

            masteryLevel:
                "fragile",

            masteryConfidence:
                mastery,

            masteryState:
                "recovery",

            adaptiveDifficulty:
                "soft",

            challengeIntensity:
                "low",

            reinforcementState:
                "required",

            reinforcementRequired:
                true,

            masterySupport:
                "Understanding stabilization is temporarily prioritized over progression pressure"
        };
    }

    // ========================================
    // GUIDED
    // ========================================

    if (
        mastery <= 0.6
    ) {

        return {

            masteryLevel:
                "developing",

            masteryConfidence:
                mastery,

            masteryState:
                "guided",

            adaptiveDifficulty:
                "moderate",

            challengeIntensity:
                "balanced",

            reinforcementState:
                "light",

            reinforcementRequired:
                false,

            masterySupport:
                "Guided reinforcement is strengthening progression continuity"
        };
    }

    // ========================================
    // ADVANCED
    // ========================================

    if (

        mastery >= 0.85

        &&

        momentum >= 7
    ) {

        return {

            masteryLevel:
                "stable",

            masteryConfidence:
                mastery,

            masteryState:
                "advanced",

            adaptiveDifficulty:
                "deep",

            challengeIntensity:
                "high",

            reinforcementState:
                "minimal",

            reinforcementRequired:
                false,

            masterySupport:
                "Stable mastery supports deeper progression intensity"
        };
    }

    // ========================================
    // DEFAULT
    // ========================================

    return {

        masteryLevel:
            "balanced",

        masteryConfidence:
            mastery,

        masteryState:
            "stable",

        adaptiveDifficulty:
            "balanced",

        challengeIntensity:
            "moderate",

        reinforcementState:
            "passive",

        reinforcementRequired:
            false,

        masterySupport:
            "Understanding progression is remaining stable"
    };
}