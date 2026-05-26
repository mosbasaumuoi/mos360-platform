// ============================================
// MOS360 SEMANTIC COMPOSER ENGINE
// Visual semantic lesson composition runtime
// ============================================

import {

    governBlocks

}
    from "./contentGovernance.js";

import {

    composeLesson

}
    from "./compositionEngine.js";

// ============================================
// MOVE BLOCK
// ============================================

export function moveBlock({

    lesson,
    fromIndex,
    toIndex

}) {

    const blocks =

        [...(lesson.blocks || [])];

    // ========================================
    // INVALID INDEX
    // ========================================

    if (

        fromIndex < 0
        ||

        toIndex < 0
        ||

        fromIndex >= blocks.length
        ||

        toIndex >= blocks.length

    ) {

        return lesson;
    }

    // ========================================
    // MOVE
    // ========================================

    const [movedBlock] =

        blocks.splice(
            fromIndex,
            1
        );

    blocks.splice(

        toIndex,
        0,
        movedBlock
    );

    return {

        ...lesson,

        blocks
    };
}

// ============================================
// REMOVE BLOCK
// ============================================

export function removeBlock({

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

    blocks.splice(
        index,
        1
    );

    return {

        ...lesson,

        blocks
    };
}

// ============================================
// INSERT BLOCK
// ============================================

export function insertBlock({

    lesson,
    block,
    index

}) {

    const blocks =

        [...(lesson.blocks || [])];

    // ========================================
    // APPEND
    // ========================================

    if (

        typeof index !==
        "number"

    ) {

        blocks.push(block);

        return {

            ...lesson,

            blocks
        };
    }

    // ========================================
    // INSERT
    // ========================================

    blocks.splice(

        index,
        0,
        block
    );

    return {

        ...lesson,

        blocks
    };
}

// ============================================
// GOVERN COMPOSITION
// ============================================

export function governComposition(

    lesson = {}

) {

    const governedBlocks =

        governBlocks(

            lesson.blocks || []
        );

    return {

        ...lesson,

        blocks:
            governedBlocks
    };
}

// ============================================
// PREVIEW COMPOSITION
// ============================================

export function previewComposition(

    lesson = {}

) {

    const governed =

        governComposition(
            lesson
        );

    const composedBlocks =

        composeLesson(

            governed.blocks || []
        );

    return {

        ...governed,

        previewBlocks:
            composedBlocks
    };
}

// ============================================
// GENERATE COMPOSER REPORT
// ============================================

export function generateComposerReport(

    lesson = {}

) {

    const preview =

        previewComposition(
            lesson
        );

    return {

        lessonId:
            lesson.id,

        totalBlocks:
            lesson.blocks
                ?.length || 0,

        previewBlocks:
            preview.previewBlocks
                ?.length || 0,

        governed:
            true,

        composed:
            true
    };
}