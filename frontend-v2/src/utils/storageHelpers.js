// ============================================
// MOS360 STORAGE HELPERS
// Dynamic storage key builders
// ============================================

import {
    STORAGE_KEYS
}
    from "../constants/storageKeys.js";

// ============================================
// COURSE PROGRESS
// ============================================

export function getCourseProgressKey(
    courseId
) {

    return `${STORAGE_KEYS.COURSE_PROGRESS

        }_${courseId}`;
}

// ============================================
// COURSE COMPLETED
// ============================================

export function getCourseCompletedKey(
    courseId
) {

    return `course_completed_${courseId}`;
}

// ============================================
// LAST LESSON
// ============================================

export function getLastLessonKey(
    courseId
) {

    return `${STORAGE_KEYS.LAST_LESSON

        }_${courseId}`;
}
