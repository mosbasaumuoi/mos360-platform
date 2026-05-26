// ============================================
// CONTENT RUNTIME ENGINE
// Unified content orchestration runtime
// ============================================

import {
    filterLessonBlocks
}
    from "../../engines/lessonBlockFilterEngine.js";

// ============================================
// CREATE CONTENT RUNTIME
// ============================================

export function createContentRuntime({

    lesson,

    adaptiveBlocks = [],

    progressPercent = 0

}) {

    // ========================================
    // RUNTIME BLOCKS
    // ========================================

    const runtimeBlocks =

        filterLessonBlocks(

            [

                ...adaptiveBlocks,

                ...(lesson.blocks || [])

            ],

            {

                progressPercent,

                isEnrolled:
                    true
            }

        );

    return {

        runtimeBlocks
    };
}