// ============================================
// MOS360 AI SAFETY ENGINE
// Semantic-safe AI authoring governance
// ============================================

import {

    BLOCK_REGISTRY

}
    from "./contentRegistry.js";

// ============================================
// SAFETY LIMITS
// ============================================

const MAX_BLOCKS = 12;

const MAX_CALLOUTS = 3;

const MAX_RESOURCES = 8;

// ============================================
// VALIDATE LESSON
// ============================================

export function validateAILesson(

    lesson = {}

) {

    const issues = [];

    // ========================================
    // REQUIRED FIELDS
    // ========================================

    if (!lesson.id) {

        issues.push(
            "missing_lesson_id"
        );
    }

    if (!lesson.title) {

        issues.push(
            "missing_lesson_title"
        );
    }

    // ========================================
    // BLOCKS
    // ========================================

    if (

        !Array.isArray(
            lesson.blocks
        )

    ) {

        issues.push(
            "missing_blocks"
        );

        return {

            valid: false,

            issues
        };
    }

    // ========================================
    // BLOCK COUNT
    // ========================================

    if (

        lesson.blocks.length >
        MAX_BLOCKS

    ) {

        issues.push(
            "too_many_blocks"
        );
    }

    // ========================================
    // CALLOUT LIMIT
    // ========================================

    const callouts =

        lesson.blocks.filter(

            block =>

                block.type ===
                "callout"
        );

    if (

        callouts.length >
        MAX_CALLOUTS

    ) {

        issues.push(
            "too_many_callouts"
        );
    }

    // ========================================
    // RESOURCE LIMIT
    // ========================================

    const resourceBlock =

        lesson.blocks.find(

            block =>

                block.type ===
                "resource"
        );

    if (

        resourceBlock?.resources
            ?.length >

        MAX_RESOURCES

    ) {

        issues.push(
            "too_many_resources"
        );
    }

    // ========================================
    // BLOCK VALIDATION
    // ========================================

    lesson.blocks.forEach(block => {

        if (

            !BLOCK_REGISTRY[
            block.type
            ]

        ) {

            issues.push(

                `invalid_block_type:${block.type}`
            );
        }
    });

    // ========================================
    // RESULT
    // ========================================

    return {

        valid:
            issues.length === 0,

        issues
    };
}

// ============================================
// SANITIZE LESSON
// ============================================

export function sanitizeAILesson(

    lesson = {}

) {

    const sanitizedBlocks =

        (lesson.blocks || [])

            // ====================================
            // VALID BLOCK TYPES
            // ====================================

            .filter(

                block =>

                    BLOCK_REGISTRY[
                    block.type
                    ]
            )

            // ====================================
            // BLOCK LIMIT
            // ====================================

            .slice(
                0,
                MAX_BLOCKS
            );

    return {

        ...lesson,

        blocks:
            sanitizedBlocks
    };
}

// ============================================
// GENERATE AI REPORT
// ============================================

export function generateAISafetyReport(

    lesson = {}

) {

    const validation =

        validateAILesson(
            lesson
        );

    return {

        valid:
            validation.valid,

        issueCount:
            validation.issues.length,

        issues:
            validation.issues,

        safe:
            validation.valid
    };
}