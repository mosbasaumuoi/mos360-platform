// ============================================
// MOS360 RUNTIME IMPORT ENGINE
// Hybrid semantic runtime convergence
// ============================================

import { importSpreadsheetLessons }
    from "../content/pipeline/importSpreadsheetLessons.js";

import {
    validateRuntimeLesson
}
    from "./runtimeSemanticValidationEngine.js";

import {
    normalizeValidationResult
} from "../validation/normalizeValidationResult";   

import {
    saveLessons
}
    from "../runtime/system/runtimeLibraryManager.js";
    
// ============================================
// STORAGE
// ============================================

const STORAGE_KEY =
    "mos360_runtime_import_lessons";

// ============================================
// LEGACY → PHASE-H BRIDGE
// ============================================

function normalizeRuntimeBlock(
    block = {}
) {

    return {

        ...block,

        // ====================================
        // SEMANTIC VOCABULARY
        // ====================================

        kind:
            block.kind
            ||
            block.type
            ||
            "content",

        surface:
            block.surface
            ||
            block.semanticSurface
            ||
            "knowledge",

        flow:
            block.flow
            ||
            block.lessonFlow
            ||
            "learning",

        // ====================================
        // PHASE-H COMPATIBILITY
        // ====================================

        type:
            block.type
            ||
            block.kind
            ||
            "content",

        semanticSurface:
            block.semanticSurface
            ||
            block.surface
            ||
            "knowledge",

        lessonFlow:
            block.lessonFlow
            ||
            block.flow
            ||
            "learning",

        // ====================================
        // SEMANTIC RUNTIME
        // ====================================

        priority:
            Number(block.priority ?? 1),

        momentum:
            Number(block.momentum ?? 1),

        engagement:
            block.engagement
            ||
            "active",

        cognitiveLoad:
            block.cognitiveLoad
            ||
            "medium",

        reinforcement:
            Number(block.reinforcement ?? 1),

        semanticWeight:
            Number(block.semanticWeight ?? 1),

        progressionState:
            block.progressionState
            ||
            "available",

        // ====================================
        // RUNTIME SAFETY
        // ====================================

        title:
            block.title
            ||
            "Runtime Block",

        content:
            block.content
            ||
            "",

        runtimeBridge:
            true
    };
}

// ============================================
// NORMALIZE LESSON
// ============================================

function normalizeRuntimeLesson(
    lesson = {}
) {

    return {

        ...lesson,

        // ====================================
        // LESSON STATUS
        // ====================================

        status:
            "runtime",

        runtimeImported:
            true,

        runtimeNative: true,    

        semanticVersion:
            "phase-h-runtime-bridge",

        // ====================================
        // SEMANTIC RUNTIME FIELDS
        // ====================================

        momentum:
            Number(lesson.momentum ?? 1),

        engagement:
            lesson.engagement
            ||
            "active",

        cognitiveLoad:
            lesson.cognitiveLoad
            ||
            "medium",

        reinforcement:
            Number(lesson.reinforcement ?? 1),

        semanticWeight:
            Number(lesson.semanticWeight ?? 1),

        // ====================================
        // BLOCKS
        // ====================================

        blocks:

            Array.isArray(
                lesson.blocks
            )

                ? lesson.blocks.map(
                    normalizeRuntimeBlock
                )

                : []
    };
}

// ============================================
// STORAGE HELPERS
// ============================================

export function saveImportedLessons(
    lessons = []
) {

    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(
            lessons
        )
    );
}

export function getImportedLessons() {

    try {

        const raw =

            localStorage.getItem(
                STORAGE_KEY
            );

        if (!raw) {
            return [];
        }

        return JSON.parse(raw);

    } catch (error) {

        console.error(
            "[MOS360 Runtime] load failed",
            error
        );

        return [];
    }
}

export function clearImportedLessons() {

    localStorage.removeItem(
        STORAGE_KEY
    );
}

// ============================================
// IMPORT RUNTIME LESSONS
// ============================================

export async function importRuntimeLessons(
    rows = []
) {

    try {

        // ============================================
        // IMPORT SEMANTIC LESSONS
        // ============================================

        const importResult =
            await importSpreadsheetLessons(
                rows
            );

        console.log(
            "IMPORT RESULT",
            importResult
        );

        const importedLessons =
            importResult.importedLessons || [];

        console.log(
            "IMPORTED LESSONS",
            importedLessons
        );

        // ============================================
        // NORMALIZE
        // ============================================

        const normalizedLessons =
            importedLessons.map(
                normalizeRuntimeLesson
            );

        // ====================================
        // VALIDATION
        // Governance observer only
        // ====================================

        const validationResults =

            normalizedLessons.map(
                lesson => {

                    const rawValidation =

                        validateRuntimeLesson(
                            lesson
                        );

                    const validation =

                        normalizeValidationResult(
                            rawValidation
                        );

                    if (!validation.valid) {

                        console.warn(

                            "[MOS360 Runtime Validation]",

                            {

                                lessonId:
                                    lesson.id,

                                valid:
                                    validation.valid,

                                errors:
                                    validation.errors
                            }
                        );
                    }

                    return validation;
                }
            );

        // ====================================
        // SAVE TO CLOUDFLARE KV (normalized)
        // ====================================

        let kvResult = { ok: false };

        try {

            const kvResponse =
                await fetch(
                    "/api/import/runtime",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            importedLessons:
                                normalizedLessons,
                            importedCourseGraphs:
                                importResult.importedCourseGraphs || {}
                        })
                    }
                );

            if (!kvResponse.ok) {

                throw new Error(
                    `KV API responded ${kvResponse.status}`
                );
            }

            const kvData =
                await kvResponse.json();

            kvResult = kvData.data || kvData;

            console.log(
                "[MOS360 KV] Saved",
                kvResult
            );

        } catch (kvError) {

            console.error(
                "[MOS360 KV] Save failed",
                kvError
            );
        }

        // ====================================
        // SAVE TO LOCALSTORAGE (local cache)
        // ====================================

        saveImportedLessons(
            normalizedLessons
        );

        saveLessons(
            normalizedLessons
        );

        // ====================================
        // RESULT
        // ====================================

        return {

            success: true,

            importedLessons:
                normalizedLessons,

            validationResults,

            totalImported:
                normalizedLessons.length,

            totalRejected: 0,

            kv: kvResult
        };

    } catch (error) {

        console.error(

            "[MOS360 Runtime Import Failed]",

            error
        );

        return {

            success: false,

            importedLessons: [],

            totalImported: 0,

            totalRejected: 0,

            error:
                error.message
        };
    }
}