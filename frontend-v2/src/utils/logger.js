// ============================================
// MOS360 LOGGER
// Runtime observability
// ============================================

// ============================================
// ROUTE
// ============================================

export function logRoute(
    action,
    payload = ""
) {

    console.log(
        `[MOS360:ROUTE] ${action}`,
        payload
    );
}

// ============================================
// AUTH
// ============================================

export function logAuth(
    action,
    payload = ""
) {

    console.log(
        `[MOS360:AUTH] ${action}`,
        payload
    );
}

// ============================================
// STORAGE
// ============================================

export function logStorage(
    action,
    payload = ""
) {

    console.log(
        `[MOS360:STORAGE] ${action}`,
        payload
    );
}

// ============================================
// DASHBOARD
// ============================================

export function logDashboard(
    action,
    payload = ""
) {

    console.log(
        `[MOS360:DASHBOARD] ${action}`,
        payload
    );
}

// ============================================
// LEARNING LOG
// ============================================

export function logLearning(
    action,
    payload = {}
) {

    console.log(

        "[MOS360:LEARN]",

        action,

        payload
    );
}

// ============================================
// COURSE LOG
// ============================================

export function logCourse(
    action,
    payload = {}
) {

    console.log(

        "[MOS360:COURSE]",

        action,

        payload
    );
}

// ============================================
// INFO
// ============================================

export function logInfo(
    scope,
    action,
    payload = {}
) {

    console.info(

        `[MOS360:${scope}]`,

        action,

        payload
    );
}

// ============================================
// WARNING
// ============================================

export function logWarn(
    scope,
    action,
    payload = {}
) {

    console.warn(

        `[MOS360:${scope}]`,

        action,

        payload
    );
}

// ============================================
// ERROR
// ============================================

export function logError(
    scope,
    action,
    payload = {}
) {

    console.error(

        `[MOS360:${scope}]`,

        action,

        payload
    );
}