import {
    json
}
    from "../../utils/response.js";

import {
    trackEvent
}
    from "./tracking.service.js";

import {
    verifyToken
}
    from "../auth/auth.service.js";

// ============================================
// TRACK EVENT
// ============================================

export async function handleTrackEvent(

    request,
    env

) {

    try {

        // ======================================
        // BODY
        // ======================================

        const body =
            await request.json();

        // ======================================
        // AUTH
        // ======================================

        const authHeader =

            request.headers.get(
                "Authorization"
            );

        if (!authHeader) {

            return json(
                "Unauthorized",
                401
            );
        }

        const token =

            authHeader.replace(
                "Bearer ",
                ""
            );

        const user =

            await verifyToken(
                token,
                env
            );

        if (!user) {

            return json(
                "Invalid token",
                401
            );
        }

        // ======================================
        // TRACK EVENT
        // ======================================

        const event =

            await trackEvent(

                env,

                {

                    ...body,

                    userId:
                        user.userId,

                    email:
                        user.email
                }
            );

        // ======================================
        // RESPONSE
        // ======================================

        return json({

            ok: true,

            data: event
        });

    } catch (error) {

        console.error(

            "[MOS360:TRACKING]",

            error
        );

        return json(

            "Failed to track event",

            500
        );
    }
}