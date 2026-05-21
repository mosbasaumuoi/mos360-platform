// ============================================
// COURSE BLUEPRINTS
// Semantic reusable course structures
// ============================================

// ============================================
// MOS OFFICE COURSE
// ============================================

export function createMosOfficeBlueprint({

    id,

    slug,

    title,

    description,

    software = "office",

    level = "beginner"

}) {

    return {

        id,

        slug,

        title,

        description,

        category:
            "mos",

        level,

        duration:
            "6 giờ",

        difficulty:
            level,

        xpReward:
            250,

        tags: [

            software,

            "mos",

            "office"
        ],

        lessonBlueprints: [

            {

                id:
                    `${software}-basics`,

                title:
                    `${software.toUpperCase()} Basics`,

                description:
                    `Làm quen workflow cơ bản trong ${software}.`,

                workflowSteps: [

                    "Làm quen giao diện",

                    "Tạo tài liệu",

                    "Lưu tài liệu",

                    "Workflow cơ bản"
                ]
            },

            {

                id:
                    `${software}-formatting`,

                title:
                    `${software.toUpperCase()} Formatting`,

                description:
                    `Luyện formatting workflow trong ${software}.`,

                workflowSteps: [

                    "Formatting cơ bản",

                    "Font và spacing",

                    "Layout workflow",

                    "Formatting consistency"
                ]
            }

        ]
    };
}