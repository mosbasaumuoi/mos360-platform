// ============================================
// MOS360 COURSE COMPLETION ENGINE
// Course completion & achievement runtime
// ============================================

import {
    STORAGE_KEYS
}
    from "../constants/storageKeys.js";

import {
    getStorage,
    setStorage
}
    from "../utils/localStorageHelpers.js";

import {
    getCourseCompletedKey
}
    from "../utils/storageHelpers.js";

import {
    saveCredential
}
    from "../utils/credentialStorage.js";

import {
    generateCertificateId
}
    from "../utils/idGenerator.js";

import {
    getXpReward
}
    from "./rewardEngine.js";

import {
    logLearning
}
    from "../utils/logger.js";

import {
    showFeedback
}
    from "../core/feedbackRuntime.js";

// ============================================
// COMPLETE COURSE
// ============================================

export function completeCourse({

    courseId,
    course,
    completedLessons

}) {

    // ========================================
    // VALIDATE
    // ========================================

    if (

        completedLessons.length
        <
        course.lessons.length

    ) {

        return {

            ok: false,

            message:
                "Please complete all lessons first."
        };
    }

    // ========================================
    // SAVE COMPLETED
    // ========================================

    setStorage(

        getCourseCompletedKey(
            courseId
        ),

        true

    );

    // ========================================
    // LOGGING
    // ========================================

    logLearning(
        "course completed",
        courseId
    );

    // ========================================
    // SAVE CERTIFICATE
    // ========================================

    saveCredential({

        certificateId:
            generateCertificateId(),

        studentName:
            "MOS360 Student",

        courseName:
            course.title,

        issueDate:
            new Date()
                .toLocaleDateString()

    });

    // ========================================
    // XP
    // ========================================

    let xp =

        getStorage(
            STORAGE_KEYS.USER_XP,
            0
        );

    xp +=
        getXpReward(
            course.xpReward
        );

    setStorage(
        STORAGE_KEYS.USER_XP,
        xp
    );

    // ========================================
    // FEEDBACK
    // ========================================

    showFeedback({

        type:
            "success",

        duration:
            3200,

        message: `

      🎉 Khóa học hoàn thành<br>

      +${getXpReward(
            course.xpReward
        )} XP<br>

      Chứng nhận đã được tạo.

    `
    });

    return {
        ok: true
    };
}