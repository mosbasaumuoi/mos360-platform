// ============================================
// MOS360 CONTENT VALIDATION PIPELINE
// Canonical runtime semantic validation
// ============================================

import {

    normalizeRuntimeCourseId

}

    from "../engines/runtimeCourseBridge.js";

// ============================================
// VALID BLOCK TYPES
// Semantic convergence vocabulary
// ============================================

const VALID_BLOCK_TYPES = [

    // ========================================
    // LEGACY PLAYABLE
    // ========================================

    "video",
    "text",
    "quiz",
    "challenge",
    "resource",

    // ========================================
    // SEMANTIC RUNTIME
    // ========================================

    "tip",
    "summary",
    "reflection",
    "exercise",
    "knowledge-check",

    "knowledge",
    "intro",
    "bridge",
    "momentum",
    "note",
    "action",
    "content"
];

// ============================================
// VALID LESSON STATUS
// ============================================

const VALID_LESSON_STATUS = [

    "draft",
    "published",
    "runtime",
    "semantic"
];

// ============================================
// VALID FLOW STEPS
// ============================================

const REQUIRED_FLOW_STEPS = [

    "intro",
    "learning",
    "practice",
    "summary"
];

// ============================================
// VALIDATE BLOCK
// ============================================

function validateBlock(

    block = {},
    index = 0

) {

    const errors = [];

    // ========================================
    // TYPE
    // ========================================

    const runtimeType =

        block.type
        ||
        block.kind
        ||
        "content";

    const validRuntimeType =

        typeof runtimeType === "string"
        &&
        runtimeType.length > 0;

    // ========================================
    // SEMANTIC GOVERNANCE
    // ========================================

    if (!validRuntimeType) {

        errors.push(

            `Block ${index}: invalid block type "${runtimeType}"`
        );
    }

    // ========================================
    // ID
    // ========================================

    if (!block.id) {

        errors.push(

            `Block ${index}: missing block id`
        );
    }

    // ========================================
    // CONTENT
    // ========================================

    if (

        block.content === undefined

        &&

        block.url === undefined

    ) {

        errors.push(

            `Block ${index}: missing block content`
        );
    }

    return errors;
}

// ============================================
// VALIDATE FLOW
// ============================================

function validateFlow(

    flow = []

) {

    const errors = [];

    REQUIRED_FLOW_STEPS.forEach(

        step => {

            if (

                !flow.includes(step)

            ) {

                errors.push(

                    `Missing required flow step: ${step}`
                );
            }
        }
    );

    return errors;
}

// ============================================
// VALIDATE LESSON
// ============================================

export function validateRuntimeLesson(

    lesson = {}

) {

    const validationErrors = [];

    // ========================================
    // CORE
    // ========================================

    if (!lesson.id) {

        validationErrors.push(
            "Missing lesson id"
        );
    }

    if (!lesson.courseId) {

        validationErrors.push(
            "Missing courseId"
        );
    }

    if (!lesson.title) {

        validationErrors.push(
            "Missing lesson title"
        );
    }

    // ========================================
    // STATUS
    // ========================================

    if (

        lesson.status

        &&

        !VALID_LESSON_STATUS.includes(
            lesson.status
        )

    ) {

        validationErrors.push(

            `Invalid lesson status: ${lesson.status}`
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

        validationErrors.push(
            "Blocks must be array"
        );
    }

    else {

        lesson.blocks.forEach(

            (
                block,
                index
            ) => {

                validationErrors.push(

                    ...validateBlock(
                        block,
                        index
                    )
                );
            }
        );
    }

    // ========================================
    // FLOW
    // ========================================

    if (

        Array.isArray(
            lesson.flow
        )

    ) {

        validationErrors.push(

            ...validateFlow(
                lesson.flow
            )
        );
    }

    // ========================================
    // SCORE
    // ========================================

    const scores = {

        structure:
            0,

        flow:
            0,

        blockQuality:
            0
    };

    // ========================================
    // STRUCTURE SCORE
    // ========================================

    if (

        lesson.id
        &&
        lesson.courseId
        &&
        lesson.title

    ) {

        scores.structure += 40;
    }

    if (

        Array.isArray(
            lesson.blocks
        )

    ) {

        scores.structure += 30;
    }

    if (

        lesson.blocks?.length > 0

    ) {

        scores.structure += 25;
    }

    // ========================================
    // FLOW SCORE
    // ========================================

    if (

        Array.isArray(
            lesson.flow
        )

    ) {

        const validFlowSteps =

            REQUIRED_FLOW_STEPS.filter(

                step =>

                    lesson.flow.includes(
                        step
                    )
            );

        scores.flow =

            Math.round(

                (
                    validFlowSteps.length

                    /

                    REQUIRED_FLOW_STEPS.length
                )

                * 100
            );
    }

    // ========================================
    // BLOCK QUALITY SCORE
    // ========================================

    if (

        Array.isArray(
            lesson.blocks
        )

        &&

        lesson.blocks.length > 0

    ) {

        const validBlocks =

            lesson.blocks.filter(

                block =>

                    VALID_BLOCK_TYPES.includes(
                        block.type
                    )
            );

        scores.blockQuality =

            Math.round(

                (
                    validBlocks.length

                    /

                    lesson.blocks.length
                )

                * 100
            );
    }

    // ========================================
    // PROGRESSION
    // ========================================

    const progression =

        Math.round(

            (
                scores.structure

                +

                scores.flow

                +

                scores.blockQuality
            )

            / 3
        );

    // ========================================
    // READY FOR RUNTIME
    // ========================================

    const readyForRuntime =

        validationErrors.length === 0

        &&

        progression >= 80;

    return {

        valid:

            validationErrors.length === 0,

        readyForRuntime,

        progression,

        scores,

        validationErrors,

        semanticVersion:
            "phase-h-validation-pipeline"
    };
}

// ============================================
// VALIDATE COURSE
// ============================================

export function validateRuntimeCourse(

    course = {}

) {

    const validationErrors = [];

    // ========================================
    // CORE
    // ========================================

    if (!course.id) {

        validationErrors.push(
            "Missing course id"
        );
    }

    if (!course.title) {

        validationErrors.push(
            "Missing course title"
        );
    }

    // ========================================
    // NORMALIZED ID
    // ========================================

    const normalizedId =

        normalizeRuntimeCourseId(
            course.id
        );

    if (!normalizedId) {

        validationErrors.push(
            "Invalid normalized course id"
        );
    }

    // ========================================
    // LESSONS
    // ========================================

    if (

        !Array.isArray(
            course.lessons
        )

    ) {

        validationErrors.push(
            "Course lessons must be array"
        );
    }

    else {

        course.lessons.forEach(

            lesson => {

                const result =

                    validateRuntimeLesson(
                        lesson
                    );

                if (!result.valid) {

                    validationErrors.push(

                        `Lesson ${lesson.id}: invalid runtime lesson`
                    );
                }
            }
        );
    }

    return {

        valid:

            validationErrors.length === 0,

        validationErrors,

        semanticVersion:
            "phase-h-validation-pipeline"
    };
}