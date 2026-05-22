// ============================================
// MOS360 RUNTIME INTEGRITY ENGINE
// Enterprise-grade semantic runtime governance
// ============================================

import {

    validateAILesson

}
    from "./aiSafetyEngine.js";

import {

    generateContentReport

}
    from "./contentGovernance.js";

// ============================================
// VALIDATE RUNTIME LESSON
// ============================================

export function validateRuntimeLesson(

    lesson = {}

) {

    const report = {

        valid: true,

        issues: [],

        warnings: []
    };

    // ========================================
    // AI SAFETY
    // ========================================

    const aiValidation =

        validateAILesson(
            lesson
        );

    if (!aiValidation.valid) {

        report.valid = false;

        report.issues.push(

            ...aiValidation.issues
        );
    }

    // ========================================
    // EMPTY BLOCKS
    // ========================================

    if (

        !lesson.blocks
        ||

        !lesson.blocks.length

    ) {

        report.valid = false;

        report.issues.push(
            "empty_runtime_blocks"
        );
    }

    // ========================================
    // VIDEO CHECK
    // ========================================

    const hasVideo =

        lesson.blocks?.some(

            block =>

                block.type ===
                "video"
        );

    if (!hasVideo) {

        report.warnings.push(
            "missing_video_block"
        );
    }

    // ========================================
    // WORKFLOW CHECK
    // ========================================

    const hasWorkflow =

        lesson.blocks?.some(

            block =>

                block.type ===
                "workflow"
        );

    if (!hasWorkflow) {

        report.warnings.push(
            "missing_workflow_block"
        );
    }

    return report;
}

// ============================================
// GENERATE RUNTIME REPORT
// ============================================

export function generateRuntimeReport(

    lesson = {}

) {

    const integrity =

        validateRuntimeLesson(
            lesson
        );

    const contentReport =

        generateContentReport(

            lesson.blocks || []
        );

    return {

        lessonId:
            lesson.id ||

            "unknown",

        valid:
            integrity.valid,

        issues:
            integrity.issues,

        warnings:
            integrity.warnings,

        content:
            contentReport
    };
}

// ============================================
// CHECK RUNTIME HEALTH
// ============================================

export function checkRuntimeHealth(

    lessons = []

) {

    const report = {

        totalLessons:
            lessons.length,

        validLessons: 0,

        invalidLessons: 0,

        warnings: 0
    };

    lessons.forEach(lesson => {

        const runtimeReport =

            generateRuntimeReport(
                lesson
            );

        if (runtimeReport.valid) {

            report.validLessons++;

        } else {

            report.invalidLessons++;
        }

        report.warnings +=

            runtimeReport.warnings
                ?.length || 0;
    });

    return report;
}