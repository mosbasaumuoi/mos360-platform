// ============================================
// MOS360 RUNTIME BLOCK CONTRACT
// Canonical runtime block DNA
// ============================================

// ============================================
// BLOCK TYPES
// ============================================

export const RUNTIME_BLOCK_TYPES = [

    // ========================================
    // PLAYABLE CORE
    // ========================================

    "video",
    "text",
    "workflow",
    "callout",
    "practice",
    "quiz",
    "checkpoint",

    // ========================================
    // SEMANTIC RUNTIME
    // ========================================

    "tip",
    "summary",
    "reflection",
    "momentum",
    "knowledge",
    "intro",
    "bridge",
    "note",
    "action",
    "exercise",
    "challenge",
    "content"
];

// ============================================
// RUNTIME BLOCK DNA
// ============================================

export const RUNTIME_BLOCK_DNA = {

    core: [

        "id",
        "type",
        "title",
        "content",
        "description"
    ],

    semantic: [

        "semanticSurface",
        "semanticAccent",
        "semanticRhythm",
        "semanticWeight"
    ],

    continuity: [

        "momentumState",
        "continuityState",
        "fatigueState"
    ],

    adaptive: [

        "adaptive",
        "runtimeInjected",
        "reinforcementSource"
    ],

    visual: [

        "surface",
        "surfaceTone",
        "surfaceSpacing",
        "surfaceDepth",
        "cinematicPriority"
    ]
};

// ============================================
// DNA POLICY
// ============================================

export const RUNTIME_BLOCK_DNA_POLICY = {

    mode:
        "attachable-overlay-runtime",

    strict:
        false,

    evolutionary:
        true,

    overlaySafe:
        true,

    continuitySafe:
        true
};

// ============================================
// VALID BLOCK TYPE
// ============================================

export function isValidRuntimeBlockType(
    type
) {

    return RUNTIME_BLOCK_TYPES.includes(
        type
    );
}

// ============================================
// SEMANTIC BLOCK
// ============================================

export function isSemanticRuntimeBlock(
    block = {}
) {

    return [

        "tip",
        "summary",
        "reflection",
        "momentum",
        "knowledge",
        "intro",
        "bridge",
        "note",
        "action",
        "exercise",
        "challenge",
        "content"

    ].includes(
        block.type
    );
}

// ============================================
// ADAPTIVE BLOCK
// ============================================

export function isAdaptiveRuntimeBlock(
    block = {}
) {

    return Boolean(

        block.adaptive ||

        block.runtimeInjected ||

        block.reinforcementSource
    );
}

// ============================================
// RUNTIME INJECTED BLOCK
// ============================================

export function isRuntimeInjectedBlock(
    block = {}
) {

    return Boolean(
        block.runtimeInjected
    );
}

// ============================================
// NORMALIZE TYPE
// ============================================

function normalizeRuntimeBlockType(
    type
) {

    if (
        typeof type !== "string"
    ) {

        return "text";
    }

    const normalizedType =

        type
            .trim()
            .toLowerCase();

    if (

        isValidRuntimeBlockType(
            normalizedType
        )

    ) {

        return normalizedType;
    }

    return "text";
}

// ============================================
// NORMALIZE BLOCK
// ============================================

export function normalizeRuntimeBlock(
    block = {}
) {

    const normalizedType =

        normalizeRuntimeBlockType(
            block.type
        );

    return {

        // ====================================
        // PRESERVE ORIGINAL
        // ====================================

        ...block,

        // ====================================
        // CORE
        // ====================================

        id:

            typeof block.id ===
                "string"

                ? block.id

                : crypto.randomUUID(),

        type:
            normalizedType,

        title:

            typeof block.title ===
                "string"

                ? block.title

                : "",

        content:

            typeof block.content ===
                "string"

                ||

            Array.isArray(
                block.content
            )

                ? block.content

                : "",

        description:

            typeof block.description ===
                "string"

                ? block.description

                : "",

        // ====================================
        // SEMANTIC
        // ====================================

        semanticSurface:

            typeof block.semanticSurface ===
                "string"

                ? block.semanticSurface

                : null,

        semanticAccent:

            typeof block.semanticAccent ===
                "string"

                ? block.semanticAccent

                : null,

        semanticRhythm:

            typeof block.semanticRhythm ===
                "string"

                ? block.semanticRhythm

                : null,

        semanticWeight:

            typeof block.semanticWeight ===
                "string"

                ? block.semanticWeight

                : null,

        // ====================================
        // CONTINUITY
        // ====================================

        momentumState:

            typeof block.momentumState ===
                "string"

                ? block.momentumState

                : null,

        continuityState:

            typeof block.continuityState ===
                "string"

                ? block.continuityState

                : null,

        fatigueState:

            typeof block.fatigueState ===
                "string"

                ? block.fatigueState

                : null,

        // ====================================
        // ADAPTIVE
        // ====================================

        adaptive:
            Boolean(
                block.adaptive
            ),

        runtimeInjected:
            Boolean(
                block.runtimeInjected
            ),

        reinforcementSource:

            typeof block.reinforcementSource ===
                "string"

                ? block.reinforcementSource

                : null,

        // ====================================
        // VISUAL
        // ====================================

        surface:

            typeof block.surface ===
                "string"

                ? block.surface

                : null,

        surfaceTone:

            typeof block.surfaceTone ===
                "string"

                ? block.surfaceTone

                : null,

        surfaceSpacing:

            typeof block.surfaceSpacing ===
                "string"

                ? block.surfaceSpacing

                : null,

        surfaceDepth:

            typeof block.surfaceDepth ===
                "string"

                ? block.surfaceDepth

                : null,

        cinematicPriority:

            typeof block.cinematicPriority ===
                "string"

                ? block.cinematicPriority

                : null
    };
}

// ============================================
// NORMALIZE BLOCK COLLECTION
// ============================================

export function normalizeRuntimeBlocks(
    blocks = []
) {

    return blocks.map(
        normalizeRuntimeBlock
    );
}
