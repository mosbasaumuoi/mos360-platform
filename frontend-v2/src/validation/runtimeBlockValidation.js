import {

    RUNTIME_BLOCK_TYPES

}

from "../contracts/runtimeBlockContract";

// ============================================
// VALIDATE RUNTIME BLOCK
// Semantic hybrid convergence
// ============================================

export function validateRuntimeBlock(

    block = {}

) {

    const errors = [];

    // ========================================
    // BLOCK OBJECT
    // ========================================

    if (

        !block ||

        typeof block !== "object"

    ) {

        return {

            valid: false,

            errors: [
                "Block must be object"
            ]
        };
    }

    // ========================================
    // HYBRID TYPE
    // ========================================

    const type =

        block.type
        ||
        block.kind
        ||
        "content";

    // ========================================
    // SEMANTIC RUNTIME BYPASS
    // ========================================

    const semanticRuntimeType =

        typeof type === "string"
        &&
        type.length > 0;

    // ========================================
    // PLAYABLE-FIRST VALIDATION
    // ========================================

    if (!semanticRuntimeType) {

        errors.push(

            `Invalid block type: ${type}`
        );
    }

    // ========================================
    // LESSON FLOW
    // ========================================

    const lessonFlow =

        block.lessonFlow
        ||
        block.flow
        ||
        "learning";

    if (

        typeof lessonFlow !== "string"

    ) {

        errors.push(

            "Block lessonFlow must be string"
        );
    }

    // ========================================
    // SEMANTIC SURFACE
    // ========================================

    const semanticSurface =

        block.semanticSurface
        ||
        block.surface
        ||
        "knowledge";

    const validSurface =

        typeof semanticSurface === "string"

        &&
        semanticSurface.length > 0;

    if (!validSurface) {

        errors.push(

            `Invalid semantic surface: ${ semanticSurface } `
        );
    }

    // ========================================
    // TITLE
    // ========================================

    const validTitle =

        typeof block.title === "string"

        ||

        typeof block.label === "string";

    if (!validTitle) {

        errors.push(
            "Block title must be string"
        );
    }

    // ========================================
    // PLAYABLE CONTENT
    // ========================================

    const validContent =

        typeof block.content === "string"

        ||

        Array.isArray(
            block.content
        )

        ||

        typeof block.videoUrl === "string"

        ||

        typeof block.embedUrl === "string"

        ||

        typeof block.text === "string"

        ||

        typeof block.prompt === "string"

        ||

        typeof block.description === "string";

    if (!validContent) {

        errors.push(

            "Missing playable content"
        );
    }

    // ========================================
    // QUIZ VALIDATION
    // ========================================

    if (

        type === "quiz"

    ) {

        const validQuiz =

            typeof block.content === "string"

            ||

            block.quiz;

        if (!validQuiz) {

            errors.push(

                "Quiz block requires quiz content"
            );
        }
    }

    return {

        valid:
            errors.length === 0,

        errors
    };
}

// ============================================
// VALIDATE RUNTIME BLOCKS
// ============================================

export function validateRuntimeBlocks(

    blocks = []

) {

    if (!Array.isArray(blocks)) {

        return [

            {

                valid: false,

                errors: [
                    "Blocks must be array"
                ]
            }
        ];
    }

    return blocks.map(

        validateRuntimeBlock
    );
}
