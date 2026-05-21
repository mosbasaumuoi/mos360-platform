// ============================================
// MOS360 DASHBOARD PROGRESS ENGINE
// Dashboard progression visualization runtime
// ============================================

import {
    getLastLessonKey,
    getCourseCompletedKey
}
    from "../../utils/storageHelpers.js";

import {
    getCompletedLessons
}
    from "../../engines/progressionEngine.js";

import {
    getStorage
}
    from "../../utils/localStorageHelpers.js";

// ============================================
// COURSE PROGRESS
// ============================================

export function getCourseProgress(

    course

) {

    // ========================================
    // COMPLETED LESSONS
    // ========================================

    const completedLessons =

        getCompletedLessons(
            course.id
        );

    // ========================================
    // TOTAL LESSONS
    // ========================================

    const totalLessons =

        course.lessons?.length || 0;

    // ========================================
    // PROGRESS
    // ========================================

    const progress =

        totalLessons > 0

            ? Math.floor(

                (
                    completedLessons.length
                    /
                    totalLessons
                ) * 100

            )

            : 0;

    // ========================================
    // COURSE COMPLETED
    // ========================================

    const isCompleted =

        getStorage(

            getCourseCompletedKey(
                course.id
            ),

            false

        );

    // ========================================
    // LAST LESSON
    // ========================================

    const lastLessonId =

        localStorage.getItem(

            getLastLessonKey(
                course.id
            )

        )

        ||

        course.lessons?.[0]?.id;

    // ========================================
    // RETURN
    // ========================================

    return {

        completedLessons,

        totalLessons,

        progress,

        isCompleted,

        lastLessonId

    };
}

// ============================================
// COMPLETED COURSES
// ============================================

export function getCompletedCourses(

    courses

) {

    return courses.filter(

        course =>

            getCourseProgress(
                course
            ).isCompleted

    );
}