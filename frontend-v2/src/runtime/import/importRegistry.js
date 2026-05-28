/**
 * MOS360
 * Import Registry Runtime
 *
 * RESPONSIBILITY:
 * - import metadata
 * - runtime import memory
 * - validation history
 * - semantic version tracking
 * - rollback foundation
 * - runtime recovery
 * - lesson evolution safety
 *
 * MUST NOT:
 * - render UI
 * - mutate lessons
 * - hydrate runtime
 */

const IMPORT_REGISTRY_KEY =
    "mos360_import_registry";

const IMPORT_SNAPSHOT_KEY =
    "mos360_import_snapshots";

const LESSON_EVOLUTION_KEY =
    "mos360_lesson_evolution";

// ============================================
// GET IMPORT REGISTRY
// ============================================

export function getImportRegistry() {

    try {

        return JSON.parse(

            localStorage.getItem(
                IMPORT_REGISTRY_KEY
            ) || "[]"
        );

    } catch {

        return [];
    }
}

// ============================================
// SAVE IMPORT REGISTRY
// ============================================

export function saveImportRegistry(
    registry = []
) {

    localStorage.setItem(

        IMPORT_REGISTRY_KEY,

        JSON.stringify(registry)
    );
}

// ============================================
// GET SNAPSHOTS
// ============================================

export function getImportSnapshots() {

    try {

        return JSON.parse(

            localStorage.getItem(
                IMPORT_SNAPSHOT_KEY
            ) || "[]"
        );

    } catch {

        return [];
    }
}

// ============================================
// SAVE SNAPSHOTS
// ============================================

export function saveImportSnapshots(
    snapshots = []
) {

    localStorage.setItem(

        IMPORT_SNAPSHOT_KEY,

        JSON.stringify(snapshots)
    );
}

// ============================================
// GET LESSON EVOLUTION
// ============================================

export function getLessonEvolutionRegistry() {

    try {

        return JSON.parse(

            localStorage.getItem(
                LESSON_EVOLUTION_KEY
            ) || "[]"
        );

    } catch {

        return [];
    }
}

// ============================================
// SAVE LESSON EVOLUTION
// ============================================

export function saveLessonEvolutionRegistry(
    registry = []
) {

    localStorage.setItem(

        LESSON_EVOLUTION_KEY,

        JSON.stringify(registry)
    );
}

// ============================================
// CREATE IMPORT ENTRY
// ============================================

export function createImportEntry({

    source = "runtime-import",

    courseCount = 0,

    lessonCount = 0,

    validationErrors = [],

    validationWarnings = [],

    semanticVersion =
        "phase-h1",

} = {}) {

    return {

        importId:

            crypto.randomUUID(),

        source,

        timestamp:

            new Date().toISOString(),

        semanticVersion,

        courseCount,

        lessonCount,

        validationErrors,

        validationWarnings,

        status:

            validationErrors.length > 0

                ? "warning"

                : "success"
    };
}

// ============================================
// REGISTER IMPORT
// ============================================

export function registerImport(
    entry
) {

    const registry =
        getImportRegistry();

    registry.unshift(entry);

    saveImportRegistry(registry);

    return entry;
}

// ============================================
// CREATE SNAPSHOT
// ============================================

export function createImportSnapshot({

    lessons = [],

    semanticVersion =
        "phase-h1",

} = {}) {

    return {

        snapshotId:

            crypto.randomUUID(),

        timestamp:

            new Date().toISOString(),

        semanticVersion,

        lessons
    };
}

// ============================================
// REGISTER SNAPSHOT
// ============================================

export function registerSnapshot(
    snapshot
) {

    const snapshots =
        getImportSnapshots();

    snapshots.unshift(snapshot);

    saveImportSnapshots(
        snapshots
    );

    return snapshot;
}

// ============================================
// GET LATEST SNAPSHOT
// ============================================

export function getLatestSnapshot() {

    const snapshots =
        getImportSnapshots();

    return snapshots[0] || null;
}

// ============================================
// REGISTER LESSON EVOLUTION
// ============================================

export function registerLessonEvolution({

    lessonId,

    courseId,

    mutationType =
        "update",

    semanticVersion =
        "phase-h1",

    previousVersion = null,

    nextVersion = null,

} = {}) {

    const registry =
        getLessonEvolutionRegistry();

    const evolutionEntry = {

        evolutionId:

            crypto.randomUUID(),

        lessonId,

        courseId,

        mutationType,

        semanticVersion,

        previousVersion,

        nextVersion,

        timestamp:

            new Date().toISOString()
    };

    registry.unshift(
        evolutionEntry
    );

    saveLessonEvolutionRegistry(
        registry
    );

    return evolutionEntry;
}

export function getSnapshotById(
    snapshotId
) {

    const snapshots =
        getImportSnapshots();

    return snapshots.find(

        snapshot =>

            snapshot.snapshotId ===
            snapshotId
    );
}