// ============================================
// MOS360 LEVEL ENGINE
// ============================================

// ============================================
// GET LEVEL
// ============================================

export function getLevel(
    xp = 0
) {

    return Math.floor(
        xp / 200
    ) + 1;
}

// ============================================
// GET NEXT LEVEL XP
// ============================================

export function getNextLevelXp(
    level
) {

    return level * 200;
}

// ============================================
// GET LEVEL PROGRESS
// ============================================

export function getLevelProgress(
    xp,
    nextLevelXp
) {

    return Math.min(

        (xp / nextLevelXp) * 100,

        100
    );
}