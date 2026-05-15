export async function getAnalytics(
    env
) {

    // ========================================
    // USERS
    // ========================================

    const users =
        await env.MOS360_USERS_KV.list();

    // ========================================
    // TRACKING
    // ========================================

    const events =
        await env.MOS360_TRACKING_KV.list();

    // ========================================
    // CREDENTIALS
    // ========================================

    const credentials =
        await env.MOS360_CREDENTIALS_KV.list();

    // ========================================
    // LESSON COMPLETIONS
    // ========================================

    let lessonCompleted = 0;

    for (const key of events.keys) {

        const raw =
            await env.MOS360_TRACKING_KV.get(
                key.name
            );

        if (!raw) {
            continue;
        }

        const event =
            JSON.parse(raw);

        if (
            event.type ===
            "LESSON_COMPLETED"
        ) {

            lessonCompleted += 1;
        }
    }

    const latestEvents = [];

    for (const key of events.keys) {

        const raw =
            await env.MOS360_TRACKING_KV.get(
                key.name
            );

        if (!raw) {
            continue;
        }

        latestEvents.push(
            JSON.parse(raw)
        );
    }

    latestEvents.sort(

        (a, b) =>

            b.createdAt - a.createdAt
    );
    
    const usersList = [];

    for (const key of users.keys) {

        const raw =
            await env.MOS360_USERS_KV.get(
                key.name
            );

        if (!raw) {
            continue;
        }

        usersList.push(
            JSON.parse(raw)
        );
    }

    return {

        totalUsers:
            users.keys.length,

        totalEvents:
            events.keys.length,

        totalCredentials:
            credentials.keys.length,

        lessonCompleted,

        latestEvents:
            latestEvents.slice(0, 10),

        users:
            usersList    

    };
}