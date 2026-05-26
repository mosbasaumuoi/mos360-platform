/**
 * MOS360
 * Progression Reflection Engine
 *
 * RESPONSIBILITY:
 * - progression reflection
 * - continuity awareness
 * - learning self-reflection
 * - progression perception
 *
 * MUST NOT:
 * - manipulate emotions
 * - create fake achievement pressure
 * - inject dopamine mechanics
 */

import {

    getContinuityState

}

from "./learningContinuityEngine";

import {

    getProgressionMemory

}

from "../progressionMemoryEngine";

// ============================================
// BUILD PROGRESSION REFLECTION
// ============================================

export function buildProgressionReflection() {

    const continuity =
        getContinuityState();

    const memories =
        getProgressionMemory();

    return {

        reflectionStage:

            classifyReflectionStage({

                continuity,

                memories
            }),

        reflectionMessage:

            buildReflectionMessage({

                continuity,

                memories
            }),

        memoryCount:
            memories.length
    };
}

// ============================================
// REFLECTION STAGE
// ============================================

function classifyReflectionStage({

    continuity,

    memories

}) {

    if (
        continuity.streakDays >= 30
    ) {

        return "deep-reflection";
    }

    if (
        continuity.streakDays >= 14
    ) {

        return "stable-reflection";
    }

    if (
        memories.length >= 5
    ) {

        return "building-reflection";
    }

    return "starting-reflection";
}

// ============================================
// REFLECTION MESSAGE
// ============================================

function buildReflectionMessage({

    continuity,

    memories

}) {

    if (
        continuity.streakDays >= 30
    ) {

        return (
            "Your learning journey is showing long-term continuity"
        );
    }

    if (
        continuity.streakDays >= 14
    ) {

        return (
            "Your progression is becoming increasingly consistent"
        );
    }

    if (
        memories.length >= 5
    ) {

        return (
            "Your accumulated learning steps are becoming meaningful"
        );
    }

    return (
        "Every learning session contributes to your progression"
    );
}