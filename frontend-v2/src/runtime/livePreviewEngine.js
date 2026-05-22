// ============================================
// MOS360 LIVE PREVIEW ENGINE
// Studio-grade semantic runtime preview
// ============================================

import {

    governComposition,

    previewComposition

}
    from "./semanticComposerEngine.js";

import {

    generateRuntimeReport

}
    from "./runtimeIntegrityEngine.js";

// ============================================
// CREATE LIVE PREVIEW
// ============================================

export function createLivePreview({

    lesson = {}

}) {

    // ========================================
    // GOVERNANCE
    // ========================================

    const governed =

        governComposition(
            lesson
        );

    // ========================================
    // COMPOSITION
    // ========================================

    const preview =

        previewComposition(
            governed
        );

    // ========================================
    // RUNTIME REPORT
    // ========================================

    const runtimeReport =

        generateRuntimeReport(
            preview
        );

    return {

        lessonId:
            lesson.id,

        previewBlocks:

            preview.previewBlocks || [],

        runtimeReport,

        valid:
            runtimeReport.valid,

        generatedAt:
            Date.now()
    };
}

// ============================================
// UPDATE LIVE PREVIEW
// ============================================

export function updateLivePreview({

    preview = {},
    lesson = {}

}) {

    return {

        ...preview,

        ...createLivePreview({
            lesson
        }),

        updatedAt:
            Date.now()
    };
}

// ============================================
// PREVIEW HEALTH
// ============================================

export function getPreviewHealth({

    preview = {}

}) {

    if (!preview.valid) {

        return {

            status:
                "invalid",

            message:
                "Preview runtime có semantic issues cần xử lý."
        };
    }

    const blockCount =

        preview.previewBlocks
            ?.length || 0;

    // ========================================
    // OVERLOAD
    // ========================================

    if (blockCount > 10) {

        return {

            status:
                "heavy",

            message:
                "Lesson có dấu hiệu overload, nên giảm bớt reinforcement hoặc callouts."
        };
    }

    // ========================================
    // GOOD
    // ========================================

    return {

        status:
            "healthy",

        message:
            "Semantic preview runtime đang ổn định."
    };
}

// ============================================
// GENERATE PREVIEW REPORT
// ============================================

export function generatePreviewReport({

    preview = {}

}) {

    const health =

        getPreviewHealth({
            preview
        });

    return {

        lessonId:
            preview.lessonId,

        valid:
            preview.valid,

        previewBlocks:

            preview.previewBlocks
                ?.length || 0,

        health,

        runtimeWarnings:

            preview.runtimeReport
                ?.warnings || [],

        runtimeIssues:

            preview.runtimeReport
                ?.issues || []
    };
}