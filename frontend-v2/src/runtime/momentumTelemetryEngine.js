/**
 * MOS360
 * Momentum Telemetry Engine
 *
 * RESPONSIBILITY:
 * - momentum decay detection
 * - continuity drop signals
 * - disengagement tracking
 * - session rhythm analysis
 *
 * MUST NOT:
 * - mutate runtime
 * - adapt lessons directly
 * - render analytics UI
 */

// ============================================
// MOMENTUM STATUS
// ============================================

export function getMomentumStatus({

    completedBlocks = 0,

    hesitationCount = 0,

    retryCount = 0,

    exitedEarly = false

}) {

    let score = 100;

    // ================================
    // LOW COMPLETION
    // ================================

    if (completedBlocks <= 2) {

        score -= 20;
    }

    // ================================
    // HESITATION
    // ================================

    score -= (
        hesitationCount * 5
    );

    // ================================
    // RETRIES
    // ================================

    score -= (
        retryCount * 4
    );

    // ================================
    // EARLY EXIT
    // ================================

    if (exitedEarly) {

        score -= 25;
    }

    return classifyMomentum(
        Math.max(0, score)
    );
}

// ============================================
// CLASSIFY MOMENTUM
// ============================================

function classifyMomentum(
    score
) {

    if (score >= 85) {

        return {
            score,
            status: "healthy"
        };
    }

    if (score >= 60) {

        return {
            score,
            status: "unstable"
        };
    }

    return {
        score,
        status: "decaying"
    };
}

// ============================================
// SHOULD REINFORCE
// ============================================

export function shouldReinforceMomentum(
    momentum = {}
) {

    return (
        momentum.status ===
        "decaying"
    );
}

// ============================================
// SHOULD SIMPLIFY FLOW
// ============================================

export function shouldSimplifyFlow(
    momentum = {}
) {

    return (
        momentum.score < 50
    );
}