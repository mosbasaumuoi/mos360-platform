// ============================================
// RUNTIME IMPORT ENGINE
// Normalize imported runtime content
// ============================================
import {

    transformSpreadsheetLessons

}

from "../content/pipeline/spreadsheetLessonTransformer.js";

import { validateLesson } from "../validation/lessonValidationEngine";

import {

    createImportEntry,

    registerImport

}

from "../runtime/importRegistry";

import {

    createImportSnapshot,

    registerSnapshot

}

from "../runtime/importRegistry";

import {

    safelyMergeLessons

}

from "../runtime/lessonMutationEngine";

import {

    ensureRuntimeCompatibility

}

from "../runtime/runtimeCompatibilityEngine";


const IMPORT_COURSES_KEY =
    "mos360_imported_courses";

const IMPORT_LESSONS_KEY =
    "mos360_imported_lessons";

// ============================================
// CLEAN OBJECT KEYS
// ============================================

function cleanObject(obj = {}) {

    return Object.fromEntries(

        Object.entries(obj).map(

            ([key, value]) => [

                String(key).trim(),

                typeof value === "string"
                    ? value.trim()
                    : value

            ]
        )
    );
}

// ============================================
// NORMALIZE COURSE
// ============================================

function normalizeCourse(rawCourse = {}) {

    const course =
        cleanObject(rawCourse);

    const id =

        course.courseId ||
        course.id ||
        course.slug ||
        "";

    return {

        // ======================================
        // REQUIRED
        // ======================================

        id,

        courseId: id,

        slug:

            course.slug ||
            id,

        title:

            course.title ||
            "Untitled Course",

        description:

            course.description ||
            "Khóa học MOS runtime.",

        category:

            course.category ||
            "office",

        level:

            course.level ||
            "beginner",

        xpReward:

            Number(
                course.xpReward || 0
            ),

        lessons:

    getImportedLessons()

        .filter(

            lesson =>

                lesson.courseId === id
        )

        .map(

            lesson => ({

                id:
                    lesson.id
            })
        ),

        // ======================================
        // OPTIONAL
        // ======================================

        thumbnail:

            course.thumbnail ||
            "/assets/courses/default.jpg",

        duration:

            course.duration ||
            "Đang cập nhật",

        difficulty:

            course.difficulty ||
            "beginner",

        status:

            course.status ||
            "active",

        version:

            course.version ||
            "1.0",

        tags:

            Array.isArray(
                course.tags
            )

                ? course.tags

                : [],

        objectives:

            Array.isArray(
                course.objectives
            )

                ? course.objectives

                : [],

        skills:

            Array.isArray(
                course.skills
            )

                ? course.skills

                : [],

        requirements:

            Array.isArray(
                course.requirements
            )

                ? course.requirements

                : [],

        learningOutcomes:

            Array.isArray(
                course.learningOutcomes
            )

                ? course.learningOutcomes

                : []
    };
}

// ============================================
// NORMALIZE LESSON
// ============================================

// ============================================
// NORMALIZE LESSON
// Phase H block-native runtime
// ============================================

function normalizeLesson(rawLesson = {}) {

    const lesson =
        cleanObject(rawLesson);

    // ========================================
    // BLOCKS
    // ========================================

    const blocks =

        Array.isArray(
            lesson.blocks
        )

            ? lesson.blocks

            : [];

    // ========================================
    // VIDEO NORMALIZATION
    // ========================================

    const normalizedBlocks =

        blocks.map(block => {

            // ==================================
            // VIDEO
            // ==================================

            if (block.type === "video") {

                return {

                    ...block,

                    videoUrl:

                        block.videoUrl ||

                        block.content ||

                        ""
                };
            }

            return block;
        });

    // ========================================
    // NORMALIZED LESSON
    // ========================================

    return {

        id:

            lesson.id ||
            lesson.lessonId ||
            "",

        lessonId:

            lesson.lessonId ||
            lesson.id ||
            "",

        courseId:

            lesson.courseId ||
            "",

        title:

            lesson.title ||
            "Untitled Lesson",

        description:

            lesson.description ||
            "",

        duration:

            lesson.duration ||
            "10 phút",

        difficulty:

            lesson.difficulty ||
            "beginner",

        order:

            Number(
                lesson.order || 1
            ),

        xpReward:

            Number(
                lesson.xpReward || 10
            ),

        version:

            lesson.version ||
            "phase-h-runtime",

        // ====================================
        // BLOCK-NATIVE
        // ====================================

        blocks:
            normalizedBlocks,

        // ====================================
        // QUIZ
        // ====================================

        quiz:

            Array.isArray(
                lesson.quiz
            )

                ? lesson.quiz

                : []
    };
}

