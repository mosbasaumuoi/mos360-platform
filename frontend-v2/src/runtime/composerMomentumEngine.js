/**
 * MOS360
 * Composer Momentum Engine
 *
 * RESPONSIBILITY:
 * - progression feeling analysis
 * - momentum continuity
 * - session rhythm analysis
 * - learning flow awareness
 *
 * MUST NOT:
 * - mutate persisted runtime
 * - overwrite lessons
 * - bypass sequencing
 */

// ============================================
// MOMENTUM SCORE
// ============================================

export function calculateMomentumScore(
    blocks = []
) {

    let score = 100;

    // ================================
    // TOO MANY BLOCKS
    // ================================

    if (blocks.length > 12) {

        score -= 15;
    }

    // ================================
    // NO REINFORCEMENT
    // ================================

    const hasReinforcement =
        blocks.some(

            block =>

                block.type ===
                "checkpoint"

                ||

                block.type ===
                "reinforcement"
        );

    if (!hasReinforcement) {

        score -= 20;
    }

    // ================================
    // TOO MANY PRIMARY
    // ================================

    let consecutivePrimary = 0;

    blocks.forEach(block => {

        if (

            block.priority ===
            "primary"

        ) {

            consecutivePrimary++;

        } else {

            consecutivePrimary = 0;
        }

        if (consecutivePrimary >= 4) {

            score -= 10;
        }
    });

    return Math.max(
        0,
        score
    );
}

// ============================================
// MOMENTUM STATUS
// ============================================

export function getMomentumStatus(
    score = 0
) {

    if (score >= 85) {

        return "excellent";
    }

    if (score >= 70) {

        return "good";
    }

    if (score >= 50) {

        return "warning";
    }

    return "critical";
}

// ============================================
// MOMENTUM MESSAGE
// ============================================

export function getMomentumMessage(
    status
) {

    switch (status) {

        case "excellent":

            return (
                "Flow feels smooth and progression-oriented"
            );

        case "good":

            return (
                "Learning continuity looks healthy"
            );

        case "warning":

            return (
                "Momentum may feel inconsistent"
            );

        case "critical":

            return (
                "Lesson flow may overwhelm learners"
            );

        default:

            return "";
    }
}