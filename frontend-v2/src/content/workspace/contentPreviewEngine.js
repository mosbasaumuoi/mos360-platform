// ============================================
// CONTENT PREVIEW ENGINE
// Runtime lesson preview orchestration
// ============================================

import {
    renderLessonBlocks
}
    from "../../engines/lessonBlockRendererEngine.js";

// ============================================
// PREVIEW LESSON
// ============================================

export function previewLessonContent(

    lesson

) {

    return {

        title:
            lesson.title,

        description:
            lesson.description,

        blocksHtml:

            renderLessonBlocks(

                lesson.blocks || []
            )
    };
}