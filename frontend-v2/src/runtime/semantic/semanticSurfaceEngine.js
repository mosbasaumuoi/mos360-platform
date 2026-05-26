/**
 * MOS360
 * Semantic Surface Engine
 *
 * RESPONSIBILITY:
 * - semantic-native rendering
 * - block identity orchestration
 * - learning surface personality
 * - progression-aware rendering
 *
 * MUST NOT:
 * - flatten semantic identity
 * - render generic LMS cards
 * - break continuity feeling
 */

// ============================================
// BUILD SEMANTIC SURFACE
// ============================================

export function buildSemanticSurface(
    blocks = []
) {

    return blocks.map(
        block => ({

            ...block,

            semanticSurface:

                buildSemanticSurfaceType(
                    block
                ),

            semanticAccent:

                buildSemanticAccent(
                    block
                ),

            semanticRhythm:

                buildSemanticRhythm(
                    block
                )
        })
    );
}

// ============================================
// SURFACE TYPE
// ============================================

function buildSemanticSurfaceType(
    block
) {

    switch (block.type) {

        case "video":

            return "immersive";

        case "checkpoint":

            return "reflection";

        case "reinforcement":

            return "support";

        case "continuity":

            return "recovery";

        case "quiz":

            return "challenge";

        case "practice":

            return "active";

        default:

            return "default";
    }
}

// ============================================
// SEMANTIC ACCENT
// ============================================

function buildSemanticAccent(
    block
) {

    switch (block.type) {

        case "video":

            return "focused";

        case "checkpoint":

            return "calm";

        case "reinforcement":

            return "soft";

        case "continuity":

            return "gentle";

        case "quiz":

            return "sharp";

        case "practice":

            return "energetic";

        default:

            return "neutral";
    }
}

// ============================================
// SEMANTIC RHYTHM
// ============================================

function buildSemanticRhythm(
    block
) {

    switch (block.type) {

        case "video":

            return "cinematic";

        case "checkpoint":

            return "breathing";

        case "reinforcement":

            return "light";

        case "continuity":

            return "recovery";

        case "quiz":

            return "focused";

        case "practice":

            return "active";

        default:

            return "balanced";
    }
}