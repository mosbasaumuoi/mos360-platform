// ============================================
// IMPORT SPREADSHEET LESSONS
// Canonical persistence runtime
// ============================================

import {

    transformSpreadsheetLessons

}

    from "./spreadsheetLessonTransformer.js";

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

    return {

        ok: true,

        importedLessons,

        importedCourseGraphs:
            courseMap,

        rejectedLessons: [],

        totalImported:
            importedLessons.length,

        totalRejected:
            0
    };
}