/**
 * MOS360
 * Progression Visualization Engine
 *
 * RESPONSIBILITY:
 * - progression visualization
 * - continuity visualization
 * - learning momentum visibility
 * - progression perception
 *
 * MUST NOT:
 * - fake progress
 * - manipulate learner psychology
 * - create noisy dashboards
 */

import {

    getContinuityState

}

from "./learningContinuityEngine";

import {

    getProgressionMemory

}

from "./progressionMemoryEngine";

// ============================================
// BUILD PROGRESSION VISUALIZATION
// ============================================

export function buildProgressionVisualization() {

    const continuity =
        getContinuityState();

    const milestones =
        getProgressionMemory();

    return {

        streakDays:
            continuity.streakDays,

        continuityStatus:
            continuity.continuityStatus,

        milestoneCount:
            milestones.length,

        progressionStage:

            classifyProgressionStage({

                continuity,

                milestones
            })
    };
}

// ============================================
// CLASSIFY STAGE
// ============================================

function classifyProgressionStage({

    continuity,

    milestones

}) {

    // ================================
    // DEEP CONTINUITY
    // ================================

    if (
        continuity.streakDays >= 30
    ) {

        return "deep-progress";
    }

    // ================================
    // STABLE MOMENTUM
    // ================================

    if (
        continuity.streakDays >= 7
    ) {

        return "stable-progress";
    }

    // ================================
    // BUILDING MOMENTUM
    // ================================

    if (
        milestones.length >= 3
    ) {

        return "building-progress";
    }

    return "starting-progress";
}