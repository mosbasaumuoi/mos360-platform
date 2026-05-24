/**
 * MOS360
 * Return To Learning Engine
 *
 * RESPONSIBILITY:
 * - return-to-learning hooks
 * - continuity recall
 * - progression memory
 * - lightweight recovery psychology
 *
 * MUST NOT:
 * - spam notifications
 * - fake urgency
 * - manipulate learner psychology
 */

import {

    getContinuityState

}

from "./learningContinuityEngine";

// ============================================
// BUILD RETURN STATE
// ============================================

export function buildReturnState() {

    const continuity =
        getContinuityState();

    const now =
        Date.now();

    const lastLearningAt =
        continuity.lastLearningAt;

    const inactiveDays =
        calculateInactiveDays({

            lastLearningAt,

            now
        });

    return {

        inactiveDays,

        shouldRecover:
            inactiveDays >= 2,

        returnMessage:
            buildReturnMessage({

                inactiveDays,

                continuity
            })
    };
}

// ============================================
// INACTIVE DAYS
// ============================================

function calculateInactiveDays({

    lastLearningAt,

    now

}) {

    if (!lastLearningAt) {

        return 0;
    }

    const DAY =
        1000 * 60 * 60 * 24;

    return Math.floor(
        (now - lastLearningAt) / DAY
    );
}

// ============================================
// RETURN MESSAGE
// ============================================

function buildReturnMessage({

    inactiveDays,

    continuity

}) {

    // ================================
    // ACTIVE LEARNER
    // ================================

    if (inactiveDays <= 1) {

        return (
            "Your learning momentum looks healthy"
        );
    }

    // ================================
    // LIGHT RECOVERY
    // ================================

    if (inactiveDays <= 3) {

        return (
            "Let's quickly regain your learning flow"
        );
    }

    // ================================
    // DEEP RECOVERY
    // ================================

    if (
        continuity.streakDays >= 7
    ) {

        return (
            "Your continuity was strong — let's rebuild it gently"
        );
    }

    return (
        "A small step forward is enough to restart momentum"
    );
}