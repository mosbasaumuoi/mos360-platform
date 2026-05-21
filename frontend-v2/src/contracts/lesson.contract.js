// ============================================
// LESSON CONTRACT
// Canonical lightweight runtime contract
// ============================================

// ============================================
// REQUIRED FIELDS
// ============================================

export const LESSON_REQUIRED_FIELDS = [

    "id",

    "courseId",

    "title",

    "order",

    "xpReward"
];

// ============================================
// OPTIONAL ARRAY FIELDS
// ============================================

export const LESSON_OPTIONAL_ARRAY_FIELDS = [

    "objectives",

    "workflowSteps",

    "commonMistakes",

    "practicalNotes",

    "resources",

    "tags",

    "quiz"
];

// ============================================
// OPTIONAL STRING FIELDS
// ============================================

export const LESSON_OPTIONAL_STRING_FIELDS = [

    "content",

    "description",

    "duration",

    "difficulty",

    "videoUrl",

    "version"
];

// ============================================
// VALIDATE LESSON
// ============================================

export function validateLesson(
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
    // REQUIRED FIELDS
    // ========================================

    const requiredValid =

        LESSON_REQUIRED_FIELDS.every(

            field =>

                field in lesson
        );

    if (!requiredValid) {

        return false;
    }

    // ========================================
    // OPTIONAL ARRAYS
    // ========================================

    const arraysValid =

        LESSON_OPTIONAL_ARRAY_FIELDS.every(

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

    // ========================================
    // OPTIONAL STRINGS
    // ========================================

    const stringsValid =

        LESSON_OPTIONAL_STRING_FIELDS.every(

            field => {

                // ==================================
                // DURATION
                // ==================================

                if (field === "duration") {

                    return (

                        !lesson[field]
                        ||

                        typeof lesson[field]
                        ===
                        "string"

                        ||

                        typeof lesson[field]
                        ===
                        "number"
                    );
                }

                // ==================================
                // DEFAULT STRING
                // ==================================

                return (

                    !lesson[field]
                    ||

                    typeof lesson[field]
                    ===
                    "string"
                );
            }
        );

    if (!stringsValid) {

        return false;
    }
    return true;
}
