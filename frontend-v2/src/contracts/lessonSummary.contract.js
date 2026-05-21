// ============================================
// LESSON SUMMARY CONTRACT
// Lightweight lesson graph runtime contract
// ============================================

// ============================================
// REQUIRED FIELDS
// ============================================

export const LESSON_SUMMARY_REQUIRED_FIELDS = [

    "id",

    "title"
];

// ============================================
// OPTIONAL STRING FIELDS
// ============================================

export const LESSON_SUMMARY_OPTIONAL_STRING_FIELDS = [

    "duration",

    "difficulty",

    "type",

    "status"
];

// ============================================
// OPTIONAL NUMBER FIELDS
// ============================================

export const LESSON_SUMMARY_OPTIONAL_NUMBER_FIELDS = [

    "order",

    "xpReward"
];

// ============================================
// OPTIONAL ARRAY FIELDS
// ============================================

export const LESSON_SUMMARY_OPTIONAL_ARRAY_FIELDS = [

    "tags"
];

// ============================================
// VALIDATE LESSON SUMMARY
// ============================================

export function validateLessonSummary(

    lesson

) {

    // ========================================
    // OBJECT CHECK
    // ========================================

    if (

        !lesson
        ||
        typeof lesson !== "object"

    ) {

        return false;
    }

    // ========================================
    // REQUIRED
    // ========================================

    const requiredValid =

        LESSON_SUMMARY_REQUIRED_FIELDS.every(

            field =>

                field in lesson
        );

    if (!requiredValid) {

        return false;
    }

    // ========================================
    // OPTIONAL STRINGS
    // ========================================

    const stringsValid =

        LESSON_SUMMARY_OPTIONAL_STRING_FIELDS.every(

            field =>

                !lesson[field]
                ||

                typeof lesson[field]
                ===
                "string"
        );

    if (!stringsValid) {

        return false;
    }

    // ========================================
    // OPTIONAL NUMBERS
    // ========================================

    const numbersValid =

        LESSON_SUMMARY_OPTIONAL_NUMBER_FIELDS.every(

            field =>

                !lesson[field]
                ||

                typeof lesson[field]
                ===
                "number"
        );

    if (!numbersValid) {

        return false;
    }

    // ========================================
    // OPTIONAL ARRAYS
    // ========================================

    const arraysValid =

        LESSON_SUMMARY_OPTIONAL_ARRAY_FIELDS.every(

            field =>

                !lesson[field]
                ||

                Array.isArray(
                    lesson[field]
                )
        );

    if (!arraysValid) {

        return false;
    }

    return true;
}