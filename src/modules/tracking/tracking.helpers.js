// ============================================
// MOS360 TRACKING HELPERS
// Canonical lightweight event creators
// ============================================

import {
    EVENT_TYPES
}
    from "./tracking.events.js";

// ============================================
// LOGIN SUCCESS
// ============================================

export function createLoginSuccessEvent({

    userId,
    email

}) {

    return {

        type:
            EVENT_TYPES.LOGIN_SUCCESS,

        userId,

        email,

        metadata: {}
    };
}

// ============================================
// LESSON COMPLETED
// ============================================

export function createLessonCompletedEvent({

    userId,
    email,
    courseId,
    lessonId

}) {

    return {

        type:
            EVENT_TYPES.LESSON_COMPLETED,

        userId,

        email,

        courseId,

        lessonId,

        metadata: {}
    };
}

// ============================================
// XP GAINED
// ============================================

export function createXpGainedEvent({

    userId,
    email,
    courseId,
    lessonId,
    xp

}) {

    return {

        type:
            EVENT_TYPES.XP_GAINED,

        userId,

        email,

        courseId,

        lessonId,

        metadata: {

            xp
        }
    };
}

// ============================================
// CERTIFICATE ISSUED
// ============================================

export function createCertificateIssuedEvent({

    userId,
    email,
    courseId,
    certificateId

}) {

    return {

        type:
            EVENT_TYPES.CERTIFICATE_ISSUED,

        userId,

        email,

        courseId,

        metadata: {

            certificateId
        }
    };
}