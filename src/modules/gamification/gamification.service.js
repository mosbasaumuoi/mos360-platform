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

    // ========================================
    // NEXT DAY
    // ========================================

    else if (
        now - lastActive >= oneDay
    ) {

        user.progression.streak += 1;
    }

    user.progression.lastActive =
        now;

    await env.MOS360_USERS_KV.put(

        `user:${email}`,

        JSON.stringify(user)
    );

    return user;
}