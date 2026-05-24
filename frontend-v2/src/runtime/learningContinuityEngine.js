/**
 * MOS360
 * Learning Continuity Engine
 *
 * RESPONSIBILITY:
 * - continuity tracking
 * - learning streaks
 * - continuity preservation
 * - progression continuity
 * - return-to-learning signals
 *
 * MUST NOT:
 * - mutate lessons
 * - inject fake gamification
 * - bypass runtime telemetry
 */

const CONTINUITY_KEY =
    "mos360_learning_continuity";

// ============================================
// GET CONTINUITY STATE
// ============================================

export function getContinuityState() {

    try {

        return JSON.parse(

            localStorage.getItem(
                CONTINUITY_KEY
            ) || "null"

        ) || createEmptyContinuity();

    } catch {

        return createEmptyContinuity();
    }
}

// ============================================
// CREATE EMPTY CONTINUITY
// ============================================

function createEmptyContinuity() {

    return {

        streakDays: 0,

        lastLearningAt: null,

        totalSessions: 0,

        continuityStatus:
            "starting"
    };
}

// ============================================
// SAVE CONTINUITY STATE
// ============================================

export function saveContinuityState(
    state
) {

    localStorage.setItem(

        CONTINUITY_KEY,

        JSON.stringify(state)
    );

    return state;
}

// ============================================
// REGISTER LEARNING SESSION
// ============================================

export function registerLearningSession() {

    const current =
        getContinuityState();

    const now =
        Date.now();

    const lastLearningAt =
        current.lastLearningAt;

    let streakDays =
        current.streakDays;

    // ================================
    // CONTINUITY WINDOW
    // ================================

    if (
        isWithinContinuityWindow(
            lastLearningAt,
            now
        )
    ) {

        streakDays += 1;

    } else {

        streakDays = 1;
    }

    const updated = {

        ...current,

        streakDays,

        totalSessions:

            current.totalSessions + 1,

        lastLearningAt:
            now,

        continuityStatus:

            classifyContinuity(
                streakDays
            )
    };

    saveContinuityState(
        updated
    );

    return updated;
}

// ============================================
// CONTINUITY WINDOW
// ============================================

function isWithinContinuityWindow(
    previous,
    current
) {

    if (!previous) {

        return false;
    }

    const DAY =
        1000 * 60 * 60 * 24;

    return (
        current - previous <
        DAY * 2
    );
}

// ============================================
// CLASSIFY CONTINUITY
// ============================================

function classifyContinuity(
    streakDays
) {

    if (streakDays >= 30) {

        return "deep";

    }

    if (streakDays >= 7) {

        return "stable";
    }

    if (streakDays >= 3) {

        return "building";
    }

    return "starting";
}