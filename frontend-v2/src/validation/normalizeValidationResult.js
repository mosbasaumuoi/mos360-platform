// ============================================
// MOS360 VALIDATION NORMALIZER
// Hybrid validation convergence
// ============================================

export function normalizeValidationResult(

    validation = {}

) {

    // ========================================
    // MODERN RUNTIME SHAPE
    // { ok, issues }
    // ========================================

    if (

        typeof validation.ok === "boolean"

    ) {

        return {

            valid:
                validation.ok,

            errors:
                validation.issues || []

        };

    }

    // ========================================
    // LEGACY SHAPE
    // { valid, errors }
    // ========================================

    if (

        typeof validation.valid === "boolean"

    ) {

        return {

            valid:
                validation.valid,

            errors:
                validation.errors || []

        };

    }

    // ========================================
    // UNKNOWN SHAPE
    // ========================================

    return {

        valid: false,

        errors: [

            "Unknown validation result shape"

        ]

    };

}