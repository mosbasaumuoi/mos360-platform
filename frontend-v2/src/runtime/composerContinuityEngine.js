/**
 * MOS360
 * Composer Continuity Engine
 *
 * RESPONSIBILITY:
 * - continuity hints
 * - pacing analysis
 * - fatigue detection foundation
 * - reinforcement suggestions
 * - progression-aware orchestration
 *
 * MUST NOT:
 * - mutate persisted runtime
 * - overwrite lessons
 * - bypass sequencing
 */

// ============================================
// PRIMARY BLOCKS
// ============================================

const PRIMARY_BLOCKS = [
    "video",
    "workflow",
    "text"
];

// ============================================
// REINFORCEMENT BLOCKS
// ============================================

const REINFORCEMENT_BLOCKS = [
    "checkpoint",
    "reinforcement",
    "continuity"
];

// ============================================
// ANALYZE CONTINUITY
// ============================================

export function analyzeContinuity(
    blocks = []
) {

    return {

        pacingWarnings:
            detectPacingWarnings(
                blocks
            ),

        reinforcementSuggestions:
            detectReinforcementSuggestions(
                blocks
            ),

        fatigueWarnings:
            detectFatigueWarnings(
                blocks
            )
    };
}

// ============================================
// PACING WARNINGS
// ============================================

function detectPacingWarnings(
    blocks = []
) {

    const warnings = [];

    if (blocks.length > 12) {

        warnings.push(
            "Lesson flow may feel too long"
        );
    }

    return warnings;
}

// ============================================
// FATIGUE WARNINGS
// ============================================

function detectFatigueWarnings(
    blocks = []
) {

    const warnings = [];

    let consecutivePrimary = 0;

    blocks.forEach(block => {

        if (
            PRIMARY_BLOCKS.includes(
                block.type
            )
        ) {

            consecutivePrimary++;

        } else {

            consecutivePrimary = 0;
        }

        if (consecutivePrimary >= 4) {

            warnings.push(
                "Too many primary blocks continuously"
            );
        }
    });

    return warnings;
}

// ============================================
// REINFORCEMENT SUGGESTIONS
// ============================================

function detectReinforcementSuggestions(
    blocks = []
) {

    const suggestions = [];

    const hasReinforcement =
        blocks.some(

            block =>

                REINFORCEMENT_BLOCKS.includes(
                    block.type
                )
        );

    if (!hasReinforcement) {

        suggestions.push(
            "Consider adding reinforcement blocks"
        );
    }

    return suggestions;
}