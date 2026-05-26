// ============================================
// MOS360 VISUAL COMPOSER STUDIO ENGINE
// Semantic-native visual lesson studio runtime
// ============================================

import {

    insertBlock,

    moveBlock,

    removeBlock,

    previewComposition

}
    from "./semanticComposerEngine.js";

import {

    validateLessonDraft

}
    from "./semanticAuthoringEngine.js";

// ============================================
// DUPLICATE BLOCK
// ============================================

export function duplicateBlock({

    lesson,
    index

}) {

    const blocks =

        [...(lesson.blocks || [])];

    if (

        index < 0
        ||

        index >= blocks.length

    ) {

        return lesson;
    }

    const duplicatedBlock = {

        ...blocks[index],

        duplicated:
            true
    };

    blocks.splice(

        index + 1,
        0,
        duplicatedBlock
    );

    return {

        ...lesson,

        blocks
    };
}

// ============================================
// UPDATE BLOCK
// ============================================

export function updateBlock({

    lesson,
    index,
    updates = {}

}) {

    const blocks =

        [...(lesson.blocks || [])];

    if (

        index < 0
        ||

        index >= blocks.length

    ) {

        return lesson;
    }

    blocks[index] = {

        ...blocks[index],

        ...updates
    };

    return {

        ...lesson,

        blocks
    };
}

// ============================================
// CREATE STUDIO SESSION
// ============================================

export function createStudioSession({

    lesson = {}

}) {

    return {

        lesson,

        createdAt:
            Date.now(),

        updatedAt:
            Date.now(),

        dirty:
            false,

        preview:
            previewComposition(
                lesson
            )
    };
}

// ============================================
// UPDATE STUDIO SESSION
// ============================================

export function updateStudioSession({

    session = {},
    lesson = {}

}) {

    return {

        ...session,

        lesson,

        updatedAt:
            Date.now(),

        dirty:
            true,

        preview:
            previewComposition(
                lesson
            )
    };
}

// ============================================
// VALIDATE STUDIO SESSION
// ============================================

export function validateStudioSession({

    session = {}

}) {

    const validation =

        validateLessonDraft(

            session.lesson || {}
        );

    return {

        valid:
            validation.valid,

        issues:
            validation.issues
    };
}

// ============================================
// GENERATE STUDIO REPORT
// ============================================

export function generateStudioReport({

    session = {}

}) {

    const validation =

        validateStudioSession({
            session
        });

    return {

        valid:
            validation.valid,

        issues:
            validation.issues,

        dirty:
            session.dirty,

        totalBlocks:

            session.lesson
                ?.blocks
                ?.length || 0,

        previewBlocks:

            session.preview
                ?.previewBlocks
                ?.length || 0
    };
}

// ============================================
// EXPORT STUDIO API
// ============================================

export const VisualComposerStudioAPI = {

    insertBlock,

    moveBlock,

    removeBlock,

    duplicateBlock,

    updateBlock,

    createStudioSession,

    updateStudioSession,

    validateStudioSession,

    generateStudioReport
};