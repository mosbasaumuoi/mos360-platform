/**
 * MOS360
 * Cinematic Runtime Engine
 *
 * RESPONSIBILITY:
 * - cinematic orchestration
 * - focus orchestration
 * - pacing orchestration
 * - continuity orchestration
 * - fatigue orchestration
 * - cognitive orchestration
 *
 * THIS IS:
 * - unified cinematic runtime pipeline
 * - progression-first runtime layer
 * - immersive learning orchestration
 *
 * MUST NOT:
 * - mutate persisted lessons
 * - inject dashboard noise
 * - fragment runtime continuity
 */

// ============================================
// BUILD CINEMATIC RUNTIME
// ============================================

export function buildCinematicRuntime({

    blocks = [],

    activeIndex = 0

}) {

    let accumulatedLoad = 0;

    return blocks.map(

        (block, index) => {

            // ============================
            // FOCUS STATE
            // ============================

            const focusState =
                buildFocusState({

                    index,

                    activeIndex
                });

            // ============================
            // PACING STATE
            // ============================

            const pacingState =
                buildPacingState({

                    block,

                    index
                });

            // ============================
            // VISUAL DENSITY
            // ============================

            const visualDensity =
                buildVisualDensity({

                    block,

                    index
                });

            // ============================
            // FATIGUE STATE
            // ============================

            const fatigueState =
                buildFatigueState({

                    block,

                    index
                });

            // ============================
            // CONTINUITY MODE
            // ============================

            const continuityMode =
                buildContinuityMode({

                    block,

                    index,

                    total:
                        blocks.length
                });

            // ============================
            // COGNITIVE LOAD
            // ============================

            const cognitiveState =
                buildCognitiveState({

                    block,

                    accumulatedLoad
                });

            accumulatedLoad +=
                cognitiveState.loadValue;

            return {

                ...block,

                // ========================
                // RUNTIME STATES
                // ========================

                focusState,

                pacingState,

                visualDensity,

                fatigueState,

                continuityMode,

                cognitiveLoad:
                    cognitiveState.level,

                cognitiveLoadValue:
                    cognitiveState.loadValue
            };
        }
    );
}

// ============================================
// FOCUS STATE
// ============================================

function buildFocusState({

    index,

    activeIndex

}) {

    if (index === activeIndex) {

        return "active";
    }

    if (

        Math.abs(
            index - activeIndex
        ) <= 1

    ) {

        return "near";
    }

    return "dimmed";
}

// ============================================
// PACING STATE
// ============================================

function buildPacingState({

    block,

    index

}) {

    if (

        block.type ===
        "checkpoint"

        ||

        block.type ===
        "reinforcement"

    ) {

        return "breathing";
    }

    if (
        block.priority ===
        "primary"
    ) {

        return "intense";
    }

    if (
        block.priority ===
        "support"
    ) {

        return "light";
    }

    return (
        index % 2 === 0
            ? "balanced"
            : "light"
    );
}

// ============================================
// VISUAL DENSITY
// ============================================

function buildVisualDensity({

    block,

    index

}) {

    if (
        block.priority ===
        "primary"
    ) {

        return "focused";
    }

    if (

        block.type ===
        "checkpoint"

        ||

        block.type ===
        "reinforcement"

        ||

        block.type ===
        "continuity"
    ) {

        return "breathing";
    }

    if (
        block.priority ===
        "support"
    ) {

        return "light";
    }

    return (
        index % 2 === 0
            ? "balanced"
            : "light"
    );
}

// ============================================
// FATIGUE STATE
// ============================================

function buildFatigueState({

    block,

    index

}) {

    if (

        block.type ===
        "checkpoint"

        ||

        block.type ===
        "reinforcement"

        ||

        block.type ===
        "continuity"
    ) {

        return "recovery";
    }

    if (
        block.priority ===
        "primary"
    ) {

        return (
            index >= 3
                ? "softened"
                : "intense"
        );
    }

    return "light";
}

// ============================================
// CONTINUITY MODE
// ============================================

function buildContinuityMode({

    block,

    index,

    total

}) {

    if (index === 0) {

        return "entry";
    }

    if (
        index === total - 1
    ) {

        return "resolution";
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

    if (
        block.priority ===
        "primary"
    ) {

        return "immersive";
    }

    return "balanced";
}

// ============================================
// COGNITIVE LOAD
// ============================================

function buildCognitiveState({

    block,

    accumulatedLoad

}) {

    if (

        block.type ===
        "checkpoint"

        ||

        block.type ===
        "reinforcement"

        ||

        block.type ===
        "continuity"
    ) {

        return {

            level:
                "recovery",

            loadValue: -2
        };
    }

    if (
        block.priority ===
        "primary"
    ) {

        return {

            level:

                accumulatedLoad >= 6
                    ? "softened"
                    : "high",

            loadValue: 3
        };
    }

    return {

        level:
            "light",

        loadValue: 1
    };
}