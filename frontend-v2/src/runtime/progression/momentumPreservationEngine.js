/**
 * MOS360
 * Momentum Preservation Engine
 *
 * RESPONSIBILITY:
 * - momentum preservation
 * - continuity loop support
 * - progression momentum
 * - lightweight advancement psychology
 *
 * MUST NOT:
 * - manipulate psychology
 * - create fake urgency
 * - inject dopamine spam
 */

import {

    getContinuityState

}

from "./learningContinuityEngine";

import {

    getLatestMilestone

}

from "./progressionMemoryEngine";

// ============================================
// BUILD MOMENTUM LOOP
// ============================================

export function buildMomentumLoop() {

    const continuity =
        getContinuityState();

    const milestone =
        getLatestMilestone();

    return {

        continuityStatus:
            continuity.continuityStatus,

        streakDays:
            continuity.streakDays,

        latestMilestone:
            milestone,

        nextMomentumAction:

            buildNextMomentumAction({

                continuity,

                milestone
            })
    };
}

// ============================================
// NEXT MOMENTUM ACTION
// ============================================

function buildNextMomentumAction({

    continuity,

    milestone

}) {

    // ================================
    // STARTING
    // ================================

    if (
        continuity.streakDays <= 1
    ) {

        return (
            "Take one more small step forward"
        );
    }

    // ================================
    // BUILDING
    // ================================

    if (
        continuity.streakDays <= 7
    ) {

        return (
            "Your learning rhythm is forming"
        );
    }

    // ================================
    // STABLE
    // ================================

    if (
        continuity.streakDays >= 14
    ) {

        return (
            "Your continuity is becoming stable"
        );
    }

    // ================================
    // MILESTONE SUPPORT
    // ================================

    if (milestone) {

        return (
            "Your recent progress is still building forward"
        );
    }

    return (
        "Momentum is moving in the right direction"
    );
}