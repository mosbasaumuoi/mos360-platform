// ============================================
// MOS360 CONTENT VALIDATION ENGINE
// Hybrid semantic runtime convergence
// ============================================

import {
    validateCourse
}
    from "../contracts/course.contract.js";

import {
    validateLesson
}
    from "../contracts/lesson.contract.js";

import {
    validateLessonSummary
}
    from "../contracts/lessonSummary.contract.js";

import {
    validateQuizQuestion
}
    from "../contracts/quiz.contract.js";

import {
    logWarn
}
    from "../utils/logger.js";

// ============================================
// RUNTIME COURSE VALIDATOR
// ============================================

function validateRuntimeCourse(
    course = {}
) {

    // ========================================
    // REQUIRED
    // ========================================

    if (
        !course.id
        ||
        !course.title
        ||
        !Array.isArray(
            course.lessons
        )
    ) {

        return false;
    }

    // ========================================
    // RUNTIME SAFE DEFAULTS
    // ========================================

    return true;
}

// ============================================
// RUNTIME LESSON VALIDATOR
// ============================================

function validateRuntimeLesson(
    lesson = {}
) {

    // ========================================
    // REQUIRED
    // ========================================

    if (
        !lesson.id
        ||
        !lesson.courseId
        ||
        !lesson.title
    ) {

        return false;
    }

    // ========================================
    // BLOCKS
    // ========================================

    if (
        lesson.blocks
        &&
        !Array.isArray(
            lesson.blocks
        )
    ) {

        return false;
    }

    return true;
}

// ============================================
// VALIDATE COURSE GRAPH
// ============================================

export function validateCourseGraph(

    course

) {

    // ========================================
    // RUNTIME SEMANTIC PATH
    // ========================================

    if (

        course?.runtimeImported

    ) {

        const validRuntimeCourse =

            validateRuntimeCourse(
                course
            );

        if (!validRuntimeCourse) {

            logWarn(

                "RUNTIME",

                "invalid runtime course",

                course

            );

            return false;
        }

        return true;
    }

    // ========================================
    // STATIC CONTRACT PATH
    // ========================================

    const validCourse =

        validateCourse(
            course
        );

    if (!validCourse) {

        logWarn(

            "CONTENT",

            "invalid course contract",

            course

        );

        return false;
    }

    // ========================================
    // VALIDATE LESSON GRAPH
    // ========================================

    const validLessonGraph =

        course.lessons.every(

            validateLessonSummary
        );

    if (!validLessonGraph) {

        logWarn(

            "CONTENT",

            "invalid lesson graph",

            {
                courseId:
                    course.id
            }

        );

        return false;
    }

    return true;
}

// ============================================
// VALIDATE LESSON DETAIL
// ============================================

export function validateLessonDetail(

    lesson

) {

    // ========================================
    // RUNTIME BRIDGE BYPASS
    // ========================================

    if (

        lesson?.runtimeBridge
        ||
        lesson?.runtimeImported

    ) {

        return true;
    }

    // ========================================
    // RUNTIME SEMANTIC PATH
    // ========================================

    if (

        lesson?.runtimeImported

    ) {

        const validRuntimeLesson =

            validateRuntimeLesson(
                lesson
            );

        if (!validRuntimeLesson) {

            logWarn(

                "RUNTIME",

                "invalid runtime lesson",

                lesson

            );

            return false;
        }

        return true;
    }

    // ========================================
    // STATIC CONTRACT PATH
    // ========================================

    const validLesson =

        validateLesson(
            lesson
        );

    if (!validLesson) {

        logWarn(

            "CONTENT",

            "invalid lesson detail",

            lesson

        );

        return false;
    }

    // ========================================
    // VALIDATE QUIZ
    // ========================================

    const validQuiz =

        (lesson.quiz || [])
            .every(
                validateQuizQuestion
            );

    if (!validQuiz) {

        logWarn(

            "CONTENT",

            "invalid lesson quiz",

            {
                lessonId:
                    lesson.id
            }

        );

        return false;
    }

    return true;
}