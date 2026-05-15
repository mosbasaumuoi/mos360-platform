// ============================================
// COURSE CONTRACT
// Canonical lightweight runtime contract
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
// VALIDATE COURSE
// ============================================

export function validateCourse(
    course
) {

    return COURSE_REQUIRED_FIELDS.every(

        field =>

            field in course
    );
}