/**
 * MOS360
 * Composer Layout Engine
 *
 * RESPONSIBILITY:
 * - visual block layout
 * - viewport focus orchestration
 * - cinematic spacing
 * - block grouping
 * - visual sequencing
 * - hybrid runtime display bridge
 *
 * MUST NOT:
 * - mutate lessons
 * - bypass sequencing
 * - render raw runtime
 */

// ============================================
// PRIMARY BLOCKS
// ============================================

const PRIMARY_BLOCKS = [
    "video",
    "workflow",
    "text"
];

// ============================================
// REINFORCEMENT BLOCKS
// ============================================

const REINFORCEMENT_BLOCKS = [
    "checkpoint",
    "reinforcement",
    "continuity"
];

// ============================================
// CREATE VISUAL FLOW
// ============================================

export function createVisualFlow(
    blocks = []
) {

    return blocks.map(
        (block, index) => ({

            // ====================================
            // HYBRID DISPLAY NORMALIZATION
            // ====================================

            ...normalizeBlockForDisplay(
                block
            ),

            visualOrder:
                index,

            visualGroup:
                getVisualGroup(
                    block
                ),

            focusMode:
                getFocusMode(
                    block
                ),

            cinematicSpacing:
                getCinematicSpacing(
                    block
                )
        })
    );
}

// ============================================
// DISPLAY NORMALIZER
// Hybrid runtime compatibility bridge
// ============================================

function normalizeBlockForDisplay(
    block = {}
) {

    const normalized = {
        ...block
    };

    // ========================================
    // VIDEO URL
    // Spreadsheet runtime:
    // block.url
    //
    // JSON runtime:
    // block.videoUrl
    // ========================================

    if (
        !normalized.videoUrl
        &&
        normalized.url
    ) {

        normalized.videoUrl =
            normalized.url;
    }

    // ========================================
    // VIDEO CONTENT FALLBACK
    // Spreadsheet runtime may store:
    // content = ""
    // ========================================

    if (
        normalized.type === "video"
        &&
        !normalized.content
    ) {

        normalized.content =

            normalized.description
            ||
            normalized.title
            ||
            "";
    }

    // ========================================
    // QUIZ DISPLAY FALLBACK
    // Spreadsheet runtime:
    // question + answers
    //
    // JSON runtime:
    // content/questions
    // ========================================

    if (
        normalized.type === "quiz"
        &&
        !normalized.content
    ) {

        normalized.content =

            normalized.question
            ||
            "";
    }

    // ========================================
    // QUIZ ANSWERS NORMALIZATION
    // ========================================

    if (
        normalized.type === "quiz"
        &&
        !normalized.questions
        &&
        Array.isArray(
            normalized.answers
        )
    ) {

        normalized.questions = [

            {
                question:

                    normalized.question
                    || "",

                answers:

                    normalized.answers,

                correctAnswer:

                    normalized.correctAnswer
                    || 0
            }
        ];
    }

    return normalized;
}

// ============================================
// VISUAL GROUP
// ============================================

function getVisualGroup(
    block = {}
) {

    if (
        PRIMARY_BLOCKS.includes(
            block.type
        )
    ) {

        return "primary";
    }

    if (
        REINFORCEMENT_BLOCKS.includes(
            block.type
        )
    ) {

        return "reinforcement";
    }

    return "support";
}

// ============================================
// FOCUS MODE
// ============================================

function getFocusMode(
    block = {}
) {

    if (
        PRIMARY_BLOCKS.includes(
            block.type
        )
    ) {

        return "focused";
    }

    return "normal";
}

// ============================================
// CINEMATIC SPACING
// ============================================

function getCinematicSpacing(
    block = {}
) {

    if (
        block.type === "checkpoint"
    ) {

        return "xl";
    }

    if (
        PRIMARY_BLOCKS.includes(
            block.type
        )
    ) {

        return "lg";
    }

    return "md";
}
