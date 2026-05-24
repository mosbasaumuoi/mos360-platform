/**
 * MOS360
 * Composer Preview Engine
 *
 * RESPONSIBILITY:
 * - simulated runtime preview
 * - preview sequencing
 * - preview pacing
 * - preview continuity
 * - non-destructive runtime simulation
 *
 * MUST NOT:
 * - mutate persisted runtime
 * - overwrite lessons
 * - bypass validation
 */

import {

    validateComposerDraft

}

from "./composerStateEngine";

import {

    createSequencedBlocks,

    createContinuityFlow,

    createPacingProfile

}

from "./blockSequencingEngine";

// ============================================
// CREATE PREVIEW SESSION
// ============================================

export function createPreviewSession(
    draft
) {

    const validatedDraft =

        validateComposerDraft(
            draft
        );

    return {

        sessionId:
            crypto.randomUUID(),

        createdAt:
            Date.now(),

        previewStatus:

            validatedDraft
                .validationStatus,

        lesson:

            validatedDraft,

        sequencing:

            createPreviewSequencing(
                validatedDraft.blocks
            ),

        pacing:

            createPreviewPacing(
                validatedDraft.blocks
            ),

        continuity:

            createPreviewContinuity(
                validatedDraft.blocks
            )
    };
}

// ============================================
// PREVIEW SEQUENCING
// ============================================

export function createPreviewSequencing(
    blocks = []
) {

    return createSequencedBlocks(
        blocks
    );
}

// ============================================
// PREVIEW PACING
// ============================================

export function createPreviewPacing(
    blocks = []
) {

    return createPacingProfile(
        blocks
    );
}

// ============================================
// PREVIEW CONTINUITY
// ============================================

export function createPreviewContinuity(
    blocks = []
) {

    return createContinuityFlow(
        blocks
    );
}

// ============================================
// PREVIEW VALIDATION
// ============================================

export function canPreviewDraft(
    draft
) {

    const validatedDraft =

        validateComposerDraft(
            draft
        );

    return (
        validatedDraft
            .validationStatus ===
        "valid"
    );
}