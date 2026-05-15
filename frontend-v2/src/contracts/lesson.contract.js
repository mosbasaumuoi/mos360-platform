// ============================================
// LESSON CONTRACT
// Canonical lightweight runtime contract
// ============================================

export const LESSON_REQUIRED_FIELDS = [

    "id",

    "courseId",

    "title",

    "order",

    "xpReward"
];

// ============================================
// VALIDATE LESSON
// ============================================

export function validateLesson(
    lesson
) {

    return LESSON_REQUIRED_FIELDS.every(

        field =>

            field in lesson
    );
}