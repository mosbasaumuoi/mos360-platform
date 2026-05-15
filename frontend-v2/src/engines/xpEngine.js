// ============================================
// MOS360 XP ENGINE
// XP + LEVEL calculations
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
    level
) {

    const currentLevelXp =

        (level - 1) * 200;

    const nextLevelXp =

        level * 200;

    return (

        (
            (xp - currentLevelXp)

            /

            (nextLevelXp - currentLevelXp)
        )

        * 100

    );
}