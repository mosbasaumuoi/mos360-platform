/**
 * MOS360
 * Composer Focus Engine
 *
 * RESPONSIBILITY:
 * - focus mode
 * - viewport attention orchestration
 * - distraction reduction
 * - cinematic editing flow
 *
 * MUST NOT:
 * - mutate persisted runtime
 * - overwrite lessons
 * - bypass runtime sequencing
 */

// ============================================
// CREATE FOCUS STATE
// ============================================

export function createFocusState() {

    return {

        enabled: false,

        focusedBlockIndex:
            null
    };
}

// ============================================
// ENABLE FOCUS MODE
// ============================================

export function enableFocusMode({

    state,

    index

}) {

    return {

        ...state,

        enabled: true,

        focusedBlockIndex:
            index
    };
}

// ============================================
// DISABLE FOCUS MODE
// ============================================

export function disableFocusMode(
    state
) {

    return {

        ...state,

        enabled: false,

        focusedBlockIndex:
            null
    };
}

// ============================================
// IS BLOCK DIMMED
// ============================================

export function isBlockDimmed({

    focusState,

    index

}) {

    if (

        !focusState ||

        typeof focusState !==
        "object"

    ) {

        return false;
    }

    if (

        !focusState.enabled

    ) {

        return false;
    }

    return (

        focusState.focusedBlockIndex !==
        index
    );
}