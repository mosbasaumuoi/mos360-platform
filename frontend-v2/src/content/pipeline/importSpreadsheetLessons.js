// ============================================
// IMPORT SPREADSHEET LESSONS
// Bulk spreadsheet lesson pipeline
// ============================================

import {
    transformSpreadsheetLesson
}
    from "./spreadsheetLessonTransformer.js";

import {
    importDataLessons
}
    from "./importDataLessons.js";

// ============================================
// IMPORT SPREADSHEET LESSONS
// ============================================

export function importSpreadsheetLessons(

    rows = []

) {

    // ========================================
    // TRANSFORM
    // ========================================

    const transformedLessons =

        rows.map(
            transformSpreadsheetLesson
        );

    // ========================================
    // IMPORT
    // ========================================

    return importDataLessons(
        transformedLessons
    );
}