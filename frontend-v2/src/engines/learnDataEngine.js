// ============================================
// MOS360 LEARN DATA ENGINE
// Learning page data orchestration runtime
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

    const course =
        courseResult.data;

    
    // ========================================
    // VALIDATE CONTENT GRAPH
    // ========================================

    const validCourseGraph =

        validateCourseGraph(
            course
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

    const lesson =
        lessonResult.data;
     

    // ========================================
    // VALIDATE LESSON DETAIL
    // ========================================

    const validLesson =

        validateLessonDetail(
            lesson
        );

    if (!validLesson) {

        return {

            ok: false,

            type:
                "invalid-lesson"
        };
    }
    
    // ========================================
    // LESSON EXISTS IN COURSE GRAPH
    // ========================================

    const lessonExists =

        course.lessons.some(

            item =>

                item.id === lessonId

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

        course.lessons.findIndex(

            item =>

                item.id === lessonId

        );

    const nextLesson =

        course.lessons[
        currentIndex + 1
        ];

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

        course.lessons.length;

    const completedCount =

        completedLessons.length;

    const progressPercent =

        Math.floor(

            (
                completedCount
                / totalLessons
            ) * 100

        );

    // ========================================
    // RETURN
    // ========================================

    return {

        ok: true,

        course,

        lesson,

        completedLessons,

        lessonCompleted,

        nextLesson,

        courseCompleted,

        progressPercent

    };
}