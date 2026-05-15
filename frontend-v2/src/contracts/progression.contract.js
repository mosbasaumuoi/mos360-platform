// ============================================
// PROGRESSION CONTRACT
// Canonical lightweight runtime contract
// ============================================

export const PROGRESSION_REQUIRED_FIELDS = [

    "completedLessons",

    "xpEarned"
];

// ============================================
// VALIDATE PROGRESSION
// ============================================

export function validateProgression(
    progression
) {

    return PROGRESSION_REQUIRED_FIELDS.every(

        field =>

            field in progression
    );
}