/**
 * MOS360
 * Learning Identity Engine
 *
 * RESPONSIBILITY:
 * - learning identity
 * - progression identity
 * - continuity self-perception
 * - learning evolution feeling
 *
 * MUST NOT:
 * - manipulate psychology
 * - create fake achievement identity
 * - inject ego-based gamification
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
// BUILD LEARNING IDENTITY
// ============================================

export function buildLearningIdentity() {

    const continuity =
        getContinuityState();

    const memories =
        getProgressionMemory();

    return {

        identityStage:

            classifyIdentityStage({

                continuity,

                memories
            }),

        continuityLevel:
            continuity.continuityStatus,

        progressionMemories:
            memories.length,

        identityMessage:

            buildIdentityMessage({

                continuity,

                memories
            })
    };
}

// ============================================
// IDENTITY STAGE
// ============================================

function classifyIdentityStage({

    continuity,

    memories

}) {

    if (
        continuity.streakDays >= 30
    ) {

        return "evolving";
    }

    if (
        continuity.streakDays >= 14
    ) {

        return "consistent";
    }

    if (
        memories.length >= 5
    ) {

        return "building";
    }

    return "starting";
}

// ============================================
// IDENTITY MESSAGE
// ============================================

function buildIdentityMessage({

    continuity,

    memories

}) {

    if (
        continuity.streakDays >= 30
    ) {

        return (
            "Your learning identity is becoming deeply rooted"
        );
    }

    if (
        continuity.streakDays >= 14
    ) {

        return (
            "Your consistency is becoming part of who you are"
        );
    }

    if (
        memories.length >= 5
    ) {

        return (
            "Your learning journey is becoming more structured"
        );
    }

    return (
        "Every small step is shaping your progression"
    );
}