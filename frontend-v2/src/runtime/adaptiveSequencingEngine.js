/**
 * MOS360
 * Adaptive Sequencing Engine
 *
 * RESPONSIBILITY:
 * - adaptive sequencing
 * - reinforcement positioning
 * - pacing-aware ordering
 * - continuity-safe orchestration
 *
 * MUST NOT:
 * - rewrite persisted lessons
 * - bypass runtime contracts
 * - mutate authoring source
 */

import {

    shouldInjectReinforcement,

    shouldReduceDensity

}

from "./adaptiveSignalEngine";

// ============================================
// BUILD ADAPTIVE SEQUENCE
// ============================================

export function buildAdaptiveSequence({

    blocks = [],

    signals

}) {

    let adapted =
        [...blocks];

    // ================================
    // REINFORCEMENT INSERTION
    // ================================

    if (
        shouldInjectReinforcement(
            signals
        )
    ) {

        adapted =
            injectAdaptiveCheckpoint(
                adapted
            );
    }

    // ================================
    // DENSITY RELIEF
    // ================================

    if (
        shouldReduceDensity(
            signals
        )
    ) {

        adapted =
            applyDensityRelief(
                adapted
            );
    }

    return adapted.map(
        (block, index) => ({

            ...block,

            adaptiveOrder:
                index
        })
    );
}

// ============================================
// ADAPTIVE CHECKPOINT
// ============================================

function injectAdaptiveCheckpoint(
    blocks = []
) {

    const injected = [
        ...blocks
    ];

    injected.splice(2, 0, {

        type:
            "checkpoint",

        runtimeInjected:
            true,

        adaptive:
            true,

        message:
            "Quick momentum recovery checkpoint"
    });

    return injected;
}

// ============================================
// DENSITY RELIEF
// ============================================

function applyDensityRelief(
    blocks = []
) {

    return blocks.map(
        block => ({

            ...block,

            adaptiveSpacing:
                "relaxed"
        })
    );
}