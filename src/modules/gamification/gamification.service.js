export async function addXP(
    env,
    email,
    amount
) {

    const raw =
        await env.MOS360_USERS_KV.get(
            `user:${email}`
        );

    if (!raw) {
        return null;
    }

    const user =
        JSON.parse(raw);

    user.progression.xp +=
        amount;

    user.progression.lastActive =
        Date.now();

    await env.MOS360_USERS_KV.put(

        `user:${email}`,

        JSON.stringify(user)
    );

    return user;
}

// ============================================
// DAILY STREAK
// ============================================

export async function updateDailyStreak(
    env,
    email
) {

    const raw =
        await env.MOS360_USERS_KV.get(
            `user:${email}`
        );

    if (!raw) {
        return null;
    }

    const user =
        JSON.parse(raw);

    const now =
        Date.now();

    const lastActive =
        user.progression.lastActive;

    const oneDay =
        1000 * 60 * 60 * 24;

    // ========================================
    // FIRST TIME
    // ========================================

    if (!lastActive) {

        user.progression.streak = 1;
    }

    else {

        const daysDiff =

            Math.floor(

                (now - lastActive)

                /

                oneDay
            );

        // ====================================
        // SAME DAY
        // ====================================

        if (daysDiff <= 0) {

            // keep streak
        }

        // ====================================
        // NEXT DAY
        // ====================================

        else if (daysDiff === 1) {

            user.progression.streak += 1;
        }

        // ====================================
        // MISSED DAYS
        // ====================================

        else {

            user.progression.streak = 1;
        }
    }

    user.progression.lastActive =
        now;

    await env.MOS360_USERS_KV.put(

        `user:${email}`,

        JSON.stringify(user)
    );

    return user;
}