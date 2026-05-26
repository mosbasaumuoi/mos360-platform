/**
 * MOS360
 * Composer Mutation Engine
 *
 * RESPONSIBILITY:
 * - composer publish flow
 * - runtime-safe mutations
 * - snapshot orchestration
 * - rollback-safe persistence
 * - semantic publish runtime
 *
 * MUST NOT:
 * - render UI
 * - bypass validation
 * - overwrite runtime blindly
 */

import {

    saveValidatedDraft

}

from "./composerStore";

import {

    createImportSnapshot,

    registerSnapshot,

    registerLessonEvolution

}

from "../importRegistry";

import {

    safelyMergeLessons

}

from "../lessonMutationEngine";

import {

    getImportedLessons

}

from "../../engines/runtimeImportEngine";

const IMPORT_LESSONS_KEY =
    "mos360_imported_lessons";

// ============================================
// PUBLISH COMPOSER DRAFT
// ============================================

export function publishComposerDraft(
    draft
) {

    // ================================
    // VALIDATE DRAFT
    // ================================

    const validatedDraft =

        saveValidatedDraft(
            draft
        );

    // ================================
    // INVALID DRAFT
    // ================================

    if (
        validatedDraft
            .validationStatus !==
        "valid"
    ) {

        console.error(

            "[MOS360] Composer publish failed",

            validatedDraft
                .validationErrors
        );

        return {

            success: false,

            errors:

                validatedDraft
                    .validationErrors
        };
    }

    // ================================
    // SNAPSHOT CURRENT RUNTIME
    // ================================

    const existingLessons =
        getImportedLessons();

    const snapshot =
        createImportSnapshot({

            lessons:
                existingLessons,

            semanticVersion:
                "phase-h2"
        });

    registerSnapshot(
        snapshot
    );

    // ================================
    // MERGE LESSON
    // ================================

    const mergedLessons =
        safelyMergeLessons({

            existingLessons,

            importedLessons: [

                {
                    ...validatedDraft,

                    id:
                        validatedDraft
                            .lessonId
                }
            ]
        });

    // ================================
    // SAVE RUNTIME
    // ================================

    localStorage.setItem(

        IMPORT_LESSONS_KEY,

        JSON.stringify(
            mergedLessons
        )
    );

    // ================================
    // REGISTER EVOLUTION
    // ================================

    registerLessonEvolution({

        lessonId:
            validatedDraft
                .lessonId,

        courseId:
            validatedDraft
                .courseId,

        mutationType:
            "composer-publish",

        semanticVersion:
            "phase-h2"
    });

    return {

        success: true,

        lesson:

            validatedDraft
    };
}