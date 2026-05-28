export const RUNTIME_LESSON_FLOW_TYPES = [

    "intro",
    "learning",
    "checkpoint",
    "practice",
    "reinforcement",
    "reflection",
    "completion"

];

// ============================================
// CREATE LESSON FLOW
// ============================================

export function createLessonFlowStep({

    type = "learning",

    required = true,

    minimumBlocks = 1

} = {}) {

    return {

        type,

        required,

        minimumBlocks
    };
}

// ============================================
// DEFAULT LESSON FLOW
// ============================================

export function createDefaultLessonFlow() {

    return [

        createLessonFlowStep({

            type: "intro",

            minimumBlocks: 1
        }),

        createLessonFlowStep({

            type: "learning",

            minimumBlocks: 1
        }),

        createLessonFlowStep({

            type: "checkpoint",

            required: false,

            minimumBlocks: 1
        }),

        createLessonFlowStep({

            type: "practice",

            required: false,

            minimumBlocks: 1
        }),

        createLessonFlowStep({

            type: "reinforcement",

            required: false,

            minimumBlocks: 1
        }),

        createLessonFlowStep({

            type: "reflection",

            required: false,

            minimumBlocks: 1
        }),

        createLessonFlowStep({

            type: "completion",

            required: false,

            minimumBlocks: 1
        })
    ];
}