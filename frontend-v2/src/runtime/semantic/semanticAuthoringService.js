// ============================================
// MOS360 SEMANTIC AUTHORING ENGINE
// Adaptive semantic authoring studio foundation
// ============================================

import {

    createLessonTemplate,

    createVideoTemplate,

    createTextTemplate,

    createWorkflowTemplate,

    createCalloutTemplate,

    createPracticeTemplate,

    createCheckpointTemplate

}
    from "../content/authoringTemplates.js";

import {

    validateAILesson

}
    from "../ai/aiSafetyEngine.js";

// ============================================
// CREATE LESSON DRAFT
// ============================================

export function createLessonDraft({

    id = "",
    title = "",
    description = ""

} = {}) {

    return createLessonTemplate({

        id,

        title,

        description,

        blocks: []
    });
}

// ============================================
// ADD VIDEO BLOCK
// ============================================

export function addVideoBlock({

    lesson,
    title,
    videoUrl

}) {

    lesson.blocks.push(

        createVideoTemplate({

            title,
            videoUrl
        })
    );

    return lesson;
}

// ============================================
// ADD TEXT BLOCK
// ============================================

export function addTextBlock({

    lesson,
    content

}) {

    lesson.blocks.push(

        createTextTemplate({

            content
        })
    );

    return lesson;
}

// ============================================
// ADD WORKFLOW BLOCK
// ============================================

export function addWorkflowBlock({

    lesson,
    title,
    steps

}) {

    lesson.blocks.push(

        createWorkflowTemplate({

            title,
            steps
        })
    );

    return lesson;
}

// ============================================
// ADD PRACTICE BLOCK
// ============================================

export function addPracticeBlock({

    lesson,
    title,
    content

}) {

    lesson.blocks.push(

        createPracticeTemplate({

            title,
            content
        })
    );

    return lesson;
}

// ============================================
// ADD CALLOUT BLOCK
// ============================================

export function addCalloutBlock({

    lesson,
    variant,
    title,
    content

}) {

    lesson.blocks.push(

        createCalloutTemplate({

            variant,
            title,
            content
        })
    );

    return lesson;
}

// ============================================
// ADD CHECKPOINT
// ============================================

export function addCheckpointBlock({

    lesson,
    title,
    message

}) {

    lesson.blocks.push(

        createCheckpointTemplate({

            title,
            message
        })
    );

    return lesson;
}

// ============================================
// VALIDATE DRAFT
// ============================================

export function validateLessonDraft(

    lesson = {}

) {

    return validateAILesson(
        lesson
    );
}

// ============================================
// GENERATE AUTHORING REPORT
// ============================================

export function generateAuthoringReport(

    lesson = {}

) {

    const validation =

        validateLessonDraft(
            lesson
        );

    return {

        lessonId:
            lesson.id,

        valid:
            validation.valid,

        issues:
            validation.issues,

        totalBlocks:
            lesson.blocks
                ?.length || 0
    };
}