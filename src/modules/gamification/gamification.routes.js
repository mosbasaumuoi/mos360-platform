import {
    json
}
    from "../../utils/response.js";

import {
    verifyToken
}
    from "../auth/auth.service.js";

import {

    addXP,

    updateDailyStreak

}
    from "./gamification.service.js";

// ============================================
// AUTH USER
// ============================================

async function requireUser(

    request,
    env

) {

    const authHeader =

        request.headers.get(
            "Authorization"
        );

    if (!authHeader) {

        return null;
    }

    const token =

        authHeader.replace(
            "Bearer ",
            ""
        );

    return await verifyToken(
        token,
        env
    );
}

// ============================================
// XP
// ============================================

export async function handleAddXP(

    request,
    env

) {

    try {

        // ======================================
        // AUTH
        // ======================================

        const user =

            await requireUser(

                request,
                env
            );

        if (!user) {

            return json(
                "Unauthorized",
                401
            );
        }

        // ======================================
        // BODY
        // ======================================

        const body =
            await request.json();

        const amount =

            Number(
                body.amount || 0
            );

        // ======================================
        // VALIDATION
        // ======================================

        if (

            !Number.isFinite(
                amount
            )

            ||

            amount <= 0

            ||

            amount > 10000

        ) {

            return json(
                "Invalid XP amount",
                400
            );
        }

        // ======================================
        // ADD XP
        // ======================================

        const progression =

            await addXP(

                env,

                user.email,

                amount
            );

        // ======================================
        // RESPONSE
        // ======================================

        return json({

            ok: true,

            data:
                progression
        });

    } catch (error) {

        console.error(

            "[MOS360:XP]",

            error
        );

        return json(

            "Failed to add XP",

            500
        );
    }
}

// ============================================
// STREAK
// ============================================

export async function handleDailyStreak(

    request,
    env

) {

    try {

        // ======================================
        // AUTH
        // ======================================

        const user =

            await requireUser(

                request,
                env
            );

        if (!user) {

            return json(
                "Unauthorized",
                401
            );
        }

        // ======================================
        // UPDATE STREAK
        // ======================================

        const progression =

            await updateDailyStreak(

                env,

                user.email
            );

        // ======================================
        // RESPONSE
        // ======================================

        return json({

            ok: true,

            data:
                progression
        });

    } catch (error) {

        console.error(

            "[MOS360:STREAK]",

            error
        );

        return json(

            "Failed to update streak",

            500
        );
    }
}