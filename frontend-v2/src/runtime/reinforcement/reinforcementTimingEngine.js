/**
 * MOS360
 * Reinforcement Timing Engine
 *
 * RESPONSIBILITY:
 * - reinforcement timing
 * - checkpoint timing
 * - pacing recovery
 * - continuity recovery orchestration
 * - semantic reinforcement intelligence
 *
 * MUST NOT:
 * - mutate persisted runtime
 * - overwrite lessons
 * - bypass sequencing
 */

import {

    shouldInjectReinforcement,

    shouldReduceDensity,

    shouldRecoverContinuity

}

from "../adaptiveSignalEngine";

// ============================================
// BUILD REINFORCEMENT PLAN
// ============================================

export function buildReinforcementPlan(
    signals = {}
) {

    const reinforcementState =

        resolveReinforcementState(
            signals
        );

    const reinforcementDensity =

        calculateReinforcementDensity(
            signals
        );

    const continuityRisk =

        calculateContinuityRisk(
            signals
        );

    const recoveryPriority =

        calculateRecoveryPriority({
            reinforcementState,
            continuityRisk
        });

    return {

        shouldInject:

            shouldInjectReinforcement(
                signals
            ),

        shouldReduceDensity:

            shouldReduceDensity(
                signals
            ),

        shouldRecoverContinuity:

            shouldRecoverContinuity(
                signals
            ),

        reinforcementState,

        reinforcementDensity,

        continuityRisk,

        recoveryPriority,

        reinforcementTimeline:

            buildReinforcementTimeline(
                signals
            ),

        suggestedActions:

            buildSuggestedActions({
                signals,
                reinforcementState,
                continuityRisk
            })
    };
}

// ============================================
// BUILD SUGGESTED ACTIONS
// ============================================

function buildSuggestedActions({

    signals = {},

    reinforcementState = "stable",

    continuityRisk = "low"

}) {

    const actions = [];

    // ================================
    // MOMENTUM DECAY
    // ================================

    if (

        signals.momentum
            ?.status ===
        "decaying"

    ) {

        actions.push({

            priority:
                "high",

            type:
                "reinforcement",

            message:
                "Inject reinforcement checkpoint"
        });
    }

    // ================================
    // HIGH HESITATION
    // ================================

    if (
        signals.hesitationCount >= 3
    ) {

        actions.push({

            priority:
                "medium",

            type:
                "reduce-density",

            message:
                "Reduce learning density"
        });
    }

    // ================================
    // SESSION EXIT
    // ================================

    if (
        signals.exitedEarly
    ) {

        actions.push({

            priority:
                "high",

            type:
                "continuity-recovery",

            message:
                "Recover continuity with lightweight checkpoint"
        });
    }

    // ================================
    // CONTINUITY RISK
    // ================================

    if (

        continuityRisk === "high"

    ) {

        actions.push({

            priority:
                "critical",

            type:
                "semantic-recovery",

            message:
                "Rebuild semantic continuity before progression continues"
        });
    }

    // ================================
    // REINFORCEMENT FATIGUE
    // ================================

    if (

        reinforcementState ===
        "fatigued"

    ) {

        actions.push({

            priority:
                "medium",

            type:
                "lightweight-reinforcement",

            message:
                "Reduce reinforcement pressure temporarily"
        });
    }

    return actions;
}

// ============================================
// REINFORCEMENT STATE
// ============================================

function resolveReinforcementState(
    signals = {}
) {

    if (

        signals.reinforcementCount >= 8

    ) {

        return "fatigued";
    }

    if (

        signals.hesitationCount >= 3

    ) {

        return "recovering";
    }

    if (

        signals.reinforcementCount >= 3

    ) {

        return "active";
    }

    return "stable";
}

// ============================================
// REINFORCEMENT DENSITY
// ============================================

function calculateReinforcementDensity(
    signals = {}
) {

    const reinforcementCount =

        signals.reinforcementCount || 0;

    const visitedBlocks =

        signals.visitedBlocks || 1;

    return Math.min(

        Math.round(

            (
                reinforcementCount
                / visitedBlocks
            ) * 100
        ),

        100
    );
}

// ============================================
// CONTINUITY RISK
// ============================================

function calculateContinuityRisk(
    signals = {}
) {

    if (

        signals.exitedEarly
        &&
        signals.hesitationCount >= 3

    ) {

        return "high";
    }

    if (

        signals.hesitationCount >= 2

    ) {

        return "medium";
    }

    return "low";
}

// ============================================
// RECOVERY PRIORITY
// ============================================

function calculateRecoveryPriority({

    reinforcementState = "stable",

    continuityRisk = "low"

}) {

    if (

        continuityRisk === "high"

    ) {

        return "critical";
    }

    if (

        reinforcementState ===
        "recovering"

    ) {

        return "high";
    }

    return "normal";
}

// ============================================
// REINFORCEMENT TIMELINE
// ============================================

function buildReinforcementTimeline(
    signals = {}
) {

    return {

        reinforcementCount:

            signals.reinforcementCount || 0,

        hesitationCount:

            signals.hesitationCount || 0,

        exitedEarly:

            signals.exitedEarly || false,

        generatedAt:
            Date.now()
    };
}
