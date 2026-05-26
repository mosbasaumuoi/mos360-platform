/**
 * MOS360
 * Continuity Ritual Engine
 *
 * RESPONSIBILITY:
 * - continuity rituals
 * - learning rhythm support
 * - lightweight learning return loops
 * - continuity preservation psychology
 *
 * MUST NOT:
 * - manipulate habits aggressively
 * - create addiction loops
 * - inject fake urgency
 */

import {

    getContinuityState

}

from "./learningContinuityEngine";

// ============================================
// BUILD CONTINUITY RITUAL
// ============================================

export function buildContinuityRitual() {

    const continuity =
        getContinuityState();

    return {

        ritualStage:

            classifyRitualStage(
                continuity
            ),

        ritualMessage:

            buildRitualMessage(
                continuity
            ),

        continuityDays:
            continuity.streakDays
    };
}

// ============================================
// RITUAL STAGE
// ============================================

function classifyRitualStage(
    continuity
) {

    if (
        continuity.streakDays >= 30
    ) {

        return "deep-rhythm";
    }

    if (
        continuity.streakDays >= 14
    ) {

        return "stable-rhythm";
    }

    if (
        continuity.streakDays >= 5
    ) {

        return "forming-rhythm";
    }

    return "starting-rhythm";
}

// ============================================
// RITUAL MESSAGE
// ============================================

function buildRitualMessage(
    continuity
) {

    if (
        continuity.streakDays >= 30
    ) {

        return (
            "Learning is becoming part of your natural rhythm"
        );
    }

    if (
        continuity.streakDays >= 14
    ) {

        return (
            "Your continuity rhythm is becoming more stable"
        );
    }

    if (
        continuity.streakDays >= 5
    ) {

        return (
            "A sustainable learning rhythm is forming"
        );
    }

    return (
        "Small consistent steps build lasting momentum"
    );
}