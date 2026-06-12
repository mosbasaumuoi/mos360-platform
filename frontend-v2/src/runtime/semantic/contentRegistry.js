// ============================================
// MOS360 CONTENT REGISTRY
// Semantic runtime content registry
// ============================================

// ============================================
// BLOCK REGISTRY
// ============================================

export const BLOCK_REGISTRY = {

    // ========================================
    // PLAYABLE CORE
    // ========================================

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
    },

    // ========================================
    // SEMANTIC RUNTIME
    // ========================================

    intro: {

        type:
            "intro",

        priority:
            "primary",

        cinematic:
            true
    },

    tip: {

        type:
            "tip",

        priority:
            "secondary",

        reinforcement:
            true
    },

    summary: {

        type:
            "summary",

        priority:
            "secondary",

        reinforcement:
            true
    },

    reflection: {

        type:
            "reflection",

        priority:
            "reinforcement",

        continuity:
            true
    },

    momentum: {

        type:
            "momentum",

        priority:
            "reinforcement",

        continuity:
            true
    },

    knowledge: {

        type:
            "knowledge",

        priority:
            "secondary"
    },

    bridge: {

        type:
            "bridge",

        priority:
            "secondary",

        cinematic:
            true
    },

    note: {

        type:
            "note",

        priority:
            "optional"
    },

    action: {

        type:
            "action",

        priority:
            "primary",

        actionable:
            true
    },

    exercise: {

        type:
            "exercise",

        priority:
            "primary",

        actionable:
            true
    },

    challenge: {

        type:
            "challenge",

        priority:
            "primary",

        interactive:
            true
    },

    content: {

        type:
            "content",

        priority:
            "secondary"
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