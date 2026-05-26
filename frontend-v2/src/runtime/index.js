/**
 * MOS360
 * Canonical Runtime Exports
 *
 * THIS IS:
 * - official runtime ownership map
 * - canonical runtime surface
 *
 * IMPORTANT:
 * Legacy runtimes are deprecated.
 */

// ============================================
// PROGRESSION
// ============================================

export {

    buildProgressionIntelligenceRuntime

}

    from "./progression/progressionIntelligenceRuntime";

// ============================================
// MASTERY
// ============================================

export {

    buildMasteryIntelligenceRuntime

}

    from "./progression/masteryIntelligenceRuntime";

// ============================================
// SEMANTIC
// ============================================

export {

    buildSemanticIntelligenceRuntime

}

    from "./semantic/semanticIntelligenceRuntime";

// ============================================
// CORE RUNTIME
// ============================================

export {

    buildCinematicRuntime

}

    from "./composer/cinematicRuntimeEngine";

export {

    buildRuntimeSurface

}

    from "./system/runtimeSurfaceEngine";

export {

    buildSemanticSurface

}

    from "./semantic/semanticSurfaceEngine";

export {

    buildLearningFlow

}

    from "./learning/learningFlowRuntimeEngine";

export {

    buildAdaptiveProgressionRuntime

}

    from "./progression/adaptiveProgressionRuntime";

export {

    buildProgressionGuidance

}

    from "./progression/progressionGuidanceService";

export {

    buildRuntimeSessionContinuity

}

    from "./system/runtimeSessionContinuityEngine";