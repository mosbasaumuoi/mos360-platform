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

    const blocks = [];

    // ========================================
    // VIDEO
    // ========================================

    if (first.videoUrl) {

        blocks.push(

            createVideoBlock(
                first
            )
        );
    }

    // ========================================
    // TEXT
    // ========================================

    blocks.push(

        createTextBlock(
            first
        )
    );

    // ========================================
    // TIP
    // ========================================

    blocks.push(

        createTipBlock(
            first
        )
    );

    // ========================================
    // QUIZ
    // ========================================

    blocks.push(

        createQuizBlock(
            first
        )
    );

    // ========================================
    // SUMMARY
    // ========================================

    blocks.push(

        createSummaryBlock(
            first
        )
    );

    // ========================================
    // QUIZ
    // ========================================

    const quiz = [

        {

            id:
                `${lessonId}-quiz`,

            question:

                first.quizQuestion ||

                "Bạn đã hiểu bài học chưa?",

            answers: [

                first.quizAnswerA || "Có",
                first.quizAnswerB || "Chưa"

            ],

            correctAnswer:
                0
        }
    ];

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

            first.summary ||

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

        quiz,

        // ====================================
        // VIDEO
        // ====================================

        videoUrl:
            extractYoutubeEmbedUrl(
                first.videoUrl
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