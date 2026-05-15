// ============================================
// MOS360 REWARD ENGINE
// Runtime reward helpers
// ============================================

// ============================================
// SAFE XP VALUE
// ============================================

export function getXpReward(
    value = 0
) {

    const xp =
        Number(value);

    return Number.isFinite(xp)
        ? xp
        : 0;
}

// ============================================
// PARSE XP STRING
// ============================================

export function parseXpReward(
    reward = ""
) {

    return Number(

        String(reward)

            .replace("+", "")

            .replace(" XP", "")

    ) || 0;
}