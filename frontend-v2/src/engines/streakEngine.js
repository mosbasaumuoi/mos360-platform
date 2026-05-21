// ============================================
// MOS360 STREAK ENGINE
// Learning continuity streak runtime
// ============================================

import {
    STORAGE_KEYS
}
    from "../constants/storageKeys.js";

import {
    getStorage,
    setStorage
}
    from "../utils/localStorageHelpers.js";

import {
    logLearning
}
    from "../utils/logger.js";

// ============================================
// UPDATE STREAK
// ============================================

export function updateLearningStreak() {

    // ========================================
    // TODAY
    // ========================================

    const today =

        new Date()
            .toDateString();

    // ========================================
    // LAST ACTIVE
    // ========================================

    const lastDate =

        getStorage(

            STORAGE_KEYS.LAST_ACTIVE_DATE,

            null

        );

    // ========================================
    // CURRENT STREAK
    // ========================================

    let streak =

        getStorage(

            STORAGE_KEYS.USER_STREAK,

            0

        );

    // ========================================
    // UPDATE
    // ========================================

    if (lastDate !== today) {

        streak += 1;

        setStorage(

            STORAGE_KEYS.USER_STREAK,

            streak

        );

        setStorage(

            STORAGE_KEYS.LAST_ACTIVE_DATE,

            today

        );

        logLearning(
            "streak updated",
            streak
        );
    }

    return streak;
}