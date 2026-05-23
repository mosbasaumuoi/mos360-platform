// ============================================
// LESSON BLOCK CONTRACT
// Dynamic lesson renderer block architecture
// ============================================

// ============================================
// BLOCK TYPES
// ============================================

export const LESSON_BLOCK_TYPES = [

    // ========================================
    // CORE CONTENT
    // ========================================

    "video",

    "text",

    "workflow",

    "quiz",

    "practice",

    "callout",

    "download",

    "resource",

    // ========================================
    // MOS360 ADVANCED LEARNING
    // ========================================

    "office-demo",

    "workflow-simulation",

    "continuity",

    "reinforcement",

    "mistake-analysis",

    "practical-task",

    "checkpoint",

    "exam-bridge",

    "ai-assistant"
];

// ============================================
// PRIORITY LEVELS
// ============================================

export const LESSON_BLOCK_PRIORITIES = [

    "critical",

    "primary",

    "secondary",

    "reinforcement",

    "optional"
];

// ============================================
// REQUIRED FIELDS
// ============================================

export const LESSON_BLOCK_REQUIRED_FIELDS = [

    "type"
];

// ============================================
// VALIDATE BLOCK
// ============================================

export function validateLessonBlock(

    block

) {

    // ========================================
    // OBJECT CHECK
    // ========================================

    if (

        !block
        ||
        typeof block !== "object"

    ) {

        return false;
    }

    // ========================================
    // REQUIRED
    // ========================================

    const requiredValid =

        LESSON_BLOCK_REQUIRED_FIELDS.every(

            field =>

                field in block
        );

    if (!requiredValid) {

        return false;
    }

    // ========================================
    // VALID TYPE
    // ========================================

    if (

        !LESSON_BLOCK_TYPES.includes(
            block.type
        )

    ) {

        return false;
    }

    // ========================================
    // PRIORITY
    // ========================================

    if (

        block.priority
        &&

        !LESSON_BLOCK_PRIORITIES.includes(
            block.priority
        )

    ) {

        return false;
    }

    // ========================================
    // CONDITIONS
    // ========================================

    if (

        block.conditions
        &&

        typeof block.conditions
        !==
        "object"

    ) {

        return false;
    }

    return true;
}