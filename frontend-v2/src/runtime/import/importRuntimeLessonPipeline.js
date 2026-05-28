import { normalizeRuntimeLesson }

    from "../content/runtimeLessonNormalizer";

import {

    validateRuntimeLesson

}

    from "../../validation/runtimeLessonValidation";

// ============================================
// LEGACY BLOCK NORMALIZATION
// ============================================

function normalizeLegacyBlock(

    block = {}

) {

    const normalizedBlock = {

        ...block
    };

    // ========================================
    // blockType -> type
    // ========================================

    if (

        normalizedBlock.blockType &&
        !normalizedBlock.type

    ) {

        normalizedBlock.type =

            normalizedBlock.blockType;
    }

    // ========================================
    // practice -> practical
    // ========================================

    if (

        normalizedBlock.type ===
        "practice"

    ) {

        normalizedBlock.type =
            "practical";
    }

    // ========================================
    // callout -> tips
    // ========================================

    if (

        normalizedBlock.type ===
        "callout"

    ) {

        normalizedBlock.type =
            "tips";
    }

    // ========================================
    // workflow content -> steps
    // ========================================

    if (

        normalizedBlock.type ===
        "workflow"

    ) {

        normalizedBlock.steps =

            String(
                normalizedBlock.content || ""
            )

                .split(";")

                .map(
                    step => step.trim()
                )

                .filter(Boolean);
    }

    // ========================================
    // tips content -> items
    // ========================================

    if (

        normalizedBlock.type ===
        "tips"

    ) {

        normalizedBlock.items = [

            normalizedBlock.content
        ];
    }

    // ========================================
    // resource support
    // ========================================

    if (

        normalizedBlock.type ===
        "resource"

    ) {

        normalizedBlock.resources = [

            normalizedBlock.content
        ];
    }

    // ========================================
    // quiz support
    // ========================================

    if (

        normalizedBlock.type ===
        "quiz"

    ) {

        normalizedBlock.questions = [

            normalizedBlock.content
        ];
    }

    return normalizedBlock;
}    

// ============================================
// IMPORT RUNTIME LESSON
// ============================================

export function importRuntimeLesson(

    rawLesson = {}

) {

    // ========================================
    // NORMALIZE
    // ========================================

    const normalizedLesson =

        normalizeRuntimeLesson(

            normalizeLegacyBlock(
                rawLesson
            )
        );

    // ========================================
    // VALIDATE
    // ========================================

    const validationResult =

        validateRuntimeLesson(
            normalizedLesson
        );

    // ========================================
    // RETURN
    // ========================================

    return {

        lesson:
            normalizedLesson,

        valid:
            validationResult.valid,

        errors:
            validationResult.errors
    };
}

// ============================================
// IMPORT LESSON COLLECTION
// ============================================

export function importRuntimeLessons(

    lessons = []

) {

    return lessons.map(

        importRuntimeLesson
    );
}