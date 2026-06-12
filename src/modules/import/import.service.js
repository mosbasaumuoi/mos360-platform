// ============================================
// IMPORT SERVICE
// Lưu normalized lessons vào Cloudflare KV
//
// KV SCHEMA (align với key hiện có):
//   courses          → CourseEntry[]   danh sách courses với lessons
//   lesson:{id}      → Lesson          full lesson object
// ============================================

// ============================================
// READ COURSES
// ============================================

async function readCourses(KV) {

    try {

        const raw =
            await KV.get("courses");

        return raw
            ? JSON.parse(raw)
            : [];

    } catch {

        return [];
    }
}

// ============================================
// SAVE LESSON TO KV
// ============================================

async function saveLesson(KV, lesson = {}) {

    await KV.put(
        `lesson:${lesson.id}`,
        JSON.stringify({
            ...lesson,
            savedAt: new Date().toISOString()
        })
    );
}

// ============================================
// MERGE COURSE GRAPH INTO COURSES KEY
//
// courseGraph = {
//   courseId: [{ id, title, order, ... }]
// }
// ============================================

async function mergeCourses(KV, courseGraph = {}) {

    const existing =
        await readCourses(KV);

    const courseMap = {};

    // Index existing courses by id
    existing.forEach(course => {
        courseMap[course.id] = course;
    });

    // Merge / upsert new courses
    Object.entries(courseGraph).forEach(

        ([courseId, lessons]) => {

            courseMap[courseId] = {

                id:
                    courseId,

                title:
                    courseMap[courseId]?.title
                    || courseId,

                lessons,

                totalLessons:
                    lessons.length,

                updatedAt:
                    new Date().toISOString(),

                runtimeImported:
                    true
            };
        }
    );

    const merged =
        Object.values(courseMap);

    await KV.put(
        "courses",
        JSON.stringify(merged)
    );

    return merged;
}

// ============================================
// IMPORT RUNTIME LESSONS
// ============================================

export async function importRuntimeLessons(
    env,
    {
        importedLessons = [],
        importedCourseGraphs = {}
    }
) {

    // ========================================
    // KV BINDING CHECK
    // ========================================

    const KV = env.MOS360_COURSES_KV;

    if (!KV) {

        throw new Error(
            "KV binding MOS360_COURSES_KV không tìm thấy trong env."
        );
    }

    // ========================================
    // SAVE LESSONS (song song)
    // ========================================

    const lessonResults =
        await Promise.allSettled(
            importedLessons.map(
                lesson => saveLesson(KV, lesson)
            )
        );

    const savedLessons =
        lessonResults.filter(
            r => r.status === "fulfilled"
        ).length;

    const failedLessons =
        lessonResults.filter(
            r => r.status === "rejected"
        ).length;

    // ========================================
    // MERGE COURSE GRAPH → courses key
    // ========================================

    const updatedCourses =
        await mergeCourses(
            KV,
            importedCourseGraphs
        );

    // ========================================
    // RESULT
    // ========================================

    return {
        ok: true,
        savedLessons,
        failedLessons,
        savedCourses:
            Object.keys(importedCourseGraphs).length,
        totalCourses:
            updatedCourses.length,
        timestamp:
            new Date().toISOString()
    };
}
