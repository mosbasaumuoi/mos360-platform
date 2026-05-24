/**
 * MOS360
 * Runtime Recovery Engine
 *
 * RESPONSIBILITY:
 * - runtime rollback
 * - snapshot recovery
 * - safe runtime restore
 * - recovery orchestration
 *
 * MUST NOT:
 * - render UI
 * - mutate renderer
 * - validate lessons
 */

import {

    getLatestSnapshot

}

from "./importRegistry";

const IMPORT_LESSONS_KEY =
    "mos360_imported_lessons";

// ============================================
// RESTORE LATEST SNAPSHOT
// ============================================

export function restoreLatestRuntime() {

    const snapshot =
        getLatestSnapshot();

    // ================================
    // NO SNAPSHOT
    // ================================

    if (!snapshot) {

        console.warn(
            "[MOS360] No runtime snapshot found"
        );

        return false;
    }

    // ================================
    // RESTORE LESSONS
    // ================================

    localStorage.setItem(

        IMPORT_LESSONS_KEY,

        JSON.stringify(
            snapshot.lessons || []
        )
    );

    console.log(

        "[MOS360] Runtime restored:",

        snapshot.snapshotId
    );

    return true;
}