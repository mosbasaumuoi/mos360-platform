// ============================================
// MOS360 PRODUCTION OBSERVABILITY ENGINE
// Production ecosystem observability runtime
// ============================================

// ============================================
// LOG LEVELS
// ============================================

export const LOG_LEVELS = {

    INFO:
        "info",

    WARN:
        "warn",

    ERROR:
        "error"
};

// ============================================
// CREATE LOG ENTRY
// ============================================

export function createLogEntry({

    level = LOG_LEVELS.INFO,
    source = "runtime",
    message = "",
    payload = null

} = {}) {

    return {

        id:

            `log_${Date.now()}`,

        level,

        source,

        message,

        payload,

        createdAt:
            Date.now()
    };
}

// ============================================
// LOG EVENT
// ============================================

export function logRuntimeEvent({

    source = "runtime",
    message = "",
    payload = null

}) {

    const entry =

        createLogEntry({

            level:
                LOG_LEVELS.INFO,

            source,

            message,

            payload
        });

    console.log(

        `[MOS360:${source}]`,

        entry
    );

    return entry;
}

// ============================================
// LOG WARNING
// ============================================

export function logRuntimeWarning({

    source = "runtime",
    message = "",
    payload = null

}) {

    const entry =

        createLogEntry({

            level:
                LOG_LEVELS.WARN,

            source,

            message,

            payload
        });

    console.warn(

        `[MOS360:${source}:WARN]`,

        entry
    );

    return entry;
}

// ============================================
// LOG ERROR
// ============================================

export function logRuntimeError({

    source = "runtime",
    message = "",
    payload = null

}) {

    const entry =

        createLogEntry({

            level:
                LOG_LEVELS.ERROR,

            source,

            message,

            payload
        });

    console.error(

        `[MOS360:${source}:ERROR]`,

        entry
    );

    return entry;
}

// ============================================
// GENERATE HEALTH REPORT
// ============================================

export function generateProductionHealthReport({

    runtimeHealthy = true,
    governanceHealthy = true,
    ecosystemHealthy = true

} = {}) {

    return {

        runtimeHealthy,

        governanceHealthy,

        ecosystemHealthy,

        overallHealthy:

            runtimeHealthy
            &&
            governanceHealthy
            &&
            ecosystemHealthy,

        generatedAt:
            Date.now()
    };
}

// ============================================
// GENERATE OBSERVABILITY REPORT
// ============================================

export function generateObservabilityReport({

    logs = [],
    health = {}

}) {

    return {

        totalLogs:
            logs.length,

        errors:

            logs.filter(

                log =>

                    log.level ===
                    LOG_LEVELS.ERROR
            ).length,

        warnings:

            logs.filter(

                log =>

                    log.level ===
                    LOG_LEVELS.WARN
            ).length,

        health,

        generatedAt:
            Date.now()
    };
}