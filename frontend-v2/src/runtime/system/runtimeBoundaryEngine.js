// ============================================
// MOS360 RUNTIME BOUNDARY ENGINE
// Production-grade runtime stabilization
// ============================================

// ============================================
// SAFE EXECUTION
// ============================================

export async function safeRuntimeExecution({

    label = "runtime_task",
    task

}) {

    try {

        const result =

            await task();

        return {

            success:
                true,

            label,

            result
        };

    } catch (error) {

        console.error(

            `[MOS360:RUNTIME_ERROR:${label}]`,

            error
        );

        return {

            success:
                false,

            label,

            error:
                error?.message ||

                "runtime_failure"
        };
    }
}

// ============================================
// SAFE SYNC EXECUTION
// ============================================

export function safeSyncExecution({

    label = "runtime_sync_task",
    task

}) {

    try {

        const result =
            task();

        return {

            success:
                true,

            label,

            result
        };

    } catch (error) {

        console.error(

            `[MOS360:RUNTIME_SYNC_ERROR:${label}]`,

            error
        );

        return {

            success:
                false,

            label,

            error:
                error?.message ||

                "runtime_sync_failure"
        };
    }
}

// ============================================
// CREATE RUNTIME BOUNDARY
// ============================================

export function createRuntimeBoundary({

    name = "default_boundary",

    fallback = null

} = {}) {

    return {

        name,

        fallback,

        createdAt:
            Date.now()
    };
}

// ============================================
// EXECUTE WITH BOUNDARY
// ============================================

export async function executeWithBoundary({

    boundary = {},
    task

}) {

    const execution =

        await safeRuntimeExecution({

            label:
                boundary.name,

            task
        });

    // ========================================
    // FALLBACK
    // ========================================

    if (!execution.success) {

        return {

            ...execution,

            fallback:
                boundary.fallback
        };
    }

    return execution;
}

// ============================================
// GENERATE BOUNDARY REPORT
// ============================================

export function generateBoundaryReport({

    boundary = {},
    execution = {}

}) {

    return {

        boundary:
            boundary.name,

        success:
            execution.success,

        hasFallback:

            boundary.fallback
            !==
            null,

        generatedAt:
            Date.now()
    };
}