import {
    apiPost
}
    from "./api.js";

export async function addXP(
    payload
) {

    return apiPost(
        "/gamification/xp",
        payload,
        {
            silent: true
        }
    );
}

export async function updateStreak(
    payload
) {

    return apiPost(
        "/gamification/streak",
        payload,
        {
            silent: true
        }
    );
}