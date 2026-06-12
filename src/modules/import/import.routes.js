// ============================================
// IMPORT ROUTES
// POST /api/import/runtime
// DELETE /api/lessons/:id
// ============================================

import { json, error }
from "../../utils/response.js";

import { importRuntimeLessons }
from "./import.service.js";

// ============================================
// POST /api/import/runtime
// ============================================

export async function handleRuntimeImport(
    request,
    env
) {

    let body;

    try {

        body = await request.json();

    } catch {

        return error(
            "Body không hợp lệ. Cần JSON.",
            400
        );
    }

    const {
        importedLessons,
        importedCourseGraphs
    } = body;

    if (
        !Array.isArray(importedLessons)
        || importedLessons.length === 0
    ) {

        return error(
            "importedLessons không hợp lệ hoặc rỗng.",
            400
        );
    }

    if (
        !importedCourseGraphs
        || typeof importedCourseGraphs !== "object"
    ) {

        return error(
            "importedCourseGraphs không hợp lệ.",
            400
        );
    }

    try {

        const result =
            await importRuntimeLessons(
                env,
                {
                    importedLessons,
                    importedCourseGraphs
                }
            );

        return json(result, 200);

    } catch (err) {

        console.error("IMPORT RUNTIME ERROR:", err);

        return error(
            err.message || "Import thất bại.",
            500
        );
    }
}

// ============================================
// DELETE /api/lessons/:id
// Xóa lesson khỏi KV
// ============================================

export async function handleDeleteLesson(
    request,
    env
) {

    const url = new URL(request.url);

    const lessonId =
        url.pathname.split("/").pop();

    if (!lessonId) {

        return error("Thiếu lessonId", 400);
    }

    const KV = env.MOS360_COURSES_KV;

    if (!KV) {

        return error("KV không khả dụng", 500);
    }

    try {

        // ====================================
        // XÓA LESSON KEY
        // ====================================

        await KV.delete(`lesson:${lessonId}`);

        // ====================================
        // CẬP NHẬT COURSES — xóa lesson khỏi graph
        // ====================================

        const raw =
            await KV.get("courses");

        if (raw) {

            const courses =
                JSON.parse(raw);

            const updated =
                courses.map(course => ({

                    ...course,

                    lessons: (course.lessons || [])
                        .filter(
                            l => l.id !== lessonId
                        ),

                    totalLessons:
                        (course.lessons || [])
                            .filter(
                                l => l.id !== lessonId
                            ).length,

                    updatedAt:
                        new Date().toISOString()
                }));

            await KV.put(
                "courses",
                JSON.stringify(updated)
            );
        }

        return json({
            ok: true,
            deleted: lessonId
        });

    } catch (err) {

        return error(
            err.message || "Xóa thất bại",
            500
        );
    }
}
