// ============================================
// MOS360 SPREADSHEET LESSON TRANSFORMER
// Canonical runtime semantic transformer
// ============================================

// ============================================
// NORMALIZE ID
// ============================================

function normalizeId(

    value = ""

) {

    return String(value)

        .trim()

        .toLowerCase()

        .replace(/\s+/g, "-")

        .replace(/[^a-z0-9-_]/g, "");
}

// ============================================
// YOUTUBE URL
// ============================================

function extractYoutubeEmbedUrl(

    url = ""

) {

    if (!url) {

        return "";
    }

    // ========================================
    // YOUTUBE WATCH
    // ========================================

    const watchMatch =

        url.match(

            /youtube\.com\/watch\?v=([^&]+)/i
        );

    if (watchMatch?.[1]) {

        return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }

    // ========================================
    // SHORT URL
    // ========================================

    const shortMatch =

        url.match(

            /youtu\.be\/([^?]+)/i
        );

    if (shortMatch?.[1]) {

        return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }

    return url;
}

// ============================================
// CREATE VIDEO BLOCK
// ============================================

function createVideoBlock(
    row = {}
) {

    return {
        id: `${row.id}-video`,
        type: "video",

        title:
            row.videoTitle ||
            row.title ||
            "Lesson Video",

        videoUrl:
            extractYoutubeEmbedUrl(
                row.videoUrl
            ),

        provider:
            "youtube",

        required:
            true
    };
}

// ============================================
// CREATE TEXT BLOCK
// ============================================

function createTextBlock(

    row = {}

) {

    return {

        id:
            `${row.id}-text`,

        type:
            "text",

        title:
            "Nội dung bài học",

        content:

            row.content ||

            row.description ||

            "Runtime semantic lesson",

        required:
            true
    };
}

// ============================================
// CREATE VIDEO SEMANTIC BLOCK
// ============================================

function createVideoSemanticBlock(
    row = {}
) {

    return {

        id:
            `${row.id}-video`,

        type:
            "video",

        title:
            row.title || "Video Lesson",

        metadata: {

            source:
                "spreadsheet",

            blockType:
                "video"
        },

        media: [

            {

                kind:
                    "youtube",

                url:

                    extractYoutubeEmbedUrl(
                        row.content
                    )
            }
        ]
    };
}

// ============================================
// CREATE TEXT SEMANTIC BLOCK
// ============================================

function createTextSemanticBlock(
    row = {}
) {

    return {

        id:
            `${row.id}-text`,

        type:
            "text",

        title:
            row.title || "",

        metadata: {

            source:
                "spreadsheet",

            blockType:
                "text"
        },

        resources: [

            {

                type:
                    "content",

                value:
                    row.content || ""
            }
        ]
    };
}

// ============================================
// CREATE WORKFLOW SEMANTIC BLOCK
// ============================================

function createWorkflowSemanticBlock(
    row = {}
) {

    return {

        id:
            `${row.id}-workflow`,

        type:
            "workflow",

        title:
            row.title || "",

        metadata: {

            source:
                "spreadsheet",

            blockType:
                "workflow"
        },

        sequence: {

            mode:
                "linear",

            nodes:

                String(
                    row.content || ""
                )

                    .split(";")

                    .map(
                        item =>
                            item.trim()
                    )

                    .filter(Boolean),

            edges: []
        }
    };
}

// ============================================
// CREATE CALLOUT SEMANTIC BLOCK
// ============================================

function createCalloutSemanticBlock(
    row = {}
) {

    let metadata = {};

    try {

        metadata = JSON.parse(
            row.metadata || "{}"
        );

    } catch {

        metadata = {};
    }

    return {

        id:
            `${row.id}-callout`,

        type:
            "callout",

        title:
            metadata.title || "",

        metadata: {

            source:
                "spreadsheet",

            blockType:
                "callout",

            variant:
                metadata.variant || "tip"
        },

        resources: [

            {

                type:
                    metadata.variant || "tip",

                value:
                    row.content || ""
            }
        ]
    };
}

// ============================================
// CREATE PRACTICE SEMANTIC BLOCK
// ============================================

function createPracticeSemanticBlock(
    row = {}
) {

    return {

        id:
            `${row.id}-practice`,

        type:
            "practice",

        title:
            row.title || "",

        metadata: {

            source:
                "spreadsheet",

            blockType:
                "practice"
        },

        activities:

            String(
                row.content || ""
            )

                .split(";")

                .map(
                    item =>
                        item.trim()
                )

                .filter(Boolean)
    };
}

// ============================================
// CREATE QUIZ SEMANTIC BLOCK
// ============================================

function createQuizSemanticBlock(
    row = {}
) {

    let metadata = {};

    try {

        metadata = JSON.parse(
            row.metadata || "{}"
        );

    } catch {

        metadata = {};
    }

    return {

        id:
            `${row.id}-quiz`,

        type:
            "quiz",

        title:
            row.title || "",

        metadata: {

            source:
                "spreadsheet",

            blockType:
                "quiz"
        },

        assessment: {

            questions: [

                {

                    question:
                        metadata.question || row.content,

                    answers:
                        metadata.answers || [],

                    correctAnswer:
                        metadata.correctAnswer || 0
                }
            ],

            checkpoints: []
        }
    };
}

