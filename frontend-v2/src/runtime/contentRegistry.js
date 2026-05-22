// ============================================
// MOS360 CONTENT REGISTRY
// Semantic runtime content registry
// ============================================

// ============================================
// BLOCK REGISTRY
// ============================================

export const BLOCK_REGISTRY = {

    video: {

        type:
            "video",

        priority:
            "critical",

        cinematic:
            true,

        interactive:
            true
    },

    text: {

        type:
            "text",

        priority:
            "primary",

        cinematic:
            true
    },

    workflow: {

        type:
            "workflow",

        priority:
            "primary",

        procedural:
            true
    },

    callout: {

        type:
            "callout",

        priority:
            "secondary",

        reinforcement:
            true
    },

    practice: {

        type:
            "practice",

        priority:
            "primary",

        actionable:
            true
    },

    resource: {

        type:
            "resource",

        priority:
            "optional"
    },

    quiz: {

        type:
            "quiz",

        priority:
            "secondary",

        interactive:
            true
    },

    checkpoint: {

        type:
            "checkpoint",

        priority:
            "reinforcement",

        continuity:
            true
    }
};

// ============================================
// GET BLOCK CONFIG
// ============================================

export function getBlockConfig(

    type

) {

    return BLOCK_REGISTRY[
        type
    ] || null;
}

// ============================================
// IS CINEMATIC BLOCK
// ============================================

export function isCinematicBlock(

    type

) {

    return Boolean(

        BLOCK_REGISTRY[type]
            ?.cinematic
    );
}

// ============================================
// IS INTERACTIVE BLOCK
// ============================================

export function isInteractiveBlock(

    type

) {

    return Boolean(

        BLOCK_REGISTRY[type]
            ?.interactive
    );
}

// ============================================
// IS REINFORCEMENT BLOCK
// ============================================

export function isReinforcementBlock(

    type

) {

    return Boolean(

        BLOCK_REGISTRY[type]
            ?.reinforcement
    );
}