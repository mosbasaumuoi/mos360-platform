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

        return `https://www.youtube.com/embed/${watchMatch[1]}`;
    }

    // ========================================
    // SHORT URL
    // ========================================

    const shortMatch =

        url.match(

            /youtu\.be\/([^?]+)/

        );

    if (shortMatch) {

        return `https://www.youtube.com/embed/${shortMatch[1]}`;
    }

    return url;
}

// ============================================
// CREATE BLOCK
// ============================================

function createBlock(

    row

) {

    const type =

        row.blockType;

    const content =

        row.content || "";

    // ========================================
    // VIDEO
    // ========================================

    if (type === "video") {

        return {

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
        };
    }

    // ========================================
    // WORKFLOW
    // ========================================

    if (type === "workflow") {

        return {

            type:
                "workflow",

            priority:
                row.priority || "primary",

            steps:

                String(content)

                    .split(";")

                    .map(
                        step => step.trim()
                    )

                    .filter(Boolean)
        };
    }

    // ========================================
    // CALLOUT
    // ========================================

    if (type === "callout") {

        return {

            type:
                "callout",

            variant:
                "tip",

            priority:
                row.priority || "secondary",

            title:
                "Mẹo thực hành",

            content
        };
    }

    // ========================================
    // PRACTICE
    // ========================================

    if (type === "practice") {

        return {

            type:
                "practice",

            priority:
                row.priority || "primary",

            title:
                "Bài tập thực hành",

            tasks:

                String(content)

                    .split(";")

                    .map(
                        item => item.trim()
                    )

                    .filter(Boolean)
        };
    }

    // ========================================
    // CHECKPOINT
    // ========================================

    if (type === "checkpoint") {

        return {

            type:
                "checkpoint",

            priority:
                row.priority || "secondary",

            title:
                "Learning Checkpoint",

            content
        };
    }

    // ========================================
    // DEFAULT TEXT
    // ========================================

    return {

        type:
            "text",

        priority:
            row.priority || "primary",

        content
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

            return {

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
                    1,

                blocks:

                    lessonRows

                        .sort(

                            (a, b) =>

                                Number(a.order || 0)
                                -
                                Number(b.order || 0)
                        )

                        .map(
                            createBlock
                        ),

                quiz: []
            };
        });
}