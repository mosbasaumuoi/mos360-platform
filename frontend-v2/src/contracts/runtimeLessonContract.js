export const RUNTIME_LESSON_STATUSES = [

    "draft",
    "review",
    "published",
    "archived",

    // semantic runtime bridge
    "runtime"

];

// ============================================
// CREATE RUNTIME LESSON
// ============================================

export function createRuntimeLesson({

    id = crypto.randomUUID(),

    title = "",

    description = "",

    courseId = null,

    blocks = [],

    quiz = [],

    status = "draft",

    semanticVersion = "phase-h2"

} = {}) {

    return {

        id,

        title,

        description,

        courseId,

        blocks,

        quiz,

        status,

        semanticVersion,

        createdAt:
            Date.now(),

        updatedAt:
            Date.now()
    };
}

// ============================================
// NORMALIZE LESSON
// ============================================

export function normalizeRuntimeLessonShape(

    lesson = {}

) {

    return createRuntimeLesson({

        ...lesson
    });
}