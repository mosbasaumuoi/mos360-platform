// ============================================
// SPREADSHEET LESSON TRANSFORMER
// Spreadsheet -> semantic block runtime
// ============================================

import {

    SPREADSHEET_LESSON_SCHEMA

}

from "./spreadsheetLessonSchema.js";

// ============================================
// YOUTUBE NORMALIZER
// ============================================

function normalizeYoutubeUrl(

    url = ""

) {

    if (!url) {
        return "";
    }

    // ========================================
    // ALREADY EMBED
    // ========================================

    if (

        url.includes(
            "/embed/"
        )

    ) {

        return url;
    }

    // ========================================
    // WATCH URL
    // ========================================

    const watchMatch =

        url.match(

            /v=([^&]+)/

        );

    if (watchMatch) {

        return `https://www.youtube.com/embed/${watchMatch[1]}?rel=0&playsinline=1`;
    }

    // ========================================
    // SHORT URL
    // ========================================

    const shortMatch =

        url.match(

            /youtu\.be\/([^?]+)/

        );
        
    if (shortMatch) {

        return `https://www.youtube.com/embed/${shortMatch[1]}?rel=0&playsinline=1`;
    }

    return url;
}

// ============================================
// CREATE SEMANTIC ENTRY
// ============================================

function createSemanticEntry(row) {

    const type =
        row.blockType;

    const content =
        row.content || "";

    // ========================================
    // VIDEO
    // ========================================

    if (type === "video") {

        return {

            entity: "block",

            data: {

                type:
                    "video",

                priority:
                    row.priority || "critical",

                title:
                    row.title || "Lesson Video",

                videoUrl:
                    normalizeYoutubeUrl(
                        content
                    )
            }
        };
    }

    // ========================================
    // WORKFLOW
    // ========================================

    if (type === "workflow") {

        return {

            entity: "block",

            data: {

                type:
                    "workflow",

                priority:
                    row.priority || "primary",

                title:
                    "Workflow",

                steps:

                    String(content)

                        .split(";")

                        .map(
                            step =>
                                step.trim()
                        )

                        .filter(Boolean)
            }
        };
    }

    // ========================================
    // CALLOUT
    // ========================================

    if (type === "callout") {

        let metadata = {};

        try {

            metadata =

                typeof row.metadata === "string"

                    ? JSON.parse(
                        row.metadata
                    )

                    : row.metadata || {};

        } catch { }

        return {

            entity: "block",

            data: {

                type:
                    "callout",

                variant:
                    metadata.variant || "tip",

                priority:
                    row.priority || "secondary",

                title:
                    metadata.title ||
                    "Mẹo thực hành",

                content
            }
        };
    }

    // ========================================
    // PRACTICE
    // ========================================

    if (type === "practice") {

        let metadata = {};

        try {

            metadata =

                typeof row.metadata === "string"

                    ? JSON.parse(
                        row.metadata
                    )

                    : row.metadata || {};

        } catch { }

        return {

            entity: "practice",

            data: {

                title:
                    metadata.title ||
                    "Bài tập thực hành",

                tasks:

                    String(content)

                        .split(";")

                        .map(
                            task =>
                                task.trim()
                        )

                        .filter(Boolean)
            }
        };
    }

    // ========================================
    // QUIZ
    // ========================================

    if (type === "quiz") {

        let metadata = {};

        try {

            metadata =

                typeof row.metadata === "string"

                    ? JSON.parse(
                        row.metadata
                    )

                    : row.metadata || {};

        } catch { }

        return {

            entity: "quiz",

            data: {

                question:
                    metadata.question || "",

                options:
                    metadata.options || [],

                correctAnswer:
                    metadata.correct || 0
            }
        };
    }

    // ========================================
    // CHECKPOINT
    // ========================================

    if (type === "checkpoint") {

        return {

            entity: "block",

            data: {

                type:
                    "checkpoint",

                priority:
                    row.priority || "reinforcement",

                title:
                    "Learning Checkpoint",

                content
            }
        };
    }

    // ========================================
    // DEFAULT TEXT
    // ========================================

    return {

        entity: "block",

        data: {

            type:
                "text",

            priority:
                row.priority || "primary",

            content
        }
    };
}

// ============================================
// GROUP LESSONS
// ============================================

function groupLessons(

    rows = []

) {

    const grouped = {};

    rows.forEach(row => {

        const lessonId =

            row.id;

        if (!grouped[lessonId]) {

            grouped[lessonId] = [];
        }

        grouped[lessonId].push(row);
    });

    return grouped;
}

// ============================================
// TRANSFORM SPREADSHEET LESSONS
// ============================================

export function transformSpreadsheetLessons(

    rows = []

) {

    const grouped =

        groupLessons(rows);

    return Object.values(grouped)

        .map(lessonRows => {

            const first =

                lessonRows[0];

            const lesson = {

                id:
                    first.id,

                courseId:
                    first.courseId,

                title:
                    first.title,

                description:
                    "Bài học thực hành Office",

                duration:
                    "15 phút",

                difficulty:
                    "beginner",

                version:
                    "phase-h-semantic-runtime",

                order:

                    Number(
                        first.lessonOrder || 1
                    ),

                blocks: [],

                quiz: [],

                practice: []
            };

            // ========================================
            // BUILD SEMANTIC STRUCTURE
            // ========================================

            lessonRows

                .sort(

                    (a, b) =>

                        Number(a.blockOrder || 0)
                        -
                        Number(b.blockOrder || 0)
                )

                .forEach((row) => {

                    const semantic =

                        createSemanticEntry(
                            row
                        );

                    if (!semantic) {
                        return;
                    }

                    // ====================================
                    // BLOCK
                    // ====================================

                    if (

                        semantic.entity === "block"

                    ) {

                        lesson.blocks.push(
                            semantic.data
                        );

                        return;
                    }

                    // ====================================
                    // QUIZ
                    // ====================================

                    if (

                        semantic.entity === "quiz"

                    ) {

                        lesson.quiz.push(
                            semantic.data
                        );

                        return;
                    }

                    // ====================================
                    // PRACTICE
                    // ====================================

                    if (

                        semantic.entity === "practice"

                    ) {

                        lesson.practice.push(
                            semantic.data
                        );
                    }
                });

            return lesson;
        });
}