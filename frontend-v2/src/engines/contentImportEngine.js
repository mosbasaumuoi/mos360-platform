// ============================================
// MOS360 CONTENT IMPORT ENGINE
// Centralized content ingestion runtime
// ============================================

import {
    normalizeCourse
}
    from "./courseNormalizer.js";

import {
    normalizeLesson
}
    from "./lessonNormalizer.js";

import {
    validateCourseGraph,
    validateLessonDetail
}
    from "./contentValidationEngine.js";

import {
    registerCourse,
    registerLesson
}
    from "./contentRegistryEngine.js";

import {
    logWarn,
    logInfo
}
    from "../utils/logger.js";

// ============================================
// IMPORT COURSE
// ============================================

export function importCourse(

    rawCourse

) {

    // ========================================
    // NORMALIZE COURSE
    // ========================================

    const course =

        normalizeCourse(
            rawCourse
        );

    // ========================================
    // VALIDATE COURSE GRAPH
    // ========================================

    const validCourse =

        validateCourseGraph(
            course
        );

    if (!validCourse) {

        logWarn(

            "IMPORT",

            "invalid course import",

            rawCourse

        );

        return {

            ok: false,

            type:
                "invalid-course"
        };
    }

    // ========================================
    // REGISTER COURSE
    // ========================================

    registerCourse(
        course
    );

    logInfo(

        "IMPORT",

        "course imported",

        {
            courseId:
                course.id
        }

    );

    return {

        ok: true,

        course
    };
}

// ============================================
// IMPORT LESSON
// ============================================

export function importLesson(

    rawLesson

) {

    // ========================================
    // NORMALIZE LESSON
    // ========================================

    const lesson =

        normalizeLesson(
            rawLesson
        );

    // ========================================
    // VALIDATE LESSON DETAIL
    // ========================================

    const validLesson =

        validateLessonDetail(
            lesson
        );

    if (!validLesson) {

        logWarn(

            "IMPORT",

            "invalid lesson import",

            rawLesson

        );

        return {

            ok: false,

            type:
                "invalid-lesson"
        };
    }

    // ========================================
    // REGISTER LESSON
    // ========================================

    registerLesson(
        lesson
    );

    logInfo(

        "IMPORT",

        "lesson imported",

        {
            lessonId:
                lesson.id
        }

    );

    return {

        ok: true,

        lesson
    };
}   