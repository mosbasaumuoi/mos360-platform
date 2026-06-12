// ============================================
// IMPORT SPREADSHEET LESSONS
// Canonical persistence runtime
// Phase: KV-enabled
// ============================================

import {

    transformSpreadsheetLessons

}

    from "./spreadsheetLessonTransformer.v2.js";

// ============================================
// KV API ENDPOINT
// ============================================

const KV_IMPORT_ENDPOINT =
    "/api/import/runtime";

// ============================================
// SAVE TO CLOUDFLARE KV
// ============================================

async function saveToKV({

    importedLessons,
    importedCourseGraphs

}) {

    try {

        const response =
            await fetch(
                KV_IMPORT_ENDPOINT,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        importedLessons,
                        importedCourseGraphs
                    })
                }
            );

        const result =
            await response.json();

        if (!result.ok) {

            console.error(
                "KV SAVE FAILED",
                result.error
            );

            return {
                ok: false,
                error: result.error
            };
        }

        console.log(
            "KV SAVE SUCCESS",
            result.data
        );

        return {
            ok: true,
            ...result.data
        };

    } catch (err) {

        console.error(
            "KV SAVE ERROR",
            err
        );

        return {
            ok: false,
            error: err.message
        };
    }
}

// ============================================
// IMPORT SPREADSHEET LESSONS
// ============================================

export async function importSpreadsheetLessons(

    rows = []

) {

    const importedLessons =

        transformSpreadsheetLessons(
            rows
        );

    // ========================================
    // BUILD COURSE GRAPH
    // ========================================

    const courseMap = {};

    importedLessons.forEach(

        lesson => {

            if (

                !courseMap[
                lesson.courseId
                ]

            ) {

                courseMap[
                    lesson.courseId
                ] = [];
            }

            courseMap[
                lesson.courseId
            ].push({

                id:
                    lesson.id,

                title:
                    lesson.title,

                description:
                    lesson.description || "",

                duration:
                    lesson.duration || "15 phút",

                order:
                    lesson.order || 1
            });
        }
    );

    // ========================================
    // SORT COURSE LESSONS
    // ========================================

    Object.values(

        courseMap

    ).forEach(

        lessons => {

            lessons.sort(

                (a, b) =>

                    Number(a.order || 0)

                    -

                    Number(b.order || 0)
            );
        }
    );

    // ========================================
    // SAVE TO CLOUDFLARE KV
    // ========================================

    const kvResult =
        await saveToKV({
            importedLessons,
            importedCourseGraphs: courseMap
        });

    // ========================================
    // RESULT
    // ========================================

    return {

        ok: true,

        importedLessons,

        importedCourseGraphs:
            courseMap,

        rejectedLessons: [],

        totalImported:
            importedLessons.length,

        totalRejected:
            0,

        // ====================================
        // KV PERSISTENCE RESULT
        // ====================================

        kv: {
            ok:
                kvResult.ok,

            savedLessons:
                kvResult.savedLessons ?? 0,

            savedCourses:
                kvResult.savedCourses ?? 0,

            courseIndex:
                kvResult.courseIndex ?? [],

            error:
                kvResult.error ?? null
        }
    };
}
