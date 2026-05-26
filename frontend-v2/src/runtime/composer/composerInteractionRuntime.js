/**
 * MOS360
 * Composer Interaction Engine
 *
 * RESPONSIBILITY:
 * - block selection
 * - block focus
 * - block interaction state
 * - reorder foundation
 * - drag-drop sequencing
 * - lightweight orchestration
 *
 * MUST NOT:
 * - mutate persisted runtime
 * - bypass sequencing
 * - overwrite lessons
 */

// ============================================
// CREATE INTERACTION STATE
// ============================================

export function createInteractionState() {

    return {

        selectedBlockIndex:
            null,

        focusedBlockIndex:
            null,

        hoveredBlockIndex:
            null,

        draggingBlockIndex:
            null
    };
}

// ============================================
// SELECT BLOCK
// ============================================

export function selectBlock({

    state,

    index

}) {

    return {

        ...state,

        selectedBlockIndex:
            index
    };
}

// ============================================
// FOCUS BLOCK
// ============================================

export function focusBlock({

    state,

    index

}) {

    return {

        ...state,

        focusedBlockIndex:
            index
    };
}

// ============================================
// HOVER BLOCK
// ============================================

export function hoverBlock({

    state,

    index

}) {

    return {

        ...state,

        hoveredBlockIndex:
            index
    };
}

// ============================================
// START DRAGGING
// ============================================

export function startDraggingBlock({

    state,

    index

}) {

    return {

        ...state,

        draggingBlockIndex:
            index
    };
}

// ============================================
// STOP DRAGGING
// ============================================

export function stopDraggingBlock(
    state
) {

    return {

        ...state,

        draggingBlockIndex:
            null
    };
}

// ============================================
// MOVE BLOCK
// ============================================

export function moveBlock({

    blocks = [],

    fromIndex,

    toIndex

}) {

    // ================================
    // INVALID MOVE
    // ================================

    if (
        fromIndex === toIndex ||

        fromIndex < 0 ||

        toIndex < 0 ||

        fromIndex >= blocks.length ||

        toIndex >= blocks.length
    ) {

        return blocks;
    }

    const updated =
        [...blocks];

    const [moved] =
        updated.splice(
            fromIndex,
            1
        );

    updated.splice(
        toIndex,
        0,
        moved
    );

    return preserveContinuityFlow(
        updated
    );
}

// ============================================
// PRESERVE CONTINUITY FLOW
// ============================================

function preserveContinuityFlow(
    blocks = []
) {

    return blocks.map(
        (block, index) => ({

            ...block,

            runtimeOrder:
                index
        })
    );
}