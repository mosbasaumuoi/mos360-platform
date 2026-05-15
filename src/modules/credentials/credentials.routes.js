import { json }
    from "../../utils/response.js";

import {
    issueCredential,
    getCredential
}
    from "./credentials.service.js";

import {
    trackEvent
}
    from "../tracking/tracking.service.js";

import {
    EVENT_TYPES
}
    from "../tracking/tracking.events.js";

// ============================================
// ISSUE
// ============================================

export async function handleIssueCredential(
    request,
    env
) {

    try {

        const body =
            await request.json();

        // ====================================
        // REQUIRED FIELDS
        // ====================================

        if (

            !body.email
            ||
            !body.courseId
            ||
            !body.certificateId

        ) {

            // ================================
            // TRACE INVALID REQUEST
            // ================================

            console.warn(

                "[MOS360:CREDENTIAL]",

                "invalid credential request",

                body

            );

            return json(
                "Invalid credential request",
                400
            );
        }

        // ====================================
        // REPLAY PROTECTION
        // ====================================

        const existingCredential =

            await getCredential(
                env,
                body.certificateId
            );

        if (existingCredential) {

            // ================================
            // TRACE REPLAY ATTEMPT
            // ================================

            console.warn(

                "[MOS360:CREDENTIAL]",

                "credential replay attempt",

                {
                    certificateId:
                        body.certificateId
                }

            );

            return json(
                "Credential already issued",
                409
            );
        }

        // ====================================
        // ISSUE
        // ====================================

        const credential =
            await issueCredential(
                env,
                body
            );

        // ====================================
        // TRACE ISSUE
        // ====================================

        console.info(

            "[MOS360:CREDENTIAL]",

            "credential issued",

            {
                certificateId:
                    credential.certificateId
            }

        );

        // ====================================
        // TRACK VERIFYABLE EVENT
        // ====================================

        await trackEvent(

            env,

            {

                type:
                    EVENT_TYPES.CERTIFICATE_ISSUED,

                email:
                    body.email,

                courseId:
                    body.courseId,

                metadata: {

                    certificateId:
                        credential.certificateId
                }
            }
        );

        return json(credential);

    } catch (error) {

        // ====================================
        // TRACE FAILURE
        // ====================================

        console.error(

            "[MOS360:CREDENTIAL]",

            "credential issue failed",

            error

        );

        return json(
            error.message,
            500
        );
    }
}

// ============================================
// VERIFY
// ============================================

export async function handleVerifyCredential(
    request,
    env
) {

    const url =
        new URL(request.url);

    const certificateId =
        url.pathname.split(
            "/api/credentials/"
        )[1];

    // ========================================
    // INVALID ID
    // ========================================

    if (!certificateId) {

        console.warn(

            "[MOS360:VERIFY]",

            "invalid certificate id"

        );

        return json(
            "Invalid certificate ID",
            400
        );
    }

    const credential =
        await getCredential(
            env,
            certificateId
        );

    // ========================================
    // NOT FOUND
    // ========================================

    if (!credential) {

        console.warn(

            "[MOS360:VERIFY]",

            "credential not found",

            {
                certificateId
            }

        );

        return json(
            "Credential not found",
            404
        );
    }

    // ========================================
    // TRACE SUCCESS
    // ========================================

    console.info(

        "[MOS360:VERIFY]",

        "credential verified",

        {
            certificateId
        }

    );

    // ========================================
    // TRACK VERIFY EVENT
    // ========================================

    await trackEvent(

        env,

        {

            type:
                EVENT_TYPES.CERTIFICATE_VERIFIED,

            metadata: {

                certificateId
            }
        }
    );

    return json(credential);
}