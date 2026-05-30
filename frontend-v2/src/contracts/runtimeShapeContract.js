// ============================================
// MOS360 RUNTIME SHAPE CONTRACT
// Phase K.5
// Canonical Runtime Shape Authority
// ============================================

export const RUNTIME_SHAPE_SECTIONS = {

    METADATA:
        "metadata",

    MEDIA:
        "media",

    ACTIVITIES:
        "activities",

    SEQUENCE:
        "sequence",

    ASSESSMENT:
        "assessment",

    RESOURCES:
        "resources",

    GOVERNANCE:
        "governance"
};

// ============================================
// CREATE EMPTY SHAPE
// ============================================

export function createEmptyRuntimeShape() {

    return {

        metadata: {

            id: "",
            type: "",
            title: "",
            description: ""
        },

        media: {

            provider: "",

            url: "",

            embedUrl: "",

            thumbnail: ""
        },

        activities: [],

        sequence: {

            mode: "linear",

            nodes: [],

            edges: []
        },

        assessment: {

            questions: [],

            checkpoints: []
        },

        resources: [],

        governance: {

            source: "",

            imported: false,

            runtimeVersion: "",

            semanticVersion: ""
        }
    };
}