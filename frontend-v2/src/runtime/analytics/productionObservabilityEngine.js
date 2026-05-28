// ============================================
// MOS360 PRODUCTION OBSERVABILITY ENGINE
// Canonical runtime observability authority
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
        "error",

    CRITICAL:
        "critical"
};

// ============================================
// OBSERVABILITY EVENT TYPES
// ============================================

export const OBSERVABILITY_EVENT_TYPES = {

    SESSION:
        "session",

    PROGRESSION:
        "progression",

    REINFORCEMENT:
        "reinforcement",

    CONTINUITY:
        "continuity",

    MUTATION:
        "mutation",

    GOVERNANCE:
        "governance",

    DIAGNOSTIC:
        "diagnostic"
};

// ============================================
// CREATE LOG ENTRY
// ============================================

export function createLogEntry({

    level = LOG_LEVELS.INFO,

    source = "runtime",

    message = "",

    payload = null,

    eventType =
        OBSERVABILITY_EVENT_TYPES.SESSION,

    metadata = {}

} = {}) {

    return {

        id:

            `log_${ Date.now() } `,

        level,

        source,

        eventType,

        message,

        payload,

        metadata,

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

    payload = null,

    eventType =
        OBSERVABILITY_EVENT_TYPES.SESSION,

    metadata = {}

}) {

    const entry =

        createLogEntry({

            level:
                LOG_LEVELS.INFO,

            source,

            message,

            payload,

            eventType,

            metadata
        });

    console.log(

        `[MOS360:${ source }]`,

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

    payload = null,

    eventType =
        OBSERVABILITY_EVENT_TYPES.DIAGNOSTIC,

    metadata = {}

}) {

    const entry =

        createLogEntry({

            level:
                LOG_LEVELS.WARN,

            source,

            message,

            payload,

            eventType,

            metadata
        });

    console.warn(

        `[MOS360:${ source }:WARN]`,

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

    payload = null,

    eventType =
        OBSERVABILITY_EVENT_TYPES.DIAGNOSTIC,

    metadata = {}

}) {

    const entry =

        createLogEntry({

            level:
                LOG_LEVELS.ERROR,

            source,

            message,

            payload,

            eventType,

            metadata
        });

    console.error(

        `[MOS360:${ source }:ERROR]`,

        entry
    );

    return entry;
}

// ============================================
// LOG CRITICAL
// ============================================

export function logCriticalRuntimeEvent({

    source = "runtime",

    message = "",

    payload = null,

    metadata = {}

}) {

    const entry =

        createLogEntry({

            level:
                LOG_LEVELS.CRITICAL,

            source,

            message,

            payload,

            eventType:
                OBSERVABILITY_EVENT_TYPES.DIAGNOSTIC,

            metadata
        });

    console.error(

        `[MOS360:${ source }:CRITICAL]`,

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

    ecosystemHealthy = true,

    continuityHealthy = true,

    reinforcementHealthy = true,

    progressionHealthy = true

} = {}) {

    const overallHealthy = [

        runtimeHealthy,
        governanceHealthy,
        ecosystemHealthy,
        continuityHealthy,
        reinforcementHealthy,
        progressionHealthy

    ].every(Boolean);

    return {

        runtimeHealthy,

        governanceHealthy,

        ecosystemHealthy,

        continuityHealthy,

        reinforcementHealthy,

        progressionHealthy,

        overallHealthy,

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

    const criticals =

        logs.filter(

            log =>

                log.level ===
                LOG_LEVELS.CRITICAL
        );

    const errors =

        logs.filter(

            log =>

                log.level ===
                LOG_LEVELS.ERROR
        );

    const warnings =

        logs.filter(

            log =>

                log.level ===
                LOG_LEVELS.WARN
        );

    return {

        totalLogs:
            logs.length,

        criticals:
            criticals.length,

        errors:
            errors.length,

        warnings:
            warnings.length,

        healthy:

            criticals.length === 0
            &&
            errors.length === 0,

        health,

        generatedAt:
            Date.now()
    };
}

// ============================================
// GENERATE RUNTIME TIMELINE
// ============================================

export function generateRuntimeTimeline({

    logs = []

}) {

    return logs

        .sort(

            (a, b) =>

                a.createdAt - b.createdAt
        )

        .map((log) => ({

            timestamp:
                log.createdAt,

            source:
                log.source,

            eventType:
                log.eventType,

            level:
                log.level,

            message:
                log.message
        }));
}
