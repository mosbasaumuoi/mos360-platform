import {

    normalizeRuntimeBlocks

}

    from "../../contracts/runtimeBlockContract";

import {
    normalizeRuntimeLessonShape
}
    from "../../contracts/runtimeLessonContract";

import {
    RUNTIME_LESSON_STATUSES
}
    from "../../contracts/runtimeLessonContract";

import {

    mapLessonBlocksToFlow

}

    from "./runtimeLessonFlowMapper";

// ============================================
// COMPILE VIDEO BLOCK
// ============================================

function compileVideoBlock(
    block = {}
) {

    const compiled = {
        ...block
    };

    // ================================
    // EXTRACT URL
    // ================================

    let videoUrl =

        compiled.videoUrl
        ||
        compiled.url
        ||
        compiled.embedUrl
        ||
        "";

    // ================================
    // CONTENT FALLBACK
    // ================================

    if (

        !videoUrl

        &&

        typeof compiled.content ===
        "string"

    ) {

        const possibleUrl =
            compiled.content.trim();

        if (
            possibleUrl.startsWith("http")
        ) {

            videoUrl =
                possibleUrl;
        }
    }

    // ================================
    // RUNTIME VIDEO CONTRACT
    // ================================

    compiled.videoUrl =
        videoUrl;

    compiled.url =
        videoUrl;

    compiled.embedUrl =
        videoUrl;

    compiled.video = {

        type: "youtube",

        url: videoUrl,

        embedUrl: videoUrl
    };

    // ================================
    // PLAYABLE FLAG
    // ================================

    compiled.playable = true;

    compiled.provider = "youtube";

    return compiled;
}

// ============================================
// COMPILE WORKFLOW BLOCK
// ============================================

function compileWorkflowBlock(
    block = {}
) {

    const compiled = {
        ...block
    };

    if (

        !Array.isArray(
            compiled.steps
        )

        &&

        typeof compiled.content ===
            "string"

    ) {

        compiled.steps =

            compiled.content

                .split(/\n|;/)

                .map(
                    step =>
                        step.trim()
                )

                .filter(Boolean);
    }

    return compiled;
}

// ============================================
// COMPILE CALLOUT BLOCK
// ============================================

function compileCalloutBlock(
    block = {}
) {

    const compiled = {
        ...block
    };

    const metadata =

        typeof block.metadata ===
            "object"

            &&

            block.metadata !== null

                ? block.metadata

                : {};

    compiled.variant =

        block.variant
        ||
        metadata.variant
        ||
        "tip";

    compiled.title =

        block.title
        ||
        metadata.title
        ||
        "Gợi ý";

    compiled.content =

        block.content
        ||
        block.description
        ||
        "";

    return compiled;
}

// ============================================
// COMPILE QUIZ BLOCK
// ============================================

function compileQuizBlock(
    block = {}
) {

    const metadata =

        typeof block.metadata ===
            "object"

            &&

            block.metadata !== null

                ? block.metadata

                : {};

    return {

        ...block,

        question:

            metadata.question
            ||
            block.question
            ||
            block.content
            ||
            "",

        answers:

            Array.isArray(
                metadata.answers
            )

                ? metadata.answers

                : [],

        correctAnswer:

            typeof metadata.correctAnswer ===
                "number"

                    ? metadata.correctAnswer

                    : 0,

        explanation:

            metadata.explanation
            ||
            ""
    };
}

// ============================================
// COMPILE PRACTICE BLOCK
// ============================================

function compilePracticeBlock(
    block = {}
) {

    return {

        ...block,

        tasks:

            Array.isArray(
                block.tasks
            )

                ? block.tasks

                : typeof block.content ===
                    "string"

                    ? block.content

                        .split(/\n|;/)

                        .map(
                            task =>
                                task.trim()
                        )

                        .filter(Boolean)

                    : []
    };
}

// ============================================
// COMPILE BLOCK
// ============================================

function compileRuntimeBlock(
    block = {}
) {

    switch (block.type) {

        case "video":

            return compileVideoBlock(
                block
            );

        case "workflow":

            return compileWorkflowBlock(
                block
            );

        case "callout":

            return compileCalloutBlock(
                block
            );

        case "quiz":

            return compileQuizBlock(
                block
            );

        case "practice":

            return compilePracticeBlock(
                block
            );

        default:

            return block;
    }
}

// ============================================
// EXTRACT PRACTICE
// ============================================

function extractPracticeBlocks(
    blocks = []
) {

    return blocks

        .filter(

            block =>

                block.type ===
                "practice"
        )

        .map(block => ({

            title:

                block.title
                ||
                "Thực hành",

            tasks:

                Array.isArray(
                    block.tasks
                )

                    ? block.tasks

                    : []
        }));
}

