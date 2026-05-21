// ============================================
// MOS360 CONTENT VALIDATION ENGINE
// Centralized content integrity runtime
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
// VALIDATE COURSE GRAPH
// ============================================

export function validateCourseGraph(

    course

) {

    // ========================================
    // VALIDATE COURSE
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
    // VALIDATE LESSON
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