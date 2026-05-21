// ============================================
// RUNTIME IMPORT ENGINE
// Normalize imported runtime content
// ============================================

const IMPORT_COURSES_KEY =
    "mos360_imported_courses";

const IMPORT_LESSONS_KEY =
    "mos360_imported_lessons";

// ============================================
// CLEAN OBJECT KEYS
// ============================================

function cleanObject(obj = {}) {

    return Object.fromEntries(

        Object.entries(obj).map(

            ([key, value]) => [

                String(key).trim(),

                typeof value === "string"
                    ? value.trim()
                    : value

            ]
        )
    );
}

// ============================================
// NORMALIZE COURSE
// ============================================

function normalizeCourse(rawCourse = {}) {

    const course =
        cleanObject(rawCourse);

    const id =

        course.courseId ||
        course.id ||
        course.slug ||
        "";

    return {

        // ======================================
        // REQUIRED
        // ======================================

        id,

        courseId: id,

        slug:

            course.slug ||
            id,

        title:

            course.title ||
            "Untitled Course",

        description:

            course.description ||
            "Khóa học MOS runtime.",

        category:

            course.category ||
            "office",

        level:

            course.level ||
            "beginner",

        xpReward:

            Number(
                course.xpReward || 0
            ),

        lessons:

            Array.isArray(
                course.lessons
            )

                ? course.lessons

                : [],

        // ======================================
        // OPTIONAL
        // ======================================

        thumbnail:

            course.thumbnail ||
            "/assets/courses/default.jpg",

        duration:

            course.duration ||
            "Đang cập nhật",

        difficulty:

            course.difficulty ||
            "beginner",

        status:

            course.status ||
            "active",

        version:

            course.version ||
            "1.0",

        tags:

            Array.isArray(
                course.tags
            )

                ? course.tags

                : [],

        objectives:

            Array.isArray(
                course.objectives
            )

                ? course.objectives

                : [],

        skills:

            Array.isArray(
                course.skills
            )

                ? course.skills

                : [],

        requirements:

            Array.isArray(
                course.requirements
            )

                ? course.requirements

                : [],

        learningOutcomes:

            Array.isArray(
                course.learningOutcomes
            )

                ? course.learningOutcomes

                : []
    };
}

// ============================================
// NORMALIZE LESSON
// ============================================

function normalizeLesson(rawLesson = {}) {

    const lesson =
        cleanObject(rawLesson);

    return {

        // ======================================
        // REQUIRED
        // ======================================

        id:

            lesson.id ||
            lesson.lessonId ||
            "",

        lessonId:

            lesson.lessonId ||
            lesson.id ||
            "",

        courseId:

            lesson.courseId ||
            "",

        title:

            lesson.title ||
            "Untitled Lesson",

        order:

            Number(
                lesson.order || 1
            ),

        xpReward:

            Number(
                lesson.xpReward || 10
            ),

        // ======================================
        // OPTIONAL STRINGS
        // ======================================

        description:

            lesson.description ||
            "",

        content:

            lesson.content ||
            "",

        duration:

            lesson.duration ||
            "10 phút",

        difficulty:

            lesson.difficulty ||
            "beginner",

        videoUrl:

            lesson.videoUrl ||
            lesson.video ||
            "",

        version:

            lesson.version ||
            "1.0",

        // ======================================
        // OPTIONAL ARRAYS
        // ======================================

        workflowSteps:

            typeof lesson.workflowSteps === "string"

                ? lesson.workflowSteps
                    .split(";")
                    .map(
                        item => item.trim()
                    )
                    .filter(Boolean)

                : [],

        practicalNotes:

            typeof lesson.practicalNotes === "string"

                ? lesson.practicalNotes
                    .split(";")
                    .map(
                        item => item.trim()
                    )
                    .filter(Boolean)

                : [],

        commonMistakes:

            typeof lesson.commonMistakes === "string"

                ? lesson.commonMistakes
                    .split(";")
                    .map(
                        item => item.trim()
                    )
                    .filter(Boolean)

                : [],

        objectives:

            typeof lesson.objectives === "string"

                ? lesson.objectives
                    .split(";")
                    .map(
                        item => item.trim()
                    )
                    .filter(Boolean)

                : [],

        tags:

            typeof lesson.tags === "string"

                ? lesson.tags
                    .split(";")
                    .map(
                        item => item.trim()
                    )
                    .filter(Boolean)

                : [],

        resources:

            Array.isArray(
                lesson.resources
            )

                ? lesson.resources

                : [],

        quiz:

            Array.isArray(
                lesson.quiz
            )

                ? lesson.quiz

                : []
    };
}

// ============================================
// SAVE COURSES
// ============================================

export function saveImportedCourses(
    courses = []
) {

    const normalized =

        courses
            .map(normalizeCourse)
            .filter(
                course => course.id
            );

    console.log(
        "NORMALIZED COURSES",
        normalized
    );

    localStorage.setItem(

        IMPORT_COURSES_KEY,

        JSON.stringify(normalized)
    );
}

// ============================================
// GET COURSES
// ============================================

export function getImportedCourses() {

    try {

        return JSON.parse(

            localStorage.getItem(
                IMPORT_COURSES_KEY
            ) || "[]"
        );

    } catch {

        return [];
    }
}

// ============================================
// SAVE LESSONS
// ============================================

export function saveImportedLessons(
    lessons = []
) {

    const normalized =

        lessons
            .map(normalizeLesson)
            .filter(
                lesson =>
                    lesson.id &&
                    lesson.courseId
            );

    console.log(
        "NORMALIZED LESSONS",
        normalized
    );

    localStorage.setItem(

        IMPORT_LESSONS_KEY,

        JSON.stringify(normalized)
    );
}

// ============================================
// GET LESSONS
// ============================================

export function getImportedLessons() {

    try {

        return JSON.parse(

            localStorage.getItem(
                IMPORT_LESSONS_KEY
            ) || "[]"
        );

    } catch {

        return [];
    }
}