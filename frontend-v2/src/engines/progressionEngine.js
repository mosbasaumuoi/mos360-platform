// ============================================
// MOS360 PROGRESSION ENGINE
// Adaptive learning continuity runtime
// ============================================

import {
    getStorage,
    setStorage
}
    from "../utils/localStorageHelpers.js";

// ============================================
// STORAGE KEYS
// ============================================

const LESSON_PROGRESS_KEY =
    "mos360_completed_lessons";

const ACTIVE_COURSE_KEY =
    "mos360_active_course";

const LAST_LESSON_KEY =
    "mos360_last_lesson";

// ============================================
// GET COMPLETED LESSONS
// ============================================

export function getCompletedLessons(

    courseId

) {

    const data =

        getStorage(

            LESSON_PROGRESS_KEY,

            {}

        );

    return data[courseId] || [];
}

// ============================================
// SAVE COMPLETED LESSON
// ============================================

export function saveCompletedLesson({

    courseId,
    lessonId

}) {

    const data =

        getStorage(

            LESSON_PROGRESS_KEY,

            {}

        );

    if (!data[courseId]) {

        data[courseId] = [];
    }

    if (

        !data[courseId].includes(
            lessonId
        )

    ) {

        data[courseId].push(
            lessonId
        );
    }

    setStorage(

        LESSON_PROGRESS_KEY,

        data
    );
}

// ============================================
// SET ACTIVE COURSE
// ============================================

export function setActiveCourse({

    courseId,
    lessonId

}) {

    setStorage(

        ACTIVE_COURSE_KEY,

        {

            courseId,

            lessonId,

            updatedAt:
                Date.now()
        }
    );
}

// ============================================
// GET ACTIVE COURSE
// ============================================

export function getActiveCourse() {

    return getStorage(

        ACTIVE_COURSE_KEY,

        null
    );
}

// ============================================
// SAVE LAST LESSON
// ============================================

export function saveLastLesson({

    courseId,
    lessonId

}) {

    setStorage(

        LAST_LESSON_KEY,

        {

            courseId,

            lessonId,

            updatedAt:
                Date.now()
        }
    );
}

// ============================================
// GET LAST LESSON
// ============================================

export function getLastLesson() {

    return getStorage(

        LAST_LESSON_KEY,

        null
    );
}

// ============================================
// GET COURSE PROGRESS
// ============================================

export function getCourseProgress({

    courseId,
    totalLessons

}) {

    const completedLessons =

        getCompletedLessons(
            courseId
        );

    const completedCount =

        completedLessons.length;

    const progressPercent =

        totalLessons
            ? Math.floor(

                (
                    completedCount
                    / totalLessons
                ) * 100
            )
            : 0;

    return {

        completedCount,

        totalLessons,

        progressPercent
    };
}

// ============================================
// GET LEARNING MOMENTUM
// ============================================

export function getLearningMomentum({

    streak = 0,
    progressPercent = 0,
    completedToday = 0

}) {

    // ========================================
    // STRONG MOMENTUM
    // ========================================

    if (

        streak >= 7
        &&
        progressPercent >= 60

    ) {

        return {

            status:
                "strong",

            title:
                "Momentum rất tốt",

            message:
                "Bạn đang duy trì nhịp học tập ổn định và tiến bộ rõ rệt mỗi ngày.",

            energy:
                "high"
        };
    }

    // ========================================
    // STABLE MOMENTUM
    // ========================================

    if (

        streak >= 3
        ||
        progressPercent >= 30

    ) {

        return {

            status:
                "stable",

            title:
                "Đang tiến bộ ổn định",

            message:
                "Bạn đang xây dựng kỹ năng thực tế từng bước rất tốt.",

            energy:
                "medium"
        };
    }

    // ========================================
    // ACTIVE SESSION
    // ========================================

    if (

        completedToday >= 1

    ) {

        return {

            status:
                "active",

            title:
                "Hoàn thành thêm một bước",

            message:
                "Momentum học tập được tạo ra từ những tiến bộ nhỏ nhưng liên tục.",

            energy:
                "medium"
        };
    }

    // ========================================
    // EARLY STAGE
    // ========================================

    return {

        status:
            "early",

        title:
            "Bắt đầu xây dựng momentum",

        message:
            "Chỉ cần duy trì học tập đều đặn mỗi ngày, kỹ năng sẽ phát triển tự nhiên.",

        energy:
            "low"
    };
}

// ============================================
// LEARNER IDENTITY
// ============================================

export function getLearnerIdentity({

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

        return {

            level:
                "advanced",

            title:
                "Người học duy trì ổn định",

            message:
                "Bạn đang xây dựng kỹ năng Office rất ổn định thông qua luyện tập liên tục.",

            tone:
                "confident"
        };
    }

    // ========================================
    // CONSISTENT
    // ========================================

    if (

        progressPercent >= 40
        ||
        streak >= 4

    ) {

        return {

            level:
                "consistent",

            title:
                "Người học đang tiến bộ",

            message:
                "Momentum học tập của bạn đang hình thành rất tốt từng ngày.",

            tone:
                "stable"
        };
    }

    // ========================================
    // ACTIVE
    // ========================================

    if (

        completedLessons >= 3

    ) {

        return {

            level:
                "active",

            title:
                "Người học đang xây nền",

            message:
                "Bạn đang tạo nền tảng kỹ năng thực tế rất tốt.",

            tone:
                "encouraging"
        };
    }

    // ========================================
    // EARLY
    // ========================================

    return {

        level:
            "early",

        title:
            "Bắt đầu hành trình học tập",

        message:
            "Chỉ cần học tập đều đặn từng bước nhỏ, kỹ năng sẽ phát triển tự nhiên.",

        tone:
            "gentle"
    };
}

// ============================================
// LEARNING RELATIONSHIP MEMORY
// ============================================

const RELATIONSHIP_MEMORY_KEY =
    "mos360_learning_relationship";

// ============================================
// UPDATE RELATIONSHIP MEMORY
// ============================================

export function updateLearningRelationship({

    courseId,
    lessonId,
    progressPercent = 0,
    streak = 0

}) {

    const memory = {

        lastCourseId:
            courseId,

        lastLessonId:
            lessonId,

        progressPercent,

        streak,

        updatedAt:
            Date.now()
    };

    setStorage(

        RELATIONSHIP_MEMORY_KEY,

        memory
    );

    return memory;
}

// ============================================
// GET RELATIONSHIP MEMORY
// ============================================

export function getLearningRelationship() {

    return getStorage(

        RELATIONSHIP_MEMORY_KEY,

        null
    );
}

// ============================================
// RELATIONSHIP MESSAGE
// ============================================

export function getRelationshipMessage(

    relationship = {}

) {

    const {

        progressPercent = 0,
        streak = 0

    } = relationship || {};

    // ========================================
    // STRONG RELATIONSHIP
    // ========================================

    if (

        progressPercent >= 70
        &&
        streak >= 7

    ) {

        return {

            tone:
                "strong",

            message:
                "Bạn đang duy trì hành trình học tập rất ổn định và rõ ràng."
        };
    }

    // ========================================
    // GROWING RELATIONSHIP
    // ========================================

    if (

        progressPercent >= 35
        ||
        streak >= 3

    ) {

        return {

            tone:
                "growing",

            message:
                "Momentum học tập của bạn đang phát triển rất tốt từng ngày."
        };
    }

    // ========================================
    // EARLY RELATIONSHIP
    // ========================================

    return {

        tone:
            "early",

        message:
            "Chỉ cần duy trì học tập đều đặn, kỹ năng sẽ phát triển tự nhiên theo thời gian."
    };
}