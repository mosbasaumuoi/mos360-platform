// ============================================
// WORD BASICS LESSON
// ============================================

export const WORD_BASICS_LESSON = {

    // ========================================
    // CORE
    // ========================================

    id:
        "word-basics",

    courseId:
        "mos-word-specialist",

    title:
        "Word Basics",

    order:
        1,

    xpReward:
        20,

    // ========================================
    // METADATA
    // ========================================

    description:
        "Làm quen với giao diện và workflow cơ bản trong Word.",

    duration:
        "12 phút",

    videoUrl:
        "https://www.youtube.com/embed/ymZAoqYs6x4?si=MYPePycO1rcP3_tb",    

    difficulty:
        "beginner",

    version:
        "v2-block-native",

    tags: [

        "word",

        "office",

        "mos"
    ],

    // ========================================
    // BLOCK-FIRST MODEL
    // ========================================

    blocks: [

        {

            type:
                "text",

            priority:
                "primary",

            content:
                `

                <h2>
                    Làm quen với Microsoft Word
                </h2>

                <p>

                    Đây là bài học đầu tiên giúp bạn
                    làm quen workflow Word cơ bản.

                </p>

                `
        },

        {

            type:
                "workflow",

            priority:
                "primary",

            steps: [

                "Làm quen Ribbon",

                "Tạo tài liệu",

                "Lưu tài liệu",

                "Formatting cơ bản"
            ]
        },

        {

            type:
                "tips",

            priority:
                "secondary",

            items: [

                "Ctrl + S để lưu nhanh",

                "Dùng Heading để quản lý tài liệu"
            ]
        }

    ],

    // ========================================
    // QUIZ
    // ========================================

    quiz: [

        {

            question:
                "Phím tắt lưu tài liệu là gì?",

            options: [

                "Ctrl + P",

                "Ctrl + S",

                "Ctrl + D"
            ],

            correctAnswer:
                1
        }

    ]
};  