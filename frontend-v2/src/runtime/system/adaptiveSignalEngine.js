/**
 * MOS360
 * Adaptive Signal Engine
 *
 * RESPONSIBILITY:
 * - lightweight runtime signals
 * - adaptive overlays
 * - continuity hints
 * - reinforcement hints
 * - deterministic runtime guidance
 *
 * MUST NOT:
 * - own telemetry systems
 * - own analytics authority
 * - mutate persisted runtime
 */

// ============================================
// BUILD LEARNING SIGNALS
// ============================================

export function buildLearningSignals(
    lessonId
) {

    // ========================================
    // LIGHTWEIGHT RUNTIME SIGNALS
    // ========================================

    const runtimeSession =

        safelyReadRuntimeSession(
            lessonId
        );

    const hesitationCount =

        runtimeSession
            ?.hesitationCount || 0;

    const retryCount =

        runtimeSession
            ?.retryCount || 0;

    const reinforcementCount =

        runtimeSession
            ?.reinforcementCount || 0;

    const completedBlocks =

        runtimeSession
            ?.completedBlocks || 0;

    const exitedEarly =

        runtimeSession
            ?.exitedEarly || false;

    // ========================================
    // MOMENTUM STATE
    // ========================================

    const momentum =

        resolveMomentumState({

            completedBlocks,

            hesitationCount,

            retryCount,

            exitedEarly
        });

    // ========================================
    // RUNTIME HEALTH
    // ========================================

    const runtimeHealth =

        calculateRuntimeHealth({

            hesitationCount,

            retryCount,

            exitedEarly
        });

    return {

        lessonId,

        overlayMode:
            true,

        completedBlocks,

        hesitationCount,

        retryCount,

        reinforcementCount,

        exitedEarly,

        momentum,

        runtimeHealth
    };
}

// ============================================
// SAFE SESSION ACCESS
// ============================================

function safelyReadRuntimeSession(
    lessonId
) {

    try {

        const raw = localStorage.getItem(

            `mos360_runtime_${ lessonId } `
        );

        if (!raw) {

            return {};
        }

        return JSON.parse(raw);

    }

    catch {

        return {};
    }
}

// ============================================
// MOMENTUM STATE
// ============================================

function resolveMomentumState({

    completedBlocks = 0,

    hesitationCount = 0,

    retryCount = 0,

    exitedEarly = false

}) {

    if (
        exitedEarly
    ) {

        return {

            status:
                "interrupted"
        };
    }

    if (

        hesitationCount >= 3
        ||
        retryCount >= 3

    ) {

        return {

            status:
                "decaying"
        };
    }

    if (

        completedBlocks >= 3

    ) {

        return {

            status:
                "accelerating"
        };
    }

    return {

        status:
            "stable"
    };
}

// ============================================
// SHOULD INJECT REINFORCEMENT
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

// ============================================
// RUNTIME HEALTH
// ============================================

function calculateRuntimeHealth({

    hesitationCount = 0,

    retryCount = 0,

    exitedEarly = false

}) {

    if (

        exitedEarly
        &&
        hesitationCount >= 3

    ) {

        return "unstable";
    }

    if (

        retryCount >= 3

    ) {

        return "recovering";
    }

    return "healthy";
}
