import { json }
    from "../../utils/response.js";

import {
    addXP,
    updateDailyStreak
}
    from "./gamification.service.js";
    
export async function handleAddXP(
    request,
    env
) {

    try {

        const body =
            await request.json();

        const user =
            await addXP(
                env,
                body.email,
                body.amount
            );

        return json(user);

    } catch (error) {

        return json(
            error.message,
            500
        );
    }
}

export async function handleDailyStreak(
    request,
    env
) {

    try {

        const body =
            await request.json();

        const user =
            await updateDailyStreak(
                env,
                body.email
            );

        return json(user);

    } catch (error) {

        return json(
            error.message,
            500
        );
    }
}