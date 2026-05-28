import {

    createRuntimeBlock

}

    from "../../contracts/runtimeBlockContract";

export const demoLesson = {

    id:
        "mos360-demo-lesson",

    title:
        "MOS360 Runtime Learning Demo",

    description:
        "Lesson runtime đầu tiên của MOS360",

    courseId:
        "mos360-foundation",

    status:
        "draft",

    semanticVersion:
        "phase-h3",

    blocks: [

        createRuntimeBlock({

            type:
                "hero",

            title:
                "Chào mừng đến với MOS360",

            content:
                "Adaptive learning runtime",

            priority:
                "critical"
        }),

        createRuntimeBlock({

            type:
                "video",

            title:
                "Hiểu runtime learning",

            content:
                "Semantic runtime orchestration",

            priority:
                "primary"
        }),

        createRuntimeBlock({

            type:
                "checkpoint",

            title:
                "Bạn đã hiểu progression chưa?",

            content:
                "Checkpoint reflection",

            priority:
                "reinforcement"
        }),

        createRuntimeBlock({

            type:
                "practice",

            title:
                "Thực hành semantic flow",

            content:
                "Practice runtime interaction",

            priority:
                "primary"
        }),

        createRuntimeBlock({

            type:
                "reinforcement",

            title:
                "Bạn đang tiến bộ từng bước",

            content:
                "Momentum reinforcement",

            priority:
                "reinforcement"
        }),

        createRuntimeBlock({

            type:
                "quiz",

            title:
                "Reflection challenge",

            content:
                "Runtime reflection quiz",

            priority:
                "secondary"
        })
    ]
};