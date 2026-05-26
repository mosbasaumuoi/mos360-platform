/**
 * MOS360
 * Reinforcement Timing Engine
 *
 * RESPONSIBILITY:
 * - reinforcement timing
 * - checkpoint timing
 * - pacing recovery
 * - continuity recovery orchestration
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

        suggestedActions:

            buildSuggestedActions(
                signals
            )
    };
}

// ============================================
// BUILD SUGGESTED ACTIONS
// ============================================

function buildSuggestedActions(
    signals = {}
) {

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

            type:
                "continuity-recovery",

            message:
                "Recover continuity with lightweight checkpoint"
        });
    }

    return actions;
}