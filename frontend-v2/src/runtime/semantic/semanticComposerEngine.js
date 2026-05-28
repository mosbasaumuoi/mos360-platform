// ============================================
// MOS360 SEMANTIC COMPOSER ENGINE
// Hybrid semantic runtime overlay
// ============================================

import {

    buildSemanticSurface

}
    from "./semanticSurfaceEngine.js";

import {

    buildSemanticIntelligenceRuntime

}
    from "./semanticIntelligenceRuntime.js";

import {

    buildAdaptiveRuntime

}
    from "../system/adaptiveRuntimeEngine.js";

// ============================================
// MOVE BLOCK
// ============================================

export function moveBlock({

    lesson,
    fromIndex,
    toIndex

}) {

    const blocks =

        [...(lesson.blocks || [])];

    if (

        fromIndex < 0
        ||

        toIndex < 0
        ||

        fromIndex >= blocks.length
        ||

        toIndex >= blocks.length

    ) {

        return lesson;
    }

    const [movedBlock] =

        blocks.splice(
            fromIndex,
            1
        );

    blocks.splice(

        toIndex,
        0,
        movedBlock
    );

    return {

        ...lesson,

        blocks
    };
}

// ============================================
// REMOVE BLOCK
// ============================================

export function removeBlock({

    lesson,
    index

}) {

    const blocks =

        [...(lesson.blocks || [])];

    if (

        index < 0
        ||

        index >= blocks.length

    ) {

        return lesson;
    }

    blocks.splice(
        index,
        1
    );

    return {

        ...lesson,

        blocks
    };
}

// ============================================
// INSERT BLOCK
// ============================================

export function insertBlock({

    lesson,
    block,
    index

}) {

    const blocks =

        [...(lesson.blocks || [])];

    if (

        typeof index !==
        "number"

    ) {

        blocks.push(block);

        return {

            ...lesson,

            blocks
        };
    }

    blocks.splice(

        index,
        0,
        block
    );

    return {

        ...lesson,

        blocks
    };
}

// ============================================
// BUILD SEMANTIC COMPOSITION
// Hybrid runtime enrichment
// ============================================

export function buildSemanticComposition({

    lesson = {},

    telemetry = {}

}) {

    const originalBlocks =

        Array.isArray(
            lesson.blocks
        )

            ? lesson.blocks

            : [];

    // ========================================
    // ADAPTIVE OVERLAY
    // ========================================

    const adaptiveRuntime =

        buildAdaptiveRuntime({

            lessonId:
                lesson.id,

            blocks:
                originalBlocks
        });

    const adaptedBlocks =

        adaptiveRuntime
            ?.adaptedBlocks

            ||

            originalBlocks;

    // ========================================
    // SEMANTIC INTELLIGENCE OVERLAY
    // ========================================

    const semanticBlocks =

        buildSemanticIntelligenceRuntime({

            blocks:
                adaptedBlocks,

            telemetry
        });

    // ========================================
    // SEMANTIC SURFACE OVERLAY
    // ========================================

    const surfacedBlocks =

        buildSemanticSurface(
            semanticBlocks
        );

    // ========================================
    // RETURN HYBRID RUNTIME
    // ========================================

    return {

        lessonId:
            lesson.id,

        semanticAuthority:
            true,

        runtimeType:
            "hybrid-semantic-runtime",

        overlayMode:
            true,

        adaptiveRuntime,

        semanticBlocks:
            semanticBlocks.length,

        previewBlocks:
            surfacedBlocks,

        originalBlocks:
            originalBlocks.length,

        surfacedBlocks:
            surfacedBlocks.length,

        observability: {

            reinforcementState:

                adaptiveRuntime
                    ?.reinforcementPlan
                    ?.reinforcementState

                    ||

                    "stable",

            continuityRisk:

                adaptiveRuntime
                    ?.reinforcementPlan
                    ?.continuityRisk

                    ||

                    "low",

            runtimeHealth:

                adaptiveRuntime
                    ?.signals
                    ?.runtimeHealth

                    ||

                    "healthy"
        }
    };
}

// ============================================
// PREVIEW COMPOSITION
// ============================================

export function previewComposition(

    lesson = {},

    telemetry = {}

) {

    return buildSemanticComposition({

        lesson,

        telemetry
    });
}

// ============================================
// GENERATE COMPOSER REPORT
// ============================================

export function generateComposerReport(

    lesson = {},

    telemetry = {}

) {

    const preview =

        previewComposition({

            lesson,

            telemetry
        });

    return {

        lessonId:
            lesson.id,

        runtimeType:
            "hybrid-semantic-runtime",

        overlayMode:
            true,

        totalBlocks:
            lesson.blocks
                ?.length || 0,

        semanticBlocks:
            preview.semanticBlocks || 0,

        previewBlocks:
            preview.previewBlocks
                ?.length || 0,

        adaptive:
            true,

        semantic:
            true,

        surfaced:
            true
    };
}
