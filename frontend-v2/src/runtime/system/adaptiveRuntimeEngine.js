/**
 * MOS360
 * Adaptive Runtime Engine
 *
 * RESPONSIBILITY:
 * - adaptive orchestration
 * - reinforcement injection
 * - pacing adaptation
 * - continuity recovery
 * - deterministic runtime adaptation
 *
 * MUST NOT:
 * - mutate persisted lessons
 * - rewrite lesson structures
 * - bypass sequencing contracts
 */

import {

    buildLearningSignals

}

from "./adaptiveSignalEngine";

import {

    buildReinforcementPlan

}

from "./reinforcementTimingEngine";

import {

    buildContinuityRecovery

}

from "./continuityRecoveryEngine";

import {

    buildAdaptiveSequence

}

from "./adaptiveSequencingEngine";

import {

    buildAdaptiveReinforcement

}

from "./adaptiveReinforcementEngine";

import {

    protectAdaptiveRuntime

}

from "./adaptiveProtectionEngine";

// ============================================
// BUILD ADAPTIVE RUNTIME
// ============================================

export function buildAdaptiveRuntime({

    lessonId,

    blocks = []

}) {

    const signals =
        buildLearningSignals(
            lessonId
        );

    const reinforcementPlan =
        buildReinforcementPlan(
            signals
        );

    let adaptedBlocks =
        [...blocks];

    // ================================
    // REINFORCEMENT INJECTION
    // ================================

    if (
        reinforcementPlan
            .shouldInject
    ) {

        adaptedBlocks =
            injectReinforcementBlock(
                adaptedBlocks
            );
    }

    // ================================
    // DENSITY REDUCTION
    // ================================

    if (
        reinforcementPlan
            .shouldReduceDensity
    ) {

        adaptedBlocks =
            reduceLearningDensity(
                adaptedBlocks
            );
    }

    const continuityRecovery =

    buildContinuityRecovery({

        signals,

        blocks:
            adaptedBlocks
    });

// ================================
// CONTINUITY RECOVERY
// ================================

if (
    continuityRecovery
        .shouldRecover
) {

    adaptedBlocks =

        continuityRecovery
            .recoveryBlocks;
}
    
    adaptedBlocks =
    buildAdaptiveSequence({

        blocks:
            adaptedBlocks,

        signals
    });

    adaptedBlocks =
    buildAdaptiveReinforcement({

        blocks:
            adaptedBlocks,

        signals
    });

    adaptedBlocks =
    protectAdaptiveRuntime(
        adaptedBlocks
    );

    return {

        lessonId,

        signals,

        reinforcementPlan,

        continuityRecovery,

        adaptedBlocks
    };
}

// ============================================
// INJECT REINFORCEMENT BLOCK
// ============================================

function injectReinforcementBlock(
    blocks = []
) {

    return [

        ...blocks,

        {

            type:
                "reinforcement",

            runtimeInjected:
                true,

            message:
                "Take a quick reinforcement pause"
        }
    ];
}

// ============================================
// REDUCE LEARNING DENSITY
// ============================================

function reduceLearningDensity(
    blocks = []
) {

    return blocks.map(
        block => ({

            ...block,

            adaptiveSpacing:
                "expanded"
        })
    );
}