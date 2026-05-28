/**
 * MOS360
 * Adaptive Runtime Engine
 *
 * RESPONSIBILITY:
 * - adaptive overlay coordination
 * - runtime enrichment
 * - reinforcement signaling
 * - continuity signaling
 * - deterministic adaptive guidance
 *
 * MUST NOT:
 * - own reinforcement runtime
 * - own progression runtime
 * - own continuity runtime
 * - mutate persisted lessons
 * - rewrite runtime ecosystems
 */

import {

    buildLearningSignals

}

from "./adaptiveSignalEngine";

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

    // ========================================
    // LIGHTWEIGHT OVERLAY ADAPTATION
    // ========================================

    const adaptedBlocks =

        applyAdaptiveOverlay({

            blocks,

            signals
        });

    // ========================================
    // OVERLAY RUNTIME STATE
    // ========================================

    const runtimeState =

        buildRuntimeState(
            signals
        );

    return {

        lessonId,

        overlayMode:
            true,

        runtimeType:
            "adaptive-overlay-runtime",

        signals,

        runtimeState,

        adaptedBlocks
    };
}

// ============================================
// APPLY ADAPTIVE OVERLAY
// ============================================

function applyAdaptiveOverlay({

    blocks = [],

    signals = {}

}) {

    return blocks.map((block) => {

        const normalized = {
            ...block
        };

        // ====================================
        // CONTINUITY OVERLAY
        // ====================================

        if (
            signals.exitedEarly
        ) {

            normalized.continuityRecovery =
                true;
        }

        // ====================================
        // DENSITY OVERLAY
        // ====================================

        if (

            signals.hesitationCount >= 3

        ) {

            normalized.adaptiveSpacing =
                "expanded";
        }

        // ====================================
        // REINFORCEMENT OVERLAY
        // ====================================

        if (

            signals.reinforcementCount >= 3

        ) {

            normalized.reinforcementActive =
                true;
        }

        // ====================================
        // MOMENTUM OVERLAY
        // ====================================

        if (

            signals.momentum
                ?.status ===
            "decaying"

        ) {

            normalized.momentumRecovery =
                true;
        }

        return normalized;
    });
}

// ============================================
// BUILD RUNTIME STATE
// ============================================

function buildRuntimeState(
    signals = {}
) {

    return {

        reinforcementActive:

            signals.reinforcementCount >= 3,

        continuityRecovery:

            signals.exitedEarly || false,

        adaptiveDensity:

            signals.hesitationCount >= 3

                ? "expanded"

                : "normal",

        momentumState:

            signals.momentum
                ?.status || "stable",

        runtimeHealth:

            signals.runtimeHealth
            || "healthy"
    };
}
