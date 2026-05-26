// ============================================
// LEARNING RUNTIME ENGINE
// Unified semantic learning orchestration
// ============================================

import {
    updateLearningContinuity,
    getContinuityMessage
}
    from "../../engines/learningContinuityEngine.js";

import {
    generateReinforcementMessage
}
    from "../../engines/reinforcementEngine.js";

import {
    getLearningMemorySummary
}
    from "../../engines/learningMemoryEngine.js";

import {
    buildAdaptiveBlocks
}
    from "../../engines/adaptiveBlockEngine.js";

// ============================================
// CREATE LEARNING RUNTIME
// ============================================

export function createLearningRuntime({

    lesson,

    progressPercent = 0,

    lessonCompleted = false

}) {

    // ========================================
    // CONTINUITY
    // ========================================

    const continuity =

        updateLearningContinuity();

    const continuityMessage =

        getContinuityMessage(
            continuity
        );

    // ========================================
    // REINFORCEMENT
    // ========================================

    const reinforcementMessage =

        generateReinforcementMessage();

    // ========================================
    // MEMORY
    // ========================================

    const learningMemorySummary =

        getLearningMemorySummary();

    // ========================================
    // ADAPTIVE BLOCKS
    // ========================================

    const adaptiveBlocks =

        buildAdaptiveBlocks();

    // ========================================
    // RUNTIME CONTEXT
    // ========================================

    return {

        continuity,

        continuityMessage,

        reinforcementMessage,

        learningMemorySummary,

        adaptiveBlocks,

        context: {

            lesson,

            progressPercent,

            lessonCompleted
        }
    };
}