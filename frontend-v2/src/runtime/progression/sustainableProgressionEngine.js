/**
 * MOS360
 * Sustainable Progression Engine
 *
 * RESPONSIBILITY:
 * - sustainable learning continuity
 * - long-term progression stability
 * - progression health awareness
 * - anti-burnout progression support
 *
 * MUST NOT:
 * - maximize addictive engagement
 * - create urgency pressure
 * - optimize short-term retention only
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
// BUILD SUSTAINABLE PROGRESSION
// ============================================

export function buildSustainableProgression() {

    const continuity =
        getContinuityState();

    const memories =
        getProgressionMemory();

    return {

        sustainabilityStage:

            classifySustainability({

                continuity,

                memories
            }),

        sustainabilityMessage:

            buildSustainabilityMessage({

                continuity,

                memories
            }),

        progressionHealth:

            calculateProgressionHealth({

                continuity,

                memories
            })
    };
}

// ============================================
// SUSTAINABILITY STAGE
// ============================================

function classifySustainability({

    continuity,

    memories

}) {

    if (
        continuity.streakDays >= 30
    ) {

        return "deep-stability";
    }

    if (
        continuity.streakDays >= 14
    ) {

        return "stable-growth";
    }

    if (
        memories.length >= 5
    ) {

        return "building-consistency";
    }

    return "early-growth";
}

// ============================================
// SUSTAINABILITY MESSAGE
// ============================================

function buildSustainabilityMessage({

    continuity,

    memories

}) {

    if (
        continuity.streakDays >= 30
    ) {

        return (
            "Your progression rhythm is becoming sustainable long-term"
        );
    }

    if (
        continuity.streakDays >= 14
    ) {

        return (
            "Your learning consistency is stabilizing naturally"
        );
    }

    if (
        memories.length >= 5
    ) {

        return (
            "Your progression foundation is becoming healthier"
        );
    }

    return (
        "Sustainable progress grows from small consistent steps"
    );
}

// ============================================
// PROGRESSION HEALTH
// ============================================

function calculateProgressionHealth({

    continuity,

    memories

}) {

    let health = 50;

    health += Math.min(
        continuity.streakDays,
        30
    );

    health += Math.min(
        memories.length * 2,
        20
    );

    return Math.min(
        health,
        100
    );
}