function removeDuplicateLessons(
    lessons = []
) {

    const seen = new Set();

    return lessons.filter(lesson => {

        const key =
            `${lesson.courseId}-${lesson.id}`;

        if (seen.has(key)) {

            console.warn(
                "[MOS360] Duplicate lesson skipped:",
                key
            );

            return false;
        }

        seen.add(key);

        return true;
    });
}

// ============================================
// SAVE COURSES
// ============================================

export function saveImportedCourses(
    courses = []
) {

    const normalized =

    removeDuplicateLessons(

        transformedLessons

            .map(normalizeLesson)

            .filter(
                lesson =>
                    lesson.id &&
                    lesson.courseId
            )

            .filter((lesson) => {

                const validationResult =
                    validateLesson(lesson);

                if (!validationResult.valid) {

                    console.error(

                        "[MOS360] Lesson validation failed:",

                        {
                            lessonId:
                                lesson.id,

                            errors:
                                validationResult.errors
                        }
                    );

                    return false;
                }

                if (
                    validationResult.warnings
                        .length > 0
                ) {

                    console.warn(

                        "[MOS360] Lesson validation warnings:",

                        {
                            lessonId:
                                lesson.id,

                            warnings:
                                validationResult.warnings
                        }
                    );
                }

                return true;
            })
    );

    const importEntry =
    createImportEntry({

        source:
            "spreadsheet-import",

        courseCount:
            getImportedCourses()
                .length,

        lessonCount:
            normalized.length,

        semanticVersion:
            "phase-h1",

        validationWarnings:
            [],

        validationErrors:
            []
    });

registerImport(
    importEntry
);
    
    const snapshot =
    createImportSnapshot({

        lessons:
            normalized,

        semanticVersion:
            "phase-h1"
    });

registerSnapshot(
    snapshot
);

    localStorage.setItem(

        IMPORT_COURSES_KEY,

        JSON.stringify(normalized)
    );

    const importedLessons =

    getImportedLessons();

}

// ============================================
// GET COURSES
// ============================================

export function getImportedCourses() {

    try {

        return JSON.parse(

            localStorage.getItem(
                IMPORT_COURSES_KEY
            ) || "[]"
        );

    } catch {

        return [];
    }
}

// ============================================
// SAVE LESSONS
// ============================================

export function saveImportedLessons(
    lessons = []
) {

    // ========================================
// PHASE H TRANSFORM
// ========================================

const transformedLessons =

    transformSpreadsheetLessons(
        lessons
    );

// ========================================
// NORMALIZE
// ========================================

const normalized =

    transformedLessons

        .map(normalizeLesson)

        .filter(
            lesson =>
                lesson.id &&
                lesson.courseId
        )

        .filter((lesson) => {

            const validationResult =
                validateLesson(lesson);

            // ============================
            // VALIDATION FAILED
            // ============================

            if (!validationResult.valid) {

                console.error(

                    "[MOS360] Lesson validation failed:",

                    {
                        lessonId:
                            lesson.id,

                        errors:
                            validationResult.errors
                    }
                );

                return false;
            }

            // ============================
            // VALIDATION WARNINGS
            // ============================

            if (
                validationResult.warnings
                    .length > 0
            ) {

                console.warn(

                    "[MOS360] Lesson validation warnings:",

                    {
                        lessonId:
                            lesson.id,

                        warnings:
                            validationResult.warnings
                    }
                );
            }

            return true;
        });
            
    console.log(
        "NORMALIZED LESSONS",
        normalized
    );

    const existingLessons =
    getImportedLessons();

    const compatibleLessons =
    ensureRuntimeCompatibility(
        normalized
    );
    
    const mergedLessons =
    safelyMergeLessons({

        existingLessons,

        importedLessons:
        compatibleLessons
    });

localStorage.setItem(

    IMPORT_LESSONS_KEY,

    JSON.stringify(
        mergedLessons
    )
);
}

// ============================================
// GET LESSONS
// ============================================

export function getImportedLessons() {

    try {

        return JSON.parse(

            localStorage.getItem(
                IMPORT_LESSONS_KEY
            ) || "[]"
        );

    } catch {

        return [];
    }
}