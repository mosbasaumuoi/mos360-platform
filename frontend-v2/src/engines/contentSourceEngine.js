// ============================================
// MOS360 CONTENT SOURCE ENGINE
// Canonical runtime bridge integration
// ============================================

import {
    apiGet
}
    from "../services/api.js";

import {
    getRegisteredCourse,
    getRegisteredLesson
}
    from "./contentRegistryEngine.js";

import {
    COURSE_SOURCES,
    LESSON_SOURCES
}
    from "../content/courseSourceRegistry.js";

import {

    normalizeRuntimeCourseId,

    attachRuntimeLessons,

    buildRuntimeCourseShell,

    buildRuntimeOnlyCourses,

    getRuntimeLessons,

    getRuntimeLessonsAsync

}

    from "./runtimeCourseBridge.js";

// ============================================
// LOAD COURSE
// ============================================

export async function loadCourse(

    courseId

) {

    const normalizedCourseId =

        normalizeRuntimeCourseId(
            courseId
        );

    // ========================================
    // REGISTRY
    // ========================================

    const registeredCourse =

        getRegisteredCourse(
            normalizedCourseId
        );

    if (registeredCourse) {

        return {

            ok: true,

            source:
                "registry",

            data:

                attachRuntimeLessons(
                    registeredCourse
                )
        };
    }

    // ========================================
    // STATIC
    // ========================================

    const staticCourse =

        (COURSE_SOURCES || [])

            .find(

                course =>

                    normalizeRuntimeCourseId(
                        course.id
                    )

                    ===

                    normalizedCourseId
            );

    if (staticCourse) {

        return {

            ok: true,

            source:
                "static",

            data:

                attachRuntimeLessons(
                    staticCourse
                )
        };
    }

    // ========================================
    // RUNTIME FALLBACK
    // ========================================

    const runtimeCourse =

        buildRuntimeCourseShell(
            normalizedCourseId
        );

    if (runtimeCourse) {

        return {

            ok: true,

            source:
                "runtime",

            data:
                runtimeCourse
        };
    }

    // ========================================
    // API
    // ========================================

    const result =

        await apiGet(

            `/courses/${normalizedCourseId}`,

            {
                silent: true
            }
        );

    if (!result.ok) {

        return {

            ok: false,

            type:
                "course-not-found"
        };
    }

    return {

        ok: true,

        source:
            "api",

        data:

            attachRuntimeLessons(
                result.data
            )
    };
}

// ============================================
// LOAD LESSON
// ============================================

export async function loadLesson({

    courseId,
    lessonId

}) {

    const normalizedCourseId =

        normalizeRuntimeCourseId(
            courseId
        );

    // ========================================
    // RUNTIME
    // ========================================

    const runtimeLesson =

        getRuntimeLessons()

            .find(

                lesson =>

                    normalizeRuntimeCourseId(
                        lesson.courseId
                    )

                    ===

                    normalizedCourseId

                    &&

                    lesson.id === lessonId
            );

    if (runtimeLesson) {

        return {

            ok: true,

            source:
                "runtime",

            data:
                runtimeLesson
        };
    }

    // ========================================
    // REGISTRY
    // ========================================

    const registeredLesson =

        getRegisteredLesson(

            `${normalizedCourseId}:${lessonId}`
        );

    if (registeredLesson) {

        return {

            ok: true,

            source:
                "registry",

            data:
                registeredLesson
        };
    }

    // ========================================
    // STATIC
    // ========================================

    const staticLesson =

        (LESSON_SOURCES || [])

            .find(

                lesson =>

                    normalizeRuntimeCourseId(
                        lesson.courseId
                    )

                    ===

                    normalizedCourseId

                    &&

                    lesson.id === lessonId
            );

    if (staticLesson) {

        return {

            ok: true,

            source:
                "static",

            data:
                staticLesson
        };
    }

    // ========================================
    // API
    // ========================================

    const result =

        await apiGet(

            `/learn/${normalizedCourseId}/${lessonId}`,

            {
                silent: true
            }
        );

    if (!result.ok) {

        return {

            ok: false,

            type:
                "lesson-not-found"
        };
    }

    return {

        ok: true,

        source:
            "api",

        data:
            result.data.lesson
    };
}

// ============================================
// LOAD COURSES
// ============================================

export async function loadCourses() {

    // ========================================
    // ĐẢM BẢO LESSONS ĐÃ LOAD (localStorage hoặc KV)
    // ========================================

    await getRuntimeLessonsAsync();

    // ========================================
    // STATIC COURSES
    // ========================================

    const staticCourses =

        (COURSE_SOURCES || [])

            .map(

                attachRuntimeLessons
            );

    // ========================================
    // RUNTIME-ONLY COURSES
    // ========================================

    const runtimeOnlyCourses =

        buildRuntimeOnlyCourses({

            existingCourses:
                staticCourses
        });

    // ========================================
    // MERGE
    // ========================================

    return {

        ok: true,

        source:
            "merged",

        data: [

            ...runtimeOnlyCourses,

            ...staticCourses
        ]
    };
}

// ============================================
// LOAD COURSE DETAIL
// ============================================

export async function loadCourseDetail(

    courseId

) {

    return loadCourse(
        courseId
    );
}

// ============================================
// LOAD COURSE MANIFESTS
// ============================================

export async function loadCourseManifests() {

    return loadCourses();
}