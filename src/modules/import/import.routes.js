// ============================================
// IMPORT ROUTES
// POST /api/import/runtime
// ============================================

import { json, error }
from "../../utils/response.js";

import { importRuntimeLessons }
from "./import.service.js";

// ============================================
// HANDLE RUNTIME IMPORT
// ============================================

export async function handleRuntimeImport(
    request,
    env
) {

    // ========================================
    // PARSE BODY
    // ========================================

    let body;

    try {

        body =
            await request.json();

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

    // ========================================
    // VALIDATE
    // ========================================

    if (
        !Array.isArray(importedLessons)
        ||
        importedLessons.length === 0
    ) {

        return error(
            "importedLessons không hợp lệ hoặc rỗng.",
            400
        );
    }

    if (
        !importedCourseGraphs
        ||
        typeof importedCourseGraphs !== "object"
    ) {

        return error(
            "importedCourseGraphs không hợp lệ.",
            400
        );
    }

    // ========================================
    // IMPORT
    // ========================================

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

        console.error(
            "IMPORT RUNTIME ERROR:",
            err
        );

        return error(
            err.message ||
            "Import thất bại.",
            500
        );
    }
}
