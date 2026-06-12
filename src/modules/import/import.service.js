// ============================================
// IMPORT SERVICE
// Lưu runtime lessons + course graph vào KV
// ============================================

// ============================================
// KV KEY SCHEMA
//
//   course:index              → string[]       danh sách courseId
//   course:{courseId}         → CourseGraph    metadata + lessons[]
//   lesson:{lessonId}         → Lesson         full lesson object
// ============================================

const MOS360_COURSES_KV = "course:index";

// ============================================
// READ COURSE INDEX
// ============================================

async function readCourseIndex(KV) {

    try {

        const raw =
            await KV.get(
                MOS360_COURSES_KV
            );

        return raw
            ? JSON.parse(raw)
            : [];

    } catch {

        return [];
    }
}

// ============================================
// WRITE COURSE INDEX
// ============================================

async function writeCourseIndex(
    KV,
    courseIds = []
) {

    await KV.put(
        MOS360_COURSES_KV,
        JSON.stringify(courseIds)
    );
}

// ============================================
// SAVE LESSON TO KV
// ============================================

async function saveLesson(
    KV,
    lesson = {}
) {

    const key =
        `lesson:${lesson.id}`;

    await KV.put(
        key,
        JSON.stringify({
            ...lesson,
            savedAt: new Date().toISOString()
        })
    );
}

// ============================================
// SAVE COURSE GRAPH TO KV
//
// courseGraph = {
//   courseId: [{ id, title, order, ... }]
// }
// ============================================

async function saveCourseGraph(
    KV,
    courseGraph = {}
) {

    const courseIds =
        Object.keys(courseGraph);

    for (const courseId of courseIds) {

        const key =
            `course:${courseId}`;

        const lessons =
            courseGraph[courseId];

        await KV.put(
            key,
            JSON.stringify({
                courseId,
                lessons,
                totalLessons:
                    lessons.length,
                updatedAt:
                    new Date().toISOString()
            })
        );
    }

    return courseIds;
}

// ============================================
// UPDATE COURSE INDEX
// Merge courseId mới vào index hiện có
// ============================================

async function updateCourseIndex(
    KV,
    newCourseIds = []
) {

    const existing =
        await readCourseIndex(KV);

    const merged = [
        ...new Set([
            ...existing,
            ...newCourseIds
        ])
    ];

    await writeCourseIndex(KV, merged);

    return merged;
}

// ============================================
// IMPORT RUNTIME LESSONS
// Entry point chính của service
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
            "KV binding MOS360_COURSES_KV không tìm thấy trong env. " +
            "Kiểm tra wrangler.toml."
        );
    }

    // ========================================
    // SAVE LESSONS
    // ========================================

    const lessonResults =
        await Promise.allSettled(

            importedLessons.map(
                lesson =>
                    saveLesson(KV, lesson)
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
    // SAVE COURSE GRAPHS
    // ========================================

    const savedCourseIds =
        await saveCourseGraph(
            KV,
            importedCourseGraphs
        );

    // ========================================
    // UPDATE COURSE INDEX
    // ========================================

    const updatedIndex =
        await updateCourseIndex(
            KV,
            savedCourseIds
        );

    // ========================================
    // RESULT
    // ========================================

    return {
        ok: true,
        savedLessons,
        failedLessons,
        savedCourses:
            savedCourseIds.length,
        courseIndex:
            updatedIndex,
        timestamp:
            new Date().toISOString()
    };
}
