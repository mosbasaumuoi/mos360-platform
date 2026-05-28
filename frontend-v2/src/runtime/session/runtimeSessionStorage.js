const RUNTIME_SESSION_STORAGE_KEY =

    "mos360_runtime_sessions";

// ============================================
// GET SESSIONS
// ============================================

export function getStoredRuntimeSessions() {

    try {

        const stored =

            JSON.parse(

                localStorage.getItem(

                    RUNTIME_SESSION_STORAGE_KEY
                )
            );

        return Array.isArray(stored)

            ? stored

            : [];

    } catch {

        return [];
    }
}

// ============================================
// SAVE SESSION
// ============================================

export function saveRuntimeSession(

    session = {}

) {

    const sessions =

        getStoredRuntimeSessions();

    const existingIndex =

        sessions.findIndex(

            (item) =>

                item.id === session.id
        );

    if (existingIndex >= 0) {

        sessions[existingIndex] =
            session;

    } else {

        sessions.push(session);
    }

    localStorage.setItem(

        RUNTIME_SESSION_STORAGE_KEY,

        JSON.stringify(sessions)
    );

    return session;
}

// ============================================
// GET SESSION
// ============================================

export function getRuntimeSession(

    sessionId

) {

    return getStoredRuntimeSessions()

        .find(

            (session) =>

                session.id === sessionId
        );
}

// ============================================
// REMOVE SESSION
// ============================================

export function removeRuntimeSession(

    sessionId

) {

    const filtered =

        getStoredRuntimeSessions()

            .filter(

                (session) =>

                    session.id !== sessionId
            );

    localStorage.setItem(

        RUNTIME_SESSION_STORAGE_KEY,

        JSON.stringify(filtered)
    );

    return filtered;
}