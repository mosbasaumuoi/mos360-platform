/**
 * MOS360
 * Adaptive Reinforcement Engine
 *
 * RESPONSIBILITY:
 * - reinforcement orchestration
 * - adaptive checkpoint timing
 * - pacing recovery
 * - continuity-aware reinforcement
 *
 * MUST NOT:
 * - mutate persisted lessons
 * - overwrite sequencing contracts
 * - bypass runtime governance
 */

import {

    shouldInjectReinforcement,

    shouldRecoverContinuity

}

from "../system/adaptiveSignalEngine";

// ============================================
// BUILD ADAPTIVE REINFORCEMENT
// ============================================

export function buildAdaptiveReinforcement({

    blocks = [],

    signals

}) {

    let adapted =
        [...blocks];

    // ================================
    // MOMENTUM RECOVERY
    // ================================

    if (
        shouldInjectReinforcement(
            signals
        )
    ) {

        adapted =
            injectMomentumRecovery(
                adapted
            );
    }

    // ================================
    // CONTINUITY RECOVERY
    // ================================

    if (
        shouldRecoverContinuity(
            signals
        )
    ) {

        adapted =
            injectContinuityRecovery(
                adapted
            );
    }

    return adapted;
}

// ============================================
// MOMENTUM RECOVERY
// ============================================

function injectMomentumRecovery(
    blocks = []
) {

    return [

        ...blocks,

        {

            type:
                "reinforcement",

            adaptive:
                true,

            runtimeInjected:
                true,

            message:
                "Pause briefly before continuing"
        }
    ];
}

// ============================================
// CONTINUITY RECOVERY
// ============================================

function injectContinuityRecovery(
    blocks = []
) {

    return [

        {

            type:
                "continuity",

            adaptive:
                true,

            runtimeInjected:
                true,

            message:
                "Let's quickly rebuild momentum"
        },

        ...blocks
    ];
}