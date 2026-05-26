/**
 * MOS360
 * Continuity Recovery Emotion Engine
 *
 * RESPONSIBILITY:
 * - emotional continuity recovery
 * - guilt-free return support
 * - continuity restoration psychology
 * - lightweight re-entry emotion layer
 *
 * MUST NOT:
 * - create guilt pressure
 * - manipulate learner emotions
 * - inject urgency retention loops
 */

import {

    buildReturnState

}

from "./returnToLearningEngine";

// ============================================
// BUILD RECOVERY EMOTION
// ============================================

export function buildRecoveryEmotion() {

    const returnState =
        buildReturnState();

    return {

        recoveryStage:

            classifyRecoveryStage(
                returnState
            ),

        emotionalMessage:

            buildRecoveryMessage(
                returnState
            ),

        inactiveDays:
            returnState.inactiveDays
    };
}

// ============================================
// RECOVERY STAGE
// ============================================

function classifyRecoveryStage(
    returnState
) {

    if (
        returnState.inactiveDays >= 14
    ) {

        return "deep-recovery";
    }

    if (
        returnState.inactiveDays >= 5
    ) {

        return "soft-recovery";
    }

    if (
        returnState.inactiveDays >= 2
    ) {

        return "light-recovery";
    }

    return "stable";
}

// ============================================
// RECOVERY MESSAGE
// ============================================

function buildRecoveryMessage(
    returnState
) {

    if (
        returnState.inactiveDays >= 14
    ) {

        return (
            "You can restart gently — your progression still matters"
        );
    }

    if (
        returnState.inactiveDays >= 5
    ) {

        return (
            "A small return step is enough to rebuild continuity"
        );
    }

    if (
        returnState.inactiveDays >= 2
    ) {

        return (
            "Your learning rhythm can recover naturally"
        );
    }

    return (
        "Your continuity is moving steadily"
    );
}