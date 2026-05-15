import {
    EVENT_TYPES
}
    from "../tracking/tracking.events.js";

import {
    trackEvent
}
    from "../tracking/tracking.service.js";

export async function issueCredential(
    env,
    credential
) {

    // ========================================
    // REQUIRED FIELDS
    // ========================================

    if (

        !credential.certificateId
        ||
        !credential.studentName
        ||
        !credential.courseName

    ) {

        throw new Error(
            "Invalid credential contract"
        );
    }
    
    const savedCredential = {

        id:
            credential.id,

        certificateId:
            credential.certificateId,

        studentName:
            credential.studentName,

        courseName:
            credential.courseName,

        issueDate:
            credential.issueDate,

        createdAt:
            Date.now()
    };

    // ========================================
    // PREVENT OVERWRITE
    // ========================================

    const existingCredential =

        await getCredential(
            env,
            credential.certificateId
        );

    if (existingCredential) {

        throw new Error(
            "Credential already exists"
        );
    }
    
    await env.MOS360_CREDENTIALS_KV.put(

        `credential:${credential.certificateId}`,

        JSON.stringify(
            savedCredential
        )
    );

    // ========================================
    // TRACK EVENT
    // ========================================

    await trackEvent(

        env,

        {

            type:
                EVENT_TYPES.CERTIFICATE_ISSUED,

            courseId:
                credential.courseId || null,

            email:
                credential.email || null,

            metadata: {

                certificateId:
                    credential.certificateId
            }
        }
    );
    
    return savedCredential;
}

// ============================================
// GET CREDENTIAL
// ============================================

export async function getCredential(
    env,
    certificateId
) {

    const raw =

        await env.MOS360_CREDENTIALS_KV.get(

            `credential:${certificateId}`
        );

    if (!raw) {
        return null;
    }

    try {

        return JSON.parse(raw);

    } catch {

        return null;
    }
}