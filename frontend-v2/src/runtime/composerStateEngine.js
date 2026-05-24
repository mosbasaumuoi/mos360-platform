/**
 * MOS360
 * Composer State Engine
 *
 * RESPONSIBILITY:
 * - composer state
 * - draft state
 * - preview state
 * - block sequencing state
 * - mutation state
 * - draft lifecycle
 *
 * MUST NOT:
 * - render UI
 * - mutate persisted runtime
 * - bypass validation
 */

import {

    validateLesson

}

from "../validation/lessonValidationEngine";

const COMPOSER_DRAFT_KEY =
    "mos360_composer_draft";

// ============================================
// DEFAULT COMPOSER STATE
// ============================================

export function createEmptyComposerState() {

    return {

        lessonId: null,

        courseId: null,

        title: "",

        description: "",

        blocks: [],

        quiz: [],

        status: "draft",

        validationStatus:
            "pending",

        validationErrors: [],

        validationWarnings: [],

        semanticVersion:
            "phase-h2"
    };
}

// ============================================
// GET COMPOSER DRAFT
// ============================================

export function getComposerDraft() {

    try {

        const savedDraft =

            JSON.parse(

                localStorage.getItem(
                    COMPOSER_DRAFT_KEY
                )
            );

        return (
            savedDraft ||

            createEmptyComposerState()
        );

    } catch {

        return createEmptyComposerState();
    }
}

// ============================================
// SAVE COMPOSER DRAFT
// ============================================

export function saveComposerDraft(
    draft
) {

    localStorage.setItem(

        COMPOSER_DRAFT_KEY,

        JSON.stringify(draft)
    );

    return draft;
}

// ============================================
// RESET COMPOSER DRAFT
// ============================================

export function resetComposerDraft() {

    const emptyDraft =
        createEmptyComposerState();

    saveComposerDraft(
        emptyDraft
    );

    return emptyDraft;
}

// ============================================
// VALIDATE COMPOSER DRAFT
// ============================================

export function validateComposerDraft(
    draft
) {

    const validationResult =

        validateLesson({

            ...draft,

            id:
                draft.lessonId,

            courseId:
                draft.courseId
        });

    return {

        ...draft,

        validationStatus:

            validationResult.valid

                ? "valid"

                : "invalid",

        validationErrors:

            validationResult.errors,

        validationWarnings:

            validationResult.warnings
    };
}

// ============================================
// SAVE VALIDATED DRAFT
// ============================================

export function saveValidatedDraft(
    draft
) {

    const validatedDraft =

        validateComposerDraft(
            draft
        );

    saveComposerDraft(
        validatedDraft
    );

    return validatedDraft;
}

// ============================================
// UPDATE COMPOSER BLOCKS
// ============================================

export function updateComposerBlocks({

    draft,

    blocks = []

}) {

    return {

        ...draft,

        blocks
    };
}

// ============================================
// ADD COMPOSER BLOCK
// ============================================

export function addComposerBlock({

    draft,

    block

}) {

    return {

        ...draft,

        blocks: [

            ...draft.blocks,

            block
        ]
    };
}

// ============================================
// REMOVE COMPOSER BLOCK
// ============================================

export function removeComposerBlock({

    draft,

    index

}) {

    return {

        ...draft,

        blocks:

            draft.blocks.filter(

                (_, i) => i !== index
            )
    };
}