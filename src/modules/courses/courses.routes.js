// ============================================
// COURSES ROUTES
// Đọc từ KV, fallback về static nếu KV trống
// ============================================

import { json, error }
    from "../../utils/response.js";

// ============================================
// STATIC FALLBACK
// ============================================

const STATIC_COURSES = [

    {
        id: "mos-excel-expert",
        slug: "mos-excel-expert",
        title: "MOS Excel Expert",
        teacher: "MOS360",
        price: 2900000,
        status: "published",
        description: "Khóa học MOS Excel từ cơ bản tới Expert.",
        students: 1250,
        duration: "24 giờ",
        level: "Intermediate",
        lessons: []
    },

    {
        id: "mos-word-specialist",
        slug: "mos-word-specialist",
        title: "MOS Word Specialist",
        teacher: "MOS360",
        price: 1900000,
        status: "published",
        description: "Khóa học MOS Word giúp thành thạo định dạng văn bản.",
        students: 860,
        duration: "16 giờ",
        level: "Beginner",
        lessons: []
    }
];

// ============================================
// READ KV HELPER
// ============================================

async function readKV(KV, key) {

    try {

        const raw = await KV.get(key);

        return raw
            ? JSON.parse(raw)
            : null;

    } catch {

        return null;
    }
}

// ============================================
// GET /api/courses
// ============================================

export async function handleCourses(
    request,
    env
) {

    const KV = env.MOS360_COURSES_KV;

    // ========================================
    // ĐỌC TỪ KV
    // ========================================

    if (KV) {

        const kvCourses =
            await readKV(KV, "courses");

        if (
            Array.isArray(kvCourses)
            && kvCourses.length > 0
        ) {

            return json(kvCourses);
        }
    }

    // ========================================
    // FALLBACK → STATIC
    // ========================================

    return json(STATIC_COURSES);
}

// ============================================
// GET /api/courses/:courseId
// ============================================

export async function handleCourseDetail(
    request,
    env
) {

    const url = new URL(request.url);

    const courseId =
        url.pathname.split("/").pop();

    const KV = env.MOS360_COURSES_KV;

    // ========================================
    // ĐỌC TỪ KV
    // ========================================

    if (KV) {

        const kvCourses =
            await readKV(KV, "courses");

        if (Array.isArray(kvCourses)) {

            const course =
                kvCourses.find(
                    c => c.id === courseId
                );

            if (course) {

                return json(course);
            }
        }
    }

    // ========================================
    // FALLBACK → STATIC
    // ========================================

    const staticCourse =
        STATIC_COURSES.find(
            c => c.id === courseId
        );

    if (!staticCourse) {

        return error("Course not found", 404);
    }

    return json(staticCourse);
}

// ============================================
// GET /api/lessons/:lessonId
// ============================================

export async function handleLessonDetail(
    request,
    env
) {

    const url = new URL(request.url);

    const parts =
        url.pathname.split("/");

    // Support cả /api/lessons/:id
    // và /api/courses/:courseId/lessons/:id
    const lessonId =
        parts[parts.length - 1];

    const KV = env.MOS360_COURSES_KV;

    if (!KV) {

        return error("KV not available", 500);
    }

    // ========================================
    // ĐỌC LESSON TỪ KV
    // ========================================

    const lesson =
        await readKV(KV, `lesson:${lessonId}`);

    if (!lesson) {

        return error("Lesson not found", 404);
    }

    return json(lesson);
}
