// ============================================
// RESOURCE CONTRACT
// Unified learning resource schema
// ============================================

// ============================================
// RESOURCE TYPES
// ============================================

export const RESOURCE_TYPES = [

    "video",

    "document",

    "download",

    "practice",

    "reference",

    "embed"
];

// ============================================
// VALIDATE RESOURCE
// ============================================

export function validateResource(

    resource

) {

    if (

        !resource
        ||

        typeof resource !== "object"

    ) {

        return false;
    }

    if (

        !RESOURCE_TYPES.includes(
            resource.type
        )

    ) {

        return false;
    }

    if (!resource.url) {

        return false;
    }

    return true;
}