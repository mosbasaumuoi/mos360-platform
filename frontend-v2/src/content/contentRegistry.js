// ============================================
// MOS360 STATIC CONTENT REGISTRY
// Static JSON-driven platform content
// ============================================

export const CONTENT_REGISTRY = {

    // ========================================
    // COURSES
    // ========================================

    courses: [

        {

            id:
                "mos-word-specialist",

            slug:
                "mos-word-specialist",

            title:
                "MOS Word Specialist",

            description:
                "Luyện thi và xây dựng kỹ năng Microsoft Word thực tế.",

            category:
                "mos",

            level:
                "beginner",

            duration:
                "6 giờ",

            difficulty:
                "beginner",

            xpReward:
                250,

            tags: [
                "word",
                "mos",
                "office"
            ],

            lessons: [

                {

                    id:
                        "word-basics",

                    title:
                        "Word Basics",

                    order:
                        1,

                    duration:
                        "12 phút",

                    xpReward:
                        20
                }

            ]
        }

    ],

    // ========================================
    // LESSONS
    // ========================================

    lessons: [

        {

            // ====================================
            // CORE
            // ====================================

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

            // ====================================
            // METADATA
            // ====================================

            description:
                "Làm quen với giao diện và workflow cơ bản trong Word.",

            duration:
                "12 phút",

            difficulty:
                "beginner",

            version:
                "v2-block-native",

            tags: [
                "word",
                "office",
                "mos"
            ],

            // ====================================
            // BLOCK-FIRST LESSON MODEL
            // ====================================

            blocks: [

                // ==================================
                // VIDEO BLOCK
                // ==================================

                {

                    type:
                        "video",

                    url:
                        ""
                },

                // ==================================
                // TEXT BLOCK
                // ==================================

                {

                    type:
                        "text",

                    content:
                        `

                        <h2>
                            Làm quen với Microsoft Word
                        </h2>

                        <p>

                            Trong bài học này bạn sẽ
                            làm quen với giao diện,
                            workflow cơ bản và cách
                            sử dụng Word hiệu quả hơn
                            trong học tập cũng như công việc.

                        </p>

                        <p>

                            MOS360 tập trung vào việc
                            giúp người học hiểu cách
                            sử dụng Word trong môi trường thực tế,
                            thay vì chỉ học lý thuyết rời rạc.

                        </p>

                        `
                },

                // ==================================
                // WORKFLOW BLOCK
                // ==================================

                {

                    type:
                        "workflow",

                    steps: [

                        "Làm quen giao diện Ribbon",

                        "Tạo và lưu tài liệu",

                        "Định dạng văn bản cơ bản",

                        "Làm việc với đoạn văn",

                        "Thiết lập bố cục tài liệu"
                    ]
                },

                // ==================================
                // PRACTICAL BLOCK
                // ==================================

                {

                    type:
                        "practical",

                    content:
                        `

                        Hãy thử tạo một tài liệu Word đơn giản
                        gồm tiêu đề, đoạn văn và danh sách bullet
                        để bắt đầu làm quen với workflow cơ bản.

                        `
                },

                // ==================================
                // TIPS BLOCK
                // ==================================

                {

                    type:
                        "tips",

                    items: [

                        "Sử dụng Ctrl + S thường xuyên để tránh mất dữ liệu",

                        "Dùng Heading để quản lý tài liệu dài hiệu quả hơn",

                        "Làm quen với Quick Access Toolbar để thao tác nhanh hơn"
                    ]
                }

            ],

            // ====================================
            // LEGACY COMPATIBILITY
            // ====================================

            content:
                "Học các thao tác cơ bản trong Word.",

            videoUrl:
                "",

            workflowSteps: [],

            practicalNotes: [],

            // ====================================
            // OPTIONAL ARRAYS
            // ====================================

            objectives: [],

            commonMistakes: [],

            resources: [],

            quiz: [

                {

                    question:
                        "Phím tắt lưu tài liệu nhanh trong Word là gì?",

                    options: [

                        "Ctrl + P",

                        "Ctrl + S",

                        "Ctrl + D"
                    ],

                    correctAnswer:
                        1
                }

            ]
        }
    ]
};