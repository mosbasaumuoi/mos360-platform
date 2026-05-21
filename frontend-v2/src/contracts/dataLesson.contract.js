// ============================================
// DATA LESSON CONTRACT
// JSON-driven semantic lesson schema
// ============================================

// ============================================
// REQUIRED
// ============================================

export const DATA_LESSON_REQUIRED_FIELDS = [

    "id",

    "courseId",

    "title"
];

// ============================================
// VALIDATE DATA LESSON
// ============================================

export function validateDataLesson(

    lesson

) {

    // ========================================
    // OBJECT
    // ========================================

    if (

        !lesson
        ||

        typeof lesson
        !==
        "object"

    ) {

        return false;
    }

    // ========================================
    // REQUIRED
    // ========================================

    const validRequired =

        DATA_LESSON_REQUIRED_FIELDS.every(

            field =>

                field in lesson
        );

    if (!validRequired) {

        return false;
    }

    // ========================================
    // WORKFLOWS
    // ========================================

    if (

        lesson.workflowSteps
        &&

        !Array.isArray(
            lesson.workflowSteps
        )

    ) {

        return false;
    }

    // ========================================
    // TIPS
    // ========================================

    if (

        lesson.tips
        &&

        !Array.isArray(
            lesson.tips
        )

    ) {

        return false;
    }

    // ========================================
    // QUIZ
    // ========================================

    if (

        lesson.quiz
        &&

        !Array.isArray(
            lesson.quiz
        )

    ) {

        return false;
    }

    return true;
}