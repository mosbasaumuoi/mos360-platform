// ============================================
// MOS360 CONTENT REGISTRY ENGINE
// Centralized content source orchestration
// ============================================

// ============================================
// COURSE REGISTRY
// ============================================

const courseRegistry = new Map();

// ============================================
// LESSON REGISTRY
// ============================================

const lessonRegistry = new Map();

// ============================================
// REGISTER COURSE
// ============================================

export function registerCourse(

    course

) {

    if (!course?.id) {
        return;
    }

    courseRegistry.set(
        course.id,
        course
    );
}

// ============================================
// REGISTER LESSON
// ============================================

export function registerLesson(

    lesson

) {

    if (!lesson?.id) {
        return;
    }

    lessonRegistry.set(
        lesson.id,
        lesson
    );
}

// ============================================
// GET COURSE
// ============================================

export function getRegisteredCourse(

    courseId

) {

    return courseRegistry.get(
        courseId
    );
}

// ============================================
// GET LESSON
// ============================================

export function getRegisteredLesson(

    lessonId

) {

    return lessonRegistry.get(
        lessonId
    );
}

// ============================================
// GET ALL COURSES
// ============================================

export function getRegisteredCourses() {

    return Array.from(
        courseRegistry.values()
    );
}

// ============================================
// GET ALL LESSONS
// ============================================

export function getRegisteredLessons() {

    return Array.from(
        lessonRegistry.values()
    );
}

// ============================================
// CLEAR REGISTRY
// ============================================

export function clearContentRegistry() {

    courseRegistry.clear();

    lessonRegistry.clear();
}