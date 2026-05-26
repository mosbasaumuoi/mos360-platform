// ============================================
// MOS360 LEARNING ANALYTICS ENGINE
// Adaptive learning intelligence analytics
// ============================================

// ============================================
// DETECT MOMENTUM LEVEL
// ============================================

export function detectMomentumLevel({

    streak = 0,
    completedLessons = 0

}) {

    // ========================================
    // STRONG
    // ========================================

    if (

        streak >= 7
        &&
        completedLessons >= 10

    ) {

        return "strong";
    }

    // ========================================
    // STABLE
    // ========================================

    if (

        streak >= 3
        ||
        completedLessons >= 5

    ) {

        return "stable";
    }

    // ========================================
    // EARLY
    // ========================================

    return "early";
}

// ============================================
// DETECT FATIGUE
// ============================================

export function detectLearningFatigue({

    totalBlocks = 0,
    reinforcementBlocks = 0,
    calloutBlocks = 0

}) {

    // ========================================
    // HIGH FATIGUE
    // ========================================

    if (

        totalBlocks > 12
        ||

        reinforcementBlocks > 3
        ||

        calloutBlocks > 4

    ) {

        return {

            level:
                "high",

            message:
                "Lesson có dấu hiệu overload và visual fatigue."
        };
    }

    // ========================================
    // MODERATE
    // ========================================

    if (

        totalBlocks > 8
        ||

        reinforcementBlocks > 2

    ) {

        return {

            level:
                "moderate",

            message:
                "Lesson bắt đầu có dấu hiệu hơi nặng về pacing."
        };
    }

    // ========================================
    // HEALTHY
    // ========================================

    return {

        level:
            "healthy",

        message:
            "Lesson đang có pacing và continuity khá tốt."
    };
}

// ============================================
// ANALYZE LEARNING HEALTH
// ============================================

export function analyzeLearningHealth({

    streak = 0,
    progressPercent = 0,
    completedLessons = 0

}) {

    const momentum =

        detectMomentumLevel({

            streak,
            completedLessons
        });

    // ========================================
    // STRONG HEALTH
    // ========================================

    if (

        momentum === "strong"
        &&
        progressPercent >= 70

    ) {

        return {

            status:
                "excellent",

            message:
                "Người học đang duy trì progression và continuity rất tốt."
        };
    }

    // ========================================
    // STABLE HEALTH
    // ========================================

    if (

        momentum === "stable"
        ||
        progressPercent >= 35

    ) {

        return {

            status:
                "good",

            message:
                "Learning momentum đang phát triển ổn định."
        };
    }

    // ========================================
    // EARLY HEALTH
    // ========================================

    return {

        status:
            "forming",

        message:
            "Người học đang trong giai đoạn hình thành learning rhythm."
    };
}

// ============================================
// GENERATE LEARNING ANALYTICS REPORT
// ============================================

export function generateLearningAnalyticsReport({

    streak = 0,
    progressPercent = 0,
    completedLessons = 0,
    totalBlocks = 0,
    reinforcementBlocks = 0,
    calloutBlocks = 0

}) {

    const momentum =

        detectMomentumLevel({

            streak,
            completedLessons
        });

    const fatigue =

        detectLearningFatigue({

            totalBlocks,
            reinforcementBlocks,
            calloutBlocks
        });

    const health =

        analyzeLearningHealth({

            streak,
            progressPercent,
            completedLessons
        });

    return {

        momentum,

        fatigue,

        health,

        generatedAt:
            Date.now()
    };
}