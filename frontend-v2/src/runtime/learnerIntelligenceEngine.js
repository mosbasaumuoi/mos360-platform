// ============================================
// MOS360 LEARNER INTELLIGENCE ENGINE
// Adaptive learner intelligence runtime
// ============================================

// ============================================
// LEARNER STATES
// ============================================

export const LEARNER_STATES = {

    EARLY:
        "early",

    ACTIVE:
        "active",

    CONSISTENT:
        "consistent",

    ADVANCED:
        "advanced"
};

// ============================================
// DETECT LEARNER STATE
// ============================================

export function detectLearnerState({

    streak = 0,
    progressPercent = 0,
    completedLessons = 0

}) {

    // ========================================
    // ADVANCED
    // ========================================

    if (

        progressPercent >= 75
        &&
        streak >= 7

    ) {

        return LEARNER_STATES.ADVANCED;
    }

    // ========================================
    // CONSISTENT
    // ========================================

    if (

        progressPercent >= 40
        ||
        streak >= 4

    ) {

        return LEARNER_STATES.CONSISTENT;
    }

    // ========================================
    // ACTIVE
    // ========================================

    if (

        completedLessons >= 3

    ) {

        return LEARNER_STATES.ACTIVE;
    }

    // ========================================
    // EARLY
    // ========================================

    return LEARNER_STATES.EARLY;
}

// ============================================
// GENERATE LEARNER PROFILE
// ============================================

export function generateLearnerProfile({

    streak = 0,
    progressPercent = 0,
    completedLessons = 0

}) {

    const state =

        detectLearnerState({

            streak,
            progressPercent,
            completedLessons
        });

    // ========================================
    // ADVANCED
    // ========================================

    if (

        state ===
        LEARNER_STATES.ADVANCED

    ) {

        return {

            state,

            title:
                "Người học duy trì ổn định",

            focus:
                "workflow_mastery",

            pacing:
                "advanced",

            continuity:
                "strong"
        };
    }

    // ========================================
    // CONSISTENT
    // ========================================

    if (

        state ===
        LEARNER_STATES.CONSISTENT

    ) {

        return {

            state,

            title:
                "Người học đang tiến bộ",

            focus:
                "skill_growth",

            pacing:
                "stable",

            continuity:
                "growing"
        };
    }

    // ========================================
    // ACTIVE
    // ========================================

    if (

        state ===
        LEARNER_STATES.ACTIVE

    ) {

        return {

            state,

            title:
                "Người học đang xây nền",

            focus:
                "practice_foundation",

            pacing:
                "moderate",

            continuity:
                "forming"
        };
    }

    // ========================================
    // EARLY
    // ========================================

    return {

        state,

        title:
            "Bắt đầu hành trình học tập",

        focus:
            "learning_foundation",

        pacing:
            "gentle",

        continuity:
            "early"
    };
}

// ============================================
// GENERATE LEARNING RECOMMENDATION
// ============================================

export function generateLearningRecommendation({

    learner = {}

}) {

    // ========================================
    // ADVANCED
    // ========================================

    if (

        learner.state ===
        LEARNER_STATES.ADVANCED

    ) {

        return {

            recommendation:
                "Tăng cường workflow thực tế và bài tập mô phỏng.",

            intensity:
                "high"
        };
    }

    // ========================================
    // CONSISTENT
    // ========================================

    if (

        learner.state ===
        LEARNER_STATES.CONSISTENT

    ) {

        return {

            recommendation:
                "Duy trì rhythm học tập đều đặn và tăng thực hành workflow.",

            intensity:
                "medium"
        };
    }

    // ========================================
    // ACTIVE
    // ========================================

    if (

        learner.state ===
        LEARNER_STATES.ACTIVE

    ) {

        return {

            recommendation:
                "Tiếp tục luyện tập từng workflow nhỏ để xây nền kỹ năng.",

            intensity:
                "medium"
        };
    }

    // ========================================
    // EARLY
    // ========================================

    return {

        recommendation:
            "Tập trung hoàn thành từng lesson nhỏ để tạo learning momentum.",

        intensity:
            "gentle"
    };
}

// ============================================
// GENERATE LEARNER INTELLIGENCE REPORT
// ============================================

export function generateLearnerIntelligenceReport({

    streak = 0,
    progressPercent = 0,
    completedLessons = 0

}) {

    const learner =

        generateLearnerProfile({

            streak,
            progressPercent,
            completedLessons
        });

    const recommendation =

        generateLearningRecommendation({

            learner
        });

    return {

        learner,

        recommendation,

        generatedAt:
            Date.now()
    };
}