// ============================================
// LEARNING CONTINUITY ENGINE
// Learning rhythm & momentum runtime
// ============================================

import {
    getStorage,
    setStorage
}
    from "../utils/localStorageHelpers.js";

// ============================================
// STORAGE KEYS
// ============================================

const CONTINUITY_KEY =

    "mos360-learning-continuity";

// ============================================
// TODAY
// ============================================

function getToday() {

    return new Date()
        .toISOString()
        .split("T")[0];
}

// ============================================
// LOAD CONTINUITY
// ============================================

export function getLearningContinuity() {

    return getStorage(

        CONTINUITY_KEY,

        {

            streak: 0,

            totalSessions: 0,

            lastLearningDate: null,

            momentumLevel:
                "starting"
        }
    );
}

// ============================================
// SAVE CONTINUITY
// ============================================

function saveLearningContinuity(

    continuity

) {

    setStorage(

        CONTINUITY_KEY,

        continuity
    );
}

// ============================================
// UPDATE CONTINUITY
// ============================================

export function updateLearningContinuity() {

    const continuity =

        getLearningContinuity();

    const today =
        getToday();

    // ========================================
    // SAME DAY
    // ========================================

    if (

        continuity.lastLearningDate
        ===
        today

    ) {

        return continuity;
    }

    // ========================================
    // STREAK
    // ========================================

    const previousDate =

        continuity.lastLearningDate

            ? new Date(
                continuity.lastLearningDate
            )

            : null;

    const currentDate =
        new Date(today);

    const diffDays = previousDate

        ? Math.floor(

            (
                currentDate - previousDate
            )

            /

            (
                1000 * 60 * 60 * 24
            )

        )

        : null;

    // ========================================
    // CONTINUITY LOGIC
    // ========================================

    let streak = 1;

    if (diffDays === 1) {

        streak =
            continuity.streak + 1;

    } else if (diffDays === 0) {

        streak =
            continuity.streak;

    }

    // ========================================
    // MOMENTUM LEVEL
    // ========================================

    let momentumLevel =
        "starting";

    if (streak >= 3) {

        momentumLevel =
            "building";
    }

    if (streak >= 7) {

        momentumLevel =
            "consistent";
    }

    if (streak >= 14) {

        momentumLevel =
            "focused";
    }

    // ========================================
    // SAVE
    // ========================================

    const updatedContinuity = {

        streak,

        totalSessions:
            continuity.totalSessions + 1,

        lastLearningDate:
            today,

        momentumLevel
    };

    saveLearningContinuity(
        updatedContinuity
    );

    return updatedContinuity;
}

// ============================================
// CONTINUITY MESSAGE
// ============================================

export function getContinuityMessage(

    continuity

) {

    // ========================================
    // STARTING
    // ========================================

    if (

        continuity.momentumLevel
        ===
        "starting"

    ) {

        return {

            title:
                "Bắt đầu từng bước nhỏ",

            message:
                "Chỉ cần duy trì nhịp học nhẹ nhàng mỗi ngày, kỹ năng Office sẽ cải thiện tự nhiên hơn."
        };
    }

    // ========================================
    // BUILDING
    // ========================================

    if (

        continuity.momentumLevel
        ===
        "building"

    ) {

        return {

            title:
                "Bạn đang xây nhịp học rất tốt",

            message:
                "Sự liên tục quan trọng hơn học dồn. Hãy giữ momentum tự nhiên này."
        };
    }

    // ========================================
    // CONSISTENT
    // ========================================

    if (

        continuity.momentumLevel
        ===
        "consistent"

    ) {

        return {

            title:
                "Momentum học tập đang hình thành",

            message:
                "Bạn đang xây dựng sự tự tin Office thông qua luyện tập đều đặn."
        };
    }

    // ========================================
    // FOCUSED
    // ========================================

    return {

        title:
            "Bạn đang duy trì continuity rất ấn tượng",

        message:
            "Sự ổn định này sẽ giúp kỹ năng Office trở thành phản xạ tự nhiên."
    };
}