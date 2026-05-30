import {

    createEmptyRuntimeShape

}

    from "../../contracts/runtimeShapeContract";

// ============================================
// VIDEO
// ============================================

function adaptVideoBlock(
    block = {}
) {

    const shape =
        createEmptyRuntimeShape();

    shape.metadata = {

        id:
            block.id || "",

        type:
            "video",

        title:
            block.title || ""
    };

    shape.media = {

        provider:

            block.provider
            || "youtube",

        url:

            block.videoUrl
            || "",

        embedUrl:

            block.videoUrl
            || "",

        thumbnail:
            ""
    };

    return shape;
}

// ============================================
// TEXT
// ============================================

function adaptTextBlock(
    block = {}
) {

    const shape =
        createEmptyRuntimeShape();

    shape.metadata = {

        id:
            block.id || "",

        type:
            "text",

        title:
            block.title || "",

        description:

            block.description
            || ""
    };

    shape.resources = [

        {

            type:
                "content",

            value:

                block.content
                || ""
        }
    ];

    return shape;
}

// ============================================
// WORKFLOW
// ============================================

function adaptWorkflowBlock(
    block = {}
) {

    const shape =
        createEmptyRuntimeShape();

    shape.metadata = {

        id:
            block.id || "",

        type:
            "workflow",

        title:
            block.title || ""
    };

    shape.sequence = {

        mode:
            "linear",

        nodes:

            Array.isArray(
                block.steps
            )

                ? block.steps

                : [],

        edges: []
    };

    return shape;
}

// ============================================
// PRACTICE
// ============================================

function adaptPracticeBlock(
    block = {}
) {

    const shape =
        createEmptyRuntimeShape();

    shape.metadata = {

        id:
            block.id || "",

        type:
            "practice",

        title:
            block.title || ""
    };

    shape.activities =

        Array.isArray(
            block.tasks
        )

            ? block.tasks

            : [];

    return shape;
}

// ============================================
// CALLOUT
// ============================================

function adaptCalloutBlock(
    block = {}
) {

    const shape =
        createEmptyRuntimeShape();

    shape.metadata = {

        id:
            block.id || "",

        type:
            "callout",

        title:
            block.title || ""
    };

    shape.resources = [

        {

            type:
                block.variant
                || "tip",

            value:
                block.content
                || ""
        }
    ];

    return shape;
}

// ============================================
// QUIZ
// ============================================

function adaptQuizBlock(
    block = {}
) {

    const shape =
        createEmptyRuntimeShape();

    shape.metadata = {

        id:
            block.id || "",

        type:
            "quiz",

        title:
            block.title || ""
    };

    shape.assessment = {

        questions: [

            {

                question:
                    block.question
                    || "",

                answers:

                    Array.isArray(
                        block.answers
                    )

                        ? block.answers

                        : [],

                correctAnswer:
                    block.correctAnswer
            }

        ],

        checkpoints: []
    };

    return shape;
}

// ============================================
// CHECKPOINT
// ============================================

function adaptCheckpointBlock(
    block = {}
) {

    const shape =
        createEmptyRuntimeShape();

    shape.metadata = {

        id:
            block.id || "",

        type:
            "checkpoint",

        title:
            block.title || ""
    };

    shape.assessment = {

        questions: [],

        checkpoints: [

            {
                content:
                    block.content
                    || ""
            }
        ]
    };

    return shape;
}

// ============================================
// MAIN
// ============================================

export function adaptRuntimeBlock(
    block = {}
) {

    switch (block.type) {

        case "video":

            return adaptVideoBlock(
                block
            );

        case "workflow":

            return adaptWorkflowBlock(
                block
            );

        case "practice":

            return adaptPracticeBlock(
                block
            );

        case "callout":

            return adaptCalloutBlock(
                block
            );

        case "quiz":

            return adaptQuizBlock(
                block
            );

        case "checkpoint":

            return adaptCheckpointBlock(
                block
            );

        default:

            return adaptTextBlock(
                block
            );
    }
}