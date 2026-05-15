// ============================================
// MOS360 XP ENGINE
// ============================================

import {
    STORAGE_KEYS
}
    from "../../constants/storageKeys.js";

// ============================================
// GET USER XP
// ============================================

export function getUserXP() {

    return Number(

        localStorage.getItem(
            STORAGE_KEYS.USER_XP
        ) || 0

    );
}

// ============================================
// ADD XP
// ============================================

export function addXP(amount) {

    const currentXP =
        getUserXP();

    const updatedXP =
        currentXP + amount;

    localStorage.setItem(

        STORAGE_KEYS.USER_XP,

        updatedXP

    );

    return updatedXP;
}

// ============================================
// GET USER LEVEL
// ============================================

export function getUserLevel() {

    const xp =
        getUserXP();

    return Math.floor(
        xp / 200
    ) + 1;
}

// ============================================
// GET LEVEL PROGRESS
// ============================================

export function getLevelProgress() {

    const xp =
        getUserXP();

    return xp % 200;
}
// ============================================
// GET NEXT LEVEL XP
// ============================================

export function getNextLevelXP() {

    const level =
        getUserLevel();

    return level * 200;
}