// ============================================
// EXTRACT QUIZ
// ============================================

function extractQuizBlocks(
    blocks = []
) {

    return blocks

        .filter(

            block =>

                block.type ===
                "quiz"
        )

        .map(block => ({

            question:

                block.question
                ||
                "",

            answers:

                Array.isArray(
                    block.answers
                )

                    ? block.answers

                    : [],

            correctAnswer:

                typeof block.correctAnswer ===
                    "number"

                    ? block.correctAnswer

                    : 0,

            explanation:

                block.explanation
                ||
                ""
        }));
}

// ============================================
// FILTER RENDERABLE BLOCKS
// ============================================

function filterRenderableBlocks(
    blocks = []
) {

    return blocks.filter(block =>

        ![
            "practice",
            "quiz"
        ].includes(
            block.type
        )
    );
}

// ============================================
// BUILD LEGACY COMPATIBILITY
// ============================================

function buildLegacyCompatibility(
    blocks = []
) {

    const video =

        blocks.find(
            block =>
                block.type ===
                "video"
        ) || null;

    const workflow =

        blocks.find(
            block =>
                block.type ===
                "workflow"
        ) || null;

    const callouts =

        blocks.filter(
            block =>
                block.type ===
                "callout"
        );

    const summary =

        blocks.find(
            block =>
                block.type ===
                "summary"
        ) || null;

    return {

        video,

        workflow,

        callouts,

        summary
    };
}

// ============================================
// NORMALIZE RUNTIME LESSON
// ============================================

export function normalizeRuntimeLesson(
    lesson = {}
) {

    // ========================================
    // BLOCK NORMALIZATION
    // ========================================

    const normalizedBlocks =

        normalizeRuntimeBlocks(

            Array.isArray(
                lesson.blocks
            )

                ? lesson.blocks

                : []
        );

    // ========================================
    // COMPILE RUNTIME BLOCKS
    // ========================================

    const compiledBlocks =

        normalizedBlocks.map(
            compileRuntimeBlock
        );

    // ========================================
    // FLOW MAPPING
    // ========================================

    const flowBlocks =

        mapLessonBlocksToFlow(
            compiledBlocks
        );

    // ========================================
    // PRACTICE
    // ========================================

    const practice =

        extractPracticeBlocks(
            flowBlocks
        );

    // ========================================
    // QUIZ
    // ========================================

    const quiz =

        extractQuizBlocks(
            flowBlocks
        );

    // ========================================
    // RENDERABLE BLOCKS
    // ========================================

    const renderableBlocks =

        filterRenderableBlocks(
            flowBlocks
        );

    // ========================================
    // LEGACY COMPATIBILITY
    // ========================================

    const compatibility =

        buildLegacyCompatibility(
            flowBlocks
        );

    // ========================================
    // FINAL LESSON
    // ========================================

    return normalizeRuntimeLessonShape({

        id:

            typeof lesson.id ===
                "string"

                ? lesson.id

                : crypto.randomUUID(),

        title:

            typeof lesson.title ===
                "string"

                ? lesson.title

                : "",

        description:

            typeof lesson.description ===
                "string"

                ? lesson.description

                : "",

        courseId:

            typeof lesson.courseId ===
                "string"

                ? lesson.courseId

                : null,

        semanticVersion:

            typeof lesson.semanticVersion ===
                "string"

                ? lesson.semanticVersion

                : "phase-h-converged",

        status:

            RUNTIME_LESSON_STATUSES.includes(
                lesson.status
            )

                ? lesson.status

                : "draft",

        // ====================================
        // RUNTIME BLOCKS
        // ====================================

        blocks:
            renderableBlocks,

        // ====================================
        // PRACTICE
        // ====================================

        practice,

        // ====================================
        // QUIZ
        // ====================================

        quiz,

        // ====================================
        // LEGACY RUNTIME BRIDGE
        // ====================================

        video:
            compatibility.video,

        workflow:
            compatibility.workflow,

        callouts:
            compatibility.callouts,

        summary:
            compatibility.summary,

        createdAt:

            typeof lesson.createdAt ===
                "number"

                ? lesson.createdAt

                : Date.now(),

        updatedAt:

            typeof lesson.updatedAt ===
                "number"

                ? lesson.updatedAt

                : Date.now()
    });
}

// ============================================
// NORMALIZE LESSON COLLECTION
// ============================================

export function normalizeRuntimeLessons(
    lessons = []
) {

    return lessons.map(
        normalizeRuntimeLesson
    );
}
