/**
 * MOS360
 * Composer Toolbar Runtime
 *
 * RESPONSIBILITY:
 * - semantic block insertion
 * - orchestration shortcuts
 * - runtime-aware authoring actions
 * - momentum-first editing flow
 *
 * MUST NOT:
 * - mutate persisted runtime
 * - bypass validation
 * - overwrite lessons
 */

import {

    createRuntimeBlock

}

    from "../../contracts/runtimeBlockContract";

// ============================================
// TOOLBAR BLOCKS
// ============================================

export const TOOLBAR_BLOCKS = [

    {
        type: "text",
        label: "Text",
        group: "primary"
    },

    {
        type: "video",
        label: "Video",
        group: "primary"
    },

    {
        type: "workflow",
        label: "Workflow",
        group: "primary"
    },

    {
        type: "tips",
        label: "Tips",
        group: "support"
    },

    {
        type: "resource",
        label: "Resource",
        group: "support"
    },

    {
        type: "checkpoint",
        label: "Checkpoint",
        group: "reinforcement"
    },

    {
        type: "reinforcement",
        label: "Reinforcement",
        group: "reinforcement"
    }
];

// ============================================
// CREATE TOOLBAR BLOCK
// ============================================

export function createToolbarBlock(
    type
) {

    return createRuntimeBlock({

        type,

        priority:

            type === "video" ||
                type === "workflow"

                ? "primary"

                : "secondary"
    });
}

// ============================================
// INSERT BLOCK
// ============================================

export function insertToolbarBlock({

    blocks = [],

    type,

    index = null

}) {

    const nextBlock =
        createToolbarBlock(type);

    // ================================
    // APPEND
    // ================================

    if (
        index === null ||
        index >= blocks.length
    ) {

        return [

            ...blocks,

            nextBlock
        ];
    }

    // ================================
    // INSERT AT POSITION
    // ================================

    const updated =
        [...blocks];

    updated.splice(
        index,
        0,
        nextBlock
    );

    return updated;
}