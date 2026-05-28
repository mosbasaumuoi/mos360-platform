export const RUNTIME_SESSION_STATUSES = [

    "idle",
    "active",
    "paused",
    "completed"

];

// ============================================
// CREATE RUNTIME SESSION
// ============================================

export function createRuntimeSession({

    lessonId = null,

    userId = null

} = {}) {

    return {

        id:
            crypto.randomUUID(),

        lessonId,

        userId,

        status:
            "idle",

        startedAt:
            null,

        completedAt:
            null,

        currentBlockIndex:
            0,

        visitedBlocks: [],

        interactionEvents: [],

        progression:
            0,

        createdAt:
            Date.now()
    };
}