/**
 * MOS360
 * Progression Memory Engine
 *
 * RESPONSIBILITY:
 * - progression memory
 * - milestone memory
 * - continuity memory
 * - learner progression recall
 *
 * MUST NOT:
 * - manipulate learner psychology
 * - create fake achievements
 * - inject dopamine mechanics
 */

const PROGRESSION_MEMORY_KEY =
    "mos360_progression_memory";

// ============================================
// GET PROGRESSION MEMORY
// ============================================

export function getProgressionMemory() {

    try {

        return JSON.parse(

            localStorage.getItem(
                PROGRESSION_MEMORY_KEY
            ) || "[]"

        );

    } catch {

        return [];
    }
}

// ============================================
// SAVE PROGRESSION MEMORY
// ============================================

export function saveProgressionMemory(
    memory = []
) {

    localStorage.setItem(

        PROGRESSION_MEMORY_KEY,

        JSON.stringify(memory)
    );

    return memory;
}

// ============================================
// REGISTER MILESTONE
// ============================================

export function registerMilestone({

    lessonId,

    title,

    type = "progress"

}) {

    const memory =
        getProgressionMemory();

    const milestone = {

        id:
            crypto.randomUUID(),

        lessonId,

        title,

        type,

        createdAt:
            Date.now()
    };

    const updated = [

        milestone,

        ...memory
    ].slice(0, 20);

    saveProgressionMemory(
        updated
    );

    return milestone;
}

// ============================================
// GET LATEST MILESTONE
// ============================================

export function getLatestMilestone() {

    return (
        getProgressionMemory()[0] ||
        null
    );
}