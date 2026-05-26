/**
 * MOS360
 * Learning Telemetry Engine
 *
 * RESPONSIBILITY:
 * - learner interaction tracking
 * - pacing telemetry
 * - hesitation signals
 * - retry signals
 * - momentum signals
 *
 * MUST NOT:
 * - mutate runtime
 * - render UI
 * - adapt lessons directly
 */

const TELEMETRY_KEY =
    "mos360_learning_telemetry";

// ============================================
// GET TELEMETRY
// ============================================

export function getLearningTelemetry() {

    try {

        return JSON.parse(

            localStorage.getItem(
                TELEMETRY_KEY
            ) || "[]"
        );

    } catch {

        return [];
    }
}

// ============================================
// SAVE TELEMETRY
// ============================================

export function saveLearningTelemetry(
    telemetry = []
) {

    localStorage.setItem(

        TELEMETRY_KEY,

        JSON.stringify(telemetry)
    );
}

// ============================================
// CREATE TELEMETRY EVENT
// ============================================

export function createTelemetryEvent({

    type,

    lessonId = null,

    blockId = null,

    metadata = {}

}) {

    return {

        eventId:
            crypto.randomUUID(),

        type,

        lessonId,

        blockId,

        metadata,

        timestamp:
            Date.now()
    };
}

// ============================================
// TRACK EVENT
// ============================================

export function trackTelemetryEvent(
    event
) {

    const telemetry =
        getLearningTelemetry();

    telemetry.push(event);

    saveLearningTelemetry(
        telemetry
    );

    return event;
}

// ============================================
// GET TELEMETRY BY LESSON
// ============================================

export function getTelemetryByLesson(
    lessonId
) {

    return getLearningTelemetry()

        .filter(

            event =>

                event.lessonId ===
                lessonId
        );
}