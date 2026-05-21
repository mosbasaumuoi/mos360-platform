// ============================================
// IMPORT DATA LESSONS
// JSON-driven lesson import pipeline
// ============================================

import {
    transformDataLesson
}
    from "./dataLessonTransformer.js";

// ============================================
// IMPORT DATA LESSONS
// ============================================

export function importDataLessons(

    lessons = []

) {

    const importedLessons = [];

    const rejectedLessons = [];

    lessons.forEach(

        lesson => {

            const transformed =

                transformDataLesson(
                    lesson
                );

            // ====================================
            // SUCCESS
            // ====================================

            if (transformed.ok) {

                importedLessons.push(
                    transformed.data
                );

                return;
            }

            // ====================================
            // REJECTED
            // ====================================

            rejectedLessons.push({

                lesson,

                reason:
                    transformed.type
            });
        }
    );

    return {

        ok: true,

        importedLessons,

        rejectedLessons,

        totalImported:
            importedLessons.length,

        totalRejected:
            rejectedLessons.length
    };
}