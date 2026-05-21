// ============================================
// LESSON TEMPLATE
// Reusable lesson scaffolding system
// ============================================

import {

    createTextBlock,

    createWorkflowBlock,

    createTipsBlock,

    createPracticalBlock,

    createCheckpointBlock,

    createResourceBlock

}
    from "./blockPresets.js";

// ============================================
// CREATE LESSON TEMPLATE
// ============================================

export function createLessonTemplate({

    id,

    courseId,

    title,

    description = "",

    duration = "10 phút",

    difficulty = "beginner",

    xpReward = 20,

    workflowSteps = [],

    tips = [],

    practicalContent = "",

    videoUrl = "",

    resources = [],

    quiz = []

}) {

    return {

        // ====================================
        // CORE
        // ====================================

        id,

        courseId,

        title,

        order:
            1,

        xpReward,

        // ====================================
        // METADATA
        // ====================================

        description,

        duration,

        difficulty,

        videoUrl,

        version:
            "v3-template-driven",

        tags: [],

        // ====================================
        // BLOCKS
        // ====================================

        blocks:

            [

                resources.length

                    ? createResourceBlock({

                        resources
                    })

                    : null,

                createTextBlock({

                    title,

                    content:
                        description
                }),

                createWorkflowBlock({

                    steps:
                        workflowSteps
                }),

                createTipsBlock({

                    items:
                        tips
                }),

                createPracticalBlock({

                    content:
                        practicalContent
                }),

                createCheckpointBlock({

                    title:
                        "Tiếp tục duy trì workflow học tập",

                    message:
                        "Kỹ năng Office sẽ hình thành tự nhiên thông qua luyện tập đều đặn."
                })

            ]

                .filter(Boolean),

        // ====================================
        // QUIZ
        // ====================================

        quiz
    };
}