// ============================================
// MOS360 CONTENT SOURCE ENGINE
// Unified runtime content gateway
// ============================================

import {
    apiGet
}
    from "../services/api.js";

import {
    importCourse,
    importLesson
}
    from "./contentImportEngine.js";

import {
    getRegisteredCourse,
    getRegisteredLesson,
    getRegisteredCourses
}
    from "./contentRegistryEngine.js";

import {
    getImportedCourses,
    getImportedLessons
}
    from "./runtimeImportEngine.js";

import {
    COURSE_SOURCES,
    LESSON_SOURCES
}
    from "../content/courseSourceRegistry.js";

// ============================================
// ATTACH LESSONS TO COURSE
// ============================================

function attachLessonsToCourse(course) {

    const runtimeLessons =
        getImportedLessons();

    const courseLessons =

        runtimeLessons

            .filter(

                lesson =>

                    lesson.courseId ===
                    course.id
            )

            .map(

                lesson => ({

                    id:
                        lesson.id,

                    title:
                        lesson.title,

                    description:
                        lesson.description || "",

                    duration:
                        lesson.duration || "10 phút"

                })
            );

    return {

        ...course,

        lessons:

            courseLessons.length

                ? courseLessons

                : (course.lessons || [])
    };
}

// ============================================
// LOAD COURSE
// ============================================

export async function loadCourse(
    courseId
) {

    // ========================================
    // RUNTIME IMPORT
    // ========================================

    const runtimeCourses =
        getImportedCourses();

    const runtimeCourse =

        runtimeCourses.find(

            course =>
                course.id === courseId
        );

    if (runtimeCourse) {

        return {

            ok: true,

            source:
                "runtime-import",

            data:
                attachLessonsToCourse(
                    runtimeCourse
                )
        };
    }

    // ========================================
    // REGISTRY
    // ========================================

    const cachedCourse =

        getRegisteredCourse(
            courseId
        );

    if (cachedCourse) {

        return {

            ok: true,

            source:
                "registry",

            data:
                attachLessonsToCourse(
                    cachedCourse
                )
        };
    }

    // ========================================
    // STATIC
    // ========================================

    const staticCourse =

        COURSE_SOURCES.find(

            course =>
                course.id === courseId
        );

    if (staticCourse) {

        return {

            ok: true,

            source:
                "static",

            data:
                attachLessonsToCourse(
                    staticCourse
                )
        };
    }

    // ========================================
    // API
    // ========================================

    const result =

        await apiGet(

            `/courses/${courseId}`,

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
            attachLessonsToCourse(
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

    // ========================================
    // RUNTIME
    // ========================================

    const runtimeLessons =
        getImportedLessons();

    const runtimeLesson =

        runtimeLessons.find(

            lesson =>

                lesson.id === lessonId
                &&
                lesson.courseId === courseId
        );

    if (runtimeLesson) {

        return {

            ok: true,

            source:
                "runtime-import",

            data:
                runtimeLesson
        };
    }

    // ========================================
    // REGISTRY
    // ========================================

    const cachedLesson =

        getRegisteredLesson(
            `${courseId}:${lessonId}`
        );

    if (cachedLesson) {

        return {

            ok: true,

            source:
                "registry",

            data:
                cachedLesson
        };
    }

    // ========================================
    // STATIC
    // ========================================

    const staticLesson =

        LESSON_SOURCES.find(

            lesson =>

                lesson.id === lessonId
                &&
                lesson.courseId === courseId
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

            `/learn/${courseId}/${lessonId}`,

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

    const runtimeCourses =

        getImportedCourses().map(

            attachLessonsToCourse
        );

    const staticCourses =

        (COURSE_SOURCES || []).map(

            attachLessonsToCourse
        );

    const mergedCourses = [

        ...runtimeCourses,

        ...staticCourses
    ];

    return {

        ok: true,

        source:
            "merged",

        data:
            mergedCourses
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

    return {

        ok: true,

        source:
            "runtime",

        data:
            COURSE_SOURCES || []
    };
}