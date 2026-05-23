import {

    cacheEngine

}

    from "../../runtime/cacheEngine.js";

// ============================================
// GET ANALYTICS
// ============================================

export async function getAnalytics(
    env
) {

    // ========================================
    // CACHE
    // ========================================

    const cached =

        cacheEngine.get(
            "analytics"
        );

    if (cached) {

        return cached;
    }

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
    // ANALYTICS
    // ========================================

    let lessonCompleted = 0;

    const latestEvents = [];

    // ========================================
    // SINGLE PASS EVENT SCAN
    // ========================================

    const eventPayloads =

        await Promise.all(

            events.keys.map(

                async key => {

                    const raw =

                        await env
                            .MOS360_TRACKING_KV
                            .get(key.name);

                    if (!raw) {
                        return null;
                    }

                    return JSON.parse(raw);
                }
            )
        );

    eventPayloads

        .filter(Boolean)

        .forEach(event => {

            if (

                event.type ===
                "LESSON_COMPLETED"

            ) {

                lessonCompleted += 1;
            }

            latestEvents.push(
                event
            );
        });

    latestEvents.sort(

        (a, b) =>

            b.createdAt - a.createdAt
    );

    // ========================================
    // USERS LIST
    // ========================================

    const usersPayloads =

        await Promise.all(

            users.keys.map(

                async key => {

                    const raw =

                        await env
                            .MOS360_USERS_KV
                            .get(key.name);

                    if (!raw) {
                        return null;
                    }

                    return JSON.parse(raw);
                }
            )
        );

    const usersList =

        usersPayloads.filter(
            Boolean
        );

    // ========================================
    // RESULT
    // ========================================

    const analytics = {

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

    // ========================================
    // CACHE RESULT
    // ========================================

    cacheEngine.set(

        "analytics",

        analytics,

        1000 * 10
    );

    return analytics;
}