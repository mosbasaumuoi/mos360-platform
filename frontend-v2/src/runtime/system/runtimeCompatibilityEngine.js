/**
 * MOS360
 * Runtime Compatibility Engine
 *
 * RESPONSIBILITY:
 * - compatibility safety
 * - schema evolution
 * - legacy support
 * - runtime compatibility
 *
 * MUST NOT:
 * - render UI
 * - mutate renderer
 * - hydrate lessons
 */

const CURRENT_SEMANTIC_VERSION =
    "phase-h1";

// ============================================
// ENSURE LESSON COMPATIBILITY
// ============================================

export function ensureLessonCompatibility(
    lesson = {}
) {

    // ================================
    // LEGACY VERSION
    // ================================

    if (!lesson.version) {

        return {

            ...lesson,

            version:
                CURRENT_SEMANTIC_VERSION
        };
    }

    // ================================
    // LEGACY BLOCKS
    // ================================

    if (
        !Array.isArray(
            lesson.blocks
        )
    ) {

        return {

            ...lesson,

            blocks: []
        };
    }

    return lesson;
}

// ============================================
// ENSURE RUNTIME COMPATIBILITY
// ============================================

export function ensureRuntimeCompatibility(
    lessons = []
) {

    return lessons.map(
        ensureLessonCompatibility
    );
}