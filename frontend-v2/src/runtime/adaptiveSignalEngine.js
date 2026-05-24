/**
 * MOS360
 * Adaptive Signal Engine
 *
 * RESPONSIBILITY:
 * - aggregate telemetry
 * - learning state analysis
 * - continuity analysis
 * - reinforcement signals
 * - pacing state
 *
 * MUST NOT:
 * - mutate runtime
 * - adapt lessons directly
 * - render analytics UI
 */

import {

    getTelemetryByLesson

}

from "./learningTelemetryEngine";

import {

    getMomentumStatus

}

from "./momentumTelemetryEngine";

// ============================================
// BUILD LEARNING SIGNALS
// ============================================

export function buildLearningSignals(
    lessonId
) {

    const telemetry =
        getTelemetryByLesson(
            lessonId
        );

    const completedBlocks =

        telemetry.filter(

            event =>

                event.type ===
                "block-complete"

        ).length;

    const hesitationCount =

        telemetry.filter(

            event =>

                event.type ===
                "hesitation"

        ).length;

    const retryCount =

        telemetry.filter(

            event =>

                event.type ===
                "retry"

        ).length;

    const exitedEarly =

        telemetry.some(

            event =>

                event.type ===
                "session-exit"
        );

    const momentum =
        getMomentumStatus({

            completedBlocks,

            hesitationCount,

            retryCount,

            exitedEarly
        });

    return {

        lessonId,

        telemetryCount:
            telemetry.length,

        completedBlocks,

        hesitationCount,

        retryCount,

        exitedEarly,

        momentum
    };
}

// ============================================
// SHOULD REINFORCE
// ============================================

export function shouldInjectReinforcement(
    signals = {}
) {

    return (

        signals.momentum
            ?.status ===
        "decaying"
    );
}

// ============================================
// SHOULD REDUCE DENSITY
// ============================================

export function shouldReduceDensity(
    signals = {}
) {

    return (

        signals.hesitationCount >= 3 ||

        signals.retryCount >= 3
    );
}

// ============================================
// SHOULD RECOVER CONTINUITY
// ============================================

export function shouldRecoverContinuity(
    signals = {}
) {

    return (
        signals.exitedEarly
    );
}