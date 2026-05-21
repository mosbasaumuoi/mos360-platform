// ============================================
// MOS360 LESSON COMPLETION ENGINE
// Learning completion runtime
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
    getXpReward
}
    from "./rewardEngine.js";

import {
    addXP
}
    from "../services/gamificationApi.js";

import {
    sendTrackingEvent
}
    from "../services/trackingApi.js";

import {
    logInfo,
    logLearning
}
    from "../utils/logger.js";

import {
    saveCompletedLesson
}
    from "./progressionEngine.js";

import {
    showFeedback
}
    from "../core/feedbackRuntime.js";

// ============================================
// COMPLETE LESSON
// ============================================

export async function completeLesson({

    lesson,
    course,
    lessonId,
    courseId

}) {

    // ========================================
    // SAVE COMPLETION
    // ========================================

    const updatedLessons =

        saveCompletedLesson({

            courseId,
            lessonId

        });

    // ========================================
    // LOGGING
    // ========================================

    logLearning(

        "lesson completed",

        {
            courseId,
            lessonId
        }

    );

    // ========================================
    // TRACKING
    // ========================================

    sendTrackingEvent({

        type:
            "LESSON_COMPLETED",

        courseId,

        lessonId

    });

    // ========================================
    // XP
    // ========================================

    await addXP({

        email:
            "admin@mos360.vn",

        amount:
            getXpReward(
                lesson.xpReward
            )

    });

    logInfo(

        "XP",

        "xp updated",

        {
            courseId,
            lessonId,

            xpReward:
                lesson.xpReward
        }

    );

    // ========================================
    // WATCHED LESSONS
    // ========================================

    let watchedLessons =

        getStorage(

            STORAGE_KEYS.WATCHED_LESSONS_TODAY,

            0

        );

    watchedLessons += 1;

    setStorage(

        STORAGE_KEYS.WATCHED_LESSONS_TODAY,

        watchedLessons

    );

    // ========================================
    // FEEDBACK
    // ========================================

    showFeedback({

        type:
            "success",

        message: `

        ✅ Hoàn thành bài học<br>

        +${getXpReward(
            lesson.xpReward
        )} XP

    `
    });

    // ========================================
    // RETURN UPDATED STATE
    // ========================================

    return updatedLessons;
}