// ============================================
// QUIZ CONTRACT
// Canonical quiz validation runtime
// ============================================

// ============================================
// REQUIRED FIELDS
// ============================================

export const QUIZ_REQUIRED_FIELDS = [

    "question",

    "options",

    "correctAnswer"
];

// ============================================
// OPTIONAL ARRAY FIELDS
// ============================================

export const QUIZ_OPTIONAL_ARRAY_FIELDS = [

    "tags"
];

// ============================================
// OPTIONAL STRING FIELDS
// ============================================

export const QUIZ_OPTIONAL_STRING_FIELDS = [

    "explanation",

    "difficulty",

    "type",

    "reinforcement"
];

// ============================================
// VALIDATE QUIZ QUESTION
// ============================================

export function validateQuizQuestion(

    question

) {

    // ========================================
    // OBJECT CHECK
    // ========================================

    if (

        !question
        ||
        typeof question !== "object"

    ) {

        return false;
    }

    // ========================================
    // REQUIRED
    // ========================================

    const requiredValid =

        QUIZ_REQUIRED_FIELDS.every(

            field =>

                field in question
        );

    if (!requiredValid) {

        return false;
    }

    // ========================================
    // OPTIONS
    // ========================================

    if (

        !Array.isArray(
            question.options
        )

    ) {

        return false;
    }

    // ========================================
    // OPTIONAL ARRAYS
    // ========================================

    const arraysValid =

        QUIZ_OPTIONAL_ARRAY_FIELDS.every(

            field =>

                !question[field]
                ||
                Array.isArray(
                    question[field]
                )
        );

    if (!arraysValid) {

        return false;
    }

    // ========================================
    // OPTIONAL STRINGS
    // ========================================

    const stringsValid =

        QUIZ_OPTIONAL_STRING_FIELDS.every(

            field =>

                !question[field]
                ||
                typeof question[field]
                ===
                "string"
        );

    if (!stringsValid) {

        return false;
    }

    return true;
}