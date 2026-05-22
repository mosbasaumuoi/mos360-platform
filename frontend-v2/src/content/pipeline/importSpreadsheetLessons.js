// ============================================
// IMPORT SPREADSHEET LESSONS
// Phase H block-native import runtime
// ============================================

import {

    transformSpreadsheetLessons

}

from "./spreadsheetLessonTransformer.js";

// ============================================
// IMPORT SPREADSHEET LESSONS
// ============================================

export function importSpreadsheetLessons(

    rows = []

) {

    const importedLessons =

        transformSpreadsheetLessons(
            rows
        );

    return {

        ok: true,

        importedLessons,

        rejectedLessons: [],

        totalImported:
            importedLessons.length,

        totalRejected:
            0
    };
}