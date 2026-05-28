import {

    createLessonFlowSummary

}

    from "./runtimeLessonFlowSummary";

import {

    validateRuntimeLesson

}

    from "../../validation/runtimeLessonValidation";

// ============================================
// CALCULATE STRUCTURE SCORE
// ============================================

function calculateStructureScore(

    lesson = {}

) {

    let score = 0;

    // ========================================
    // CORE IDENTITY
    // ========================================

    if (lesson.id) {
        score += 10;
    }

    if (lesson.title) {
        score += 10;
    }

    if (lesson.courseId) {
        score += 10;
    }

    // ========================================
    // BLOCKS
    // ========================================

    if (

        Array.isArray(
            lesson.blocks
        ) &&

        lesson.blocks.length > 0

    ) {

        score += 20;
    }

    // ========================================
    // STATUS
    // ========================================

    if (lesson.status) {
        score += 10;
    }

    // ========================================
    // SEMANTIC VERSION
    // ========================================

    if (lesson.semanticVersion) {
        score += 10;
    }

    // ========================================
    // OPTIONAL QUALITY
    // ========================================

    if (lesson.description) {
        score += 5;
    }

    if (lesson.duration) {
        score += 5;
    }

    if (lesson.difficulty) {
        score += 5;
    }

    if (lesson.xpReward) {
        score += 5;
    }

    if (lesson.quiz) {
        score += 10;
    }

    return Math.min(score, 100);
}

// ============================================
// CALCULATE FLOW SCORE
// ============================================

function calculateFlowScore(

    flowSummary = {},
    lesson = {}

) {

    // ========================================
    // SEMANTIC RUNTIME MODE
    // ========================================

    if (

        lesson?.runtimeBridge
        ||
        lesson?.runtimeImported

    ) {

        const blocks =

            Array.isArray(
                lesson.blocks
            )

                ? lesson.blocks

                : [];

        if (blocks.length === 0) {
            return 0;
        }

        let score = 0;

        blocks.forEach((block) => {

            if (block.lessonFlow) {
                score += 10;
            }

            if (block.semanticSurface) {
                score += 10;
            }

            if (block.semanticWeight) {
                score += 5;
            }

            if (block.engagement) {
                score += 5;
            }
        });

        const maxScore =

            blocks.length * 30;

        return Math.min(

            Math.round(
                (score / maxScore) * 100
            ),

            100
        );
    }

    // ========================================
    // STATIC FLOW MODE
    // ========================================

    const distribution =

        flowSummary.analysis
            ?.flowDistribution || {};

    let score = 0;

    if (distribution.intro) {
        score += 20;
    }

    if (distribution.learning) {
        score += 30;
    }

    if (distribution.practice) {
        score += 20;
    }

    if (distribution.checkpoint) {
        score += 15;
    }

    if (distribution.reflection) {
        score += 15;
    }

    return Math.min(score, 100);
}

// ============================================
// CALCULATE BLOCK QUALITY SCORE
// ============================================

function calculateBlockQualityScore(

    lesson = {}

) {

    const blocks =

        Array.isArray(
            lesson.blocks
        )

            ? lesson.blocks

            : [];

    if (blocks.length === 0) {
        return 0;
    }

    let score = 0;

    blocks.forEach((block) => {

        // ====================================
        // CORE
        // ====================================

        if (block.type) {
            score += 5;
        }

        if (block.lessonFlow) {
            score += 5;
        }

        if (block.semanticSurface) {
            score += 5;
        }

        if (block.title) {
            score += 5;
        }

        if (block.content) {
            score += 5;
        }

        // ====================================
        // CINEMATIC
        // ====================================

        if (block.focusState) {
            score += 2;
        }

        if (block.flowTransition) {
            score += 2;
        }

        if (block.adaptiveState) {
            score += 1;
        }
    });

    const maxPerBlock = 30;

    const maxScore =

        blocks.length * maxPerBlock;

    return Math.min(

        Math.round(
            (score / maxScore) * 100
        ),

        100
    );
}

// ============================================
// EVALUATE LESSON RUNTIME READINESS
// ============================================

export function evaluateLessonRuntimeReadiness(

    lesson = {}

) {

    // ========================================
    // VALIDATION
    // ========================================

    const validation =

        validateRuntimeLesson(
            lesson
        );

    // ========================================
    // FLOW
    // ========================================

    const flowSummary =

        createLessonFlowSummary(
            lesson
        );

    // ========================================
    // STRUCTURE
    // ========================================

    const structureScore =

        calculateStructureScore(
            lesson
        );

    // ========================================
    // FLOW SCORE
    // ========================================

    const flowScore =

        calculateFlowScore(
            flowSummary,
            lesson
        );

    // ========================================
    // BLOCK QUALITY
    // ========================================

    const blockQualityScore =

        calculateBlockQualityScore(
            lesson
        );

    // ========================================
    // FINAL SCORE
    // ========================================

    const progression =

        Math.round(

            (
                structureScore * 0.35 +

                flowScore * 0.35 +

                blockQualityScore * 0.30
            )
        );

    // ========================================
    // READY
    // ========================================

    const readyForRuntime =

        validation.valid &&

        progression >= 70;

    return {

        valid:
            validation.valid,

        readyForRuntime,

        progression,

        scores: {

            structure:
                structureScore,

            flow:
                flowScore,

            blockQuality:
                blockQualityScore
        },

        validationErrors:
            validation.errors,

        flow:
            flowSummary.analysis
    };
}