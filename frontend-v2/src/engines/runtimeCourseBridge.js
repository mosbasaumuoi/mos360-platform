// ============================================
// MOS360 RUNTIME COURSE BRIDGE
// Canonical runtime attachment authority
// ============================================

import {
    getImportedLessons
}
    from "./runtimeImportEngine.js";

import {
    getLessons
}
    from "../runtime/system/runtimeLibraryManager.js";   

// ============================================
// NORMALIZE COURSE ID
// ============================================

export function normalizeRuntimeCourseId(

    value = ""

) {

    return String(value)

        .trim()

        .replace(/\s+/g, "-")

        .replace(/[^a-zA-Z0-9-_]/g, "")

        .toLowerCase();
}

// ============================================
// GET ALL RUNTIME LESSONS
// ============================================

export function getRuntimeLessons() {

    const libraryLessons =
        getLessons();

    if (
        libraryLessons.length
    ) {

        return libraryLessons;
    }

    return getImportedLessons();
}

// ============================================
// GET RUNTIME COURSE LESSONS
// ============================================

export function getRuntimeCourseLessons(

    courseId

) {

    const normalizedCourseId =

        normalizeRuntimeCourseId(
            courseId
        );

    return getRuntimeLessons()

        .filter(

            lesson =>

                normalizeRuntimeCourseId(
                    lesson.courseId
                )

                ===

                normalizedCourseId
        );
}

// ============================================
// HAS RUNTIME LESSONS
// ============================================

export function hasRuntimeLessons(

    courseId

) {

    return (

        getRuntimeCourseLessons(
            courseId
        ).length > 0
    );
}

// ============================================
// ATTACH RUNTIME LESSONS
// ============================================

export function attachRuntimeLessons(

    course = {}

) {

    const runtimeLessons =

        getRuntimeCourseLessons(
            course.id
        );

    // ========================================
    // NO RUNTIME LESSONS
    // ========================================

    if (runtimeLessons.length === 0) {

        return {

            ...course,

            lessons:
                course.lessons || []
        };
    }

    // ========================================
    // RUNTIME LESSONS
    // ========================================

    const runtimeMappedLessons =

        runtimeLessons.map(

            (
                lesson,
                index
            ) => ({

                // ============================
                // CORE
                // ============================

                id:
                    lesson.id,

                title:
                    lesson.title,

                description:

                    lesson.description ||

                    "Runtime semantic lesson",

                // ============================
                // LEARNING
                // ============================

                duration:

                    lesson.duration ||

                    "10 phút",

                difficulty:

                    lesson.difficulty ||

                    "beginner",

                order:
                    index + 1,

                // ============================
                // GOVERNANCE
                // ============================

                runtime:
                    true,

                semanticVersion:

                    lesson.semanticVersion ||

                    "runtime-semantic",

                // ============================
                // RUNTIME
                // ============================

                blocks:
                    lesson.blocks || [],

                quiz:

                    (lesson.blocks || [])

                        .filter(
                            block =>
                                block.type === "quiz"
                        )

                        .flatMap(
                            block =>
                                block.assessment?.questions || []
                        )

                        .map(question => ({

                            question:
                                question.question,

                            options:
                                question.answers || [],

                            correctAnswer:
                                question.correctAnswer ?? 0

                        }))
            })
        );

    return {

        ...course,

        lessons:
            runtimeMappedLessons
    };
}

// ============================================
// BUILD RUNTIME COURSE SHELL
// ============================================

export function buildRuntimeCourseShell(

    courseId

) {

    const runtimeLessons =

        getRuntimeCourseLessons(
            courseId
        );

    if (runtimeLessons.length === 0) {

        return null;
    }

    const firstLesson =

        runtimeLessons[0];

    return attachRuntimeLessons({

        // ====================================
        // CORE
        // ====================================

        id:

            normalizeRuntimeCourseId(
                courseId
            ),

        slug:

            normalizeRuntimeCourseId(
                courseId
            ),

        title:

            firstLesson.courseTitle ||

            firstLesson.courseName ||

            courseId,

        description:

            firstLesson.courseDescription ||

            "Runtime semantic course",

        // ====================================
        // VISUAL
        // ====================================

        thumbnail:
            "📘",

        tags: [

            "runtime",
            "semantic",
            "spreadsheet"
        ],

        // ====================================
        // LEARNING
        // ====================================

        difficulty:

            firstLesson.difficulty ||

            "beginner",

        duration:
            "Đang cập nhật",

        level:

            firstLesson.difficulty ||

            "beginner",

        students:
            0,

        // ====================================
        // GOVERNANCE
        // ====================================

        runtimeImported:
            true,

        semanticVersion:
            "phase-h-runtime-bridge"
    });
}

// ============================================
// GET RUNTIME COURSE IDS
// ============================================

export function getRuntimeCourseIds() {

    return [

        ...new Set(

            getRuntimeLessons()

                .map(

                    lesson =>

                        normalizeRuntimeCourseId(
                            lesson.courseId
                        )
                )

                .filter(Boolean)
        )
    ];
}

// ============================================
// BUILD RUNTIME-ONLY COURSES
// ============================================

export function buildRuntimeOnlyCourses({

    existingCourses = []

} = {}) {

    const existingIds =

        existingCourses.map(

            course =>

                normalizeRuntimeCourseId(
                    course.id
                )
        );

    return getRuntimeCourseIds()

        .filter(

            courseId =>

                !existingIds.includes(
                    courseId
                )
        )

        .map(

            courseId =>

                buildRuntimeCourseShell(
                    courseId
                )
        )

        .filter(Boolean);
}