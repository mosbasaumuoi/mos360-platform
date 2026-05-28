// ============================================
// MOS360 RUNTIME SEMANTIC VALIDATION ENGINE
// Lightweight playable-first validator
// ============================================

// ============================================
// VALID BLOCK TYPES
// ============================================

const VALID_BLOCK_TYPES = [

    "video",

    "tip",

    "quiz",

    "summary",

    "text",

    "workflow",

    "exercise",

    "challenge",

    // HYBRID RUNTIME

    "content"
];

// ============================================
// VALID SURFACES
// ============================================

const VALID_SURFACES = [

    "knowledge",

    "learning",

    "practice",

    "reflection",

    "challenge",

    "action"
];

// ============================================
// VALIDATE RUNTIME BLOCK
// ============================================

export function validateRuntimeBlock(

    block = {}

) {

    const issues = [];

    // ========================================
    // BLOCK ID
    // ========================================

    if (!block.id) {

        issues.push(
            "Missing block id"
        );
    }

    // ========================================
    // HYBRID TYPE
    // ========================================

    const type =

        block.type
        ||
        block.kind
        ||
        block.semanticType
        ||
        "content";

    // ========================================
    // PLAYABLE-FIRST TYPE STRATEGY
    // ========================================

    const semanticRuntimeType =

        typeof type === "string"
        &&
        type.length > 0;

    if (!semanticRuntimeType) {

        issues.push(

            `Invalid block type: ${type}`

        );
    }

    // ========================================
    // SURFACE
    // ========================================

    const surface =

        block.semanticSurface
        ||
        block.surface
        ||
        block.flow
        ||
        "knowledge";

    const semanticRuntimeSurface =

        typeof surface === "string"
        &&
        surface.length > 0;

    if (!semanticRuntimeSurface) {

        issues.push(

            `Invalid semantic surface: ${surface}`

        );
    }

    // ========================================
    // PRIORITY
    // ========================================

    const validPriorities = [

        "low",
        "medium",
        "high",

        1,
        2,
        3
    ];

    if (

        block.priority !== undefined

        &&

        !validPriorities.includes(
            block.priority
        )

    ) {

        issues.push(

            `Invalid block priority: ${block.priority}`

        );
    }

    // ========================================
    // TITLE
    // ========================================

    if (

        !block.title

        &&

        !block.label

    ) {

        issues.push(
            "Missing block title"
        );
    }

    // ========================================
    // PLAYABLE CONTENT
    // ========================================

    const hasContent =

        block.content
        ||
        block.videoUrl
        ||
        block.embedUrl
        ||
        block.quiz
        ||
        block.text
        ||
        block.description
        ||
        block.prompt;

    // ========================================
    // QUIZ
    // ========================================

    if (

        type === "quiz"

        &&

        !block.quiz

        &&

        !block.content

    ) {

        issues.push(
            "Quiz block requires quiz content"
        );
    }

    // ========================================
    // HARD FAIL ONLY EMPTY BLOCK
    // ========================================

    if (!hasContent) {

        issues.push(
            "Missing playable content"
        );
    }

    return {

        ok:
            issues.length === 0,

        issues
    };
}

// ============================================
// VALIDATE RUNTIME LESSON
// ============================================

export function validateRuntimeLesson(

    lesson = {}

) {

    const issues = [];

    // ========================================
    // REQUIRED
    // ========================================

    if (!lesson.id) {

        issues.push(
            "Missing lesson id"
        );
    }

    if (!lesson.title) {

        issues.push(
            "Missing lesson title"
        );
    }

    // ========================================
    // STATUS
    // ========================================

    const validStatuses = [

        "draft",

        "published",

        // HYBRID IMPORT

        "runtime"
    ];

    const status =

        lesson.status
        ||
        "runtime";

    if (

        !validStatuses.includes(
            status
        )

    ) {

        issues.push(

            `Invalid lesson status: ${status}`

        );
    }

    // ========================================
    // BLOCKS
    // ========================================

    const blocks =

        lesson.blocks || [];

    if (

        !Array.isArray(blocks)

    ) {

        issues.push(
            "Lesson blocks must be array"
        );
    }

    // ========================================
    // VALIDATE BLOCKS
    // ========================================

    const blockIssues = [];

    blocks.forEach(

        (block, index) => {

            const result =

                validateRuntimeBlock(
                    block
                );

            if (!result.ok) {

                blockIssues.push(

                    `Block ${index}: ${result.issues.join(", ")}`

                );
            }
        }
    );

    issues.push(
        ...blockIssues
    );

    // ========================================
    // SCORE
    // ========================================

    const structureScore =

        lesson.id
            &&
            lesson.title

            ? 100
            : 50;

    const flowScore =

        blocks.length > 0
            ? 100
            : 0;

    const blockQuality =

        Math.max(

            0,

            100
            -
            (blockIssues.length * 5)

        );

    const progression =

        Math.floor(

            (
                structureScore
                +
                flowScore
                +
                blockQuality
            ) / 3
        );

    // ========================================
    // PLAYABLE FIRST
    // ========================================

    const playable =

        blocks.length > 0;

    return {

        ok:
            playable,

        issues,

        scores: {

            structure:
                structureScore,

            flow:
                flowScore,

            blockQuality

        },

        progression,

        readyForRuntime:

            progression >= 60
    };
}