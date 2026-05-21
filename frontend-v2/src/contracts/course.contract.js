// ============================================
// COURSE CONTRACT
// Canonical lightweight runtime contract
// ============================================

// ============================================
// REQUIRED FIELDS
// ============================================

export const COURSE_REQUIRED_FIELDS = [

    "id",

    "slug",

    "title",

    "description",

    "category",

    "level",

    "xpReward",

    "lessons"
];

// ============================================
// OPTIONAL ARRAY FIELDS
// ============================================

export const COURSE_OPTIONAL_ARRAY_FIELDS = [

    "tags",

    "objectives",

    "skills",

    "requirements",

    "learningOutcomes"
];

// ============================================
// OPTIONAL STRING FIELDS
// ============================================

export const COURSE_OPTIONAL_STRING_FIELDS = [

    "thumbnail",

    "duration",

    "difficulty",

    "status",

    "version"
];

// ============================================
// VALIDATE COURSE
// ============================================

export function validateCourse(
    course
) {

    // ========================================
    // OBJECT CHECK
    // ========================================

    if (

        !course
        ||
        typeof course !== "object"

    ) {

        return false;
    }

    // ========================================
    // REQUIRED FIELDS
    // ========================================

    const requiredValid =

        COURSE_REQUIRED_FIELDS.every(

            field =>

                field in course
        );

    if (!requiredValid) {

        return false;
    }

    // ========================================
    // OPTIONAL ARRAYS
    // ========================================

    const arraysValid =

        COURSE_OPTIONAL_ARRAY_FIELDS.every(

            field =>

                !course[field]
                ||
                Array.isArray(
                    course[field]
                )
        );

    if (!arraysValid) {

        return false;
    }

    // ========================================
    // OPTIONAL STRINGS
    // ========================================

    const stringsValid =

        COURSE_OPTIONAL_STRING_FIELDS.every(

            field =>

                !course[field]
                ||
                typeof course[field]
                ===
                "string"
        );

    if (!stringsValid) {

        return false;
    }

    return true;
}