// ============================================
// MOS360 MISSION ENGINE
// ============================================

import {
    STORAGE_KEYS
}
    from "../../constants/storageKeys.js";

// ============================================
// GET USER STREAK
// ============================================

export function getUserStreak() {

    return Number(

        localStorage.getItem(
            STORAGE_KEYS.USER_STREAK
        ) || 0

    );
}

// ============================================
// DAILY MISSIONS
// ============================================

export function getDailyMissions({

    watchedLessons = 0,
    generatedCertificates = 0

}) {

    return [

        {
            id:
                "complete_1",

            title:
                "Complete 1 lesson",

            completed:
                watchedLessons >= 1,

            reward:
                "+50 XP"
        },

        {
            id:
                "watch_3",

            title:
                "Watch 3 lessons",

            completed:
                watchedLessons >= 3,

            reward:
                "+150 XP"
        },

        {
            id:
                "certificate",

            title:
                "Earn certificate",

            completed:
                generatedCertificates >= 1,

            reward:
                "+300 XP"
        }

    ];
}