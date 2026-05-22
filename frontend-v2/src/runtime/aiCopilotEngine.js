// ============================================
// MOS360 AI COPILOT ENGINE
// Adaptive semantic AI copilot runtime
// ============================================

import {

    BLOCK_REGISTRY

}
    from "./contentRegistry.js";

// ============================================
// MAX SUGGESTIONS
// ============================================

const MAX_SUGGESTIONS = 3;

// ============================================
// GENERATE WORKFLOW SUGGESTIONS
// ============================================

export function generateWorkflowSuggestions({

    lesson = {}

}) {

    const suggestions = [];

    // ========================================
    // MISSING WORKFLOW
    // ========================================

    const hasWorkflow =

        lesson.blocks?.some(

            block =>

                block.type ===
                "workflow"
        );

    if (!hasWorkflow) {

        suggestions.push({

            type:
                "workflow",

            title:
                "Thêm workflow thực hành",

            message:
                "Lesson nên có workflow rõ ràng để tăng tính thực hành và continuity."
        });
    }

    return suggestions;
}

// ============================================
// GENERATE PRACTICE SUGGESTIONS
// ============================================

export function generatePracticeSuggestions({

    lesson = {}

}) {

    const suggestions = [];

    // ========================================
    // MISSING PRACTICE
    // ========================================

    const hasPractice =

        lesson.blocks?.some(

            block =>

                block.type ===
                "practice"
        );

    if (!hasPractice) {

        suggestions.push({

            type:
                "practice",

            title:
                "Thêm block thực hành",

            message:
                "Lesson nên có phần áp dụng thực tế để tăng retention."
        });
    }

    return suggestions;
}

// ============================================
// GENERATE CONTINUITY SUGGESTIONS
// ============================================

export function generateContinuitySuggestions({

    lesson = {}

}) {

    const suggestions = [];

    // ========================================
    // CHECKPOINT COUNT
    // ========================================

    const checkpoints =

        lesson.blocks?.filter(

            block =>

                block.type ===
                "checkpoint"
        ) || [];

    if (!checkpoints.length) {

        suggestions.push({

            type:
                "checkpoint",

            title:
                "Thêm continuity reinforcement",

            message:
                "Checkpoint giúp lesson có completion feel và continuity tốt hơn."
        });
    }

    return suggestions;
}

// ============================================
// GENERATE OVERLOAD WARNINGS
// ============================================

export function generateOverloadWarnings({

    lesson = {}

}) {

    const warnings = [];

    const totalBlocks =

        lesson.blocks?.length || 0;

    // ========================================
    // BLOCK OVERLOAD
    // ========================================

    if (totalBlocks > 10) {

        warnings.push({

            type:
                "overload",

            title:
                "Lesson có dấu hiệu overload",

            message:
                "Nên giảm bớt blocks reinforcement hoặc callouts để lesson nhẹ hơn."
        });
    }

    // ========================================
    // CALLOUT OVERLOAD
    // ========================================

    const callouts =

        lesson.blocks?.filter(

            block =>

                block.type ===
                "callout"
        ) || [];

    if (callouts.length > 3) {

        warnings.push({

            type:
                "callout_overload",

            title:
                "Quá nhiều callouts",

            message:
                "Nên giảm callouts để tránh visual fatigue."
        });
    }

    return warnings;
}

// ============================================
// GENERATE AI COPILOT REPORT
// ============================================

export function generateAICopilotReport({

    lesson = {}

}) {

    const workflowSuggestions =

        generateWorkflowSuggestions({
            lesson
        });

    const practiceSuggestions =

        generatePracticeSuggestions({
            lesson
        });

    const continuitySuggestions =

        generateContinuitySuggestions({
            lesson
        });

    const overloadWarnings =

        generateOverloadWarnings({
            lesson
        });

    const suggestions = [

        ...workflowSuggestions,

        ...practiceSuggestions,

        ...continuitySuggestions

    ]

        .slice(
            0,
            MAX_SUGGESTIONS
        );

    return {

        lessonId:
            lesson.id,

        suggestions,

        warnings:
            overloadWarnings,

        healthy:

            overloadWarnings.length === 0
    };
}

// ============================================
// GENERATE AI COPILOT SUMMARY
// ============================================

export function generateAICopilotSummary({

    lesson = {}

}) {

    const report =

        generateAICopilotReport({
            lesson
        });

    // ========================================
    // HEALTHY
    // ========================================

    if (

        report.healthy
        &&

        !report.suggestions.length

    ) {

        return {

            status:
                "healthy",

            message:
                "Lesson đang có semantic structure và pacing khá tốt."
        };
    }

    // ========================================
    // NEEDS IMPROVEMENT
    // ========================================

    return {

        status:
            "improve",

        message:
            "Lesson có thể cải thiện thêm workflow, continuity hoặc pacing."
    };
}