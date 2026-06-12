// ============================================
// MOS360 RUNTIME COURSE BRIDGE
// Canonical runtime attachment authority
// KV-enabled: fallback về KV khi localStorage trống
// ============================================

import {
    getImportedLessons
}
    from "./runtimeImportEngine.js";

import {
    getLessons,
    saveLessons
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
// FETCH LESSONS FROM KV (via API)
// ============================================

async function fetchLessonsFromKV() {

    try {

        const response =
            await fetch("/api/courses");

        if (!response.ok) {
            return [];
        }

        const result =
            await response.json();

        // result là array of courses từ KV
        // mỗi course có lessons[]
        const courses =
            Array.isArray(result.data)
                ? result.data
                : Array.isArray(result)
                    ? result
                    : [];

        if (courses.length === 0) {
            return [];
        }

        // Fetch full lesson detail cho từng lesson
        const allLessonIds = courses
            .flatMap(
                course =>
                    (course.lessons || []).map(
                        l => l.id
                    )
            )
            .filter(Boolean);

        const lessonResults =
            await Promise.allSettled(

                allLessonIds.map(async id => {

                    const res =
                        await fetch(
                            `/api/lessons/${id}`
                        );

                    if (!res.ok) {
                        return null;
                    }

                    const data =
                        await res.json();

                    return data.data || data;
                })
            );

        const lessons = lessonResults

            .filter(
                r =>
                    r.status === "fulfilled"
                    && r.value
            )

            .map(r => r.value);

        if (lessons.length > 0) {

            // Cache vào localStorage
            saveLessons(lessons);

            console.log(
                "[MOS360 KV] Loaded from KV →",
                lessons.length,
                "lessons"
            );
        }

        return lessons;

    } catch (err) {

        console.warn(
            "[MOS360 KV] Fetch failed",
            err
        );

        return [];
    }
}

// ============================================
// GET ALL RUNTIME LESSONS
// localStorage → KV fallback
// ============================================

export async function getRuntimeLessonsAsync() {

    // ========================================
    // 1. THỬ localStorage TRƯỚC
    // ========================================

    const libraryLessons = getLessons();

    if (libraryLessons.length > 0) {

        return libraryLessons;
    }

    const importedLessons =
        getImportedLessons();

    if (importedLessons.length > 0) {

        return importedLessons;
    }

    // ========================================
    // 2. localStorage TRỐNG → FETCH TỪ KV
    // ========================================

    return await fetchLessonsFromKV();
}

// ============================================
// SYNC VERSION (dùng cho code cũ chưa async)
// ============================================

export function getRuntimeLessons() {

    const libraryLessons = getLessons();

    if (libraryLessons.length) {
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