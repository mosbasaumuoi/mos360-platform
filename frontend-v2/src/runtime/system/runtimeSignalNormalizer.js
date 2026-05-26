/**
 * MOS360
 * Runtime Signal Normalizer
 *
 * RESPONSIBILITY:
 * - canonical telemetry normalization
 * - runtime signal stabilization
 * - signal fallback consistency
 * - orchestration-safe runtime signals
 *
 * THIS IS:
 * - canonical runtime signal layer
 *
 * MUST NOT:
 * - mutate telemetry unpredictably
 * - create derived signal chaos
 */

// ============================================
// NORMALIZE RUNTIME SIGNALS
// ============================================

export function normalizeRuntimeSignals(

    telemetry = {}

) {

    const masteryConfidence =
        normalizeNumber(
            telemetry.masteryConfidence,
            0
        );

    const hesitationLevel =
        normalizeNumber(
            telemetry.hesitationLevel,
            0
        );

    const continuityLevel =
        normalizeNumber(
            telemetry.continuityLevel,
            5
        );

    const retryCount =
        normalizeNumber(
            telemetry.retryCount,
            0
        );

    const momentumLevel =
        normalizeNumber(
            telemetry.momentumLevel,
            5
        );

    const semanticMap =
        normalizeSemanticMap(
            telemetry.semanticMap
        );

    return {

        masteryConfidence,

        hesitationLevel,

        continuityLevel,

        retryCount,

        momentumLevel,

        semanticMap
    };
}

// ============================================
// NORMALIZE NUMBER
// ============================================

function normalizeNumber(

    value,

    fallback = 0

) {

    if (

        typeof value !== "number"

        ||

        Number.isNaN(value)
    ) {

        return fallback;
    }

    return value;
}

// ============================================
// NORMALIZE SEMANTIC MAP
// ============================================

function normalizeSemanticMap(

    semanticMap = {}

) {

    if (

        !semanticMap

        ||

        typeof semanticMap !==
        "object"
    ) {

        return {};
    }

    const normalized = {};

    Object.entries(
        semanticMap
    ).forEach(

        ([key, value]) => {

            normalized[key] =
                normalizeNumber(
                    value,
                    0.5
                );
        }
    );

    return normalized;
}   