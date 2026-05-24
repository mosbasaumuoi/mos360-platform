/**
 * MOS360
 * Runtime Surface Engine
 *
 * RESPONSIBILITY:
 * - runtime surface orchestration
 * - visual hierarchy
 * - emotional weight balancing
 * - semantic visual identity
 * - cinematic rendering surfaces
 *
 * MUST NOT:
 * - flatten visual hierarchy
 * - overload UI noise
 * - fragment progression continuity
 */

// ============================================
// BUILD RUNTIME SURFACE
// ============================================

export function buildRuntimeSurface(
    blocks = []
) {

    return blocks.map(
        (block, index) => ({

            ...block,

            surface:
                buildSurface(block),

            surfaceTone:
                buildSurfaceTone(block),

            surfaceSpacing:
                buildSurfaceSpacing(block),

            surfaceDepth:
                buildSurfaceDepth(block),

            semanticWeight:
                buildSemanticWeight({

                    block,

                    index
                })
        })
    );
}

// ============================================
// SURFACE TYPE
// ============================================

function buildSurface(
    block
) {

    if (
        block.type ===
        "checkpoint"
    ) {

        return "checkpoint";
    }

    if (
        block.type ===
        "reinforcement"
    ) {

        return "reinforcement";
    }

    if (
        block.type ===
        "continuity"
    ) {

        return "continuity";
    }

    if (
        block.priority ===
        "primary"
    ) {

        return "primary";
    }

    return "default";
}

// ============================================
// SURFACE TONE
// ============================================

function buildSurfaceTone(
    block
) {

    if (
        block.type ===
        "checkpoint"
    ) {

        return "calm";
    }

    if (
        block.type ===
        "reinforcement"
    ) {

        return "soft";
    }

    if (
        block.priority ===
        "primary"
    ) {

        return "focused";
    }

    return "neutral";
}

// ============================================
// SURFACE SPACING
// ============================================

function buildSurfaceSpacing(
    block
) {

    if (
        block.priority ===
        "primary"
    ) {

        return "expanded";
    }

    if (

        block.type ===
        "checkpoint"

        ||

        block.type ===
        "continuity"
    ) {

        return "breathing";
    }

    return "normal";
}

// ============================================
// SURFACE DEPTH
// ============================================

function buildSurfaceDepth(
    block
) {

    if (
        block.priority ===
        "primary"
    ) {

        return "elevated";
    }

    if (
        block.type ===
        "reinforcement"
    ) {

        return "soft";
    }

    return "flat";
}

// ============================================
// SEMANTIC WEIGHT
// ============================================

function buildSemanticWeight({

    block,

    index

}) {

    if (
        block.priority ===
        "primary"
    ) {

        return "high";
    }

    if (

        block.type ===
        "checkpoint"

        ||

        block.type ===
        "continuity"
    ) {

        return "recovery";
    }

    return (
        index % 2 === 0
            ? "medium"
            : "light"
    );
}