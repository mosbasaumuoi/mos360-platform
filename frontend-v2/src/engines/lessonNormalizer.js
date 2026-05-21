// ============================================
// LESSON NORMALIZER
// Legacy → Semantic Block Runtime
// ============================================

// ============================================
// CREATE SEMANTIC BLOCKS
// ============================================

function createSemanticBlocks(
    lesson
) {

    const blocks = [];

    // ========================================
    // TEXT BLOCK
    // ========================================

    if (

        lesson.content ||

        lesson.description

    ) {

        blocks.push({

            type:
                "text",

            priority:
                "primary",

            content:

                lesson.content ||

                `

        <h2>

          ${lesson.title}

        </h2>

        <p>

          ${lesson.description || ""}

        </p>

        `
        });
    }

    // ========================================
    // WORKFLOW BLOCK
    // ========================================

    if (

        Array.isArray(
            lesson.workflowSteps
        )

        &&

        lesson.workflowSteps.length

    ) {

        blocks.push({

            type:
                "workflow",

            priority:
                "primary",

            title:
                "Workflow thực hành",

            steps:
                lesson.workflowSteps
        });
    }

    // ========================================
    // TIPS BLOCK
    // ========================================

    if (

        Array.isArray(
            lesson.tips
        )

        &&

        lesson.tips.length

    ) {

        blocks.push({

            type:
                "tips",

            priority:
                "secondary",

            title:
                "Mẹo thực hành",

            items:
                lesson.tips
        });
    }

    // ========================================
    // PRACTICAL BLOCK
    // ========================================

    if (

        lesson.practicalContent ||

        (
            Array.isArray(
                lesson.practicalNotes
            )

            &&

            lesson.practicalNotes.length
        )

    ) {

        blocks.push({

            type:
                "practical",

            priority:
                "secondary",

            content:

                lesson.practicalContent ||

                lesson.practicalNotes.join(
                    "<br>"
                )
        });
    }

    // ========================================
    // RESOURCE BLOCK
    // ========================================

    if (

        Array.isArray(
            lesson.resources
        )

        &&

        lesson.resources.length

    ) {

        blocks.push({

            type:
                "resource",

            priority:
                "secondary",

            resources:
                lesson.resources
        });
    }

    // ========================================
    // CHECKPOINT BLOCK
    // ========================================

    blocks.push({

        type:
            "checkpoint",

        priority:
            "reinforcement",

        title:
            "Tiếp tục duy trì workflow học tập",

        message:
            "Kỹ năng Office sẽ hình thành tự nhiên thông qua luyện tập đều đặn."
    });

    return blocks;
}

// ============================================
// NORMALIZE LESSON
// ============================================

export function normalizeLesson(
    lesson = {}
) {

    // ========================================
    // BLOCK-NATIVE
    // ========================================

    if (

        Array.isArray(
            lesson.blocks
        )

        &&

        lesson.blocks.length

    ) {

        return lesson;
    }

    // ========================================
    // LEGACY/TEMPLATE-FIRST
    // ========================================

    return {

        ...lesson,

        blocks:
            createSemanticBlocks(
                lesson
            )
    };
}