// ============================================
// CREATE CHECKPOINT SEMANTIC BLOCK
// ============================================

function createCheckpointSemanticBlock(
    row = {}
) {

    return {

        id:
            `${row.id}-checkpoint`,

        type:
            "checkpoint",

        title:
            row.content || row.title || "",

        metadata: {

            source:
                "spreadsheet",

            blockType:
                "checkpoint"
        },

        assessment: {

            questions: [],

            checkpoints: [

                {

                    content:
                        row.content || ""
                }
            ]
        }
    };
}

// ============================================
// CREATE TIP BLOCK
// ============================================

function createTipBlock(

    row = {}

) {

    return {

        id:
            `${row.id}-tip`,

        type:
            "callout",

        variant:
            "tip",

        title:
            "Mẹo thực hành",

        content:

            row.tip ||

            "Hãy luyện tập thường xuyên để tăng kỹ năng.",

        required:
            false
    };
}

// ============================================
// CREATE QUIZ BLOCK
// ============================================

function createQuizBlock(row = {}) {

    const question =

        row.quizQuestion
        || "Bạn đã hiểu nội dung bài học chưa?";

    return {

        id: `${row.id}-quiz`,

        type: "quiz",

        title: "Kiểm tra kiến thức",

        question,

        answers: [

            row.quizAnswerA || "Có",
            row.quizAnswerB || "Chưa"

        ],

        correctAnswer: 0,

        content: question

    };
}

// ============================================
// CREATE SUMMARY BLOCK
// ============================================

function createSummaryBlock(

    row = {}

) {

    return {

        id:
            `${row.id}-summary`,

        type:
            "summary",

        title:
            "Tổng kết bài học",

        content:

            row.summary ||

            row.content ||

            "Bạn đã hoàn thành bài học.",

        required:
            true
    };
}

// ============================================
// CREATE FLOW
// ============================================

function createLessonFlow() {

    return [

        "intro",
        "learning",
        "practice",
        "summary"
    ];
}

// ============================================
// CREATE LESSON
// ============================================

function createLesson(

    lessonRows = []

) {

    console.log(
        "CREATE LESSON",
        lessonRows[0]?.id,
        lessonRows.length
    );

    const first =

        lessonRows[0] || {};

    const lessonId =

        normalizeId(
            first.id
        );

    const courseId =

        normalizeId(
            first.courseId
        );

    // ========================================
    // BLOCKS
    // ========================================

    function createSemanticBlock(
        row = {}
    ) {

        switch (row.blockType) {

            case "video":
                return createVideoSemanticBlock(row);

            case "text":
                return createTextSemanticBlock(row);

            case "workflow":
                return createWorkflowSemanticBlock(row);

            case "callout":
                return createCalloutSemanticBlock(row);

            case "practice":
                return createPracticeSemanticBlock(row);

            case "quiz":
                return createQuizSemanticBlock(row);

            case "checkpoint":
                return createCheckpointSemanticBlock(row);
            
            default:
                return null;
        }
    }

    const blocks = lessonRows

        .map(
            createSemanticBlock
        )

        .filter(Boolean);

    console.log(
        "BLOCKS CREATED",
        blocks
    );  

    
    // ========================================
    // LESSON
    // ========================================

    return {

        // ====================================
        // CORE
        // ====================================

        id:
            lessonId,

        lessonId:
            lessonId,

        courseId:
            courseId,

        // ====================================
        // CONTENT
        // ====================================

        title:

            first.title ||

            "Untitled Lesson",

        description:

            first.description ||

            "Runtime semantic lesson",

        summary:
            first.description ||

            "Runtime summary",

        // ====================================
        // LEARNING
        // ====================================

        difficulty:

            first.difficulty ||

            "beginner",

        duration:

            first.duration ||

            "10 phút",

        status:
            "runtime",

        flow:
            createLessonFlow(),

        // ====================================
        // RUNTIME
        // ====================================

        blocks,       

        // ====================================
        // VIDEO
        // ====================================

        media: blocks

            .filter(
                block =>
                    block.type === "video"
            )

            .flatMap(
                block =>
                    block.media || []
            ),

        // ====================================
        // GOVERNANCE
        // ====================================

        runtimeImported:
            true,

        semanticVersion:
            "phase-h-canonical-transformer"
    };
}

// ============================================
// TRANSFORM LESSONS
// ============================================

export function transformSpreadsheetLessons(

    rows = []

) {

    console.log(
        "MOS360 V2 ACTIVE",
        rows.length
    );

    if (

        !Array.isArray(rows)

        ||

        rows.length === 0

    ) {

        return [];
    }

    // ========================================
    // GROUP LESSON ROWS
    // ========================================

    const lessonGroups = {};

    rows.forEach(

        row => {

            const lessonId =

                normalizeId(
                    row.id
                );

            if (!lessonId) {

                return;
            }

            if (

                !lessonGroups[lessonId]

            ) {

                lessonGroups[lessonId] = [];
            }

            lessonGroups[lessonId]

                .push(row);
        }
    );

    // ========================================
    // CREATE LESSONS
    // ========================================

    return Object.values(

        lessonGroups

    ).map(

        createLesson
    );
}