export const RUNTIME_BLOCK_TYPES = [

    "hero",
    "checkpoint",
    "reinforcement",
    "tips",
    "resource"

];

export const RUNTIME_BLOCK_PRIORITIES = [

    "critical",
    "primary",
    "secondary",
    "reinforcement",
    "optional"

];

export function createRuntimeBlock({

    type = "resource",

    priority = "primary",

    title = "",

    content = "",

    semanticZone = "runtime"

} = {}) {

    return {

        id:

            crypto.randomUUID(),

        type,

        priority,

        title,

        content,

        semanticZone,

        runtimeOrder: 0,

        cinematicSpacing: "md",

        createdAt:
            Date.now()
    };
}