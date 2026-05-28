// ============================================
// MOS360 LEARN DATA ENGINE
// Hybrid semantic runtime stabilization
// ============================================

import {
    getCourseCompletedKey
}
    from "../utils/storageHelpers.js";

import {
    getStorage
}
    from "../utils/localStorageHelpers.js";

import {
    normalizeCourse
}
    from "./courseNormalizer.js";

import {
    normalizeLesson
}
    from "./lessonNormalizer.js";

import {
    logWarn
}
    from "../utils/logger.js";

import {
    getCompletedLessons
}
    from "./progressionEngine.js";

import {
    validateCourseGraph,
    validateLessonDetail
}
    from "./contentValidationEngine.js";

import {
    loadCourse,
    loadLesson
}
    from "./contentSourceEngine.js";

import {
    registerCourse,
    registerLesson
}
    from "./contentRegistryEngine.js";

// ============================================
// LOAD LEARN PAGE DATA
// ============================================

export async function loadLearnPageData({

    courseId,
    lessonId

}) {

    // ========================================
    // LOAD COURSE
    // ========================================

    const courseResult =

        await loadCourse(
            courseId
        );

    if (!courseResult.ok) {

        return {

            ok: false,

            type:
                courseResult.type
        };
    }

    // ========================================
    // NORMALIZE COURSE
    // ========================================

    const normalizedCourse =

        normalizeCourse(
            courseResult.data
        );

    // ========================================
    // VALIDATE COURSE GRAPH
    // ========================================

    const validCourseGraph =

        validateCourseGraph(
            normalizedCourse
        );

    if (!validCourseGraph) {

        return {

            ok: false,

            type:
                "invalid-course-graph"
        };
    }

    // ========================================
    // LOAD LESSON
    // ========================================

    const lessonResult =

        await loadLesson({

            courseId,
            lessonId

        });

    if (!lessonResult.ok) {

        return {

            ok: false,

            type:
                lessonResult.type
        };
    }

    // ========================================
    // NORMALIZE LESSON
    // ========================================

    const normalizedLesson =

        normalizeLesson(
            lessonResult.data
        );

    // ========================================
    // VALIDATE LESSON
    // ========================================

    const validLesson =

        validateLessonDetail(
            normalizedLesson
        );

    if (!validLesson) {

        return {

            ok: false,

            type:
                "invalid-lesson"
        };
    }

    // ========================================
    // LESSON EXISTS IN COURSE
    // ========================================

    const lessonExists =

        normalizedCourse.lessons.some(

            lesson =>

                lesson.id === lessonId

        );

    if (!lessonExists) {

        logWarn(

            "LESSON",

            "lesson missing from course graph",

            {
                courseId,
                lessonId
            }

        );

        return {

            ok: false,

            type:
                "lesson-graph-mismatch"
        };
    }

    // ========================================
    // REGISTER
    // ========================================

    registerCourse(
        normalizedCourse
    );

    registerLesson(

        `${courseId}:${lessonId}`,

        normalizedLesson
    );

    // ========================================
    // PROGRESSION
    // ========================================

    const completedLessons =

        getCompletedLessons(
            courseId
        );

    const lessonCompleted =

        completedLessons.includes(
            lessonId
        );

    // ========================================
    // NEXT LESSON
    // ========================================

    const currentIndex =

        normalizedCourse.lessons.findIndex(

            lesson =>

                lesson.id === lessonId
        );

    const nextLesson =

        normalizedCourse.lessons[
        currentIndex + 1
        ] || null;

    // ========================================
    // COURSE COMPLETED
    // ========================================

    const courseCompleted =

        getStorage(

            getCourseCompletedKey(
                courseId
            ),

            false
        );

    // ========================================
    // PROGRESS
    // ========================================

    const totalLessons =

        normalizedCourse.lessons.length;

    const completedCount =

        completedLessons.length;

    const progressPercent =

        totalLessons > 0

            ? Math.floor(

                (
                    completedCount
                    / totalLessons
                ) * 100

            )

            : 0;

    // ========================================
    // RESULT
    // ========================================

    return {

        ok: true,

        course:
            normalizedCourse,

        lesson:
            normalizedLesson,

        completedLessons,

        lessonCompleted,

        nextLesson,

        courseCompleted,

        progressPercent,

        runtime:

            normalizedLesson.runtimeImported
            ||
            normalizedCourse.runtimeImported
            ||
            false
    };
}