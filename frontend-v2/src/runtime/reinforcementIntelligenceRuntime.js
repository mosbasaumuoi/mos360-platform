/**
 * MOS360
 * Reinforcement Intelligence Runtime
 *
 * RESPONSIBILITY:
 * - predictive reinforcement orchestration
 * - fragile mastery stabilization
 * - reinforcement injection
 * - semantic reinforcement targeting
 *
 * THIS IS:
 * - proactive reinforcement layer
 * - progression stabilization intelligence
 *
 * MUST NOT:
 * - spam reinforcement blocks
 * - overload learner attention
 * - interrupt cinematic continuity aggressively
 */

// ============================================
// BUILD REINFORCEMENT INTELLIGENCE
// ============================================

export function buildReinforcementIntelligenceRuntime({

    blocks = [],

    telemetry = {}

}) {

    return blocks.map(
        (block, index) => {

            const reinforcement =
                buildReinforcementState({

                    block,

                    telemetry
                });

            return {

                ...block,

                reinforcementState:
                    reinforcement.state,

                reinforcementPriority:
                    reinforcement.priority,

                reinforcementSupport:
                    reinforcement.support,

                reinforcementInjection:
                    shouldInjectReinforcement({

                        block,

                        telemetry
                    })
            };
        }
    );
}

// ============================================
// BUILD REINFORCEMENT STATE
// ============================================

function buildReinforcementState({

    block,

    telemetry

}) {

    const mastery =
        telemetry?.masteryConfidence || 0;

    const hesitation =
        telemetry?.hesitationLevel || 0;

    const continuity =
        telemetry?.continuityLevel || 0;

    // ================================
    // FRAGILE ZONE
    // ================================

    if (

        mastery <= 0.45

        ||

        hesitation >= 6
    ) {

        return {

            state:
                "fragile",

            priority:
                "high",

            support:
                "Reinforcement is stabilizing this progression zone proactively"
        };
    }

    // ================================
    // UNSTABLE CONTINUITY
    // ================================

    if (
        continuity <= 4
    ) {

        return {

            state:
                "unstable",

            priority:
                "moderate",

            support:
                "Light reinforcement is helping continuity stabilize naturally"
        };
    }

    // ================================
    // STABLE FLOW
    // ================================

    return {

        state:
            "stable",

        priority:
            "low",

        support:
            "Your reinforcement rhythm is remaining balanced"
    };
}

// ============================================
// REINFORCEMENT INJECTION
// ============================================

function shouldInjectReinforcement({

    telemetry

}) {

    return (

        telemetry?.masteryConfidence <= 0.5

        ||

        telemetry?.hesitationLevel >= 6
    );
}